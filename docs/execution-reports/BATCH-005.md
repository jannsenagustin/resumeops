# BATCH-005 — Execution Report

**Batch ID:** BATCH-005
**Task:** ATL-006 — Recreate Git-controlled Splunk configuration workflow
**Date:** 2026-09-01
**Status:** Done

## Objective

Recreate and validate the reviewed manual Git-controlled configuration workflow
from repository change through controlled Deployment Server distribution,
client validation, ingestion, and search.

## Included Tasks

- ATL-006 only.

## Completed

- Validated key-based SSH access and required remote execution boundaries.
- Verified the expected Agent Management assignment without changing it.
- Bound release approval, source, and rollback state to an exact Git commit.
- Detected and stopped an unreviewed input-path change at the pre-release diff
  gate.
- Corrected and reviewed the Git source while preserving `logs\*.log` behavior.
- Released approved commit
  `5b53785beb2a134342b6c24a5854c55d6c00129a` manually.
- Created and verified a commit-specific rollback checkpoint.
- Installed `app.conf` version `1.0.1` and unchanged `inputs.conf` behavior.
- Reloaded the Deployment Server successfully.
- Validated client delivery, deployed files, effective input configuration,
  service health, ingestion, and search.

## Blocked

- None at completion. The first release attempt was deliberately stopped before
  live changes when the candidate diff contradicted the runtime-neutral claim.

## Rejected

- Superseded release commit
  `198fe26579f3802540cfa3b609bb0e277dafa6d6`.
- Narrowing the monitored input from `logs\*.log` to `atlas-demo2.log`.

## Files Changed

- `infrastructure/atlas/deployment-server/README.md`
- `infrastructure/atlas/deployment-server/deployment-apps/TA-atlas-demo-inputs/default/inputs.conf`
- Closeout records and reviewed evidence listed by this report.

## Validation Performed

- Clean Git state and exact detached release commit.
- Commit-match safeguard.
- Candidate-to-live `app.conf` and `inputs.conf` diffs.
- Rollback checkpoint existence, ownership, permissions, and content comparison.
- Installed source-to-target comparison and file metadata inspection.
- Successful `splunk reload deploy-server` with exit code `0`.
- Agent Management successful deployment to the expected single client.
- Client `app.conf` version `1.0.1` and unchanged wildcard `inputs.conf`.
- Client-side `btool inputs list --debug` source attribution and effective values.
- Running `SplunkForwarder` service.
- Searchable unique event `ATL006-20260901-094342` from `atlas-demo2.log` with
  `sourcetype=atlas:demo` in `index=main`.

## Human Review Required

Completed. The human accepted the BATCH-005 closeout and approved ATL-006,
BATCH-005, and Milestone 05 as Done on 2026-09-01.

## Deviations

- The original candidate did not match the live wildcard input stanza. The
  control gate stopped release, the source and runbook were corrected through a
  reviewed pull request, and approval was repeated against the corrected merge
  commit.
- Existing password-authenticated administrative access was used. No sudoers
  change or unrestricted passwordless sudo was introduced.

## Risks

- Rollback was not exercised because all validation passed; it remains a
  verified checkpoint and an unexercised recovery path.
- CI/CD and unattended deployment remain intentionally unimplemented.

## Follow-up Backlog Items

- ATL-007 remains Backlog and is not authorized by this batch.

## Final Status

Done. The approved manual release and all required runtime validation passed,
and the human accepted the Atlas EOS closeout on 2026-09-01.
