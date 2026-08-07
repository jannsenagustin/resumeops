# Atlas Milestones

Git history contains the detailed development record. This table is the active
project status. The [Atlas engineering evidence repository](evidence/README.md)
defines how validation artifacts are organized.

| Milestone | Status | Outcome | Evidence |
| --- | --- | --- | --- |
| 01 · Indexer Deployment | Complete / Validated | Deployed a healthy Splunk Enterprise Indexer and verified Splunk Web access | [Engineering log](journal/sprint-6c-first-successful-containerized-splunk-deployment.md), [evidence](evidence/milestone-01-first-containerized-deployment/) |
| 02 · Search Head Deployment | Complete / Validated | Deployed a healthy Search Head alongside the Indexer on `atlas-network` | [Engineering log](journal/sprint-6d-search-head-deployment.md), [evidence](evidence/milestone-02-search-head/) |
| 03 · Distributed Search | Complete / Validated | Registered the Indexer as a healthy search peer and verified remote execution from the Search Head | [Engineering log](journal/sprint-6e-distributed-search.md), [evidence](evidence/milestone-03-deployment-server/) |
| 04 · Deployment Server | Roadmap | Deploy and validate the forwarder-management role | — |
| 05 · Data Ingestion | Roadmap | Implement and validate an evidence-backed ingestion path | — |
| 06 · Detection Engineering | Roadmap | Build detections only after validated data is searchable | — |
