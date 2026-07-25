# Enterprise Observability Home Lab Limitations

The initial design has deliberate limitations that keep the project achievable and focused on distributed Splunk workflows.

## Known Limitations

- **Single host:** every component depends on one Windows workstation and one Docker Desktop runtime.
- **Shared physical resources:** lab services compete with the host operating system and other workstation workloads for CPU, memory, storage, and network capacity.
- **No high availability:** component or host failure can interrupt the entire lab.
- **No replication:** indexed data and service state are not protected through a replicated Splunk topology.
- **No clustering:** the design includes neither Indexer clustering nor Search Head clustering.
- **Containerized infrastructure:** container storage, networking, and lifecycle behavior differ from many physical or virtual-machine deployments.
- **Limited data volume:** the lab will not reproduce enterprise ingestion scale, retention, or workload diversity.
- **Limited performance testing:** results on a shared workstation cannot establish production capacity or performance expectations.
- **Incomplete production representation:** the lab cannot reproduce all production storage latency, network segmentation, bandwidth, security controls, or failure modes.

## Deliberate Scope Decisions

These limitations are intentional rather than hidden deficiencies. The first iteration prioritizes understanding the path from a Linux source through forwarding and indexing to search, dashboards, and alerts. Adding clustering, high availability, or production-scale hardening now would increase resource use and configuration complexity before the core workflow has been validated.

The limitations must remain visible in future implementation and case-study documentation. Later expansion should be driven by a specific learning objective, available resources, and a recorded architecture decision.
