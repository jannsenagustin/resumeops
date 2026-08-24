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

ATL-003 Step 1 validated the existing Splunk installation before any Deployment
Server changes. Step 2 will configure the role. No role configuration, forwarder
enrollment, or application distribution is claimed by this record.

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

The host runtime foundation is complete. ATL-003 remains the only active task.
Its pre-configuration baseline is validated, and Step 2 will configure the
Deployment Server role without altering the validated ingestion path.

## ATL-003 Step 1 — Pre-Configuration Baseline

Before enabling the Deployment Server role, the existing Splunk Enterprise
installation was revalidated as a known-good baseline:

- `Splunkd.service` was active under systemd;
- `splunkd` and its inspected child processes ran as `splunk`;
- `/opt/splunk/bin/splunk status` reported a running instance and helpers;
- Splunk Enterprise reported version 10.0.8;
- TCP/8000 and TCP/8089 were listening;
- local requests to `localhost:8000` and the VM address succeeded.

Splunk Web initially timed out from the Windows workstation even though local
and VM-address checks succeeded. That evidence isolated the failure away from
Splunk. Rocky Linux firewalld did not allow inbound TCP/8000. After the port was
opened and firewalld reloaded, browser access, login, and the Splunk Home page
were verified successfully.

### Step 1 Evidence

- [systemd service health](../evidence/milestone-05-data-ingestion/m05-atl-003-rocky-splunk-systemd-health-01.png)
- [runtime process identity](../evidence/milestone-05-data-ingestion/m05-atl-003-rocky-splunk-runtime-identity-01.png)
- [Splunk CLI status](../evidence/milestone-05-data-ingestion/m05-atl-003-rocky-splunk-cli-status-01.png)
- [management port listener](../evidence/milestone-05-data-ingestion/m05-atl-003-rocky-splunk-management-port-01.png)

The selected screenshots directly support service health, runtime identity, CLI
operation, and TCP/8089 listening. The existing ATL-002 composite evidence also
shows version 10.0.8 and listeners on TCP/8000 and TCP/8089. No publishable
screenshot supplied for this closeout directly shows the TCP/8000 firewalld rule
or successful browser login, so those outcomes are recorded from the
human-supplied engineering session record rather than attributed to an image.

### Next Step

ATL-003 remains In Progress. Step 2 is to configure and inspect the Deployment
Server role. ATL-004 is not active.
