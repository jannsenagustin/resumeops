# ADR-003: Use Containers to Simulate Distributed Splunk Roles

## Status

Accepted

## Context

ResumeOps needs a practical environment for learning and documenting a distributed Splunk workflow. The intended topology separates search, indexing, deployment management, log generation, and forwarding responsibilities, but the available infrastructure is a single Windows gaming PC.

Using separate physical systems or a larger virtual-machine estate would add cost and resource overhead before the core workflow is validated. Running every responsibility in one Splunk instance would be easier but would conceal important role boundaries and communication paths.

## Decision

Use Docker Desktop on the Windows host to run separate containers for the planned Splunk Search Head, Splunk Indexer, Splunk Deployment Server, Linux log source, and Splunk Universal Forwarder. Connect them through a dedicated Docker network.

Treat the environment as a containerized learning lab that simulates distributed roles. Do not describe it as a production deployment.

## Reasoning

- Separate containers make role responsibilities and network relationships visible.
- Containers are reproducible enough to support documented iteration on one workstation.
- The topology provides more realistic forwarding, indexing, search, and deployment-management paths than a single Splunk instance.
- A dedicated network supports service discovery while limiting unnecessary host exposure.
- The approach remains achievable within personal hardware and learning constraints.

## Consequences

### Benefits

- Distributed-role behavior can be studied without multiple physical hosts.
- Components can be started, inspected, and revised independently.
- Architecture and troubleshooting evidence can map to distinct responsibilities.
- The lab can form the basis of a documented operational use case.

### Trade-offs

- All roles still share one physical failure and resource domain.
- Container networking and storage do not reproduce every production environment.
- Image support, licensing, resource requirements, and exact configuration must be verified before deployment.
- Secret handling and persistent storage require explicit local design.

## Limitations

- No high availability, clustering, or replication
- Limited data volume and performance testing
- Shared CPU, memory, storage, and networking
- Dependence on Windows and Docker Desktop behavior
- No claim of production security or production readiness
