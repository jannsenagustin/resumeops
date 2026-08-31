# Project Atlas Milestones

Git history contains the detailed development record. This table is the active
Atlas status. The [evidence map](evidence/README.md) defines how validation
artifacts are organized; the [repository roadmap](../ROADMAP.md) owns future
sequence and the [backlog](planning/BACKLOG.md) owns priorities.

`Active Work` is a machine-readable identifier field. Its only valid values are
`None` or `BATCH-NNN / ATL-NNN`. Review, Done, and In Progress belong in the
task or batch status field; never append status text or other prose to
`Active Work`.

| Milestone | Status | Validation State | Outcome | Evidence |
| --- | --- | --- | --- | --- |
| 01 · Containerized Splunk Foundation | Complete | Validated | Deployed a healthy Splunk Enterprise Indexer and verified Splunk Web access | [Canonical milestone](journal/sprint-6c-first-successful-containerized-splunk-deployment.md), [evidence](evidence/milestone-01-first-containerized-deployment/) |
| 02 · Search Head Deployment | Complete | Validated | Deployed a healthy Search Head alongside the Indexer on `atlas-network` | [Canonical milestone](journal/sprint-6d-search-head-deployment.md), [evidence](evidence/milestone-02-search-head/) |
| 03 · Distributed Search | Complete | Validated | Registered the Indexer as a healthy search peer and verified remote execution from the Search Head | [Canonical milestone](journal/sprint-6e-distributed-search.md), [evidence](evidence/milestone-03-distributed-search/) |
| 04 · Windows Event Ingestion via Universal Forwarder | Complete | Validated | Ingested Windows Application, Security, and System Event Logs and verified active forwarding plus distributed execution | [Canonical milestone](journal/sprint-6f-windows-event-ingestion.md), [evidence](evidence/milestone-04-windows-event-ingestion/) |
| 05 · Rocky Linux Deployment Server & Configuration Management | In Progress | Partially Validated | Centrally delivered input and output configuration to the Windows Universal Forwarder and validated end-to-end searchable ingestion | [Canonical milestone](journal/milestone-05-deployment-server-foundation.md), [evidence](evidence/milestone-05-data-ingestion/) |
| 06 · Atlas MCP Platform | Planned | Not Validated | Establish read-only AI integration with live Atlas engineering evidence | [EP-003](engineering-proposals/EP-003-atlas-mcp-platform.md) |
| 07 · Configuration Intelligence | Planned | Not Validated | Build the first major Atlas application on the validated MCP Platform | — |

## M05 — Rocky Linux Deployment Server & Configuration Management

**Current:** Yes
**Current Phase:** ATL-006 Git-controlled configuration workflow is active in BATCH-005; implementation has not started
**Completed Work:** ATL-001; ATL-002; ATL-003; ATL-004; ATL-005
**Completed Foundation:** Rocky Linux VM commissioned and updated; Administration tools installed; Time synchronization validated; SELinux and firewalld baseline validated; Splunk Enterprise 10.0.8 installed and validated as a systemd-managed service under the `splunk` account; `TA-atlas-base` deployment app and `atlas-base` server class configured; TCP/8089 exposed; Windows Universal Forwarder phone-home and registration validated; `atlas-base` assignment and `TA-atlas-base` delivery validated on the client; separate `TA-atlas-demo-inputs` and `TA-atlas-outputs` apps distributed; effective client input and output configuration validated; active forwarding and searchable `atlas:demo` ingestion validated
**Active Work:** BATCH-005 / ATL-006
**Next Objective:** Execute and validate the reviewed manual Git-controlled Splunk configuration delivery workflow without automation
**Evidence:** evidence/milestone-05-data-ingestion/
**Boundary:** The first Windows Universal Forwarder is centrally managed by the Deployment Server. Published ATL-005 evidence proves deployed output configuration, effective `btool` state, an active TCP/9997 forward, the installed output app, and searchable events from the centrally managed `atlas:demo` input. A GUID-bearing client capture and captures showing the superseded input path remain excluded. Git-controlled release and automation are not complete. The session notes do not document a rollback exercise, so no rollback-validation claim is made.
