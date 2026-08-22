# Atlas Active Batch

> Parser-readiness note: Keep this single-batch structure and its field labels stable for future build-time parsing.

Only one active batch may exist. Codex may execute only tasks explicitly included here; backlog presence alone does not authorize execution. Human approval is required before this file is populated or changed.

## Current Batch

**Batch ID:** BATCH-001

**Status:** Approved

**Objective:** ATL-002 — Install Splunk Enterprise directly on Rocky Linux

**Included Tasks:** ATL-002.

**Excluded Scope:** All backlog and proposal work other than ATL-002.

**Dependencies:** ATL-001 — Done.

**Acceptance Criteria:** Splunk is installed using a documented, repeatable process and its local service operation is validated without claiming the Deployment Server role is configured.

**Human Validation Required:** Yes; a human must validate the implementation and results before ATL-002 is marked Done.

**Execution Notes:** BATCH-001 authorizes ATL-002 only. No additional backlog item is active.

**Expected Report Path:** `docs/execution-reports/BATCH-001.md` after execution is attempted.
