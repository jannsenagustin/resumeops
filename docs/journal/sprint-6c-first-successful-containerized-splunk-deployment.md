# Build Record 01 — Indexer Deployment

## Summary

Atlas successfully deployed its first Splunk Enterprise service with Docker
Compose. Docker Desktop was installed and operational, WSL was configured, and
the Compose configuration validated successfully before deployment. The
environment variables were configured, the official Splunk image was pulled,
and Docker created the Atlas network and persistent volumes.

The `atlas-indexer` service was deployed and reported a healthy status. Splunk
Web was accessible, and an administrator login completed successfully.

This milestone validates one containerized Splunk Enterprise service. It does
not validate distributed search, clustering, HTTP Event Collector (HEC), SC4S,
dashboards, detections, or production workloads.

## Engineering Decisions

### Fixed Splunk image

Atlas uses `splunk/splunk:10.0.8-rhel9`. A fixed patch release was selected
instead of a floating major tag so that deployments remain reproducible.

### Compose-managed infrastructure

Infrastructure is defined as code with Docker Compose. Service and
infrastructure definitions remain in `docker-compose.yml`, while environment-
specific values remain in `.env`. This separation keeps the deployment model
reviewable without embedding environment values in the Compose definition.

## Validation

The following command was run before deployment:

```text
docker compose config
```

The command expanded the configuration correctly, substituted the configured
environment variables, and completed successfully. This confirmed that Compose
could parse and resolve the deployment definition before containers were
created.

## Deployment

The Indexer was started with:

```text
docker compose up atlas-indexer
```

During deployment, Docker downloaded the image, created the Atlas network and
persistent volumes, and created the `atlas-indexer` container. The container's
health check subsequently passed.

## Evidence

The following files in the
[Milestone 01 evidence folder](../evidence/milestone-01-first-containerized-deployment/)
are the first operational deployment evidence captured for Atlas:

- [Compose configuration validation](../evidence/milestone-01-first-containerized-deployment/2026-08-01_001_compose_validation.png)
- [Healthy `atlas-indexer` container](../evidence/milestone-01-first-containerized-deployment/2026-08-01_002_container_healthy.png)
- [Docker Desktop container view](../evidence/milestone-01-first-containerized-deployment/2026-08-01_003_docker_desktop.png)
- [Successful Splunk administrator login](../evidence/milestone-01-first-containerized-deployment/2026-08-01_004_first_successful_login.png)

## Lessons Learned

- Validate the Compose model before attempting deployment.
- Keep infrastructure configuration separate from environment-specific
  deployment values.
- Use persistent volumes so Splunk state is independent of the container
  lifecycle.
- Publish only ports required for host access.
- Keep internal management ports internal unless troubleshooting requires
  temporary host access.

## Current Project Status

| Capability | Status |
| --- | --- |
| Docker | Operational |
| Indexer | Operational |
| Search Head | Not yet deployed |
| Deployment Server | Not yet deployed |
| Distributed Search | Planned |
| HEC | Planned |
| SC4S | Planned |
| Detection Engineering | Planned |

## Subsequent checkpoint

Milestone 02 subsequently:

- inspect the running container;
- study Docker networking, volumes, labels, and health checks;
- deployed the Search Head; and
- validated shared-network membership between services.

## Engineering Verdict

Atlas successfully transitioned from architecture documentation to an
operational Docker-based deployment. The deployment architecture, Compose
configuration, networking, persistence strategy, and container lifecycle were
validated through the successful deployment of the first Splunk Enterprise
service. Atlas is ready for expansion with additional Splunk roles.
