# AI Contributor Rules

## Purpose

These rules govern AI-assisted work in Project Atlas. They apply to code,
configuration, documentation, data, design, validation, and repository
operations.

AI output is a proposal until it has been inspected and validated. Fluency is
not evidence. Confidence is not authority.

## 1. Understand the Repository Before Coding

Before changing Atlas:

1. Read `AGENTS.md` and `ATLAS_PRINCIPLES.md`.
2. Read the files named in the task and the nearest canonical documentation.
3. Inspect the current implementation, repository status, and relevant history.
4. Identify existing abstractions, terminology, validation commands, and
   protected scope.
5. Determine whether the requested state is implemented, planned, or unknown.

Do not begin from assumptions about a typical Next.js portfolio or a typical
Splunk deployment. Atlas has its own architecture and documented boundaries.

## 2. Respect the Architecture

Keep responsibilities in their established locations:

- routes and page composition in `app/`;
- shared interface behavior in `components/`;
- reusable domain records in `data/`;
- canonical engineering documentation in `docs/`;
- Atlas runtime configuration in `infrastructure/atlas/`; and
- governance for AI contributors in `ai/`.

Do not move or duplicate canonical records for convenience. Do not bypass
typed data with copied presentation strings when a domain source already
exists. Prefer Server Components unless browser behavior requires client state.

## 3. Make Incremental Changes

Implement the smallest coherent change that satisfies the requirement. Preserve
unrelated behavior and existing worktree changes. Do not combine a correction
with a redesign, broad cleanup, dependency upgrade, or repository migration
unless those changes are explicitly required.

Before introducing a new abstraction, determine whether the existing structure
can express the change clearly. Before rewriting, determine whether a focused
edit solves the actual problem.

## 4. Never Fabricate

Never invent:

- commands that were not run;
- test or validation results;
- runtime behavior that was not observed;
- screenshots, logs, event counts, dates, versions, or metrics;
- architecture components or relationships;
- incidents, failures, lessons, or tradeoffs;
- completed work, links, evidence, or repository history; or
- production readiness.

If the repository and available evidence do not establish a fact, label it
unknown, planned, inferred, or unverified as appropriate. Ask for evidence when
the missing fact would materially change the work.

## 5. Preserve Technical Accuracy

Use canonical component names, milestone names, status terms, ports, versions,
and boundaries. Verify technical statements against configuration, runtime
evidence, and canonical documents.

Do not strengthen a claim while paraphrasing it. In Atlas, `configured`,
`reachable`, `healthy`, `searchable`, and `validated` describe different
states. Keep those distinctions intact.

Do not expose credentials, tokens, private keys, generated secrets, or
secret-bearing Splunk configuration. Exclusion of unsafe evidence must be
documented without reproducing the sensitive value.

## 6. Separate Completed Work From Planned Work

Maintain explicit boundaries among:

- implemented and validated;
- implemented but not validated;
- in progress;
- planned;
- exploratory; and
- unknown.

Do not give planned work completion language, proof links, metrics, or dates it
has not earned. Do not allow future milestones to alter what an earlier
milestone knew or proved at the time.

## 7. Prefer Evidence Over Explanation

Use narrative to interpret evidence, not replace it. For every material claim,
ask what repository artifact or runtime observation supports it.

Prefer the strongest suitable evidence:

```text
Validated runtime behavior
  -> Runtime logs or command output
  -> Configuration
  -> Screenshots
  -> Narrative
```

Do not add redundant artifacts when an existing source already proves the
claim. Record the evidence boundary when proof is incomplete or unavailable.

## 8. Document Decisions and Tradeoffs

Explain consequential choices in the document type that owns them. Use an ADR
for an architectural decision with lasting consequences. Use a journal for
working chronology. Use a milestone for the canonical validated stage.

A defensible decision states:

- the problem and current state;
- the chosen approach;
- the relevant alternatives;
- the tradeoffs and constraints;
- the validation method; and
- the effect on future work.

Do not create an ADR for a trivial implementation detail. Do not silently
rewrite an accepted decision when a later decision supersedes it.

## 9. Maintain Design Consistency

Treat the Engineering Console as one visual system. Reuse `--atlas-*` tokens,
existing typography, spacing, status language, focus behavior, and interaction
patterns.

Design changes must improve reading, orientation, comparison, accessibility,
or inspection. Avoid generic SaaS patterns, glows, glass effects, animated
decoration, fake terminals, promotional cards, arbitrary metrics, and visual
novelty.

Preserve responsive behavior, keyboard access, visible focus, 44-pixel targets,
and reduced-motion support. Verify visual changes when browser access is
available. If it is not, report visual confirmation as pending.

## 10. Write Maintainable Code

Use semantic HTML, typed props, stable identifiers, and focused components.
Prefer composition over duplicated markup and plain control flow over clever
indirection. Keep state close to the behavior that requires it. Avoid effects
for static content.

Comments should explain a non-obvious constraint or decision, not restate the
code. Names should reflect the Atlas domain. Generated directories and
dependency contents are never source files to edit.

## 11. Avoid Unnecessary Dependencies

Use the platform, framework, and existing repository tools before adding a
package. A dependency must solve a real requirement that cannot be met clearly
with the current stack. Consider maintenance, security, bundle cost, static
export compatibility, and long-term ownership.

Do not install, upgrade, or replace dependencies without explicit scope and
validation.

## 12. Respect Existing Abstractions

Inspect an abstraction before extending or bypassing it. Reuse shared
components and typed domain sources when their responsibility matches the
change. Do not force unrelated behavior into an abstraction merely to avoid a
small amount of local code.

If an abstraction is inadequate, explain the mismatch and change it narrowly.
Preserve its consumers unless the task explicitly includes migration.

## 13. Simplify Before Redesigning

Find the root cause before changing presentation or structure. Remove an
unnecessary override before adding a compensating rule. Correct hierarchy
before creating another panel. Clarify ownership before duplicating content.

Redesign is justified only by a demonstrated usability, accessibility, or
engineering communication need. Novelty is not a requirement.

## 14. Validate and Report Honestly

Run validation appropriate to the change, normally including:

```text
npm run lint
npm run typecheck
npm run build
git diff --check
```

Also inspect the final diff and repository status. For interface work, verify
relevant routes, viewports, keyboard behavior, focus, overflow, and interaction.
For engineering changes, validate the actual system behavior when authorized
and available.

Report commands exactly as they ran. Distinguish passed checks, failed checks,
environmental limitations, and checks not performed. Never claim visual or
runtime verification based only on source inspection.

Do not stage, commit, push, tag, release, or deploy unless the user explicitly
authorizes that action.

## AI Bootstrap Prompt

Use the following when an AI assistant first opens this repository:

```text
You are contributing to Project Atlas, an evidence-backed engineering record
for a real workstation-scale Splunk environment.

Before proposing or making changes:

1. Read AGENTS.md, ATLAS_PRINCIPLES.md, ai/PROJECT_PHILOSOPHY.md,
   ai/AI_RULES.md, and ai/CONSTITUTION.md.
2. Inspect README.md and the canonical architecture, milestone, ADR, journal,
   evidence, or DEA documents relevant to the task.
3. Inspect git status and preserve unrelated or uncommitted work.
4. Establish the current implemented and validated state from repository
   evidence. Do not infer completion from prose or presentation alone.
5. Identify the smallest change that respects existing architecture,
   chronology, terminology, design tokens, accessibility, and document
   ownership.
6. Do not fabricate engineering, evidence, validation, metrics, history, or
   production readiness. Surface uncertainty explicitly.
7. Validate the result in proportion to risk and report exactly what was and
   was not verified.
8. Do not stage, commit, push, tag, release, or deploy without explicit
   authorization.

Treat AI output as a proposal. Evidence and human engineering judgment remain
authoritative.
```
