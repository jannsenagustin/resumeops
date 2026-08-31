# Architecture Analysis Review Standard

## Purpose

An Architecture Analysis Review (AAR) is the canonical repository record for a
formal architecture investigation. It captures engineering reasoning,
evaluation, alternatives, findings, assumptions, limitations, evidence, and
recommendations for later architectural decisions.

An AAR records analysis. It does not authorize implementation, establish
planning state, or create runtime authority.

## Architecture Principles

AARs follow these principles:

- Preserve history and maintain one canonical source for each review.
- State assumptions and limitations explicitly.
- Maintain analytical neutrality and evaluate credible alternatives fairly.
- Remain implementation-independent and vendor-neutral unless the investigation
  explicitly requires a bounded product or platform context.
- Make claims traceable to evidence and place evidence before conclusions.
- Make the analysis reproducible by recording scope, method, inputs, and review
  context.
- Treat recommendations as analytical output, not authority.

## When an AAR Is Required

Create an AAR when a formal architecture investigation must be preserved before
a decision or integrated resolution is approved. Typical triggers include:

- evaluation of materially different architectural alternatives;
- investigation of trust, safety, operability, conformance, or certification;
- analysis with assumptions, limitations, or unresolved findings that later
  decisions must retain;
- research that will provide rationale for an ADR or ARD; or
- a human-approved request to preserve a completed architecture review.

## When an AAR Is Not Required

Do not use an AAR for:

- routine implementation choices with no formal architecture investigation;
- planning priority, task activation, milestone state, or execution authority;
- recording an accepted architecture decision without its supporting analysis;
- runtime status, operational evidence, or batch execution results; or
- informal notes that have not been accepted for canonical preservation.

## Relationships to Other Records

- **ADR:** An Architecture Decision Record establishes a binding architecture
  decision. An AAR may provide its rationale but cannot replace it.
- **ARD:** An Architecture Resolution Document may establish an integrated
  architectural resolution across multiple findings or decisions. An AAR may
  be cited as analytical input but cannot replace the resolution.
- **Planning:** Planning records own priorities, scope, activation, and milestone
  state. An AAR neither changes nor authorizes planning state.
- **Implementation:** Implementation artifacts realize separately authorized
  work. An AAR does not authorize or prescribe implementation merely by making
  a recommendation.
- **Runtime reports:** Runtime reports record observed runtime state or behavior.
  They may supply evidence to an AAR, but the AAR does not replace their
  observations or create runtime authority.
- **Execution reports:** Execution reports record the results of authorized
  work. They may cite an AAR for context, but the AAR does not authorize the
  execution or redefine its result.

## Document Lifecycle

This standard is the sole owner of AAR lifecycle semantics. The canonical
lifecycle has five states:

```text
Draft -> Under Review -> Completed -> Corrected (if required) -> Historical
```

Review outcomes are not lifecycle states. Completion means only that the
analysis is complete and preserved; it does not approve architecture or
authorize implementation.

### Draft

**Purpose:** The analysis record is being developed and is incomplete.

**Entry criteria:** A valid AAR identifier is assigned, scope and purpose are
defined, and the record uses the canonical AAR template.

**Permitted actions:** Add, remove, or revise analytical content. Refine
assumptions, evidence, alternatives, findings, and limitations.

**Prohibited actions:** Present the record as complete, treat recommendations as
approved architecture, or use the record as implementation authority.

**Exit:** `Draft` may transition only to `Under Review`.

### Under Review

**Purpose:** Reviewers evaluate analytical completeness, accuracy, evidence
quality, internal consistency, and adherence to this standard.

**Entry criteria:** Required sections are substantially complete, assumptions
and limitations are explicit, repository-review scope is declared, and findings
are distinguishable from recommendations.

**Permitted actions:** Add reviewer comments, corrections, clarification,
analysis, or evidence. Return the record to `Draft` when substantial rework is
required.

**Prohibited actions:** Treat the review as architecture approval or authorize
implementation or planning changes.

**Legal exits:** `Draft` or `Completed`.

### Completed

**Purpose:** The analytical review is finished and preserved as the canonical
historical analysis record.

**Entry criteria:** Required sections are complete or explicitly marked not
applicable; conclusions are supported by the stated analysis; limitations and
unresolved questions remain visible; repository-change confirmation is present;
and human review confirms that the record is complete as analysis.

**Permitted actions:** ADRs, ARDs, proposals, requirements, conformance records,
and other permitted consumers may cite the record or summarize it while
preserving its analytical boundaries.

**Prohibited actions:** Silently rewrite substantive content, treat completion
as implementation approval, or treat recommendations as accepted architecture
without a downstream decision record.

**Legal exits:** `Corrected` or `Historical`.

### Corrected

**Purpose:** Preserve an explicit correction to a previously `Completed` AAR
without hiding or rewriting its history.

**Entry criteria:** A material factual, structural, attribution, or analytical
defect is identified; the correction is explicitly authorized; and the original
content and reason for correction remain traceable.

**Required correction metadata:** Record the correction date, correction
authority, affected section, reason, previous wording or finding, corrected
wording or finding, effect on conclusions, and effect on downstream records.

**Permitted actions:** Make explicit, traceable corrections and update affected
links or references.

**Prohibited actions:** Quietly change conclusions, introduce unrelated new
analysis, or rewrite historical context without disclosure.

**Legal exits:** `Completed` when the correction is integrated and the record
remains active analytical context, or `Historical` when it no longer serves as
an active analytical source.

Corrections use an in-record correction history backed by Git history. This
matches the repository preference for traceable corrections without inventing a
separate correction document type.

### Historical

**Purpose:** Preserve an AAR that remains valuable for chronology and rationale
but is no longer the current analytical basis for active architecture work.

**Entry criteria:** Later analysis has replaced the record's active analytical
role, its subject is no longer active, or downstream architecture evolution has
made its recommendations obsolete.

**Permitted actions:** Historical citation, chronology and rationale review, and
comparison with later analysis.

**Prohibited actions:** Use the record as current architecture authority, use
outdated findings without identifying their historical status, or delete it
merely because later analysis exists.

**Terminal behavior:** `Historical` is normally terminal and must not return to
an active state. New analysis requires a new AAR identifier.

## Lifecycle Transitions

The only legal transitions are:

```text
Draft -> Under Review
Under Review -> Draft
Under Review -> Completed
Completed -> Corrected
Corrected -> Completed
Completed -> Historical
Corrected -> Historical
```

All other transitions are illegal unless a future approved governance decision
changes this standard. In particular, the following are prohibited:

- `Draft -> Completed`;
- `Draft -> Historical`;
- `Under Review -> Historical`;
- `Historical` to any active state;
- `Completed -> Draft`; and
- reuse of an identifier for replacement analysis.

## Review Outcomes

Review outcomes guide legal transitions but are not lifecycle states:

- **PASS:** The record is eligible to enter `Completed`.
- **PASS WITH CONDITIONS:** The record remains `Under Review` until conditions
  are resolved, unless the review explicitly documents them as non-blocking.
- **REVISE:** The record returns to `Draft`.
- **REJECT:** The analysis is abandoned and never becomes a `Completed` AAR. The
  assigned identifier remains unavailable for reuse.

Architecture approval and publication are not AAR lifecycle states.

## Authority

AARs are analytical only. They never independently authorize:

- implementation;
- planning or task activation;
- milestone changes;
- runtime behavior;
- commits; or
- pushes.

Human approval of an AAR accepts the analysis for preservation. Any downstream
action still requires authority from the record class that owns that action.

Completing an AAR means the analysis is complete. It does not approve
architecture, authorize implementation, activate planning, or authorize commits
or pushes. Architecture decisions remain the responsibility of downstream ADR
or ARD governance.

## Consumers

ADRs, ARDs, normative requirements, conformance specifications, architecture
documentation, planning proposals, runtime reports, execution reports, and
human-readable summaries may cite an AAR when relevant.

Consumers may summarize the title, scope, major findings, certification
conclusion, and limitations while linking to the canonical AAR. They may not
redefine findings, strengthen assumptions or certification results, remove
limitations, or convert recommendations into decisions or implementation
authority.

## Ownership

The canonical owner and consumer boundaries for AARs are defined in the
[Canonical Documentation Ownership Matrix](../documentation/OWNERSHIP_MATRIX.md).
AAR records reside in `docs/aar/`.

## Identifier and Filename

Each AAR uses one unique identifier in the form `AAR-NNN`, where `NNN` is a
three-digit sequence.

The filename convention is:

```text
AAR-NNN-short-title.md
```

Identifiers are stable and must not be reused after a record becomes historical
or is corrected.

## Metadata Requirements

Every AAR must begin with metadata that identifies:

- Record ID;
- Title;
- Status;
- Record Type;
- Authority;
- Authoring context;
- Canonical location;
- Supersedes;
- Related records; and
- Repository review scope.

Metadata must distinguish verified repository state from analysis that was not
revalidated against a repository snapshot.

## Writing Principles

Write in a precise engineering style. AARs must be evidence-first,
vendor-neutral where the scope permits, and implementation-independent. They
must avoid marketing language, AI narrative, unsupported claims, and
unexplained conclusions.

Define specialized terms, identify the evidence and method used, distinguish
facts from assumptions, compare credible alternatives, and explain how each
finding follows from the analysis. Preserve uncertainty rather than presenting
an unresolved matter as settled.

## Acceptance Criteria

An AAR is `Completed` only when:

- its purpose, scope, method, and repository review scope are explicit;
- required metadata is present and its identifier is unique;
- relevant evidence, alternatives, assumptions, and limitations are recorded;
- findings and recommendations follow from the documented analysis;
- unresolved matters and certification conditions remain explicit;
- referenced records and links resolve;
- review feedback has been reconciled or recorded as unresolved;
- the record contains no independent implementation or planning authority; and
- a human has accepted it for canonical preservation.

## Versioning and Correction Policy

An AAR identifier is unique, immutable, permanent, and never reused. Revision
history remains traceable in Git.

Editorial updates may correct spelling, formatting, or broken links when they do
not change analytical meaning. Material factual, structural, attribution, or
analytical changes follow the `Corrected` lifecycle state and its required
in-record correction history. Neither type of correction may silently change a
conclusion.

Substantially new analysis requires a new AAR identifier. The new record links
to the earlier record, and the earlier record remains preserved as historical
context rather than being overwritten.

## Relationship Between AAR Documents

`AAR_STANDARD.md` owns AAR governance, including lifecycle semantics.
`AAR_TEMPLATE.md` owns the reusable record structure. Individual AAR records
instantiate both. Neither the collection README nor the template may redefine
lifecycle semantics.

## Relationship to Future Architecture Decisions

AARs provide analysis and rationale. ADRs establish individual binding
architecture decisions. ARDs establish integrated architectural resolutions.
Downstream decision records must cite the relevant AAR and state their own
authority rather than treating the AAR recommendation as already approved.

## Out of Scope

This standard does not define runtime primitives, runtime semantics,
implementation design, verification rules, certification criteria, or
conformance tests. Those subjects belong inside appropriately scoped individual
records and do not arise from this document standard.
