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

The `milestone-05-data-ingestion` folder contains reviewed infrastructure
evidence for the dedicated Rocky Linux Deployment Server VM. The ATL-001
baseline set covers host identity and resources, network connectivity, package
and kernel updates, required administration tools, and NTP synchronization.
The security-baseline result includes SELinux, firewalld, and listening-service
validation, but its screenshot remains unpublished pending redaction of a
persistent interface identifier. These records validate the operating-system
foundation only; they do not claim that Splunk Enterprise is installed or that
the Deployment Server role is configured.

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

## Excluded Captures

Unpublished captures are absent from the index and must not be linked from
public consumers. The ignored M03 `server.conf` capture remains excluded because
it is secret-bearing. The untracked M05 security-baseline capture remains
excluded pending redaction of persistent interface identifiers. Neither
exception was renamed during this migration.
