# BATCH-009 — Execution Report

**Batch ID:** BATCH-009
**Date:** 2026-09-02
**Status:** Done

## Objective

Execute ATL-042 only: replace the Search Head's default splunkd management/KV
certificate path with the standards-valid Atlas internal CA trust model
approved in EP-005, validate the affected boundary, and stop before any
ATL-034/BATCH-008 resumption.

## Included Tasks

- ATL-042 — Search Head management TLS remediation.

## Completed

- Completed a read-only preflight of effective `[sslConfig]`, `[kvstore]`, and
  `[kvstoreSslClientConfig]` values and their source paths.
- Confirmed the shared management/KV certificate consumers, existing Splunk
  10.0.8 PEM structure, Search Head volume and permission model, internal DNS
  path, published-port boundary, and healthy pre-change baseline.
- Created the authoritative cold backup at
  `E:\Projects\atlas-backups\2026-09-02-batch-009-search-head-etc-cold-20260902-153720\atlas-search-head-etc.tar.gz`.
  The readable archive contains 10,393 entries, is 643,383,074 bytes, and has
  SHA-256
  `BB070E518638C8FBF17356D2AA282D2682A8B815BFE7689BBA2E7BD4C69B81E3`.
- Created a dedicated Atlas internal root whose encrypted private key remains
  under human control outside the repository, backup tree, Docker, Splunk,
  evidence, and screenshots. NTFS inheritance is disabled, and access is
  limited to the current Windows user and SYSTEM.
- Issued one Search Head leaf for `DNS:atlas-search-head` with critical
  `CA:FALSE`, critical digital-signature and key-encipherment usage, and
  `extendedKeyUsage = critical, serverAuth, clientAuth`.
- Installed only the Search Head server bundle and public Atlas root under a
  Search Head-local directory owned by `splunk:splunk`; the directory is mode
  `0700`, and both approved files are mode `0600`.
- Applied only the approved Search Head-local `[sslConfig]` values:
  `enableSplunkdSSL = true`, `requireClientCert = false`, `serverCert`, and
  `sslRootCAPath`.
- Performed one controlled remediation restart without stopping or modifying
  the Indexer.
- Confirmed Search Head process/container health, Splunk Web, KV Store, Indexer
  health, distributed-search peer health, bounded remote execution, internal
  TCP 8089, Docker network membership, and published ports after restart.
- Confirmed `[kvstoreSslClientConfig]` remains absent. KV Store uses the approved
  shared Search Head certificate and public Atlas root.
- Confirmed Splunk-generated `dp_ca.pem` and `dp_ca.srl` belong to the separate
  `[dataplaneSslConfig]` helper-process TLS boundary. The generated `dp_ca.pem`
  verifies `server_dp.pem`; it does not participate in the management/KV chain.

## Blocked

- None at closeout.

## Rejected

- No certificate or hostname verification bypass, compatibility or
  partial-chain flag, leaf pinning, mTLS expansion, host publication of TCP
  8089, MCP modification, another Splunk-role change, or unrelated scope was
  accepted.
- ATL-034/BATCH-008 was not resumed. ATL-035 through ATL-041 remain inactive.

## Files Changed

- Search Head runtime: restricted certificate directory and the four approved
  Search Head-local `[sslConfig]` settings.
- External security boundary: encrypted Atlas root key, public root, Search
  Head leaf/CSR/key, and assembled Search Head PEM bundle under the approved
  restricted host location.
- Canonical closeout documentation listed in this change set.

Private keys, passphrases, passwords, tokens, credentials, and secret-bearing
configuration are intentionally excluded from this report and repository.

## Validation Performed

- Root profile: self-issued; critical `CA:TRUE, pathlen:0`; critical certificate
  and CRL signing usage; self-verification passed.
- Root subject and issuer: `CN=Atlas-Internal-Root-CA, O=Project-Atlas`; serial:
  `3F407E63DE5B616DAECC8419B8A76D4C5C55C96F`; validity 2026-09-02 through
  2036-08-30.
- Root public certificate SHA-256:
  `02:DC:7A:72:D6:6A:E3:84:E5:E5:E6:E8:13:D6:41:E2:C5:FB:EC:91:C6:38:6B:57:AF:5D:05:98:58:9F:9D:A0`.
- Leaf subject: `CN=atlas-search-head, O=Project-Atlas`; issuer:
  `CN=Atlas-Internal-Root-CA, O=Project-Atlas`; serial:
  `6657C3D4D746B79CAE8AF9E77CFC88D1`; validity 2026-09-02 through
  2028-12-05.
- Leaf SHA-256:
  `FF:9E:A7:A1:48:88:F1:27:45:CD:0B:9E:6F:08:E0:B8:78:F4:77:3C:35:EF:2A:E3:FA:6E:D8:EA:35:69:B8:3D`.
- Leaf key/certificate match, SAN, constraints, key usage, critical EKU, chain,
  and hostname: passed before installation and from the installed/presented
  material.
- Internal management TCP 8089 and KV Store TCP 8191 both presented the Atlas
  leaf and public-root chain with normal OpenSSL hostname verification returning
  code 0.
- Python `ssl.create_default_context(cafile=<Atlas public root>)` retained
  `CERT_REQUIRED` and hostname checking and completed TLS 1.2 verification for
  `atlas-search-head`.
- Pinned `splunk-sdk==2.1.1` used the same normal SSL context and passed TLS to
  the expected HTTP 401 boundary with a deliberately invalid non-secret token;
  no MCP identity or credential was provisioned or reused.
- Old Splunk CA, unrelated CA, wrong hostname, missing trust, and an
  out-of-validity verification time all failed closed.
- Search Head and Indexer health, both Web endpoints, KV Store `ready` state,
  distributed peer `Up` state, and explicitly Indexer-backed bounded remote
  execution passed after restart.
- TCP 8089 remained unpublished; Search Head Web remained bound to
  `127.0.0.1:8000`; Indexer Web and receiver mappings remained unchanged.
- Repository private-key marker scan found none.

## Human Review Required

Completed on 2026-09-02. The human accepted Gate 1 preflight, the Gate 2
authoritative cold backup, Gate 3 remediation and technical validation, and the
final read-only Splunk data-plane certificate investigation. This closeout does
not authorize ATL-034/BATCH-008 resumption.

## Deviations

- The first backup attempt produced a readable archive but overlapped a Search
  Head restart and was rejected as non-authoritative. The accepted cold backup
  was recreated with the Search Head held stopped until the helper exited 0.
- An initial OpenSSL inspection ran as the container startup user and correctly
  received permission denied on the `0600` Splunk-owned trust file. The same
  validation passed as the actual `splunk` runtime identity without changing
  permissions.
- Splunk generated `dp_ca.pem`, `dp_ca.srl`, and `server_dp.pem` for its separate
  helper-process data plane after the CA-store path changed. Read-only
  inspection and the installed Splunk 10.0.8 specification established that
  this is expected Splunk-owned runtime behavior, not an Atlas management/KV
  trust expansion.

## Risks

- The encrypted Atlas root private key and its human-held passphrase require
  continued secure custody for renewal or revocation operations.
- The Search Head leaf expires on 2028-12-05; renewal must preserve the approved
  SAN, usage, trust, permission, and validation boundaries.
- The first non-authoritative backup archive remains outside the repository and
  must not be selected for rollback.

## Follow-up Backlog Items

- None created. A separate human decision is required before ATL-034/BATCH-008
  resumes.

## Final Status

Done. The human accepted ATL-042 and BATCH-009 on 2026-09-02. Rollback remains
available from the authoritative Gate 2 cold backup but was not exercised. M06
remains Planned / Not Validated; ATL-034/BATCH-008 remain open and stopped, and
ATL-035 through ATL-041 remain inactive.
