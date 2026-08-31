# Atlas Engineering Session Notes

> This file is the authoritative engineering record for the active session.
> It is intentionally cleared after an approved Atlas EOS Closeout.

## Session

**Batch:** BATCH-005
**Task:** ATL-006
**Date:** 2026-08-31
**State:** Feature-branch configuration change prepared; awaiting human review. No merge or release has occurred.

## Objective

Recreate and validate the reviewed manual Git-controlled Splunk configuration
delivery workflow from repository change through controlled Deployment Server
distribution.

## Work Performed

- Created feature branch `feature/atl-006-git-controlled-splunk-config`.
- Added a repository source-to-target mapping and manual release, validation,
  and rollback procedure for `TA-atlas-demo-inputs`.
- Added the validated final `inputs.conf` source and proposed app metadata
  version `1.0.1` without changing input behavior.
- Preserved `TA-atlas-outputs` as a separate application and excluded it from
  this change because its complete live metadata is not yet canonical source.

## Current Control Point

Human review is required before any commit, merge, or manual release. No
Deployment Server, Universal Forwarder, runtime, or evidence change has occurred.

## Expected Validation Boundary

After separate merge and release approval, validate the reviewed source diff,
release checkpoint, deployed files, effective client configuration, forwarder
service health, controlled event ingestion, and search. Record rollback as
validated only if it is exercised and evidenced.

## Exclusions Preserved

No CI/CD, unattended deployment, automatic merge, automatic release, automatic
rollback, ATL-007 work, architecture redesign, or unrelated configuration work
is included.
