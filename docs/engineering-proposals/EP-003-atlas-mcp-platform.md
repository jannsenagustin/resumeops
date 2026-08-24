# EP-003 — Atlas MCP Platform

> Parser-readiness note: Preserve this proposal's heading levels, field labels,
> identifier, and controlled status.

**Status:** Draft

**Origin:** IDEA-030 and the promoted Atlas MCP strategy

## Problem

AI assistants cannot currently inspect live Atlas Splunk evidence through a
stable, governed interface. Without that interface, explanations risk depending
on static context or assumptions, and each future Atlas application would need
its own direct Splunk integration.

## Why it matters

A shared evidence layer can ground AI explanations in current platform state,
centralize the Splunk integration boundary, and give later Atlas applications a
reusable interface with explicit security constraints.

## Purpose

Create a secure integration layer between AI assistants and Project Atlas that
exposes live engineering evidence from Splunk through Model Context Protocol.
Atlas MCP is not a chatbot and is not an autonomous engineer. Its role is to
make evidence inspectable while preserving human authority over interpretation
and action.

## Proposed approach

Deliver the platform in phases. Version 1 provides a read-only MCP service over
approved Splunk REST API or SDK operations. After that boundary is validated,
Configuration Intelligence can become the first major consumer. Any additional
provider or mutation capability requires separate approval.

## Architecture

```text
User
↓
ChatGPT / Claude
↓
Model Context Protocol
↓
Atlas MCP Platform (Python)
↓
Splunk REST API / SDK
↓
Splunk Enterprise
```

Atlas applications use the MCP Platform instead of integrating directly with
Splunk. Configuration Intelligence is planned as the first major application on
this layer:

```text
Configuration Intelligence
↓
Atlas MCP Platform
↓
Splunk Enterprise
```

## Scope

Version 1 defines and validates a Python MCP service that provides approved,
read-only access to live Atlas Splunk evidence through a bounded abstraction of
the Splunk REST API or SDK.

## Non-goals

- Building a chatbot or autonomous engineer.
- Changing Splunk configuration.
- Deploying applications or configuration bundles.
- Performing write operations of any kind.
- Implementing Configuration Intelligence in this milestone.
- Approving integrations with additional infrastructure providers.

## Alternatives considered

- Direct AI-to-Splunk integration was rejected because it would duplicate
  security and API concerns across assistants and applications.
- Direct Configuration Intelligence-to-Splunk integration was rejected because
  it would tightly couple the first application to one backend.
- A chatbot-first design was rejected because conversation is not the platform
  boundary; governed access to evidence is.
- Write-enabled Version 1 was rejected because it expands risk before the
  read-only architecture is validated.

## Benefits

- Grounds AI explanations in live Splunk evidence.
- Creates one reusable integration boundary for Atlas applications.
- Keeps Version 1 behavior inspectable, bounded, and read-only.
- Reduces direct coupling between Configuration Intelligence and Splunk.

## Risks

- Over-broad Splunk permissions could undermine the read-only guarantee.
- Unbounded searches could affect platform performance.
- Sensitive configuration or event data could be exposed without output
  controls.
- Future-provider language could be mistaken for approved scope.

Mitigations include least privilege, allowlisted operations, bounded searches,
auditing, output sanitization, explicit non-goals, and validation evidence.

## Version 1 capabilities

- Splunk health
- License inspection
- Index inspection
- Forwarder inspection
- Approved SPL execution
- Search explanation
- Configuration discovery
- REST API abstraction

## Security model

The service uses least-privilege Splunk credentials, an explicit allowlist of
exposed tools and endpoints, bounded and auditable search execution, sanitized
outputs, and human approval of the permitted interface. Secrets must not be
stored in source control or returned through MCP responses.

## Read-only guarantee

Version 1 exposes read-only operations only. It performs no configuration
changes, deployment actions, or write operations. Any future mutation capability
requires a separate proposal, threat analysis, explicit human approval, and a
new security boundary; it is not implied by this proposal.

## Future expansion

After Version 1 is validated, Configuration Intelligence may consume Atlas MCP
as its evidence and configuration-discovery layer. Possible later providers
include GitHub, Docker, Hyper-V, Linux, OpenTelemetry, and Azure DevOps. These are
unapproved possibilities, not committed scope.

## Success criteria

- The MCP service exposes only the approved Version 1 read-only capabilities.
- Every AI explanation can identify the live Splunk evidence that supports it.
- The service cannot change configuration, trigger deployment, or invoke a write
  operation.
- Access uses documented least-privilege credentials and security boundaries.
- Approved SPL execution is bounded, attributable, and auditable.
- Configuration Intelligence can use the documented MCP interface without a
  direct Splunk integration.
- Validation evidence demonstrates the read-only guarantees before the platform
  is treated as complete.

## Dependencies

- Milestone 05 completed.
- A stable and reachable Atlas Splunk environment.
- Approved authentication, authorization, secret-management, and audit design.
- Human review and approval before any backlog or execution scope is created.

## Estimated effort

To be determined after Milestone 05 completion and proposal review.

## Recommendation

Make Atlas MCP Platform the planned Milestone 06, immediately after Milestone
05, and validate its read-only integration boundary before beginning
Configuration Intelligence as Milestone 07.

## Decision

Draft proposal created for human review. No backlog item or execution authority
is created by this proposal.

## Related backlog items

None.

## Source documents

- [Atlas Idea Inbox](../planning/IDEAS.md#idea-030--atlas-mcp-server)
- [Project Atlas Roadmap](../../ROADMAP.md)
- [Project Atlas Milestones](../milestones.md)
