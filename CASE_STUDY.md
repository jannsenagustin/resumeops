# Atlas: Containerized Splunk Observability Lab

## Executive summary

Atlas is the flagship engineering project presented through ResumeOps. It is a
workstation-scale lab designed to make Splunk platform responsibilities,
network relationships, persistence, and validation visible without requiring a
multi-host environment.

The initial design separates three Splunk Enterprise roles: Search Head,
Indexer, and Deployment Server. Docker Compose defines each role as its own
service, connects them to a dedicated bridge network, and assigns independent
persistent volumes. Milestone 01 validated the first operational role: a
healthy Splunk Indexer with persistent storage and verified Web access. The
Search Head, Deployment Server, and multi-role relationships remain undeployed.

Atlas is not presented as production-ready. Its purpose is to create a
controlled environment where architecture, deployment, data onboarding,
troubleshooting, dashboards, and detections can eventually be implemented and
supported by evidence.

## Problem and constraints

The project needed to represent a distributed Splunk workflow on one Windows
workstation. A single Splunk instance would use fewer resources but would hide
the distinction between search, indexing, and deployment management. Multiple
physical systems or a larger virtual-machine estate would add cost and
operational overhead before the core workflow had been validated.

The design therefore had to balance useful role separation with:

- shared workstation CPU, memory, storage, and failure domains;
- Docker Desktop and WSL 2 behavior;
- Splunk image support and licensing requirements;
- local secret handling;
- limited host-port exposure;
- honest status reporting before runtime proof exists.

## Architecture

Atlas uses Docker Desktop on Windows and a dedicated `atlas-network` bridge.
Compose currently defines:

- `atlas-search-head` for the planned search interface and distributed-search
  relationship;
- `atlas-indexer` for the planned receiving, indexing, and searchable data;
- `atlas-deployment-server` for planned forwarder configuration management.

Each service has separate `/opt/splunk/etc` and `/opt/splunk/var` named volumes.
This preserves configuration and runtime state across container recreation and
makes storage ownership explicit.

Only the three Splunk Web interfaces are mapped to the host, and each mapping
binds to `127.0.0.1`. Splunk management port `8089` remains exposed only inside
the Docker network. The conventional receiving port is represented as a future
internal input; receiving is not claimed as enabled.

The planned second stage adds a Linux log source and Universal Forwarder.
Authentication data would then travel from Linux through the forwarder to the
Indexer and become searchable from the Search Head. That path has not been
implemented.

See [the consolidated architecture](docs/architecture.md) for the primary
diagram and detailed boundaries.

## Implementation

The completed implementation is the infrastructure foundation in
[`infrastructure/atlas`](infrastructure/atlas):

1. A Compose project identity is supplied through `ATLAS_PROJECT_NAME`.
2. A shared Splunk service definition centralizes the selected image, restart
   policy, required password, and license-related inputs.
3. Three services inherit the shared definition while retaining distinct
   hostnames, role labels, ports, and volumes.
4. A dedicated bridge network provides service-name discovery.
5. Six named volumes separate configuration and runtime data for each role.
6. `.env.example` documents required local values while `.gitignore` excludes
   the resolved `.env` file and sensitive material.

The configuration deliberately blocks casual startup through required
environment expressions and visible placeholder values. A user must select a
supported image tag, set a local password, and review the applicable license
terms rather than accidentally accepting defaults.

## Validation and evidence

Milestone 01 evidence now confirms:

- the Compose source can be inspected statically;
- the environment contract and secret exclusions are committed;
- the architecture and consequential decisions are documented;
- the Compose configuration resolved successfully;
- the official `splunk/splunk:10.0.8-rhel9` image started the Indexer;
- Docker reported the container as healthy;
- persistent Indexer volumes and the Atlas bridge network were created; and
- Splunk Web and administrator access worked through `localhost:8001`.

[The Milestone 01 evidence](docs/evidence/milestone-01-first-containerized-deployment/)
supports these claims. It does not prove Search Head or Deployment Server
readiness, distributed search, ingestion, dashboards, detections, or alerts.

## Engineering challenge

The main challenge so far has been preventing configuration work from being
mistaken for a deployed system. Compose can describe the intended topology
precisely while still failing later because of image compatibility, licensing,
password policy, resource allocation, or runtime service behavior.

The resolution was to model status as part of the engineering design:
configuration, runtime validation, data ingestion, and observability outputs are
separate milestones. Required environment expressions and documented
placeholders stop the repository from suggesting that it can be started safely
without local decisions.

The lesson is that infrastructure source is evidence of intent and design;
runtime evidence is required before operational claims are justified.

## Key decisions

Two decisions materially shape Atlas:

1. **Use containers to model separate Splunk roles.** This exposes
   responsibilities and communication paths while remaining achievable on one
   workstation.
2. **Begin without clustering.** Clustering would consume additional resources
   and introduce complexity before the basic data path exists. Because every
   container still shares one host, clustering would not provide true host-level
   resilience.

Independent persistent volumes and a dedicated network follow directly from
those decisions. Full records are kept in [`docs/adr`](docs/adr).

## Current limitations

- Only the Indexer role has been deployed and validated.
- Search Head and Deployment Server remain undeployed.
- Distributed search has not been configured and validated.
- No Universal Forwarder or Linux data source is connected.
- No data is claimed as indexed.
- HEC and SC4S remain planned.
- No dashboards, detections, or alerts exist.
- High availability, clustering, TLS hardening, and production-grade secret
  management are out of scope.
- The entire environment shares one workstation failure domain.

## Results

Atlas now combines a reviewable infrastructure design with its first validated
runtime outcome. The Indexer milestone proves container health, persistence,
networking, and administrator Web access, but it is not a completed
observability pipeline.

## Next milestone

The next milestone is Search Head Deployment. Before deployment, Atlas will
inspect the running Indexer's network attachment, persistent mounts, labels,
environment configuration, health check, and container metadata. Deployment
Server, distributed search, and ingestion remain later milestones.
