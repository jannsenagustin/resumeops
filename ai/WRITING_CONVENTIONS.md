# Atlas Writing Conventions

Use these conventions for engineering records, investigations, execution
reports, and troubleshooting notes. A document does not need every section when
one does not apply. Do not add empty headings to satisfy a template.

## Preferred Structure

### Problem

State the observed issue, requested capability, affected boundary, and why it
matters. Separate a symptom from an assumed cause.

### Investigation

Record the relevant inspections in a useful order. Include commands, files,
runtime observations, and rejected hypotheses when they help another engineer
understand the path.

### Root Cause

State the cause only when evidence supports it. If the cause remains unknown,
say so and record what has been ruled out.

### Resolution

Describe what changed and why that change addresses the cause or requirement.
Mention important trade-offs and boundaries without narrating every keystroke.

### Validation

State what was checked, the actual result, and the claim that result supports.
Also record skipped, failed, partial, or human-only checks.

### Lessons

Capture reusable knowledge, not a summary of the task. Add a confirmed lesson
to [Lessons Learned](../docs/planning/LESSONS_LEARNED.md) through the Atlas EOS
workflow rather than creating a competing record.

## Style

- Use active voice: "The Indexer accepted the connection."
- Keep paragraphs short and focused.
- Use headings that describe content, not generic decoration.
- Prefer concise wording and concrete nouns and verbs.
- Write in an engineering tone: calm, specific, and evidence-aware.
- Define an uncommon abbreviation on first use.
- Use exact repository names, identifiers, paths, and status vocabulary.
- Put commands and literal values in code formatting.
- Link the canonical owner instead of copying changing facts.
- State uncertainty and limitations where a reader will encounter the claim.

## Claims and Tense

Use present tense for current verified state, past tense for observed historical
events, and future or conditional language for plans. Words such as
"implemented," "operational," and "validated" are not interchangeable.

Do not call a task complete because a file changed. Completion requires the
validation and human acceptance defined by the active scope.

## Existing Templates and Owners

Repository-specific templates and schemas take precedence when they are more
specific. Use the [session template](../docs/planning/SESSION_TEMPLATE.md) for
handoffs, the [execution report template](../docs/execution-reports/README.md)
for batches, and the ADR rules in [AGENTS.md](../AGENTS.md) for architecture
decisions. Follow the canonical ownership rules in the
[Documentation Rules](../docs/documentation/DOCUMENTATION_RULES.md).
