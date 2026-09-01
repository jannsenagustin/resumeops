# Atlas Backlog

> Parser-readiness note: Keep `ATL-NNN` headings, field labels, controlled statuses, controlled priorities, and list formatting stable for future build-time parsing.

This is the permanent Atlas work inventory. An item is executable only when a human explicitly includes it in [ACTIVE_BATCH.md](ACTIVE_BATCH.md).

## Categories

Current Milestone; Future Milestones; Infrastructure; Splunk; Observability; Website / UX; Documentation; AI Governance; Technical Debt.

## Summary

| ID | Title | Priority | Status | Milestone |
| --- | --- | --- | --- | --- |
| ATL-001 | M05 Phase 2 — Rocky Linux baseline hardening | P1 | Done | M05 |
| ATL-002 | Install Splunk Enterprise directly on Rocky Linux | P1 | Done | M05 |
| ATL-003 | Configure Splunk Deployment Server role | P1 | Done | M05 |
| ATL-004 | Enroll Windows Universal Forwarder with the Deployment Server | P1 | Done | M05 |
| ATL-005 | Deliver production-style configuration through the Deployment Server | P1 | Done | M05 |
| ATL-006 | Recreate Git-controlled Splunk configuration workflow | P1 | Done | M05 |
| ATL-007 | Automate validated deployment through GitHub Actions | P2 | Backlog | Future |
| ATL-008 | Atlas Operations Center / Grafana dashboard | P3 | Proposed | Future |
| ATL-009 | Embedded evidence previews | P2 | Backlog | Future |
| ATL-010 | Plain-English recruiter summary | P2 | Done | Engineering Console |
| ATL-011 | Explain visible in-progress work | P2 | Backlog | Engineering Console |
| ATL-012 | Contact path improvement | P2 | Backlog | Engineering Console |
| ATL-013 | Featured Artifact hover treatment | P3 | Backlog | Engineering Console |
| ATL-014 | Atlas Planning Console | P2 | Proposed | Atlas EOS |
| ATL-015 | Project history document | P3 | Backlog | Documentation |
| ATL-016 | Splunk Config Intelligence | P3 | Proposed | M07 |
| ATL-017 | SPLUNK.md specialist handbook | P3 | Proposed | Future |
| ATL-018 | AI governance evolution | P3 | Backlog | Atlas EOS |
| ATL-019 | Dead-code and legacy-component review | P3 | Backlog | Post-release |
| ATL-020 | Lighthouse and performance audit | P2 | Backlog | Post-release |
| ATL-021 | Canonical documentation refactor | P1 | Review | Documentation |
| ATL-022 | Automated documentation-integrity audit | P2 | Proposed | Documentation |
| ATL-023 | Documentation-health view | P3 | Proposed | Documentation |
| ATL-024 | Adopt Atlas Planning Console as Daily Engineering Workflow | P1 | Backlog | Atlas EOS |
| ATL-025 | Project-State Synchronization and Integrity Audit | P1 | Review | Atlas EOS |
| ATL-026 | Normalize Evidence Naming and References | P2 | Review | Documentation |
| ATL-027 | Final Review of M05 Evidence Publishability | P3 | Backlog | Documentation |
| ATL-028 | Complete ResumeOps → Atlas Repository Transition | P2 | Backlog | Documentation |
| ATL-029 | Implement Engineering Session Capture and Codex Closeout Handoff | P2 | Backlog | Atlas EOS |
| ATL-030 | Shared Atlas Navigation and Planning Console Progressive Disclosure | P1 | Done | Engineering Console |

## ATL-001 — M05 Phase 2 — Rocky Linux baseline hardening

**Category:** Current Milestone; Infrastructure
**Milestone:** M05
**Priority:** P1
**Status:** Done
**Description:** Validate chronyd, SSH, SELinux, firewalld, baseline administration tools, and create a clean checkpoint.
**Why it matters:** Establishes a known, supportable operating-system baseline before Splunk installation.
**Dependencies:** None recorded.
**Acceptance criteria:** Each baseline control is inspected and documented; required tools are available; a clean checkpoint is created only after validation.
**Human validation required:** Yes.
**Source or related proposal:** Existing M05 planning.
**Notes:** Enabled services must be behaviorally validated.

## ATL-002 — Install Splunk Enterprise directly on Rocky Linux

**Category:** Current Milestone; Splunk
**Milestone:** M05
**Priority:** P1
**Status:** Done
**Description:** Prepare the dedicated Rocky Linux VM to act as the Splunk Deployment Server by installing Splunk Enterprise directly on the host.
**Why it matters:** Provides the management runtime required for centralized forwarder configuration.
**Dependencies:** ATL-001.
**Acceptance criteria:** Splunk is installed using a documented, repeatable process and its local service operation is validated without claiming the Deployment Server role is configured.
**Human validation required:** Yes.
**Source or related proposal:** Existing M05 architecture.
**Notes:** Splunk Enterprise 10.0.8 is installed under `/opt/splunk`; local service operation is validated under systemd as the dedicated `splunk` account. Deployment Server role configuration was completed separately under ATL-003.

## ATL-003 — Configure Splunk Deployment Server role

**Category:** Current Milestone; Splunk
**Milestone:** M05
**Priority:** P1
**Status:** Done
**Description:** Configure deployment apps, server classes, and management behavior.
**Why it matters:** Establishes the centralized management plane separately from ingestion.
**Dependencies:** ATL-002.
**Acceptance criteria:** Deployment Server configuration is documented, inspected, and ready for a controlled client enrollment test.
**Human validation required:** Yes.
**Source or related proposal:** DEC-004, DEC-005, DEC-006.
**Notes:** The `TA-atlas-base` deployment app and `atlas-base` server class are configured and recognized by the Deployment Server. Effective configuration was inspected with `btool`, the Deployment Server reloaded successfully under the `splunk` service account, and Agent Management showed the app and server class with zero enrolled forwarders. ATL-004 remains separate backlog scope; no client enrollment or configuration distribution is claimed.

## ATL-004 — Enroll Windows Universal Forwarder with the Deployment Server

**Category:** Current Milestone; Splunk
**Milestone:** M05
**Priority:** P1
**Status:** Done
**Description:** Configure the existing Windows Universal Forwarder to communicate with the Rocky Linux Deployment Server.
**Why it matters:** Connects the validated ingestion client to the new management plane.
**Dependencies:** ATL-003.
**Acceptance criteria:** The forwarder is enrolled, the management connection is verified, and existing ingestion remains validated.
**Human validation required:** Yes.
**Source or related proposal:** Existing M05 planning.
**Notes:** The Windows Universal Forwarder was configured for `10.0.0.84:8089`. After firewalld allowed TCP/8089, phone-home and client registration succeeded. Reloading the Deployment Server applied the `atlas-base` match, and `TA-atlas-base` installed successfully on the client. Management enrollment remains distinct from event ingestion.

## ATL-005 — Deliver production-style configuration through the Deployment Server

**Category:** Current Milestone; Splunk
**Milestone:** M05
**Priority:** P1
**Status:** Done
**Description:** Deploy production-style `inputs.conf` and `outputs.conf` through the validated Deployment Server lifecycle.
**Why it matters:** Validates the manual process that later automation will reproduce.
**Dependencies:** ATL-004.
**Acceptance criteria:** A reviewed production-style configuration is received and applied as intended, with evidence, effective-configuration validation, and a documented rollback path.
**Human validation required:** Yes.
**Source or related proposal:** DEC-007; LESSON-007.
**Notes:** BATCH-004 completed and closed ATL-005 on 2026-08-30. Separate `TA-atlas-demo-inputs` and `TA-atlas-outputs` apps centrally configured the monitored `E:\04_PROJECTS\ResumeOps\Atlas\logs\atlas-demo2.log` source and forwarding to `10.0.0.84:9997`. Client-side `btool`, active-forward status, TCP reachability, indexing, and search validated the end-to-end path. No manual production configuration was added under the Universal Forwarder app directories. ATL-006 remains Backlog and inactive.

## ATL-006 — Recreate Git-controlled Splunk configuration workflow

**Category:** Current Milestone; Splunk
**Milestone:** M05
**Priority:** P1
**Status:** Done
**Description:** Reproduce the enterprise-style flow: feature branch -> configuration change -> Git review and merge -> controlled release -> Deployment Server distribution.
**Why it matters:** Makes configuration delivery reviewable, traceable, and reproducible.
**Dependencies:** ATL-005.
**Acceptance criteria:** A reviewed repository change is released through a documented manual control point and distributed successfully.
**Human validation required:** Yes.
**Source or related proposal:** DEC-007, DEC-008.
**Notes:** BATCH-005 completed and closed ATL-006 on 2026-09-01. The pre-release diff caught a repository-to-runtime mismatch before live changes; reviewed pull request #1 preserved `logs\*.log` and produced approved release commit `5b53785beb2a134342b6c24a5854c55d6c00129a`. The commit-specific checkpoint, manual release, Deployment Server reload, client delivery, deployed and effective configuration, forwarder service, unique event ingestion, and search all passed. Rollback was not exercised because validation succeeded. Nine reviewed artifacts and `BATCH-005.md` were accepted at closeout. Automation remains separate ATL-007 scope.

## ATL-007 — Automate validated deployment through GitHub Actions

**Category:** Future Milestones; Splunk
**Milestone:** Future
**Priority:** P2
**Status:** Backlog
**Description:** Create a future CI/CD path equivalent in principle to the prior Azure DevOps workflow.
**Why it matters:** Could make validated configuration releases consistent and auditable.
**Dependencies:** ATL-006.
**Acceptance criteria:** To be defined after the manual workflow is validated and the automation boundary is approved.
**Human validation required:** Yes.
**Source or related proposal:** DEC-007, DEC-008.
**Notes:** Inactive and explicitly excluded from BATCH-005. Automation remains separate future scope and is not authorized by ATL-006 activation.

## ATL-008 — Atlas Operations Center / Grafana dashboard

**Category:** Observability; Website / UX
**Milestone:** Future
**Priority:** P3
**Status:** Proposed
**Description:** Create a separate read-only operational page backed by real repository and infrastructure data.
**Why it matters:** Could provide useful operational orientation once meaningful data exists.
**Dependencies:** Meaningful, trustworthy operational data and an approved proposal.
**Acceptance criteria:** To be defined in a future EP-002; all displayed state must be real and source-backed.
**Human validation required:** Yes.
**Source or related proposal:** EP-002 reserved but not created.
**Notes:** Do not build until meaningful operational data exists.

## ATL-009 — Embedded evidence previews

**Category:** Website / UX; Documentation
**Milestone:** Future
**Priority:** P2
**Status:** Backlog
**Description:** Show selected screenshots, configuration snippets, and validation evidence directly in Atlas without requiring every visitor to open GitHub.
**Why it matters:** Reduces friction when inspecting evidence-backed claims.
**Dependencies:** Existing canonical evidence and redaction review.
**Acceptance criteria:** Selected previews remain linked to canonical evidence, accessible, responsive, and free of sensitive persistent identifiers.
**Human validation required:** Yes.
**Source or related proposal:** Existing evidence-viewer discussions.
**Notes:** Embedded copies must not become competing evidence records.

## ATL-010 — Plain-English recruiter summary

**Category:** Website / UX
**Milestone:** Engineering Console
**Priority:** P2
**Status:** Done
**Description:** Explain Project Atlas in non-technical language near the homepage opening section.
**Why it matters:** Helps non-specialist readers understand the project before technical detail.
**Dependencies:** None.
**Acceptance criteria:** A concise plain-English summary is present near the homepage opening and reflects supported project facts.
**Human validation required:** Yes; previously implemented and verified in the current homepage source.
**Source or related proposal:** Current Engineering Console homepage.
**Notes:** This record documents existing verified state; no website change is part of Stage 1.

## ATL-011 — Explain visible in-progress work

**Category:** Website / UX; Documentation
**Milestone:** Engineering Console
**Priority:** P2
**Status:** Backlog
**Description:** Add concise wording explaining that Atlas intentionally exposes incomplete work until validation is complete.
**Why it matters:** Prevents readers from confusing transparent progress with unsupported completion claims.
**Dependencies:** None recorded.
**Acceptance criteria:** Wording is concise, factual, and does not obscure status labels.
**Human validation required:** Yes.
**Source or related proposal:** DEC-013.
**Notes:** Preserve the evidence-first tone.

## ATL-012 — Contact path improvement

**Category:** Website / UX
**Milestone:** Engineering Console
**Priority:** P2
**Status:** Backlog
**Description:** Provide a clear but restrained contact path for recruiters.
**Why it matters:** Makes the intended professional follow-up action easier to find.
**Dependencies:** Human approval of contact method and placement.
**Acceptance criteria:** The path is accessible, unobtrusive, and uses approved contact information.
**Human validation required:** Yes.
**Source or related proposal:** Existing homepage planning.
**Notes:** No redesign is implied.

## ATL-013 — Featured Artifact hover treatment

**Category:** Website / UX
**Milestone:** Engineering Console
**Priority:** P3
**Status:** Backlog
**Description:** Apply a restrained validated-green border response when the Professional Resume artifact receives hover or keyboard focus.
**Why it matters:** Provides consistent pointer and keyboard interaction feedback.
**Dependencies:** Existing Featured Artifact component.
**Acceptance criteria:** Hover and `:focus-within` use the same restrained response without changing geometry.
**Human validation required:** Yes.
**Source or related proposal:** Existing Engineering Console interaction planning.
**Notes:** Retained as requested backlog scope; completion has not been newly asserted by Stage 1.

## ATL-014 — Atlas Planning Console

**Category:** Website / UX; AI Governance
**Milestone:** Atlas EOS
**Priority:** P2
**Status:** Proposed
**Description:** Build a read-only `/planning` page that visualizes canonical repository planning state and links to GitHub source documents.
**Why it matters:** Improves orientation while preserving Git as the source of truth.
**Dependencies:** EP-001, proven Markdown schema, future parser approval.
**Acceptance criteria:** Build-time parsing, static-export compatibility, source links, no editing, no duplicate state, and no fake progress.
**Human validation required:** Yes.
**Source or related proposal:** [EP-001](../engineering-proposals/EP-001-atlas-planning-console.md).
**Notes:** Proposal approval does not activate implementation.

## ATL-015 — Project history document

**Category:** Documentation
**Milestone:** Documentation
**Priority:** P3
**Status:** Backlog
**Description:** Create `HISTORY.md` documenting the evolution from ResumeOps to Project Atlas.
**Why it matters:** Preserves project identity and historical context without conflating them.
**Dependencies:** Reviewable repository history.
**Acceptance criteria:** History is source-grounded, chronological, and distinguishes validated changes from retrospective interpretation.
**Human validation required:** Yes.
**Source or related proposal:** DEC-001.
**Notes:** Do not fabricate dates or motives.

## ATL-016 — Splunk Config Intelligence

**Category:** Splunk; Future Milestones
**Milestone:** M07
**Priority:** P3
**Status:** Proposed
**Description:** Design and build the first major Atlas application on top of the Atlas MCP Platform for configuration analysis, dependency mapping, health checks, and recommendations.
**Why it matters:** Could turn validated configuration knowledge and MCP-provided live evidence into a useful specialist tool without integrating directly with Splunk.
**Dependencies:** Milestone 05 completed; validated Milestone 06 Atlas MCP Platform; mature operational lab; defined problem; and an approved engineering proposal.
**Acceptance criteria:** To be defined by a future proposal using real configuration needs and safe analysis boundaries.
**Human validation required:** Yes.
**Source or related proposal:** IDEA-012; EP-003 architectural dependency.
**Notes:** P3 is used because prerequisites and justification are not yet mature. Proposed status does not authorize execution.

## ATL-017 — SPLUNK.md specialist handbook

**Category:** Documentation; AI Governance
**Milestone:** Future
**Priority:** P3
**Status:** Proposed
**Description:** Create a Splunk-specific AI and engineering handbook when the project reaches the agreed trigger point.
**Why it matters:** Consolidates repeated specialist rules only when their reuse justifies a dedicated handbook.
**Dependencies:** Operational Atlas lab; Deployment Server implemented; first Splunk app underway; repeated Splunk-specific rules; or SPL and configuration work becoming a major development area.
**Acceptance criteria:** Trigger conditions are demonstrated and the handbook contains durable, project-specific guidance.
**Human validation required:** Yes.
**Source or related proposal:** Existing AI-governance discussions.
**Notes:** Do not create the handbook preemptively.

## ATL-018 — AI governance evolution

**Category:** AI Governance
**Milestone:** Atlas EOS
**Priority:** P3
**Status:** Backlog
**Description:** Review and evolve the Constitution, AI Rules, and Project Philosophy as the AI-assisted workflow grows.
**Why it matters:** Keeps human authority, tool responsibilities, and validation requirements explicit.
**Dependencies:** Observed workflow needs and human-approved changes.
**Acceptance criteria:** Updates resolve demonstrated governance gaps without describing AI as autonomous.
**Human validation required:** Yes.
**Source or related proposal:** DEC-009, DEC-010.
**Notes:** Governance changes require deliberate review.

## ATL-019 — Dead-code and legacy-component review

**Category:** Technical Debt
**Milestone:** Post-release
**Priority:** P3
**Status:** Backlog
**Description:** Review retained dormant legacy components after release without mixing cleanup into active milestone work.
**Why it matters:** Reduces maintenance burden while protecting active delivery from unrelated cleanup.
**Dependencies:** Stable release boundary and usage analysis.
**Acceptance criteria:** Candidate code is proven unused, removals are scoped, and application behavior remains validated.
**Human validation required:** Yes.
**Source or related proposal:** Existing technical-debt discussions.
**Notes:** Review does not authorize deletion.

## ATL-020 — Lighthouse and performance audit

**Category:** Website / UX; Technical Debt
**Milestone:** Post-release
**Priority:** P2
**Status:** Backlog
**Description:** Run a deliberate mobile, accessibility, and performance review without redesigning the site.
**Why it matters:** Identifies measurable usability and delivery issues after functionality stabilizes.
**Dependencies:** Stable deployable build and agreed test conditions.
**Acceptance criteria:** Findings are reproducible, separated by severity, and converted into reviewed follow-up work rather than silently changing design.
**Human validation required:** Yes.
**Source or related proposal:** Existing release-quality discussions.
**Notes:** Audit results must not be represented as fixed completion percentages.

## ATL-021 — Canonical documentation refactor

**Category:** Documentation; AI Governance
**Milestone:** Documentation
**Priority:** P1
**Status:** Review
**Description:** Establish explicit canonical owners and refactor stale narrative consumers.
**Why it matters:** Prevents current engineering truth from depending on conflicting documents.
**Dependencies:** EP-002; DEC-015.
**Acceptance criteria:** Ownership governance exists; primary narratives link to canonical status and architecture; repository validation passes.
**Human validation required:** Yes.
**Source or related proposal:** EP-002.
**Notes:** Implementation is awaiting human review; no active batch was created.

## ATL-022 — Automated documentation-integrity audit

**Category:** Documentation; Technical Debt
**Milestone:** Future
**Priority:** P2
**Status:** Proposed
**Description:** Check internal links, record IDs, stale phrases, and selected ownership rules automatically.
**Why it matters:** Detects drift before publication.
**Dependencies:** Human acceptance of EP-002 governance and audit semantics.
**Acceptance criteria:** To be defined after rules stabilize.
**Human validation required:** Yes.
**Source or related proposal:** EP-002.
**Notes:** Future automation; not active.

## ATL-023 — Documentation-health view

**Category:** Documentation; Website / UX
**Milestone:** Future
**Priority:** P3
**Status:** Proposed
**Description:** Optionally project documentation-audit results in a read-only Atlas view.
**Why it matters:** Could make governance health inspectable without creating another source of truth.
**Dependencies:** ATL-022 and approved interface scope.
**Acceptance criteria:** To be defined if promoted.
**Human validation required:** Yes.
**Source or related proposal:** EP-002.
**Notes:** Optional and not active.

## ATL-024 — Adopt Atlas Planning Console as Daily Engineering Workflow

**Category:** Documentation; AI Governance
**Milestone:** Atlas EOS
**Priority:** P1
**Status:** Backlog
**Description:** Use the Atlas Planning Console as the first destination for
each engineering session and use repository-backed Atlas EOS records instead
of conversation as the primary planning repository.
**Why it matters:** Daily use will expose friction, validate the workflow, and
guide improvements from real engineering practice rather than assumptions.
**Dependencies:** Atlas Planning Console; Idea Inbox; Active Batch;
Documentation Governance.
**Acceptance criteria:** The Planning Console is reviewed at the start of every
Atlas session; new ideas are captured in `IDEAS.md`; accepted work is recorded
in `BACKLOG.md`; only Active Batch items are executed; completed work produces
an execution report where applicable; and new decisions and lessons are added
to their canonical documents.
**Human validation required:** Yes.
**Source or related proposal:** IDEA-028; Atlas EOS governance.
**Notes:** Backlog status does not activate this item. Human approval and
inclusion in `ACTIVE_BATCH.md` are still required before execution.

## ATL-025 — Project-State Synchronization and Integrity Audit

**Category:** Documentation; AI Governance; Technical Debt
**Milestone:** Atlas EOS
**Priority:** P1
**Status:** Review
**Description:** Parse canonical milestone and planning records into one typed, read-only project-state layer and reject contradictions before publication.
**Why it matters:** Prevents homepage, project, planning, and navigation views from drifting away from repository truth.
**Dependencies:** DEC-015; DEC-016; canonical milestones; Atlas Planning Console.
**Acceptance criteria:** Active state consumers derive from canonical records; malformed references fail clearly; `npm run audit:state`, lint, TypeScript, and build pass; deliberate mismatch testing proves the audit fails closed.
**Human validation required:** Yes.
**Source or related proposal:** Canonical project-state synchronization implementation.
**Notes:** Implementation is awaiting human review. ATL-025 is not part of BATCH-001 and is not executable scope.

## ATL-026 — Normalize Evidence Naming and References

**Category:** Documentation; Technical Debt
**Milestone:** Documentation
**Priority:** P2
**Status:** Review
**Description:** Normalize published Atlas evidence filenames, repair every inbound reference, and establish a canonical artifact index and naming policy.
**Why it matters:** Stable, meaningful artifact identities keep evidence traceable across journals, application imports, and future execution records.
**Dependencies:** DEC-014; DEC-015; canonical evidence inventory.
**Acceptance criteria:** Tracked evidence follows the approved filename pattern; all consumers resolve; artifact bytes remain unchanged; sensitive unpublished captures remain excluded; repository validation passes.
**Human validation required:** Yes.
**Source or related proposal:** Evidence naming normalization implementation; DEC-017.
**Notes:** Implementation is awaiting human review. ATL-026 is not part of BATCH-001 and is not executable scope.
**Recorded on:** 2026-08-21

## ATL-027 — Final Review of M05 Evidence Publishability

**Category:** Documentation
**Milestone:** Documentation
**Priority:** P3
**Status:** Backlog
**Objective:** Review the remaining unpublished M05 evidence artifacts that still contain persistent interface identifiers.
**Description:** Determine whether each remaining artifact should be redacted, replaced, permanently excluded, or approved for publication.
**Why it matters:** Atlas evidence should be publishable by default. Sensitive artifacts should never exist as undocumented exceptions.
**Dependencies:** ATL-026; DEC-014; canonical evidence index.
**Acceptance criteria:** All remaining M05 evidence has an explicit publication decision; no unreviewed sensitive evidence remains; the evidence index reflects the final disposition; and the repository contains no accidental publication risk.
**Human validation required:** Yes.
**Source or related proposal:** M05 evidence publishability review.
**Notes:** Backlog status does not activate ATL-027. It is not part of BATCH-001.

## ATL-028 — Complete ResumeOps → Atlas Repository Transition

**Category:** Documentation
**Milestone:** Documentation
**Priority:** P2
**Status:** Backlog
**Description:** Coordinate the future transition from ResumeOps to Atlas across the GitHub repository, documentation, project branding, URLs, metadata, GitHub Pages, navigation, and canonical references. The transition must preserve repository history while removing outdated ResumeOps branding.
**Why it matters:** Atlas has outgrown its original recruiter-facing portfolio identity and now represents an engineering platform encompassing Atlas EOS, the Planning Console, engineering governance, the Splunk home lab, the evidence system, the project-state engine, AI governance, and the planned Atlas MCP Platform.
**Dependencies:** Milestone 05 complete; active engineering work stabilized; repository state synchronization complete.
**Acceptance criteria:** The GitHub repository is renamed to Atlas; remote origin references are updated; GitHub Pages continue functioning; documentation consistently refers to Project Atlas; historical references to ResumeOps remain only where discussing project history; no broken links remain; canonical ownership documentation reflects the new identity; navigation, metadata, sitemap, robots, and canonical URLs are updated if required; repository history is preserved.
**Human validation required:** Yes.
**Source or related proposal:** IDEA-021; human-directed repository-transition planning.
**Notes:** Do not rename the repository, modify remote URLs, or begin branding changes during planning. The transition must wait until active infrastructure work has stabilized and should formally conclude Atlas's evolution from a portfolio project into an engineering platform. Preserve the ResumeOps-to-Atlas history as part of the project story. No Engineering Proposal is required.

## ATL-029 — Implement Engineering Session Capture and Codex Closeout Handoff

**Category:** AI Governance
**Milestone:** Atlas EOS
**Priority:** P2
**Status:** Backlog
**Description:** Implement a lightweight, session-scoped record of engineering breadcrumbs and a human-reviewed Codex closeout handoff for synchronizing canonical Atlas EOS records after active work.
**Why it matters:** Written session context can preserve work, validation, errors, evidence handling, decisions, lessons, and remaining work that Codex cannot reliably recover from chat history or external systems.
**Dependencies:** Atlas Planning Console; Active Batch workflow; Codex handoff concept; at least one manually completed Atlas batch.
**Acceptance criteria:** An approved session-record format exists; the record captures work, validation, errors, evidence, decisions, lessons, and remaining work; Codex can generate an end-of-session synchronization plan from it; the workflow does not bypass human approval; the Planning Console remains read-only unless a separately approved local integration is introduced; no task outside the Active Batch can be included; session notes are retired, archived, or converted according to a documented lifecycle; the workflow is tested during a real engineering session.
**Human validation required:** Yes.
**Source or related proposal:** IDEA-031; EP-004.
**Notes:** The documentation-only workspace, reusable template, and checklist now exist. Testing during a real engineering session and any automation remain backlog work. Backlog status does not activate ATL-029. Do not create fake session details, treat chat history as canonical, complete tasks automatically, approve evidence automatically, or commit and push autonomously.

## ATL-030 — Shared Atlas Navigation and Planning Console Progressive Disclosure

**Category:** Website / UX
**Milestone:** Engineering Console
**Priority:** P1
**Status:** Done
**Description:** Provide one shared sidebar navigation panel across Console, Atlas, and Planning, and make large Backlog and Idea Inbox inventories easier to scan through canonical grouping, progressive disclosure, search, and quick access.
**Why it matters:** The primary Atlas surfaces were difficult to move between consistently, while permanently expanded Planning inventories required excessive scrolling and made current work harder to recover.
**Dependencies:** Existing Atlas shell, Planning Console, canonical planning parsers, and typed project-state model.
**Acceptance criteria:** All three primary surfaces use one shared major-route navigation component with an accessible active state; Backlog is grouped by canonical milestone; Idea Inbox is grouped by canonical category; search and existing category filters work together; current work and Planning sections have direct links; responsive, keyboard, type, lint, state-audit, and production-build validation pass.
**Human validation required:** Yes; this implementation is an approved immediate-publication workflow exception.
**Source or related proposal:** Human-approved Atlas navigation and Planning Console usability task.
**Notes:** Implementation and available automated validation completed on 2026-08-29. A same-day real-usage refinement removed redundant cross-page controls and added milestone-grouped evidence disclosure and canonical evidence search. The in-app browser was unavailable for visual review and that limitation is recorded in the session notes. This exception did not activate ATL-005, create an Active Batch, or change M05 engineering state.
