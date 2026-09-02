# Milestone 06 Vision — Atlas MCP Platform

**Document Status:** Approved direction; architecture approved through EP-003

## Purpose

Milestone 06 is intended to give approved AI assistants a controlled way to
inspect live engineering evidence from the Atlas Splunk environment. The
platform should let an assistant ground an explanation in current system data
without receiving authority to change the system.

The [milestone register](milestones.md) owns Milestone 06 status and validation
state. [EP-003](engineering-proposals/EP-003-atlas-mcp-platform.md) owns the
approved architecture, scope, risks, and success criteria. This document
describes the intended experience and engineering direction. The completed
design review is recorded in EP-003; accepted planning scope is recorded in the
backlog, and none of these documents authorizes implementation.

The human approved this document as Milestone 06 direction and approved the
selected architecture through EP-003 on 2026-09-01. The human accepted ATL-034
through ATL-041 as Backlog on 2026-09-01. Execution authority remains a
separate human action through the Active Batch.

Atlas MCP exists because general-purpose AI assistants should not require unrestricted access to engineering systems. The platform narrows a large operational surface into a small, documented, reviewable interface whose behavior can be validated independently of any individual AI model. The MCP layer therefore serves as a durable engineering boundary rather than a convenience wrapper around Splunk.

## Vision

Atlas MCP becomes the governed evidence boundary between AI assistants and the
Atlas engineering lab. An assistant should be able to ask a narrow operational
question, receive current evidence through a documented Model Context Protocol
interface, and explain what that evidence supports and what it does not prove.

The platform exists to improve inspection and reasoning. It does not replace
Splunk administration, engineering judgment, evidence review, or human
approval. Git remains canonical for repository-owned facts, Splunk remains the
source for live Splunk state, and the human remains responsible for conclusions
and actions.

## Intended Experience

An approved assistant should be able to answer questions such as:

- Is the Atlas Splunk environment healthy according to an approved health
  check?
- Which approved indexes and forwarders are visible to the service?
- What does a bounded, approved search show for a defined time range?
- Which live evidence supports an explanation of the observed behavior?
- What evidence is unavailable, incomplete, or outside the service boundary?

Each response should identify its source, query or operation, relevant bounds,
and limitations. A successful tool call is not automatically proof of a broader
system claim. The assistant must distinguish returned evidence from its own
interpretation.

## Version 1 Boundary

Version 1 is a planned Python MCP service using the Splunk Enterprise SDK for
Python behind an approved, read-only adapter. Its first and only initial tool is
`get_server_info`. Additional metadata, bounded search, Deployment Server, and
configuration-discovery capabilities require later explicit approval.

The exposed surface should be smaller than the underlying Splunk API. Tools,
endpoints, search forms, indexes, time ranges, result sizes, and output fields
should be explicitly allowed and bounded. Requests outside that contract should
fail closed.

The MCP service must not infer, synthesize, or fabricate repository or operational state when evidence cannot be retrieved.

Unavailable evidence must remain unavailable.

Version 1 must not:

- change Splunk configuration;
- deploy applications or configuration bundles;
- start, stop, restart, or otherwise control services;
- expose unrestricted SPL or arbitrary Splunk API access;
- return credentials, tokens, secrets, or unreviewed sensitive data;
- update repository planning, milestone, evidence, or decision records;
- act autonomously on evidence or approve an engineering conclusion; or
- implement Configuration Intelligence or additional providers.

Any future write capability would require a separate proposal, threat analysis,
security boundary, validation plan, and explicit human approval. It is not an
extension implied by completing Milestone 06.

## Operating Model

```text
Human question
    ↓
Approved AI assistant
    ↓
Documented MCP tool contract
    ↓
Atlas MCP read-only policy boundary
    ↓
Purpose-built read-only Splunk identity with zero mutation authority
    ↓
Bounded, sanitized, attributable evidence
    ↓
Human-reviewed interpretation or decision
```

The service should make the boundary visible. It should report rejected
requests clearly, preserve enough attribution for review, and avoid converting
missing access or missing evidence into a confident answer.

## Trust and Security Principles

### Least privilege

The Splunk identity should have only the capabilities, endpoints, indexes, and
data access needed by the approved tool contracts. Read-only behavior must be
enforced by credentials and service design, not by prompt instructions alone.

### Allowlist before abstraction

The MCP interface should expose purpose-built operations rather than a generic
pass-through to Splunk. Each tool should define accepted inputs, safe defaults,
hard limits, output fields, error behavior, and audit expectations.

### Bounded execution

Searches should have approved time ranges, result limits, timeouts, concurrency
or rate controls, and permitted search patterns. Platform protection is part of
the read-only boundary because an unbounded read can still disrupt a system.

### Sensitive-output control

Credentials and secrets must remain outside Git and MCP responses. Returned
configuration, metadata, and events should be minimized and sanitized according
to an approved data policy before an assistant receives them.

### Attribution and audit

An operator should be able to determine which tool ran, which bounded operation
it invoked, when it ran, whether it succeeded or was rejected, and what source
produced the returned evidence. Audit records should avoid reproducing secrets
or unnecessary sensitive payloads.

### Human authority

MCP output is evidence input, not permission to act. AI-assisted explanations,
planning recommendations, and documentation changes continue to require the
same Atlas governance and human review used elsewhere in the repository.

## Canonical Information Boundaries

Atlas MCP must preserve the
[Canonical Projection Principle](../ai/ENGINEERING_PHILOSOPHY.md#canonical-projection-principle).
Live Splunk state should come from approved Splunk interfaces. Repository-owned
facts should come from their canonical documents through reproducible parsers
or typed projections, not by scraping the website or maintaining a second
inventory in the MCP service.

If Milestone 06 later includes repository-backed tools, their contracts should
identify the canonical source and preserve the ownership rules in the
[documentation ownership matrix](documentation/OWNERSHIP_MATRIX.md). The
website, MCP service, and AI assistant must remain consumers rather than new
authorities over milestone, planning, evidence, decision, or lesson state.

## Validation Standard

Milestone 06 should be treated as complete only when evidence demonstrates the
approved read-only integration boundary. Validation should cover both permitted
behavior and prohibited behavior.

Positive validation should demonstrate that approved tools can:

- complete an MCP handshake through the selected transport;
- authenticate through the approved secret-management path;
- retrieve current, attributable Splunk evidence within their contracts;
- apply search and output bounds; and
- return useful errors when evidence is unavailable.

Negative validation should demonstrate that the service rejects:

- write operations and deployment actions;
- unapproved endpoints, indexes, search forms, and parameters;
- requests beyond time, result, timeout, or concurrency limits;
- attempts to retrieve or echo credentials and secrets; and
- inputs that try to bypass the tool contract.

Operational validation should also cover audit records, credential rotation,
TLS or local transport controls as applicable, restart behavior, and the effect
of bounded requests on the Atlas Splunk environment. Validation claims must be
no broader than the captured evidence.

## Relationship to Milestone 05

Milestone 05 established and validated the centrally managed Splunk data path
that Milestone 06 is intended to inspect. Milestone 06 should consume that
validated environment without changing its ingestion or Deployment Server
workflow. The Milestone 05 record remains historically accurate: rollback was
available but unexercised, and Milestone 06 must not imply otherwise.

## Relationship to Milestone 07

Configuration Intelligence is planned as Milestone 07 and remains outside this
vision's implementation scope. Milestone 06 should establish a documented
interface that a later approved application can consume without integrating
directly with Splunk. It should not pre-build that application or assume its
requirements before separate review.

## Decisions Resolved by EP-003 Design Review

EP-003 selects containerized stdio in a dedicated single-purpose container, VS
Code + Codex as the primary client, the Splunk Enterprise SDK for Python behind
an Atlas adapter, a dedicated read-only Splunk identity and revocable token,
runtime Docker secret injection from local host storage, explicit Search Head
certificate trust, `get_server_info` as the sole first tool, local structured
audit logs, and deferred Deployment Server inspection and bounded search.

EP-003 and the bounded ATL-034 through ATL-041 backlog decomposition are
approved. Explicit Active Batch activation remains required before
implementation.

## Completion Vision

Milestone 06 succeeds when an approved assistant can inspect a small,
documented set of live Atlas Splunk evidence through a purpose-built read-only MCP
service; every response remains bounded, attributable, and sanitized; prohibited
operations fail closed; and captured evidence supports the read-only claim.

Completion does not mean Atlas can administer itself. It means Atlas has a
validated evidence interface that improves AI-assisted inspection while keeping
engineering action and acceptance under human control.

## Governing References

- [Project Atlas milestones](milestones.md)
- [EP-003 — Atlas MCP Platform](engineering-proposals/EP-003-atlas-mcp-platform.md)
- [IDEA-030 — Atlas MCP Server](planning/IDEAS.md#idea-030--atlas-mcp-server)
- [Project Atlas roadmap](../ROADMAP.md)
- [Global AI Instructions](../ai/GLOBAL_INSTRUCTIONS.md)
- [Canonical Documentation Ownership Matrix](documentation/OWNERSHIP_MATRIX.md)
