# BATCH-008 — Execution Report

**Batch ID:** BATCH-008
**Date:** 2026-09-01
**Status:** Done

## Objective

Execute ATL-034 only: prove the smallest approved VS Code + Codex,
containerized stdio, TLS-verified Splunk Python SDK, Search Head observation,
sanitization, and audit path without expanding the production MCP surface or
network boundary.

## Included Tasks

- ATL-034 — M06 Atlas MCP architecture spike.

## Completed

- Confirmed BATCH-008 and ATL-034 were the only active execution scope.
- Started the existing Docker Desktop runtime without changing configuration.
- Started only the existing `atlas-indexer` and `atlas-search-head` containers.
- Confirmed both containers returned to their existing healthy state using
  `splunk/splunk:10.0.8-rhel9`.
- Confirmed Search Head Web remained published only on `127.0.0.1:8000`, Indexer
  Web only on `127.0.0.1:8001`, receiver traffic only on `127.0.0.1:9997`, and
  Splunk TCP 8089 remained unpublished to the host.
- Inspected the certificate presented by the Search Head management interface:
  CN `SplunkServerDefaultCert`, issuer `SplunkCommonCA`, validity from
  2026-08-05 through 2029-08-04, SHA-256 fingerprint ending `0F:1E`, and no SAN
  extension.
- Drafted isolated, disposable spike assets with pinned MCP and Splunk SDK
  dependencies, one spike-only diagnostic tool, sanitization, and metadata-only
  audit output.
- After human approval, created protected host secret and trust directories whose
  ACLs allow only the human Windows account and SYSTEM.
- Human manually created the dedicated role, identity, and short-lived token in
  Splunk Web; administrative provisioning was not automated.
- Verified the host token file existed, was non-empty, and retained the approved
  ACL without reading, printing, or reporting its contents or length.
- Built `atlas-mcp-spike:batch-008` from a 2.59 KB build context containing only
  the spike source, Dockerfile, and pinned dependency file.
- Launched the container as non-root with a read-only root filesystem, dropped
  capabilities, `no-new-privileges`, no published ports, separate read-only
  token and trust mounts, and a protected audit mount.
- Completed MCP initialization over stdio using protocol version 2025-06-18.
- Confirmed tool discovery exposed only `atlas_mcp_spike_server_info`.
- Confirmed the first tool invocation failed closed at TLS verification and
  returned no Splunk observation or secret.

## Historical Blocker

The initial automated dedicated-identity design was correctly rejected before
execution. Human review then approved a manual Splunk Web provisioning and
protected host-secret design, and the human completed those actions.

The original blocker was TLS trust. The copied public Splunk CA bundle did not
validate the certificate chain presented by the Search Head management
interface. Python/OpenSSL failed with `CERTIFICATE_VERIFY_FAILED: self-signed
certificate in certificate chain`. A follow-up attempt to replace the CA bundle
with a public leaf extracted from the private-key-containing `server.pem` source
was rejected as a new trust approach after the TLS failure.

Human review then authorized read-only public-chain investigation. TCP 8089
presented two public certificates. The second is the self-signed
`SplunkCommonCA` certificate with serial `8D1C137CB63FC5C3`, validity from
2017-01-30 through 2027-01-28, and SHA-256 fingerprint
`F3:99:50:25:63:EF:CC:58:BE:EC:80:AB:20:6D:E3:B8:CE:A2:D1:B8:60:35:19:AD:71:58:E2:C4:42:37:4D:46`.
Both public `/opt/splunk/etc/auth/ca.pem` and `cacert.pem` report the same
metadata and fingerprint. The correct existing public trust anchor is therefore
identified without reading `server.pem` or any private key.

Read-only inspection of `splunk-sdk==2.1.1` identified the configuration error:
`caCertPath` is not consumed by `splunklib.binding.Context`. The supported API
accepts an `SSLContext` through `context`; the SDK HTTPS handler uses that
context only while `verify=True`. The proposed correction is to construct
`ssl.create_default_context(cafile="/trust/search-head-ca.pem")`, retain its
default `CERT_REQUIRED` and hostname checking, and pass both `verify=True` and
`context=tls_context` to `splunklib.client.connect`.

Human review approved that exact correction. The rebuilt spike retained
`verify=True`, default hostname verification against `SplunkServerDefaultCert`,
and the read-only public CA mount. MCP initialization and one-tool discovery
passed again, but the tool invocation failed closed before SDK data access with
`CERTIFICATE_VERIFY_FAILED: invalid CA certificate`. The matching self-signed
`SplunkCommonCA` has no CA extensions, so modern Python/OpenSSL rejects it as a
default trust anchor. Accepting it would require non-default verification
behavior, or the Search Head would require certificate infrastructure with a
standards-valid CA and hostname identity. Neither change was authorized.

After the stop, the human confirmed that the short-lived `atlas_mcp_spike` token
was revoked through Splunk Web and the protected host token file was deleted.
MCP execution did not resume. No token value entered Git, evidence, logs,
command arguments, build context, audit output, or MCP output.

## Resumed Execution — 2026-09-02

After the human accepted ATL-042/BATCH-009 and the Docker Desktop data
relocation, BATCH-008/ATL-034 resumed for the remaining bounded proof only. M06
remained Planned / Not Validated, and ATL-035 through ATL-041 remained inactive.

- Reconciled `ACTIVE_BATCH.md`, Backlog, and milestone projection state before
  resuming execution.
- Reused the pinned `mcp==1.26.0` and `splunk-sdk==2.1.1` dependencies, non-root
  image, stdio transport, runtime token-file interface, normal Python
  `SSLContext`, fixed `server/info` operation, sanitization envelope, and
  metadata-only audit path.
- Did not execute or copy the rejected automated identity provisioner into the
  image.
- Human interactively issued a new short-lived token for the existing bounded
  spike identity. The protected host token file was verified as non-empty with
  NTFS inheritance disabled and access limited to the current Windows user and
  SYSTEM; its contents and length were not read or reported.
- Copied only the public Atlas root into the protected runtime trust boundary.
  Its certificate SHA-256 fingerprint is
  `02:DC:7A:72:D6:6A:E3:84:E5:E5:E6:E8:13:D6:41:E2:C5:FB:EC:91:C6:38:6B:57:AF:5D:05:98:58:9F:9D:A0`.
- Renamed the sole spike tool to `get_server_info`, added an explicit one-tool
  allowlist, isolated the fixed `server/info` call in a purpose-built adapter,
  added Search Head attribution to the audit record, and sanitized upstream
  failures to a bounded generic error.
- Rebuilt `atlas-mcp-spike:batch-008`. The image runs as
  `atlas-mcp-spike`, declares no exposed ports, and contains no provisioning
  script.
- Ran the spike as a disposable foreground container with a read-only root
  filesystem, all capabilities dropped, `no-new-privileges`, no published
  ports, only `atlas-network`, and narrowly mounted token, public-root, and
  audit paths.
- Completed MCP initialization using protocol version `2025-06-18` and
  confirmed discovery returned exactly one tool: `get_server_info`.
- Completed the live tool call through the policy, purpose-built adapter,
  pinned SDK, and normal verified TLS path to
  `https://atlas-search-head:8089`.
- Returned only the bounded normalized version, server name, and server role,
  with source `atlas-search-head`, source role `search-head`, explicit
  `server/info` bounds, and sanitization metadata.
- Rejected the unregistered `run_search` request at the MCP tool registry.
- Rejected a deliberately invalid non-secret token with a generic error that
  exposed no HTTP, exception, token, or credential detail. The temporary test
  fixture was removed immediately afterward.
- Wrote structured metadata-only success and authentication-failure audit
  records. Repeated harness/parser checks produced five success and three
  expected authentication-failure records; all passed the secret-marker scan.
- Confirmed the Search Head and Indexer retained their original container IDs,
  remained healthy on `atlas-network`, kept their original port bindings, and
  did not publish TCP 8089.

The original ATL-034 end-to-end architecture question is now answered: the
approved containerized stdio, reject-by-default registry, purpose-built adapter,
pinned SDK, runtime secret, standards-valid TLS, bounded output, sanitization,
attribution, audit, and negative-authentication path operates without Splunk
mutation or a broader MCP surface. This result does not close ATL-034, validate
M06, or authorize implementation work.

## Stop Condition Applied

BATCH-008 requires an immediate return to human review when certificate
verification cannot be maintained or a new trust design is required. Execution
therefore stopped. No leaf substitution, unverified connection, administrator
credential reuse, HTTP substitution, TLS bypass, permission broadening, or
scope expansion was performed.

## Files Changed

- Planning and derived-state updates associated with BATCH-008 and ATL-034.
- `spikes/atlas-mcp/` disposable spike assets used to build and exercise the
  isolated stdio path, excluding the rejected `provision_identity.py` design
  from the recommended checkpoint.
- This in-progress execution report and the approved EP-005 trust proposal.

## Initial Validation Performed

- Existing Search Head and Indexer container health: passed after Docker startup.
- Existing host port boundary: passed; no host-published TCP 8089.
- Public certificate metadata inspection: completed.
- Protected host token presence and ACL: passed without reading the value.
- Token-free image build: passed.
- Hardened no-port container launch and clean `--rm` exit: passed.
- MCP stdio initialization: passed.
- Tool registry: passed; one spike-only tool.
- Approved SDK `SSLContext` correction and image rebuild: passed.
- Certificate and hostname verification: remained enabled.
- Correct existing public root: loaded, then rejected as `invalid CA certificate`.
- Verified TLS connection: failed closed before SDK data access.
- Bounded observation, audit record, invalid-authentication, unregistered-tool,
  role-mutation, secret-absence, and remaining negative checks: not completed
  because the TLS stop condition occurred first.
- Short-lived spike token revocation: human-confirmed.
- Protected host token-file deletion: human-confirmed.

## Resumed Validation Performed

- Canonical state audit: passed with M06 Planned / Not Validated and
  BATCH-008 mapped only to ATL-034.
- Public Atlas root copy and fingerprint: passed.
- Image source parse and pinned dependency versions: passed.
- Non-root image identity, absent exposed-port declaration, and absent rejected
  provisioner: passed.
- MCP initialization and clean disposable exit: passed.
- Tool registry: passed with exactly `get_server_info`.
- Normal Atlas-root certificate-chain and `atlas-search-head` hostname
  verification through the pinned SDK: passed.
- Fixed adapter endpoint: passed with `server/info` only.
- Bounded sanitized output and Search Head attribution: passed.
- Metadata-only audit success record and secret-marker scan: passed.
- Invalid authentication: failed closed with a generic sanitized error.
- Unregistered `run_search`: rejected by the MCP registry.
- Search Head and Indexer container identity, health, network, Web, and
  published-port boundary: unchanged and passed.
- Splunk mutation: none performed.

## Human Review Required

Human accepted the resumed architecture proof and authorized BATCH-008/ATL-034
closeout on 2026-09-02. The human revoked the short-lived
`atlas_mcp_spike` token through the approved Splunk Web boundary. The protected
host token file was then removed without reading or exposing its contents. The
dedicated bounded user and role remain unchanged. The proof does not activate
ATL-035 through ATL-041 or change M06 from Planned / Not Validated.

## Final Status

Done. Human accepted the original ATL-034 architecture question as answered and
closed BATCH-008 on 2026-09-02. The temporary token was revoked and its host
file removed. ATL-042 remains Done. M06 remains Planned / Not Validated, and
ATL-035 through ATL-041 remain inactive.
