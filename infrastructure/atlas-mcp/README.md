# Atlas MCP Foundation

This directory is the production-oriented ATL-036 foundation for Atlas MCP
Version 1. It implements the digest-pinned Python container, fully pinned Python dependency set, stdio process lifecycle,
empty explicit registry, reject-by-default policy primitive, fixed Splunk SDK
connection boundary, runtime file interfaces, fail-closed TLS context,
bounded sanitization primitives, secret-safe structured errors, and a strictly
validated metadata-only audit sink.

ATL-036 intentionally registers no MCP tools and performs no live Splunk
operation. ATL-037 must explicitly register and implement the approved
`get_server_info` contract. The disposable architecture proof under
`spikes/atlas-mcp/` is historical input and is not imported by this runtime.

## Security boundary

- The only transport is stdio. The Compose definition has no `ports`,
  `expose`, or network listener configuration.
- The container joins only the external `atlas-network`, runs as UID 10001,
  drops all capabilities, prevents privilege escalation, and uses a read-only
  root filesystem.
- `ATLAS_MCP_TOKEN_FILE` and `ATLAS_MCP_CA_FILE` contain file paths, never
  credential or certificate values. The token file must be a regular file with
  no group or other permissions.
- The CA interface builds a normal default `SSLContext` with certificate and
  hostname verification retained. The future adapter fixes the only upstream
  host and port to `atlas-search-head:8089` over HTTPS.
- Audit records accept exactly the approved metadata fields, use mode `0600`,
  rotate before 10 MiB, retain at most 30 days and 100 MiB, and delete only the
  oldest closed files. Audit errors fail closed.

The protected token file, public Atlas root file, and audit directory are
operator-created host paths outside Git and publishable evidence. Compose
requires all three explicitly and mounts only the token and root read-only.

## Validation

Build the test stage and production image:

```text
docker build --target test -t atlas-mcp:test infrastructure/atlas-mcp
docker build --target runtime -t atlas-mcp:v1-foundation infrastructure/atlas-mcp
```

The test stage runs the standard-library unit and negative suite. Container
inspection must confirm UID 10001, no exposed ports, and the stdio entrypoint.
A protocol lifecycle test may initialize the disposable container, list the
empty tool surface, and terminate it. It must not mount credentials, join the
live Atlas network, or contact Splunk during ATL-036 validation.
