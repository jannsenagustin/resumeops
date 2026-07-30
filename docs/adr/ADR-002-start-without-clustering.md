# ADR-002: Begin Without Splunk Clustering

## Status

Accepted

## Context

The first Atlas iteration needs to establish role readiness and eventually
demonstrate an end-to-end path from Linux events through forwarding and indexing
to search. Search Head or Indexer clustering would introduce more roles,
configuration, resource demand, and failure modes before that core workflow
exists.

Because the lab runs on one workstation, clustering would not provide genuine
host-level availability.

## Decision

Begin with one Search Head and one Indexer. Defer Search Head clustering,
Indexer clustering, the Cluster Manager, Search Head Deployer, replication, and
high-availability design.

Reconsider clustering only after the initial topology and data path are
validated and a later learning objective justifies the additional scope.

## Consequences

The first deployment has fewer dependencies and can focus on component
responsibilities, networking, persistence, and data flow. More workstation
resources remain available for the core roles.

There is no search-tier or indexing-tier high availability, indexed-data
replication, cluster failover, or rolling-maintenance validation. A Search Head,
Indexer, Docker Desktop, or host failure interrupts the lab. Any future
clustering phase requires separate capacity, licensing, networking, security,
and validation decisions.
