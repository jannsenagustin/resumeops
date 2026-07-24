# Sprint 4C — Hero Redesign

## Objective

Replace the oversized resume-style Hero with a compact engineering landing section that communicates identity, current work, and evidence without changing the established visual language.

## Changes

- Introduced a responsive two-column Hero.
- Added a concise professional identity and specialization.
- Added case-study and resume controls.
- Added a Currently Building summary linked to typed roadmap data.
- Added metadata for Splunk experience, enterprise delivery, focus, and location.
- Removed unsupported title wording and full-screen vertical spacing.

## Technical Decisions

- Keep the Hero as a Server Component.
- Store Hero content in typed data.
- Resolve current and next roadmap items by stable ID.
- Disable the resume control until a verified downloadable asset exists.
- Preserve the dark theme and restrained green accents.

## Challenges

- Communicating substantial experience without recreating a resume header.
- Keeping the first viewport compact across mobile, tablet, and desktop widths.
- Avoiding broken or invented download links.

## Lessons Learned

- A compact Hero can provide stronger direction than a full-screen introduction.
- Shared roadmap data prevents status drift.
- Disabled actions need an accessible explanation.

## Review Outcome

Responsive review covered 375px, 768px, and 1440px widths with no horizontal overflow. Lint and production build validation passed.

## Release

Included in the Sprint 4 platform milestone; not recorded as a separately versioned release in the current changelog.

## Screenshots

Placeholder — add approved mobile, tablet, and desktop Hero screenshots.

## Social Media Post

Placeholder — add the published Sprint 4C post URL when available.
