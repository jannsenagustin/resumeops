# Project Atlas Engineering Manifesto

## 01. Mission

ResumeOps exists to publish engineering work as a reviewable record. Project
Atlas is its primary engineering publication: a real Splunk environment whose
capabilities are implemented, validated, and documented over time.

Atlas proves engineering capability through evidence rather than résumé
claims. Engineering itself is the product. Documentation is part of that
engineering, not a summary added after the work is complete.

## 02. Vision

Atlas will become a complete engineering publication describing the evolution
of a real Splunk environment across many milestones. It will preserve the
decisions, configurations, validations, limitations, and lessons that connect
the first containerized service to later operational capabilities.

The goal is not to impress. The goal is to document reality faithfully enough
that another engineer can understand what existed, why it changed, and what
the available evidence proves.

## 03. Core Philosophy

### Evidence before claims

A claim is only as strong as the repository evidence that supports it. State
what was observed and identify what remains unproven.

### Engineering before presentation

Presentation communicates completed engineering. It does not substitute for
implementation, validation, or documentation.

### Architecture before implementation

Define the system boundary, responsibilities, dependencies, and trade-offs
before describing configuration details.

### Validation before expansion

Prove the current capability before adding another. A planned state must never
be presented as an operational state.

### Build first, explain second, document continuously

Implementation precedes claims, but documentation develops with the work.
Journals, decisions, evidence, and canonical records should preserve context
while it is still known.

### Chronology matters

Engineering is cumulative. Each milestone begins from a documented state,
exists for a defined purpose, and creates the conditions for the next
milestone.

## 04. Engineering Workflow

Atlas follows this engineering order:

```text
Think
  → Design
  → Build
  → Validate
  → Document
  → Publish
```

Thinking defines the problem and its constraints. Design establishes the
architecture and validation approach. Building creates the capability.
Validation determines what can be claimed. Documentation records the verified
work and its context. Publication makes that record available to readers.

Documentation planning may begin before implementation, and journals may
capture work as it happens. Canonical documentation must never present an
engineering capability as complete before validation. Publication follows
review of the implementation, evidence, boundaries, and written record.

## 05. Chronological Integrity

Atlas is a chronological engineering journal. A reader must be able to begin
at Milestone 01 and follow every material engineering decision through the
latest validated milestone.

- Never skip a milestone required to explain the current system.
- Never hide material engineering work.
- Never rewrite history to make earlier work appear more complete.
- Never give an earlier milestone knowledge or validation gained later.
- Preserve the difference between what was planned, implemented, observed, and
  validated at each point in time.
- End every milestone by explaining why the following milestone became
  necessary.

Corrections should clarify the record without erasing the original engineering
sequence.

## 06. Engineering Honesty

Do not exaggerate. Do not invent engineering, manufacture failures, or create
fake complexity.

If implementation proceeded smoothly, say so. If something failed, document
the failure, its cause when known, the correction, and the evidence that closed
it. If something remains unknown, label it unknown. If validation is partial,
state the boundary.

Truth is more valuable than drama. A narrow, proven result is more useful than
a broad, unsupported claim.

## 07. Documentation Philosophy

Documentation is part of engineering. Architecture decisions, trade-offs,
configuration boundaries, evidence, and lessons all belong in the engineering
record.

Each document has a distinct responsibility:

- Milestone pages are the canonical engineering record.
- The homepage summarizes the publication.
- Atlas explains the evolving system.
- Evidence proves specific claims.
- ADRs justify consequential architectural decisions.
- Engineering journals preserve development history and working context.
- The README introduces the repository and directs readers to canonical
  sources.

No document should duplicate another without a defined reason. Summaries must
link deeper instead of becoming competing narratives.

## 08. Documentation Architecture

Every document has one responsibility. No document should duplicate another
document's purpose.

| Documentation type | Responsibility |
| --- | --- |
| Milestone | Canonical engineering record for one validated stage of system evolution |
| Journal | Historical engineering diary preserving working sequence and context |
| ADR | Engineering decision record explaining a consequential choice and its trade-offs |
| Evidence | Engineering proof supporting a specific claim |
| Homepage | Editorial introduction that creates orientation and curiosity |
| Atlas | Engineering publication that explains the system and guides readers through its evolution |
| Repository | Implementation, configuration, history, and supporting source material |
| README | Repository introduction and map to canonical sources |

Cross-references are expected; competing narratives are not. When information
belongs to another document type, summarize only the context required and link
to the canonical source.

## 09. Evidence Philosophy

Evidence must:

- support a specific claim;
- remain chronological;
- avoid unnecessary duplication;
- exclude credentials, secrets, and sensitive generated values;
- preserve its original engineering context; and
- remain reviewable wherever public disclosure is appropriate.

Every meaningful engineering claim should be supported somewhere in the
repository. Configuration proves intended state. Runtime output proves an
observation. A healthy component does not prove a functioning relationship. A
network connection does not by itself prove application behavior. Describe
each artifact only as strongly as its contents allow.

## 10. Evidence Hierarchy

Use the strongest evidence available for an engineering claim. The preferred
order is:

```text
Validated runtime behavior
  → Runtime logs or command output
  → Configuration
  → Screenshots
  → Narrative
```

Higher-ranked evidence does not make lower-ranked evidence useless. Different
artifacts can prove different parts of a claim, and a screenshot may preserve
a runtime observation when structured output is unavailable. Narrative
explains evidence but does not replace it.

When several artifacts support the same claim, cite the strongest artifact and
use additional evidence only when it adds distinct context.

## 11. Public Trust

Readers should be able to verify published engineering claims independently.
When reviewable evidence exists, link to it. When evidence is unavailable,
excluded, incomplete, or unsafe to publish, say so and narrow the claim
accordingly.

Never imply proof that does not exist. Never use confident presentation to
conceal an evidence gap. Transparency about limitations, excluded secrets, and
unvalidated behavior creates credibility.

## 12. Writing Standards

Write like engineering documentation. Use precise terms, direct sentences,
stable names, and explicit validation boundaries.

Avoid marketing, sales language, résumé language, AI buzzwords, and empty
adjectives. Do not use phrases such as:

- cutting-edge;
- world-class;
- innovative;
- transformative;
- best-in-class; or
- game-changing.

Prefer words that describe work or observation:

- implemented;
- validated;
- configured;
- documented;
- confirmed;
- observed;
- prepared; and
- verified.

Precision takes priority over enthusiasm. Do not use confident language to
conceal an unknown or unvalidated state.

## 13. Design Philosophy

### NO AI SLOP

The design must feel built for this engineering record, not generated from a
generic interface pattern. Visual decisions must improve reading,
orientation, comparison, or inspection.

Avoid:

- generic SaaS design;
- glows;
- glassmorphism;
- gradient overload;
- floating cards without information purpose;
- fake terminals;
- dashboard theatre;
- buzzword sections;
- skill percentages;
- decorative animations; and
- empty metrics.

Prefer:

- an engineering-publication character;
- editorial hierarchy;
- calm layouts;
- architecture;
- evidence;
- documentation;
- real screenshots;
- real systems;
- restrained typography; and
- functional interaction.

Decoration must not compete with evidence. Interaction must reveal useful
information or improve navigation. The design should feel built, not
generated.

## 14. Design Stability

The interface should become increasingly stable as the publication matures.
Future work should primarily add engineering records, evidence, and validated
capabilities.

Visual redesign is justified only when:

- usability improves;
- accessibility improves; or
- engineering evolution requires a different way to explain or inspect the
  system.

Never redesign merely for novelty. Preserve familiar information architecture
and interaction patterns unless evidence shows that a change is necessary.

## 15. Editorial Principles

The homepage creates curiosity. Atlas satisfies curiosity.

Curate before listing. Summarize before expanding. Guide readers deeper instead
of presenting every detail at once. Do not overwhelm readers by assigning equal
visual weight to information with unequal importance.

Editorial hierarchy is an engineering decision. It determines what readers
encounter first, how they understand scope, and where they find proof. A summary
must create orientation without replacing the canonical record.

## 16. User Experience Principles

Every page has one primary purpose:

- The homepage introduces.
- Atlas documents.
- Project pages showcase defined engineering work.
- The résumé summarizes.
- The repository proves.

Do not duplicate information across pages merely to fill space. Give readers
the context required at their current level, then guide them toward the
canonical source for greater depth. Navigation should expose the chronological
record without obscuring milestone boundaries.

## 17. Milestone Standard

Every canonical milestone must contain:

1. Title
2. Milestone abstract
3. Objective
4. Starting State
5. Architecture Change
6. Implementation
7. Engineering Decisions
8. Validation
9. Evidence
10. Result
11. Lessons Learned
12. Transition

Every milestone must answer:

- Why did this milestone exist?
- What changed?
- How was it validated?
- Why is the next milestone required?

The abstract states the engineering change in one sentence. Validation must
separate what was proven from what remained unvalidated. Lessons must come from
the repository record, not from generic advice. The transition must follow
from an actual capability gap.

## 18. Repository Standards

Maintain one source of truth for each engineering fact or narrative. Preserve
canonical filenames, consistent terminology, consistent milestone names, and
consistent evidence naming.

- Keep milestone records in their canonical locations.
- Keep decisions in ADRs and evidence in milestone evidence directories.
- Do not create duplicate narratives that can diverge.
- Do not rename or move canonical evidence without a deliberate migration.
- Keep generated output, local environment values, credentials, and
  secret-bearing artifacts out of version control.
- Make repository structure communicate engineering maturity and source
  ownership.
- Treat public summaries as references to canonical engineering records, not
  replacements for them.

## 19. Git Philosophy

Commit meaningful engineering checkpoints. A commit should identify a coherent
change that can be reviewed and understood in the project chronology.

Create checkpoint branches before major architectural shifts. Use releases for
meaningful public milestones. Preserve corrective history when it explains how
the system evolved. Do not rewrite history merely to make the path appear
cleaner.

Commit messages, branches, tags, and releases should help the Git history tell
the engineering story.

## 20. AI Collaboration

Atlas openly uses AI-assisted engineering. AI can accelerate investigation,
implementation, review, and documentation, but it does not replace engineering
judgment.

AI output is a proposal until it has been inspected and validated. Every
engineering claim, validation result, architecture decision, publication, and
milestone requires human review. Evidence must come from the system and
repository, not from the confidence or fluency of generated text.

AI assistants must follow the same chronology, evidence, scope, security, and
documentation rules as human contributors. Uncertainty must be surfaced rather
than filled with plausible invention.

## 21. Project Evolution

Atlas documents engineering evolution, not a collection of engineering
accomplishments. Each milestone should exist because the preceding milestone
revealed a limitation, missing relationship, or justified next capability.

Engineering evolves through connected changes. It does not accumulate random
features. A capability without a clear origin in the validated system does not
belong in the milestone sequence.

## 22. Future Expansion

Future milestones must exist because the engineering state naturally exposed
a new requirement. Do not add a feature merely because it sounds impressive or
looks useful in a portfolio.

Before implementation, every proposed capability must answer:

- Why is it required now?
- How does it extend the validated architecture?
- Where will its evidence live?

Future Splunk applications, documentation, repository organization, UX,
design, and automation must follow the same standard. Contributors, including
AI coding assistants, must evaluate proposed work against this manifesto before
changing the project.

## 23. Non-Negotiables

- No AI slop.
- No invented engineering.
- No unsupported claims.
- No skipped milestones.
- No rewriting history.
- No fake production environments.
- No decorative complexity.
- No duplicated documentation.
- No hidden evidence.
- No feature without engineering purpose.
- No architecture without validation.
- No duplicated document responsibility.
- No retrospective exaggeration.
- No milestone without transition.

When a proposed change conflicts with these rules, change the proposal rather
than weakening the record.

Project Atlas remains deliberately unfinished. Each milestone preserves one
verified state in the life of a real engineering system, so its history remains
reviewable while the engineering continues.
