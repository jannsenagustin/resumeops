"""Stable, secret-safe Atlas MCP error types and envelopes."""

from dataclasses import dataclass
from typing import Literal
from uuid import uuid4

ErrorCode = Literal[
    "INVALID_INPUT",
    "TOOL_NOT_REGISTERED",
    "POLICY_REJECTED",
    "TLS_VERIFICATION_FAILED",
    "AUTHENTICATION_FAILED",
    "AUTHORIZATION_FAILED",
    "UPSTREAM_UNAVAILABLE",
    "UPSTREAM_TIMEOUT",
    "MALFORMED_UPSTREAM_DATA",
    "INTERNAL_ERROR",
]

_MESSAGES: dict[ErrorCode, tuple[str, bool]] = {
    "INVALID_INPUT": ("The request does not match the approved contract.", False),
    "TOOL_NOT_REGISTERED": ("The requested tool is not registered.", False),
    "POLICY_REJECTED": ("The request was rejected by Atlas policy.", False),
    "TLS_VERIFICATION_FAILED": ("TLS identity verification failed.", False),
    "AUTHENTICATION_FAILED": ("Upstream authentication failed.", False),
    "AUTHORIZATION_FAILED": ("Upstream authorization failed.", False),
    "UPSTREAM_UNAVAILABLE": ("The approved upstream service is unavailable.", True),
    "UPSTREAM_TIMEOUT": ("The approved upstream operation timed out.", True),
    "MALFORMED_UPSTREAM_DATA": ("The upstream response could not be safely normalized.", False),
    "INTERNAL_ERROR": ("The operation failed safely.", False),
}


@dataclass(frozen=True, slots=True)
class AtlasMCPError(Exception):
    """An internal categorical error that never carries sensitive detail."""

    code: ErrorCode
    correlation_id: str

    @classmethod
    def create(cls, code: ErrorCode) -> "AtlasMCPError":
        return cls(code=code, correlation_id=uuid4().hex)

    def envelope(self, tool: str, contract_version: str) -> dict[str, object]:
        message, retryable = _MESSAGES[self.code]
        return {
            "tool": tool,
            "contract_version": contract_version,
            "error": {
                "code": self.code,
                "message": message,
                "retryable": retryable,
                "correlation_id": self.correlation_id,
            },
        }
