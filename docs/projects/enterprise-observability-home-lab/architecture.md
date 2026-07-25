# Enterprise Observability Home Lab Architecture

## Overview

The initial architecture is a containerized learning environment hosted on a Windows gaming PC. Docker Desktop will provide the container runtime, and a dedicated Docker network will isolate and connect the planned lab services.

This design simulates distinct distributed Splunk responsibilities without claiming the resilience, scale, or security posture of a production deployment.

## Components

### Windows Gaming PC

The Windows gaming PC is the physical host. It supplies compute, memory, storage, and host-level access to the lab. Because all services share this host, a host failure or resource shortage can affect the entire environment.

### Docker Desktop

Docker Desktop is the planned container runtime and network provider. It will run the isolated service containers and expose only the host ports required for lab access.

### Splunk Search Head

The Search Head will provide the user-facing search interface and coordinate searches against the Indexer. Planned dashboards and alerts will be created here during a later sprint.

The Monitoring Console will initially be hosted on the Search Head to avoid adding another Splunk role during the first iteration. This choice is appropriate for the learning scope but does not represent a production-scale monitoring topology.

### Splunk Indexer

The Indexer will receive forwarded Linux events, parse and index them, retain the lab data, and serve search results requested by the Search Head.

### Splunk Deployment Server

The Deployment Server will manage planned Universal Forwarder configuration through deployment apps and server classes. It is not intended to manage the Indexer or Search Head in this design.

### Linux Log Source

The Linux log source will generate the authentication and system events used by the first operational use case. Only non-sensitive lab data will be used.

### Splunk Universal Forwarder

The Universal Forwarder will monitor the selected Linux log files and send events to the Indexer. It will receive its applicable forwarder configuration from the Deployment Server.

### Dedicated Docker Network

A dedicated Docker network will provide container-to-container connectivity and internal DNS resolution. Host exposure will be limited to communication that genuinely requires access from outside the Docker network.

## Planned Data Flow

```text
Linux log source
→ Universal Forwarder
→ Indexer
→ Search Head
→ Dashboard and alert
```

The Linux host produces events, the Universal Forwarder collects and sends them, and the Indexer processes and stores them. The Search Head requests matching data from the Indexer and will eventually present it through planned dashboards and alerts.

Configuration management follows a separate path: the Deployment Server manages the Universal Forwarder configuration.

## Why This Architecture

The design creates a realistic distributed workflow while remaining manageable on a personal workstation. Separating search, indexing, and forwarder management makes component responsibilities observable and supports troubleshooting across multiple communication paths. At the same time, one instance per role and one physical host keep resource demands and operational complexity within the learning lab's intended scope.

## Deferred Architecture

The following capabilities are intentionally deferred:

- Indexer clustering
- Search Head clustering
- Cluster Manager
- Search Head Deployer
- Heavy Forwarder
- Splunk SOAR
- High availability
- Production-scale hardening

Deferral prevents infrastructure complexity from obscuring the first learning objectives. Later changes should be justified by evidence and recorded through new or superseding architecture decisions.

## Related Documentation

- [Architecture Diagram](diagrams/architecture.md)
- [Ports and Networking](ports-and-networking.md)
- [Security Considerations](security-considerations.md)
- [Limitations](limitations.md)
