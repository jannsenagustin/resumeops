# Project Atlas Deployment Plan

## 1. Prerequisites

- Confirm the current branch is `feature/home-lab`.
- Install and start Docker Desktop with Docker Compose available.
- Confirm sufficient host and Docker Desktop resources.
- Select a supported `splunk/splunk` image tag from official Splunk sources.
- Read and accept the applicable Splunk license and general terms.
- Confirm the proposed localhost Web ports are available.
- Confirm `.env` and license files are ignored by Git.

## 2. Environment Setup

1. Change to `infrastructure/atlas`.
2. Copy `.env.example` to `.env`.
3. Replace the image-version placeholder with the verified tag.
4. Set a strong local `SPLUNK_PASSWORD`.
5. Set the license and general-terms arguments only after reviewing the terms.
6. Adjust the proposed host Web ports if they conflict.
7. Run `docker compose config` and review the resolved configuration without sharing its secret values.

## 3. Network and Volume Creation

Docker Compose is expected to create:

- Dedicated bridge network `atlas-network`
- `atlas-search-head-var`
- `atlas-search-head-etc`
- `atlas-indexer-var`
- `atlas-indexer-etc`
- `atlas-deployment-server-var`
- `atlas-deployment-server-etc`

No manual pre-creation should be necessary. Verify the actual objects after startup rather than assuming creation succeeded.

## 4. Container Startup

Start the services from `infrastructure/atlas`:

```powershell
docker compose up -d
docker compose ps
```

Inspect initialization without exposing credentials:

```powershell
docker compose logs --tail=100
```

Wait for each service to finish initial provisioning. A running container alone does not prove that Splunk Web or the intended role is ready.

## 5. Role Verification

Verify:

1. Each container remains running without a restart loop.
2. Each Web interface responds on its configured localhost port.
3. The administrator can sign in using the local credential.
4. Each instance reports the intended server name.
5. The six named volumes exist and are mounted to the expected paths.
6. Each container resolves the other service names on `atlas-network`.
7. The Search Head hosts the initial Monitoring Console configuration.

Record actual results in the [verification checklist](verification-checklist.md).

## 6. Distributed-Search Setup

The Compose file does not automate distributed-search authentication. Configure the Indexer as a search peer from the Search Head only after both services are healthy.

### Intended Endpoint

Use the Indexer's Docker service name and internal management endpoint:

```text
atlas-indexer:8089
```

This is an internal Docker-network endpoint. Management ports are not published to the Windows host by default.

### Authentication

An authenticated Splunk administrator session is required. Enter credentials interactively in Splunk Web or the Splunk CLI; do not place them in a committed command, shell history example, or documentation.

### Splunk Web Procedure

1. Sign in to the Search Head Web interface.
2. Open **Settings → Distributed search → Search peers**.
3. Add `atlas-indexer:8089` as a new search peer.
4. Supply administrator credentials interactively.
5. Confirm the peer is shown as available.

### CLI Verification

After interactive configuration, inspect peer status from inside the Search Head without embedding credentials in the command:

```powershell
docker compose exec atlas-search-head /opt/splunk/bin/splunk list search-server
```

The CLI may prompt for authentication depending on session state and selected image behavior.

### Expected Evidence

- Search peer listed in the Search Head distributed-search settings
- Peer status available without connection errors
- A later test search showing `atlas-indexer` in the `splunk_server` field

Do not record this step as successful until the evidence exists.

## 7. Deployment Server Preparation

The Deployment Server will use Splunk configuration areas under `/opt/splunk/etc`:

- `deployment-apps/` for future forwarder deployment apps
- `system/local/serverclass.conf` or an approved app-based equivalent for future server classes
- Forwarder Management in Splunk Web for future Universal Forwarder clients

Sprint 6B creates persistent storage for these areas but does not create fake clients or claim a connected deployment client. Sprint 6C will design and validate the actual forwarder configuration.

## 8. Evidence Capture

Capture the evidence listed in the [infrastructure overview](README.md#evidence-plan). Sanitize screenshots and command output before adding anything to Git.

## 9. Rollback

For a recoverable rollback, stop and remove containers while preserving volumes:

```powershell
docker compose down
```

Revert local `.env` changes manually or restore a known-good untracked copy. Re-run `docker compose config` before restarting.

> **Destructive option:** `docker compose down --volumes` deletes all Atlas persistent data and configuration. Use it only for an intentional clean rebuild after confirming that nothing must be retained.
