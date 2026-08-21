# EP-001 — Atlas Planning Console

> Parser-readiness note: Preserve this proposal's heading levels, field labels, identifier, and controlled status.

**Status:** Approved

**Origin:** Human-approved Atlas EOS Stage 1 planning session

## Problem

Planning knowledge is scattered across conversations and repository files, making it difficult to determine what should happen next.

## Why it matters

A canonical, inspectable planning view will reduce repeated context reconstruction, clarify approval boundaries, and make current and future work easier to review.

## Proposed approach

Create a read-only `/planning` page that renders canonical planning state from repository documents at build time and links each rendered item to its GitHub source.

Locked boundaries:

- the repository remains authoritative;
- no browser editing or hidden local planning state;
- no database or duplicate status store;
- no drag-and-drop or Jira, Trello, or Linear clone;
- no fake percentages;
- static GitHub Pages compatibility;
- build-time parsing;
- every rendered item links to its canonical source.

Suggested sections are Current Milestone, Active Batch, Backlog by Priority, Engineering Proposals, Recent Decisions, Recent Lessons, Blocked Work, and Canonical Source Documents.

Implementation sequence:

1. Prove the Markdown schema.
2. Use it manually.
3. Define typed parser output.
4. Build the read-only `/planning` route.
5. Add navigation.
6. Validate source-link integrity.

## Alternatives considered

- Browser-side editing was rejected because it would introduce a second source of truth.
- A dedicated project-management database was rejected as unnecessary complexity.
- A static hand-maintained page was rejected because it could drift from canonical records.

## Benefits

- Fast project orientation.
- Fewer repeated context explanations.
- Lower AI token usage.
- Easier batch planning.
- Clearer human approval boundaries.

## Risks

- Schema and UI drift.
- Duplicate manual data.
- Unnecessary project-management complexity.
- Pressure to add editing features.

Mitigations are build-time generation, one canonical schema, source links, and an explicit read-only policy.

## Dependencies

- A stable Stage 1 Markdown schema used successfully in normal planning.
- A typed build-time parser designed in a later approved stage.
- Static-export-compatible source linking.

## Estimated effort

Medium. Estimation must be revisited when an implementation batch is proposed.

## Recommendation

Use the repository-backed schema manually before authorizing parser or UI work.

## Decision

Approved for future implementation. Approval does not activate ATL-014 or authorize Stage 2 work.

## Related backlog items

- [ATL-014 — Atlas Planning Console](../planning/BACKLOG.md#atl-014--atlas-planning-console)

## Source documents

- [Atlas EOS operating model](../planning/README.md)
- [Atlas backlog](../planning/BACKLOG.md)
- [Atlas decisions](../planning/DECISIONS.md)
