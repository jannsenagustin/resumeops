# ResumeOps Roadmap

This roadmap separates publishing-platform evolution from Project Atlas
engineering work. A roadmap entry is a direction, not a completion claim.

## ResumeOps evolution

### Current state

- ResumeOps V2 presents engineering work as an interactive public record.
- Project pages connect architecture, decisions, validation, evidence, build
  records, field notes, limitations, and source documentation.
- The repository and website use the same Project Atlas terminology.

### Next considerations

- improve documentation navigation as additional engineering records are added;
- keep accessibility, static-export behavior, and responsive review in the
  publishing validation process;
- refine shared content models only when another documented project requires
  them.

## Project Atlas evolution

### Completed and validated

- Milestone 01 — Indexer Deployment
- Milestone 02 — Search Head Deployment
- Milestone 03 — Distributed Search
- Milestone 04 — Windows Event Ingestion

### Planned engineering milestones

- Milestone 05 — managed data onboarding and configuration distribution;
- Milestone 06 — detection engineering based on validated data;
- additional data sources and performance telemetry;
- dashboards and alerts supported by repeatable validation;
- TLS/PKI and secret-management hardening;
- evaluation of clustering, high availability, CI/CD, and orchestration only
  where workstation constraints and evidence support the work.

The compact Atlas status record remains in [docs/milestones.md](docs/milestones.md).
Current constraints remain in [docs/architecture.md](docs/architecture.md) and
[CASE_STUDY.md](CASE_STUDY.md).
