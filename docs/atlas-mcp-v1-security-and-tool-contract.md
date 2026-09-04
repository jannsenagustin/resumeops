# Atlas MCP Version 1 Security Boundary and Tool Contract

**Contract ID:** ATL-MCP-V1

**Contract Version:** 1.0.0

**Status:** Approved

**Owner:** Project Atlas

**Implemented by:** ATL-036 foundation and ATL-037 sole live tool path; later expansion requires separate human activation

## Authority and purpose

This document is the durable normative contract produced by ATL-035. It
specifies the production-oriented security boundary and sole initial
`get_server_info` tool without implementing or activating that service.

The architecture remains owned by
[EP-003](engineering-proposals/EP-003-atlas-mcp-platform.md) and
[DEC-027](planning/DECISIONS.md#dec-027--atlas-mcp-version-1-architecture).
[ATL-034/BATCH-008](execution-reports/BATCH-008.md) is the validated architecture
proof, not production code. [ATL-042/BATCH-009](execution-reports/BATCH-009.md)
owns the validated Search Head management/KV TLS prerequisite. This contract
implements those accepted decisions without changing them, so it creates no
new architecture decision.

Normative terms `MUST`, `MUST NOT`, `SHOULD`, and `MAY` describe requirements
for later implementation and validation. They do not grant execution authority.

## Security invariants

Atlas MCP Version 1 MUST preserve all of these invariants:

1. Splunk authorization independently prevents mutation even if every Atlas
   application control fails.
2. The MCP registry and policy layer expose only explicitly registered,
   versioned contracts and reject everything else.
3. The Splunk SDK remains private behind a purpose-built adapter; clients cannot
   supply SDK methods, REST paths, HTTP methods, SPL, shell commands, or arbitrary
   parameters.
4. Secrets enter only through the approved runtime interface and never enter
   source, images, arguments, protocol output, errors, logs, audits, screenshots,
   or publishable evidence.
5. TLS chain and hostname verification use the approved Atlas trust model and
   fail closed without bypass or compatibility modes.
6. Results and errors are bounded, minimized, sanitized, attributable, and
   auditable without recording sensitive payloads.
7. MCP remains a read-only evidence interface. It cannot administer Splunk,
   operate services, deploy configuration, modify Atlas EOS, or authorize action.

These controls overlap deliberately. Prompts, tool descriptions, client intent,
and a successful read are not security controls and cannot prove read-only
behavior.

## Splunk authorization boundary

### Production identity model

The production naming contract is:

| Object | Required name | Requirement |
| --- | --- | --- |
| Splunk user | `atlas_mcp_v1` | Dedicated non-human service identity; interactive human use prohibited |
| Splunk role | `atlas_mcp_v1_readonly` | Purpose-built role; no inherited roles and zero mutation authority |
| Token | Human-issued token for `atlas_mcp_v1` | Revocable credential; value never recorded by Atlas documentation or audit |

The identity MUST NOT reuse `admin`, a human account, the Splunk container
bootstrap password, the ATL-034 spike token, or any general automation identity.
Identity and role provisioning remain human-controlled work outside ATL-035.

### Capability ceiling

The role MUST have no imported roles, no write or administrative capability, no
search capability, and no index access. `get_metadata` is the candidate minimum
explicit Splunk capability because the ATL-034 proof used it for the fixed
`server/info` read. It is not proven necessary or sufficient for the production
role. Later live provisioning MUST determine the exact minimum permissions
required by `server/info` on the installed Splunk version and MUST prove that
the resulting effective role cannot mutate. If `get_metadata` is unnecessary,
it MUST be removed. If any additional permission appears necessary,
implementation MUST stop for human review before granting it; it MUST NOT add
or inherit that permission implicitly.

The role MUST NOT possess capabilities that permit configuration changes,
knowledge-object changes, user or role administration, token administration,
application installation or deployment, service control, index administration,
ingestion changes, distributed-search administration, arbitrary search, shell
execution, or REST administration. The effective role, including inherited
capabilities and default index grants, MUST be inspected and negatively tested
after provisioning.

Splunk permissions are only the outer capability ceiling. They do not register
tools or enlarge the client-facing contract.

### Prohibited-capability verification checklist

This checklist is a representative negative verification aid, not the security
model and not a permission blocklist. The production role remains
explicit-minimum and allowlist oriented: every effective capability, inherited
role, and index grant MUST be absent unless the exact minimum is positively
justified and human reviewed. A capability not named below is not permitted by
omission.

After later provisioning, inspect the installed Splunk version's effective role
and verify that it has none of these capability families or representative
capabilities where those names exist:

- [ ] Global or object-wide administration, including `admin_all_objects`.
- [ ] User, role, authentication, or token administration, including
  `edit_user`, `edit_roles`, and token-management capabilities.
- [ ] Server configuration or lifecycle control, including `edit_server` and
  `restart_splunkd`.
- [ ] Application installation, update, removal, or deployment capabilities.
- [ ] Deployment Server, deployment-client, or configuration-bundle management.
- [ ] Input, monitor, receiver, TCP, forwarding, or ingestion configuration.
- [ ] Index creation, deletion, modification, or indexer/cluster administration.
- [ ] Distributed-search peer, search-head, cluster, or KV Store administration.
- [ ] Knowledge-object creation or mutation, including saved searches, reports,
  alerts, dashboards, lookups, macros, event types, tags, and field extractions.
- [ ] Search execution or scheduling, including `search`, `schedule_search`,
  real-time search, subsearch, and workload-control capabilities.
- [ ] Result export, filesystem output, collection, script, command, or shell
  execution capabilities.
- [ ] Credential, password, storage-password, secret, certificate private-key,
  or sensitive-configuration read access.
- [ ] Any inherited role, default/searched index grant, or wildcard resource
  grant.

Validation MUST compare the complete effective capability set with the approved
minimum, exercise representative denied operations, and confirm no state
change. An unexpected capability or successful prohibited operation is a stop
condition, even if it is not listed above.

## Token lifecycle and runtime secret interface

Only a human-authorized operator may issue, rotate, or revoke the production
token through an approved Splunk administrative boundary.

The lifecycle MUST be:

1. Create or confirm the dedicated identity and zero-mutation role.
2. Issue a revocable token with the shortest practical operator-approved
   lifetime; an unbounded token requires explicit documented human acceptance.
3. Store the token in a protected local host file outside Git, Docker build
   context, repository evidence, and general backup paths.
4. Disable inherited filesystem permissions and restrict access to the human
   operator, SYSTEM where operationally required, and the narrowly required
   runtime path.
5. Mount the file read-only into the disposable container at runtime. On
   Docker Desktop for Windows, where bind mounts cannot enforce the required
   POSIX ownership and modes, a one-shot least-privilege initialization
   container MAY copy the file into a Linux-backed Docker volume, assign it to
   UID/GID 10001, enforce mode `0400`, and mount that volume read-only into the
   MCP runtime. The initialization path MUST never print, transform, inspect,
   or place the token value in an argument or environment variable.
6. Read it through the stable application interface `ATLAS_MCP_TOKEN_FILE`.
   The variable contains a file path, never the token value.
7. Reject missing, empty, unreadable, malformed, or unexpectedly permissive
   secret input before contacting Splunk. Errors MUST disclose no value,
   fragment, length, hash, path beyond an approved logical label, or upstream
   authentication detail.
8. Rotate by issuing a replacement, updating the protected file atomically,
   starting a new disposable session, verifying the new credential, and then
   revoking the superseded credential. Concurrent validity MUST be limited to
   the controlled rotation window.
9. Revoke immediately on suspected exposure, operator decision, role change,
   or retirement. Running sessions MUST be stopped and the host file removed
   after revocation when no replacement is active.

The application MUST NOT accept a token value from command-line arguments,
ordinary environment variables, MCP inputs, configuration committed to Git, or
container image layers. Changing the future secret provider MAY change how the
file is populated, but MUST NOT change this application-facing file interface
without a separately reviewed contract revision.

## Network and TLS trust boundary

The MCP container MUST use stdio, publish no ports, open no MCP listener, join
only the approved `atlas-network`, and reach only
`https://atlas-search-head:8089` for this contract. Splunk TCP 8089 MUST remain
unpublished to the host.

The runtime trust interface is `ATLAS_MCP_CA_FILE`, containing the path to a
read-only mount of only the public Atlas root required for this connection. It
MUST NOT contain a private key, leaf private material, unrelated roots, the old
Splunk CA, or a substituted leaf trust anchor.

The adapter MUST create a normal default Python `SSLContext` from that root,
retain `CERT_REQUIRED`, retain hostname checking, and connect using the DNS name
`atlas-search-head`. It MUST verify the presented chain and the SAN hostname.
TLS verification failures MUST stop the operation before authentication or data
access. Disabling verification, weakening certificate validation, accepting a
wrong hostname, partial-chain compatibility, leaf pinning, or falling back to
HTTP is prohibited.

ATL-042 certificate renewal is an operational constraint. Replacement
certificates MUST preserve the approved Atlas root trust model, a SAN valid for
`atlas-search-head`, hostname verification, `CA:FALSE`, the required critical
key usage, and critical `serverAuth, clientAuth` EKU used by the shared
management/KV boundary. Certificate lifecycle implementation is not owned by
ATL-035. A changed trust model requires separate human review.

## Reject-by-default tool registry

The production registry begins with one literal entry:

| Registered tool | Contract version | Adapter operation | State |
| --- | --- | --- | --- |
| `get_server_info` | `1.0.0` | Fixed `server/info` read | Sole permitted V1 tool |

Registration MUST be explicit and separate from the existence of code. Unknown,
disabled, malformed, differently cased, aliased, or version-mismatched tool
names MUST be rejected before adapter construction. Adding code, SDK methods, or
future contracts MUST NOT register them automatically.

There is no wildcard, generic request, fallback dispatch, dynamic endpoint,
arbitrary REST, arbitrary SDK, SPL, search, shell, deployment, mutation, or
service-control entry. Additional tools require their own approved contract,
Active Batch, tests, and registry change.

## `get_server_info` contract

### Purpose

Return a minimal current identification observation from the Atlas Search Head
so a client can attribute evidence to the expected Splunk server. It does not
assert overall health, configuration correctness, cluster state, peer health,
license state, or M06 validation.

### Input schema

The tool accepts one JSON object with no properties:

```json
{}
```

The object is required. Any property, nested value, alternate endpoint, source,
field selection, timeout, output size, credential, or transport parameter MUST
be rejected as `INVALID_INPUT`. Client-supplied values cannot change bounds.

### Fixed adapter operation

The call path is strictly:

```text
get_server_info
  -> registry and input validation
  -> Atlas policy
  -> purpose-built get_server_info adapter method
  -> pinned Splunk Python SDK
  -> GET-equivalent server/info read on atlas-search-head
  -> normalization and sanitization
  -> versioned evidence envelope
```

The adapter accepts no client endpoint or method. It performs one logical
`server/info` read, requests at most one entry, applies an implementation-defined
finite timeout bounded by the later ATL-036 runtime policy, and follows no
client-controlled pagination or links. It MUST NOT expose the SDK service object
or raw response outside the adapter/sanitization boundary.

### Success envelope

A successful result MUST contain exactly this structure:

```json
{
  "tool": "get_server_info",
  "contract_version": "1.0.0",
  "source": "atlas-search-head",
  "source_role": "search-head",
  "observed_at": "RFC3339 UTC timestamp",
  "applied_bounds": {
    "endpoint": "server/info",
    "entries": 1
  },
  "data": {
    "version": "sanitized string or null",
    "server_name": "sanitized string or null",
    "server_role": "sanitized string, sanitized string array, or null"
  },
  "sanitization": {
    "applied": true,
    "removed_fields": true
  },
  "warnings": [],
  "limitations": [
    "Server identification only; this result does not establish overall health or configuration correctness."
  ]
}
```

No additional upstream field may pass through. `version`, `server_name`, and
`server_role` are the only normalized fields because they are the bounded set
proved by ATL-034. Missing fields remain `null` and MUST NOT be invented.
`server_role` MAY preserve multiple sanitized role strings if the installed SDK
returns a list; it MUST NOT include other role or capability details.

Strings MUST be valid Unicode, free of control characters except ordinary
whitespace, trimmed, and bounded to 256 characters each. Arrays MUST contain at
most 8 strings and be deterministically ordered. Values exceeding bounds MUST
be truncated only when the envelope adds a truthful warning; otherwise the call
MUST fail as malformed upstream data. The complete serialized response MUST be
bounded by the later runtime implementation to no more than 8 KiB.

Raw upstream dictionaries, links, host addresses, GUIDs, license identifiers,
paths, build metadata beyond the normalized version, capabilities, indexes,
credentials, tokens, certificates, configuration, or event data MUST NOT appear.

## Structured error contract

Errors MUST use a stable envelope and MUST NOT include raw exceptions, tracebacks,
SDK/HTTP response bodies, request headers, authorization headers, tokens, secret
paths, certificate contents, or unreviewed upstream values.

```json
{
  "tool": "get_server_info",
  "contract_version": "1.0.0",
  "error": {
    "code": "POLICY_REJECTED",
    "message": "Bounded operator-safe message",
    "retryable": false,
    "correlation_id": "opaque per-invocation identifier"
  }
}
```

Allowed codes are:

| Code | Meaning | Retryable |
| --- | --- | --- |
| `INVALID_INPUT` | Input does not exactly match the empty-object schema | No |
| `TOOL_NOT_REGISTERED` | Requested tool/version is absent from the registry | No |
| `POLICY_REJECTED` | A request violates an Atlas policy bound | No |
| `TLS_VERIFICATION_FAILED` | Certificate chain or hostname verification failed | No |
| `AUTHENTICATION_FAILED` | Splunk rejected the credential | No |
| `AUTHORIZATION_FAILED` | The identity lacks the required read permission | No |
| `UPSTREAM_UNAVAILABLE` | The fixed Search Head endpoint is unavailable | Yes |
| `UPSTREAM_TIMEOUT` | The bounded upstream deadline expired | Yes |
| `MALFORMED_UPSTREAM_DATA` | The response cannot be safely normalized | No |
| `INTERNAL_ERROR` | An unexpected internal failure was safely contained | No |

Operator-safe messages MUST be static or drawn from an approved finite set.
Authentication and authorization errors MUST not reveal which credential,
capability, role, endpoint detail, or upstream status caused rejection.

## Audit contract

Every accepted invocation, registry rejection, input/policy rejection,
authentication or authorization failure, TLS failure, timeout, upstream failure,
malformed response, and internal failure MUST emit one structured metadata-only
audit event. Audit failure MUST be surfaced as an operational failure; the
service MUST NOT silently claim an audited success.

Required fields are:

| Field | Requirement |
| --- | --- |
| `schema_version` | Literal `1.0.0` |
| `event_id` | Unique opaque identifier |
| `correlation_id` | Matches the response/error correlation context |
| `timestamp` | RFC3339 UTC event time |
| `invocation_identity` | Approved local client identity when reliably available, otherwise literal `unavailable` |
| `tool` | Requested tool name after safe bounded normalization |
| `contract_version` | Requested/applied version when known |
| `source` | Literal `atlas-search-head` when upstream access begins; otherwise `none` |
| `source_role` | Literal `search-head` or `none` |
| `requested_bounds` | Metadata only; for this contract, empty object or fixed schema fact |
| `applied_bounds` | Fixed endpoint label and entry count; never a URL with credentials |
| `decision` | `allowed`, `rejected`, `failed`, or `succeeded` |
| `duration_ms` | Non-negative bounded integer |
| `upstream_status_category` | Coarse category only; never headers or body |
| `result_count` | `1`, `0`, or `null` |
| `rejection_reason` | Approved categorical reason or `null` |
| `sanitization_applied` | Boolean |

Audit events MUST NOT contain request or result payloads, raw inputs, output
values, tokens, authorization material, secret paths, certificate bodies,
tracebacks, raw URLs or query strings, headers, cookies, SPL, event content,
host-persistent identifiers, or unbounded client text.

Audit files MUST be written only to the approved local audit boundary, outside
Git and suitable for controlled review, with least-privilege access. On hosts
with enforceable POSIX bind semantics, this is the protected host-mounted local
audit directory. On Docker Desktop for Windows, the runtime MAY instead use a
Linux-backed Docker volume owned by UID/GID 10001 with directory mode `0700`
and audit-file mode `0600`. A separate non-root, capability-dropped export step
MAY mount that volume read-only and copy only the approved audit JSONL files to
the protected Windows host directory. It MUST NOT export the token volume,
application files, raw request or response content, or any other container
state. The MCP runtime receives only the narrow audit write mount and no broad
host mount.

Linux-backed token and audit volumes are runtime security boundaries, not
backup stores. They MUST be created and initialized through the reviewed
Compose definition, must not be shared with unrelated services, and MUST be
removed after the controlled audit export when the disposable session ends.
This Windows adjustment does not authorize token disclosure, broader Splunk
permissions, weaker TLS, additional MCP tools, listeners, or relaxed audit
schema, rotation, retention, or size bounds.

### Retention and rotation requirements

The operational baseline is 30 days of local audit retention with a hard
storage ceiling of 100 MiB, whichever limit is reached first. Operators MAY
approve a shorter period but MUST document it; extending either limit requires
human review because audit storage is a disclosure surface.

Rotation MUST prevent an individual active file from exceeding 10 MiB, use
atomic close-and-create behavior, retain chronological ordering, apply the same
permissions to every rotated file, and never compress or move records into Git,
evidence, or an unapproved remote system. When the retention or size ceiling is
reached, the implementation MUST remove the oldest closed records first and
MUST NOT delete the active file. Clock failure, disk-full state, permission
failure, and rotation failure MUST be visible and fail safely.

ATL-035 selects these security and retention outcomes, not a rotation library,
daemon, scheduler, or runtime implementation. That mechanism belongs to later
authorized implementation work.

## Negative-test matrix

The matrix remains inline because it is bounded and directly reviewable with
the contract.

| ID | Test | Required result |
| --- | --- | --- |
| N01 | Discover tools on a clean start | Exactly `get_server_info`; no implicit tool |
| N02 | Invoke unknown, case-variant, alias, or unregistered version | Reject before adapter construction; audit categorical rejection |
| N03 | Supply any input property, nested object, endpoint, field, timeout, or credential | `INVALID_INPUT`; no upstream connection |
| N04 | Attempt arbitrary SDK method, REST path/method, SPL, search, or shell input | No callable surface; reject and audit without echoing payload |
| N05 | Attempt configuration, user/role/token, index, app, deployment, restart, reload, or delete operation through MCP | No callable surface; zero mutation |
| N06 | Attempt representative mutation directly with `atlas_mcp_v1` after provisioning | Splunk independently denies it; no state change |
| N07 | Inspect effective production role | Only approved explicit capability; no inheritance, index access, search, write, or administration |
| N08 | Use missing, empty, malformed, revoked, expired, or invalid token | Fail closed with sanitized category; no secret disclosure |
| N09 | Inspect arguments, environment, image history, mounts, logs, output, audit, evidence, and repository | No token or secret value; only approved file-path interfaces where applicable |
| N10 | Use missing, old, unrelated, or malformed CA; wrong hostname; invalid/expired leaf | TLS fails before authentication; no bypass or HTTP fallback |
| N11 | Present valid Atlas chain for `atlas-search-head` | Normal chain and hostname verification succeed without compatibility flags |
| N12 | Return missing, extra, oversized, control-character, or malformed upstream fields | Missing values stay null; extra fields removed; unsafe data bounded, warned, or rejected |
| N13 | Force upstream timeout, unavailability, authentication, authorization, malformed response, and internal exception | Correct stable error class; no raw exception, HTTP body, credential, or sensitive data |
| N14 | Exercise success, rejection, TLS/auth failure, timeout, and internal failure | One metadata-only audit event per attempt with matching correlation context |
| N15 | Cause audit permission, disk-full, clock, retention, or rotation failure | Failure is visible and safe; no unaudited success claim or permissive fallback |
| N16 | Inspect container/network state | Non-root, hardened disposable stdio runtime; no MCP listener, published port, broad mount, or host TCP 8089 publication |
| N17 | Revoke the token and start a new session | Authentication fails; removed token file is not recreated or recovered by the service |
| N18 | Request Deployment Server, Indexer-direct, repository-state, additional metadata, or bounded-search access | Not registered; no connection or alternate source |

Later validation MUST capture evidence no broader than the tests actually run.
Tests MUST use non-secret fixtures and MUST review all captured surfaces before
publication.

## Operational stop conditions

Implementation or validation MUST stop for human review if:

- `get_metadata` is insufficient or any extra Splunk capability appears needed;
- the effective identity can mutate, search, access indexes, or inherit a
  broader role;
- `server/info` requires a generic request path or returns data that cannot be
  safely minimized;
- verified TLS or `atlas-search-head` hostname validation cannot be retained;
- the secret must enter arguments, ordinary environment variables, source, or
  an image layer;
- audit persistence requires a broad mount, sensitive payload, or silent
  failure mode;
- any unregistered or prohibited operation reaches the adapter or Splunk;
- the implementation would add a listener, publish TCP 8089, access the
  Deployment Server, or change Splunk; or
- satisfying the work requires ATL-036 or later scope without a separately
  approved Active Batch.

## Traceability

| Contract area | Canonical source | M06 relevance |
| --- | --- | --- |
| Containerized stdio, internal Search Head path, no listeners or published TCP 8089 | EP-003; DEC-027; ATL-034/BATCH-008 | MCP handshake and preserved network boundary |
| Dedicated identity, zero-mutation role, revocable token, runtime secret | EP-003; DEC-027; ATL-034 | Independent authorization and approved authentication path |
| Atlas root, SAN hostname verification, required EKU, fail-closed TLS | EP-003 Decision 7 amendment; ATL-042/BATCH-009 | Verified authenticated transport |
| Sole explicit `get_server_info` registry and fixed adapter | EP-003; DEC-027; ATL-034 | Approved, versioned read-only contract |
| Three normalized fields and evidence envelope | ATL-034/BATCH-008; EP-003 output model | Bounded, attributable, truthful evidence |
| Sanitization and structured errors | EP-003; ATL-034 | Secret-safe unavailable/failure behavior |
| Metadata-only local audit and retention controls | EP-003; DEC-027 | Reviewable permitted and prohibited behavior |
| Negative tests and stop conditions | EP-003 validation standard; ATL-038 future scope | Defines required later proof without claiming M06 validation |

The contract contributes specifications needed by the twelve EP-003 success
criteria, but ATL-035 performs no production implementation or live validation.
M06 therefore remains Planned / Not Validated.

## Change control

Editorial corrections that do not change meaning may retain Version 1.0.0.
Any change to identity permissions, secret interface, trust model, network
boundary, registered tools, adapter endpoint, inputs, output fields, size
bounds, error disclosure, audit content, or retention security requirements
requires human review and a version increment. A material change to EP-003 or
DEC-027 also requires the appropriate proposal or decision process.
