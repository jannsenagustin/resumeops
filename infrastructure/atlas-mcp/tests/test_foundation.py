from datetime import datetime, timezone
import json
import os
from pathlib import Path
import ssl
import tempfile
import unittest
from unittest.mock import patch

from atlas_mcp.audit import ACTIVE_NAME, AuditSink
from atlas_mcp.application import AtlasApplication
from atlas_mcp.errors import AtlasMCPError
from atlas_mcp.registry import ExplicitToolRegistry, PRODUCTION_REGISTRY, ToolContract
from atlas_mcp.runtime import RuntimePaths, create_tls_context, read_runtime_token
from atlas_mcp.sanitization import enforce_serialized_result_bound, sanitize_string, sanitize_string_array
from atlas_mcp.server import build_server


class RegistryTests(unittest.TestCase):
    def test_production_registry_is_empty_for_foundation_scope(self) -> None:
        self.assertEqual(PRODUCTION_REGISTRY.names(), ())
        build_server()

    def test_unknown_case_alias_and_version_are_rejected(self) -> None:
        registry = ExplicitToolRegistry(
            [ToolContract("approved", "1.0.0", lambda arguments: arguments)]
        )
        for name, version in (("unknown", "1.0.0"), ("APPROVED", "1.0.0"), ("alias", "1.0.0"), ("approved", "2.0.0")):
            with self.subTest(name=name, version=version):
                with self.assertRaises(AtlasMCPError) as raised:
                    registry.authorize(name, version)
                self.assertEqual(raised.exception.code, "TOOL_NOT_REGISTERED")

    def test_policy_rejection_is_audited_before_any_handler(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            audit_dir = Path(directory)
            application = AtlasApplication(PRODUCTION_REGISTRY, AuditSink(audit_dir))
            with self.assertRaises(AtlasMCPError) as raised:
                application.authorize("get_server_info", "1.0.0")
            event = json.loads((audit_dir / ACTIVE_NAME).read_text(encoding="utf-8"))
            self.assertEqual(raised.exception.code, "TOOL_NOT_REGISTERED")
            self.assertEqual(event["decision"], "rejected")
            self.assertEqual(event["source"], "none")
            self.assertEqual(event["correlation_id"], raised.exception.correlation_id)


class RuntimeTests(unittest.TestCase):
    def test_only_file_path_environment_interfaces_are_read(self) -> None:
        environment = {
            "ATLAS_MCP_TOKEN_FILE": "/run/secrets/token",
            "ATLAS_MCP_CA_FILE": "/run/trust/root.pem",
            "ATLAS_MCP_AUDIT_DIR": "/audit",
            "SPLUNK_TOKEN": "must-not-be-consumed",
        }
        with patch.dict(os.environ, environment, clear=True):
            paths = RuntimePaths.from_environment()
        self.assertEqual(paths.token_file, Path("/run/secrets/token"))

    def test_token_file_must_be_restrictive_and_nonempty(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            token_file = Path(directory) / "token"
            token_file.write_text("fixture-token", encoding="utf-8")
            token_file.chmod(0o600)
            self.assertEqual(read_runtime_token(token_file), "fixture-token")
            token_file.chmod(0o644)
            with self.assertRaises(AtlasMCPError):
                read_runtime_token(token_file)

    def test_token_symlink_is_rejected(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            token_file = Path(directory) / "token"
            token_file.write_text("fixture-token", encoding="utf-8")
            token_file.chmod(0o600)
            link = Path(directory) / "link"
            link.symlink_to(token_file)
            with self.assertRaises(AtlasMCPError):
                read_runtime_token(link)

    def test_tls_context_retains_required_verification(self) -> None:
        context = create_tls_context(Path(ssl.get_default_verify_paths().cafile))
        self.assertEqual(context.verify_mode, ssl.CERT_REQUIRED)
        self.assertTrue(context.check_hostname)


class AuditTests(unittest.TestCase):
    def test_metadata_only_event_is_written_with_restrictive_permissions(self) -> None:
        event = {
            "schema_version": "1.0.0", "event_id": "event", "correlation_id": "correlation",
            "timestamp": datetime.now(timezone.utc).isoformat(), "invocation_identity": "unavailable",
            "tool": "unregistered", "contract_version": "1.0.0", "source": "none",
            "source_role": "none", "requested_bounds": {}, "applied_bounds": {},
            "decision": "rejected", "duration_ms": 0, "upstream_status_category": "not_started",
            "result_count": None, "rejection_reason": "tool_not_registered",
            "sanitization_applied": False,
        }
        with tempfile.TemporaryDirectory() as directory:
            audit_dir = Path(directory) / "audit"
            AuditSink(audit_dir).write(event)
            active = audit_dir / ACTIVE_NAME
            self.assertEqual(json.loads(active.read_text(encoding="utf-8")), event)
            self.assertEqual(active.stat().st_mode & 0o777, 0o600)

    def test_payload_or_unknown_fields_fail_closed(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            with self.assertRaises(AtlasMCPError):
                AuditSink(Path(directory)).write({"payload": "prohibited"})

    def test_sensitive_or_unbounded_metadata_value_fails_closed(self) -> None:
        event = {
            "schema_version": "1.0.0", "event_id": "event", "correlation_id": "correlation",
            "timestamp": datetime.now(timezone.utc).isoformat(), "invocation_identity": "unavailable",
            "tool": "secret value with spaces", "contract_version": "1.0.0", "source": "none",
            "source_role": "none", "requested_bounds": {}, "applied_bounds": {},
            "decision": "rejected", "duration_ms": 0, "upstream_status_category": "not_started",
            "result_count": None, "rejection_reason": "tool_not_registered", "sanitization_applied": False,
        }
        with tempfile.TemporaryDirectory() as directory:
            with self.assertRaises(AtlasMCPError):
                AuditSink(Path(directory)).write(event)

    def test_rotation_closes_full_file_before_new_active_write(self) -> None:
        event = {
            "schema_version": "1.0.0", "event_id": "event", "correlation_id": "correlation",
            "timestamp": datetime.now(timezone.utc).isoformat(), "invocation_identity": "unavailable",
            "tool": "unregistered", "contract_version": "1.0.0", "source": "none",
            "source_role": "none", "requested_bounds": {}, "applied_bounds": {},
            "decision": "rejected", "duration_ms": 0, "upstream_status_category": "not_started",
            "result_count": None, "rejection_reason": "tool_not_registered", "sanitization_applied": False,
        }
        with tempfile.TemporaryDirectory() as directory:
            audit_dir = Path(directory)
            active = audit_dir / ACTIVE_NAME
            active.write_text("old-record\n", encoding="utf-8")
            with patch("atlas_mcp.audit.MAX_ACTIVE_BYTES", 1):
                AuditSink(audit_dir).write(event)
            self.assertEqual(len(list(audit_dir.glob("atlas-mcp-*.jsonl"))), 1)
            self.assertEqual(json.loads(active.read_text(encoding="utf-8")), event)


class SanitizationTests(unittest.TestCase):
    def test_string_controls_are_removed_and_values_are_trimmed(self) -> None:
        self.assertEqual(sanitize_string("  Atlas\x00 Search Head  "), "Atlas Search Head")

    def test_string_and_array_bounds_fail_closed(self) -> None:
        with self.assertRaises(AtlasMCPError):
            sanitize_string("x" * 257)
        with self.assertRaises(AtlasMCPError):
            sanitize_string_array(["role"] * 9)
        self.assertEqual(sanitize_string_array(["z", "a"]), ["a", "z"])

    def test_serialized_result_is_limited_to_eight_kibibytes(self) -> None:
        enforce_serialized_result_bound({"value": "safe"})
        with self.assertRaises(AtlasMCPError):
            enforce_serialized_result_bound({"value": "x" * 8192})


if __name__ == "__main__":
    unittest.main()
