# Canonical Documentation Ownership Matrix

| Information type | Canonical owner | Allowed consumers | Consumers may summarize | Consumers must not redefine | Update trigger | Validation |
| --- | --- | --- | --- | --- | --- | --- |
| Canonical Projection Principle | `ai/ENGINEERING_PHILOSOPHY.md` | All repository documents, applications, automation, and future MCP services | The short rule that the repository owns truth and software projects it | Ownership boundaries or permission for duplicate state | Governance review | Source → parser → typed model → output integrity checks |
| Project identity | `README.md` | Site, narrative, governance | Purpose and historical path note | Current name or purpose | Identity decision | Repository terminology audit |
| Milestone and validation state | `docs/milestones.md` | Typed project-state layer, README, site, architecture, narrative, roadmap | High-level validated boundary | Status, outcome, active phase, or proof | Validation decision | `npm run audit:state`, evidence links, and status audit |
| Future work and priorities | `docs/planning/BACKLOG.md` | Roadmap, site, proposals | Themes and sequence | Priority or commitment | Human planning decision | ID/status parser and review |
| Current executable work | `docs/planning/ACTIVE_BATCH.md` | Typed project-state layer, Planning Console, reports | Batch objective | Execution authorization | Human batch approval | `npm run audit:state`, single-batch, and task-ID audit |
| Engineering session record | `docs/planning/SESSION_NOTES.md` for the captured session | Atlas EOS synchronization | Documented outcomes, failures, decisions, lessons, and evidence disposition | Ongoing planning authority after closeout | End of engineering session | Completeness review against the performed session; never consume `SESSION_TEMPLATE.md` |
| Derived application state | `lib/atlasProjectState.ts` | Homepage, Atlas page, Planning Console, project listing, sidebar | Format canonical state for an audience | Independently maintained current-state facts | Canonical milestone, backlog, batch, or evidence-index change | `npm run audit:state` and production build |
| Ideas | `docs/planning/IDEAS.md` | Planning Console, proposals | Idea title and state | Commitment or implementation state | Capture/review | Unique ID and status audit |
| Engineering proposals | `docs/engineering-proposals/` | Backlog, decisions, Planning Console | Recommendation and state | Execution authorization | Proposal review | Required-field review |
| Decisions | `docs/planning/DECISIONS.md` | All documents and site | Decision and rationale | Accepted decision state | Formal decision | Unique ID and reference audit |
| Lessons | `docs/planning/LESSONS_LEARNED.md` | Narrative, site, proposals | Reusable lesson | Canonical wording or validation | Reviewed finding | Unique ID and source audit |
| Execution results | `docs/execution-reports/` | Milestones, planning views | Outcome and links | Historical result | Attempted approved batch | Report schema and evidence audit |
| Architecture | `docs/architecture.md` | README, narrative, site, proposals | Boundaries and relationships | Current topology | Approved boundary change | Config/evidence/decision reconciliation |
| Evidence | Artifacts under `docs/evidence/`; naming and canonical metadata index in `docs/evidence/README.md` | Typed project-state layer, milestones, journals, site | Supported claim and link | Artifact identity, naming, publication state, proof strength, or a separate application inventory | Evidence review or rename | `npm run audit:state`, index/filesystem/model/UI count parity, naming, link, static import, byte-integrity, and redaction review |
| AI governance | `ai/` | Agent instructions, proposals | Applicable principles | Governance requirements | Governance decision | Cross-document consistency review |
| Roadmap | `ROADMAP.md` | README, site | Forward sequence | Validation or active scope | Strategic direction change | Compare with backlog/milestones |
| Project history | `docs/journal/`, `docs/adr/`, `CHANGELOG.md` | Narrative, roadmap | Historical context | Current state | Historical event | Historical labels and links |
| Professional resume | Published PDF under `public/resume/` | Site and README links | Availability | Resume content | Human resume update | Published-link check |
| Documentation governance | `docs/documentation/` | All contributors | Rules and map links | Ownership rules | Governance change | Audit checklist |
