# Atlas Active Batch

> Parser-readiness note: Keep this single-batch structure and its field labels stable for future build-time parsing.

Only one active batch may exist. Codex may execute only tasks explicitly included here; backlog presence alone does not authorize execution. Human approval is required before this file is populated or changed.

## Current Batch

**Batch ID:** Unassigned

**Status:** Empty

**Objective:** No active batch. Future work requires explicit human activation.

**Included Tasks:** None.

**Excluded Scope:** All engineering work until a new batch is explicitly activated, including ATL-034/BATCH-008 resumption and ATL-035 through ATL-041.

**Dependencies:** None.

**Acceptance Criteria:** Not applicable while no batch is active.

**Human Validation Required:** Human approval is required before this file is populated with a new active batch. ATL-042 and BATCH-009 are closed, but ATL-034/BATCH-008 require separate human authorization before resumption.

**Execution Notes:** Human accepted the BATCH-009 Gate 1 preflight, Gate 2 authoritative cold-backup checkpoint, Gate 3 TLS remediation, and the final read-only Splunk data-plane certificate investigation on 2026-09-02. ATL-042 is Done and BATCH-009 is closed. The standards-valid Search Head management/KV TLS prerequisite is validated, but M06 remains Planned / Not Validated and ATL-034/BATCH-008 remain open and stopped pending a separate human decision.

**Expected Report Path:** Historical closeout: `docs/execution-reports/BATCH-009.md`.
