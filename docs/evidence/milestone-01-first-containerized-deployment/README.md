# Milestone 01: First Containerized Deployment

## Objective

Validate the first Docker Compose deployment of a Splunk Enterprise service for
Atlas.

## Expected Evidence

| Planned filename | Purpose |
| --- | --- |
| `001_compose_validation.png` | Shows that the Compose model expanded successfully and accepted the configured environment values before deployment. |
| `002_container_healthy.png` | Shows the running `atlas-indexer` container after its health check passed. |
| `003_docker_desktop.png` | Shows Docker Desktop operating as the local container runtime. |
| `004_first_successful_login.png` | Shows successful administrator access to Splunk Web. |
| `005_target_architecture.png` | Records the intended service topology against which the first deployment is evaluated. |

Committed screenshots should receive the date and milestone prefix described in
the [evidence filename convention](../README.md#filename-convention).

## Validation Status

The first `atlas-indexer` deployment and administrator login are validated. The
existing captures remain in `screenshots/history/` and should be manually
curated here under the preferred filenames only after documentation links are
reviewed. This organizational structure does not add new validation claims.

## Future Notes

Add Compose validation, Docker Desktop, and target-architecture captures when
sanitized evidence is available. Record the command, date, and result associated
with each artifact.
