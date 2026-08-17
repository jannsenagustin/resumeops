# Atlas Engineering Console Vision

## Purpose

This vision defines the approved identity for the Atlas Engineering Console.
It gives future UI work a stable direction while leaving implementation,
component design, routes, and styling to separately approved phases.

**This visual reference is inspirational, not pixel-perfect.** Implementation
should preserve the engineering philosophy rather than duplicate pixels.

## Identity

Atlas is evidence-first, engineering-first, operational, restrained,
deliberate, and documentation-driven. Beauty comes from structure, hierarchy,
and legibility—not decoration.

Atlas is not a portfolio, landing page, SaaS dashboard, or conventional
documentation site. It is not marketing, promotional, flashy, futuristic,
cyberpunk, gradient-heavy, glassmorphic, or animated for decoration.

## Atlas Is an Engineering Console

Opening Atlas should feel like opening the operational console of a real
engineering system. Everything visible should communicate engineering state or
improve engineering understanding. The interface should orient the reader,
expose the current state, and provide direct paths to the records that prove it.

## Engineering Before Marketing

The console describes systems, architecture, changes, validation, and
constraints. It does not sell an identity through slogans, inflated claims, or
promotional framing. The engineering work is the subject.

## Evidence Before Claims

Claims should be adjacent to or directly connected with their evidence. A
status treatment cannot make work appear more complete than the canonical
record establishes. When evidence is absent, the interface must not substitute
confidence, polish, or invented metrics.

## Current System State

The opening experience should answer: What exists now? What has been validated?
What is planned? What remains future work? Current System State is an
operational summary, not a promotional hero section.

The canonical state continues to come from the
[milestone register](../../milestones.md), its engineering records, and linked
evidence.

## Operational Language

Prefer direct, system-oriented labels:

- Current System State
- Engineering Records
- Evidence
- Validation
- Architecture
- Repository
- Milestones
- Systems
- Engineer

Avoid marketing terminology, aspirational superlatives, calls to conversion,
and language that treats engineering records as promotional content.

## Documentation-First Navigation

Navigation should lead from orientation to inspection: current state,
milestones, engineering records, evidence, architecture, and repository. It
should help readers move through the record without duplicating canonical
content or hiding chronological boundaries.

## State-Driven Interface

Visible state must be factual and semantically consistent:

- validated state uses green;
- planned state uses amber;
- future state uses gray; and
- danger or failure state uses red.

Color reinforces a written label and never carries meaning alone. No additional
branding colors should compete with these operational semantics.

## Reader Experience

The console should let a new reader establish orientation quickly, then move
deeper without losing context. Summaries guide; engineering records explain;
evidence proves. Dense information is acceptable when structured, but equal
visual weight should not be given to information of unequal importance.

## Engineering Notebook Inspiration

The design draws from engineering notebooks, operational consoles,
infrastructure dashboards, mission-control interfaces, technical runbooks, and
documentation systems. It borrows their discipline: explicit state, measured
typography, structured grids, durable labels, annotations, and inspectable
records. It does not imitate a specific product.

## Relationship with DEA

The [Documentation Experience Architecture](../../dea/README.md) governs how
readers discover, understand, verify, and inspect Atlas. The console is a visual
expression of that architecture. It must preserve DEA vocabulary, canonical
document ownership, progressive disclosure, and the boundary between summaries
and engineering records.

## Relationship with Evidence

Evidence is a first-class navigation and interface concern, not a decorative
gallery. Screenshots and other artifacts support defined claims and remain
connected to the record that explains what was tested, observed, and validated.
The [evidence map](../../evidence/README.md) remains canonical.

## Relationship with Engineering Records

Engineering Records contain the durable technical narrative: architecture,
implementation, decisions, validation, evidence, lessons, and transition. The
console should make these records easier to locate and inspect without reducing
them to cards, metrics, or fragments detached from context.

## Long-Term Design Direction

Atlas should become more useful and more stable as the engineering record
grows. Future phases may introduce console foundations, status summaries,
pipeline views, milestone and evidence consoles, resume and repository
experiences, and an engineering activity log. Each addition must have an
operational purpose, reflect canonical source data, and receive approval before
implementation.

The shared visual anchor is the
[Atlas Engineering Console visual reference](images/atlas-engineering-console-visual-reference-v1.png).
