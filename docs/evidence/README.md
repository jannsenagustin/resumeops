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

Examples: `m01-docker-compose-validation-01.png` and
`m05-atl-001-rocky-admin-tools-02.png`.

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
expected zero-client baseline. Splunk Web recognition was also reviewed, but
the supplied browser captures remain unpublished because their address bars
expose a persistent private IP. The existing ATL-002 composite also proves
version 10.0.8 and listeners on TCP/8000 and TCP/8089. The security-baseline result includes
SELinux, firewalld, and listening-service validation, but its screenshot remains
unpublished pending redaction of a persistent interface identifier. These
records do not claim Universal Forwarder enrollment or application distribution.

## Canonical Artifact Index

`Reviewed` means inspected for unintended sensitive content. This index records
publishability without superseding the validation claim's canonical owner.

| Artifact | Milestone | Task | Validation claim | Sensitivity | Canonical path |
| --- | --- | --- | --- | --- | --- |
| `m01-atlas-indexer-container-health-01.png` | M01 | — | Indexer container is healthy | Reviewed | [Artifact](milestone-01-first-containerized-deployment/m01-atlas-indexer-container-health-01.png) |
| `m01-atlas-indexer-web-login-01.png` | M01 | — | Administrator login succeeded | Reviewed | [Artifact](milestone-01-first-containerized-deployment/m01-atlas-indexer-web-login-01.png) |
| `m01-docker-compose-validation-01.png` | M01 | — | Compose configuration validates | Reviewed | [Artifact](milestone-01-first-containerized-deployment/m01-docker-compose-validation-01.png) |
| `m01-docker-runtime-state-01.png` | M01 | — | Docker shows the deployed Indexer | Reviewed | [Artifact](milestone-01-first-containerized-deployment/m01-docker-runtime-state-01.png) |
| `m02-atlas-search-head-web-login-01.png` | M02 | — | Search Head login succeeded | Reviewed | [Artifact](milestone-02-search-head/m02-atlas-search-head-web-login-01.png) |
| `m02-docker-container-health-01.png` | M02 | — | Both Splunk roles are healthy | Reviewed | [Artifact](milestone-02-search-head/m02-docker-container-health-01.png) |
| `m02-docker-multi-service-state-01.png` | M02 | — | Multi-service runtime is active | Reviewed | [Artifact](milestone-02-search-head/m02-docker-multi-service-state-01.png) |
| `m02-docker-shared-network-01.png` | M02 | — | Both roles share the intended network | Reviewed | [Artifact](milestone-02-search-head/m02-docker-shared-network-01.png) |
| `m03-atlas-indexer-search-peer-01.png` | M03 | — | Indexer is an enabled search peer | Reviewed | [Artifact](milestone-03-distributed-search/m03-atlas-indexer-search-peer-01.png) |
| `m03-atlas-search-head-distributed-search-01.png` | M03 | — | Distributed search returns remote results | Reviewed | [Artifact](milestone-03-distributed-search/m03-atlas-search-head-distributed-search-01.png) |
| `m03-atlas-search-head-job-inspector-01.png` | M03 | — | Job Inspector proves remote execution | Reviewed | [Artifact](milestone-03-distributed-search/m03-atlas-search-head-job-inspector-01.png) |
| `m04-atlas-indexer-receiver-connectivity-01.png` | M04 | — | Indexer receiver is reachable | Reviewed | [Artifact](milestone-04-windows-event-ingestion/m04-atlas-indexer-receiver-connectivity-01.png) |
| `m04-atlas-search-head-job-inspector-01.png` | M04 | — | Windows search executes remotely | Reviewed | [Artifact](milestone-04-windows-event-ingestion/m04-atlas-search-head-job-inspector-01.png) |
| `m04-windows-uf-event-ingestion-01.png` | M04 | — | Windows Event Logs are ingested | Reviewed | [Artifact](milestone-04-windows-event-ingestion/m04-windows-uf-event-ingestion-01.png) |
| `m04-windows-uf-forwarding-status-01.png` | M04 | — | Forwarder has an active connection | Reviewed | [Artifact](milestone-04-windows-event-ingestion/m04-windows-uf-forwarding-status-01.png) |
| `m04-windows-uf-service-status-01.png` | M04 | — | Forwarder service is running | Reviewed | [Artifact](milestone-04-windows-event-ingestion/m04-windows-uf-service-status-01.png) |
| `m05-atl-001-rocky-admin-tools-01.png` | M05 | ATL-001 | Administration tools are installed | Reviewed | [Artifact](milestone-05-data-ingestion/m05-atl-001-rocky-admin-tools-01.png) |
| `m05-atl-001-rocky-admin-tools-02.png` | M05 | ATL-001 | Remaining tools are installed | Reviewed | [Artifact](milestone-05-data-ingestion/m05-atl-001-rocky-admin-tools-02.png) |
| `m05-atl-001-rocky-cpu-allocation-01.png` | M05 | ATL-001 | CPU allocation matches baseline | Reviewed | [Artifact](milestone-05-data-ingestion/m05-atl-001-rocky-cpu-allocation-01.png) |
| `m05-atl-001-rocky-default-route-01.png` | M05 | ATL-001 | Default route is configured | Reviewed | [Artifact](milestone-05-data-ingestion/m05-atl-001-rocky-default-route-01.png) |
| `m05-atl-001-rocky-dns-resolution-01.png` | M05 | ATL-001 | DNS resolution succeeds | Reviewed | [Artifact](milestone-05-data-ingestion/m05-atl-001-rocky-dns-resolution-01.png) |
| `m05-atl-001-rocky-host-identity-01.png` | M05 | ATL-001 | Host identity is verified | Reviewed; generated IDs undisclosed | [Artifact](milestone-05-data-ingestion/m05-atl-001-rocky-host-identity-01.png) |
| `m05-atl-001-rocky-internet-connectivity-01.png` | M05 | ATL-001 | Internet connectivity succeeds | Reviewed | [Artifact](milestone-05-data-ingestion/m05-atl-001-rocky-internet-connectivity-01.png) |
| `m05-atl-001-rocky-kernel-version-01.png` | M05 | ATL-001 | Updated kernel is active | Reviewed | [Artifact](milestone-05-data-ingestion/m05-atl-001-rocky-kernel-version-01.png) |
| `m05-atl-001-rocky-memory-allocation-01.png` | M05 | ATL-001 | Memory allocation matches baseline | Reviewed | [Artifact](milestone-05-data-ingestion/m05-atl-001-rocky-memory-allocation-01.png) |
| `m05-atl-001-rocky-network-interface-01.png` | M05 | ATL-001 | Network interface is configured | Follow-up required; persistent identifiers | [Artifact](milestone-05-data-ingestion/m05-atl-001-rocky-network-interface-01.png) |
| `m05-atl-001-rocky-os-version-01.png` | M05 | ATL-001 | Rocky Linux version is verified | Reviewed | [Artifact](milestone-05-data-ingestion/m05-atl-001-rocky-os-version-01.png) |
| `m05-atl-001-rocky-package-update-01.png` | M05 | ATL-001 | Package update completed | Reviewed | [Artifact](milestone-05-data-ingestion/m05-atl-001-rocky-package-update-01.png) |
| `m05-atl-001-rocky-storage-layout-01.png` | M05 | ATL-001 | Storage layout matches baseline | Reviewed | [Artifact](milestone-05-data-ingestion/m05-atl-001-rocky-storage-layout-01.png) |
| `m05-atl-001-rocky-time-sync-01.png` | M05 | ATL-001 | NTP and timezone are verified | Reviewed | [Artifact](milestone-05-data-ingestion/m05-atl-001-rocky-time-sync-01.png) |
| `m05-atl-002-rocky-splunk-first-start-01.png` | M05 | ATL-002 | First startup completed prerequisite, configuration, index, and installed-file checks | Reviewed | [Artifact](milestone-05-data-ingestion/m05-atl-002-rocky-splunk-first-start-01.png) |
| `m05-atl-002-rocky-splunk-rpm-installation-01.png` | M05 | ATL-002 | RPM installation completed and the installed package query succeeded | Reviewed | [Artifact](milestone-05-data-ingestion/m05-atl-002-rocky-splunk-rpm-installation-01.png) |
| `m05-atl-002-rocky-splunk-systemd-runtime-01.png` | M05 | ATL-002 | Splunk is active under systemd as `splunk` and reports version 10.0.8 | Reviewed | [Artifact](milestone-05-data-ingestion/m05-atl-002-rocky-splunk-systemd-runtime-01.png) |
| `m05-atl-003-rocky-splunk-cli-status-01.png` | M05 | ATL-003 | The Splunk CLI reports the instance and helpers running | Reviewed | [Artifact](milestone-05-data-ingestion/m05-atl-003-rocky-splunk-cli-status-01.png) |
| `m05-atl-003-rocky-splunk-management-port-01.png` | M05 | ATL-003 | TCP/8089 is listening on all IPv4 interfaces | Reviewed | [Artifact](milestone-05-data-ingestion/m05-atl-003-rocky-splunk-management-port-01.png) |
| `m05-atl-003-rocky-splunk-runtime-identity-01.png` | M05 | ATL-003 | Inspected Splunk processes run as the `splunk` account | Reviewed | [Artifact](milestone-05-data-ingestion/m05-atl-003-rocky-splunk-runtime-identity-01.png) |
| `m05-atl-003-rocky-splunk-systemd-health-01.png` | M05 | ATL-003 | Splunk is active under systemd before role configuration | Reviewed | [Artifact](milestone-05-data-ingestion/m05-atl-003-rocky-splunk-systemd-health-01.png) |
| `m05-atl-003-rocky-deployment-app-layout-01.png` | M05 | ATL-003 | The deployment app has the intended layout and `splunk` ownership | Reviewed | [Artifact](milestone-05-data-ingestion/m05-atl-003-rocky-deployment-app-layout-01.png) |
| `m05-atl-003-rocky-deployment-configuration-01.png` | M05 | ATL-003 | `app.conf` and effective server-class configuration match the intended baseline | Reviewed | [Artifact](milestone-05-data-ingestion/m05-atl-003-rocky-deployment-configuration-01.png) |
| `m05-atl-003-rocky-deployment-server-reload-01.png` | M05 | ATL-003 | The Deployment Server reload succeeds as `splunk` and reports zero clients before enrollment | Reviewed | [Artifact](milestone-05-data-ingestion/m05-atl-003-rocky-deployment-server-reload-01.png) |

## Excluded Captures

Unpublished captures are absent from the index and must not be linked from
public consumers. The ignored M03 `server.conf` capture remains excluded because
it is secret-bearing. The M05 security-baseline capture was also excluded and
removed because it exposed a persistent interface identifier.

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
