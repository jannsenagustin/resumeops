# Milestone 05 — Deployment Server Foundation

**Milestone:** 05
**Date:** 2026-08-22
**Status:** In Progress / Partially Validated

## Engineering Summary

**Abstract:** Atlas completed the Rocky Linux, Splunk Enterprise, and Deployment
Server foundation for the dedicated management node. Client enrollment and
configuration distribution remain future work.

### Completed Foundation

- ATL-001 established and validated the Rocky Linux baseline.
- ATL-002 installed Splunk Enterprise 10.0.8 directly on the host.
- Splunk now runs as the dedicated `splunk` account under systemd.
- ATL-003 configured and validated the first deployment app and server class.

### Current Engineering Objective

ATL-003 is complete. The Deployment Server recognizes `TA-atlas-base` and
`atlas-base`, and its effective configuration and reload behavior are validated.
No forwarder enrollment or application distribution is claimed by this record.

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

The host runtime foundation was completed before ATL-003 configuration began.
Its pre-configuration baseline provided the known-good state used to validate
the Deployment Server changes without altering the ingestion path.

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

ATL-003 is complete. ATL-004 remains in the backlog and is not active.

## ATL-003 Step 2 — Deployment Server Configuration

The first deployment app, `TA-atlas-base`, was created with `default`, `local`,
and `metadata` directories and owned by `splunk:splunk`. Its `app.conf` records
the enabled state, package-update behavior, and UI metadata.

The `atlas-base` server class uses a wildcard client match, assigns
`TA-atlas-base`, enables the app on clients, and disables automatic Splunk and
Splunk Web restarts. `btool serverclass list --debug` confirmed that the local
server-class settings overlay Splunk defaults as intended.

A plain `sudo` reload attempted to store CLI authentication state under
`/root/.splunk` and failed. Running the CLI as the service account with
`sudo -u splunk -H /opt/splunk/bin/splunk` completed the reload. The CLI then
reported no deployment clients, which is the expected baseline before ATL-004.
Splunk Web Agent Management recognized one deployment app and one server class.

### Step 2 Evidence

- [deployment app layout and ownership](../evidence/milestone-05-data-ingestion/m05-atl-003-rocky-deployment-app-layout-01.png)
- [effective app and server-class configuration](../evidence/milestone-05-data-ingestion/m05-atl-003-rocky-deployment-configuration-01.png)
- [successful service-account reload and zero-client baseline](../evidence/milestone-05-data-ingestion/m05-atl-003-rocky-deployment-server-reload-01.png)

The Agent Management screenshots corroborate the app and server class but are
not published because their address bars expose a persistent private IP. The
standalone `app.conf` capture is redundant with the effective-configuration
capture. The pre-configuration state capture does not prove completed work.
