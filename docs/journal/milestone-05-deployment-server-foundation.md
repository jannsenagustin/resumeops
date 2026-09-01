# Milestone 05 — Deployment Server Foundation

**Milestone:** 05
**Date:** 2026-08-30
**Status:** Complete / Validated

## Engineering Summary

**Abstract:** Atlas completed the Rocky Linux, Splunk Enterprise, and Deployment
Server foundation for the dedicated management node. The first Windows
Universal Forwarder is enrolled and now receives production-style input and
output configuration through separate Deployment Server applications.
End-to-end `atlas:demo` ingestion and the reviewed manual Git-controlled release
workflow are validated.

### Completed Foundation

- ATL-001 established and validated the Rocky Linux baseline.
- ATL-002 installed Splunk Enterprise 10.0.8 directly on the host.
- Splunk now runs as the dedicated `splunk` account under systemd.
- ATL-003 configured and validated the first deployment app and server class.
- ATL-004 enrolled the first Windows Universal Forwarder and validated the
  complete Deployment Server lifecycle.
- ATL-005 distributed separate input and output apps, validated the effective
  client configuration, and proved searchable end-to-end ingestion.
- ATL-006 validated a reviewed, commit-bound manual release with a rollback
  checkpoint, client delivery, effective configuration, and searchable ingestion.

### Current Engineering Objective

Milestone 05 is complete. BATCH-005 closed ATL-006 after human acceptance on
2026-09-01. No subsequent batch or milestone is active.

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

## ATL-004 — Windows Universal Forwarder Enrollment

The Windows Universal Forwarder loaded `deploymentclient.conf` with the
Deployment Server target `10.0.0.84:8089`, but its DeploymentClient logs
initially reported `err=not_connected`. Splunk configuration and local service
health were valid, while `Test-NetConnection` isolated the failure to TCP/8089
transport.

Rocky Linux firewalld exposed TCP/8000 but not the management port. Allowing
TCP/8089 and reloading firewalld changed `TcpTestSucceeded` from false to true.
After the forwarder restarted, the Deployment Server received phone-home
requests and listed the Windows client.

The client initially showed no server-class assignment because the updated
`serverclass.conf` had not been loaded into the running Deployment Server.
`splunk reload deploy-server` applied the match immediately. The client joined
`atlas-base`, received `TA-atlas-base` with an enabled `stateOnClient` and an
`Ok` result, and the app was verified under the Windows Universal Forwarder
`etc\apps` directory with its expected `default`, `local`, and `metadata`
structure.

### ATL-004 Validation Boundary

- Deployment Server health, configuration, and TCP/8089 listener were validated.
- Windows TCP/8089 connectivity was validated after firewall remediation.
- Phone-home, client registration, server-class assignment, app installation,
  and client-side app presence were validated.
- This work proves centralized client management and placeholder app delivery.
- It does not prove production-style `inputs.conf`, `outputs.conf`, or
  `props.conf` delivery; that remains ATL-005.

### ATL-004 Evidence Disposition

The session record requested evidence for the firewall change, successful TCP
test, phone-home, client registration, server-class assignment, deployment
result, and Windows app installation. The repository repair pass recovered two
misfiled publishable captures and assigned them to ATL-004: the Windows
deployment-client configuration and installed `TA-atlas-base` app structure.
Client-registration, phone-home, and deployment-result captures remain excluded
because they expose the persistent deployment-client GUID. No publishable
firewall or successful `Test-NetConnection` screenshot was supplied.

### ATL-004 Evidence

- [deployment client configuration](../evidence/milestone-05-data-ingestion/m05-atl-004-windows-deployment-client-config-01.png)
- [deployed app installation](../evidence/milestone-05-data-ingestion/m05-atl-004-windows-deployment-app-installation-01.png)

## ATL-005 — Centralized Configuration Delivery

ATL-005 created two independently managed Deployment Server applications:
`TA-atlas-demo-inputs` owns the controlled file-monitor input, while
`TA-atlas-outputs` owns forwarding. All production configuration originated in
`/opt/splunk/etc/deployment-apps/`; no manual production edits were made in the
Universal Forwarder application directories.

The final input monitors
`E:\04_PROJECTS\ResumeOps\Atlas\logs\*.log`, assigns `sourcetype=atlas:demo`,
and writes to `main`. The validation event originated from `atlas-demo2.log`.
The output app targets
`10.0.0.84:9997`. Client-side `btool` traced the effective output configuration
to the deployed app, and `list forward-server` reported the destination active.

Deployment was not instantaneous. Initial checks did not show the input app or
active forwarding. Reloading the Deployment Server and allowing another client
phone-home cycle completed propagation. TCP/9997 was also initially
unreachable; the documented firewall correction restored connectivity.

The final search for `index=main sourcetype=atlas:demo` returned the generated
ATL-005 validation event from the final `atlas-demo2.log` source on host
`JNNSN`. This validates deployment, effective configuration, connectivity,
forwarding, indexing, and search as one end-to-end path.

### ATL-005 Evidence

- [active forward](../evidence/milestone-05-data-ingestion/m05-atl-005-windows-active-forward-01.png)
- [effective output configuration](../evidence/milestone-05-data-ingestion/m05-atl-005-windows-effective-outputs-01.png)
- [deployed output configuration](../evidence/milestone-05-data-ingestion/m05-atl-005-windows-deployed-outputs-01.png)
- [installed output app](../evidence/milestone-05-data-ingestion/m05-atl-005-windows-output-app-installation-01.png)
- [TCP/9997 listener and firewall allowance](../evidence/milestone-05-data-ingestion/m05-atl-005-tcp-9997-firewall-01.png)
- [searchable validation event](../evidence/milestone-05-data-ingestion/m05-atl-005-end-to-end-ingestion-01.png)

The client listing is excluded because it exposes the persistent deployment
client GUID. The two supplied input-app captures are excluded because they show
the superseded `atlas-demo.log` source rather than the final `atlas-demo2.log`
source and therefore do not directly prove the completed outcome. The session
notes do not document a rollback exercise, so this journal makes no rollback
validation claim.

## ATL-006 — Git-Controlled Manual Release

ATL-006 recreated the enterprise-style path from reviewed Git source through a
manual Deployment Server release. The pre-release comparison prevented an
unintended narrowing of the deployed wildcard input. Corrective pull request #1
preserved `logs\*.log`, and the human approved merge commit
`5b53785beb2a134342b6c24a5854c55d6c00129a` as the release source.

The release used a detached, commit-verified checkout and a commit-specific
rollback checkpoint. Version `1.0.1` and the preserved input were installed,
the Deployment Server reload returned exit code `0`, and the expected Windows
Universal Forwarder received the application. Deployed files, effective
`btool` state, the running forwarder service, and the unique searchable event
`ATL006-20260901-094342` validated the complete path.

Rollback was not required and was not exercised. The checkpoint was verified,
so it is a documented but unexercised recovery path. CI/CD automation remains
separate ATL-007 scope and is not active.

### ATL-006 Evidence

- [reviewed Git release source](../evidence/milestone-05-data-ingestion/m05-atl-006-git-release-source-01.png)
- [release delta](../evidence/milestone-05-data-ingestion/m05-atl-006-rocky-release-delta-01.png)
- [rollback checkpoint](../evidence/milestone-05-data-ingestion/m05-atl-006-rocky-rollback-checkpoint-01.png)
- [Deployment Server installed configuration](../evidence/milestone-05-data-ingestion/m05-atl-006-rocky-deployed-input-config-01.png)
- [client application delivery](../evidence/milestone-05-data-ingestion/m05-atl-006-windows-input-app-delivery-01.png)
- [client deployed input](../evidence/milestone-05-data-ingestion/m05-atl-006-windows-deployed-input-config-01.png)
- [client effective input](../evidence/milestone-05-data-ingestion/m05-atl-006-windows-effective-input-config-01.png)
- [forwarder service](../evidence/milestone-05-data-ingestion/m05-atl-006-windows-forwarder-service-01.png)
- [searchable validation event](../evidence/milestone-05-data-ingestion/m05-atl-006-end-to-end-ingestion-01.png)
