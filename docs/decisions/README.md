# Architecture Decision Records

Architecture Decision Records (ADRs) capture significant technical and product decisions, the context behind them, and their consequences. ResumeOps records ADRs so its architecture remains explainable as the portfolio and case-study system evolve.

This directory is the original decision archive. Its accepted records remain unchanged as project history. New records use the [current ADR directory](../adr/) and the `ADR-NNN-descriptive-slug.md` naming format.

## Convention

- Preserve records in `docs/decisions` with their original four-digit names.
- Store new records in `docs/adr` using the current ADR naming convention.
- Use one of these statuses: Proposed, Accepted, Superseded, or Rejected.
- Include the sections Status, Context, Decision, and Consequences.
- Do not silently rewrite an accepted ADR.
- Record a major change in a new ADR and mark the earlier decision as superseded when appropriate.

## Index

1. [ADR 0001: Technical Portfolio Instead of Chronological Resume](0001-technical-portfolio.md)
2. [ADR 0002: Career Journey Separate from Professional Experience](0002-career-journey-separation.md)
3. [ADR 0003: Why I Build Before Case Studies](0003-why-i-build-before-case-studies.md)
4. [ADR 0004: Engineering Case Studies Instead of Project List](0004-engineering-case-studies.md)
5. [ADR 0005: Reusable Design System](0005-reusable-design-system.md)
6. [ADR 0006: AI-Assisted Development with Human Review](0006-ai-assisted-development.md)
