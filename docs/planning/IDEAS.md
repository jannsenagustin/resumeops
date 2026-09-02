# Atlas Idea Inbox

> Parser-readiness note: Keep `IDEA-NNN` headings, field labels, controlled statuses, and record order stable for build-time parsing.

The Idea Inbox captures possibilities before they become commitments. Only a human may promote an idea. Promoted and archived records remain here so the origin and disposition of an idea stay searchable.

## IDEA-001 — Recruiter Mode

**Category:** Website / UX
**Date Recorded:** 2026-08-21
**Origin:** Portfolio review
**Status:** New
**Potential Destination:** Engineering Proposal
**Related Proposal:** None
**Related Backlog:** None

### Description

A recruiter-focused viewing mode that reduces initial technical density and emphasizes plain-English value, professional experience, evidence, and business relevance.

### Why It Might Matter

It could lower the first-10-second barrier for non-technical recruiters without removing technical depth from Atlas.

### Notes

This differs from the implemented plain-English homepage introduction because it would change presentation emphasis across a broader viewing mode. Original discussion date not formally recorded.

## IDEA-002 — Interactive Architecture Explorer

**Category:** Website / UX
**Date Recorded:** 2026-08-21
**Origin:** Architecture discussion
**Status:** Promoted
**Potential Destination:** Existing Atlas architecture inspector
**Related Proposal:** None
**Related Backlog:** None

### Description

Allow visitors to inspect system components, roles, relationships, and evidence from an interactive architectural view.

### Why It Might Matter

Interactive inspection makes architectural relationships easier to understand while retaining evidence and system boundaries.

### Notes

The existing Atlas component inspector substantially implements the inspection concept, although broader evidence-linked exploration could still evolve. Promotion does not claim every possible capability is complete. Original discussion date not formally recorded.

## IDEA-003 — Atlas Operations Center

**Category:** Observability
**Date Recorded:** 2026-08-21
**Origin:** Operations planning
**Status:** Reviewing
**Potential Destination:** ATL-008 or future Engineering Proposal
**Related Proposal:** None
**Related Backlog:** ATL-008

### Description

A separate operational page for real Atlas lab visibility, potentially including Grafana dashboards, Splunk health, infrastructure state, GitHub and CI/CD activity, evidence growth, engineering health, and Hyper-V or Docker visibility.

### Why It Might Matter

It could provide operational orientation without placing dashboards inside the homepage or canonical Atlas documentation page.

### Notes

This consolidates the Grafana Dashboard, Engineering Operations, Operations Hub, and Atlas Operations Center discussions. It must use real data and must not imply live telemetry before sources exist. Original discussion date not formally recorded.

## IDEA-004 — Splunk Search Explorer

**Category:** Splunk
**Date Recorded:** 2026-08-21
**Origin:** Splunk lab planning
**Status:** New
**Potential Destination:** Engineering Proposal
**Related Proposal:** None
**Related Backlog:** None

### Description

An interactive or guided demonstration of useful SPL searches that explains the operational question, search logic, result, and validation.

### Why It Might Matter

It could demonstrate practical SPL reasoning rather than merely listing SPL as a skill.

### Notes

The experience must not imply execution against live Splunk data until the lab supports it. Original discussion date not formally recorded.

## IDEA-005 — Engineering Timeline

**Category:** Documentation
**Date Recorded:** 2026-08-21
**Origin:** Portfolio review
**Status:** New
**Potential Destination:** Engineering Proposal
**Related Proposal:** None
**Related Backlog:** None

### Description

Visualize milestones, decisions, lessons, proposals, execution reports, and releases as a chronological engineering timeline.

### Why It Might Matter

It could show how Atlas evolved and how engineering decisions changed the project.

### Notes

This is distinct from HISTORY.md: history is narrative, while the timeline would be an interactive or structured visualization. Original discussion date not formally recorded.

## IDEA-006 — Recruiter Walkthrough

**Category:** Career Presentation
**Date Recorded:** 2026-08-21
**Origin:** Recruiter feedback
**Status:** New
**Potential Destination:** Engineering Proposal
**Related Proposal:** None
**Related Backlog:** None

### Description

A guided sequence leading a first-time visitor through identity, professional value, Atlas, architecture, evidence, and the Professional Resume.

### Why It Might Matter

It could make the preferred recruiter journey explicit without redesigning the Engineering Console.

### Notes

Recruiter Walkthrough guides navigation; Recruiter Mode changes presentation emphasis. Original discussion date not formally recorded.

## IDEA-007 — Repository-Derived Engineering Metrics

**Category:** Observability
**Date Recorded:** 2026-08-21
**Origin:** Operations planning
**Status:** New
**Potential Destination:** Engineering Proposal
**Related Proposal:** None
**Related Backlog:** None

### Description

Generate planning and engineering metrics from canonical Markdown, evidence metadata, commits, releases, and milestones, such as validated milestone count, evidence growth, documentation coverage, decision count, execution history, current boundary, and backlog distribution.

### Why It Might Matter

It could supply useful Atlas Operations or Grafana data without fabricating operational metrics.

### Notes

A possible future flow is Markdown or GitHub to a build-time or CI parser, structured output, then Grafana or the Planning Console. No such parser is part of this task. Original discussion date not formally recorded.

## IDEA-008 — Live Infrastructure Topology

**Category:** Observability
**Date Recorded:** 2026-08-21
**Origin:** Architecture discussion
**Status:** New
**Potential Destination:** Engineering Proposal
**Related Proposal:** None
**Related Backlog:** None

### Description

Display an automatically updated topology of Atlas infrastructure and communication paths using future sources such as Splunk, Hyper-V, Docker, Prometheus, GitHub Actions, or configuration metadata.

### Why It Might Matter

It could connect documented architecture to observed operational state.

### Notes

This is distinct from the existing static Atlas architecture inspector. Original discussion date not formally recorded.

## IDEA-009 — Engineering Health Model

**Category:** Observability
**Date Recorded:** 2026-08-21
**Origin:** Operations planning
**Status:** New
**Potential Destination:** Engineering Proposal
**Related Proposal:** None
**Related Backlog:** None

### Description

Define an evidence-backed engineering health view using real signals such as validated milestones, evidence coverage, service state, CI/CD status, documentation completeness, and current blockers.

### Why It Might Matter

It could provide a concise status summary without fake completion percentages.

### Notes

No health-score formula should exist before the inputs and their semantics are defined. Original discussion date not formally recorded.

## IDEA-010 — Embedded Evidence Previews

**Category:** Website / UX
**Date Recorded:** 2026-08-21
**Origin:** Recruiter feedback
**Status:** Promoted
**Potential Destination:** ATL-009
**Related Proposal:** None
**Related Backlog:** ATL-009

### Description

Show selected screenshots, command output, configuration snippets, and validation results inside Atlas so visitors do not need to open every GitHub record.

### Why It Might Matter

Recruiters and other first-time readers may not follow deep evidence links.

### Notes

The idea has entered the backlog. Promoted does not claim that the intended inline evidence experience is fully implemented. Original discussion date not formally recorded.

## IDEA-011 — Splunk Configuration Explorer

**Category:** Splunk
**Date Recorded:** 2026-08-21
**Origin:** Splunk lab planning
**Status:** New
**Potential Destination:** Engineering Proposal or Splunk Config Intelligence
**Related Proposal:** None
**Related Backlog:** ATL-016

### Description

A visual way to browse Splunk configuration relationships across props.conf, transforms.conf, inputs.conf, outputs.conf, serverclass.conf, deploymentclient.conf, deployment apps, precedence, and dependencies.

### Why It Might Matter

It could make complex Splunk configuration relationships inspectable and serve as an interface precursor to Config Intelligence.

### Notes

Configuration Explorer is the interface concept; Config Intelligence is the larger analysis product. Original discussion date not formally recorded.

## IDEA-012 — Splunk Config Intelligence

**Category:** Splunk
**Date Recorded:** 2026-08-21
**Origin:** Splunk lab planning
**Status:** Promoted
**Potential Destination:** ATL-016 or future Engineering Proposal
**Related Proposal:** None
**Related Backlog:** ATL-016

### Description

A future Splunk application for configuration analysis, issue detection, dependency mapping, configuration health, and actionable recommendations.

### Why It Might Matter

It is intended to become an original engineering product rather than only a lab demonstration.

### Notes

The backlog task remains canonical for committed work; this record preserves the
idea and its promotion path. Configuration Intelligence is planned as Milestone
07, after the read-only Atlas MCP Platform, and should consume MCP rather than
integrate directly with Splunk. Original discussion date not formally recorded.

## IDEA-013 — SOC Toolkit

**Category:** Splunk
**Date Recorded:** 2026-08-21
**Origin:** Splunk lab planning
**Status:** Archived
**Potential Destination:** Future Engineering Proposal
**Related Proposal:** None
**Related Backlog:** None

### Description

A modular Splunk SOC toolkit containing operational or security-focused utilities.

### Why It Might Matter

It may have future value after Config Intelligence and the core Atlas infrastructure mature.

### Notes

The concept is intentionally parked because Splunk Config Intelligence is the stronger priority. Original discussion date not formally recorded.

## IDEA-014 — Multi-Node Splunk Lab Expansion

**Category:** Infrastructure
**Date Recorded:** 2026-08-21
**Origin:** Splunk lab planning
**Status:** New
**Potential Destination:** Engineering Proposal
**Related Proposal:** None
**Related Backlog:** None

### Description

Expand Atlas beyond its current topology with possible additional indexers, search-head clustering, a cluster manager, heavy forwarder, monitoring console, and more Universal Forwarders.

### Why It Might Matter

It could provide deeper distributed Splunk administration and architecture experience.

### Notes

This depends on M05 completion and a stable current lab and is not active work. Original discussion date not formally recorded.

## IDEA-015 — Docker Lab Visualizer

**Category:** Infrastructure
**Date Recorded:** 2026-08-21
**Origin:** Architecture discussion
**Status:** New
**Potential Destination:** Engineering Proposal or Atlas Operations Center
**Related Proposal:** None
**Related Backlog:** None

### Description

Visualize Atlas Docker containers, networks, volumes, and their relationships.

### Why It Might Matter

It could clarify how the containerized Search Head and Indexer are hosted and connected.

### Notes

The Rocky Linux Deployment Server remains a dedicated VM and is not the Docker host. Original discussion date not formally recorded.

## IDEA-016 — Git-Controlled Splunk CI/CD

**Category:** Platform Engineering
**Date Recorded:** 2026-08-21
**Origin:** Splunk lab planning
**Status:** Promoted
**Potential Destination:** ATL-006 and ATL-007
**Related Proposal:** None
**Related Backlog:** ATL-006, ATL-007

### Description

Recreate the professional flow from feature branch through approved-branch synchronization, configuration change and validation, review, merge, controlled CI/CD release, and Deployment Server distribution.

### Why It Might Matter

It connects Atlas to real professional configuration-deployment practices.

### Notes

ATL-006 and ATL-007 remain the canonical backlog records; this idea does not duplicate their task state. Original discussion date not formally recorded.

## IDEA-017 — SPLUNK.md Specialist Handbook

**Category:** AI Governance
**Date Recorded:** 2026-08-21
**Origin:** AI workflow discussion
**Status:** Promoted
**Potential Destination:** ATL-017
**Related Proposal:** None
**Related Backlog:** ATL-017

### Description

Create a specialist handbook defining how AI collaborators should reason about Splunk architecture, configuration, SPL, dashboards, app development, Deployment Server behavior, troubleshooting, and validation.

### Why It Might Matter

Repeated Splunk-specific rules may eventually justify durable specialist guidance.

### Notes

Trigger conditions remain those recorded in ATL-017. SPLUNK.md is not created by this task. Original discussion date not formally recorded.

## IDEA-018 — Specialist AI Handbook Structure

**Category:** AI Governance
**Date Recorded:** 2026-08-21
**Origin:** AI workflow discussion
**Status:** New
**Potential Destination:** Engineering Proposal
**Related Proposal:** None
**Related Backlog:** None

### Description

Potential future specialist instruction files such as INFRA.md, UI.md, DOCS.md, EVIDENCE.md, and AI.md.

### Why It Might Matter

Specialized guidance could partition repeated domain rules once Atlas grows enough to justify it.

### Notes

A handbook should exist only when repeated domain rules justify it, not merely because a technology exists. Original discussion date not formally recorded.

## IDEA-019 — AI Prompt and Workflow Library

**Category:** AI Governance
**Date Recorded:** 2026-08-21
**Origin:** AI workflow discussion
**Status:** New
**Potential Destination:** Engineering Proposal
**Related Proposal:** None
**Related Backlog:** None

### Description

Preserve reusable structured prompt patterns, validation requirements, and AI-assisted engineering workflows without accumulating obsolete one-off prompts.

### Why It Might Matter

It could support consistent human-in-the-loop engineering work.

### Notes

Prompts are disposable unless they encode a reusable process. Original discussion date not formally recorded.

## IDEA-020 — AI Engineering Activity View

**Category:** AI Governance
**Date Recorded:** 2026-08-21
**Origin:** AI workflow discussion
**Status:** New
**Potential Destination:** Engineering Proposal
**Related Proposal:** None
**Related Backlog:** None

### Description

Visualize how AI contributes to Atlas through planning, documentation, review, validation, and human approval.

### Why It Might Matter

It could make the AI-augmented workflow understandable and defensible.

### Notes

Do not fabricate activity counts, productivity metrics, or universal human-validation claims without canonical data. Original discussion date not formally recorded.

## IDEA-021 — Project History Narrative

**Category:** Documentation
**Date Recorded:** 2026-08-21
**Origin:** Portfolio review
**Status:** Promoted
**Potential Destination:** HISTORY.md
**Related Proposal:** None
**Related Backlog:** ATL-015, ATL-028

### Description

Create a concise history explaining the evolution from ResumeOps to Project Atlas, the Engineering Console, Atlas EOS, and the infrastructure and operational platform.

### Why It Might Matter

It could preserve project identity and evolution without forcing readers to reconstruct history from commits.

### Notes

ATL-015 owns the project-history document. ATL-028 owns the future repository
identity transition after Milestone 05, active-work stabilization, and repository
state synchronization. Original discussion date not formally recorded.

## IDEA-022 — Architecture Decision Records

**Category:** Documentation
**Date Recorded:** 2026-08-21
**Origin:** Architecture discussion
**Status:** Reviewing
**Potential Destination:** Engineering Proposal
**Related Proposal:** None
**Related Backlog:** None

### Description

Use deeper ADR documents for decisions requiring more context, alternatives, consequences, and trade-off analysis than the concise Decision Log provides.

### Why It Might Matter

ADRs could preserve major technical reasoning without overloading DECISIONS.md.

### Notes

The repository already contains limited ADR usage; broader criteria remain under review. ADRs must not replace the Decision Log and should be reserved for significant decisions. Original discussion date not formally recorded.

## IDEA-023 — Engineering Notebook

**Category:** Documentation
**Date Recorded:** 2026-08-21
**Origin:** Personal observation while using Atlas
**Status:** Archived
**Potential Destination:** None
**Related Proposal:** None
**Related Backlog:** None

### Description

A chronological notebook of engineering experiments, discoveries, and implementation progress.

### Why It Might Matter

It could have provided a continuous working narrative of engineering activity.

### Notes

Atlas EOS execution reports, lessons, milestones, and Git history now cover most of this purpose, so the separate notebook concept is retained but not pursued. Original discussion date not formally recorded.

## IDEA-024 — Contact Path Refinement

**Category:** Career Presentation
**Date Recorded:** 2026-08-21
**Origin:** Recruiter feedback
**Status:** Promoted
**Potential Destination:** ATL-012
**Related Proposal:** None
**Related Backlog:** ATL-012

### Description

Provide a clear but restrained way for recruiters to contact the engineer without turning Atlas into a marketing site.

### Why It Might Matter

A discoverable contact path can support professional follow-up while preserving the engineering-first presentation.

### Notes

ATL-012 is the canonical backlog commitment. Original discussion date not formally recorded.

## IDEA-025 — Explain Visible In-Progress Work

**Category:** Career Presentation
**Date Recorded:** 2026-08-21
**Origin:** Portfolio review
**Status:** Promoted
**Potential Destination:** ATL-011
**Related Proposal:** None
**Related Backlog:** ATL-011

### Description

Explain that Atlas intentionally leaves incomplete work visible until validated, so “In Progress / Not Validated” reads as engineering discipline rather than neglect.

### Why It Might Matter

The explanation could help non-technical readers interpret transparent project state accurately.

### Notes

ATL-011 is the canonical backlog commitment. Original discussion date not formally recorded.

## IDEA-026 — Featured Professional Resume Interaction

**Category:** Website / UX
**Date Recorded:** 2026-08-21
**Origin:** Portfolio review
**Status:** Promoted
**Potential Destination:** ATL-013 and existing Featured Artifact interaction
**Related Proposal:** None
**Related Backlog:** ATL-013

### Description

Use a restrained validated-green border and title or icon response on hover and keyboard focus so the Professional Resume artifact feels important without becoming a marketing call to action.

### Why It Might Matter

Consistent pointer and keyboard feedback can improve discoverability while maintaining Atlas restraint.

### Notes

The current Featured Artifact styling includes the intended interaction. The backlog status remains unchanged because this task is not authorized to update it. Original discussion date not formally recorded.

## IDEA-027 — Atlas Planning Console

**Category:** Website / UX
**Date Recorded:** 2026-08-21
**Origin:** AI workflow discussion
**Status:** Promoted
**Potential Destination:** EP-001 and ATL-014
**Related Proposal:** EP-001
**Related Backlog:** ATL-014

### Description

A read-only visual projection of Atlas EOS for viewing ideas, priorities, backlog, decisions, lessons, and active work without repeatedly navigating repository files.

### Why It Might Matter

It improves project orientation while keeping repository Markdown authoritative.

### Notes

Stage 2 implementation exists. EP-001 and ATL-014 statuses remain unchanged. Original discussion date not formally recorded.

## IDEA-028 — Adopt Atlas Planning Console as Daily Engineering Workflow

**Category:** Documentation; AI Governance
**Date Recorded:** 2026-08-21
**Origin:** Human-directed Atlas EOS workflow adoption
**Status:** Promoted
**Potential Destination:** Atlas EOS operating workflow
**Related Proposal:** None
**Related Backlog:** ATL-024

### Description

Use the Atlas Planning Console as the first destination for each Project Atlas
engineering session and transition from conversation-driven planning to the
repository-backed Atlas EOS workflow:

```text
Idea
  -> Idea Inbox
  -> Human Review
  -> Engineering Proposal
  -> Backlog
  -> Active Batch
  -> Codex Execution
  -> Human Validation
  -> Execution Report
  -> Decision / Lesson when applicable
```

Chat may support planning and review, but it should not be the primary planning
repository.

### Why It Might Matter

Daily use will make Atlas EOS an actual operating system, expose workflow
friction, and guide improvements from observed engineering practice rather than
assumptions.

### Notes

Promoted directly to ATL-024 at human direction. Backlog inclusion does not
authorize execution; the task must still be placed in `ACTIVE_BATCH.md`.

## IDEA-029 — Atlas MCP Platform and Splunk MCP Integration

**Category:** Platform Engineering
**Date Recorded:** 2026-08-22
**Origin:** Atlas roadmap evolution
**Status:** Promoted
**Potential Destination:** EP-003
**Related Proposal:** EP-003
**Related Backlog:** None

### Description

Design an extensible Atlas MCP Platform to provide structured access to
engineering systems used throughout Project Atlas.

The first implementation will be a Splunk MCP server that exposes Splunk
knowledge, configuration, metadata, and operational information to Atlas
components.

Config Intelligence will consume the Atlas MCP Platform rather than
communicating directly with Splunk, allowing additional engineering systems to
be integrated through a common interface.

Potential future MCP providers include:

- Splunk Enterprise
- GitHub
- Docker
- Rocky Linux
- Hyper-V
- Azure DevOps
- Kubernetes
- OpenTelemetry
- Other infrastructure and observability platforms

### Phase 1

Implement the Splunk MCP Server.

Possible capabilities:

- Search execution
- Configuration inspection
- App metadata
- Knowledge object discovery
- REST endpoint access
- Index metadata
- Saved searches
- Dashboard metadata
- Deployment information
- Health checks

### Long-Term Vision

Atlas MCP becomes the engineering integration layer for Project Atlas.

Rather than every Atlas component integrating separately with external
systems, components consume standardized MCP services.

This reduces coupling, encourages reuse, and allows Atlas to evolve into an
engineering platform rather than a collection of independent tools.

### Why It Might Matter

- Config Intelligence gains live Splunk awareness.
- Future Atlas capabilities can reuse one integration layer.
- AI agents gain structured engineering context instead of relying on static
  prompts.
- Supports future engineering automation without changing Atlas architecture.

### Notes

This broader integration-layer concept is now represented by EP-003 and the
phased Atlas MCP strategy recorded in IDEA-030. Promotion does not place work in
the backlog or authorize implementation.

## IDEA-030 — Atlas MCP Server

**Category:** AI Governance
**Date Recorded:** 2026-08-23
**Origin:** Human-directed idea capture
**Status:** Promoted
**Potential Destination:** EP-003
**Related Proposal:** EP-003
**Related Backlog:** None

### Description

Atlas MCP is the planned integration layer between AI and Project Atlas. It
exposes live engineering evidence from the Atlas Splunk environment through a
controlled Model Context Protocol service so AI assistants can inspect evidence
instead of relying on assumptions.

Atlas MCP is not a chatbot and is not an autonomous engineer. It provides a
bounded evidence interface; humans remain responsible for conclusions,
approvals, and engineering actions.

Following completion of Milestone 05, Atlas MCP becomes the next planned
engineering initiative.

### Core Principles

- Evidence before conclusions.
- Read-only by default.
- Human approval required for any write operation.
- Every AI explanation must be grounded in live Splunk data.
- Atlas explains evidence rather than guessing.

### Phased Implementation Strategy

#### Version 1 — Read-Only AI Integration

Version 1 establishes the MCP service, its Splunk REST API abstraction, and a
strictly read-only tool surface for inspecting live Atlas evidence.

Primary capabilities:

- Splunk health
- License inspection
- Index inspection
- Forwarder inspection
- Approved SPL execution
- Search explanation
- Configuration discovery
- REST API abstraction

Version 1 permits no configuration changes, deployment actions, or write
operations.

#### Later Phases — Application Integration

After the read-only platform is validated, Configuration Intelligence becomes
the first major Atlas application built on top of Atlas MCP. Any broader provider
or write capability requires separate human review and approval.

### Architecture

```text
User
↓
ChatGPT / Claude
↓
Model Context Protocol
↓
Atlas MCP Platform (Python)
↓
Splunk REST API / SDK
↓
Project Atlas Platform
```

### Long-Term Vision

```text
Configuration Intelligence
↓
Atlas MCP Platform
↓
Splunk Enterprise
```

Future Atlas applications should consume MCP rather than communicating directly
with Splunk. Potential future providers include GitHub, Docker, Hyper-V, Linux,
OpenTelemetry, and Azure DevOps. These providers are possibilities only and are
not approved work.

An engineer should eventually be able to ask:

> "Atlas, why isn't my Windows Security data reaching the index?"

and receive a complete explanation backed by live evidence from the environment.

### Why It Might Matter

It could let AI assistants explain Atlas Splunk behavior from current operational
evidence while preserving read-only defaults and human control over changes.

### Dependencies

Milestone 05 must be completed before Atlas MCP begins. Configuration
Intelligence follows the validated Atlas MCP Platform and is tracked separately
as ATL-016.

### Notes

Promoted to EP-003 for architectural definition. Promotion does not create a
backlog item, activate a batch, or authorize implementation.

## IDEA-031 — Engineering Session Capture and Codex Closeout Handoff

**Category:** AI Governance
**Date Recorded:** 2026-08-23
**Origin:** Human-directed Atlas EOS planning
**Status:** Promoted
**Potential Destination:** EP-004
**Related Proposal:** EP-004
**Related Backlog:** ATL-029

### Description

Create a lightweight session-capture mechanism for active Atlas engineering
work. During a session, concise breadcrumbs could record:

- commands or changes executed;
- validation performed;
- errors encountered;
- root causes;
- fixes applied;
- screenshots captured;
- evidence excluded;
- decisions made;
- reusable lessons;
- remaining work.

At the end of the session, Codex would read the session record and use it to
prepare synchronization of `BACKLOG.md`, `ACTIVE_BATCH.md`, `milestones.md`,
evidence indexes, decisions, lessons learned, execution reports, journals,
project state, and commit scope for human review.

### Why It Might Matter

Codex cannot know what happened in ChatGPT, a VM, Splunk Web, or the operator's
head unless that context is written somewhere. A session record could reduce
repeated prompting, lower token usage, improve closeout accuracy, and prevent
engineering details from being lost.

### Notes

Promoted to EP-004 and ATL-029 for evaluation and future implementation. Raw
session notes are non-canonical and must never override repository planning
records or expand work beyond the Active Batch.

## IDEA-032 — Atlas Fieldbook UI Refactor

**Category:** Website / UX; Design System
**Date Recorded:** 2026-09-02
**Origin:** Human-directed idea capture
**Status:** New
**Potential Destination:** Engineering Proposal / Design Proposal
**Related Proposal:** None
**Related Backlog:** None

### Description

Explore a visual-only refactor that moves Atlas from its current dark theme to
a light engineering-fieldbook aesthetic. The direction would use IBM Plex,
warm drafting-paper tones, graphite and dark-navy typography, restrained
burnt-orange accents, and green reserved for validated state. Hard rules,
asymmetric technical layouts, sparse topology lines, and field-note or
engineering-record influences should replace conventional SaaS-card styling
where the existing information architecture permits.

The governing design principle is:

> Atlas should look documented, not decorated.

### Why It Might Matter

The fieldbook direction could give Atlas a more distinctive engineering-record
identity while improving the visual relationship between planning, telemetry,
evidence, decisions, and validated technical work. A future proposal should
evaluate typography, tokens, layout rules, responsive behavior, accessibility,
and a migration strategy before any implementation is approved.

### Preservation Constraints

This idea is strictly a visual refactor. Any future proposal or implementation
must preserve all meaningful Atlas UI elements and functionality, including:

- the current sidebar navigation and routes;
- telemetry and state visibility;
- milestone, task, and batch information;
- evidence, decision, and planning surfaces;
- existing interactions; and
- canonical state projections and their real Atlas data.

The visual direction must not remove or simplify away meaningful information,
replace real Atlas data with decorative or fabricated content, or weaken the
repository-backed ownership and projection model.

### Notes

This record captures a future design direction only. It is not an engineering
proposal, backlog commitment, active batch, or authorization to modify the
application. Human review is required before promotion into an EP or design
proposal and any resulting `ATL-NNN` backlog items.
