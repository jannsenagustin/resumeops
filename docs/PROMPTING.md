# Codex Prompting Guide

ResumeOps uses scoped implementation prompts so AI-assisted work remains reviewable and aligned with product intent. Vague prompts omit important constraints and acceptance criteria, which makes unrelated changes, unsupported assumptions, and incomplete validation more likely.

AI output is a draft implementation. It must always be inspected, tested, and approved by a person.

## Standard Prompt Structure

1. **Task** — the concrete change to make.
2. **Goal** — why the change matters.
3. **Context** — relevant architecture and current behavior.
4. **Required changes** — files and behavior in scope.
5. **Constraints** — actions and files that are out of scope.
6. **Acceptance criteria** — observable conditions for completion.
7. **Validation** — commands and manual checks.
8. **Final report** — information Codex should return.

## Feature Prompt Template

```text
# Task
Add [feature] to ResumeOps.

# Goal
Explain the visitor or engineering outcome.

# Context
List the relevant route, data module, and shared components.

# Required changes
- Create or modify exact files.
- Define required copy and behavior.

# Constraints
- Preserve planned-work labels.
- Do not install packages or add unnecessary client state.
- Do not modify unrelated components.

# Acceptance criteria
- Describe the rendered result, routes, accessibility, and data behavior.

# Validation
Run npm run lint and npm run build.
Report files changed, results, and assumptions.
```

## Refactor Prompt Template

```text
# Task
Refactor [current implementation] into [target architecture].

# Preserve
- Existing routes, copy, visual behavior, and uncommitted valid work.

# Required changes
- Identify the new source of truth.
- Name components or data modules to update.
- Remove duplicated data or presentation logic.

# Constraints
- Do not redesign or add product claims.
- Keep static-export compatibility.

# Acceptance criteria
- One source of truth exists.
- Types are normalized.
- Existing behavior still builds and renders.

# Validation
Run lint, build, route checks, and git diff review.
```

## Bug-Fix Prompt Template

```text
# Task
Fix [specific observed failure].

# Reproduction
Provide the route, environment, steps, expected result, and actual result.

# Scope
Diagnose the root cause and change the minimum necessary files.

# Constraints
Do not hide the error, weaken types, or redesign adjacent UI.

# Acceptance criteria
The reproduction passes without regressing related behavior.

# Validation
Run the narrow check plus npm run lint and npm run build.
```

## Documentation Prompt Template

```text
# Task
Document [decision, workflow, or case-study section].

# Sources
Name repository files and verified facts that may be used.

# Required structure
List headings, links, and terminology.

# Constraints
Do not invent dates, metrics, completion, or technical claims.

# Acceptance criteria
Documentation is accurate, linked, concise, and consistent with ResumeOps.
```

## Code-Review Prompt Template

```text
# Task
Review the current diff for correctness and regressions.

# Focus
- Scope and architecture
- Type safety
- Accessibility and responsiveness
- Internal and external links
- Static export behavior
- Unsupported claims

# Output
List actionable findings by severity with file and line references.
State explicitly when no findings remain.
```

## Useful Constraints

- Preserve the existing dark theme and spacing.
- Do not mark planned Splunk labs as complete.
- Use Server Components for static content.
- Use `next/link` for internal routes under the configured base path.
- Do not install packages, commit, or push.
- Modify only named files unless compatibility requires otherwise.
- Preserve valid uncommitted work.

## Useful Acceptance Criteria

- The homepage and named case-study routes render successfully.
- Typed data has stable IDs, URL-safe slugs, and semantic status values.
- Keyboard users have visible focus states.
- Mobile and desktop layouts remain usable.
- External links use safe attributes.
- Generated production links contain the configured GitHub Pages base path.

## Useful Validation Instructions

- Run `npm run lint`.
- Run `npm run build` and confirm expected static routes.
- Inspect generated HTML for internal base-path links when relevant.
- Review `git diff --check` and `git status --short`.
- Use local visual review for meaningful layout changes.

AI assistance accelerates implementation; it does not replace engineering judgment. Review the diff, verify the facts, test the behavior, and approve the result before merging.
