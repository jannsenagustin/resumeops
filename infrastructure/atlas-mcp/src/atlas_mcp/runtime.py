"""Approved runtime file interfaces and fail-closed TLS construction."""

from dataclasses import dataclass
import os
from pathlib import Path
import ssl
import stat

from .errors import AtlasMCPError


@dataclass(frozen=True, slots=True)
class RuntimePaths:
    token_file: Path
    ca_file: Path
    audit_dir: Path

    @classmethod
    def from_environment(cls) -> "RuntimePaths":
        token = os.environ.get("ATLAS_MCP_TOKEN_FILE")
        ca = os.environ.get("ATLAS_MCP_CA_FILE")
        audit = os.environ.get("ATLAS_MCP_AUDIT_DIR", "/audit")
        if not token or not ca:
            raise AtlasMCPError.create("POLICY_REJECTED")
        return cls(Path(token), Path(ca), Path(audit))


def read_runtime_token(path: Path) -> str:
    """Read a token only from a restrictive regular file without disclosing it."""

    try:
        metadata = path.lstat()
        if not stat.S_ISREG(metadata.st_mode) or metadata.st_mode & 0o077:
            raise AtlasMCPError.create("POLICY_REJECTED")
        token = path.read_text(encoding="utf-8").strip()
    except AtlasMCPError:
        raise
    except (OSError, UnicodeError):
        raise AtlasMCPError.create("POLICY_REJECTED") from None
    if not token or any(character.isspace() for character in token):
        raise AtlasMCPError.create("POLICY_REJECTED")
    return token


def create_tls_context(ca_file: Path) -> ssl.SSLContext:
    """Trust only the supplied Atlas root and retain normal hostname checking."""

    try:
        context = ssl.create_default_context(cafile=str(ca_file))
    except (OSError, ssl.SSLError):
        raise AtlasMCPError.create("TLS_VERIFICATION_FAILED") from None
    if context.verify_mode != ssl.CERT_REQUIRED or not context.check_hostname:
        raise AtlasMCPError.create("TLS_VERIFICATION_FAILED")
    return context
