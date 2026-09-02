# Atlas Engineering Proposals

> Parser-readiness note: Preserve proposal heading levels, field labels, identifiers, and controlled states for future build-time parsing.

An engineering proposal is required when an idea needs architectural evaluation, meaningful alternatives, risk analysis, new dependencies, or explicit boundary decisions before commitment. Small, well-understood work may enter the backlog directly as `Proposed`, but still requires human approval before execution.

## Lifecycle

`Draft` -> `Under Review` -> `Approved` -> `Implemented`

An approved proposal may instead become `Deferred` or `Rejected`. A human approves every state transition that commits or declines work. Approval may create related decisions and backlog items, but a proposal never makes those items executable; execution requires inclusion in [ACTIVE_BATCH.md](../planning/ACTIVE_BATCH.md).

## Required fields

Use the following stable template:

```text
# EP-NNN — Title

Status:
Origin:

## Problem
## Why it matters
## Proposed approach
## Alternatives considered
## Benefits
## Risks
## Dependencies
## Estimated effort
## Recommendation
## Decision
## Related backlog items
## Source documents
```

Proposal IDs are permanent and must not be reused or renumbered. Decisions should be recorded in [DECISIONS.md](../planning/DECISIONS.md), and committed work should use stable `ATL-NNN` entries in [BACKLOG.md](../planning/BACKLOG.md).

## Proposals

- [EP-001 — Atlas Planning Console](EP-001-atlas-planning-console.md)
- [EP-002 — Canonical Documentation Governance](EP-002-canonical-documentation-governance.md)
- [EP-003 — Atlas MCP Platform](EP-003-atlas-mcp-platform.md)
- [EP-004 — Engineering Session Capture and Codex Closeout Handoff](EP-004-engineering-session-capture-and-codex-closeout-handoff.md)
- [EP-005 — Standards-valid Search Head Management TLS](EP-005-search-head-management-tls.md)
