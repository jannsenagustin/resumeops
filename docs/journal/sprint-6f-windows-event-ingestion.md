# Milestone 04 — Windows Event Ingestion via Universal Forwarder

**Milestone:** 04
**Date:** 2026-08-12
**Status:** Complete / Validated

## Engineering Summary

**Abstract:** Atlas extended its validated distributed-search architecture with
a Windows-host Universal Forwarder and searchable external Event Log telemetry.

### Engineering Problem

Distributed Search operated only against Splunk-generated internal telemetry;
Atlas had not validated collection from a source outside the Docker network.

### Engineering Change

Splunk Universal Forwarder 10.0.8 collected Windows Application, Security, and
System Event Logs and sent them through a loopback-published receiver to the
containerized Indexer.

### Validated Outcome

- Windows reported the `SplunkForwarder` service running.
- TCP connectivity to `127.0.0.1:9997` succeeded.
- The forwarder reported `127.0.0.1:9997` as an active destination.
- All three intended Windows Event Log sources were searchable.
- Job Inspector confirmed remote execution on `atlas-indexer`.

### Next Engineering Question

How should Atlas replace direct forwarder configuration with centralized,
reviewable configuration management?

---

## Engineering Record

### Objective

Milestone 04 moved Atlas beyond Splunk-generated internal telemetry by onboarding a real external source: Windows Application, Security, and System Event Logs from host `JNNSN`.

### Starting State

Milestone 03 left a validated Distributed Search relationship between
`atlas-search-head` and `atlas-indexer`. Searches could prove remote Indexer
execution, but no external telemetry source or forwarding path had been
validated.

### Architecture Change

Splunk Universal Forwarder 10.0.8 runs directly on the Windows host while the Search Head and Indexer remain containerized. This creates a host-to-container ingestion boundary. The forwarder is an external Splunk client, not another Docker service.

The Windows installer used the Virtual Account service identity and retained the installer-granted privileges required for the selected event inputs. No Deployment Server was configured; the forwarder sends directly to the Indexer.

#### Receiver Exposure

Splunk receiving on TCP 9997 was already enabled on `atlas-indexer`. Compose `expose` made that port visible inside the Docker network, but did not make it reachable from Windows. The host mapping is `127.0.0.1:${ATLAS_INDEXER_RECEIVER_PORT}:9997`, with the environment resolving the host port to 9997.

The loopback binding makes the receiver available to the host-based forwarder without opening it to the LAN. The forwarder correctly targets `127.0.0.1:9997`, not `atlas-indexer:9997`; Docker DNS applies only inside the Docker network.

### Implementation

- Version: Splunk Universal Forwarder 10.0.8
- Platform: Windows host `JNNSN`
- Service: `SplunkForwarder`
- Service identity: Windows Virtual Account
- Inputs: Application, Security, and System Event Logs
- Destination: `127.0.0.1:9997`
- Deployment Server: not configured

No password or secret-bearing local configuration is reproduced here.

### Engineering Decisions

- Run Universal Forwarder on the Windows source host rather than model it as a
  Docker service.
- Retain the installer-selected Virtual Account and its granted privileges for
  the selected Event Log inputs.
- Publish the existing Indexer receiver only on Windows loopback instead of the
  LAN.
- Target `127.0.0.1:9997` from Windows because Docker service DNS is confined
  to the container network.
- Configure the forwarder directly and leave Deployment Server undeployed for
  this milestone.

### Validation

#### Validated

1. `Get-Service` showed `SplunkForwarder` running.
2. `Test-NetConnection -ComputerName 127.0.0.1 -Port 9997` returned `TcpTestSucceeded : True`.
3. `splunk.exe list forward-server` showed `127.0.0.1:9997` under active forwards and no inactive forwards.
4. `index=* host=JNNSN | stats count by source sourcetype` returned `WinEventLog:Application`, `WinEventLog:Security`, and `WinEventLog:System`.
5. Search Job Inspector showed `dispatch.stream.remote.atlas-indexer`.

The captured search showed approximately 13,533 events; a later Job Inspector run scanned approximately 13,551. These are point-in-time observations. The important result is that all three intended sources were searchable and the Indexer executed remote work for the Search Head.

#### Troubleshooting and Correction

The configured destination initially appeared inactive during a check when the downstream Docker services were unavailable. The forwarding configuration existed, but a configured target cannot establish a session while its receiver is offline.

Universal Forwarder administrative CLI validation also required the lab-specific `[general]` setting `allowRemoteLogin = always`. The `SplunkForwarder` service was restarted after the adjustment. This supports local lab administration and is not presented as a universal production recommendation. The screenshot containing generated secret-bearing `server.conf` values was rejected from publication.

After the Atlas services were available and the forwarder restarted, the destination became active. This distinguished generic TCP reachability from the stronger proof of an established Splunk forwarding session.

#### Not Yet Validated

The following capabilities remained unimplemented and unvalidated:

- Deployment Server or app-based forwarder configuration
- Custom indexes where appropriate, additional data sources, or performance
  telemetry
- Dashboards, alerts, or detections
- Custom TLS or PKI hardening
- Clustering or high availability
- Azure DevOps CI/CD
- Kubernetes or Splunk Operator deployment
- Production readiness

### Evidence

- [Universal Forwarder service running](../evidence/milestone-04-windows-event-ingestion/milestone-04-01-universal-forwarder-service-running.png)
- [Indexer receiver connectivity](../evidence/milestone-04-windows-event-ingestion/milestone-04-02-indexer-receiver-connectivity.png)
- [Universal Forwarder active connection](../evidence/milestone-04-windows-event-ingestion/milestone-04-03-universal-forwarder-active-connection.png)
- [Windows Event Log ingestion](../evidence/milestone-04-windows-event-ingestion/milestone-04-04-windows-event-ingestion.png)
- [Distributed search execution](../evidence/milestone-04-windows-event-ingestion/milestone-04-05-distributed-search-execution.png)

### Result

Windows Application, Security, and System logs flowed through the host-based Universal Forwarder to `atlas-indexer` and became searchable from `atlas-search-head`. Job Inspector closed the end-to-end chain by identifying remote execution on `atlas-indexer`.

### Lessons Learned

- Transport reachability does not prove application-session health.
- Docker `expose` and host port publishing solve different network problems.
- Docker DNS applies to containers; a Windows-host forwarder needs the host-published endpoint.
- Downstream service availability directly affects forwarder status.
- Splunk CLI state and Job Inspector provide stronger evidence than generic network tests.
- Screenshots require a secret review before publication.

### Transition

The direct forwarding path proved external Windows telemetry ingestion, but it
did not provide centralized configuration management. The next milestone must
introduce a managed configuration boundary before Atlas expands data onboarding
further.
