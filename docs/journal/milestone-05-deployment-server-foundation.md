# Milestone 05 — Deployment Server Foundation

**Milestone:** 05
**Date:** 2026-08-22
**Status:** In Progress / Partially Validated

## Engineering Summary

**Abstract:** Atlas completed the Rocky Linux operating-system and Splunk
Enterprise foundation for the dedicated management node. Deployment Server role
configuration remains active work under ATL-003.

### Completed Foundation

- ATL-001 established and validated the Rocky Linux baseline.
- ATL-002 installed Splunk Enterprise 10.0.8 directly on the host.
- Splunk now runs as the dedicated `splunk` account under systemd.

### Current Engineering Objective

ATL-003 will configure the Deployment Server role. No role configuration,
forwarder enrollment, or application distribution is claimed by this record.

## Installation Engineering Record

### Installation and initialization

The first `wget` attempt automatically selected IPv6 and timed out. An HTTPS
request with `curl` confirmed reachability, and `wget -4` downloaded the RPM
successfully. The RPM installation completed, `rpm -q splunk` verified the
package, and the executable and Splunk Enterprise 10.0.8 version were verified
under `/opt/splunk/bin`.

The first initialization generated certificates, validated default indexes and
configuration, checked filesystem compatibility, validated installed-file
hashes, and started successfully.

### Runtime migration and correction

The first startup ran as root. When the installation was migrated to systemd
and the dedicated `splunk` account, the service failed because first-start files
under `/opt/splunk` had incompatible ownership. Service status, journal entries,
and process inspection isolated the permissions boundary. Correcting ownership
with `chown -R splunk:splunk /opt/splunk` allowed the service migration to
complete.

### Validated outcome

- `Splunkd.service` is active and manages the Splunk lifecycle.
- `splunkd` is running as the `splunk` account.
- Splunk Enterprise reports version 10.0.8.
- Installed-file hash validation completed successfully.

### Evidence

- [RPM installation and package verification](../evidence/milestone-05-data-ingestion/m05-atl-002-rocky-splunk-rpm-installation-01.png)
- [First startup and validation](../evidence/milestone-05-data-ingestion/m05-atl-002-rocky-splunk-first-start-01.png)
- [systemd service, runtime account, ports, and version](../evidence/milestone-05-data-ingestion/m05-atl-002-rocky-splunk-systemd-runtime-01.png)

### Transition

The host runtime foundation is complete. ATL-003 is now the only active task and
will configure the Deployment Server role without altering the validated
ingestion path.
