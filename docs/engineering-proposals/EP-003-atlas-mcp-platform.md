# EP-003 — Atlas MCP Platform

> Parser-readiness note: Preserve this proposal's heading levels, field labels,
> identifier, and controlled status.

**Status:** Approved

**Origin:** IDEA-030 and the approved Milestone 06 direction

## Problem

AI assistants cannot currently inspect live Atlas Splunk evidence through a
stable, governed interface. Explanations therefore depend on supplied static
context, repository records, or assumptions about runtime state. A future Atlas
application would also need to integrate with Splunk directly unless the
repository establishes a reusable evidence boundary first.

The current topology creates a concrete access constraint. Splunk Web is bound
to Windows loopback, while the Search Head and Indexer management interfaces on
TCP 8089 remain internal to `atlas-network`. A host-native MCP service cannot
reach those management interfaces without changing the network boundary or
using an intermediate execution path.

## Why it matters

A small, governed evidence interface would let approved assistants inspect
current system data while keeping Splunk access, search limits, output handling,
and auditing in one reviewable layer. It would also give later Atlas
applications a stable integration contract without granting them direct Splunk
credentials or broad API access.

## Purpose

Define and validate a read-only Atlas MCP Platform that exposes approved live
Splunk evidence through Model Context Protocol (MCP). The platform is an
evidence interface, not a chatbot, autonomous engineer, or administration
plane. Humans retain authority over interpretation, architecture, scope,
engineering actions, and acceptance.

The approved direction is recorded in the
[Milestone 06 Vision](../milestone-06-vision.md). This proposal records the
completed design review and recommends the resulting architecture for human
approval. It does not authorize implementation.

## Current constraints

- Atlas is a workstation-scale lab with a Windows host, Docker Desktop, a
  containerized Search Head and Indexer, and a Rocky Linux Deployment Server.
- The Search Head coordinates distributed search and is the preferred Splunk
  query boundary.
- Splunk management TCP 8089 is not published to the Windows host.
- The existing ingestion and Deployment Server management paths are validated
  and must not be changed merely to accommodate MCP.
- Git owns repository planning and engineering facts; Splunk owns live Splunk
  state.
- Credentials and secret-bearing configuration are excluded from source
  control and publishable evidence.
- Milestone 06 is planned and not validated. No active batch exists.

## Proposed approach

Build Version 1 as a small Python MCP service packaged in a dedicated container.
An approved local MCP client launches the container-attached service over
standard input/output (stdio). The container joins `atlas-network` and reaches
the Search Head through its internal management interface. Splunk TCP 8089
remains unpublished to the host, and the MCP service does not open a persistent
network listener.

The service exposes purpose-built tools backed by an explicit policy layer. It
does not provide a generic Splunk REST proxy or unrestricted SPL endpoint. Each
tool defines its input schema, allowed data sources, hard bounds, output schema,
sanitization, attribution, errors, and audit event.

Implementation should proceed in narrow validation gates:

1. Prove VS Code + Codex can launch and communicate with the container
   over stdio without changing Splunk network exposure.
2. Prove authenticated, read-only access to the Search Head through the bounded
   `get_server_info` contract.
3. Add metadata tools individually after their endpoint, permissions, output,
   and negative tests are approved.
4. Add bounded search only after a restrictive search contract is validated.
5. Evaluate Deployment Server-backed forwarder inspection separately because
   it crosses a second system and credential boundary.

Failure at one gate does not authorize a broader transport or permission model.
The architecture returns to human review if the recommended path is not viable.

## Recommended architecture

```text
Human
  ↓
Approved local MCP client
  ↓ stdio through an explicit container launch command
Atlas MCP service (Python container)
  ├─ tool contracts and input validation
  ├─ authorization policy and hard bounds
  ├─ Splunk adapter
  ├─ output minimization and sanitization
  └─ structured audit events
  ↓ HTTPS/TCP 8089 on atlas-network
Atlas Search Head
  ↓ existing distributed-search relationship
Atlas Indexer
```

The Search Head is the initial live-evidence boundary because it already owns
search coordination. The MCP service should not query the Indexer directly
unless a later tool has a demonstrated requirement and separate approval.

The Deployment Server is not part of the initial connection path. A later
approved forwarder-management tool may use a separate read-only adapter to the
Rocky Linux Deployment Server, but only after its network route, certificate,
identity, endpoint allowlist, and output policy are reviewed.

### Component responsibilities

| Component | Responsibility | Must not own |
| --- | --- | --- |
| MCP transport adapter | MCP initialization, tool discovery, invocation, and protocol errors | Splunk authorization policy or engineering truth |
| Tool contract layer | Typed inputs, allowlisted operations, defaults, hard limits, and stable result envelopes | Credentials or generic API pass-through |
| Policy layer | Reject-by-default endpoint, index, search, field, and limit enforcement | Prompt-based discretion |
| Splunk adapter | Authentication, approved requests, response normalization, timeouts, and upstream errors | MCP presentation or unrestricted client methods |
| Sanitization layer | Field minimization, value redaction, and safe error output | Invented replacement values |
| Audit layer | Invocation identity, tool, bounds, result status, timing, and rejection reason | Secrets or full sensitive payloads |
| Canonical repository adapter, if later approved | Consume existing parsers or reproducible generated models | A second milestone, planning, decision, lesson, or evidence inventory |

## Transport analysis

### Option A — Containerized stdio service (recommended)

The MCP client starts the service as a foreground container process and
communicates over stdio. The service joins `atlas-network` for internal Search
Head access.

Benefits:

- preserves the existing internal-only Splunk management boundary;
- creates no persistent MCP listening port;
- keeps the Python runtime and dependencies reproducible and isolated;
- limits availability to an explicitly launched local client session; and
- provides a small first security boundary to validate.

Trade-offs:

- Docker must be available when the client starts the service;
- stdio forwarding, shutdown, signal handling, and log separation must be
  validated on the selected Windows client;
- secret injection into the ephemeral container needs an approved design; and
- audit persistence must outlive the container without exposing payloads.

### Option B — Persistent container service over loopback HTTP

The service runs continuously on `atlas-network` and publishes its MCP endpoint
only to Windows loopback.

Benefits:

- separates service lifecycle from an individual client;
- can support multiple approved local clients; and
- avoids container-launch behavior in each MCP client configuration.

Trade-offs:

- adds a persistent network service, authentication boundary, port, and
  lifecycle requirement;
- requires transport security and session controls even when loopback-bound;
- increases audit and operational scope before the read-only tool boundary is
  proven; and
- earns little value for the first single-user validation.

### Option C — Host-native stdio service

The approved client launches Python directly on Windows.

Benefits:

- simplest MCP stdio lifecycle; and
- avoids invoking Docker for each session.

Trade-offs:

- cannot currently reach internal Splunk TCP 8089;
- would require publishing a management port, adding a proxy, or executing
  through another component;
- adds a host Python dependency and environment-management boundary; and
- weakens the current network isolation for convenience.

Option C is not recommended for Version 1. Publishing Splunk management TCP
8089 solely for MCP would expand the existing attack surface before the service
has been validated.

## Splunk integration

Atlas MCP will use the Splunk Enterprise SDK for Python. The SDK is an internal
implementation dependency and will never be exposed directly to an MCP client.
Every operation follows `MCP tool → Atlas policy → Atlas Splunk adapter → Splunk
Python SDK → Splunk`. The adapter exposes only purpose-built operations approved
by versioned Atlas tool contracts. Python and SDK versions will be explicitly
pinned.

### Generic REST proxy

A tool that accepts arbitrary paths, methods, parameters, or SPL would make the
MCP service a credentialed pass-through rather than a policy boundary. This
option is rejected.

## Version 1 scope

Version 1 includes:

- a Python project with pinned dependencies and a reproducible container image;
- MCP initialization, discovery, invocation, structured errors, and clean
  shutdown through the approved transport;
- a dedicated non-human Splunk identity with a purpose-built read-only role and
  revocable authentication token;
- a reject-by-default tool and endpoint policy;
- `get_server_info` as the sole first tool, returning only an approved,
  sanitized subset of Search Head server information;
- output minimization, sanitization, source attribution, and audit events;
- operational guidance for startup, shutdown, credential rotation, failure,
  and evidence capture; and
- positive, negative, security-boundary, and failure-path validation evidence.

## Candidate tool surface

The following tools are candidates, not approved contracts. Names are
illustrative until implementation planning defines the repository convention.

| Capability | Intended source | Initial disposition | Required boundary |
| --- | --- | --- | --- |
| `get_server_info` | Search Head server information | Sole first validation tool | Fixed operation; approved minimal normalized fields |
| Index inventory | Search Head | Candidate after health | Allowlisted indexes; no unrestricted configuration dump |
| License inspection | Search Head or designated license endpoint | Candidate | Confirm authoritative source and safe returned fields |
| Bounded search | Search Head search API | Later Version 1 gate | Approved templates or grammar; fixed limits and fields |
| Forwarder inspection | Search Head evidence or Deployment Server | Deferred within proposal pending boundary decision | Separate data-source and identity analysis |
| Configuration discovery | Explicit approved endpoints | Deferred until exact need is defined | No secret-bearing or arbitrary configuration access |
| Search explanation | MCP client using attributed tool output | Not a standalone privileged backend operation | Must separate evidence from model interpretation |

Each accepted tool contract must record:

- purpose and supported question;
- input schema and safe defaults;
- hard limits and rejection rules;
- exact upstream method, endpoint, and allowed parameters;
- required Splunk capabilities and accessible indexes;
- normalized output schema and source attribution;
- sensitive fields removed or redacted;
- timeout, upstream-error, and unavailable-evidence behavior;
- audit fields and retention; and
- positive, boundary, and abuse-case tests.

## Search policy

Version 1 must not expose arbitrary SPL. Search expansion will progress from
named approved searches to bounded parameterized searches and then to other
controlled search capabilities only when validated requirements justify them.
A generic `run_any_spl` capability is prohibited.

At minimum, the policy must enforce allowed indexes, earliest and latest time,
maximum range, maximum results, execution timeout, concurrency, output fields,
and prohibited commands. Limits must be enforced in service code even if the
client supplies smaller values.

## Authentication and secret handling

Version 1 requires a dedicated non-human Splunk service identity. It must not
reuse the administrator account or the general container bootstrap password.
Its purpose-built role may carry the broad read permissions needed to inspect
approved platform and configuration state for future Configuration Intelligence
while possessing zero mutation authority. Splunk permissions are a capability
ceiling, not the client-facing surface: only explicitly registered and approved
MCP tools may expose those reads.

Credentials must be injected at runtime through an approved local secret path,
excluded from Git, omitted from command arguments where process inspection can
expose them, and never included in MCP results, errors, logs, screenshots, or
published evidence. The design must define credential rotation and revocation
before the identity is treated as operational.

The token will remain in local host storage and be supplied to the container
only at runtime through Docker secret injection. The application will consume
the secret through a defined runtime interface so the provider can later change
without redesigning the application. Enterprise secret-management
infrastructure is unnecessary for Version 1.

## Network and TLS boundary

The recommended container communicates with the Search Head over the existing
Docker network. No Splunk management port is added to the host.

The service will validate the Search Head's identity by explicitly trusting the
certificate presented by its management interface. The architecture spike will
inspect that certificate and install the required trust material in the MCP
runtime. Steady-state operation fails closed on certificate validation failure.
A verification bypass is diagnostic only and cannot satisfy M06 validation. M06
will not introduce a new Atlas PKI or certificate authority unless inspection
proves one is required.

## Read-only guarantee

Read-only behavior requires overlapping controls:

- the Splunk identity lacks write and administrative capabilities;
- the adapter contains only approved read request methods and paths;
- the policy layer rejects unapproved tools, inputs, indexes, and search forms;
- the service exposes no generic request or shell execution interface;
- containers run without unnecessary privileges or host mounts;
- secrets and sensitive outputs are minimized and isolated;
- audit records make permitted and rejected operations reviewable; and
- negative tests attempt writes and boundary bypasses.

A prompt instruction or tool description is not a security control. Successful
positive reads do not prove the absence of write capability.

## Canonical repository boundary

Live Splunk facts come from approved Splunk interfaces. Repository-owned facts
remain owned by the documents listed in the
[Canonical Documentation Ownership Matrix](../documentation/OWNERSHIP_MATRIX.md).

Version 1 does not need repository-state tools to prove the Splunk evidence
boundary. If such tools are later approved, they must consume the existing
canonical parsers or a reproducible, audited interchange generated from them.
The Python service must not scrape rendered pages, parse React components, or
maintain independent milestone, batch, task, evidence, decision, or lesson
inventories.

## Output and audit model

Every successful result should use a stable envelope containing:

- tool and contract version;
- source system and source role;
- observation time;
- applied bounds;
- normalized evidence data; and
- explicit truncation, sanitization, warning, or limitation metadata.

Errors should distinguish invalid input, policy rejection, authentication
failure, authorization failure, upstream unavailability, timeout, malformed
upstream data, and internal failure without leaking credentials or sensitive
configuration.

Audit events will be written as structured records to a host-mounted local
directory. No database or remote logging platform is required for M06. Events
should record invocation identity when reliably available, tool, contract
version, timestamp, requested and applied bounds, decision, duration, upstream
status category, result count, and rejection reason. They should not store
credentials, raw tokens, or full event payloads. A simple local rotation and
retention mechanism will be selected during implementation for low maintenance.

## Non-goals

- Building a chatbot or autonomous engineer.
- Changing Splunk configuration or runtime state.
- Deploying applications or configuration bundles.
- Starting, stopping, restarting, or controlling services.
- Exposing unrestricted SPL, arbitrary REST paths, or shell commands.
- Implementing Configuration Intelligence in Milestone 06.
- Adding GitHub, Docker, Hyper-V, Linux, OpenTelemetry, Azure DevOps, or other
  providers.
- Updating Atlas EOS or other repository state through MCP.
- Adding CI/CD, deployment automation, high availability, clustering, or
  unrelated infrastructure changes.
- Claiming production readiness from a workstation-scale validation.

## Alternatives considered

- **Direct AI-to-Splunk access:** rejected because each client would receive
  credentials and independently own security, query, output, and audit behavior.
- **Direct Configuration Intelligence-to-Splunk integration:** rejected because
  it would couple Milestone 07 to Splunk before the common boundary is proven.
- **Chatbot-first design:** rejected because conversation is not the security or
  evidence boundary.
- **Write-enabled Version 1:** rejected because it creates a materially larger
  threat and authorization model before read-only behavior is validated.
- **Host-published Splunk management port:** not recommended because it expands
  the current network boundary solely to simplify MCP connectivity.
- **Persistent MCP HTTP service first:** deferred because a single-user stdio
  service can test the core boundary with less exposed and operational surface.
- **Repository-only MCP service:** rejected as the Milestone 06 implementation
  because it would not solve access to live Splunk evidence.

## Benefits

- Grounds AI-assisted explanations in current, attributable Splunk evidence.
- Centralizes credentials, authorization, bounds, sanitization, and auditing.
- Preserves the current internal Splunk management network boundary.
- Gives later approved Atlas applications a stable evidence contract.
- Establishes a small platform boundary that can be tested independently of an
  AI model.

## Risks and mitigations

| Risk | Consequence | Proposed mitigation |
| --- | --- | --- |
| Excessive Splunk permissions | Read-only claim is false or broader than intended | Purpose-built role with the necessary read ceiling, zero mutation authority, and negative authorization tests |
| Unbounded or expensive search | Search Head or Indexer performance degradation | Templates, hard time/result/timeout/concurrency limits, and audit |
| Sensitive data disclosure | Secrets, identifiers, or event content reaches a client or evidence artifact | Field minimization, sanitization, safe errors, and publication review |
| Stdio/container incompatibility | Recommended transport cannot operate reliably with the selected client | Time-boxed architecture spike before platform implementation |
| Certificate validation failure | Insecure upstream connection or unavailable service | Explicit trust design; no steady-state verification bypass |
| Audit data becomes sensitive | Logs create a second disclosure surface | Metadata-only audit schema, controlled retention, and access review |
| Tool surface expands informally | MCP becomes a generic privileged proxy | Versioned contracts, reject-by-default registry, and human approval per tool |
| Repository state is duplicated | Website, Git, and MCP disagree | Consume canonical parsers or reproducible audited projections only |
| Provider scope creep | Milestone 06 absorbs Milestone 07 or unrelated systems | Explicit non-goals and separate proposals for new providers or mutation |

## Delivery strategy

The proposal should become several bounded backlog tasks rather than one broad
implementation item. A recommended sequence is:

1. Architecture spike: validate VS Code + Codex, containerized stdio, network
   access, explicit certificate trust, runtime Docker secret injection,
   `get_server_info`, sanitization, and local audit persistence.
2. Security contract: approve the Splunk role, endpoint and index allowlist,
   result policy, audit schema, and negative-test matrix.
3. MCP foundation: create the pinned Python project and Splunk SDK dependency,
   container, protocol lifecycle, structured errors, and `get_server_info`.
4. Metadata tools: add only approved index, license, or other metadata contracts.
5. Bounded search: implement approved templates, enforcement, sanitization, and
   performance limits.
6. Optional Deployment Server inspection: defer until after the Search Head path
   is stable and a separate boundary review approves it.
7. Milestone validation and closeout: execute the full positive and negative
   suite, review evidence, document limitations, and seek human acceptance.

Each task requires separate acceptance criteria. Only an explicitly populated
Active Batch authorizes execution.

## Validation plan

### Architecture validation

- VS Code with Codex starts the containerized stdio service, discovers its
  tools, invokes a tool, receives a response, and shuts it down cleanly.
- MCP protocol output remains separate from operational logs.
- The container reaches the Search Head on internal TCP 8089 without a new host
  publication.
- The chosen certificate trust and secret-injection paths work after restart.

### Positive functional validation

- Each approved tool returns live data from its documented source.
- Results include source, observation time, applied bounds, and limitations.
- `get_server_info` returns its approved bounded, sanitized evidence envelope.
- Upstream unavailable and no-data cases return truthful, useful responses.

### Negative and abuse-case validation

- Write methods, deployment actions, service control, arbitrary endpoints, and
  shell execution are unavailable.
- Unapproved indexes, fields, commands, parameters, and excess bounds are
  rejected.
- Injection and contract-bypass inputs do not reach an unapproved operation.
- Credentials and secret-bearing values do not appear in results, errors, logs,
  process arguments, container inspection output selected for evidence, or
  published artifacts.
- The service identity cannot perform representative prohibited Splunk actions.

### Operational validation

- Timeouts, cancellation, concurrency limits, and repeated requests protect the
  Search Head and Indexer from unbounded work.
- Audit events cover successful, rejected, failed, and timed-out calls without
  storing sensitive payloads.
- Credential rotation and revocation behavior is demonstrated.
- Container restart and client reconnect behavior is documented.
- Evidence is redacted, indexed, and reviewed before publication.

## Success criteria

- Human review approves the transport, runtime, Splunk integration, security,
  tool, output, audit, and validation architecture before implementation.
- The MCP service exposes only approved, versioned read-only contracts.
- Splunk management TCP 8089 remains internal unless a later explicit decision
  approves another boundary.
- The service uses a dedicated non-human identity whose role permits necessary
  reads but independently prevents mutation, plus the approved runtime secret
  path.
- Every result is attributable to its live source and states applied bounds and
  limitations.
- Prohibited operations are absent and representative bypass attempts fail.
- Approved searches are bounded, attributable, sanitized, and auditable.
- Repository-owned state is consumed only through canonical, reproducible
  projections if repository tools enter scope.
- Evidence demonstrates both permitted behavior and the read-only security
  boundary before Milestone 06 is marked Complete / Validated.
- Configuration Intelligence can later consume the documented interface without
  receiving direct Splunk access, subject to its own approved scope.

## Dependencies

- Milestone 05 remains Complete / Validated.
- The Atlas Search Head and Indexer remain stable and reachable on
  `atlas-network`.
- Approved EP-003 architecture and accepted DEC-027.
- Creation of the dedicated non-human Splunk identity, purpose-built read-only
  role, and revocable authentication token.
- Implementation planning for the approved runtime secret, certificate-trust,
  sanitization, audit, and `get_server_info` contracts.
- Approved tool contracts and validation matrix.
- Human-created backlog tasks and an explicitly activated batch before
  implementation.

## Decisions resolved

The design review selected containerized stdio, a dedicated single-purpose MCP
container, VS Code + Codex as the primary validation client, the Splunk
Enterprise SDK for Python behind a purpose-built adapter, a dedicated non-human
Splunk identity with a read-only role and revocable token, local host secret
storage with runtime Docker secret injection, explicit trust of the Search Head
certificate, `get_server_info` as the sole first tool, a broad read-only Splunk
capability ceiling separated from narrow MCP exposure, host-mounted local
structured audit logs, and deferred Deployment Server inspection.

Bounded search remains a separately approved future capability. A generic
`run_any_spl` tool is not part of the architecture.

## Estimated effort

Estimate only after the architecture spike and security contract define the
runtime, tool count, search model, and validation matrix. The proposal should
not use an unsupported calendar estimate as an approval input.

## Recommendation

Implement EP-003 through separately approved, bounded backlog batches. The first implementation
must prove one bounded path: VS Code + Codex invokes `get_server_info` over
containerized stdio; Atlas MCP uses the authenticated, TLS-verified Splunk
Python SDK path to the Search Head; and the client receives sanitized,
attributable evidence while a safe structured audit record is persisted.

Do not approve unrestricted SPL, a generic REST proxy, host publication of
Splunk TCP 8089, Deployment Server access, or any write capability as part of
the initial architecture.

## Decision

Human approved EP-003 on 2026-09-01. DEC-027 records the accepted architecture,
and the human accepted ATL-034 through ATL-041 as the M06 backlog decomposition
on 2026-09-01. Approval and Backlog status do not activate any item, authorize
implementation, or change the M06 milestone or validation state.

## Related backlog items

- ATL-034 — M06 Atlas MCP architecture spike
- ATL-035 — M06 security boundary and tool contract
- ATL-036 — M06 containerized MCP foundation
- ATL-037 — M06 `get_server_info` end-to-end path
- ATL-038 — M06 read-only security-boundary validation
- ATL-039 — M06 additional Search Head metadata tools
- ATL-040 — M06 bounded search capability
- ATL-041 — M06 validation and closeout

## Source documents

- [Milestone 06 Vision](../milestone-06-vision.md)
- [Atlas Idea Inbox](../planning/IDEAS.md#idea-030--atlas-mcp-server)
- [Project Atlas Roadmap](../../ROADMAP.md)
- [Project Atlas Milestones](../milestones.md)
- [Atlas Architecture](../architecture.md)
- [Canonical Documentation Ownership Matrix](../documentation/OWNERSHIP_MATRIX.md)
- [Global AI Instructions](../../ai/GLOBAL_INSTRUCTIONS.md)
- [DEC-027 — Atlas MCP Version 1 architecture](../planning/DECISIONS.md#dec-027--atlas-mcp-version-1-architecture)
