# ResumeOps

> Public engineering record for building, validating, and explaining systems work.

[Live engineering record](https://jannsenagustin.github.io/resumeops/) ·
[Project Atlas](https://jannsenagustin.github.io/resumeops/projects/atlas/) ·
[Architecture](docs/architecture.md) ·
[Engineering overview](CASE_STUDY.md) ·
[Roadmap](ROADMAP.md)

## Engineering record

ResumeOps publishes implemented work, validation evidence, engineering
decisions, and current limitations. The website is the interactive reading
layer; this repository is the source of truth for the application,
documentation, and reproducible configuration.

## Project Atlas

Project Atlas is the flagship record: a workstation-scale Splunk environment
with separate Search Head and Indexer roles in Docker and a Windows-host
Universal Forwarder supplying external Event Log telemetry.

**Current state:** ResumeOps V2. Atlas Milestone 04 is complete and validated.
Distributed search and Windows Application, Security, and System Event Log
ingestion are operational.

## Current validated capability

- healthy Splunk Enterprise Indexer and Search Head services;
- independent persistent storage and a dedicated Docker bridge network;
- distributed search from `atlas-search-head` to `atlas-indexer` over Docker DNS;
- loopback-bound TCP 9997 transport from Windows to the containerized Indexer;
- active Universal Forwarder ingestion from host `JNNSN`;
- searchable Windows Event Logs and Job Inspector proof of remote execution;
- evidence-linked architecture, decisions, milestones, and field notes;
- explicit secret-handling and production-readiness boundaries.

## Architecture summary

```text
Windows Event Logs
  -> Universal Forwarder 10.0.8
  -> 127.0.0.1:9997
  -> atlas-indexer
  -> atlas-search-head (distributed search over atlas-network)
```

The [Atlas architecture document](docs/architecture.md) records component
responsibilities, network boundaries, persistence, security constraints, and
validation status.

## Repository structure

| Path | Purpose |
| --- | --- |
| `app/` | Next.js routes for the public engineering record |
| `components/` | Shared presentation and interaction components |
| `data/` | Typed ResumeOps and Atlas domain records |
| `docs/` | Architecture, decisions, milestones, journals, DEA, and evidence |
| `infrastructure/atlas/` | Reviewable Docker Compose source for Atlas |
| `public/resume/` | Published resume artifact |

Generated directories such as `.next/` and `out/` are not source material.

## Documentation map

- [Architecture](docs/architecture.md) — current topology and validated paths
- [Engineering overview](CASE_STUDY.md) — project-level technical narrative and outcomes
- [Atlas milestones](docs/milestones.md) — compact engineering milestone status
- [Decision trail](docs/adr/) — architecture decision records
- [Engineering journals](docs/journal/) — milestone-specific historical records
- [Documentation Experience Architecture](docs/dea/) — reader discovery and documentation-governance decisions
- [Evidence map](docs/evidence/README.md) — validation artifact conventions
- [Roadmap](ROADMAP.md) — separate ResumeOps and Project Atlas evolution
- [Changelog](CHANGELOG.md) — delivered repository changes
- [Infrastructure guide](infrastructure/atlas/README.md) — local Atlas operation

## Technology stack

| Area | Technologies |
| --- | --- |
| Observability | Splunk Enterprise 10.0.8, Universal Forwarder, SPL |
| Infrastructure | Docker Desktop, Docker Compose, Windows, Linux containers |
| Publishing | Next.js 16, React 19, TypeScript, Tailwind CSS |
| Delivery | GitHub Actions, GitHub Pages |

## Run locally

Requirements: Node.js 20 or another version supported by the locked
dependencies.

```bash
npm ci
npm run dev
```

Validate the static export:

```bash
npm run lint
npm run typecheck
npm run build
```

The production build writes the GitHub Pages export to `out/` using the base
path configured in `next.config.ts`.

To inspect the Atlas configuration, follow
[`infrastructure/atlas/README.md`](infrastructure/atlas/README.md). Local
credentials belong in the ignored `infrastructure/atlas/.env` file and must
never be committed.

## Evidence

Claims are tied to repository artifacts rather than fixed counters:

- [`docker-compose.yml`](infrastructure/atlas/docker-compose.yml) defines the
  service, network, port, and volume boundaries.
- [Milestone 01](docs/evidence/milestone-01-first-containerized-deployment/)
  validates the first containerized Indexer deployment.
- [Milestone 02](docs/evidence/milestone-02-search-head/) validates the Search
  Head and shared Docker network.
- [Milestone 03](docs/evidence/milestone-03-distributed-search/) validates the
  search-peer relationship and remote execution.
- [Milestone 04](docs/evidence/milestone-04-windows-event-ingestion/) validates
  the host-to-container telemetry path and searchable Windows Event Logs.

## Current limitations

- Atlas uses one Search Head, one Indexer, and one workstation failure domain.
- The Deployment Server is defined but not deployed.
- Forwarder configuration is direct; app-based management is not implemented.
- Only Application, Security, and System Event Logs are validated.
- Dashboards, detections, alerts, clustering, high availability, and
  production-grade TLS and secret management are not implemented.
- Atlas is an evidence-backed engineering lab, not a production deployment.

## Roadmap

ResumeOps publishing work and Atlas engineering milestones are tracked
separately in [ROADMAP.md](ROADMAP.md). Planned work is not presented as
implemented capability.

## Links

- [Live website](https://jannsenagustin.github.io/resumeops/)
- [Project Atlas](https://jannsenagustin.github.io/resumeops/projects/atlas/)
- [Repository](https://github.com/jannsenagustin/resumeops)

## License

Available under the [MIT License](LICENSE).
