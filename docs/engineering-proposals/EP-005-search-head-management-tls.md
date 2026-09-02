# EP-005 — Standards-valid Search Head Management TLS

> Parser-readiness note: Preserve this proposal's heading levels, field labels,
> identifier, and controlled status.

**Status:** Approved

**Origin:** ATL-034 / BATCH-008 verified-TLS architecture blocker under approved EP-003

## Problem

ATL-034 proved the Atlas MCP stdio lifecycle and one-tool registry but could not
complete a verified Splunk SDK connection to the Search Head management
interface. TCP 8089 presents a leaf for `SplunkServerDefaultCert` and the
self-signed `SplunkCommonCA`. The presented root exactly matches Splunk's public
`ca.pem` and `cacert.pem`, but it has no CA extensions. Modern Python/OpenSSL
rejects it as `invalid CA certificate` under normal verification.

EP-003 requires certificate and hostname verification to remain enabled and
permits a new Atlas CA only when inspection proves one is required. BATCH-008
supplied that evidence. Compatibility flags, leaf pinning, or disabled checks
would weaken the approved boundary.

## Why it matters

Atlas MCP cannot authenticate the Search Head until TCP 8089 presents a
standards-valid chain for the Docker DNS identity the client uses. Remediation
must preserve the validated M05 Search Head/Indexer relationship, internal-only
management boundary, rollback capability, and separation of public trust
material from private keys.

## Proposed approach

Create a dedicated Atlas internal root CA and issue one Search Head certificate
for the splunkd management endpoint. The X.509v3 root must have critical
`basicConstraints = CA:TRUE` and certificate-signing key usage. The leaf must
have:

- `subjectAltName = DNS:atlas-search-head`;
- `basicConstraints = CA:FALSE`;
- TLS-server key usage;
- critical extended key usage `serverAuth, clientAuth` because the single shared
  `[sslConfig]` certificate also serves the KV Store TLS boundary;
- bounded validity and documented serial and fingerprint.

Use `atlas-search-head` as the SDK host so normal hostname verification evaluates
the SAN directly. Keep the offline CA private key outside Git, Docker build
contexts, evidence, and Splunk containers under human control. Place only the
Search Head private-key/certificate bundle and public CA certificate in a
restricted Search Head path.

Configure supported Search Head `server.conf` `[sslConfig]` settings including
`enableSplunkdSSL = true`, `serverCert`, and `sslRootCAPath`. Keep
`requireClientCert = false`; EP-003 does not require mTLS. Apply the change only
through a separately approved batch after backup and configuration preflight.

The MCP client configuration remains conventional:

```python
tls_context = ssl.create_default_context(cafile="/trust/atlas-root-ca.pem")

splunk_client.connect(
    host="atlas-search-head",
    port=8089,
    scheme="https",
    splunkToken=token,
    autologin=False,
    verify=True,
    context=tls_context,
)
```

## Alternatives considered

### Dedicated Atlas internal CA and SAN certificate — recommended

This is the smallest complete trust hierarchy Atlas owns. It supports Docker
DNS, normal Python/OpenSSL verification, and deliberate rotation. Its cost is
protecting an offline CA key and documenting issuance, renewal, and revocation.

### Existing private organizational CA

This is viable if the human already operates a standards-valid CA that can issue
for `atlas-search-head`. No such dependency is documented. Adopting one would
require explicit ownership, availability, policy, and rollback approval.

### Publicly trusted certificate

Public CAs generally cannot issue for an internal Docker-only short name. Adding
public DNS or publishing management interfaces solely for certificate issuance
would enlarge the boundary and is rejected.

### Self-signed leaf or compatibility flags

Leaf pinning, partial-chain or legacy flags, disabled hostname/chain checks, or
acceptance of the extensionless Splunk root would preserve the defect exposed by
BATCH-008. This option is rejected.

### Replace TLS across all Atlas Splunk roles

A uniform PKI could have future value, but replacing Search Head, Indexer,
forwarding, Deployment Server, and Web certificates together materially expands
risk. EP-005 proposes only the Search Head splunkd management/KV boundary needed
to unblock verified MCP access.

## Benefits

- Enables normal Python/OpenSSL certificate and SAN verification.
- Replaces the generic `SplunkServerDefaultCert` identity.
- Keeps TCP 8089 internal and adds no MCP listener or host port.
- Provides a deliberate, rotatable public trust anchor.
- Preserves EP-003's fail-closed TLS requirement.

## Risks

- Incorrect certificate or `server.conf` configuration can prevent Search Head
  management access or container health.
- `[sslConfig]` can affect distributed-search and KV Store relationships.
- CA private-key loss or disclosure prevents safe future issuance or compromises
  trust.
- SAN, key-usage, EKU, chain-order, or permission errors can reproduce failure.
- Evidence can accidentally expose keys or secret-bearing configuration.

Mitigations are offline CA-key isolation, complete pre-change backup,
certificate/configuration linting, Search Head-only scope, restart health gates,
explicit rollback criteria, and metadata-only evidence.

## Splunk configuration impact

Implementation adds one restricted certificate directory and a local
`[sslConfig]` override on the Search Head. Splunk documents `serverCert` as the
PEM path containing the private key and server certificate and `sslRootCAPath`
as the public CA trust path. Applying a management-port certificate requires a
splunkd restart, after which Splunk can tighten certificate file permissions.

No Indexer, forwarding receiver, Deployment Server, Splunk Web, firewall,
Docker port, MCP transport, or tool-contract change is proposed. Preflight must
identify every Search Head consumer of `[sslConfig]`, especially distributed
search and KV Store.

## Rollback

Before change, create a recoverable backup of the Search Head `etc` volume and
record effective pre-change `[sslConfig]` values without publishing secrets.
Preserve prior certificate references and configuration.

Rollback triggers include failed container health, Web, management TLS,
distributed-search peer health or remote execution, KV Store health where
applicable, or normal chain/SAN verification. Rollback restores the prior
`server.conf` and certificate references, restarts only the Search Head, and
revalidates the pre-change baseline. Record rollback as exercised or explicitly
available but unexercised; do not conflate the two.

## Validation

Positive validation must demonstrate:

- correct root and leaf constraints, key usage, EKU, validity, and fingerprints;
- SAN `DNS:atlas-search-head`;
- offline `openssl verify` success against the public Atlas root;
- successful `openssl s_client` verification over internal TCP 8089;
- Python default `SSLContext` and Splunk SDK success with hostname checking;
- healthy Search Head, Indexer, Web, distributed-search peer relationship, and
  bounded remote execution proving Indexer participation;
- no new host-published TCP 8089 or MCP listener.

Negative validation must reject the old CA, wrong CA, wrong hostname, missing
trust material, and safely reproducible invalid-validity cases. Verification
flags must never be disabled to obtain success.

## Evidence

Publish only metadata and redacted proof:

- public root and leaf subjects, issuers, SAN, constraints, EKU, validity,
  serials, and SHA-256 fingerprints;
- verification and TLS handshake results;
- effective non-secret `[sslConfig]` paths and booleans;
- before/after container, Web, distributed-search, port, and SDK summaries;
- backup checkpoint identity and rollback result;
- secret-absence review.

Never publish private keys, key passwords, combined PEM contents, tokens,
administrator credentials, secret-bearing configuration, secretful Docker
inspection, or unreviewed screenshots.

## EP-003 impact

EP-003 remains approved and its fail-closed TLS decision remains correct.
EP-003 Decision 7 records that BATCH-008 proved a new Atlas CA necessary and
that the public Atlas root plus a SAN-valid Search Head leaf are the approved
trust material. Transport, identity, secret injection, SDK adapter, policy,
audit, tool, and deferred-capability decisions do not change.

## M06 scope impact

TLS remediation is a prerequisite to resume ATL-034, not evidence that ATL-034
or M06 succeeded. Certificate issuance, Search Head configuration, restart,
rollback, and regression testing exceed the current spike. Approval created
ATL-042 as one bounded inactive prerequisite, but did not activate it, alter
BATCH-008 scope, activate ATL-035 through ATL-041, or change M06 from Planned /
Not Validated.

After remediation is separately accepted, human review may authorize ATL-034 to
provision a new short-lived token and resume at the verified SDK gate. No MCP
foundation or production tool enters scope.

## Dependencies

- Approved EP-005.
- Human-controlled offline CA private-key storage.
- Recoverable Search Head `etc` backup and known-good M05 baseline.
- Exact Splunk 10.0.8 certificate-bundle and `[sslConfig]` implementation plan.
- ATL-042 in Backlog and a separately approved Active Batch for TLS remediation.
- Human approval before BATCH-008 resumes.

## Estimated effort

One bounded infrastructure batch covering certificate profile and issuance,
preflight, Search Head-only installation, one controlled restart, verification,
distributed-search/KV regression checks, rollback validation or an explicit
unexercised-rollback record, evidence review, and documentation reconciliation.

## Recommendation

Use a dedicated Atlas internal CA with one standards-valid Search Head leaf
whose SAN contains `atlas-search-head` and whose critical extended key usage is
`serverAuth, clientAuth`. Limit implementation to the Search Head splunkd
management/KV boundary, retain normal certificate and hostname verification,
and require ATL-042 to be separately activated and accepted before ATL-034
resumes.

## Decision

Human approved EP-005 on 2026-09-02 with
`extendedKeyUsage = critical, serverAuth, clientAuth` for the single shared
Search Head certificate. Approval establishes the standards-valid Atlas
internal CA trust model and creates ATL-042 as an inactive prerequisite. It does
not authorize certificate generation, configuration change, restart, backlog
activation, BATCH-008 resumption, or milestone-state change.

## Related backlog items

- ATL-042 — Search Head management TLS remediation

## Source documents

- [EP-003 — Atlas MCP Platform](EP-003-atlas-mcp-platform.md)
- [BATCH-008 execution report](../execution-reports/BATCH-008.md)
- [Milestone 06 Vision](../milestone-06-vision.md)
- [Project Atlas Milestones](../milestones.md)
- [DEC-027 — Atlas MCP Version 1 architecture](../planning/DECISIONS.md#dec-027--atlas-mcp-version-1-architecture)
- [Canonical Documentation Ownership Matrix](../documentation/OWNERSHIP_MATRIX.md)
