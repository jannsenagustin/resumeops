<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# ResumeOps Engineering Handbook

## Project Identity

ResumeOps is:

- an evolving engineering documentation platform;
- a technical portfolio;
- a case-study publishing system;
- focused primarily on Splunk, observability, systems engineering, and documented technical work.

ResumeOps is not:

- a generic developer template;
- a chronological resume replica;
- a place to invent unfinished work;
- a React-learning demonstration site.

## Product Principles

- Prefer documentation over decoration.
- Prefer clarity over cleverness.
- Favor technical accuracy over promotional language.
- Use honest status labels.
- Favor maintainability over unnecessary abstraction.
- Protect accessibility and readability.
- Keep visual effects restrained.
- Never present planned work as complete.

## Architecture Principles

- App Router routes live under `app`.
- Shared presentation components live under `components`.
- Reusable domain data lives under `data`.
- Project documentation lives under `docs`.
- Do not manually edit generated directories such as `.next` and `out`, or dependency directories such as `node_modules`.
- Page components should primarily compose sections.
- Do not duplicate domain content across presentation files.
- Prefer Server Components unless browser behavior requires a Client Component.
- Avoid state and effects for static content.

## Component Principles

- Define component props with TypeScript.
- Prefer composition over duplicated markup.
- Do not create one-line wrapper components without meaningful reuse or clarity.
- Keep shared styles in shared components.
- Give each component a focused responsibility.
- Use semantic HTML.
- Maintain keyboard-visible focus states.
- Use `next/link` for internal routes so configured base paths are respected.
- External links require appropriate safe attributes.
- Avoid unnecessary Client Components.

### Shared component responsibilities

- `SectionHeader`: renders a section eyebrow, title, and description.
- `StatusBadge`: maps semantic case-study status to accessible labels and visual treatment.
- `TechBadge`: renders a technology label consistently.
- `ActionButton`: renders primary or secondary internal and external link actions.
- `CaseStudyHeader`: composes a case-study subtitle, title, and status badge.
- `ProjectCard`: presents featured and standard case-study summary data.
- `CaseStudyNav`: renders responsive in-page case-study navigation.
- `ArchitectureDiagram`: renders typed semantic component or system hierarchies.
- `CaseStudyTimeline`: renders typed development milestones and their status.
- `DecisionCard`: presents one engineering decision and its rationale.
- `LessonCard`: presents one grounded lesson from the repository.

## Data Conventions

- Every domain record has a stable `id`.
- Routeable records have a URL-safe `slug`.
- Store normalized semantic status values such as `active`, not display labels such as `Active Development`.
- Add an optional `route` only when the corresponding page exists.
- Identify internal and external links explicitly.
- Export reusable TypeScript models from the domain data module.
- Keep presentation labels and visual styling out of domain data.
- Do not give planned content invented links, completion claims, dates, or metrics.

## Case Study Standard

A mature engineering case study should eventually cover:

- Overview
- Architecture
- Implementation or Workflow
- Testing or Validation
- Troubleshooting or Challenges
- Engineering Decisions
- Lessons Learned
- Future Improvements or Roadmap

Early case studies do not need every section, but omissions should be intentional.

## ADR Standard

- Store new Architecture Decision Records in `docs/adr`.
- Use the `ADR-NNN-descriptive-slug.md` naming format.
- Preserve superseded decision history in Git rather than an active legacy archive.
- Include `Status`, `Context`, `Decision`, and `Consequences`.
- Do not silently rewrite an accepted decision.
- Create a later ADR when a major change supersedes an earlier decision.

## Codex Task Standard

Implementation prompts should ideally include:

- Task
- Goal
- Context
- Required changes
- Constraints
- Acceptance criteria
- Validation
- Final report

Codex should:

- inspect the repository before editing;
- follow this handbook;
- avoid unrelated changes;
- avoid package installation unless explicitly authorized;
- run appropriate validation;
- report files changed and assumptions;
- not commit unless explicitly instructed.

## Validation Standard

Before approval, run relevant available commands such as:

```text
npm run lint
npm run build
npm run dev
```

Use local visual review when appropriate. Also verify:

- internal routes;
- static-export and configured base-path compatibility;
- responsive layout;
- keyboard navigation and visible focus;
- factual accuracy;
- absence of unsupported claims.

## PR Review Checklist

- [ ] Scope matches the request.
- [ ] Architecture follows repository conventions.
- [ ] Types model domain state accurately.
- [ ] Semantic HTML, focus states, and link safety are preserved.
- [ ] Responsive behavior remains usable.
- [ ] Copy is accurate and planned work is labeled honestly.
- [ ] Internal and external links are valid.
- [ ] Lint and build pass.
- [ ] Relevant documentation is updated.
- [ ] No unrelated changes are included.

## Git Standard

Use focused conventional messages, for example:

- `feat: add ResumeOps case study`
- `refactor: move case-study data into shared module`
- `docs: add architecture decision records`
- `fix: correct GitHub Pages case-study link`
- `style: align case-study section spacing`

Avoid vague messages such as `update`, `changes`, or `fix stuff`.

## Definition of Done

A feature is complete only when:

- acceptance criteria are met;
- lint passes;
- the production build passes;
- visual behavior is reviewed when applicable;
- documentation is updated;
- the git diff is reviewed;
- the user approves the outcome.
