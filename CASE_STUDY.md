# Atlas: Containerized Splunk Observability Lab

## Executive summary

Atlas is the flagship engineering project presented through ResumeOps. It is a
workstation-scale lab designed to make Splunk platform responsibilities,
network relationships, persistence, and validation visible without requiring a
multi-host environment.

The initial design separates three Splunk Enterprise roles: Search Head,
Indexer, and Deployment Server. Docker Compose defines each role as its own
service, connects them to a dedicated bridge network, and assigns independent
persistent volumes. Milestones 01 through 03 show a deliberate progression:
one operational Indexer, two independently operational roles, and finally a
functioning distributed-search relationship between the Search Head and
Indexer. The Deployment Server remains undeployed.

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

- `atlas-search-head` for the operational search interface and validated
  distributed-search coordination;
- `atlas-indexer` for indexed Splunk data and validated remote search execution;
- `atlas-deployment-server` for planned forwarder configuration management.

Each service has separate `/opt/splunk/etc` and `/opt/splunk/var` named volumes.
This preserves configuration and runtime state across container recreation and
makes storage ownership explicit.

Only the three Splunk Web interfaces are mapped to the host, and each mapping
binds to `127.0.0.1`. Splunk management port `8089` remains exposed only inside
the Docker network. The conventional receiving port is represented as a future
internal input; receiving is not claimed as enabled.

The next data-onboarding stage adds a Linux log source and Universal Forwarder.
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
supports these claims.

Milestone 02 evidence confirms the official image deployed the Search Head,
container initialization completed, both Splunk services were healthy, Search
Head administrator access worked through `localhost:8000`, and both containers
shared `atlas-network` with separate private addresses and independent storage.
[The Milestone 02 evidence](docs/evidence/milestone-02-search-head/) supports
these claims. By itself, Milestone 02 does not prove a search-peer relationship.

Milestone 03 completes that proof chain. Splunk Web showed
`atlas-indexer:8089` as an enabled, healthy peer. A metadata search launched
from the Search Head returned both Atlas hosts, and Job Inspector explicitly
showed `dispatch.stream.remote.atlas-indexer`. That component confirms remote
Indexer participation in execution coordinated by the Search Head. The shown
counts are point-in-time observations, not fixed architectural values. [The
Milestone 03 evidence](docs/evidence/milestone-03-deployment-server/) supports
these claims.

## Engineering challenge

Milestone 03's main challenge was enabling remote administrative login without
misplacing `allowRemoteLogin` in Splunk's stanza-based `server.conf`. The
container's initial `ansible` user lacked read permission, and the minimal image
did not include common editors. Validation caught that an initial append had
landed after an `[lmpool:...]` stanza instead of inside `[general]`.

The file was inspected as root, copied to the host, corrected in VS Code, and
copied back without installing tools into the application container. The
setting was placed in the existing `[general]` stanza under `system/local`, its
placement was verified, and only the Indexer was restarted. Both roles were
healthy before the peer configuration was retried successfully.

The lesson is to inspect stanza structure before editing, use the
instance-specific override layer, keep containers minimal, validate before
restart, restart the smallest scope, and require functional evidence beyond a
healthy configuration screen.

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

- The Indexer, Search Head, and their single-peer distributed-search relationship are operational; the Deployment Server is not deployed.
- No Universal Forwarder or Linux data source is connected.
- No external or sample-data ingestion path is claimed as implemented.
- HEC and SC4S remain planned.
- No dashboards, detections, or alerts exist.
- High availability, clustering, TLS hardening, and production-grade secret
  management are out of scope.
- The entire environment shares one workstation failure domain.

## Results

Atlas now combines a reviewable infrastructure design with a validated
distributed-search path. The milestones prove healthy Indexer and Search Head
roles, role-specific persistence, shared networking, peer health, functional
distributed SPL results, and remote Indexer execution. They do not prove a
completed ingestion or observability pipeline.

## Next milestone

The next milestone is Deployment Server implementation and validation.
Ingestion remains later. Clustering, replication, high availability,
dashboards, detections, and alerts are intentionally unimplemented.
