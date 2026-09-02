# Atlas Active Batch

> Parser-readiness note: Keep this single-batch structure and its field labels stable for future build-time parsing.

Only one active batch may exist. Codex may execute only tasks explicitly included here; backlog presence alone does not authorize execution. Human approval is required before this file is populated or changed.

## Current Batch

**Batch ID:** BATCH-008

**Status:** In Progress

**Objective:** Execute ATL-034 only: prove the smallest approved VS Code + Codex → containerized stdio → Atlas MCP spike → TLS-verified Splunk Python SDK → Search Head path without creating a production MCP tool surface or changing existing Atlas network exposure.

**Included Tasks:** ATL-034.

**Excluded Scope:** ATL-035 through ATL-041; production MCP foundation or tool implementation; a production `get_server_info` contract; additional metadata tools; SPL or search; Deployment Server access; secondary clients; HTTP or other network transport; host publication of Splunk TCP 8089; mutation or administrative capability; new enterprise PKI or secret-management infrastructure; milestone completion or validation claims; staging, committing, or pushing.

**Dependencies:** Milestone 05 remains Complete / Validated; EP-003 is Approved; DEC-027 is Accepted; ATL-034 is the sole included task; the Search Head and Indexer baseline remains stable on `atlas-network`; Docker and VS Code + Codex are available; human review of this batch plan is required before spike execution.

**Acceptance Criteria:** Evidence demonstrates that VS Code + Codex can launch and stop one dedicated foreground spike container over stdio; the container joins `atlas-network` and reaches the Search Head management interface internally on TCP 8089 through the pinned Splunk Enterprise SDK for Python; a dedicated non-human Splunk identity and revocable token are supplied only through the approved local-host/runtime Docker secret interface; the existing Search Head certificate is explicitly trusted with verification enabled; one bounded diagnostic server-information observation traverses the policy, adapter, sanitization, and audit path; the response is attributable and contains no secret; a metadata-only audit record persists in the approved host-mounted local directory; no persistent MCP listener or host publication of Splunk TCP 8089 exists; invalid TLS trust, invalid authentication, unregistered tool invocation, and representative mutation attempts fail closed; all captured evidence is reviewed for secrets and persistent identifiers; and no scope outside ATL-034 is implemented.

**Human Validation Required:** Yes. Human review of this plan is required before implementation begins, and separate human review of results and evidence is required before ATL-034 or BATCH-008 can close.

**Execution Notes:** Human approved BATCH-008 and ATL-034 execution on 2026-09-01. The isolated spike proved the stdio lifecycle and one-tool registry, but verified TLS failed closed because modern Python/OpenSSL rejected the extensionless `SplunkCommonCA` as `invalid CA certificate`. Execution stopped without weakening verification or changing Search Head certificates. Human confirmed the short-lived token was revoked and the protected host token file deleted. Human approved EP-005 and created ATL-042 in Backlog on 2026-09-02, but neither action grants execution authority. ATL-042 is not included in this batch. BATCH-008 remains stopped at the verified-TLS gate with ATL-034 active until TLS remediation is separately activated, executed, accepted, and a human authorizes resumption.

**Validation plan:** Before execution, record the known-good Docker/Splunk baseline and inspect the Search Head certificate without changing it. During execution, validate stdio startup, tool discovery limited to the spike surface, authenticated SDK connectivity, verified TLS identity, bounded diagnostic output, sanitization, audit persistence, and clean shutdown. After execution, inspect container and host network exposure, review runtime arguments and all outputs for secret leakage, exercise the negative checks, rerun Atlas state and repository validations, and reconcile the execution report and evidence index without changing M06 status.

**Negative checks:** Confirm that invalid certificate trust and invalid authentication fail closed; unregistered tools cannot execute; write, restart, reload, deployment, deletion, arbitrary SDK, arbitrary REST, SPL, and shell operations are unavailable; the dedicated identity cannot perform representative mutations; no MCP network listener exists; Splunk TCP 8089 remains unpublished to the Windows host; and tokens or secret-bearing values do not appear in protocol output, errors, logs, audit records, process arguments selected for evidence, screenshots, or repository files.

**Expected evidence:** A reviewed BATCH-008 execution report; redacted proof of VS Code + Codex stdio launch and clean shutdown; container/network inspection showing no MCP listener and no host-published Splunk TCP 8089; certificate inspection and successful verified-trust evidence; successful dedicated-identity SDK connection evidence; one bounded sanitized diagnostic response with source and observation time; its corresponding metadata-only audit record; failed invalid-trust and invalid-authentication attempts; rejected unregistered and mutation operations; secret-absence review; and validation command results. Publishable artifacts must use the canonical evidence naming/index process; sensitive raw captures remain excluded until reviewed.

**Stop conditions:** Stop immediately and return to human review if containerized stdio is incompatible with VS Code + Codex; internal Search Head access would require publishing TCP 8089 or adding a listener; certificate verification cannot succeed with narrowly scoped trust material; runtime secret injection exposes the token in prohibited surfaces; the dedicated identity has mutation authority or cannot support the bounded diagnostic read; the SDK requires generic or unapproved access; sanitization or audit isolation fails; any negative check unexpectedly succeeds; the stable M05 Splunk baseline changes; evidence cannot be captured safely; or completing the spike would require work from ATL-035 through ATL-041 or any other excluded scope. Do not substitute HTTP, disable TLS verification as a validated state, broaden credentials, implement a production tool, or expand scope without a new human decision.

**Expected Report Path:** `docs/execution-reports/BATCH-008.md` after execution. Do not create a completion report during planning.
