# BATCH-004 — Execution Report

**Batch ID:** BATCH-004
**Task:** ATL-005 — Deliver production-style configuration through the Deployment Server
**Date:** 2026-08-30
**Status:** Done

## Objective

Prove that the Windows Universal Forwarder can receive monitoring and forwarding
configuration from the Rocky Linux Deployment Server without manual production
configuration changes on the client.

## Completed Work

- Created separate `TA-atlas-demo-inputs` and `TA-atlas-outputs` deployment apps.
- Centrally configured monitoring of
  `E:\04_PROJECTS\ResumeOps\Atlas\logs\atlas-demo2.log` with
  `sourcetype=atlas:demo` and `index=main`.
- Centrally configured forwarding to `10.0.0.84:9997`.
- Reloaded the Deployment Server and allowed the client deployment cycle to complete.
- Verified deployed client files and effective `btool` output.
- Verified TCP/9997 reachability, active forwarding, indexing, and search.

## Validation

The final search returned the controlled ATL-005 event from the expected source
with `sourcetype=atlas:demo`. The reviewed evidence set is indexed in the
[canonical evidence map](../evidence/README.md#milestone-05-evidence).

## Problems and Resolutions

- Application and output activation required a complete reload and subsequent
  phone-home cycle.
- TCP/9997 was initially unreachable; the documented firewall correction
  restored connectivity.
- Forwarding validation was corrected to run on the Universal Forwarder rather
  than the Deployment Server.

## Evidence Disposition

Six captures support the completed outcome. A GUID-bearing deployment-client
listing and two captures showing the superseded `atlas-demo.log` source remain
excluded.

## Remaining Work

- ATL-006 remains Backlog and inactive.
- The session record does not document a rollback exercise, so no rollback
  validation is claimed.

## Outcome

Done. ATL-005 engineering, end-to-end validation, evidence review, and Atlas EOS
Closeout are complete. ATL-006 remains inactive.
