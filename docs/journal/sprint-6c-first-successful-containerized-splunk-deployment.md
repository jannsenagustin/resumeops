# Milestone 01 — Containerized Splunk Foundation

**Milestone:** 01
**Date:** 2026-08-01
**Status:** Complete / Validated

## Engineering Summary

**Abstract:** Atlas moved from a documented architecture to its first validated
Splunk Enterprise runtime.

### Engineering Problem

Atlas had a reviewable container design, but no Splunk service had completed
runtime validation.

### Engineering Change

Docker Compose created the Atlas network, Indexer storage, and
`atlas-indexer`, publishing Splunk Web through `localhost:8001`.

### Validated Outcome

- The Compose model resolved successfully.
- Docker reported `atlas-indexer` healthy.
- Docker Desktop showed the running container.
- Splunk Web was reachable through `localhost:8001`.
- Administrator authentication succeeded.

### Next Engineering Question

How could Atlas separate search coordination from indexing without claiming a
relationship between the roles before that relationship was validated?

---

## Engineering Record

### Objective

Establish the first operational Splunk Enterprise role in the Atlas Docker
Compose environment and confirm that the containerized Indexer could start,
reach a healthy state, and provide authenticated Splunk Web access.

### Starting State

Atlas had architecture documentation and a reviewable Compose definition, but
no Splunk service had completed runtime validation. Docker Desktop and WSL were
available on the Windows workstation, and the local environment values still
needed to be resolved before deployment.

### Architecture Change

#### Runtime Boundary

The milestone introduced one running Splunk Enterprise role:
`atlas-indexer`. The Search Head and Deployment Server remained outside the
deployed boundary.

#### Network and Access

Docker Compose created the dedicated `atlas-network`. Indexer Splunk Web was
published to the Windows host through `localhost:8001`.

#### Storage Ownership

The Indexer received role-specific named volumes for configuration and runtime
data. This established separate storage ownership without proving persistence
through container recreation.


### Implementation

The deployment used the fixed `splunk/splunk:10.0.8-rhel9` image. Shared
infrastructure remained in `docker-compose.yml`, while environment-specific
values remained in the excluded local `.env` file. The resolved Compose model
was checked before `atlas-indexer` was started.

Docker then pulled the image, created the Atlas network and Indexer volumes,
and started the service. The deployment was limited to the Indexer; the Search
Head and Deployment Server were not deployed.

### Engineering Decisions

- Atlas modeled Splunk roles as separate services on one workstation, following
  [ADR-001](../adr/ADR-001-containerized-splunk-roles.md). Milestone 01
  implemented only the first role in that model.
- Clustering and high availability were deferred under
  [ADR-002](../adr/ADR-002-start-without-clustering.md).
- A fixed image patch release was used instead of a floating major tag so the
  selected runtime was explicit.
- Compose configuration and local environment values were kept separate so
  secrets and workstation-specific values were not embedded in the committed
  service definition.

### Validation

#### Validated

- `docker compose config` parsed the definition and resolved the configured
  environment values successfully.
- Docker reported `atlas-indexer` healthy.
- Docker Desktop showed the running container.
- Splunk Web was reachable through `localhost:8001`.
- An administrator login completed successfully.

#### Not Yet Validated

- Search Head deployment or operation
- Distributed Search or search-peer registration
- Windows Event ingestion or any other external ingestion path
- Deployment Server operation
- Persistence after container recreation
- Clustering, high availability, or production readiness

### Evidence

The existing public artifacts remain in the
[Milestone 01 evidence folder](../evidence/milestone-01-first-containerized-deployment/):

- [Compose configuration validation](../evidence/milestone-01-first-containerized-deployment/2026-08-01_001_compose_validation.png)
- [Healthy `atlas-indexer` container](../evidence/milestone-01-first-containerized-deployment/2026-08-01_002_container_healthy.png)
- [Docker Desktop container view](../evidence/milestone-01-first-containerized-deployment/2026-08-01_003_docker_desktop.png)
- [Successful Splunk administrator login](../evidence/milestone-01-first-containerized-deployment/2026-08-01_004_first_successful_login.png)

### Result

Atlas gained one operational, authenticated, containerized Splunk Enterprise
Indexer backed by a validated Compose configuration. The milestone mattered
because every later Atlas capability depended on first proving that the
documented container model could produce a healthy, accessible runtime.

### Lessons Learned

The repository records no failed deployment sequence for this milestone. The
work established two engineering observations:

- resolving the Compose model before startup separated configuration errors
  from runtime behavior; and
- container health and authenticated Splunk Web access proved different parts
  of readiness, so both were required.

The milestone also left persistence after recreation explicitly unproven even
though named volumes were configured.

### Transition

One healthy Indexer proved the container foundation, but Atlas still had no
separate search tier. The next chapter therefore had to add an independent
Search Head, give it separate storage, and establish network co-membership
without prematurely claiming Distributed Search.
