# Project Atlas Milestones

Git history contains the detailed development record. This table is the active
Atlas status. The [evidence map](evidence/README.md) defines how validation
artifacts are organized; the [repository roadmap](../ROADMAP.md) owns future
sequence and the [backlog](planning/BACKLOG.md) owns priorities.

| Milestone | Status | Outcome | Evidence |
| --- | --- | --- | --- |
| 01 · Containerized Splunk Foundation | Complete / Validated | Deployed a healthy Splunk Enterprise Indexer and verified Splunk Web access | [Canonical milestone](journal/sprint-6c-first-successful-containerized-splunk-deployment.md), [evidence](evidence/milestone-01-first-containerized-deployment/) |
| 02 · Search Head Deployment | Complete / Validated | Deployed a healthy Search Head alongside the Indexer on `atlas-network` | [Canonical milestone](journal/sprint-6d-search-head-deployment.md), [evidence](evidence/milestone-02-search-head/) |
| 03 · Distributed Search | Complete / Validated | Registered the Indexer as a healthy search peer and verified remote execution from the Search Head | [Canonical milestone](journal/sprint-6e-distributed-search.md), [evidence](evidence/milestone-03-distributed-search/) |
| 04 · Windows Event Ingestion via Universal Forwarder | Complete / Validated | Ingested Windows Application, Security, and System Event Logs and verified active forwarding plus distributed execution | [Canonical milestone](journal/sprint-6f-windows-event-ingestion.md), [evidence](evidence/milestone-04-windows-event-ingestion/) |
| 05 · Rocky Linux Deployment Server & Configuration Management | In Progress | Implement a dedicated Rocky Linux VM management path; no Deployment Server validation is claimed yet | — |
| 06 · Detection Engineering | Planned | Build detections only after suitable validated data and scope exist | — |
