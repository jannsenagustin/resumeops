# Atlas Active Batch

> Parser-readiness note: Keep this single-batch structure and its field labels stable for future build-time parsing.

Only one active batch may exist. Codex may execute only tasks explicitly included here; backlog presence alone does not authorize execution. Human approval is required before this file is populated or changed.

## Current Batch

**Batch ID:** BATCH-005

**Status:** In Progress

**Objective:** Complete ATL-006 by recreating and validating the reviewed Git-controlled Splunk configuration delivery workflow from repository change through controlled Deployment Server distribution.

**Included Tasks:** ATL-006.

**Excluded Scope:** ATL-007 and all other backlog or proposal work; CI/CD automation; unattended deployment; automatic merge, release, or rollback; unrelated Splunk configuration work; architecture redesign; Config Intelligence work; and unrelated documentation cleanup.

**Dependencies:** ATL-005 (Done); DEC-007; DEC-008; current Atlas architecture; M05 milestone state; Atlas Operations; Documentation Rules; Ownership Matrix.

**Acceptance Criteria:** A reviewed repository change is released through a documented manual control point and distributed successfully.

**Human Validation Required:** Yes; activation does not satisfy the acceptance criterion, and a human must validate the engineering outcome.

**Execution Notes:** Human-authorized activation occurred on 2026-08-31. Authorized execution is the manual feature branch -> configuration change -> human review -> merge -> controlled manual release -> Deployment Server distribution -> client/runtime validation -> evidence and reporting workflow. Implementation has not started; no engineering result, validation outcome, evidence, or completion is claimed.

**Expected Report Path:** `docs/execution-reports/BATCH-005.md` after execution is attempted; no placeholder report exists at activation.
