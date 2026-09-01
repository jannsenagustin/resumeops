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

**Execution Notes:** Human-authorized activation occurred on 2026-08-31. Authorized execution is the manual feature branch -> configuration change -> human review -> merge -> controlled manual release -> Deployment Server distribution -> client/runtime validation -> evidence and reporting workflow. Before any Deployment Server file inspection, rollback-checkpoint creation, deployment-app installation, Splunk reload, or release validation, ATL-006 now authorizes a bounded prerequisite substep to inspect current SSH client and server state and restore key-based access to the approved Rocky Linux Deployment Server. This prerequisite may preserve the intended remote account, preserve or deliberately revalidate host trust, modify only required SSH files, and establish only the minimum sudo capability required by the documented release commands. Validation must cover key-based connection, remote identity and hostname, remote command execution and exit-status propagation, required filesystem boundaries, and approved non-interactive sudo behavior when applicable. It must not print or commit private-key material; casually replace host keys; disable host-key verification; use `StrictHostKeyChecking=no` as a permanent solution; enable password authentication for convenience; enable direct root login; grant unrestricted passwordless sudo; copy secrets into the repository; publish hostnames, private addresses, fingerprints, client identifiers, or account details without review; alter Splunk configuration; or start the release. Any sudoers change must be least-privilege and limited to exact runbook commands. Stop for human review after SSH validation and before release resumption. SSH restoration remains subordinate to ATL-006 and does not satisfy its acceptance criterion. No SSH restoration, release result, runtime validation, evidence, or completion is claimed.

**Expected Report Path:** `docs/execution-reports/BATCH-005.md` after execution is attempted; no placeholder report exists at activation.
