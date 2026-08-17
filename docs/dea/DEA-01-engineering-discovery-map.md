# DEA-01 — Engineering Discovery Map

**Status:** Draft / Architectural Review

**Scope:** Project Atlas (formerly ResumeOps) engineering documentation

**North Star:** “I feel like I’m learning with you.”

## Purpose

DEA-01 answers one question: **How should a human discover Project Atlas?**

It defines readers, their questions, discovery layers, transitions, document
responsibilities, reading modes, cognitive-load constraints, success criteria,
current-state gaps, and migration implications. It does not implement a
documentation migration or prescribe Splunk architecture.

Documentation Experience Architecture preserves engineering depth while
reducing the effort required to understand verified engineering. “Learn with
me” is an experience goal: readers should be able to follow real decisions,
implementation, validation, correction, and learning without being instructed
to reproduce the system step by step.

This document belongs to the [DEA document set](README.md).

## Governing Context

DEA-01 complies with the
[Project Atlas Engineering Manifesto](../../ATLAS_PRINCIPLES.md). The manifesto
defines what the project believes, how engineering is governed, and what is
non-negotiable. DEA defines how readers experience that engineering, how
information is layered, and how documents guide discovery.

Project Atlas is a public engineering record and deliberate practice
environment based on Jannsen Agustin’s experience as a Splunk practitioner. It
supports reacquiring and extending technical skills through building an
evolving Splunk and observability platform. It records real decisions,
problems, corrections, validation, and evidence.

Atlas is not a step-by-step tutorial, generic portfolio project, marketing
page, static case study, fake production environment, or collection of
unrelated features. Readers may learn from the engineering sequence, but Atlas
does not prescribe a mechanical reproduction procedure.

AI assistance is part of the disclosed workflow. AI accelerates implementation
and analysis; its output remains a proposal until reviewed. Jannsen owns the
engineering decisions, reviews implementation, accepts validation, directs
corrections, and approves publication. Credibility comes from judgment,
validation, ownership, and evidence rather than manual authorship of every line.

## Discovery Mission

Atlas should guide readers through engineering discovery without requiring
them to consume all documentation linearly. The canonical question sequence is:

```text
What is Project Atlas?
  → Why is Atlas different?
  → How did Atlas evolve?
  → Can the claims be verified?
  → How was it engineered?
  → Can I inspect the source myself?
```

The experience follows reader questions rather than repository filenames.

## Reader Personas

### Recruiter

**Primary question:** Is Jannsen the right fit for the role?

**Needs:** Identity, specialization, enterprise experience, demonstrated proof,
current focus, resume, and availability.

**Does not initially need:** Docker internals, Splunk configuration, detailed
ADRs, evidence metadata, or command output.

**Target reading time:** Approximately 30 seconds.

**Success statement:** “This is a credible Splunk / Observability engineer
whose claims are supported by real work.”

### Hiring Manager

**Primary question:** Can I trust this engineer to work systematically and
communicate clearly?

**Needs:** What was built, why it matters, progression, validation, boundaries,
troubleshooting discipline, professional experience, and current technical
direction.

**Target reading time:** Approximately 3 minutes.

**Success statement:** “This engineer understands systems, works methodically,
and communicates technical decisions clearly.”

### Splunk Engineer or Architect

**Primary question:** How did this system come to be?

**Needs:** Servers and roles, data flow, architecture, milestones, decisions,
trade-offs, validation, evidence, configuration, source, problems, and
corrections.

This reader may skip introductory material and enter through architecture,
servers, the data pipeline, milestones, or evidence.

**Target reading time:** Approximately 10–20 minutes, with unlimited deeper
inspection available.

**Success statement:** “I understand how this engineer thinks, and I feel like
I am learning alongside him.”

## Canonical Discovery Questions

### 1. What is Project Atlas?

| Attribute | Definition |
| --- | --- |
| Purpose | Establish context before technical depth |
| Primary audience | All readers, especially recruiters and first-time visitors |
| Concise answer | Atlas is a public engineering record and deliberate practice environment built around real Splunk and observability engineering |
| Supporting artifacts | Homepage introduction, Atlas overview, README |
| Exclude initially | Ports, service configuration, evidence counts, and milestone metadata |
| Natural next question | Why is this different from another technical portfolio or lab? |
| Success condition | The reader understands what they are viewing and why it exists |

### 2. Why is Atlas different?

| Attribute | Definition |
| --- | --- |
| Purpose | Explain why the record deserves further inspection |
| Primary audience | Recruiters, hiring managers, and engineers |
| Concise answer | Atlas exposes engineering evolution rather than presenting only completed outcomes |
| Supporting artifacts | Atlas overview, milestone sequence, decisions, corrections, and evidence model |
| Clarification | Readers learn from the process, but Atlas is not a prescriptive tutorial they are expected to copy |
| Natural next question | How did the system evolve? |
| Success condition | The reader recognizes honesty, depth, chronology, evidence, human ownership, and transparent AI assistance as the differentiators |

### 3. How did Atlas evolve?

| Attribute | Definition |
| --- | --- |
| Purpose | Present milestones as the narrative spine |
| Primary audience | Hiring managers, engineers, and architects |
| Concise answer | Atlas progressed through prerequisite capabilities, with each validated stage exposing the next limitation |
| Supporting artifacts | Canonical milestones, journals, architecture history, and Git history |
| Natural next question | Can these claims be proven? |
| Success condition | The reader can explain what existed before, what changed, what was validated, and why the next milestone followed |

The canonical sequence is:

1. **01 — Containerized Splunk Foundation**
2. **02 — Search Head Deployment**
3. **03 — Distributed Search**
4. **04 — Windows Event Ingestion via Universal Forwarder**
5. **05 — Rocky Linux Deployment Server & Configuration Management — Planned**

### 4. Can the claims be verified?

| Attribute | Definition |
| --- | --- |
| Purpose | Build trust through independently reviewable evidence |
| Primary audience | Hiring managers, engineers, and architects |
| Concise answer | Major claims are tied to runtime state, logs where available, configuration, screenshots, Job Inspector, Docker state, source history, and milestone records |
| Supporting artifacts | Evidence directories, validation sections, configuration, commits, and releases |
| Natural next question | How was the system engineered? |
| Success condition | The reader can connect a material claim to appropriately scoped proof |

### 5. How was it engineered?

| Attribute | Definition |
| --- | --- |
| Purpose | Expose technical depth and engineering judgment |
| Primary audience | Engineers, architects, and deep technical reviewers |
| Concise answer | Architecture, responsibilities, data paths, decisions, implementation, field notes, and validation chains explain how and why the system changed |
| Supporting artifacts | Architecture document, ADRs, milestones, journals, configuration, and validation records |
| Natural next question | Can I inspect the implementation myself? |
| Success condition | The reader understands both implementation and the reasoning behind it |

### 6. Can I inspect everything?

| Attribute | Definition |
| --- | --- |
| Purpose | Lead the reader to the repository as the source of truth |
| Primary audience | Engineers, architects, and deep technical reviewers |
| Concise answer | Source, Compose definitions, documentation, Git history, releases, evidence, and commits are available for direct inspection, subject to secret-handling boundaries |
| Supporting artifacts | Repository source, infrastructure, Git history, releases, and evidence |
| Natural next question | Which implementation or historical detail should I inspect first? |
| Success condition | The reader can inspect implementation directly instead of relying on narrative claims |

## Discovery Layers

| Layer | Reader question | Information allowed | Information prohibited at this layer | Expected time | Primary interface | Transition |
| --- | --- | --- | --- | --- | --- | --- |
| 0 — Identity | Who built this? | Name, role, specialization, current focus, resume path | System internals and evidence metadata | 5–10 seconds | Homepage | What is Atlas? |
| 1 — Context | What is Atlas? | Purpose, system category, current scope, honest status | Port tables, configuration, and detailed chronology | 15–30 seconds | Homepage and Atlas overview | Why is it different? |
| 2 — Differentiation | Why is Atlas different? | Engineering evolution, evidence model, human ownership, transparent AI assistance | Full milestone prose and implementation detail | 30–60 seconds | Atlas overview | How did it evolve? |
| 3 — Evolution | How did Atlas become this? | Ordered milestones, starting states, changes, outcomes, transitions | Raw evidence dumps and low-level configuration | 1–3 minutes | Atlas overview and milestone index | Can the claims be proven? |
| 4 — Verification | Can the claims be proven? | Validation chains, evidence summaries, limitations, direct artifact links | Unrelated implementation history | 1–5 minutes | Milestones and evidence | How was it engineered? |
| 5 — Engineering | How was it built and why? | Architecture, ADRs, implementation, trade-offs, problems, corrections | None except secrets and unsafe material | 10–20 minutes | Milestones, architecture, ADRs, journals | Can I inspect the source? |
| 6 — Implementation | Can I inspect the complete source? | Source, configuration, commits, releases, history, evidence | Credentials, secret-bearing files, and unsafe disclosures | Unlimited | Repository | Select any deeper technical path |

Readers may enter at any layer. Each layer must provide enough orientation to
move upward for context or downward for depth.

## Progressive Disclosure

Documentation must be complete, but discovery must be progressive. Readers
must not be forced to consume all depth at once.

```text
Headline
  → Executive Summary
  → Engineering Summary
  → Validation
  → Evidence
  → Implementation
  → Historical Context
```

Technical density may increase as the reader moves deeper. The beginning of a
document must not be denser than its ending. Progressive disclosure does not
hide limitations or critical claims; it sequences detail after sufficient
context.

## Information Density Curve

### Beginning

- Concise and contextual
- Low cognitive load
- One dominant idea
- Clear navigation to the next question

### Middle

- Structured engineering summary
- Architecture and outcomes
- Validation boundaries
- Direct routes to evidence

### End

- Detailed implementation
- Evidence metadata
- Source references
- Historical context

Atlas currently contains documentation that often begins at the deepest layer.
DEA exists to correct that experience without removing the underlying detail.

## Document Responsibility Matrix

| Document or interface | Primary question | Sole responsibility |
| --- | --- | --- |
| Homepage | Who is Jannsen and why should I continue? | Editorial introduction |
| Atlas overview | What is Atlas and why is it different? | Context, differentiation, and evolution entry point |
| Canonical milestone | What changed during this stage? | Reviewed engineering chapter |
| Journal | What happened while the work was being performed? | Historical development record |
| Evidence | Can this claim be verified? | Proof |
| ADR | Why was this decision made? | Architectural rationale and trade-offs |
| Architecture document | What exists and how is it connected? | Current and historical topology |
| Repository | How was it implemented? | Source of truth |
| README | What is in this repository and where should I begin? | Repository entry point |
| Resume | Is this engineer professionally relevant to the role? | Concise employment and qualification summary |

No document should attempt to answer all reader questions. Cross-references
connect responsibilities; duplicated narratives blur them.

## Reading Modes

### 30 Seconds

**Audience:** Recruiter or first-time visitor.

The reader must understand Jannsen’s professional identity, what Atlas is, that
its claims are supported by validation, and where to view the resume or
continue.

### 3 Minutes

**Audience:** Hiring manager.

The reader must understand the flagship system, engineering progression,
professional credibility, validation model, boundaries, and current direction.

### 20 Minutes

**Audience:** Engineer or architect.

The reader must be able to inspect architecture, milestones, decisions,
problems, evidence, implementation boundaries, and source.

### Unlimited

**Audience:** Deep technical reviewer.

The reader may inspect journals, ADRs, source, Git history, configuration,
commits, releases, and evidence artifacts.

The same information must not be duplicated for each reading mode. Links and
progressive disclosure move readers deeper through canonical sources.

## Engineering Emotion Curve

The intended progression guides editorial decisions; it is not marketing copy.

| Stage | Reader response |
| --- | --- |
| Curiosity | “What is this?” |
| Interest | “This is different.” |
| Confidence | “This is real.” |
| Respect | “This engineer works systematically.” |
| Learning | “I understand why each decision was made.” |
| Exploration | “I want to inspect more.” |
| North-star outcome | “I feel like I’m learning with you.” |

## Question-Driven Sections

Every section must answer a known reader question rather than merely present a
category. A public heading does not need to use question syntax, but its
editorial purpose must be expressible as a question.

- “Architecture” should answer “What changed in the system?”
- “Validation” should answer “How do we know it worked?”
- “Evidence” should answer “Can I verify this?”

A section without a reader question has no justified position in the
experience.

## One Dominant Idea

Every page and document has one hero:

| Surface | Dominant idea |
| --- | --- |
| Homepage | The engineer |
| Atlas overview | The engineering project |
| Milestone | The engineering change |
| ADR | The decision |
| Evidence record | The proof |
| Journal | The work as it unfolded |
| Repository | The implementation |

Supporting content must not compete with the dominant idea.

## Golden Transition Rule

Every layer and document must create the next reader question:

```text
What is Atlas?
  → Why is it different?
  → How did it evolve?
  → Can it be proven?
  → How was it engineered?
  → Can I inspect the source?
```

A document should not end without a conclusion, a next question, and a clear
next destination.

## Milestone Discovery Model

The first screen or opening reading layer of a milestone communicates:

- milestone number;
- canonical title;
- one-sentence abstract;
- why the milestone existed;
- what changed;
- validated outcome; and
- transition.

Deeper layers expose architecture, implementation, engineering decisions,
validation, evidence, lessons, journal context, and source. This layering does
not remove or weaken the complete canonical milestone structure; it changes how
readers enter and navigate it.

## Milestones as Chapters

Milestones are the narrative spine of Atlas, not isolated project cards.

| Milestone | Chapter meaning |
| --- | --- |
| 01 | The first reproducible runtime |
| 02 | A second independent Splunk role |
| 03 | Validated Distributed Search |
| 04 | External Windows telemetry |
| 05 | Centralized configuration management on Rocky Linux |

Every chapter explains why the next chapter became necessary. Planned chapters
remain visibly planned until implementation and validation are complete.

## Humanity and Authenticity

Atlas should reflect a real engineer facing technical problems, making
decisions, applying corrections, validating outcomes, and learning over time.

Do not manufacture dramatic failures, artificial conflict, fake production
incidents, or fake complexity. If work proceeded smoothly, document the
engineering observations truthfully. If evidence is missing, disclose it.
Humanity comes from honesty, not storytelling theatre.

## Cognitive-Load Rules

- One primary question per section.
- One dominant idea per initial viewport or opening layer.
- Short abstracts before detailed prose.
- Use architecture and evidence where they communicate faster than paragraphs.
- Avoid repeated explanations.
- Avoid several equal-weight metadata groups competing simultaneously.
- Prefer recognition over recall.
- Bound prose line length.
- Use headings, summaries, and lists purposefully.
- Do not use visual noise as a substitute for structure.
- Do not reduce font size to fit more information.
- Do not hide critical claims behind interaction.

## Editorial Test

For every paragraph, ask: **If this paragraph is removed, does the reader lose
necessary understanding?**

If not, remove it, merge it, move it to a deeper layer, or replace it with a
clearer structure.

For every section, ask: **What question is the reader trying to answer here?**

If there is no clear answer, the section does not belong in that location.

## Curiosity Loop

| Destination | Reader question |
| --- | --- |
| Homepage | Who is this engineer? |
| Atlas | What is this project? |
| Milestones | How did it evolve? |
| Validation and evidence | Can I trust the claims? |
| Architecture and ADRs | Why was it designed this way? |
| Repository | Let me inspect it myself. |

The loop guides deeper investigation without withholding essential context.

## Current-State Gap Analysis

These gaps are migration inputs, not changes authorized by DEA-01.

| Priority | Current-state gap | DEA impact |
| --- | --- | --- |
| HIGH | Canonical milestone records are stored and linked as journals or “Build records” | Canonical chapters and historical diaries do not have distinct responsibilities |
| HIGH | Milestones 03 and 04 do not follow the canonical milestone structure established for 01 and 02 | The narrative spine changes shape midway through the chronology |
| HIGH | The public Atlas experience emphasizes dense system, validation, and record content before fully establishing context and differentiation | Readers can enter at an engineering layer without an adequate discovery path |
| HIGH | The complete 01–04 milestone chronology is not available as a layered public chapter experience | Readers cannot consistently follow the project from its foundation through the current state |
| MEDIUM | README, CASE_STUDY, Atlas content, milestone summaries, and journals repeat parts of the same implementation narrative | Document responsibilities are blurred and narratives can diverge |
| MEDIUM | Existing milestone and project records often begin with engineering detail rather than a low-density abstract and outcome | The density curve starts too deep for recruiter and hiring-manager modes |
| MEDIUM | Transitions between summary, milestone, evidence, architecture, and source are inconsistent or absent | The next reader question does not always have a clear destination |
| MEDIUM | Evidence is linked by directory or exhibit but lacks one consistent discovery layer connecting claims to the strongest available proof | Verification requires repository knowledge |
| MEDIUM | Current architecture documentation primarily describes the latest topology | Historical topology is distributed across milestone records rather than exposed through one discovery path |
| MEDIUM | The current milestone register names Milestone 05 “Managed Data Onboarding,” while the DEA sequence names “Rocky Linux Deployment Server & Configuration Management” | The planned chapter lacks one canonical title and scope across governance records |
| LOW | Terminology varies among “Build record,” “Production record,” “journal,” and “milestone” | Readers must infer document responsibility from context |
| LOW | Several public interface regions present multiple equal-weight metadata groups | Scanning competes with comprehension at introductory layers |

## Migration Map

Migration begins only after architectural review of DEA-01.

### DEA-02 — Milestone Reading Experience

**Goal:** Define the progressive milestone template and apply it consistently
to Milestones 01–04 without weakening canonical engineering depth.

### DEA-03 — Documentation Responsibility Refactor

**Goal:** Separate canonical milestones, journals, ADRs, evidence, architecture,
and summaries according to the responsibility matrix.

### DEA-04 — Atlas Discovery Experience

**Goal:** Align the public Atlas experience with the canonical reader-question
sequence and discovery layers.

### DEA-05 — Repository Entry Experience

**Goal:** Align the README and documentation navigation with reading modes,
canonical responsibilities, and repository inspection paths.

### DEA-06 — Compliance Audit

**Goal:** Verify that the implemented experience complies with
`ATLAS_PRINCIPLES.md`, DEA decisions, accessibility requirements, and factual
milestone boundaries.

## Success Criteria

DEA-01 succeeds when the proposed architecture enables the following outcomes:

### Recruiter Outcome

- Identifies who Jannsen is.
- Understands what Atlas proves.
- Knows where to view the resume or continue.

### Hiring Manager Outcome

- Understands how Atlas evolved.
- Understands how the work was validated.
- Understands why Jannsen’s process is trustworthy.

### Engineering Reviewer Outcome

- Can skip introductory material.
- Can reach servers, data pipeline, architecture, milestones, evidence, and
  source directly.
- Can inspect boundaries and supporting artifacts without losing chronology.

### Project-Level Outcomes

- The creator can read the documentation without feeling overwhelmed.
- A reader can follow the complete chronology without wondering where
  Milestones 01 or 02 went.
- A reader can verify claims without first learning repository organization.
- A reader leaves having followed a real engineer solving real problems and
  feels that they learned alongside him.

## Architectural Decision

DEA-01 defines discovery architecture only. It does not authorize migration,
file movement, milestone normalization, public-interface redesign, or content
deletion. Those changes require their own reviewed DEA phases.
