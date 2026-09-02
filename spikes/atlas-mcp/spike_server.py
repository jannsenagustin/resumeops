"""Disposable ATL-034 MCP stdio spike. Not a production Atlas MCP foundation."""

from datetime import datetime, timezone
import json
import os
from pathlib import Path
import ssl
import time

from mcp.server.fastmcp import FastMCP
import splunklib.client as splunk_client

TOOL = "atlas_mcp_spike_server_info"
CONTRACT = "spike-0.1"
SECRET_PATH = Path("/run/secrets/atlas_mcp_token")
AUDIT_PATH = Path("/audit/atlas-mcp-spike.jsonl")

mcp = FastMCP("Atlas MCP BATCH-008 Spike", log_level="ERROR")


def observe() -> dict:
    started = time.monotonic()
    token = SECRET_PATH.read_text(encoding="utf-8").strip()
    tls_context = ssl.create_default_context(cafile="/trust/search-head-ca.pem")
    service = splunk_client.connect(
        host=os.environ["SPLUNK_HOST"],
        port=8089,
        scheme="https",
        splunkToken=token,
        autologin=False,
        verify=True,
        context=tls_context,
    )
    content = service.get("server/info", output_mode="json").body.read()
    raw = json.loads(content)
    source = raw["entry"][0]
    values = source.get("content", {})
    observed = datetime.now(timezone.utc).isoformat()
    result = {
        "tool": TOOL,
        "contract_version": CONTRACT,
        "source_system": "atlas-search-head",
        "observation_timestamp": observed,
        "applied_bounds": {"endpoint": "server/info", "entries": 1},
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
        "policy_decision": "allow",
        "applied_bounds": result["applied_bounds"],
        "duration_ms": round((time.monotonic() - started) * 1000),
        "upstream_status": "success",
        "result_count": 1,
    }
    AUDIT_PATH.parent.mkdir(parents=True, exist_ok=True)
    with AUDIT_PATH.open("a", encoding="utf-8") as handle:
        handle.write(json.dumps(audit, separators=(",", ":")) + "\n")
    return result


@mcp.tool(name=TOOL)
def spike_server_info() -> dict:
    """Return one bounded, sanitized Search Head observation for BATCH-008 only."""
    return observe()


if __name__ == "__main__":
    mcp.run(transport="stdio")
