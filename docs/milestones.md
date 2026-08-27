# Project Atlas Milestones

Git history contains the detailed development record. This table is the active
Atlas status. The [evidence map](evidence/README.md) defines how validation
artifacts are organized; the [repository roadmap](../ROADMAP.md) owns future
sequence and the [backlog](planning/BACKLOG.md) owns priorities.

| Milestone | Status | Validation State | Outcome | Evidence |
| --- | --- | --- | --- | --- |
| 01 · Containerized Splunk Foundation | Complete | Validated | Deployed a healthy Splunk Enterprise Indexer and verified Splunk Web access | [Canonical milestone](journal/sprint-6c-first-successful-containerized-splunk-deployment.md), [evidence](evidence/milestone-01-first-containerized-deployment/) |
| 02 · Search Head Deployment | Complete | Validated | Deployed a healthy Search Head alongside the Indexer on `atlas-network` | [Canonical milestone](journal/sprint-6d-search-head-deployment.md), [evidence](evidence/milestone-02-search-head/) |
| 03 · Distributed Search | Complete | Validated | Registered the Indexer as a healthy search peer and verified remote execution from the Search Head | [Canonical milestone](journal/sprint-6e-distributed-search.md), [evidence](evidence/milestone-03-distributed-search/) |
| 04 · Windows Event Ingestion via Universal Forwarder | Complete | Validated | Ingested Windows Application, Security, and System Event Logs and verified active forwarding plus distributed execution | [Canonical milestone](journal/sprint-6f-windows-event-ingestion.md), [evidence](evidence/milestone-04-windows-event-ingestion/) |
| 05 · Rocky Linux Deployment Server & Configuration Management | In Progress | Partially Validated | Established and validated the Deployment Server; client enrollment and controlled distribution remain | [evidence](evidence/milestone-05-data-ingestion/) |
| 06 · Atlas MCP Platform | Planned | Not Validated | Establish read-only AI integration with live Atlas engineering evidence | [EP-003](engineering-proposals/EP-003-atlas-mcp-platform.md) |
| 07 · Configuration Intelligence | Planned | Not Validated | Build the first major Atlas application on the validated MCP Platform | — |

## M05 — Rocky Linux Deployment Server & Configuration Management

**Current:** Yes
**Current Phase:** Deployment Server configured; client enrollment awaits activation
**Completed Work:** ATL-001; ATL-002; ATL-003
**Completed Foundation:** Rocky Linux VM commissioned and updated; Administration tools installed; Time synchronization validated; SELinux and firewalld baseline validated; Splunk Enterprise 10.0.8 installed and validated as a systemd-managed service under the `splunk` account; `TA-atlas-base` deployment app and `atlas-base` server class configured; effective configuration inspected; Deployment Server reloaded and recognized in Agent Management
**Active Work:** None
**Next Objective:** Human review and activation of ATL-004 — enroll the Windows Universal Forwarder with the Deployment Server
**Evidence:** evidence/milestone-05-data-ingestion/
**Boundary:** The Deployment Server app, server class, effective configuration, reload, and Web recognition are validated. Zero deployment clients is the expected baseline. Universal Forwarder enrollment and configuration distribution are not yet validated, and no batch currently authorizes that work.
