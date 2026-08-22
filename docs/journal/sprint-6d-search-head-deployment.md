# Milestone 02 — Search Head Deployment

**Milestone:** 02
**Date:** 2026-08-05
**Status:** Complete / Validated

## Engineering Summary

**Abstract:** Atlas expanded from one containerized Splunk service to two
independently operational roles while stopping short of Distributed Search.

### Engineering Problem

Atlas had a validated Indexer but no separate search tier, so the intended role
boundary did not yet exist at runtime.

### Engineering Change

The deployment added `atlas-search-head` with its own identity, storage, Web
endpoint, and membership on `atlas-network` beside the Indexer.

### Validated Outcome

- Search Head initialization completed.
- Docker reported both Splunk services healthy.
- Search Head Splunk Web was reachable through `localhost:8000`.
- Administrator authentication succeeded.
- Network inspection confirmed both services on `atlas-network` with separate
  private addresses.

### Next Engineering Question

How could the Search Head and Indexer be connected so remote execution was
proven rather than inferred from health and network membership?

---

## Engineering Record

### Objective

Deploy an independent Splunk Enterprise Search Head alongside the existing
Indexer and confirm that both services were healthy, separately accessible,
and attached to the shared Atlas Docker network.

### Starting State

Milestone 01 left Atlas with one healthy `atlas-indexer` service, a dedicated
`atlas-network`, and role-specific Indexer volumes. No Search Head was running,
and no relationship between separate search and indexing roles existed.

### Architecture Change

#### Role Boundary

The milestone added `atlas-search-head` as a second Splunk Enterprise service.
Search coordination and indexing now had separate runtime identities, but no
application-level relationship had been configured between them.

#### Network and Access

Both services joined `atlas-network` and retained separate private addresses.
Search Head Splunk Web was published to the host through `localhost:8000`,
while management port `8089` remained inside the Docker network.

#### Storage Ownership

The Search Head received its own `/opt/splunk/etc` and `/opt/splunk/var` named
volumes. Its configuration and runtime data were therefore separated from the
Indexer volumes.


### Implementation

The Search Head reused the fixed `splunk/splunk:10.0.8-rhel9` image and the
shared Compose service configuration. Its service-specific definition supplied
the Search Head hostname, container name, Web mapping, role label, and
dedicated volumes.

Container initialization and the image's Ansible playbook completed. The
Indexer remained available while the Search Head reached a healthy state, and
the Search Head administrator interface was accessed through its own host
port.

### Engineering Decisions

- The Search Head was deployed as a service separate from the Indexer in
  accordance with [ADR-001](../adr/ADR-001-containerized-splunk-roles.md),
  making the role boundary visible on one workstation.
- Each operational role received independent configuration and runtime volumes
  rather than sharing Splunk state.
- Both services used the named `atlas-network`, preparing stable service-name
  communication without claiming that a search-peer relationship existed.
- The topology remained one Search Head and one Indexer, with clustering and
  high availability deferred under
  [ADR-002](../adr/ADR-002-start-without-clustering.md).

### Validation

#### Validated

- Search Head container initialization and its Ansible playbook completed.
- Docker reported both `atlas-search-head` and `atlas-indexer` healthy.
- Search Head Splunk Web was reachable through `localhost:8000`.
- An administrator login to the Search Head completed successfully.
- Docker network inspection showed both services attached to `atlas-network`
  with separate private addresses.
- Docker Desktop showed the two-service runtime.

#### Not Yet Validated

- Indexer registration as a Search Head search peer
- Remote search or Distributed Search execution
- Universal Forwarder operation
- Windows Event Log ingestion or any other external ingestion path
- Deployment Server operation
- Clustering, high availability, or production readiness

### Evidence

The existing public artifacts remain in the
[Milestone 02 evidence folder](../evidence/milestone-02-search-head/):

- [Search Head and Indexer healthy](../evidence/milestone-02-search-head/m02-docker-container-health-01.png)
- [First successful Search Head login](../evidence/milestone-02-search-head/m02-atlas-search-head-web-login-01.png)
- [Docker Desktop multi-service runtime](../evidence/milestone-02-search-head/m02-docker-multi-service-state-01.png)
- [Shared network membership](../evidence/milestone-02-search-head/m02-docker-shared-network-01.png)

### Result

Atlas gained a healthy, authenticated Search Head operating beside the healthy
Indexer. The services had separate storage and identities while sharing the
same Docker network. The milestone mattered because Atlas now represented the
two roles required for Distributed Search while preserving the distinction
between prerequisites and a validated search relationship.

### Lessons Learned

The repository records no troubleshooting incident for this milestone. The
work established three engineering observations:

- a second container required independent health and access validation rather
  than inheriting confidence from the Indexer;
- shared-network membership proved reachability prerequisites, not Splunk
  Distributed Search; and
- separate role storage preserved the architectural boundary between the
  Search Head and Indexer.

### Transition

With the Search Head and Indexer independently operational, functional
coordination became the next unresolved capability. Milestone 03 therefore had
to register the Indexer as a search peer and prove remote execution from the
Search Head rather than infer Distributed Search from health or network
membership.
