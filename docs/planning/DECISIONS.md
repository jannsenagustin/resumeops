# Atlas Decisions

> Parser-readiness note: Keep `DEC-NNN` headings, field labels, and status values stable for future build-time parsing.

These entries formally record existing or newly approved Atlas decisions. Where historical dates are unknown, the recording date is not presented as the original decision date.

## DEC-001 — Project identity

**Decision:** Project Atlas is the public project identity; ResumeOps remains historical context.
**Recorded on:** 2026-08-21
**Original decision date:** Not formally recorded.
**Context:** The repository evolved from a resume-oriented project into a broader engineering record.
**Rationale:** A stable public identity should describe the current project without erasing its origin.
**Consequences:** Public documentation leads with Project Atlas; ResumeOps may appear only as history.
**Status:** Accepted

## DEC-024 — Separate input and output deployment applications

**Recorded:** 2026-08-30

**Decision:** Manage ATL-005 monitoring and forwarding through separate
`TA-atlas-demo-inputs` and `TA-atlas-outputs` Deployment Server applications.

**Rationale:** The responsibilities have independent lifecycles and validation
boundaries, and separating them mirrors maintainable production administration.

**Consequences:** Input and output changes can be reviewed, distributed, and
validated independently. Future configuration must preserve clear ownership
rather than silently combining unrelated responsibilities.

**Status:** Accepted

## DEC-025 — Deployment Server is the sole source of managed client configuration

**Recorded:** 2026-08-30

**Decision:** ATL-005 production configuration originates under
`/opt/splunk/etc/deployment-apps/` and is distributed by the Deployment Server;
no manual production configuration is added to Universal Forwarder app
directories.

**Rationale:** The milestone exists to prove centralized configuration
management rather than workstation-local administration.

**Consequences:** Effective client state must remain traceable to deployed apps,
and client-side validation does not authorize local configuration edits.

**Status:** Accepted

## DEC-026 — Keep the controlled validation log in the Atlas workspace

**Recorded:** 2026-08-30

**Decision:** Monitor the controlled ATL-005 validation log at
`E:\04_PROJECTS\ResumeOps\Atlas\logs\atlas-demo2.log` instead of the originally
considered `C:\Atlas\logs\atlas-demo.log` path.

**Rationale:** The Atlas workspace keeps engineering validation artifacts away
from the Windows system drive and within a dedicated project boundary.

**Consequences:** ATL-005 evidence and validation claims use the final
`atlas-demo2.log` source. Captures showing the superseded path are not published
as proof of the completed outcome.

**Status:** Accepted

## DEC-002 — Evidence-first Engineering Console

**Decision:** The Engineering Console is evidence-first and must not present unsupported claims.
**Recorded on:** 2026-08-21
**Original decision date:** Not formally recorded.
**Context:** Atlas publishes technical work for independent inspection.
**Rationale:** Claims are credible only when their state and evidence are explicit.
**Consequences:** Planned, active, and validated work remain distinguishable.
**Status:** Accepted

## DEC-003 — Evidence gates milestone validation

**Decision:** Milestones are validated only when evidence exists.
**Recorded on:** 2026-08-21
**Original decision date:** Not formally recorded.
**Context:** Configuration state or intended behavior alone does not prove a capability.
**Rationale:** Validation requires observed results.
**Consequences:** Completed implementation may remain unvalidated until evidence is reviewed.
**Status:** Accepted

## DEC-004 — Dedicated Rocky Linux Deployment Server

**Decision:** The Splunk Deployment Server runs directly on a dedicated Rocky Linux VM, not inside Docker.
**Recorded on:** 2026-08-21
**Original decision date:** Not formally recorded.
**Context:** M05 introduces a distinct centralized management role.
**Rationale:** A dedicated VM makes the management boundary and host administration work explicit.
**Consequences:** Splunk installation and baseline validation target Rocky Linux directly.
**Status:** Accepted

## DEC-005 — Management-node boundary

**Decision:** The Deployment Server VM is a management node, not a general Docker host.
**Recorded on:** 2026-08-21
**Original decision date:** Not formally recorded.
**Context:** The VM has a specific configuration-management responsibility.
**Rationale:** Restricting its role reduces architectural ambiguity and unrelated runtime scope.
**Consequences:** General container workloads remain outside the VM's intended purpose.
**Status:** Accepted

## DEC-006 — Separate Search Head and Indexer runtimes

**Decision:** The Search Head and Indexer remain separate runtime components.
**Recorded on:** 2026-08-21
**Original decision date:** Not formally recorded.
**Context:** Atlas has validated distributed search across separate Splunk roles.
**Rationale:** Separation preserves the architecture already demonstrated by evidence.
**Consequences:** Future management work must not collapse the validated runtime roles.
**Status:** Accepted

## DEC-007 — Configuration delivery evolution

**Decision:** Splunk configuration delivery will evolve from manual validation to Git-controlled CI/CD.
**Recorded on:** 2026-08-21
**Original decision date:** Not formally recorded.
**Context:** Automation is useful only after the underlying release process is understood.
**Rationale:** Manual proof establishes safe behavior and rollback expectations before automation.
**Consequences:** ATL-005 and ATL-006 precede any ATL-007 automation.
**Status:** Accepted

## DEC-008 — Intended configuration workflow

**Decision:** The intended workflow is feature branch -> reviewed configuration change -> merge -> controlled release -> Deployment Server distribution.
**Recorded on:** 2026-08-21
**Original decision date:** Not formally recorded.
**Context:** Atlas is recreating an enterprise-style configuration-delivery pattern.
**Rationale:** Review and controlled release separate source changes from operational distribution.
**Consequences:** Direct unreviewed automation is outside the intended workflow.
**Status:** Accepted

## DEC-009 — Human review of AI-assisted work

**Decision:** AI-generated or AI-assisted work always requires human review and validation.
**Recorded on:** 2026-08-21
**Original decision date:** Not formally recorded.
**Context:** ChatGPT and Codex support planning and implementation but do not own project authority.
**Rationale:** Humans remain accountable for vision, architecture, approval, and acceptance.
**Consequences:** AI must not be described or operated as autonomous.
**Status:** Accepted

## DEC-010 — Git is canonical for planning

**Decision:** Git is the source of truth for Atlas planning state.
**Recorded on:** 2026-08-21
**Original decision date:** 2026-08-21
**Context:** Atlas EOS requires durable, reviewable planning records.
**Rationale:** Repository history provides one inspectable authority alongside engineering source.
**Consequences:** No planning state may exist exclusively in conversations, browsers, or a separate database.
**Status:** Accepted

## DEC-011 — Read-only Planning Console

**Decision:** The future Planning Console is read-only and must never become a second source of truth.
**Recorded on:** 2026-08-21
**Original decision date:** 2026-08-21
**Context:** EP-001 proposes a visual projection of Atlas EOS.
**Rationale:** Visualization should improve access without dividing authority.
**Consequences:** The console will use build-time parsing, source links, and no editing features.
**Status:** Accepted

## DEC-012 — Real data for Atlas Operations

**Decision:** Grafana or Atlas Operations must use real data and must not visualize fictional project or infrastructure state.
**Recorded on:** 2026-08-21
**Original decision date:** Not formally recorded.
**Context:** Operational visuals can imply capabilities that do not exist.
**Rationale:** Evidence-first presentation applies equally to dashboards.
**Consequences:** ATL-008 remains proposed until meaningful operational data exists.
**Status:** Accepted

## DEC-013 — Visible in-progress work

**Decision:** Current in-progress work remains visible until validated.
**Recorded on:** 2026-08-21
**Original decision date:** Not formally recorded.
**Context:** Atlas documents engineering progression rather than only polished outcomes.
**Rationale:** Honest intermediate state demonstrates process without claiming completion.
**Consequences:** Status wording must clearly separate incomplete and validated work.
**Status:** Accepted

## DEC-014 — Evidence redaction

**Decision:** Persistent identifiers and unnecessary sensitive generated values must be redacted from public evidence.
**Recorded on:** 2026-08-21
**Original decision date:** Not formally recorded.
**Context:** Infrastructure evidence may expose machine IDs, boot IDs, MAC addresses, or global IPv6 values.
**Rationale:** Proof should disclose only what is necessary to support the engineering claim.
**Consequences:** Evidence review includes relevance and redaction checks before publication.
**Status:** Accepted

## DEC-015 — Canonical Documentation Ownership

**Recorded:** 2026-08-21

**Decision:** Every engineering fact has one canonical owner. Narrative
documents and interface views are consumers that summarize and link. Stale or
duplicated current-state documentation must be removed, refactored, or archived.

**Rationale:** Repository truth must not depend on reconciling conflicting
narratives. Explicit ownership makes update order and validation testable.

**Consequences:** Contributors update the canonical owner first, use the
documentation ownership matrix, and preserve historical material only when its
role is clearly labeled.

**Status:** Accepted

## DEC-016 — Canonical Project-State Rendering

**Recorded:** 2026-08-21

**Decision:** Current project state is rendered from canonical repository
records. UI components may format state for their audience, but may not own
separate copies.

This is the Canonical Projection Principle: the repository owns engineering
truth, and software projects it.

**Rationale:** Canonical documents cannot prevent interface drift when
application data independently repeats their values.

**Consequences:** Parsers and typed models replace hard-coded inventories.
Integrity checks compare canonical sources, parsers, models, and generated
output, and `npm run audit:state` rejects contradictions before publication.
Generated registries are acceptable only when they are reproducible and
audited. UI rewrites cannot erase engineering truth. Future MCP services consume
canonical parsers and models rather than scraping HTML or maintaining separate
task, milestone, evidence, lesson, or decision inventories.

**Status:** Accepted

## DEC-017 — Canonical Evidence Naming Convention

**Recorded:** 2026-08-21

**Decision:** Published Atlas evidence uses milestone- and task-aware lowercase
filenames defined by `docs/evidence/README.md`, which also owns the canonical
artifact index. Naming-only migrations preserve artifact bytes and use `git mv`.

**Rationale:** Evidence paths are durable references consumed by journals,
application imports, and validation records; predictable identities make those
relationships auditable.

**Consequences:** Contributors inventory inbound references before a rename,
repair every consumer, validate links and builds, and keep sensitive unpublished
captures outside the index until review and required redaction are complete.

**Status:** Accepted

## DEC-018 — systemd-managed Splunk runtime

**Recorded:** 2026-08-22

**Decision:** Run the Rocky Linux Splunk Enterprise installation as the dedicated
`splunk` service account under the systemd-managed service generated by Splunk.

**Rationale:** A dedicated runtime identity and operating-system service manager
provide an explicit ownership boundary and predictable service lifecycle for the
Deployment Server host.

**Consequences:** `/opt/splunk` must remain owned by `splunk:splunk`; startup and
status checks use systemd; validation must confirm both the active service and
the runtime user. Deployment Server role configuration remains separate work.

**Status:** Accepted

## DEC-019 — Tool-independent Atlas Operations

**Recorded:** 2026-08-26

**Decision:** Atlas EOS documents engineering operations and approval
boundaries, not product-specific prompts. An approved AI tool may perform a
defined operation without changing the workflow itself.

**Rationale:** The durable process is the movement from engineering capture to
canonical synchronization, human review, and controlled closeout. Binding that
process to one product would mix governance with a replaceable implementation
detail.

**Consequences:** ChatGPT, Codex, Claude, Atlas MCP, or another approved AI may
support an Atlas operation when it respects the same authority, evidence,
validation, and closeout boundaries. Replacing a tool does not by itself require
a change to Atlas EOS.

**Status:** Accepted

## DEC-020 — Splunk CLI service-account operation

**Recorded:** 2026-08-26

**Decision:** Run normal administrative Splunk CLI commands as the `splunk`
service account with its home environment unless root privileges are explicitly
required.

**Rationale:** The Splunk CLI stores authentication state in the invoking
account's home. A plain `sudo` reload targeted `/root/.splunk` and failed, while
`sudo -u splunk -H` matched the service ownership boundary and succeeded.

**Consequences:** Atlas Splunk procedures use
`sudo -u splunk -H /opt/splunk/bin/splunk <command>` for routine administration
and reserve root for operating-system work.

**Status:** Accepted

## DEC-021 — Layered infrastructure validation

**Recorded:** 2026-08-26

**Decision:** Infrastructure milestones validate relevant changes through CLI,
runtime, Web UI, and reviewed evidence, with filesystem and effective
configuration checks where applicable.

**Rationale:** Each layer proves a different boundary. ATL-003 required the app
layout, effective server-class configuration, a successful reload, and Splunk
Web recognition before the Deployment Server could be treated as operational.

**Consequences:** Future milestone closeouts record the applicable validation
layers and do not infer distribution or client behavior from configuration
alone.

**Status:** Accepted

## DEC-022 — Session notes drive Atlas EOS synchronization

**Recorded:** 2026-08-28

**Decision:** Use `docs/planning/SESSION_NOTES.md` as the authoritative
engineering record for a completed session and require the Atlas EOS
Documentation Pass to consume it before synchronizing canonical repository
records. `SESSION_TEMPLATE.md` is only a reusable template and is never an
engineering input.

**Rationale:** Separating the engineering session from repository
synchronization reduces documentation interruption while preserving a single,
reviewable account of what actually occurred.

**Consequences:** Engineering produces and reviews `SESSION_NOTES.md`; Codex
synchronizes only documented outcomes; canonical planning, milestone, journal,
and evidence records become authoritative after review and closeout. The notes
are retired only after the approved commit and push.

**Status:** Accepted

## DEC-023 — Persistent Planning Console navigation

**Recorded:** 2026-08-28

**Decision:** Give the Planning Console a persistent left sidebar while
retaining the top bar for Atlas identity. Group navigation by engineering
purpose and include repository-derived project status plus engineering
shortcuts.

**Rationale:** Atlas now spans planning, engineering records, execution
reports, architecture, evidence, milestones, and future platform work. A
persistent, context-aware navigation model reduces friction as the engineering
platform grows.

**Consequences:** The sidebar must preserve the Atlas visual language, remain
responsive and keyboard accessible, and consume canonical state through the
existing project-state and planning parsers rather than duplicating it.

**Status:** Accepted
