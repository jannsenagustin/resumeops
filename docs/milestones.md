# Project Atlas Milestones

Git history contains the detailed development record. This table is the active
Atlas status. The [evidence map](evidence/README.md) defines how validation
artifacts are organized; the [repository roadmap](../ROADMAP.md) owns future
sequence and the [backlog](planning/BACKLOG.md) owns priorities.

`Active Work` is a machine-readable identifier field. Its only valid values are
`None` or `BATCH-NNN / ATL-NNN[, ATL-NNN...]`. Review, Done, and In Progress belong in the
task or batch status field; never append status text or other prose to
`Active Work`.

| Milestone | Status | Validation State | Outcome | Evidence |
| --- | --- | --- | --- | --- |
| 01 · Containerized Splunk Foundation | Complete | Validated | Deployed a healthy Splunk Enterprise Indexer and verified Splunk Web access | [Canonical milestone](journal/sprint-6c-first-successful-containerized-splunk-deployment.md), [evidence](evidence/milestone-01-first-containerized-deployment/) |
| 02 · Search Head Deployment | Complete | Validated | Deployed a healthy Search Head alongside the Indexer on `atlas-network` | [Canonical milestone](journal/sprint-6d-search-head-deployment.md), [evidence](evidence/milestone-02-search-head/) |
| 03 · Distributed Search | Complete | Validated | Registered the Indexer as a healthy search peer and verified remote execution from the Search Head | [Canonical milestone](journal/sprint-6e-distributed-search.md), [evidence](evidence/milestone-03-distributed-search/) |
| 04 · Windows Event Ingestion via Universal Forwarder | Complete | Validated | Ingested Windows Application, Security, and System Event Logs and verified active forwarding plus distributed execution | [Canonical milestone](journal/sprint-6f-windows-event-ingestion.md), [evidence](evidence/milestone-04-windows-event-ingestion/) |
| 05 · Rocky Linux Deployment Server & Configuration Management | Complete | Validated | Centrally delivered configuration and validated a reviewed manual Git-controlled release through searchable ingestion | [Canonical milestone](journal/milestone-05-deployment-server-foundation.md), [evidence](evidence/milestone-05-data-ingestion/) |
| 06 · Atlas MCP Platform | Planned | Not Validated | Establish read-only AI integration with live Atlas engineering evidence | [EP-003](engineering-proposals/EP-003-atlas-mcp-platform.md) |
| 07 · Configuration Intelligence | Planned | Not Validated | Build the first major Atlas application on the validated MCP Platform | — |

## M05 — Rocky Linux Deployment Server & Configuration Management

**Current:** No
**Current Phase:** Milestone 05 complete and validated; no active engineering batch
**Completed Work:** ATL-001; ATL-002; ATL-003; ATL-004; ATL-005; ATL-006
**Completed Foundation:** Rocky Linux VM commissioned and updated; Administration tools installed; Time synchronization validated; SELinux and firewalld baseline validated; Splunk Enterprise 10.0.8 installed and validated as a systemd-managed service under the `splunk` account; `TA-atlas-base` deployment app and `atlas-base` server class configured; TCP/8089 exposed; Windows Universal Forwarder phone-home and registration validated; `atlas-base` assignment and `TA-atlas-base` delivery validated on the client; separate `TA-atlas-demo-inputs` and `TA-atlas-outputs` apps distributed; effective client input and output configuration validated; active forwarding and searchable `atlas:demo` ingestion validated
**Active Work:** None
**Next Objective:** Await explicit human activation of future work; ATL-007 automation remains inactive
**Evidence:** evidence/milestone-05-data-ingestion/
**Boundary:** The first Windows Universal Forwarder is centrally managed by the Deployment Server. ATL-006 evidence proves the reviewed Git source, commit-specific checkpoint, version `1.0.1` delivery, unchanged wildcard input behavior, effective client state, running service, and searchable unique validation event. The manual release and Milestone 05 closeout are accepted. Rollback was not exercised, so no rollback-validation claim is made. ATL-007 automation is not active.

## M06 — Atlas MCP Platform

**Current:** Yes
**Current Phase:** Planned / Not Validated; ATL-034/BATCH-008, ATL-035/BATCH-010, ATL-036/BATCH-011, and ATL-042/BATCH-009 are complete, with no active implementation batch
**Completed Work:** ATL-034; ATL-035; ATL-036; ATL-042
**Completed Foundation:** Milestone 05 Complete / Validated; EP-003 Approved; DEC-027 Accepted; EP-005 Implemented; ATL-034 architecture spike validated; ATL-035 security boundary and narrow `get_server_info` contract approved; ATL-036 containerized MCP foundation accepted; standards-valid Atlas Search Head management/KV TLS validated through BATCH-009
**Active Work:** None
**Next Objective:** Await separate human activation of ATL-037 or another bounded M06 task; do not infer live-path authority from the completed foundation
**Evidence:** evidence/
**Boundary:** M06 remains Planned / Not Validated. ATL-036/BATCH-011 established the accepted production-oriented containerized MCP foundation with an empty registry and no live Splunk operation. No live `get_server_info` implementation or invocation, Splunk identity or configuration change, additional tool, new network exposure, Deployment Server access, ATL-037 through ATL-041 activation, or milestone-state advancement is authorized.
