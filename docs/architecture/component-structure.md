# Component Structure

## Purpose

ResumeOps uses focused Server Components and typed data modules to keep the homepage readable, reusable, and maintainable. Page files compose sections; they do not own repeated presentation patterns or large content models.

## Homepage Composition

`app/page.tsx` renders the homepage in this order:

1. `Navbar`
2. `Hero`
3. `WhyIBuild`
4. `Projects` (presented as Engineering Case Studies)
5. `EnterpriseExperience`
6. `CareerJourney`
7. `CurrentlyBuilding`

This sequence moves from identity and motivation through evidence, experience, career context, and future work.

## Hero

`Hero` presents the professional identity, Splunk Enterprise specialization, ResumeOps tagline, verified engineering summary, calls to action, current roadmap focus, and concise metadata.

Hero content is stored in `data/hero.ts`. The component also resolves current and next roadmap items from `data/currentlyBuilding.ts`, preventing duplicated project status.

## Navbar

`Navbar` provides uncluttered in-page navigation to the main homepage sections. It remains a static, keyboard-accessible Server Component.

## Sections

- `WhyIBuild` explains the engineering philosophy behind the work.
- `Projects` renders featured and planned Engineering Case Studies.
- `EnterpriseExperience` presents verified professional experience by engineering domain, delivery, leadership, and technology.
- `CareerJourney` separates personal continuity and relocation context from technical credentials.
- `CurrentlyBuilding` presents roadmap items without implying completion.

## Data Separation

Presentation and content are separated through typed modules:

- `data/hero.ts` — Hero identity, summary, current-project references, and metadata.
- `data/caseStudies.ts` — case-study cards, status, routes, and links.
- `data/resumeopsCaseStudy.ts` — detailed ResumeOps case-study content.
- `data/experience.ts` — enterprise experience and career journey.
- `data/currentlyBuilding.ts` — planned observability and Splunk work.

Stable IDs connect related records without copying labels or status values between files.

## Shared Components

- `SectionHeader` standardizes section eyebrow, title, and description.
- `StatusBadge` maps semantic status to consistent labels and styles.
- `TechBadge` renders technology pills.
- `ActionButton` standardizes internal and external calls to action.
- `CaseStudyHeader` composes case-study identity and status.
- `ProjectCard` presents featured and planned case-study summaries.
- `CaseStudyNav`, `ArchitectureDiagram`, `CaseStudyTimeline`, `DecisionCard`, and `LessonCard` support detailed case-study publishing.

## Future Component Strategy

New components should be introduced only when they provide meaningful reuse, isolate a clear responsibility, or simplify page composition. Future engineering projects should:

- use existing section and badge primitives;
- keep domain content in typed data modules;
- remain Server Components unless browser interaction requires otherwise;
- extend the case-study system before creating parallel presentation patterns;
- preserve semantic HTML, keyboard access, and static-export compatibility.
