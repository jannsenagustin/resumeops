# Atlas Engineering Evidence

This file is the canonical index and naming authority for publishable Atlas
engineering evidence. Evidence supports claims owned by milestone, execution,
and journal records; it does not create project status.

## Storage and Naming Convention

Keep artifacts in the existing descriptive milestone directory and name each
published artifact:

```text
m<NN>-atl-<NNN>-<component>-<subject>-<sequence>.<ext>
```

Omit `atl-<NNN>-` only when the artifact predates task-level tracking or has
no honest task association:

```text
m<NN>-<component>-<subject>-<sequence>.<ext>
```

- Use lowercase ASCII, hyphens, a two-digit milestone, and a two-digit sequence.
- Use stable components such as `atlas-indexer`, `atlas-search-head`, `docker`,
  `rocky`, and `windows-uf`.
- Describe the proved subject, not the capture tool or date.
- Increment the sequence only for artifacts with the same milestone, task,
  component, and subject.
- Preserve bytes during a naming-only migration and use `git mv`.
- Inventory inbound references before renaming, then validate links, imports,
  and the production build.
- Exclude captures containing credentials, tokens, machine IDs, boot IDs, MAC
  addresses, global IPv6 addresses, or other unnecessary persistent identifiers
  until review and required redaction are complete.

Examples: `m04-windows-uf-service-status-01.png` for pre-task-tracking evidence
and `m05-atl-004-windows-deployment-client-config-01.png` for task-aware evidence.

## Milestone 01 Evidence

Milestone 01 may contain evidence of:

- Compose validation;
- healthy container status;
- Docker Desktop operation;
- the first successful Splunk login.

Do not add placeholders for evidence that has not been captured.

## Milestone 02 Evidence

Milestone 02 contains evidence of healthy Search Head and Indexer containers,
successful Search Head administrator access, the multi-service Docker runtime,
and shared `atlas-network` membership.

## Milestone 03 Evidence

Milestone 03 contains the validation chain for distributed search: an enabled,
healthy Indexer search peer; a metadata search launched from the Search Head
that returns both Atlas hosts; and Job Inspector evidence showing
`dispatch.stream.remote.atlas-indexer`.

A local `server.conf` screenshot was deliberately excluded because it exposes
secret-bearing configuration values. The troubleshooting outcome is documented
textually without publishing those values.

## Milestone 04 Evidence

Milestone 04 contains only the five reviewed artifacts for Windows Event Log
ingestion: the running `SplunkForwarder` service, TCP 9997 loopback
connectivity, an active Splunk forwarding destination, searchable Application,
Security, and System data, and Job Inspector evidence of remote Indexer
execution. Secret-bearing `server.conf` and installer screenshots are excluded.

## Milestone 05 Evidence

The `milestone-05-data-ingestion` folder contains reviewed infrastructure and
host-runtime evidence for the dedicated Rocky Linux Deployment Server VM. The
ATL-001 baseline set covers host identity and resources, network connectivity,
package and kernel updates, required administration tools, and NTP
synchronization. The ATL-002 set proves the RPM installation, successful first
startup, and final systemd-managed Splunk 10.0.8 runtime under the `splunk`
account. ATL-003 revalidates systemd health, the runtime identity, CLI operation,
and TCP/8089, then proves the `TA-atlas-base` app layout, effective `atlas-base`
server-class configuration, a successful Deployment Server reload, and the
expected zero-client baseline. ATL-004 subsequently validated the first Windows
Universal Forwarder enrollment, server-class assignment, and placeholder app
delivery. Two initially misfiled Windows captures now prove the deployment
client configuration and installed app structure. GUID-bearing phone-home,
client-registration, and deployment-result captures remain unpublished pending
redaction. Splunk Web recognition was also reviewed, but
the supplied browser captures remain unpublished because their address bars
expose a persistent private IP. The existing ATL-002 composite also proves
version 10.0.8 and listeners on TCP/8000 and TCP/8089. The security-baseline result includes
SELinux, firewalld, and listening-service validation, but its screenshot remains
unpublished pending redaction of a persistent interface identifier. These
older ATL-001 through ATL-003 artifacts are not repurposed as enrollment or
application-distribution evidence.

ATL-005 proves the next configuration-management boundary: separate
`TA-atlas-demo-inputs` and `TA-atlas-outputs` apps were delivered centrally,
the client loaded the output configuration, forwarding became active, and the
controlled `atlas:demo` event became searchable from the final
`atlas-demo2.log` source. Six reviewed captures support the final outcome.

ATL-006 proves the reviewed manual Git-controlled release boundary. The
pre-release comparison exposed a source-to-runtime mismatch before live change;
a reviewed correction preserved the deployed `logs\*.log` behavior. The final
evidence set records the approved release source, installed version `1.0.1`,
commit-specific rollback checkpoint, exact release delta, successful app
delivery, deployed and effective client input state, running forwarder service,
and a unique searchable ATL-006 validation event. Rollback remained an
unexercised recovery path because all validation passed.

## Canonical Artifact Index

`Reviewed` means visually inspected for unintended sensitive content. `Pre-batch`
and `Pre-ATL` are explicit historical assignments for artifacts created before
those identifiers existed. The description says what is visible; the validation
purpose states the completed outcome it supports.

| Filename | Milestone | Batch | ATL | Short description | Validation purpose | Review | Canonical path |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `m01-atlas-indexer-container-health-01.png` | M01 | Pre-batch | Pre-ATL | Healthy Indexer container in CLI | Confirms the first Indexer container reached healthy runtime state | Reviewed | [Artifact](milestone-01-first-containerized-deployment/m01-atlas-indexer-container-health-01.png) |
| `m01-atlas-indexer-web-login-01.png` | M01 | Pre-batch | Pre-ATL | Splunk Web after administrator login | Confirms administrator access to the first Indexer | Reviewed | [Artifact](milestone-01-first-containerized-deployment/m01-atlas-indexer-web-login-01.png) |
| `m01-docker-runtime-state-01.png` | M01 | Pre-batch | Pre-ATL | Indexer visible in Docker Desktop | Confirms the deployed Indexer exists in the container runtime | Reviewed | [Artifact](milestone-01-first-containerized-deployment/m01-docker-runtime-state-01.png) |
| `m02-atlas-search-head-web-login-01.png` | M02 | Pre-batch | Pre-ATL | Search Head Splunk Web session | Confirms administrator access to the Search Head | Reviewed | [Artifact](milestone-02-search-head/m02-atlas-search-head-web-login-01.png) |
| `m02-docker-container-health-01.png` | M02 | Pre-batch | Pre-ATL | Healthy Search Head and Indexer in CLI | Confirms both Splunk roles are healthy concurrently | Reviewed | [Artifact](milestone-02-search-head/m02-docker-container-health-01.png) |
| `m02-docker-multi-service-state-01.png` | M02 | Pre-batch | Pre-ATL | Two Splunk services in Docker Desktop | Confirms the Search Head and Indexer run as separate services | Reviewed | [Artifact](milestone-02-search-head/m02-docker-multi-service-state-01.png) |
| `m03-atlas-indexer-search-peer-01.png` | M03 | Pre-batch | Pre-ATL | Enabled healthy Indexer search peer | Confirms search-peer registration and health | Reviewed | [Artifact](milestone-03-distributed-search/m03-atlas-indexer-search-peer-01.png) |
| `m03-atlas-search-head-distributed-search-01.png` | M03 | Pre-batch | Pre-ATL | Metadata results from both Atlas hosts | Confirms distributed results return through the Search Head | Reviewed | [Artifact](milestone-03-distributed-search/m03-atlas-search-head-distributed-search-01.png) |
| `m03-atlas-search-head-job-inspector-01.png` | M03 | Pre-batch | Pre-ATL | Job Inspector remote stream entry | Confirms search execution occurred on `atlas-indexer` | Reviewed | [Artifact](milestone-03-distributed-search/m03-atlas-search-head-job-inspector-01.png) |
| `m04-atlas-indexer-receiver-connectivity-01.png` | M04 | Pre-batch | Pre-ATL | Successful TCP/9997 loopback test | Confirms the Windows host can reach the Indexer receiver | Reviewed | [Artifact](milestone-04-windows-event-ingestion/m04-atlas-indexer-receiver-connectivity-01.png) |
| `m04-atlas-search-head-job-inspector-01.png` | M04 | Pre-batch | Pre-ATL | Windows search remote stream entry | Confirms Windows telemetry search execution on the Indexer | Reviewed | [Artifact](milestone-04-windows-event-ingestion/m04-atlas-search-head-job-inspector-01.png) |
| `m04-windows-uf-event-ingestion-01.png` | M04 | Pre-batch | Pre-ATL | Three Windows Event Log sources | Confirms Application, Security, and System events are searchable | Reviewed | [Artifact](milestone-04-windows-event-ingestion/m04-windows-uf-event-ingestion-01.png) |
| `m04-windows-uf-forwarding-status-01.png` | M04 | Pre-batch | Pre-ATL | Active Universal Forwarder destination | Confirms the forwarder has an active TCP/9997 session | Reviewed | [Artifact](milestone-04-windows-event-ingestion/m04-windows-uf-forwarding-status-01.png) |
| `m04-windows-uf-service-status-01.png` | M04 | Pre-batch | Pre-ATL | Running SplunkForwarder service | Confirms the Windows forwarding service is active | Reviewed | [Artifact](milestone-04-windows-event-ingestion/m04-windows-uf-service-status-01.png) |
| `m05-atl-001-rocky-admin-tools-01.png` | M05 | Pre-batch | ATL-001 | Git and tree version output | Confirms required administration tools are installed | Reviewed | [Artifact](milestone-05-data-ingestion/m05-atl-001-rocky-admin-tools-01.png) |
| `m05-atl-001-rocky-admin-tools-02.png` | M05 | Pre-batch | ATL-001 | Vim feature output | Confirms the remaining administration editor tooling | Reviewed | [Artifact](milestone-05-data-ingestion/m05-atl-001-rocky-admin-tools-02.png) |
| `m05-atl-001-rocky-cpu-allocation-01.png` | M05 | Pre-batch | ATL-001 | Rocky Linux CPU inventory | Confirms the VM CPU allocation | Reviewed | [Artifact](milestone-05-data-ingestion/m05-atl-001-rocky-cpu-allocation-01.png) |
| `m05-atl-001-rocky-default-route-01.png` | M05 | Pre-batch | ATL-001 | Rocky Linux routing table | Confirms the VM default route and assigned address | Reviewed | [Artifact](milestone-05-data-ingestion/m05-atl-001-rocky-default-route-01.png) |
| `m05-atl-001-rocky-dns-resolution-01.png` | M05 | Pre-batch | ATL-001 | Successful GitHub hostname ping | Confirms DNS resolution and network response | Reviewed | [Artifact](milestone-05-data-ingestion/m05-atl-001-rocky-dns-resolution-01.png) |
| `m05-atl-001-rocky-host-identity-01.png` | M05 | Pre-batch | ATL-001 | Rocky host and OS identity | Confirms the intended host identity and operating system; generated IDs are masked | Reviewed | [Artifact](milestone-05-data-ingestion/m05-atl-001-rocky-host-identity-01.png) |
| `m05-atl-001-rocky-internet-connectivity-01.png` | M05 | Pre-batch | ATL-001 | Successful public-address ping | Confirms outbound IP connectivity | Reviewed | [Artifact](milestone-05-data-ingestion/m05-atl-001-rocky-internet-connectivity-01.png) |
| `m05-atl-001-rocky-kernel-version-01.png` | M05 | Pre-batch | ATL-001 | Active Rocky Linux kernel | Confirms the updated kernel is running | Reviewed | [Artifact](milestone-05-data-ingestion/m05-atl-001-rocky-kernel-version-01.png) |
| `m05-atl-001-rocky-memory-allocation-01.png` | M05 | Pre-batch | ATL-001 | Rocky Linux memory inventory | Confirms the VM memory allocation | Reviewed | [Artifact](milestone-05-data-ingestion/m05-atl-001-rocky-memory-allocation-01.png) |
| `m05-atl-001-rocky-os-version-01.png` | M05 | Pre-batch | ATL-001 | Rocky Linux release metadata | Confirms Rocky Linux 9.8 | Reviewed | [Artifact](milestone-05-data-ingestion/m05-atl-001-rocky-os-version-01.png) |
| `m05-atl-001-rocky-package-update-01.png` | M05 | Pre-batch | ATL-001 | Completed package update and kernel check | Confirms package updates completed | Reviewed | [Artifact](milestone-05-data-ingestion/m05-atl-001-rocky-package-update-01.png) |
| `m05-atl-001-rocky-storage-layout-01.png` | M05 | Pre-batch | ATL-001 | Rocky Linux filesystem usage | Confirms the VM storage layout and capacity | Reviewed | [Artifact](milestone-05-data-ingestion/m05-atl-001-rocky-storage-layout-01.png) |
| `m05-atl-001-rocky-time-sync-01.png` | M05 | Pre-batch | ATL-001 | Chrony tracking and timedatectl | Confirms synchronized time and configured timezone | Reviewed | [Artifact](milestone-05-data-ingestion/m05-atl-001-rocky-time-sync-01.png) |
| `m05-atl-002-rocky-splunk-first-start-01.png` | M05 | BATCH-001 | ATL-002 | Splunk first-start validation output | Confirms prerequisite, index, configuration, filesystem, and installed-file checks | Reviewed | [Artifact](milestone-05-data-ingestion/m05-atl-002-rocky-splunk-first-start-01.png) |
| `m05-atl-002-rocky-splunk-rpm-installation-01.png` | M05 | BATCH-001 | ATL-002 | RPM installation and package query | Confirms Splunk Enterprise 10.0.8 installation | Reviewed | [Artifact](milestone-05-data-ingestion/m05-atl-002-rocky-splunk-rpm-installation-01.png) |
| `m05-atl-002-rocky-splunk-systemd-runtime-01.png` | M05 | BATCH-001 | ATL-002 | systemd, process, listener, and version checks | Confirms the final service-managed Splunk runtime | Reviewed | [Artifact](milestone-05-data-ingestion/m05-atl-002-rocky-splunk-systemd-runtime-01.png) |
| `m05-atl-003-rocky-splunk-cli-status-01.png` | M05 | BATCH-002 | ATL-003 | Splunk CLI runtime status | Confirms Splunk and helper processes are running | Reviewed | [Artifact](milestone-05-data-ingestion/m05-atl-003-rocky-splunk-cli-status-01.png) |
| `m05-atl-003-rocky-splunk-management-port-01.png` | M05 | BATCH-002 | ATL-003 | TCP/8089 listener output | Confirms the Deployment Server management listener | Reviewed | [Artifact](milestone-05-data-ingestion/m05-atl-003-rocky-splunk-management-port-01.png) |
| `m05-atl-003-rocky-splunk-runtime-identity-01.png` | M05 | BATCH-002 | ATL-003 | Splunk process ownership | Confirms inspected Splunk processes run as `splunk` | Reviewed | [Artifact](milestone-05-data-ingestion/m05-atl-003-rocky-splunk-runtime-identity-01.png) |
| `m05-atl-003-rocky-splunk-systemd-health-01.png` | M05 | BATCH-002 | ATL-003 | Active Splunkd systemd service | Confirms service health before role configuration | Reviewed | [Artifact](milestone-05-data-ingestion/m05-atl-003-rocky-splunk-systemd-health-01.png) |
| `m05-atl-003-rocky-deployment-app-layout-01.png` | M05 | BATCH-002 | ATL-003 | `TA-atlas-base` directory layout | Confirms deployment app structure and ownership | Reviewed | [Artifact](milestone-05-data-ingestion/m05-atl-003-rocky-deployment-app-layout-01.png) |
| `m05-atl-003-rocky-deployment-configuration-01.png` | M05 | BATCH-002 | ATL-003 | App metadata and effective server class | Confirms the intended app and server-class configuration | Reviewed | [Artifact](milestone-05-data-ingestion/m05-atl-003-rocky-deployment-configuration-01.png) |
| `m05-atl-003-rocky-deployment-server-reload-01.png` | M05 | BATCH-002 | ATL-003 | Corrected reload and zero-client baseline | Confirms service-account reload and pre-enrollment state | Reviewed | [Artifact](milestone-05-data-ingestion/m05-atl-003-rocky-deployment-server-reload-01.png) |
| `m05-atl-004-windows-deployment-client-config-01.png` | M05 | BATCH-003 | ATL-004 | Running forwarder and deployment target | Confirms the Windows client loaded the Deployment Server URI | Reviewed | [Artifact](milestone-05-data-ingestion/m05-atl-004-windows-deployment-client-config-01.png) |
| `m05-atl-004-windows-deployment-app-installation-01.png` | M05 | BATCH-003 | ATL-004 | Installed `TA-atlas-base` tree | Confirms deployment app presence and expected client-side structure | Reviewed | [Artifact](milestone-05-data-ingestion/m05-atl-004-windows-deployment-app-installation-01.png) |
| `m05-atl-005-end-to-end-ingestion-01.png` | M05 | BATCH-004 | ATL-005 | Search result for the controlled validation event | Confirms the final `atlas-demo2.log` event is searchable with `sourcetype=atlas:demo` | Reviewed | [Artifact](milestone-05-data-ingestion/m05-atl-005-end-to-end-ingestion-01.png) |
| `m05-atl-005-tcp-9997-firewall-01.png` | M05 | BATCH-004 | ATL-005 | TCP/9997 listener and firewalld allowance | Confirms the receiving port is listening and allowed by the host firewall | Reviewed | [Artifact](milestone-05-data-ingestion/m05-atl-005-tcp-9997-firewall-01.png) |
| `m05-atl-005-windows-active-forward-01.png` | M05 | BATCH-004 | ATL-005 | Active Universal Forwarder destination | Confirms the Windows forwarder has an active connection to `10.0.0.84:9997` | Reviewed | [Artifact](milestone-05-data-ingestion/m05-atl-005-windows-active-forward-01.png) |
| `m05-atl-005-windows-deployed-outputs-01.png` | M05 | BATCH-004 | ATL-005 | Deployed `TA-atlas-outputs` configuration | Confirms the client received the intended output group and target | Reviewed | [Artifact](milestone-05-data-ingestion/m05-atl-005-windows-deployed-outputs-01.png) |
| `m05-atl-005-windows-effective-outputs-01.png` | M05 | BATCH-004 | ATL-005 | Client-side `btool outputs list --debug` | Confirms the effective output values originate from the deployed app | Reviewed | [Artifact](milestone-05-data-ingestion/m05-atl-005-windows-effective-outputs-01.png) |
| `m05-atl-005-windows-output-app-installation-01.png` | M05 | BATCH-004 | ATL-005 | Running forwarder and installed output-app tree | Confirms the output deployment app is installed with its expected files | Reviewed | [Artifact](milestone-05-data-ingestion/m05-atl-005-windows-output-app-installation-01.png) |
| `m05-atl-006-git-release-source-01.png` | M05 | BATCH-005 | ATL-006 | Approved detached Git release source | Confirms the Deployment Server checkout is bound to the human-approved release commit with a clean worktree | Reviewed | [Artifact](milestone-05-data-ingestion/m05-atl-006-git-release-source-01.png) |
| `m05-atl-006-rocky-deployed-input-config-01.png` | M05 | BATCH-005 | ATL-006 | Installed Deployment Server input app | Confirms version `1.0.1`, unchanged wildcard input behavior, ownership, and permissions on the Deployment Server | Reviewed | [Artifact](milestone-05-data-ingestion/m05-atl-006-rocky-deployed-input-config-01.png) |
| `m05-atl-006-rocky-release-delta-01.png` | M05 | BATCH-005 | ATL-006 | Deployed change compared with rollback checkpoint | Confirms the release changed only app metadata version and preserved `inputs.conf` | Reviewed | [Artifact](milestone-05-data-ingestion/m05-atl-006-rocky-release-delta-01.png) |
| `m05-atl-006-rocky-rollback-checkpoint-01.png` | M05 | BATCH-005 | ATL-006 | Commit-specific rollback files | Confirms the pre-release app and input files were retained under the approved release commit boundary | Reviewed | [Artifact](milestone-05-data-ingestion/m05-atl-006-rocky-rollback-checkpoint-01.png) |
| `m05-atl-006-windows-input-app-delivery-01.png` | M05 | BATCH-005 | ATL-006 | Successful input-app delivery in Agent Management | Confirms `TA-atlas-demo-inputs` is successfully deployed to the expected single client through `atlas-base` | Reviewed | [Artifact](milestone-05-data-ingestion/m05-atl-006-windows-input-app-delivery-01.png) |
| `m05-atl-006-windows-deployed-input-config-01.png` | M05 | BATCH-005 | ATL-006 | Deployed Windows input-app files | Confirms the client received version `1.0.1` and the preserved `logs\*.log` stanza | Reviewed | [Artifact](milestone-05-data-ingestion/m05-atl-006-windows-deployed-input-config-01.png) |
| `m05-atl-006-windows-effective-input-config-01.png` | M05 | BATCH-005 | ATL-006 | Client-side effective input configuration | Confirms `btool` resolves the wildcard input, index, and sourcetype through the deployed app | Reviewed | [Artifact](milestone-05-data-ingestion/m05-atl-006-windows-effective-input-config-01.png) |
| `m05-atl-006-windows-forwarder-service-01.png` | M05 | BATCH-005 | ATL-006 | Running Universal Forwarder service | Confirms `SplunkForwarder` remained running after delivery | Reviewed | [Artifact](milestone-05-data-ingestion/m05-atl-006-windows-forwarder-service-01.png) |
| `m05-atl-006-end-to-end-ingestion-01.png` | M05 | BATCH-005 | ATL-006 | Search result for unique controlled-release event | Confirms the ATL-006 validation marker from `atlas-demo2.log` is searchable with `sourcetype=atlas:demo` | Reviewed | [Artifact](milestone-05-data-ingestion/m05-atl-006-end-to-end-ingestion-01.png) |

## Excluded Captures

Unpublished captures are absent from the index and must not be linked from
public consumers. The repair pass moved locally retained sensitive or redundant
files into the ignored `.evidence-private` quarantine so the published evidence
tree contains only indexed artifacts.

- The M01 Compose validation capture exposes the resolved password value.
- The M02 network-inspection capture exposes Docker endpoint IDs and MAC addresses.
- The M03 `server.conf` capture exposes encrypted credential material.
- The M05 ATL-001 interface capture exposes a MAC address and IPv6 identifiers.
- Two ATL-004 Deployment Server captures expose the persistent deployment-client GUID.
- The ATL-005 deployment-client listing exposes the persistent deployment-client GUID.
- Two ATL-005 input-app captures show the superseded `atlas-demo.log` source
  rather than the final `atlas-demo2.log` source, so they are stale and
  redundant as proof of the completed outcome.
- One pre-enrollment Deployment Server baseline is redundant with published
  ATL-003 service and zero-client evidence.
- The earlier M05 security-baseline capture was removed before this pass because
  it exposed a persistent interface identifier.

The ATL-003 Step 1 closeout did not include a publishable screenshot directly
showing the new TCP/8000 firewalld allowance or the successful browser login and
Splunk Home page. Those outcomes must not be represented as image-backed claims
until suitable evidence is supplied and reviewed.

The ATL-003 Agent Management application and server-class captures are excluded
because their address bars expose a persistent private IP. The standalone
`app.conf` capture is redundant with the published effective-configuration
capture. The pre-configuration Deployment Server state does not demonstrate
the completed configuration. The failed IPv6 download and connectivity captures
belong to earlier installation work and add no new ATL-003 validation. The
reload capture is published because it contains no credential value or token;
it shows the failed root-home path, the corrected service-account command, the
successful reload, and the expected zero-client baseline.
