# BATCH-002 — Execution Report

**Batch ID:** BATCH-002
**Date:** 2026-08-26
**Objective:** ATL-003 — Configure Splunk Deployment Server role

## Included Tasks

- ATL-003 only.

## Completed

- Revalidated the systemd-managed Splunk runtime, service account, management port, and Splunk Web access.
- Created the `TA-atlas-base` deployment app with the intended directory layout, ownership, and `app.conf` metadata.
- Created the `atlas-base` server class and assigned `TA-atlas-base` with client state enabled and automatic restarts disabled.
- Inspected effective server-class configuration with `btool`.
- Reloaded the Deployment Server as the `splunk` service account.
- Confirmed the app and server class in Agent Management with zero enrolled forwarders.

## Blocked

- None at completion.

## Rejected

- None.

## Files Changed

- No repository-managed Splunk configuration was changed. The live Deployment Server configuration was created under `/opt/splunk/etc` and the repository documentation and evidence were synchronized afterward.

## Validation Performed

- Inspected the deployment app filesystem layout and ownership.
- Used `btool serverclass list --debug` to verify effective configuration precedence.
- Successfully ran `splunk reload deploy-server` as the `splunk` service account.
- Used the CLI to confirm that no deployment clients had contacted the server.
- Confirmed `TA-atlas-base` and `atlas-base` in Splunk Web Agent Management.

## Human Review Required

- The human-provided session record marks ATL-003 complete. Repository evidence and synchronized documentation still require normal closeout review.

## Deviations

- A plain `sudo` reload failed because the CLI tried to use `/root/.splunk` for authentication state. Running the command with `sudo -u splunk -H` resolved the issue.

## Risks

- No Universal Forwarder is enrolled yet, so client communication and application distribution are not validated.
- The wildcard server-class match must be reviewed in the controlled ATL-004 enrollment context before broader use.

## Follow-up Backlog Items

- ATL-004 — Enroll Windows Universal Forwarder with the Deployment Server.

## Final Status

Done. ATL-003 is complete; ATL-004 remains in the backlog and no batch is active.
