# AAR-NNN — [Title]

> Use this template with the [Architecture Analysis Review Standard](AAR_STANDARD.md).
> Replace all bracketed instructions and remove template guidance before a record
> is accepted as `Completed`.

## Metadata

- **Record ID:** `AAR-NNN`
- **Title:** [Concise investigation title]
- **Status:** [Draft | Under Review | Completed | Corrected | Historical]
- **Record Type:** Architecture Analysis Review
- **Authority:** Analytical, non-implementation-authorizing
- **Authoring Context:** [Who requested or conducted the review and why]
- **Canonical Location:** `docs/aar/AAR-NNN-short-title.md`
- **Related Records:** [Canonical links or `None`]
- **Repository Review Scope:** [Snapshot, paths, exclusions, or `Not reviewed`]
- **Review Date:** [YYYY-MM-DD]

**Classification:** Required.

**Purpose:** Identify the record, its lifecycle state, authority boundary, and
review context.

**Expected content:** Complete every field with a precise value. Use `None`,
`Not reviewed`, or another explicit limitation rather than leaving ambiguity.

**Required evidence:** Link related canonical records and identify any
repository snapshot or paths actually reviewed.

**Prohibited content:** Unsupported repository claims, implied implementation
authority, invented identifiers, or an unverified commit SHA.

## Repository Review

**Classification:** Required.

**Purpose:** Declare whether repository state informed the review.

**Expected content:** Describe the reviewed snapshot, files, tools, method,
exclusions, and observed working-tree conditions, or state that no repository
review occurred.

**Required evidence:** Reproducible references to reviewed commits, paths,
commands, or artifacts when a repository review is claimed.

**Prohibited content:** Claims about repository state that were not inspected or
the use of hidden conversation context as canonical evidence.

[Repository review declaration]

## Executive Findings

**Classification:** Required.

**Purpose:** Present the principal analytical results without replacing the
supporting analysis.

**Expected content:** Concise findings, material conditions, uncertainty, and
the assessment boundary.

**Required evidence:** Each finding must trace to analysis and evidence later in
the record.

**Prohibited content:** New facts, unexplained conclusions, marketing claims, or
language that converts findings into authority.

[Executive findings]

## Problem Statement

**Classification:** Required.

**Purpose:** Define the architecture question the review investigates.

**Expected content:** The problem, affected boundary, decision pressure, and why
formal analysis is warranted.

**Required evidence:** References showing that the problem or constraint exists.

**Prohibited content:** A predetermined solution disguised as the problem.

[Problem statement]

## Scope

**Classification:** Required.

**Purpose:** Bound the investigation and prevent conclusions from extending
beyond reviewed material.

**Expected content:** In-scope systems, concerns, time or repository boundaries,
and explicit exclusions.

**Required evidence:** References for externally imposed scope boundaries.

**Prohibited content:** Unstated expansion into planning, implementation, or
unreviewed architecture.

[Scope and exclusions]

## Assumptions

**Classification:** Required; use `None` only when justified.

**Purpose:** Expose premises on which the analysis depends.

**Expected content:** Numbered assumptions, their rationale, sensitivity, and
the effect if an assumption is false.

**Required evidence:** Supporting evidence where available; clearly label an
assumption when evidence is unavailable.

**Prohibited content:** Hidden premises or assumptions presented as verified
facts.

[Assumptions]

## Background

**Classification:** Recommended.

**Purpose:** Provide the minimum context needed to understand the investigation.

**Expected content:** Relevant history, terminology, constraints, and prior
records.

**Required evidence:** Canonical links for historical or repository-specific
claims.

**Prohibited content:** Unrelated narrative, marketing language, or duplicated
canonical state.

[Background]

## Alternatives Considered

**Classification:** Required when credible alternatives exist; otherwise explain
why no alternatives apply.

**Purpose:** Demonstrate analytical neutrality and avoid hidden option selection.

**Expected content:** Each credible alternative, evaluation criteria, advantages,
disadvantages, dependencies, and rejection or retention rationale.

**Required evidence:** Comparable evidence for each evaluated alternative.

**Prohibited content:** Straw-man alternatives or unsupported preference.

[Alternatives and comparison]

## Analysis

**Classification:** Required.

**Purpose:** Record the reproducible reasoning that connects evidence to
findings.

**Expected content:** Method, criteria, evidence evaluation, trade-offs,
dependencies, and uncertainty.

**Required evidence:** Citations, calculations, observations, or other inspectable
inputs sufficient to reproduce the reasoning.

**Prohibited content:** Hidden reasoning, unexplained scoring, implementation
instructions, or AI narrative.

[Analysis]

## Findings

**Classification:** Required.

**Purpose:** State what the analysis establishes within its scope.

**Expected content:** Numbered findings with confidence, conditions, and direct
traceability to analysis.

**Required evidence:** A reference from every finding to its supporting analysis
and evidence.

**Prohibited content:** Recommendations presented as findings, unsupported
certainty, or binding architecture decisions.

[Findings]

## Formal Models

**Classification:** Optional unless the review relies on formal notation,
invariants, state models, trust models, or calculations.

**Purpose:** Preserve precise definitions and relationships used by the analysis.

**Expected content:** Defined symbols, inputs, outputs, constraints, invariants,
and interpretation.

**Required evidence:** Derivation, authoritative references, or reproducible
examples for each model.

**Prohibited content:** Undefined notation or a model presented as validated
beyond the evidence.

[Formal models or `Not applicable`]

## Risks

**Classification:** Required.

**Purpose:** Identify adverse outcomes associated with the problem, alternatives,
or recommendations.

**Expected content:** Risk, cause, consequence, likelihood or uncertainty,
impact, and relevant mitigations or owners when known.

**Required evidence:** Source or analytical basis for each material risk.

**Prohibited content:** False precision, concealed residual risk, or risk
acceptance without authority.

[Risks]

## Limitations

**Classification:** Required.

**Purpose:** Bound the reliability and applicability of the review.

**Expected content:** Evidence gaps, environmental constraints, untested cases,
identity or trust limitations, and conclusions that cannot be drawn.

**Required evidence:** References to the affected scope, method, or missing input.

**Prohibited content:** Omission of known limitations or language that silently
strengthens the assessment.

[Limitations]

## Open Questions

**Classification:** Required; use `None` only after explicit review.

**Purpose:** Preserve unresolved matters for later investigation or decision.

**Expected content:** Each question, why it matters, required evidence, and the
record or authority expected to resolve it when known.

**Required evidence:** Traceability to the analysis gap or conflicting evidence.

**Prohibited content:** Treating an unresolved question as an accepted decision.

[Open questions]

## Recommendations

**Classification:** Recommended.

**Purpose:** Identify evidence-supported next considerations without granting
authority.

**Expected content:** Recommendations, rationale, prerequisites, uncertainty, and
the downstream decision record or authority required.

**Required evidence:** Traceability to findings and limitations.

**Prohibited content:** Commands, task activation, implementation authorization,
commit or push permission, or recommendations presented as approved decisions.

[Recommendations]

## Future Work

**Classification:** Optional.

**Purpose:** Record investigations or evidence collection that may follow this
review.

**Expected content:** Candidate work, dependency, expected evidence, and the
separate planning or authorization needed.

**Required evidence:** Link to the originating gap, limitation, or open question.

**Prohibited content:** Planning-state changes, commitments, priorities, or
claims that future work is authorized.

[Future work or `None`]

## Completeness Assessment

**Classification:** Required.

**Purpose:** Evaluate the record against the AAR Standard acceptance criteria.

**Expected content:** Section and metadata completeness, evidence sufficiency,
unresolved review feedback, limitations, and the basis for the stated status.

**Required evidence:** A check against the
[AAR Standard acceptance criteria](AAR_STANDARD.md#acceptance-criteria).

**Prohibited content:** A `Completed` claim when required content, evidence, or
human acceptance is missing.

[Completeness assessment]

## Repository Change Confirmation

**Classification:** Required.

**Purpose:** State exactly what repository state, if any, changed while producing
the AAR.

**Expected content:** Created and modified files, validation performed, protected
state confirmation, and commit or push status. State explicitly when the review
made no repository changes beyond its own record.

**Required evidence:** Working-tree inspection and applicable validation output.

**Prohibited content:** Unverified clean-state claims, concealed modifications,
or implied permission for additional changes.

[Repository change confirmation]

## Writing Rules

- Use a precise engineering tone and evidence-first ordering.
- State assumptions, uncertainty, confidence, and limitations explicitly.
- Remain implementation-independent and preserve analytical neutrality.
- Record enough method and evidence for reproducibility.
- Link findings, recommendations, and limitations to their supporting material.
- Keep conclusions visible; do not hide them in implication or unexplained
  scoring.
- Avoid marketing language, AI narrative, and unsupported certainty.

## Validation Rules

Before an AAR is accepted as `Completed`, verify:

- all required sections are present and optional omissions are explicit;
- every required metadata field has a precise value;
- evidence references resolve and support the associated claims;
- assumptions, uncertainty, and limitations remain visible;
- the repository review declaration matches the work actually performed;
- the repository change confirmation matches the final working-tree state;
- findings and recommendations are traceable and do not create authority; and
- Markdown, links, identifiers, ownership, and applicable repository validators
  pass.

## Record Relationship

```text
AAR Standard
    -> AAR Template
        -> Individual AAR Records
            -> ADR
                -> ARD
```

The [AAR Standard](AAR_STANDARD.md) governs the document class. This template
implements its reusable structure. Individual AARs preserve analysis and may
provide rationale to a later ADR. An ADR establishes a binding architecture
decision, while an ARD may establish an integrated architectural resolution.
Each record retains its own authority boundary; progression through this chain
is neither automatic nor implementation authorization.
