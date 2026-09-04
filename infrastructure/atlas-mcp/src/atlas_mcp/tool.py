"""Sole approved Atlas MCP Version 1 tool implementation."""

from datetime import datetime, timezone
from pathlib import Path
import time
from typing import Callable
from uuid import uuid4

from . import CONTRACT_VERSION
from .adapter import SplunkAdapterBoundary
from .audit import AuditSink
from .errors import AtlasMCPError
from .runtime import RuntimePaths, create_tls_context, read_runtime_token
from .sanitization import enforce_serialized_result_bound, sanitize_string, sanitize_string_array

TOOL_NAME = "get_server_info"
SOURCE = "atlas-search-head"
SOURCE_ROLE = "search-head"
LIMITATION = "Server identification only; this result does not establish overall health or configuration correctness."


class ServerInfoTool:
    def __init__(
        self,
        paths: RuntimePaths,
        adapter_factory: Callable[[str, object], SplunkAdapterBoundary] | None = None,
    ) -> None:
        self._paths = paths
        self._audit = AuditSink(paths.audit_dir)
        self._adapter_factory = adapter_factory or (lambda token, context: SplunkAdapterBoundary(token, context))

    def invoke(self) -> dict[str, object]:
        started = time.monotonic()
        correlation_id = uuid4().hex
        upstream_started = False
        try:
            token = read_runtime_token(self._paths.token_file)
            context = create_tls_context(self._paths.ca_file)
            adapter = self._adapter_factory(token, context)
            upstream_started = True
            raw = adapter.get_server_info()
            result = self._normalize(raw)
            enforce_serialized_result_bound(result)
            self._write_audit(correlation_id, started, "succeeded", "success", 1, None, True, True)
            return result
        except AtlasMCPError as error:
            safe_error = AtlasMCPError(code=error.code, correlation_id=correlation_id)
            try:
                self._write_audit(
                    correlation_id,
                    started,
                    "failed",
                    error.code.lower(),
                    0,
                    error.code.lower(),
                    False,
                    upstream_started,
                )
            except AtlasMCPError:
                raise AtlasMCPError(code="INTERNAL_ERROR", correlation_id=correlation_id) from None
            raise safe_error from None

    def _normalize(self, raw: dict[str, object]) -> dict[str, object]:
        role_value = raw.get("server_roles") if raw.get("server_roles") is not None else raw.get("serverRole")
        if isinstance(role_value, list):
            server_role: str | list[str] | None = sanitize_string_array(role_value)
        else:
            server_role = sanitize_string(role_value)
        return {
            "tool": TOOL_NAME,
            "contract_version": CONTRACT_VERSION,
            "source": SOURCE,
            "source_role": SOURCE_ROLE,
            "observed_at": datetime.now(timezone.utc).isoformat(),
            "applied_bounds": {"endpoint": "server/info", "entries": 1},
            "data": {
                "version": sanitize_string(raw.get("version")),
                "server_name": sanitize_string(raw.get("serverName")),
                "server_role": server_role,
            },
            "sanitization": {"applied": True, "removed_fields": True},
            "warnings": [],
            "limitations": [LIMITATION],
        }

    def _write_audit(
        self,
        correlation_id: str,
        started: float,
        decision: str,
        status: str,
        result_count: int,
        reason: str | None,
        sanitized: bool,
        upstream_started: bool,
    ) -> None:
        self._audit.write(
            {
                "schema_version": "1.0.0",
                "event_id": uuid4().hex,
                "correlation_id": correlation_id,
                "timestamp": datetime.now(timezone.utc).isoformat(),
                "invocation_identity": "unavailable",
                "tool": TOOL_NAME,
                "contract_version": CONTRACT_VERSION,
                "source": SOURCE if upstream_started else "none",
                "source_role": SOURCE_ROLE if upstream_started else "none",
                "requested_bounds": {},
                "applied_bounds": {"endpoint": "server/info", "entries": 1},
                "decision": decision,
                "duration_ms": max(0, round((time.monotonic() - started) * 1000)),
                "upstream_status_category": status,
                "result_count": result_count,
                "rejection_reason": reason,
                "sanitization_applied": sanitized,
            }
        )


def get_server_info() -> dict[str, object]:
    """Return the approved minimal Search Head identification observation."""

    from .registry import PRODUCTION_REGISTRY

    PRODUCTION_REGISTRY.authorize(TOOL_NAME, CONTRACT_VERSION)
    return ServerInfoTool(RuntimePaths.from_environment()).invoke()
