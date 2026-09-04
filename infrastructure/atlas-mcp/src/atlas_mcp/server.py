"""Transport shell for the ATL-036 foundation."""

import warnings

# mcp 1.26.0 currently triggers this known pydantic-settings warning while
# constructing FastMCP. Keep stdio protocol output clean without hiding other
# warning categories or messages.
warnings.filterwarnings(
    "ignore",
    message=r"Field 'lifespan' has an incomplete definition:.*",
    category=Warning,
)

from mcp.server.fastmcp import FastMCP

from .registry import PRODUCTION_REGISTRY

SERVER_NAME = "Atlas MCP"


def build_server() -> FastMCP:
    if PRODUCTION_REGISTRY.names():
        raise RuntimeError("ATL-036 must not expose a live tool")
    return FastMCP(SERVER_NAME, log_level="ERROR")


def run() -> None:
    build_server().run(transport="stdio")
