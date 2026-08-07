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
