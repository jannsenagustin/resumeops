# BATCH-003 — Execution Report

**Batch ID:** BATCH-003
**Task:** ATL-004 — Enroll Windows Universal Forwarder with the Deployment Server
**Date:** 2026-08-28
**Status:** Done

## Objective

Enroll the first Windows Universal Forwarder with the Rocky Linux Deployment
Server and validate transport, phone-home, registration, server-class matching,
deployment app delivery, and client-side installation.

## Completed Work

- Validated the Splunk Enterprise service, Deployment Server configuration,
  TCP/8089 listener, and effective server-class configuration.
- Configured and validated `deploymentclient.conf` for `10.0.0.84:8089`.
- Isolated `err=not_connected` to blocked TCP/8089 transport with
  `Test-NetConnection`.
- Allowed TCP/8089 through firewalld and confirmed successful client transport.
- Verified Deployment Server phone-home and Windows client registration.
- Reloaded the Deployment Server after the first client showed no server-class
  assignment.
- Verified `atlas-base` assignment, successful `TA-atlas-base` delivery, and
  the expected client-side app structure.

## Validation

The session record confirms successful Deployment Server URI loading, TCP/8089
connectivity, phone-home, client registration, server-class assignment,
deployment result `Ok`, enabled client state, and Windows app installation.

The repository repair pass recovered two publishable ATL-004 screenshots that
had been filed under earlier task IDs. They now prove the loaded Windows
deployment-client configuration and the installed `TA-atlas-base` structure.
GUID-bearing registration, phone-home, and deployment-result captures remain
excluded pending redaction.

- [Windows deployment-client configuration](../evidence/milestone-05-data-ingestion/m05-atl-004-windows-deployment-client-config-01.png)
- [Installed deployment app structure](../evidence/milestone-05-data-ingestion/m05-atl-004-windows-deployment-app-installation-01.png)

## Problems and Resolutions

- TCP/8089 was listening locally but blocked by firewalld. Adding the port and
  reloading firewalld restored transport.
- The enrolled client initially showed `serverClasses: None`. Reloading the
  Deployment Server applied the updated `serverclass.conf` and assigned
  `atlas-base`.

## Remaining Work

- ATL-005 remains Backlog work and is not activated by this report.

## Outcome

Done. ATL-004 and BATCH-003 are complete; ATL-005 remains in the backlog and no
batch is active.
