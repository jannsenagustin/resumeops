"""Metadata-only JSONL audit storage with bounded local rotation and retention."""

from datetime import datetime, timedelta, timezone
import json
import os
from pathlib import Path
import re
import threading
from typing import Final

from .errors import AtlasMCPError

MAX_ACTIVE_BYTES: Final = 10 * 1024 * 1024
MAX_TOTAL_BYTES: Final = 100 * 1024 * 1024
RETENTION_DAYS: Final = 30
ACTIVE_NAME: Final = "atlas-mcp.jsonl"
_ALLOWED_FIELDS: Final = frozenset(
    {
        "schema_version", "event_id", "correlation_id", "timestamp",
        "invocation_identity", "tool", "contract_version", "source",
        "source_role", "requested_bounds", "applied_bounds", "decision",
        "duration_ms", "upstream_status_category", "result_count",
        "rejection_reason", "sanitization_applied",
    }
)
_SAFE_LABEL: Final = re.compile(r"^[A-Za-z0-9_.-]{1,64}$")
_DECISIONS: Final = frozenset({"allowed", "rejected", "failed", "succeeded"})
_SOURCES: Final = frozenset({"none", "atlas-search-head"})
_SOURCE_ROLES: Final = frozenset({"none", "search-head"})


def _valid_bounds(value: object) -> bool:
    if not isinstance(value, dict) or set(value) - {"endpoint", "entries"}:
        return False
    endpoint = value.get("endpoint")
    entries = value.get("entries")
    return (endpoint is None or endpoint == "server/info") and (entries is None or entries == 1)


def _validate_event(event: dict[str, object]) -> None:
    labels = ("event_id", "correlation_id", "tool", "contract_version", "upstream_status_category")
    if set(event) != _ALLOWED_FIELDS or any(
        not isinstance(event[field], str) or not _SAFE_LABEL.fullmatch(event[field])
        for field in labels
    ):
        raise AtlasMCPError.create("INTERNAL_ERROR")
    if event["schema_version"] != "1.0.0" or event["invocation_identity"] != "unavailable":
        raise AtlasMCPError.create("INTERNAL_ERROR")
    if event["source"] not in _SOURCES or event["source_role"] not in _SOURCE_ROLES:
        raise AtlasMCPError.create("INTERNAL_ERROR")
    if event["decision"] not in _DECISIONS or not isinstance(event["sanitization_applied"], bool):
        raise AtlasMCPError.create("INTERNAL_ERROR")
    duration = event["duration_ms"]
    if isinstance(duration, bool) or not isinstance(duration, int) or not 0 <= duration <= 2_147_483_647:
        raise AtlasMCPError.create("INTERNAL_ERROR")
    if event["result_count"] not in (None, 0, 1):
        raise AtlasMCPError.create("INTERNAL_ERROR")
    reason = event["rejection_reason"]
    if reason is not None and (not isinstance(reason, str) or not _SAFE_LABEL.fullmatch(reason)):
        raise AtlasMCPError.create("INTERNAL_ERROR")
    if not _valid_bounds(event["requested_bounds"]) or not _valid_bounds(event["applied_bounds"]):
        raise AtlasMCPError.create("INTERNAL_ERROR")
    try:
        timestamp = datetime.fromisoformat(str(event["timestamp"]).replace("Z", "+00:00"))
    except ValueError:
        raise AtlasMCPError.create("INTERNAL_ERROR") from None
    if timestamp.tzinfo is None or timestamp.utcoffset() != timedelta(0):
        raise AtlasMCPError.create("INTERNAL_ERROR")


class AuditSink:
    def __init__(self, directory: Path) -> None:
        self._directory = directory
        self._active = directory / ACTIVE_NAME
        self._lock = threading.Lock()

    def write(self, event: dict[str, object]) -> None:
        _validate_event(event)
        try:
            encoded = (json.dumps(event, separators=(",", ":"), sort_keys=True) + "\n").encode("utf-8")
            if len(encoded) > 8192:
                raise AtlasMCPError.create("INTERNAL_ERROR")
            with self._lock:
                self._directory.mkdir(mode=0o700, parents=True, exist_ok=True)
                os.chmod(self._directory, 0o700)
                self._rotate_before_write(len(encoded))
                descriptor = os.open(self._active, os.O_APPEND | os.O_CREAT | os.O_WRONLY, 0o600)
                with os.fdopen(descriptor, "ab") as handle:
                    handle.write(encoded)
                    handle.flush()
                    os.fsync(handle.fileno())
                os.chmod(self._active, 0o600)
                self._prune()
        except AtlasMCPError:
            raise
        except (OSError, TypeError, ValueError):
            raise AtlasMCPError.create("INTERNAL_ERROR") from None

    def _rotate_before_write(self, incoming: int) -> None:
        if not self._active.exists() or self._active.stat().st_size + incoming <= MAX_ACTIVE_BYTES:
            return
        timestamp = datetime.now(timezone.utc).strftime("%Y%m%dT%H%M%S%fZ")
        rotated = self._directory / f"atlas-mcp-{timestamp}.jsonl"
        os.replace(self._active, rotated)
        os.chmod(rotated, 0o600)

    def _prune(self) -> None:
        now = datetime.now(timezone.utc)
        closed = sorted(
            (path for path in self._directory.glob("atlas-mcp-*.jsonl") if path.is_file()),
            key=lambda path: path.stat().st_mtime,
        )
        cutoff = now - timedelta(days=RETENTION_DAYS)
        for path in list(closed):
            modified = datetime.fromtimestamp(path.stat().st_mtime, timezone.utc)
            if modified < cutoff:
                path.unlink()
                closed.remove(path)
        total = sum(path.stat().st_size for path in closed)
        if self._active.exists():
            total += self._active.stat().st_size
        while closed and total > MAX_TOTAL_BYTES:
            oldest = closed.pop(0)
            total -= oldest.stat().st_size
            oldest.unlink()
