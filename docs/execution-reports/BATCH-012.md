# BATCH-012 — Execution Report

**Batch ID:** BATCH-012

**Date:** 2026-09-03

**Status:** Done

## Objective

Execute ATL-037 only: implement and validate the sole approved
`get_server_info` end-to-end path through the accepted containerized MCP
foundation.

## Included Tasks

- ATL-037 — M06 `get_server_info` end-to-end path.

## Completed

- Activated BATCH-012 with ATL-037 as its sole task and synchronized Backlog
  and M06 Active Work state.
- Replaced the generated FastMCP tool surface with a low-level MCP server that
  publishes exactly one literal tool and an exact empty-object schema with
  `additionalProperties: false`.
- Registered only `get_server_info` Version 1.0.0 through the explicit
  production registry. Unknown names, aliases, case variants, and versions
  remain rejected before adapter construction.
- Added audited protocol handling for invalid inputs and unregistered tools
  with the approved structured error envelopes.
- Implemented the purpose-built adapter as one fixed `server/info` SDK read
  with one-entry bounds, a five-second SDK HTTP timeout, verified HTTPS, and no
  client-controlled method, endpoint, parameter, pagination, or source.
- Implemented exact normalization of `version`, `server_name`, and
  `server_role`; control-character removal; string and array bounds;
  deterministic role ordering; removal of all other upstream fields; the
  approved limitation; and the complete 8-KiB response ceiling.
- Implemented success and failure audit events with source state, categorical
  upstream status, result count, sanitization state, and correlation context.
- Updated the Compose image name and runtime documentation for the sole live
  tool path.
- Added the accepted Docker Desktop for Windows runtime model with a
  least-capability, network-disabled initializer; Linux-backed token and audit
  volumes; a non-root, network-disabled metadata-only audit exporter; and
  explicit volume retirement after export.
- Updated the authoritative MCP Version 1 contract and architecture to make
  that Windows model an explicit supported boundary without weakening token,
  TLS, audit, tool-surface, or Splunk-permission controls.

## Blocked

- None.

## Rejected

- Reuse of the revoked ATL-034 spike token or identity as production runtime
  authentication.
- Automated role, user, or token provisioning.
- Any additional capability, tool, endpoint, REST method, SPL, shell,
  Deployment Server or Indexer-direct path, listener, or published port.

## Files Changed

- `docs/architecture.md`
- `docs/atlas-mcp-v1-security-and-tool-contract.md`
- `docs/execution-reports/BATCH-012.md`
- `docs/milestones.md`
- `docs/planning/ACTIVE_BATCH.md`
- `docs/planning/BACKLOG.md`
- `infrastructure/atlas-mcp/README.md`
- `infrastructure/atlas-mcp/compose.yaml`
- `infrastructure/atlas-mcp/compose.windows.yaml`
- `infrastructure/atlas-mcp/Dockerfile`
- `infrastructure/atlas-mcp/src/atlas_mcp/adapter.py`
- `infrastructure/atlas-mcp/src/atlas_mcp/application.py`
- `infrastructure/atlas-mcp/src/atlas_mcp/registry.py`
- `infrastructure/atlas-mcp/src/atlas_mcp/server.py`
- `infrastructure/atlas-mcp/src/atlas_mcp/tool.py`
- `infrastructure/atlas-mcp/tests/test_foundation.py`

The pre-existing `docs/planning/IDEAS.md` modification remains preserved and
is not part of BATCH-012.

## Validation Performed

- Built `atlas-mcp:v1-get-server-info` from the digest-pinned runtime.
- All 17 fixture-only unit, negative, and Windows-boundary invariant tests
  passed without network access or
  a production credential.
- Isolated MCP protocol initialization negotiated version `2025-06-18`.
- `tools/list` returned exactly `get_server_info` with a strict empty-object
  schema and no additional properties.
- A call containing a prohibited `endpoint` property returned the approved
  `INVALID_INPUT` envelope without attempting runtime or upstream access.
- An unregistered `run_search` call returned the approved
  `TOOL_NOT_REGISTERED` envelope without adapter construction.
- Both rejection paths used only an ephemeral audit tmpfs; no secret, trust
  file, Atlas network, or live Splunk operation was involved.
- The runtime-interface presence check reported all three required host
  interfaces present without displaying any credential value.
- Rebuilt `atlas-mcp:v1-get-server-info` from the current digest-pinned source;
  its fixture-only test stage remained successful.
- Confirmed the existing `atlas-network` and healthy `atlas-search-head` and
  `atlas-indexer` containers before live access.
- The first Compose invocation discovered exactly `get_server_info` but failed
  closed with `INTERNAL_ERROR` before upstream access because Docker Desktop
  presented the token secret as mode `0777` and ignored the requested secret
  ownership and mode.
- Staged the same protected host token into an ephemeral Linux-backed Docker
  volume as UID/GID 10001 with mode `0400`; no token content was displayed or
  passed in process arguments.
- A second invocation with the corrected token mount still failed closed before
  upstream access because the Windows audit bind mount rejected directory
  `chmod` with `EPERM`.
- With an ephemeral Linux-backed audit volume enforcing directory mode `0700`,
  the unchanged runtime image successfully negotiated MCP protocol `2025-06-18`,
  listed only `get_server_info` with the strict empty-object schema, and invoked
  the fixed `server/info` read over verified TLS using the dedicated token.
- The successful Version 1 envelope contained only the approved normalized
  fields: Splunk version `10.0.8`, server name `atlas-search-head`, the bounded
  sanitized server-role array, fixed source attribution and applied bounds,
  truthful sanitization state, no warnings, and the approved limitation.
- The successful audit volume contained exactly one mode-`0600` metadata-only
  event with `decision: succeeded`, `upstream_status_category: success`,
  `result_count: 1`, `sanitization_applied: true`, and matching observation
  timing. A review copy was persisted outside Git as
  `atl037-live-validation-20260904.jsonl` in the supplied protected audit
  directory.
- No additional Splunk permission was required or granted.
- After human acceptance of the initial result and Windows adjustment, the
  documented `compose.windows.yaml` path was revalidated from initialization
  through controlled export. The initializer ran with no network, a read-only
  root filesystem, all capabilities dropped except `CHOWN` and `FOWNER`, and
  placed the token at mode `0400`, owner `10001:10001`; the audit directory was
  mode `0700`, owner `10001:10001`.
- The revalidation MCP runtime ran as UID/GID 10001 with all capabilities
  dropped, a read-only root filesystem, no listener or published port, and only
  the approved `atlas-network`. It again negotiated protocol `2025-06-18`,
  discovered exactly `get_server_info`, and returned the approved sanitized
  Splunk 10.0.8 envelope through the fixed `server/info` read.
- Revalidation produced exactly one metadata-only audit event at mode `0600`,
  owner `10001:10001`, with `decision: succeeded`, `result_count: 1`, and
  `sanitization_applied: true`. The network-disabled, non-root,
  capability-dropped exporter copied it to the protected Windows host audit
  directory as `atlas-mcp.jsonl`.
- Closeout reran `npm run audit:state`, `npm run typecheck`, `npm run lint`,
  `npm run build`, and `git diff --check`. All passed with M06 Planned / Not
  Validated, no active batch, a current evidence registry, and all static routes
  generated. The 17-test Atlas MCP container suite also remained green.

## Human Review Required

The human accepted ATL-037 and the supported Docker Desktop for Windows runtime
model on 2026-09-04, then accepted the final revalidation and authorized Atlas
EOS closeout for BATCH-012. M06 remains Planned / Not Validated, and ATL-038
remains inactive. No additional Splunk permission was necessary.

## Deviations

- None from the revised boundary. The human accepted Linux-backed runtime
  volumes plus controlled audit export as the supported Docker Desktop for
  Windows design adjustment on 2026-09-04.
- The first closeout build attempt could not reach Google Fonts from the
  restricted sandbox. The unchanged build passed when rerun with approved
  network access; no source or dependency change was required.

## Risks

- The live success proves production authentication, the current minimum role's
  ability to perform the fixed read, Atlas-root TLS trust, sanitized output on
  Splunk 10.0.8, Linux-volume permission enforcement, and controlled audit
  export on the current Docker Desktop for Windows host.
- ATL-038 negative security-boundary validation remains separate and inactive.

## Follow-up Backlog Items

- None created. ATL-038 remains an inactive backlog item requiring separate
  human activation.

## Final Status

Done. The human accepted ATL-037 and authorized BATCH-012 closeout on
2026-09-04. Revalidation through the accepted, documented Docker Desktop for
Windows boundary succeeded without any Splunk permission expansion. M06
remains Planned / Not Validated, ATL-038 through ATL-041 remain inactive, and
no subsequent work was activated.
