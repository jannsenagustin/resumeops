# BATCH-008 — Execution Report

**Batch ID:** BATCH-008
**Date:** 2026-09-01
**Status:** In Progress — stopped for human review

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

## Blocked

The initial automated dedicated-identity design was correctly rejected before
execution. Human review then approved a manual Splunk Web provisioning and
protected host-secret design, and the human completed those actions.

The active blocker is TLS trust. The copied public Splunk CA bundle did not
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

## Validation Performed

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

## Human Review Required

Human architecture review accepted EP-005 on 2026-09-02 with
`extendedKeyUsage = critical, serverAuth, clientAuth` for the single shared
Search Head certificate. ATL-042 records the bounded remediation prerequisite
in Backlog. Neither approval nor backlog creation authorizes certificate
generation, installation, restart, Splunk configuration, ATL-042 activation, or
BATCH-008 resumption. The existing public root cannot satisfy modern default CA
validation, and weakening OpenSSL verification remains prohibited.

## Final Status

In Progress — stopped at the approved security boundary. ATL-034 and BATCH-008
remain open and stopped at the verified-TLS gate. ATL-042 is an inactive
prerequisite. M06 remains Planned / Not Validated. ATL-035 through ATL-041 remain
inactive.
