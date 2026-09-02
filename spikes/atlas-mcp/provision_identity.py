"""One-time BATCH-008 identity provisioner; execute only inside atlas-search-head."""

import base64
import json
import os
import secrets
import ssl
import urllib.error
import urllib.parse
import urllib.request

BASE = "https://127.0.0.1:8089"
ROLE = "atlas_mcp_spike_readonly"
USER = "atlas_mcp_spike"
TOKEN_PATH = "/tmp/atlas_mcp_spike_token"


def request(path: str, data: dict[str, str], password: str) -> dict:
    encoded = urllib.parse.urlencode(data).encode()
    req = urllib.request.Request(f"{BASE}{path}", data=encoded)
    basic = base64.b64encode(f"admin:{password}".encode()).decode()
    req.add_header("Authorization", f"Basic {basic}")
    req.add_header("Accept", "application/json")
    context = ssl._create_unverified_context()
    try:
        with urllib.request.urlopen(req, context=context, timeout=15) as response:
            return json.load(response)
    except urllib.error.HTTPError as error:
        detail = error.read().decode(errors="replace")
        raise RuntimeError(f"Splunk provisioning request failed: HTTP {error.code}: {detail[:400]}") from error


def main() -> None:
    password = os.environ["SPLUNK_PASSWORD"]
    request(
        "/services/authorization/roles",
        {"name": ROLE, "capabilities": "get_metadata", "output_mode": "json"},
        password,
    )
    request(
        "/services/authentication/users",
        {
            "name": USER,
            "password": secrets.token_urlsafe(32),
            "roles": ROLE,
            "defaultApp": "search",
            "output_mode": "json",
        },
        password,
    )
    token_response = request(
        "/services/authorization/tokens",
        {"name": USER, "audience": "AtlasMCPSpike", "expires_on": "+1d", "output_mode": "json"},
        password,
    )
    token = token_response["entry"][0]["content"]["token"]
    with open(TOKEN_PATH, "w", encoding="utf-8") as handle:
        handle.write(token)
    os.chmod(TOKEN_PATH, 0o600)
    print("Dedicated spike role, identity, and revocable token created; token value suppressed.")


if __name__ == "__main__":
    main()
