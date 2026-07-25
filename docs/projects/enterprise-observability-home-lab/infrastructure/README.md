# Project Atlas Infrastructure

Project Atlas is the codename for the Enterprise Observability Home Lab. Sprint 6B establishes a reproducible infrastructure foundation for three separate Splunk Enterprise roles on Docker Desktop:

- Search Head
- Indexer
- Deployment Server

The Linux log source and Universal Forwarder remain planned for Sprint 6C. This lab is not production-ready, and the files do not prove that any container has started successfully.

## Infrastructure Files

The deployable foundation is stored in [`infrastructure/atlas`](../../../../infrastructure/atlas/README.md):

- Docker Compose defines the three services.
- A dedicated `atlas-network` provides internal DNS and connectivity.
- Six named volumes persist `/opt/splunk/var` and `/opt/splunk/etc` separately for each role.
- `.env.example` describes local settings without committing credentials.

## Documentation

- [Deployment Plan](deployment-plan.md)
- [Environment Variables](environment-variables.md)
- [Verification Checklist](verification-checklist.md)
- [Troubleshooting](troubleshooting.md)

## Role Boundaries

### Search Head

The intended Search Head provides the user search interface and will later host dashboards, reports, alerts, knowledge objects, and the initial Monitoring Console. Sprint 6B must connect it to the Indexer as a search peer before distributed search can be claimed.

### Indexer

The intended Indexer will parse, index, and store events and respond to distributed searches. Forwarder receiving remains disabled until it is deliberately configured for Sprint 6C.

### Deployment Server

The intended Deployment Server will later manage Universal Forwarder deployment apps and server classes. It does not manage the Search Head or Indexer, and no forwarder client is currently connected.

## Resource Planning

All containers share one Windows gaming PC with Docker Desktop and therefore share the same physical CPU, memory, storage, and failure domain.

Initial resource planning remains proposed rather than guaranteed:

- Allocate enough CPU capacity for three Splunk processes while retaining host responsiveness.
- Allocate memory incrementally and observe container restarts, search responsiveness, and Windows pressure.
- Reserve storage for six persistent volumes and allow additional headroom for images, internal logs, and later indexed lab data.
- Review Docker Desktop resource limits before startup and adjust them only after observing container health and host performance.

The repository does not document the host's exact hardware. Final CPU, memory, storage, and Docker Desktop limits are open Sprint 6B decisions.

## Evidence Plan

Capture real evidence only after successful validation:

- Docker Desktop showing all Atlas containers
- Sanitized `docker compose ps` output
- Search Head login page
- Indexer login page
- Deployment Server login page
- `atlas-network` inspection
- Atlas persistent-volume listing
- Search Head distributed-search configuration
- Successful Indexer search-peer connection
- Relevant container health and log output

No placeholder image or fabricated screenshot should be presented as evidence.

## Current Validation State

The infrastructure files and documentation have been created. Runtime validation is deferred because Docker is not available in the current authoring environment and no local `.env` values have been configured.

## Official References

- [Splunk Docker image source](https://github.com/splunk/docker-splunk)
- [Published `splunk/splunk` image tags](https://hub.docker.com/r/splunk/splunk/tags)
- [Splunk component network ports](https://help.splunk.com/?resourceId=Splunk_InheritedDeployment_Ports)
- [Docker-Splunk persistent storage guidance](https://splunk.github.io/docker-splunk/STORAGE_OPTIONS.html)
- [Splunk distributed-search deployment](https://docs.splunk.com/Documentation/Splunk/latest/DistSearch/Overviewofconfiguration)
