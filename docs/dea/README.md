# Documentation Experience Architecture

Documentation Experience Architecture (DEA) governs how readers discover,
understand, verify, and inspect Project Atlas engineering work. Project Atlas
originated as ResumeOps, and historical DEA records may retain that name where
it describes the earlier project identity.
It governs the reading experience rather than the technical implementation.

This directory exists to define that experience before documentation,
repository structure, or public interfaces are refactored. DEA preserves
engineering depth while reducing the effort required to find and understand
it.

[DEA-01 — Engineering Discovery Map](DEA-01-engineering-discovery-map.md) is the
foundational discovery architecture. Later reviewed phases may address the
milestone reading experience, documentation responsibilities, Atlas UX,
repository entry points, and compliance with the
[Project Atlas Engineering Manifesto](../../ATLAS_PRINCIPLES.md).

DEA documents describe proposed experience architecture until their status
explicitly records implementation and validation.

## Canonical Vocabulary

| Concept | Canonical name | Deprecated or ambiguous variants | Responsibility |
| --- | --- | --- | --- |
| Canonical engineering chapter | Milestone | Build Record, milestone record | Records one validated stage of Atlas evolution |
| Opening reader layer | Engineering Summary | Reader Layer, executive milestone summary | Communicates the problem, change, validated outcome, and next question |
| Detailed engineer layer | Engineering Record | Engineer Layer, deep-dive layer | Preserves architecture, implementation, decisions, validation, evidence, lessons, and transition |
| Historical working record | Journal | Build Record, milestone journal when used as a canonical label | Preserves work as it unfolded |
| Engineering proof | Evidence | Proof artifact, validation screenshot when used for the complete evidence set | Supports a defined claim |
| Architecture decision record | ADR | Decision log, decision note | Records a consequential decision, rationale, and trade-offs |
| System topology record | Architecture | System design, architecture overview when scope is unclear | Explains components, boundaries, responsibilities, and connections |
| Proven behavior | Validation | Verification when used without a defined distinction | Records what testing or observation established |
| Built capability | Implementation | Build, configuration when referring to the complete implemented change | Records what was created or configured |
| Reviewable project source | Repository | Repo, source record | Contains implementation, configuration, documentation, evidence references, and history |
| Project-level technical narrative | Engineering Overview | Production Record, Build record, case study | Summarizes the system and directs readers to canonical records |

“Reader Layer” and “Engineer Layer” remain useful conceptual descriptions in
DEA discussions. In milestone documents, use the concrete headings
“Engineering Summary” and “Engineering Record.” Terminology whose replacement
would change document ownership or repository architecture remains deferred to
a reviewed DEA phase.
