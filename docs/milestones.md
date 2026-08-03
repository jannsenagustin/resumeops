# Atlas Milestones

Git history contains the detailed development record. This table is the active
project status. The [Atlas engineering evidence repository](evidence/README.md)
defines how validation artifacts are organized without changing the statuses
recorded below.

| Milestone | Status | Outcome | Evidence |
| --- | --- | --- | --- |
| 01 · First Containerized Deployment | Validated | Deployed the first Splunk Enterprise service as a healthy Docker container and verified Splunk Web access | [Engineering log](journal/sprint-6c-first-successful-containerized-splunk-deployment.md), [evidence](evidence/milestone-01-first-containerized-deployment/) |
| 02 · Search Head Deployment | Next | Inspect the running Indexer, deploy the Search Head, and validate service communication | Evidence added after validation |
| 03 · Deployment Server | Roadmap | Deploy and validate the forwarder-management role | — |
| 04 · Distributed Search | Roadmap | Configure and validate the Search Head-to-Indexer relationship | — |
| 05 · Data Ingestion | Roadmap | Implement and validate an evidence-backed ingestion path | — |
| 06 · Detection Engineering | Roadmap | Build detections only after validated data is searchable | — |
