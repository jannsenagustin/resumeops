# AI Boot Sequence

Every AI contributor should initialize in this order before changing Atlas.
The sequence moves from stable authority to current execution context so old
conversations and plausible guesses do not become project state.

```text
GLOBAL_INSTRUCTIONS.md
        ↓
DECISION_MAKING_FRAMEWORK.md
        ↓
AI_ONBOARDING.md
        ↓
ABOUT_ME.md
        ↓
Planning documentation
        ↓
Current batch
        ↓
Current task
        ↓
SESSION_NOTES.md, if present
        ↓
Engineering work
```

## 1. Read Global Instructions

Read [GLOBAL_INSTRUCTIONS.md](GLOBAL_INSTRUCTIONS.md) first. It establishes the
mission, authority boundaries, safety rules, canonical sources, and behaviors
that govern every later step.

## 2. Read the Decision-Making Framework

Read [DECISION_MAKING_FRAMEWORK.md](DECISION_MAKING_FRAMEWORK.md) before
evaluating a request or proposing an implementation. It defines how Atlas moves
from a request and current-state evidence to a recommendation, validation, and
documentation. Reading it here prevents solution-first reasoning later.

## 3. Read AI Onboarding

Read [AI_ONBOARDING.md](AI_ONBOARDING.md) to understand what Atlas is, how its
records fit together, and how work moves from an idea to a validated result.
This prevents local files from being interpreted without project context.

## 4. Read About the Engineer

Read [ABOUT_ME.md](ABOUT_ME.md) to adapt collaboration, explanations, and
recommendations to the engineer's background and goals. This context shapes how
to communicate; it does not override scope or evidence.

## 5. Read Planning Documentation

Open the [Atlas Engineering Operating System](../docs/planning/README.md), then
inspect the backlog, decisions, lessons, proposals, and other records relevant
to the request. Planning is read before implementation because conversations
and summaries can be stale.

## 6. Determine the Current Batch

Read [ACTIVE_BATCH.md](../docs/planning/ACTIVE_BATCH.md). It identifies the one
approved unit of executable work, included tasks, exclusions, dependencies, and
human validation requirements.

If the human requested a scoped task outside the active engineering batch, such
as reviewing or creating governance documentation, treat the direct request as
authority for that scope only. Do not alter the batch to make the request fit.

## 7. Determine the Current Task

Find each included `ATL-NNN` record in
[BACKLOG.md](../docs/planning/BACKLOG.md). Read its goal, acceptance criteria,
dependencies, status, and references. The batch authorizes execution; the task
defines the bounded work.

## 8. Read Session Notes When Present

Read [SESSION_NOTES.md](../docs/planning/SESSION_NOTES.md) when it contains a
current handoff. Notes can preserve recent commands, observations, and pending
checks that have not yet reached canonical records.

Treat session notes as the temporary authoritative record of the session they
capture. Review them before synchronization and verify their claims against
Planning, [milestone state](../docs/milestones.md), evidence, and repository
state. They cannot change scope, approve evidence, or permanently override Atlas
EOS. Once synchronization is complete, durable canonical documents resume
ownership of ongoing state. Follow the lifecycle in
[Atlas Operations](../docs/planning/ATLAS_OPERATIONS.md).

## 9. Inspect the Affected System

Read path-specific instructions, architecture, operations guidance, existing
implementation, evidence rules, and recent relevant history. Confirm actual
state and note any conflict with planning before editing.

## 10. Begin Engineering Work

Restate the bounded objective, identify the validation approach, and make one
logical change at a time. Capture actual results and stop when scope, evidence,
security, or human authority requires a decision.

## Why This Order Exists

Governance comes first so behavior is consistent. The decision framework then
establishes how to reason before project orientation gives individual records
meaning. Human context improves collaboration.
Canonical planning and milestone records then establish current authority and
state. Temporary notes add continuity only after those boundaries are known.
Technical inspection comes last, immediately before work, so action is based on
both the authorized plan and the system that actually exists.
