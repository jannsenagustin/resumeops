# Atlas Engineering Philosophy

Atlas exists to make engineering work understandable and reviewable. A working
system matters, but so do the reasoning, boundaries, evidence, and lessons that
allow someone else to trust and maintain it.

## Evidence Over Assumptions

Use repository state, runtime output, logs, configuration, and reviewed evidence
to establish what is true. Label an inference as an inference. Narrow a claim
when its strongest evidence is limited.

## Observe Before Modifying

Inspect the current state and expected ownership before changing anything.
Understand the active symptom, relevant configuration, dependencies, and
security boundary. An unexplained change can hide the cause and create a second
problem.

## One Logical Change at a Time

Keep each change small enough to reason about, validate, review, and reverse.
Avoid mixing cleanup, redesign, documentation migration, and behavior changes
unless the approved task requires them together.

## Validation Before Completion

Configuration shows intent. A successful command shows only that command's
result. Validate the behavior the task claims to create, including important
relationships between components. Work remains incomplete until its acceptance
criteria and relevant regression checks pass or the remaining gap is recorded.

## Documentation Reflects Reality

Update the canonical owner of a fact and keep summaries subordinate to it.
Separate planned, implemented, observed, validated, blocked, and rejected
states. Documentation is part of the change, not a story written afterward to
make the result look complete.

## Canonical Projection Principle

Project Atlas follows a documentation-driven architecture. Canonical
engineering information lives in version-controlled repository documents.
Applications—including the Planning Console, Engineering Record, website,
dashboards, automation, and future MCP services—derive their state from those
sources instead of maintaining separate manual inventories.

The ownership is concrete:

- `BACKLOG.md` owns task state.
- `ACTIVE_BATCH.md` owns executable batch scope.
- `milestones.md` owns milestone and validation state.
- `SESSION_NOTES.md` temporarily owns the current session record; after
  synchronization it cannot override the canonical records.
- `docs/evidence/README.md` owns published evidence metadata.
- `LESSONS_LEARNED.md` owns reusable lessons.
- `DECISIONS.md` owns durable engineering decisions.
- Architecture documentation owns the current approved architecture.

Interfaces consume these owners through parsers and typed models. A generated
registry is acceptable when it is reproducible from Git and an audit detects
drift. A UI rewrite must never destroy engineering truth.

Canonical projection should be checked end to end:

```text
Canonical source → Parser → Typed model → UI or generated output
```

The evidence pipeline is the reference example: filesystem → evidence index →
model → UI. A mismatch should fail validation.

Future Atlas MCP tools follow the same boundary. They consume canonical parsers
and typed models; they do not scrape rendered HTML, query React components,
depend on CSS or page layout, or maintain separate planning and engineering
inventories. Milestones come from the milestone parser, active scope from the
Active Batch parser, evidence from the evidence-index parser, and lessons and
decisions from their canonical records.

Duplicate state is technical debt. The repository owns the truth. Software
projects it.

## Attention Budget

Every screen has a limited attention budget.

If two components compete equally for attention, one should be simplified,
collapsed, or removed. Atlas should guide the reader through engineering, not
ask them to read everything simultaneously.

Progressive disclosure is preferred over long pages. Less is More.

## Engineering Narrative

Every page should answer one primary question, and every section should advance
that answer. Page structure should guide the reader through the engineering
story while progressive disclosure keeps supporting depth available without
asking the reader to absorb everything at once.

Move, collapse, simplify, or remove components that do not support the page's
purpose. Build hierarchy from meaning—current work, decisions, validation, and
consequences—rather than decoration.

## Small Incremental Improvements

Build the next proven capability from the current validated state. Prefer
manual understanding before automation and local correction before broad
redesign. Each increment should leave the system and its record clearer.

## Simplicity Over Cleverness

Use the least complex design that meets the real requirement and preserves a
reasonable path forward. Add abstraction only when it removes demonstrated
duplication, clarifies ownership, or protects a meaningful boundary.

## Production-Quality Practice

Atlas is workstation-scale and is not represented as a production or
high-availability environment. The work should still use production-quality
habits: least privilege, controlled changes, secret hygiene, explicit failure
handling, repeatable validation, maintainable configuration, and clear
operations documentation.

## Human Review Completes the Work

AI can accelerate investigation and implementation, but it cannot grant
approval or acceptance. The engineer owns architecture, scope, risk, and the
final judgment that the evidence is sufficient.

For the broader project principles, read the
[Project Atlas Engineering Manifesto](../ATLAS_PRINCIPLES.md). For executable
workflow and status, use [Atlas EOS](../docs/planning/README.md).
