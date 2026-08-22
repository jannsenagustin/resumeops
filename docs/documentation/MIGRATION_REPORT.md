# Canonical Documentation Migration Report

**Recorded:** 2026-08-21

## Role changes

| Document | Old role | New role | Main reduction |
| --- | --- | --- | --- |
| `README.md` | Entry point plus status, architecture, evidence, limitations, and roadmap copy | Concise entry point and documentation router | Removed detailed architecture, milestone evidence, limitations, and duplicated roadmap |
| `CASE_STUDY.md` | Narrative plus second milestone ledger and implementation record | Durable engineering narrative | Removed step-by-step implementation and milestone-by-milestone proof |
| `docs/architecture.md` | Canonical topology with stale Compose Deployment Server | Canonical current topology | Replaced obsolete management model and condensed status prose |
| `ROADMAP.md` | Strategy plus duplicated completed status | Forward-looking sequence only | Removed completed-milestone ledger |

## Inventory classification

- Canonical: `README.md`, `ROADMAP.md`, `docs/architecture.md`, `docs/milestones.md`, planning records, proposals, decisions, lessons, evidence index, design ownership documents.
- Narrative: `CASE_STUDY.md` and public-site presentation.
- Historical: journals, ADRs, and `CHANGELOG.md`.
- Operational: `infrastructure/atlas/README.md` and execution-report instructions.
- Governance: `AGENTS.md`, `ATLAS_PRINCIPLES.md`, `ai/`, DEA, Atlas EOS rules, and `docs/documentation/`.
- Duplicate/obsolete: duplicated current-state, detailed milestone, and former Deployment Server narrative sections removed from the four refactored documents.

All 35 pre-refactor Markdown files were reviewed by role. No complete file lacked unique value, so none was deleted, merged, or archived. Five documentation-governance files and EP-002 were added. The existing uncommitted Planning Console work was preserved.

## Intentional duplication

Document titles, stable links, brief Atlas identity summaries, and concise high-level status pointers remain duplicated for navigation. These consumers link to canonical owners and do not maintain detailed state.

## Measurement method

The baseline was 35 Markdown files and 5,159 lines, excluding generated and
dependency directories. The final inventory is 41 files and 5,168 lines: a net
increase of 9 lines (0.2%) because six required governance/proposal
files offset narrative deletion. The four primary documents fell from 513 to
235 lines, a 54.2% reduction. Structural review estimates roughly 75% of their
duplicated current-state, architecture, milestone-proof, and roadmap/status
content was removed; this is an estimate because semantic duplication is not a
simple line-count measure.

## Human review

Confirm the revised architecture boundary and approve the new decision, lesson, proposal, and backlog states. No unresolved document contradiction is knowingly accepted; the legacy Compose stanza is explicitly identified as non-authoritative and remains unchanged under protected scope.
