# Site Architecture

## Purpose

ResumeOps is a statically exported engineering portfolio built with the Next.js App Router. Its architecture separates route composition, reusable presentation, typed content, and engineering documentation so each can evolve without duplicating responsibilities.

## Runtime Architecture

The application uses:

- Next.js 16 with the App Router;
- React 19 and TypeScript;
- Tailwind CSS for styling;
- Server Components for static content;
- static HTML export for GitHub Pages.

`app/layout.tsx` defines global metadata, fonts, language, and the shared document shell. `app/page.tsx` composes the homepage. The ResumeOps case study is published at `app/case-studies/resumeops/page.tsx`.

## Component Hierarchy

```text
RootLayout
└── Home
    ├── Navbar
    ├── Hero
    ├── WhyIBuild
    ├── Projects
    ├── EnterpriseExperience
    ├── CareerJourney
    └── CurrentlyBuilding
```

The case-study route composes case-study-specific sections from shared headers, navigation, diagrams, timelines, decision cards, and lesson cards.

## Data Flow

Typed modules under `data/` are the content source of truth:

```text
data modules
    ↓ imported by
Server Components
    ↓ composed by
App Router pages
    ↓ generated as
static HTML and assets
```

This keeps professional claims, roadmap status, case-study metadata, and presentation logic separate. Static content does not require client state or effects.

## Static Export

`next.config.ts` configures:

- `output: "export"` to generate the `out/` directory;
- trailing slashes for static hosting compatibility;
- a production base path of `/resumeops`;
- a matching production asset prefix;
- unoptimized images, which avoids reliance on the Next.js image optimization server.

These choices allow routes to be served without a Node.js runtime. They also mean runtime server features must not be assumed.

## GitHub Pages Deployment

`.github/workflows/deploy.yml` deploys pushes to `main`:

1. Check out the repository.
2. Configure Node.js 20.
3. Install dependencies with `npm ci`.
4. Run `npm run build`.
5. Upload the generated `out/` directory as a Pages artifact.
6. Deploy the artifact with the official GitHub Pages action.

The production base path ensures internal application assets resolve under the repository Pages path.

## Folder Organization

```text
app/          Routes, layout, metadata, and global styles
components/   Reusable section and UI presentation
data/         Typed content and domain models
docs/         Architecture, ADRs, sprints, releases, and guides
public/       Static assets
.github/      Deployment workflow
```

Generated and dependency directories such as `.next/`, `out/`, and `node_modules/` are not documentation or source-of-truth locations.

## Constraints

- Planned work must remain labeled as planned.
- Internal links must remain compatible with the production base path.
- Content changes should be made in typed data when a data module owns that content.
- Dynamic server-only features require a deployment decision beyond the current static-export architecture.
