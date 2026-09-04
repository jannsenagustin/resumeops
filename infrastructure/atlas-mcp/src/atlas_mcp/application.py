"""Transport-independent Atlas policy dispatch for future registered tools."""

from datetime import datetime, timezone
import time
from uuid import uuid4

from .audit import AuditSink
from .errors import AtlasMCPError, ErrorCode
from .registry import ExplicitToolRegistry


def _safe_tool_label(value: object) -> str:
    if not isinstance(value, str) or not value or len(value) > 64:
        return "invalid"
    if not all(character.isascii() and (character.isalnum() or character in "_-") for character in value):
        return "invalid"
    return value


class AtlasApplication:
    """Authorize before handler access and audit every rejection."""

    def __init__(self, registry: ExplicitToolRegistry, audit: AuditSink) -> None:
        self._registry = registry
        self._audit = audit

    def authorize(self, requested_tool: object, requested_version: object) -> None:
        tool_label = _safe_tool_label(requested_tool)
        version_label = requested_version if isinstance(requested_version, str) and len(requested_version) <= 32 else "unknown"
        try:
            self._registry.authorize(tool_label, version_label)
        except AtlasMCPError:
            self.reject(tool_label, version_label, "TOOL_NOT_REGISTERED")

    def reject(self, requested_tool: object, requested_version: object, code: ErrorCode) -> None:
        started = time.monotonic()
        correlation_id = uuid4().hex
        tool_label = _safe_tool_label(requested_tool)
        version_label = requested_version if isinstance(requested_version, str) and len(requested_version) <= 32 else "unknown"
        try:
            self._audit.write(
                {
                    "schema_version": "1.0.0",
                    "event_id": uuid4().hex,
                    "correlation_id": correlation_id,
                    "timestamp": datetime.now(timezone.utc).isoformat(),
                    "invocation_identity": "unavailable",
                    "tool": tool_label,
                    "contract_version": version_label,
                    "source": "none",
                    "source_role": "none",
                    "requested_bounds": {},
                    "applied_bounds": {},
                    "decision": "rejected",
                    "duration_ms": max(0, round((time.monotonic() - started) * 1000)),
                    "upstream_status_category": "not_started",
                    "result_count": None,
                    "rejection_reason": code.lower(),
                    "sanitization_applied": False,
                }
            )
        except AtlasMCPError:
            raise AtlasMCPError(code="INTERNAL_ERROR", correlation_id=correlation_id) from None
        raise AtlasMCPError(code=code, correlation_id=correlation_id)
