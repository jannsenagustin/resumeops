# Project Atlas Roadmap

This roadmap separates publishing-platform evolution from Project Atlas
engineering work. A roadmap entry is a direction, not a completion claim.

## Publication evolution

Project Atlas originated as ResumeOps. The entries below preserve the original
name where it identifies a historical release or checkpoint.

### Next considerations

- improve documentation navigation as additional engineering records are added;
- keep accessibility, static-export behavior, and responsive review in the
  publishing validation process;
- refine shared content models only when another documented project requires
  them.

## Project Atlas evolution

### Planned engineering milestones

- Milestone 05 — Deployment Server and Configuration Management;
- Milestone 06 — Atlas MCP Platform (read-only AI integration);
- Milestone 07 — Configuration Intelligence;
- additional data sources and performance telemetry;
- dashboards and alerts supported by repeatable validation;
- TLS/PKI and secret-management hardening;
- evaluation of clustering, high availability, CI/CD, and orchestration only
  where workstation constraints and evidence support the work.

The planned engineering sequence is:

```text
Milestone 05
Deployment Server and Configuration Management
↓
Milestone 06
Atlas MCP Platform
(Read-only AI integration)
↓
Milestone 07
Configuration Intelligence
```

Atlas MCP is the controlled integration layer between AI and live Atlas
engineering evidence. It is not a chatbot or autonomous engineer. Version 1 is
read-only: it permits no configuration changes, deployment actions, or write
operations.

Configuration Intelligence is the first major Atlas application planned to use
the MCP Platform. It will consume MCP rather than communicate directly with
Splunk Enterprise.

Current validation state is owned by [docs/milestones.md](docs/milestones.md).
Priorities are owned by [the backlog](docs/planning/BACKLOG.md), executable work
by [the active batch](docs/planning/ACTIVE_BATCH.md), and current boundaries by
[architecture](docs/architecture.md).
