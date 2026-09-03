# BATCH-010 — Execution Report

**Batch ID:** BATCH-010

**Date:** 2026-09-03

**Status:** Done

## Objective

Execute ATL-035 only: define the production-oriented Atlas MCP Version 1
security boundary and narrow `get_server_info` tool contract without
implementing or exercising the production MCP service.

## Included Tasks

- ATL-035 — M06 security boundary and tool contract.

## Completed

- Activated BATCH-010 with ATL-035 as its sole task after explicit human
  approval and reconciled Backlog and M06 Active Work state.
- Created one durable normative Version 1 contract owned by the canonical
  documentation matrix.
- Defined the production identity names `atlas_mcp_v1` and
  `atlas_mcp_v1_readonly`, prohibited role inheritance and index access, and
  retained `get_metadata` only as an unproven candidate minimum. Later live
  provisioning must remove it if unnecessary and stop for human review before
  granting any additional permission.
- Added a representative prohibited-capability verification checklist while
  explicitly preserving an explicit-minimum/allowlist role model rather than a
  blocklist security model.
- Defined the human-controlled revocable-token lifecycle and stable
  `ATLAS_MCP_TOKEN_FILE` runtime-only secret-file interface.
- Preserved the ATL-042 Atlas-root trust, SAN/hostname verification, required
  EKU, internal TCP 8089, and fail-closed TLS boundaries, including the
  certificate-renewal constraint without implementing lifecycle work.
- Defined a reject-by-default registry containing only `get_server_info` V1 and
  a purpose-built fixed `server/info` adapter boundary.
- Limited successful normalized evidence to the three fields proved by
  ATL-034: `version`, `server_name`, and `server_role`.
- Defined strict empty-object input, an attributable evidence envelope, field
  and response bounds, minimization, sanitization, and truthful limitations.
- Defined stable secret-safe error categories and a metadata-only audit schema.
- Set security outcomes for 30-day/100-MiB local audit retention and 10-MiB
  file rotation without selecting or implementing a runtime mechanism.
- Kept the representative negative-test matrix inline and defined explicit
  operational stop conditions.
- Added direct traceability to EP-003, DEC-027, ATL-034/BATCH-008,
  ATL-042/BATCH-009, and the applicable M06 success boundary.
- Added a concise architecture link to the canonical contract; no new DEC was
  created because the contract does not alter accepted architecture.

## Not Performed

- No production MCP code, container, tool, registry, adapter, error handler,
  audit writer, retention mechanism, or test harness was implemented.
- No live MCP or Splunk operation ran.
- No Splunk identity, role, capability, token, certificate, or configuration
  was created or changed.
- No additional tool, REST, SDK, SPL, search, shell, Deployment Server,
  listener, or network exposure was introduced.
- ATL-036 through ATL-041 remain inactive. M06 remains Planned / Not Validated.

## Files Changed

- `docs/atlas-mcp-v1-security-and-tool-contract.md`
- `docs/architecture.md`
- `docs/documentation/OWNERSHIP_MATRIX.md`
- `docs/execution-reports/BATCH-010.md`
- `docs/milestones.md`
- `docs/planning/ACTIVE_BATCH.md`
- `docs/planning/BACKLOG.md`

The pre-existing `docs/planning/IDEAS.md` working-tree modification was
preserved and is not part of BATCH-010.

## Validation Performed

- `npm run audit:state`: passed with M06 Planned / Not Validated and
  BATCH-010 mapped only to ATL-035.
- `npm run typecheck`: passed.
- `npm run lint`: passed.
- `npm run build`: passed; evidence registry check was current and all static
  routes built successfully.
- `git diff --check`: passed.
- Focused scope search: found no ATL-036 activation, later batch, or M06 state
  advancement.
- Focused secret-pattern review: found no credential or secret value.
- Manual contract cross-check: covered identity/authorization, token lifecycle,
  runtime secret interface, TLS and renewal constraints, registry, adapter,
  input/output, sanitization, errors, audit, retention/rotation, negative tests,
  stop conditions, change control, and source traceability.

## Risks and Review Points

- `get_metadata` is an unproven candidate minimum based on ATL-034. Later live
  provisioning must determine the exact installed-version requirement, remove
  it if unnecessary, and stop before granting any additional permission.
- The human accepted the 30-day/100-MiB retention and 10-MiB rotation limits;
  ATL-035 intentionally does not choose a runtime mechanism.
- Later implementation must enforce the 8-KiB result ceiling and finite timeout;
  their concrete mechanisms remain ATL-036 work.
- The Atlas root private key and Search Head certificate lifecycle remain
  outside this task under the existing human-controlled ATL-042 boundary.

## Human Review

The human accepted ATL-035 in principle on 2026-09-03 with two required
amendments. The final contract preserves `get_metadata` only as an unproven
candidate minimum that later live provisioning must remove if unnecessary and
must not expand without a new human stop gate. It also includes a representative
prohibited-capability verification checklist while explicitly retaining an
explicit-minimum/allowlist security model. Validation passed after those
amendments.

The human approved ATL-035 and BATCH-010 closeout on 2026-09-03. That acceptance
does not activate ATL-036 or validate M06.

## Final Status

Done. The approved contract satisfies ATL-035 acceptance criteria and preserves
EP-003, DEC-027, the ATL-034 architecture proof, and the ATL-042 TLS trust
boundary. BATCH-010 is closed, ATL-036 remains inactive, and M06 remains Planned
/ Not Validated.
