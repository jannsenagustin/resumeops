# EP-004 — Engineering Session Capture and Codex Closeout Handoff

> Parser-readiness note: Preserve this proposal's heading levels, field labels,
> identifier, and controlled status.

**Status:** Draft

**Origin:** IDEA-031

## Problem

Important engineering events occur across chat, terminals, virtual machines,
Splunk Web, screenshots, and human reasoning. Codex cannot reliably reconstruct
that context at closeout unless it is recorded. Chat history is incomplete and
must not become a canonical engineering record.

## Why it matters

Missing session context causes repeated prompting, higher token usage, incomplete
closeout documentation, and loss of errors, fixes, evidence decisions, and
reusable lessons. A lightweight capture mechanism could make closeout accurate
without weakening Atlas EOS governance.

## Proposed approach

Evaluate and introduce the workflow in two separately validated phases.

### Phase 1 — Manual Session Notes

Use the clearly non-canonical
[`docs/planning/SESSION_NOTES.md`](../planning/SESSION_NOTES.md) workspace to
record concise breadcrumbs for the single task authorized by the Active Batch.
The committed file provides only the warning and links to the reusable template
and checklist. Session content remains temporary and must be cleared or archived
after closeout.

The suggested record includes:

- session date and active task identifier;
- commands or changes executed;
- validation performed;
- errors, root causes, and fixes;
- screenshots captured and evidence excluded;
- candidate decisions and lessons;
- remaining work;
- closeout review state.

At closeout, Codex reads the notes, checks every item against repository and
available evidence, and drafts a synchronization plan. A human reviews that plan
before Codex changes canonical records. Validated outcomes are transferred into
the appropriate execution report, journal, evidence index, decision, lesson,
milestone, backlog, or project-state record. The raw session file is then deleted
or cleared after the human confirms the transfer.

### Phase 2 — Planning Console Session Workflow

A later interface could support:

```text
Select active task
→ Start Session
→ Record session notes
→ Finish Session
→ Generate Codex closeout handoff
→ Human reviews
→ Codex synchronizes canonical records
```

The public Planning Console remains read-only. Session capture requires either a
secure local companion or an intentionally designed authenticated backend under
a separately approved proposal and security model.

## Session-record lifecycle decision

The established Phase 1 lifecycle keeps the workspace document in the
repository while treating its session content as temporary:

1. Open `SESSION_NOTES.md` only for an approved Active Batch session.
2. Keep its non-canonical warning and bind the notes to the sole active task.
3. Record factual breadcrumbs during the session without inferring missing
   details.
4. Generate a proposed closeout synchronization plan.
5. Require human review before updating canonical records.
6. Transfer validated information into durable canonical records.
7. Archive the notes when their raw history is worth preserving, or clear them
   after the human confirms successful transfer.

The workspace file may be committed in its cleared, reusable state, but raw
session content is not automatically committed as historical truth and is not
renamed into an execution report. The execution report is authored from
validated outcomes because raw notes may contain mistakes, sensitive paths,
discarded hypotheses, or incomplete statements.

## Alternatives considered

### Commit every session note

This preserves a detailed chronology but creates permanent noise, may retain
sensitive or incorrect material, and competes with journals and execution
reports. It is not recommended.

### Convert the raw file directly into an execution report

This is simple but treats unreviewed breadcrumbs as authoritative and encourages
the wrong schema. It is not recommended; validated facts should be deliberately
transferred into the execution-report format.

### Archive raw notes after closeout

Archiving aids forensic review but retains duplicate, potentially sensitive
working material. It may be reconsidered only with an approved retention and
redaction policy.

### Replace or clear the temporary file after closeout

This keeps one predictable workspace and avoids stale notes influencing a later
session. Combined with canonical transfer and human confirmation, it is the
established Phase 1 approach.

## Benefits

- Preserves important session context at low ceremony.
- Improves evidence-backed closeout accuracy.
- Reduces repeated prompts and dependence on chat memory.
- Separates working notes from canonical project state.
- Creates a testable foundation for a later local session workflow.

## Risks

- Notes may contain secrets, personal data, or sensitive evidence references.
- Stale notes may contaminate a later session.
- Breadcrumbs may be mistaken for validated facts.
- Capture overhead may reduce adoption.
- An interactive UI could accidentally introduce unauthorized Git writes.

Mitigations are local exclusion, minimal fields, explicit non-canonical labels,
one-task binding, human review, evidence checks, and mandatory retirement after
closeout.

## Governance boundaries

The workflow explicitly prohibits:

- browser-side direct Git writes;
- automatic task completion;
- automatic evidence approval;
- autonomous commits or pushes;
- using chat history as the canonical record;
- creating fake session details;
- changing work outside the Active Batch;
- treating raw session notes as authoritative after closeout.

The repository remains authoritative. Human approval remains required for
canonical synchronization, task status changes, evidence acceptance, and Git
operations.

## Dependencies

- Atlas Planning Console.
- Active Batch workflow.
- A defined Codex handoff concept.
- At least one manually completed Atlas batch.
- Approval of the record format, lifecycle, sensitive-data rules, and closeout
  review procedure.

## Estimated effort

The documentation-only Phase 1 workspace is established. Testing during real
sessions and any automation remain backlog work. Phase 2 is unestimated and
requires separate architecture and security review.

## Recommendation

Use the established Phase 1 workspace with a human-reviewed synchronization
plan, deliberate transfer into canonical records, and confirmed archival or
clearing of raw notes. Test it during real approved batches before considering a
Planning Console workflow.

## Decision

The documentation-only session workspace was established by direct human
instruction. This proposal remains Draft for lifecycle evaluation and creates no
UI, authenticated integration, Active Batch change, or execution authority.

## Related backlog items

- [ATL-029 — Implement Engineering Session Capture and Codex Closeout Handoff](../planning/BACKLOG.md#atl-029--implement-engineering-session-capture-and-codex-closeout-handoff)

## Source documents

- [Atlas Idea Inbox](../planning/IDEAS.md#idea-031--engineering-session-capture-and-codex-closeout-handoff)
- [Atlas EOS operating model](../planning/README.md)
- [Active Batch](../planning/ACTIVE_BATCH.md)
