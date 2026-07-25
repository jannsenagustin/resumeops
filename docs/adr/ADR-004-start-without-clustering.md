# ADR-004: Begin the Home Lab Without Splunk Clustering

## Status

Accepted

## Context

The first home-lab iteration needs to demonstrate the end-to-end path from Linux log generation through forwarding and indexing to search, dashboards, and alerts. Splunk clustering would introduce additional roles, configuration, resource demand, and failure modes before that core workflow has been deployed or validated.

The lab runs on one physical workstation. Clustering within that single failure domain would demonstrate some configuration concepts but would not provide genuine host-level high availability.

## Decision

Begin with one Search Head and one Indexer, without Search Head clustering or Indexer clustering. Defer the Cluster Manager, Search Head Deployer, replication, and high-availability design.

Reconsider clustering only after the initial topology and operational use case are validated and a later learning objective justifies the added scope.

## Reasoning

- A non-clustered topology is sufficient to validate the initial data and search workflow.
- Fewer roles keep resource consumption manageable on a personal workstation.
- Reduced complexity makes component responsibilities and troubleshooting easier to learn.
- Clustering on one physical host would not remove the principal single-host failure risk.
- Deferral prevents incomplete clustering work from being presented as resilience.

## Consequences

### Benefits

- The first deployment has fewer dependencies and configuration paths.
- More workstation resources remain available for the core roles.
- Validation can focus on ingestion, metadata, search, and the operational use case.
- Documentation can state the availability boundary clearly.

### Trade-offs

- There is no search-tier or indexing-tier high availability.
- Indexed data is not replicated through an Indexer cluster.
- The lab cannot validate cluster failover, captaincy, replication, or rolling maintenance.
- Later clustering work may require topology and configuration changes.

## Limitations

- A Search Head or Indexer failure interrupts its function.
- A host or Docker Desktop failure interrupts the entire lab.
- The design does not represent a production resilience model.
- Any future clustering design will require separate capacity, licensing, networking, security, and validation decisions.
