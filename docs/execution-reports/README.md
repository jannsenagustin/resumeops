# Atlas Execution Reports

> Parser-readiness note: Preserve report heading levels, field labels, batch identifiers, and final statuses for future build-time parsing.

Create one report for every completed or attempted active batch, including blocked or partially completed batches. Reports capture actual results rather than intended results and form the immutable historical record of execution. Correct material errors explicitly; do not casually rewrite accepted history.

Use the filename `BATCH-NNN.md`, matching the approved batch identifier. No batch report exists until a human approves and execution attempts that batch.

## Report template

```text
# BATCH-NNN — Execution Report

Batch ID:
Date:
Objective:

## Included Tasks
## Completed
## Blocked
## Rejected
## Files Changed
## Validation Performed
## Human Review Required
## Deviations
## Risks
## Follow-up Backlog Items
## Final Status
```

Codex may draft the report from observed execution and validation results. A human reviews the account, performs required acceptance checks, and confirms the final status. Completed and attempted reports are stored beside this index.
