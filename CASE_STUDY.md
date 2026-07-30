# Atlas: Containerized Splunk Observability Lab

## Executive summary

Atlas is the flagship engineering project presented through ResumeOps. It is a
workstation-scale lab designed to make Splunk platform responsibilities,
network relationships, persistence, and validation visible without requiring a
multi-host environment.

The initial design separates three Splunk Enterprise roles: Search Head,
Indexer, and Deployment Server. Docker Compose defines each role as its own
service, connects them to a dedicated bridge network, and assigns independent
persistent volumes. The architecture and configuration are complete. Runtime
deployment and Splunk role validation are still pending.

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

Current evidence is intentionally limited:

- the Compose source can be inspected statically;
- the environment contract and secret exclusions are committed;
- the architecture and consequential decisions are documented;
- a sanitized screenshot confirms that WSL 2, Docker Desktop, Docker Engine,
  and Docker Compose were available on the workstation.

The workstation screenshot is setup evidence only. It does not prove Splunk
image compatibility, service health, Web access, role readiness, distributed
search, ingestion, dashboards, or alerts.

Runtime validation should proceed in this order:

1. Resolve `.env` locally and run `docker compose config`.
2. Review the rendered service definitions without capturing secrets.
3. Start the services and inspect container health and logs.
4. Verify each localhost Web interface.
5. Verify Docker DNS between services.
6. Confirm the six persistent volumes.
7. Configure and validate distributed search.
8. Capture sanitized command and interface evidence.

No unchecked item is represented as complete.

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

- Runtime deployment is awaiting validation.
- Search Head, Indexer, and Deployment Server readiness is unproven.
- Distributed search has not been configured and validated.
- No Universal Forwarder or Linux data source is connected.
- No data is claimed as indexed.
- No dashboards, detections, or alerts exist.
- High availability, clustering, TLS hardening, and production-grade secret
  management are out of scope.
- The entire environment shares one workstation failure domain.

## Results

Atlas currently provides a reviewable, reproducible infrastructure design
rather than a completed observability pipeline. It establishes clear service
boundaries, persistence, networking, secret handling, scope constraints, and a
validation sequence. This is the foundation required for credible runtime
evidence in the next milestone.

## Next milestone

The next milestone is runtime deployment validation. Success requires all three
containers to start, the expected Web endpoints to respond locally, Docker DNS
and volumes to match the design, and sanitized evidence to be committed.
Distributed search and Linux ingestion remain later milestones and will not be
marked complete until independently verified.
