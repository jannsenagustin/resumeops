# Atlas MCP Foundation

This directory contains the production-oriented ATL-036 foundation and the
ATL-037 `get_server_info` path for Atlas MCP Version 1. It implements the
digest-pinned Python container, fully pinned Python dependency set, stdio lifecycle,
single-entry explicit registry, reject-by-default policy, fixed Splunk SDK
connection boundary, runtime file interfaces, fail-closed TLS context,
bounded sanitization primitives, secret-safe structured errors, and a strictly
validated metadata-only audit sink.

ATL-037 registers exactly the approved `get_server_info` contract. It accepts
no tool arguments and performs only a single, finite-timeout `server/info` read.
The disposable architecture proof under
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
operator-created host paths outside Git. `compose.yaml` is the direct-bind
runtime for hosts that enforce the required POSIX modes.

Docker Desktop on Windows uses `compose.windows.yaml`. Its one-shot
`runtime-boundary-init` copies the protected host token into a Linux-backed
Docker volume without printing it, assigns UID/GID 10001, and enforces mode
`0400`; it also assigns the Linux-backed audit directory to UID/GID 10001 with
mode `0700`. The non-root MCP service mounts the token volume read-only and
writes only metadata-approved records to the audit volume. After review,
`audit-export` copies only the bounded audit JSONL files into the protected
Windows host audit directory. Removing the Compose volumes retires the staged
token and Linux-side audit copy. The public CA remains a read-only bind because
it is not secret and does not require writable POSIX semantics.

The Windows sequence is deliberately operator-controlled:

```text
docker compose -f infrastructure/atlas-mcp/compose.windows.yaml run --rm runtime-boundary-init
docker compose -f infrastructure/atlas-mcp/compose.windows.yaml run --rm -T atlas-mcp
docker compose -f infrastructure/atlas-mcp/compose.windows.yaml run --rm audit-export
docker compose -f infrastructure/atlas-mcp/compose.windows.yaml down --volumes
```

Only the three documented host-path variables are supplied. The token value
must never be placed in an environment variable, argument, log, protocol
message, exported evidence, or Git.

## Validation

Build the test stage and production image:

```text
docker build --target test -t atlas-mcp:test infrastructure/atlas-mcp
docker build --target runtime -t atlas-mcp:v1-get-server-info infrastructure/atlas-mcp
```

The test stage runs the standard-library unit and negative suite. Container
inspection must confirm UID 10001, no exposed ports, and the stdio entrypoint.
A protocol lifecycle test may initialize the disposable container and must
discover exactly `get_server_info`. Fixture validation runs without credentials
or network access. Live validation requires the separately protected runtime
token, public Atlas root, audit directory, and existing `atlas-network`; it must
not publish ports or introduce any additional tool or upstream operation. On
Docker Desktop for Windows, validation must use `compose.windows.yaml`, confirm
the staged token is `0400`, confirm audit files are `0600`, export the reviewed
metadata-only audit records, and remove the runtime volumes after the session.
