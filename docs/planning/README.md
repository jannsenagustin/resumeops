# Atlas Engineering Operating System

> Parser-readiness note: Keep headings, field labels, identifiers, statuses, and priorities stable so a future build-time parser can consume these documents.

Atlas EOS is the repository-backed planning and engineering-governance system for Project Atlas. Git is canonical: proposals, approved work, execution scope, decisions, lessons, and results must be recorded here rather than existing only in a conversation or website.

The future `/planning` console will be a read-only projection of these records. It will not edit state, store browser-only state, maintain a database, or become authoritative.

## Operating workflow

```text
Idea
  -> Engineering Proposal
  -> Human Review
  -> Approved Backlog Item
  -> Active Batch
  -> Codex Execution
  -> Human Validation
  -> Execution Report
  -> Done
```

The human owns vision, approval, prioritization, architecture, and final acceptance. ChatGPT may support architecture, planning, critique, prioritization, and review. Codex may implement approved batch scope, run validation, and draft execution reports. AI-assisted work is never autonomous and always requires human review.

## Canonical documents

- [BACKLOG.md](BACKLOG.md) is the permanent work inventory. Humans approve priorities and statuses; planning support may draft changes for review. It changes when work is proposed, approved, reprioritized, rejected, blocked, reviewed, or completed.
- [ACTIVE_BATCH.md](ACTIVE_BATCH.md) contains only the currently approved executable scope. A human populates or changes it before Codex begins execution. Only one active batch may exist.
- [DECISIONS.md](DECISIONS.md) records concise decisions, context, rationale, and consequences. A human confirms architectural and governance decisions before they are treated as accepted.
- [LESSONS_LEARNED.md](LESSONS_LEARNED.md) preserves reusable engineering knowledge. Humans and implementation tools may propose lessons after validation; a human confirms their wording and relevance.
- [Engineering Proposals](../engineering-proposals/README.md) evaluate ideas that need material design, trade-off, risk, dependency, or approval analysis before commitment.
- [Execution Reports](../execution-reports/README.md) are immutable historical accounts of attempted or completed approved batches. Codex drafts actual results after execution; a human validates the report and final status.

Proposals may produce decisions and approved backlog items. Approved backlog items become executable only when a human places them in the active batch. Every attempted batch receives an execution report, and reusable findings may become decisions, lessons, or follow-up backlog items.

## Identifier schema

| Record | Pattern | Example |
| --- | --- | --- |
| Backlog task | `ATL-NNN` | `ATL-001` |
| Engineering proposal | `EP-NNN` | `EP-001` |
| Decision | `DEC-NNN` | `DEC-001` |
| Lesson | `LESSON-NNN` | `LESSON-001` |
| Execution batch | `BATCH-NNN` | `BATCH-001` |

Identifiers are permanent. Never reuse or renumber an identifier, including after completion or rejection.

## Controlled vocabulary

### Task statuses

- `Proposed`: captured but not approved for the backlog.
- `Backlog`: accepted into the permanent inventory but not approved for execution.
- `Approved`: approved for a future batch but not active.
- `Active`: included in the current approved batch and being executed.
- `Blocked`: execution cannot proceed until a documented condition changes.
- `Review`: implementation awaits human validation.
- `Done`: human-validated acceptance criteria are complete.
- `Rejected`: intentionally declined; the record and identifier remain.

### Proposal states

- `Draft`: incomplete and not ready for review.
- `Under Review`: awaiting human evaluation.
- `Approved`: accepted for future implementation.
- `Deferred`: valid but intentionally postponed.
- `Rejected`: declined with rationale retained.
- `Implemented`: approved proposal scope has been delivered and validated.

### Priorities

- `P0`: security issue, release blocker, or critical operational failure.
- `P1`: current milestone requirement or major dependency.
- `P2`: high-value improvement.
- `P3`: useful future work.
- `Icebox`: interesting work that is not currently justified.

## Normal operation

1. Capture a small, understood item in the backlog as `Proposed`, or create a proposal when evaluation is required.
2. A human reviews the proposal or item and decides whether it enters the backlog.
3. A human prioritizes approved work and explicitly populates one active batch.
4. Codex executes only included tasks, validates within scope, and records actual results.
5. A human validates the outcome and accepts, rejects, or redirects it.
6. Create an execution report for the attempted batch, update task state, and record any durable decisions or lessons.

The planned `/planning` visualization must parse this stable Markdown at build time and link every displayed record to its canonical repository source. A display error or UI state must never change repository planning state.
