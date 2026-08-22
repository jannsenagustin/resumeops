# Atlas Engineering Evidence

This directory contains engineering evidence collected during Atlas
development. The engineering log explains each milestone; its evidence folder
contains the screenshots or exported artifacts that prove it.

Evidence should answer:

- What changed?
- How was it validated?
- What proof exists?

Evidence is not a gallery or a second documentation system. Milestone folders
contain only evidence artifacts, and filenames should be descriptive enough
that no additional README is required inside each folder.

## Filename Convention

Use:

```text
YYYY-MM-DD_###_description.png
```

Examples:

```text
2026-08-01_001_compose_validation.png
2026-08-01_002_container_healthy.png
2026-08-01_003_docker_desktop.png
2026-08-01_004_first_successful_login.png
```

Avoid generic names such as `Screenshot (12).png`, `image.png`, and
`capture.png`.

## Milestone 01 Evidence

Milestone 01 may contain evidence of:

- Compose validation;
- healthy container status;
- Docker Desktop operation;
- the first successful Splunk login.

Do not add placeholders for evidence that has not been captured.

## Milestone 02 Evidence

Milestone 02 contains evidence of healthy Search Head and Indexer containers,
successful Search Head administrator access, the multi-service Docker runtime,
and shared `atlas-network` membership.

## Milestone 03 Evidence

Milestone 03 contains the validation chain for distributed search: an enabled,
healthy Indexer search peer; a metadata search launched from the Search Head
that returns both Atlas hosts; and Job Inspector evidence showing
`dispatch.stream.remote.atlas-indexer`.

A local `server.conf` screenshot was deliberately excluded because it exposes
secret-bearing configuration values. The troubleshooting outcome is documented
textually without publishing those values.

## Milestone 04 Evidence

Milestone 04 contains only the five reviewed artifacts for Windows Event Log
ingestion: the running `SplunkForwarder` service, TCP 9997 loopback
connectivity, an active Splunk forwarding destination, searchable Application,
Security, and System data, and Job Inspector evidence of remote Indexer
execution. Secret-bearing `server.conf` and installer screenshots are excluded.

## Milestone 05 Evidence

The `milestone-05-data-ingestion` folder contains reviewed infrastructure
evidence for the dedicated Rocky Linux Deployment Server VM. The ATL-001
baseline set covers host identity and resources, network connectivity, package
and kernel updates, required administration tools, and NTP synchronization.
The security-baseline result includes SELinux, firewalld, and listening-service
validation, but its screenshot remains unpublished pending redaction of a
persistent interface identifier. These records validate the operating-system
foundation only; they do not claim that Splunk Enterprise is installed or that
the Deployment Server role is configured.
