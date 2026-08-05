# ResumeOps

> A recruiter-first engineering portfolio featuring Atlas, a containerized Splunk observability lab.

[Live portfolio](https://jannsenagustin.github.io/resumeops/) ·
[Atlas project page](https://jannsenagustin.github.io/resumeops/projects/atlas/) ·
[Architecture](docs/architecture.md) ·
[Engineering narrative](CASE_STUDY.md) ·
[Infrastructure source](infrastructure/atlas/docker-compose.yml)

## What this repository demonstrates

ResumeOps is the presentation layer for Jannsen Agustin’s engineering work. Its
flagship project, **Atlas**, models separate Splunk Search Head, Indexer, and
Deployment Server responsibilities with Docker Compose on one workstation.

Atlas currently demonstrates:

- a healthy Splunk Enterprise Indexer running in Docker;
- a healthy Splunk Enterprise Search Head running alongside the Indexer;
- verified administrator access through Splunk Web on `localhost:8000` and `localhost:8001`;
- a typed three-service Compose configuration for separate Splunk roles;
- a dedicated private bridge network with localhost-only Web mappings;
- validated persistent storage for the Indexer and Search Head;
- explicit environment-variable and secret-handling boundaries;
- documented trade-offs, including the deliberate deferral of clustering.

**Current status:** In Progress — Indexer and Search Head Operational.
Milestones 01 and 02 validated. Distributed search configuration is next.

## Architecture

[The Atlas architecture document](docs/architecture.md) is the single source of
truth for the target topology, component responsibilities, operational status,
networking, persistence, security boundaries, and validation state.

## Technology stack

| Area | Technologies |
| --- | --- |
| Observability | Splunk Enterprise, SPL |
| Infrastructure | Docker Desktop, Docker Compose, Linux |
| Portfolio | Next.js, React, TypeScript, Tailwind CSS |
| Delivery | Git, GitHub Actions, GitHub Pages |

## Engineering contribution

Jannsen designed the initial Atlas topology, scoped the workstation constraints,
defined the Compose services, network, and volumes, documented consequential
architecture decisions, and established an evidence-driven validation sequence.
ResumeOps presents that work alongside approximately seven years of verified
Splunk administration and development experience delivered through Accenture.

## Evidence

The strongest evidence currently available is the repository itself:

- [`docker-compose.yml`](infrastructure/atlas/docker-compose.yml) defines the
  three Splunk roles, network, localhost bindings, and persistent volumes.
- [`.env.example`](infrastructure/atlas/.env.example) documents required local
  inputs without committing credentials.
- [`docs/architecture.md`](docs/architecture.md) records the system boundary and
  the status of every planned connection.
- [Milestone 01 evidence](docs/evidence/milestone-01-first-containerized-deployment/)
  records Compose validation, the healthy Indexer container, Docker Desktop,
  and successful administrator access.
- [The Sprint 6C engineering log](docs/journal/sprint-6c-first-successful-containerized-splunk-deployment.md)
  records the milestone context without duplicating it here.
- [Milestone 02 evidence](docs/evidence/milestone-02-search-head/) records both
  healthy containers, Search Head administrator access, the multi-service
  Docker runtime, and shared network membership.
- [The Sprint 6D engineering log](docs/journal/sprint-6d-search-head-deployment.md)
  records the Search Head deployment and its current limitations.

## Run the portfolio

Requirements: Node.js 20 or another version supported by the locked dependencies.

```bash
npm ci
npm run dev
```

Validate the static site:

```bash
npm run lint
npm run typecheck
npm run build
```

The production build exports the homepage and Atlas route to `out/` with the
GitHub Pages base path configured in `next.config.ts`.

## Inspect the Atlas configuration

From `infrastructure/atlas`, copy `.env.example` to `.env`, select a supported
Splunk image tag, set a strong local password, and review the applicable license
terms before setting the required acceptance arguments.

```powershell
Copy-Item .env.example .env
docker compose config
```

The local `.env` file is ignored. Do not commit resolved secrets or license
material. Startup instructions and destructive-reset warnings are in the
[infrastructure README](infrastructure/atlas/README.md).

## Current limitations

- The Indexer and Search Head are operational; the Deployment Server is not deployed.
- Distributed search is not configured, and data ingestion has not been validated.
- HEC, SC4S, dashboards, detections, and alerts remain planned.
- Atlas is a single-workstation learning lab, not a production deployment.

## Next milestone

Configure the Indexer as a search peer for the Search Head and validate a
distributed search. See [milestones](docs/milestones.md) for the compact status
record and [the engineering narrative](CASE_STUDY.md) for the project story.

## License

This repository is available under the [MIT License](LICENSE).
