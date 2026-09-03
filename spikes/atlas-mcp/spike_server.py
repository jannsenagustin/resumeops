"""Disposable ATL-034 MCP stdio spike. Not a production Atlas MCP foundation."""

from datetime import datetime, timezone
import json
from pathlib import Path
import ssl
import time

from mcp.server.fastmcp import FastMCP
import splunklib.client as splunk_client

TOOL = "get_server_info"
CONTRACT = "spike-0.1"
SECRET_PATH = Path("/run/secrets/atlas_mcp_token")
AUDIT_PATH = Path("/audit/atlas-mcp-spike.jsonl")
TRUST_PATH = "/trust/atlas-root-ca.pem"
SPLUNK_HOST = "atlas-search-head"
ALLOWED_TOOLS = frozenset({TOOL})

mcp = FastMCP("Atlas MCP BATCH-008 Spike", log_level="ERROR")


def authorize(requested_tool: str) -> None:
    """Reject every operation except the single approved spike tool."""
    if requested_tool not in ALLOWED_TOOLS:
        raise PermissionError("Operation rejected by the BATCH-008 tool policy")


class SplunkServerInfoAdapter:
    """Purpose-built adapter for the fixed Search Head server-info read."""

    endpoint = "server/info"

    def __init__(self, token: str) -> None:
        tls_context = ssl.create_default_context(cafile=TRUST_PATH)
        self._service = splunk_client.connect(
            host=SPLUNK_HOST,
            port=8089,
            scheme="https",
            splunkToken=token,
            autologin=False,
            verify=True,
            context=tls_context,
        )

    def get_server_info(self) -> dict:
        content = self._service.get(self.endpoint, output_mode="json").body.read()
        raw = json.loads(content)
        if len(raw.get("entry", [])) != 1:
            raise RuntimeError("Unexpected bounded server-info response")
        return raw["entry"][0].get("content", {})


def write_audit(record: dict) -> None:
    AUDIT_PATH.parent.mkdir(parents=True, exist_ok=True)
    with AUDIT_PATH.open("a", encoding="utf-8") as handle:
        handle.write(json.dumps(record, separators=(",", ":")) + "\n")


def observe() -> dict:
    started = time.monotonic()
    authorize(TOOL)
    token = SECRET_PATH.read_text(encoding="utf-8").strip()
    if not token:
        raise RuntimeError("Runtime authentication material is unavailable")
    observed = datetime.now(timezone.utc).isoformat()
    try:
        values = SplunkServerInfoAdapter(token).get_server_info()
    except Exception as error:
        write_audit(
            {
                "timestamp": observed,
                "tool": TOOL,
                "contract_version": CONTRACT,
                "source_system": SPLUNK_HOST,
                "policy_decision": "allow",
                "applied_bounds": {"endpoint": "server/info", "entries": 1},
                "duration_ms": round((time.monotonic() - started) * 1000),
                "upstream_status": "authentication_failed"
                if "authentication" in type(error).__name__.lower()
                else "failed",
                "result_count": 0,
            }
        )
        raise RuntimeError("Bounded Search Head observation failed") from None
    result = {
        "tool": TOOL,
        "contract_version": CONTRACT,
        "source_system": SPLUNK_HOST,
        "source_role": "search-head",
        "observation_timestamp": observed,
        "applied_bounds": {"endpoint": SplunkServerInfoAdapter.endpoint, "entries": 1},
        "normalized_result": {
            "version": values.get("version"),
            "server_name": values.get("serverName"),
            "server_role": values.get("server_roles") or values.get("serverRole"),
        },
        "sanitization": {"applied": True, "truncated": False},
        "warnings": [],
        "limitations": ["BATCH-008 diagnostic observation; not a production tool contract"],
    }
    audit = {
        "timestamp": observed,
        "tool": TOOL,
        "contract_version": CONTRACT,
        "source_system": SPLUNK_HOST,
        "policy_decision": "allow",
        "applied_bounds": result["applied_bounds"],
        "duration_ms": round((time.monotonic() - started) * 1000),
        "upstream_status": "success",
        "result_count": 1,
    }
    write_audit(audit)
    return result


@mcp.tool(name=TOOL)
def get_server_info() -> dict:
    """Return one bounded, sanitized Search Head observation for BATCH-008 only."""
    return observe()


if __name__ == "__main__":
    mcp.run(transport="stdio")
