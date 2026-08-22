# EP-002 — Canonical Documentation Governance

**Status:** Approved
**Origin:** Canonical Documentation Refactor

## Problem

Multiple narrative documents independently maintained current Atlas status and architecture, allowing them to diverge from milestones and approved M05 planning.

## Current drift and root cause

README, Engineering Overview, architecture, roadmap, and infrastructure prose repeated milestone and Deployment Server state. Ownership was implied rather than explicit, so consumer updates depended on manual synchronization.

## Canonical ownership model

Each information type has one canonical owner. Narrative and interface views consume concise summaries and links. Historical records preserve what was true at their time without acting as current state. The [ownership matrix](../documentation/OWNERSHIP_MATRIX.md) defines boundaries.

## Refactor approach

Create documentation governance, reduce narrative copies, retain architecture as the topology owner, retain milestones as the status owner, keep roadmap forward-looking, and record the decision and reusable lesson in Atlas EOS.

## Deletion, merge, and archive criteria

- Delete content with no unique value or traceability requirement.
- Merge unique durable content into its canonical owner before deleting a duplicate.
- Archive only genuine historical state and label its successor.
- Retain operational, evidence, governance, and historical records when their role is distinct.

## Risks

Over-reduction could remove operational context; under-reduction could preserve drift. Renames or deletion could break links. A matrix can itself become stale unless audits validate it.

## Migration plan

Inventory and classify documents; establish ownership; refactor major consumers; update indexes and Atlas EOS records; scan terminology and links; run repository validation; obtain human review.

## Validation plan

Audit relative links and case, duplicate IDs, Atlas identity, Deployment Server topology, Markdown metrics, diff whitespace, lint, TypeScript, and production build.

## Relationship to Atlas EOS

Atlas EOS remains canonical for ideas, proposals, priorities, executable batches, decisions, lessons, and results. Documentation governance defines how narrative and interface consumers use those records; it does not bypass human approval or activate work.

## Future automation

A future integrity audit may check links, IDs, forbidden stale phrases, and ownership rules. An optional documentation-health view may display results. Both remain backlog work until separately approved and activated.

## Decision

Approved for this documentation refactor. Approval does not activate future automation.

## Related backlog items

ATL-021, ATL-022, ATL-023.

## Source documents

`docs/documentation/`, `docs/milestones.md`, `docs/planning/`, `README.md`, `CASE_STUDY.md`, `docs/architecture.md`, and `ROADMAP.md`.
