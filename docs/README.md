# ResumeOps Documentation

ResumeOps is an engineering portfolio and documentation platform focused on observability, Splunk Enterprise, and transparent technical growth. This index provides the entry point to its architecture, decisions, delivery history, and roadmap.

## Architecture

- [Site architecture](architecture/site-architecture.md) explains the Next.js App Router structure, data flow, static export, GitHub Pages deployment, and folder organization.
- [Component structure](architecture/component-structure.md) explains page composition, shared UI responsibilities, data separation, and future component strategy.

## Architecture Decision Records

- [ADR-001: ResumeOps Repositioned as an Observability Engineering Platform](adr/ADR-001-observability-branding.md) records the product-positioning decision.
- [ADR-002: Static Export Deployment using GitHub Pages](adr/ADR-002-static-export-github-pages.md) records the deployment architecture and its trade-offs.
- [ADR-003: Use Containers to Simulate Distributed Splunk Roles](adr/ADR-003-containerized-home-lab.md) records the single-workstation container strategy.
- [ADR-004: Begin the Home Lab Without Splunk Clustering](adr/ADR-004-start-without-clustering.md) records the decision to defer clustering and high availability.
- [Legacy decision archive](decisions/README.md) preserves the original six product and engineering decisions.

## Engineering Projects

- [Enterprise Observability Home Lab](projects/enterprise-observability-home-lab/README.md) is in Sprint 6A architecture and planning for v0.6.0.

## Sprint Archive

- [Sprint 4A: Homepage Architecture](sprints/sprint-4a.md)
- [Sprint 4B: Enterprise Experience](sprints/sprint-4b.md)
- [Sprint 4C: Hero Redesign](sprints/sprint-4c.md)
- [Sprint 4D: Brand & Content Refinement](sprints/sprint-4d.md)

The sprint archive complements, but does not replace, the permanent project [changelog](../CHANGELOG.md).

## Release Notes

- [v0.4.0](releases/v0.4.0.md) summarizes the Sprint 4 platform and positioning milestone.

## Roadmap

- [Engineering roadmap](roadmap.md) organizes completed, active, planned, and future work by phase.

## Working Guides

- [Codex prompting guide](PROMPTING.md) documents the scoped AI-assisted development workflow.
- [Engineering handbook](../AGENTS.md) defines repository conventions, quality standards, and validation expectations.
