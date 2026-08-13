# Project Atlas Infrastructure

This directory contains the reproducible Docker Compose foundation for Project Atlas, the Enterprise Observability Home Lab. It defines three separate Splunk Enterprise containers, a dedicated bridge network, and role-specific persistent volumes.

The configuration is an infrastructure foundation, not evidence of a successful deployment. It is intended for a learning lab on one Windows workstation and is not production-ready.

## Contents

- `docker-compose.yml` defines the Search Head, Indexer, Deployment Server, network, and volumes.
- `.env.example` documents required local configuration without containing real secrets.
- `.gitignore` excludes the local environment file, license files, and secret material.

## Prerequisites

- Windows host with Docker Desktop and Docker Compose
- Sufficient Docker Desktop CPU, memory, and storage allocation for three Splunk Enterprise instances
- A verified, supported `splunk/splunk` image tag
- Review and acceptance of the applicable Splunk license and general terms
- A strong local administrator password that meets the selected Splunk version's requirements
- Available localhost ports for the Web interfaces and Indexer receiver

Milestones 01 through 04 validate the Indexer, Search Head, distributed search,
and Windows Event Log ingestion. The Deployment Server remains undeployed.

## Local Secret Setup

From `infrastructure/atlas`, copy `.env.example` to `.env`:

```powershell
Copy-Item .env.example .env
```

Edit `.env`, select a verified image tag, replace the password placeholder, and set the license-acceptance arguments only after reviewing the applicable terms. The local `.env` file must never be committed.

Check that Git ignores it:

```powershell
git check-ignore -v infrastructure/atlas/.env
```

## Validate Before Starting

From `infrastructure/atlas`:

```powershell
docker compose config
```

Review the resolved output for the selected image tag, localhost port mappings, volume names, and absence of unintended values. Do not paste resolved secret values into tickets, screenshots, or committed evidence.

The Indexer receiver mapping is deliberately loopback-bound:

```text
127.0.0.1:${ATLAS_INDEXER_RECEIVER_PORT}:9997
```

This lets the Windows-host Universal Forwarder reach the containerized Indexer
without exposing the receiving port to the LAN. The forwarder target is
`127.0.0.1:9997`; Docker service DNS names apply only inside `atlas-network`.

## Start the Environment

Only after the local `.env` is complete:

```powershell
docker compose up -d
docker compose ps
```

Container startup does not prove role readiness. Follow the evidence sequence in
the [engineering narrative](../../CASE_STUDY.md#validation-and-evidence) and update the
[milestone record](../../docs/milestones.md) only after each result is verified.

## Stop the Environment

Stop and remove the containers while preserving named volumes:

```powershell
docker compose down
```

## Inspect Status and Logs

```powershell
docker compose ps
docker compose logs --tail=100
docker compose logs --tail=100 atlas-search-head
docker compose logs --tail=100 atlas-indexer
docker compose logs --tail=100 atlas-deployment-server
```

Inspect the network and volumes:

```powershell
docker network inspect atlas-network
docker volume ls --filter name=atlas-
```

## Reset the Environment Safely

`docker compose down` preserves persistent data. Use that command for normal shutdown and recreation.

> **Destructive reset:** `docker compose down --volumes` permanently deletes the Atlas named volumes and the Splunk data and configuration stored in them. Capture required evidence and confirm that no lab state must be retained before running it.

To perform a deliberate destructive reset:

```powershell
docker compose down --volumes
```

Never add license files, production data, or real credentials to this directory.
