# Atlas Engineering Evidence

This directory organizes engineering evidence collected throughout Atlas
development. Its purpose is to make validation artifacts discoverable months
after a milestone is completed.

Evidence should answer three questions:

- What changed?
- How was it validated?
- What proof exists?

Evidence does not exist for cosmetic purposes. Every screenshot or exported
artifact should support an engineering milestone by demonstrating
implementation, configuration, validation, operation, or troubleshooting.
This repository is not a gallery or marketing material.

## Directory Structure

Each numbered directory corresponds to an Atlas engineering milestone. Use
`archive/` for superseded or historical evidence that must be retained but no
longer represents the current implementation.

```text
evidence/
|-- README.md
|-- milestone-01-first-containerized-deployment/
|-- milestone-02-search-head/
|-- milestone-03-deployment-server/
|-- milestone-04-distributed-search/
|-- milestone-05-data-ingestion/
|-- milestone-06-detection-engineering/
|-- milestone-07-observability-integrations/
`-- archive/
```

## Filename Convention

Use the following format for screenshot evidence:

```text
YYYY-MM-DD_milestone-##_###_description.png
```

Examples:

```text
2026-08-01_milestone-01_001_compose_validation.png
2026-08-01_milestone-01_002_container_healthy.png
2026-08-01_milestone-01_003_docker_desktop.png
```

Use a sortable sequence number and a short, specific description. Do not use
generic names such as `Screenshot (12).png`, `image.png`, or `capture.png`.

## Evidence Handling

- Capture only the information needed to prove the validation outcome.
- Remove or obscure credentials, tokens, host-specific secrets, and unrelated
  personal information before committing an artifact.
- Record the purpose of each artifact in the relevant milestone README.
- Keep exported dashboards and diagrams with the milestone they validate.
- Place superseded evidence in `archive/` with context instead of silently
  deleting engineering history.

Existing Atlas screenshots remain in `screenshots/` and
`screenshots/history/`. They should not be moved automatically. When they are
manually curated into this repository, preserve the originals until all
documentation links have been reviewed, use the filename convention above, and
update the applicable milestone README.

## Future Evidence

Expected evidence includes Search Head and Deployment Server deployments,
distributed search, HEC, SC4S, Grafana, OpenTelemetry, Detection Engineering,
dashboard and alert validation, infrastructure diagrams, Docker networking,
and troubleshooting captures. An artifact belongs here only after it supports
a documented engineering activity or validation result.
