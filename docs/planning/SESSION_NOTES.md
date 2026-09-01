# Atlas Engineering Session Notes

> This file is the authoritative engineering record for the active session.
> It is intentionally cleared after an approved Atlas EOS Closeout.

## Session

**Batch:** BATCH-005
**Task:** ATL-006
**Date:** 2026-08-31
**State:** Reviewed source is merged at the approved release commit. The release has not occurred and is gated by bounded SSH access restoration and subsequent human review.

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
- Recorded human authorization for secure SSH access restoration as a
  prerequisite substep of ATL-006, not as a separate task.

## SSH Prerequisite Authorization

Before Deployment Server file inspection, rollback-checkpoint creation,
deployment-app installation, Splunk reload, or release validation, inspect the
current SSH client and server state and restore key-based access to the approved
Rocky Linux Deployment Server. Preserve the intended remote account and existing
host trust where possible. Modify only required SSH files and establish only the
minimum sudo capability required by the documented release commands.

Validate the key-based connection, remote identity and hostname, remote command
execution, exit-status propagation, required filesystem boundaries, and
approved non-interactive sudo behavior when applicable.

Do not print or commit private-key material, casually replace host keys, disable
host-key verification, retain `StrictHostKeyChecking=no` as a workaround,
enable password authentication for convenience, enable direct root login,
grant unrestricted passwordless sudo, copy secrets into the repository, or
publish hostnames, private addresses, fingerprints, client identifiers, or
account details without review. Do not alter Splunk configuration or begin the
release during this prerequisite.

## Current Control Point

The next permitted engineering action is the bounded SSH prerequisite. Stop for
human review after SSH validation and before resuming any manual release action.
No SSH restoration, Deployment Server, Universal Forwarder, runtime, or evidence
change is claimed by this planning amendment.

## Expected Validation Boundary

After separate merge and release approval, validate the reviewed source diff,
release checkpoint, deployed files, effective client configuration, forwarder
service health, controlled event ingestion, and search. Record rollback as
validated only if it is exercised and evidenced.

## Exclusions Preserved

No CI/CD, unattended deployment, automatic merge, automatic release, automatic
rollback, ATL-007 work, architecture redesign, or unrelated configuration work
is included.
