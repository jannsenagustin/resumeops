# BATCH-001 — Execution Report

**Batch ID:** BATCH-001
**Date:** 2026-08-22
**Objective:** ATL-002 — Install Splunk Enterprise directly on Rocky Linux

## Included Tasks

- ATL-002 only.

## Completed

- Downloaded the Splunk Enterprise 10.0.8 RPM after isolating an IPv6 timeout and retrying with `wget -4`.
- Installed the RPM and verified the `splunk` package, executable location, and version.
- Completed first initialization, including certificate generation and index, configuration, filesystem, and installed-file validation.
- Diagnosed systemd startup failures caused by root-owned first-start files.
- Corrected `/opt/splunk` ownership to `splunk:splunk`.
- Enabled and validated the systemd-managed service under the dedicated `splunk` runtime account.

## Blocked

- None at completion.

## Rejected

- None.

## Files Changed

- No infrastructure-as-code or application runtime files were changed during ATL-002. Repository documentation and evidence were synchronized after engineering completion.

## Validation Performed

- `rpm -q splunk` verified the installed package.
- The executable under `/opt/splunk/bin` and `splunk version` verified Splunk Enterprise 10.0.8.
- First startup validated certificates, default indexes, configuration, filesystem compatibility, and installed-file hashes.
- `systemctl`, `journalctl`, and process inspection were used during service troubleshooting.
- Final service and process inspection confirmed `Splunkd.service` active, systemd management, running `splunkd` processes, and runtime account `splunk`.

## Human Review Required

- Completed engineering results were supplied as validated for this closeout. Published screenshots still require normal repository review.

## Deviations

- The initial download path selected IPv6 and timed out; IPv4 was forced for the successful download.
- The first startup ran as root. The resulting ownership mismatch required `chown -R splunk:splunk /opt/splunk` before the service-account migration succeeded.

## Risks

- Deployment Server behavior is not configured or validated by this batch.
- Future maintenance must preserve ownership of `/opt/splunk` and confirm the effective runtime account.

## Follow-up Backlog Items

- ATL-003 — Configure Splunk Deployment Server role.

## Final Status

Done. ATL-002 is complete; ATL-003 is the sole current active objective.
