# AI Onboarding for Project Atlas

This is the first-day guide for an AI joining Atlas. Read
[Global AI Instructions](GLOBAL_INSTRUCTIONS.md) before using it.

## What Is Atlas?

Project Atlas is an evidence-backed Engineering Console and a workstation-scale
systems lab centered on Splunk and observability. It documents how a real
environment evolves: architecture, configuration, runtime behavior,
troubleshooting, decisions, validation, and lessons.

Atlas originated as ResumeOps, so the repository and published path still use
that name in places. Treat this as historical continuity, not a second project.

Atlas is not a production or high-availability environment, a generic portfolio
template, a chatbot, or a place to demonstrate work that has not happened.

## What Is the Repository Trying to Become?

The repository is becoming a durable engineering publication whose claims can
be traced to implementation and evidence. A reader should be able to follow the
system chronologically, understand why each material choice was made, and see
the boundary of what was actually validated.

Longer-term direction includes a read-only Atlas MCP Platform and Configuration
Intelligence. Those are governed future capabilities, not current facts. Read
the [Roadmap](../ROADMAP.md) for direction and
[Milestones](../docs/milestones.md) for verified status.

## How Should AI Work Here?

Start from repository state. Confirm scope, inspect before editing, make small
coherent changes, explain why, and validate the behavior being claimed. Teach
and recommend without replacing human judgment. Preserve maintainability,
chronology, security, and documentation ownership.

Use the [AI Boot Sequence](AI_BOOT_SEQUENCE.md) at the start of a session and
the [AI Personality](AI_PERSONALITY.md) during collaboration.

Atlas follows the
[Canonical Projection Principle](ENGINEERING_PHILOSOPHY.md#canonical-projection-principle):
the repository owns engineering truth and software projects it. Before adding a
fact to an application or future MCP service, find its canonical owner and use
the existing parser and typed model where available. Do not create a parallel
inventory for convenience.

## Where Is the Planning Source of Truth?

The canonical planning system is
[docs/planning](../docs/planning/README.md), called the Atlas Engineering
Operating System or Atlas EOS. Git-backed Markdown is authoritative. A website,
chat, issue, or future MCP interface may display or discuss planning state but
does not own it.

Planning follows this path:

```text
Idea → Human Review → Proposal → Approved Backlog
     → Active Batch → Execution → Human Validation
     → Execution Report → Done
```

Ideas capture possibilities. Proposals analyze material choices. The backlog
holds accepted work. Only the active batch authorizes execution. Human
validation determines acceptance.

## How Are Engineering Changes Documented?

Update the canonical owner for each changed fact. The
[documentation map](../docs/documentation/README.md) shows where records live,
and the [ownership matrix](../docs/documentation/OWNERSHIP_MATRIX.md) identifies
their responsibilities.

Milestone records own validated stage history. Execution reports record actual
batch outcomes. Infrastructure guides explain operation. Engineering journals
preserve historical working context. Narrative pages summarize and link; they
do not redefine canonical state.

Use [Writing Conventions](WRITING_CONVENTIONS.md). For a typical investigation,
organize the record around Problem, Investigation, Root Cause, Resolution,
Validation, and Lessons when those sections are relevant.

## Where Are Evidence Artifacts Stored?

Publishable evidence lives under `docs/evidence` in milestone-specific
directories. The [evidence index](../docs/evidence/README.md) owns naming,
inventory, sensitivity review, and the claim associated with each artifact.

Evidence must support a specific claim. Review every artifact for credentials,
tokens, secrets, machine identifiers, network identifiers, and other sensitive
content before tracking or publishing it. A screenshot is not automatically
safe or sufficient.

## How Are Decisions Recorded?

Use [Atlas Decisions](../docs/planning/DECISIONS.md) for concise project,
workflow, and governance decisions. Use an Architecture Decision Record in
`docs/adr` for a consequential architectural choice and its trade-offs. Do not
silently rewrite an accepted decision; create a later record when a major
choice supersedes it.

AI may draft a decision. The human confirms it before it becomes accepted.

## How Are Lessons Recorded?

Reusable, evidence-grounded findings belong in
[Lessons Learned](../docs/planning/LESSONS_LEARNED.md). A lesson should change
future engineering behavior. Do not promote a guess, a task recap, or an
unverified workaround as a confirmed lesson.

AI may propose wording after validation. The human confirms the lesson.

## How Should Commits Be Structured?

Commit only when the human explicitly asks. Keep commits focused on one logical
change and review the diff and validation first. Use a clear conventional
message such as:

- `docs: add Atlas AI governance framework`
- `fix: correct Deployment Server validation record`
- `refactor: centralize Atlas project state`

Avoid vague messages such as `update`, `changes`, or `fix stuff`. Do not mix
unrelated cleanup with approved work, and never include secrets or unreviewed
evidence.

## How Does the Planning Workflow Operate?

At session start, read Atlas EOS, identify the active milestone, open the active
batch, and then read each included task. During work, capture factual handoff
details in `SESSION_NOTES.md` when needed. After an attempted batch, draft its
execution report from actual results, update affected canonical records, and
identify decisions, lessons, deviations, or follow-up tasks. The human reviews
the evidence and decides whether work advances to `Done`.

Never use session notes, a generated summary, or a planning interface to bypass
this workflow.

## What Should AI Never Do?

- Never guess what is active or treat planned work as implemented.
- Never invent evidence, validation, failures, dates, metrics, or sources.
- Never expose secrets or publish unreviewed sensitive artifacts.
- Never broaden scope or change architecture without human approval.
- Never approve its own output, accept a decision, or mark work done for the
  human.
- Never create a second source of truth for an already-owned fact.
- Never erase history to make the project look cleaner.
- Never commit, push, deploy, publish, or delete without explicit authority.

## Onboarding Checklist

- [ ] Read `GLOBAL_INSTRUCTIONS.md`.
- [ ] Read `ABOUT_ME.md` and the behavior and writing guides in `/ai`.
- [ ] Read Atlas EOS and identify the active milestone, batch, and task.
- [ ] Read relevant decisions, lessons, session notes, and technical documents.
- [ ] Confirm the exact scope, exclusions, and validation approach.
- [ ] Inspect current repository or runtime state before changing it.
- [ ] Keep claims evidence-backed and leave final acceptance to the human.
