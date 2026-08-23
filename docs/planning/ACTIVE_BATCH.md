# Atlas Active Batch

> Parser-readiness note: Keep this single-batch structure and its field labels stable for future build-time parsing.

Only one active batch may exist. Codex may execute only tasks explicitly included here; backlog presence alone does not authorize execution. Human approval is required before this file is populated or changed.

## Current Batch

**Batch ID:** BATCH-002

**Status:** In Progress

**Objective:** ATL-003 — Configure Splunk Deployment Server role

**Included Tasks:** ATL-003.

**Excluded Scope:** All backlog and proposal work other than ATL-003.

**Dependencies:** ATL-002 — Done.

**Acceptance Criteria:** Deployment Server configuration is documented, inspected, and ready for a controlled client enrollment test.

**Human Validation Required:** Yes; a human must validate the configuration and results before ATL-003 is marked Done.

**Execution Notes:** BATCH-002 authorizes ATL-003 only. No additional backlog item is active. This record does not claim ATL-003 implementation has started.

**Expected Report Path:** `docs/execution-reports/BATCH-002.md` after execution is attempted.
