"""Strict stdio protocol surface for the sole approved Version 1 tool."""

import json
import os
from pathlib import Path

import anyio
from mcp import types
from mcp.server import NotificationOptions, Server
from mcp.server.models import InitializationOptions
from mcp.server.stdio import stdio_server

from . import CONTRACT_VERSION
from .application import AtlasApplication
from .audit import AuditSink
from .errors import AtlasMCPError
from .registry import PRODUCTION_REGISTRY
from .tool import TOOL_NAME, get_server_info

SERVER_NAME = "Atlas MCP"
INPUT_SCHEMA = {"type": "object", "properties": {}, "additionalProperties": False}


def _application() -> AtlasApplication:
    return AtlasApplication(
        PRODUCTION_REGISTRY,
        AuditSink(Path(os.environ.get("ATLAS_MCP_AUDIT_DIR", "/audit"))),
    )


def _error_result(error: AtlasMCPError, tool_name: str) -> types.CallToolResult:
    envelope = error.envelope(tool_name, CONTRACT_VERSION)
    return types.CallToolResult(
        content=[types.TextContent(type="text", text=json.dumps(envelope, separators=(",", ":")))],
        structuredContent=envelope,
        isError=True,
    )


def build_server() -> Server:
    server = Server(SERVER_NAME, version="1.0.0")

    @server.list_tools()
    async def list_tools() -> list[types.Tool]:
        if PRODUCTION_REGISTRY.names() != (TOOL_NAME,):
            raise RuntimeError("Production registry does not match the approved contract")
        return [
            types.Tool(
                name=TOOL_NAME,
                description="Return the approved minimal Search Head identification observation.",
                inputSchema=INPUT_SCHEMA,
            )
        ]

    @server.call_tool(validate_input=False)
    async def call_tool(name: str, arguments: dict[str, object]) -> dict[str, object] | types.CallToolResult:
        try:
            _application().authorize(name, CONTRACT_VERSION)
            if arguments != {}:
                _application().reject(name, CONTRACT_VERSION, "INVALID_INPUT")
            return get_server_info()
        except AtlasMCPError as error:
            safe_name = name if isinstance(name, str) and len(name) <= 64 else "invalid"
            return _error_result(error, safe_name)

    return server


async def _run() -> None:
    server = build_server()
    async with stdio_server() as (read_stream, write_stream):
        await server.run(
            read_stream,
            write_stream,
            InitializationOptions(
                server_name=SERVER_NAME,
                server_version="1.0.0",
                capabilities=server.get_capabilities(
                    notification_options=NotificationOptions(),
                    experimental_capabilities={},
                ),
            ),
        )


def run() -> None:
    anyio.run(_run)
