# BATCH-011 — Execution Report

**Batch ID:** BATCH-011

**Date:** 2026-09-03

**Status:** Done

## Objective

Execute ATL-036 only: build the production-oriented containerized Atlas MCP
foundation defined by the approved Version 1 security contract without
exposing a live MCP tool or implementing the ATL-037 Search Head path.

## Included Tasks

- ATL-036 — M06 containerized MCP foundation.

## Completed

- Activated BATCH-011 with ATL-036 as its sole task and synchronized the
  Backlog and M06 Active Work fields.
- Added a digest-pinned Python 3.13.7 multi-stage container and fully pinned
  direct and transitive Python dependency set, including `mcp==1.26.0` and
  `splunk-sdk==2.1.1`.
- Added a stdio-only FastMCP lifecycle with an empty explicit production tool
  registry. No live tool is registered or exposed in ATL-036.
- Added reject-by-default registry and policy primitives that reject unknown,
  case-variant, alias, and version-mismatched tools before handler or adapter
  access and persist a categorical metadata-only rejection event.
- Added the approved `ATLAS_MCP_TOKEN_FILE`, `ATLAS_MCP_CA_FILE`, and audit
  directory interfaces. Token loading rejects missing, unreadable, empty,
  whitespace-bearing, permissive, non-regular, and symlink inputs without
  disclosing sensitive values or paths.
- Added normal default Python TLS-context construction that retains
  `CERT_REQUIRED` and hostname verification, plus the fixed private Splunk SDK
  connection boundary for `atlas-search-head:8089`. No adapter operation or
  live connection was implemented or invoked.
- Added the stable secret-safe error categories and envelope defined by the
  approved contract.
- Added the exact metadata-only audit field allowlist, restrictive local file
  permissions, 8-KiB event ceiling, 10-MiB active-file rotation, 30-day
  retention, and 100-MiB total ceiling. Rotation and audit failures fail
  visibly rather than permitting an unaudited success.
- Added a hardened Compose definition with no port or listener declaration,
  the existing external `atlas-network`, a read-only root filesystem, UID/GID
  10001, all capabilities dropped, privilege escalation disabled, runtime-only
  secret and public-root mounts, and a narrow audit mount.
- Documented operation, security boundaries, host-path ownership, and
  foundation-only validation.

## Blocked

- None.

## Rejected

- Reuse or promotion of the disposable ATL-034 spike as production code.
- Registration or implementation of live `get_server_info`, which remains
  ATL-037 scope.
- Live Splunk access, credentials, identity or role provisioning, certificate
  changes, other tools, listeners, published ports, and later M06 work.

## Files Changed

- `docs/architecture.md`
- `docs/execution-reports/BATCH-011.md`
- `docs/milestones.md`
- `docs/planning/ACTIVE_BATCH.md`
- `docs/planning/BACKLOG.md`
- `infrastructure/atlas-mcp/.dockerignore`
- `infrastructure/atlas-mcp/Dockerfile`
- `infrastructure/atlas-mcp/README.md`
- `infrastructure/atlas-mcp/compose.yaml`
- `infrastructure/atlas-mcp/requirements.txt`
- `infrastructure/atlas-mcp/src/atlas_mcp/__init__.py`
- `infrastructure/atlas-mcp/src/atlas_mcp/__main__.py`
- `infrastructure/atlas-mcp/src/atlas_mcp/adapter.py`
- `infrastructure/atlas-mcp/src/atlas_mcp/application.py`
- `infrastructure/atlas-mcp/src/atlas_mcp/audit.py`
- `infrastructure/atlas-mcp/src/atlas_mcp/errors.py`
- `infrastructure/atlas-mcp/src/atlas_mcp/registry.py`
- `infrastructure/atlas-mcp/src/atlas_mcp/runtime.py`
- `infrastructure/atlas-mcp/src/atlas_mcp/sanitization.py`
- `infrastructure/atlas-mcp/src/atlas_mcp/server.py`
- `infrastructure/atlas-mcp/tests/test_foundation.py`

The pre-existing `docs/planning/IDEAS.md` working-tree modification remains
preserved and is not part of BATCH-011.

## Validation Performed

- Final runtime image build passed. The build executed 14 standard-library unit
  and negative tests covering empty production discovery, explicit registration,
  tool/version rejection, rejection auditing, runtime path isolation,
  restrictive token handling, symlink rejection, TLS verification flags,
  string/control-character/array/result-size sanitization, audit field and value
  minimization, audit permissions, fail-closed unknown fields, and rotation
  behavior.
- An isolated hardened container ran with `--network none`, no secrets, and no
  mounts. MCP initialization negotiated protocol `2025-06-18`, `tools/list`
  returned exactly `[]`, and the process exited cleanly through stdin control.
- Image inspection reported `User=10001:10001`, entrypoint
  `python -m atlas_mcp`, and no exposed ports.
- Compose model inspection confirmed no `ports` or `expose` fields, the external
  `atlas-network`, read-only root filesystem, dropped capabilities,
  no-new-privileges, file-path-only runtime environment values, and narrow
  token, public-root, and audit mounts.
- `npm run audit:state`: passed with M06 Planned / Not Validated and
  BATCH-011 mapped only to ATL-036 in Review.
- `npm run typecheck`: passed.
- `npm run lint`: passed.
- `npm run build`: passed; the evidence image registry was current and all
  static routes built successfully.
- `git diff --check`: passed; only line-ending conversion warnings were
  reported for existing Windows working-tree conventions.
- Focused scope review found no later task activation or M06 advancement.
- Focused security review found only the expected token file-path interface
  and the private fixed SDK authentication handoff; it found no credential
  value, verification bypass, shell execution, listener, or published port.
- Final image inspection reported `User=10001:10001`, entrypoint
  `python -m atlas_mcp`, no exposed ports, and no remaining foundation
  container process after shutdown.
- Closeout reran `npm run audit:state`, `npm run typecheck`, `npm run lint`,
  `npm run build`, and `git diff --check`; all passed with M06 Planned / Not
  Validated, no active batch, and a current evidence registry. Line-ending
  conversion warnings remained informational only.

No live Splunk request ran. No credential, protected CA material, or production
audit path was mounted or inspected.

## Human Review Required

The human reviewed and accepted ATL-036 on 2026-09-03 and authorized Atlas EOS
closeout for BATCH-011. The approval explicitly keeps M06 Planned / Not
Validated and ATL-037 inactive.

## Deviations

- None from the approved ATL-036 scope. The production registry remains empty
  until ATL-037 explicitly registers the approved live tool.
- The first repository audit rejected `Active` because Atlas permits only
  `In Progress` or `Review` for a populated batch, and the first production
  build rejected an objective that named a later task outside Included Tasks.
  The synchronized state now uses `Review`, and the objective preserves the
  same exclusion without naming the later identifier. Both checks passed on
  rerun.

## Risks

- The container and foundation behavior are locally validated, but the runtime
  secret mount, Atlas-root mount, audit host directory, external network join,
  and fixed SDK connection are intentionally not exercised without ATL-037
  live-path authority and human-controlled runtime inputs.
- The Splunk role's exact minimum capability remains unproven. Per the approved
  contract, later live provisioning must remove `get_metadata` if unnecessary
  and stop for human review before granting any additional permission.
- MCP 1.26.0 emits a known `pydantic-settings` incomplete-field warning under
  the unittest warning policy; the production runtime narrowly filters that
  one message to keep protocol output clean. The runtime handshake emitted no
  warning or operational content on protocol stdout.

## Follow-up Backlog Items

- ATL-037 remains the next dependency-ordered candidate but is inactive.
- ATL-038 through ATL-041 remain inactive.

## Final Status

Done. The human accepted ATL-036 and authorized BATCH-011 closeout on
2026-09-03. The containerized foundation is complete with an empty production
registry and no live Splunk path. M06 remains Planned / Not Validated, ATL-037
through ATL-041 remain inactive, and no subsequent work was activated.
