# 📖 ResumeOps Changelog

> A portfolio built in public, one milestone at a time.

---

## Unreleased

### Sprint 6B — Project Atlas Infrastructure

#### Added

- Started Project Atlas Sprint 6B.
- Added the container infrastructure foundation.
- Added the environment-variable and secret-management plan.
- Added the deployment verification checklist.
- Added troubleshooting documentation.
- Prepared separate Splunk Search Head, Indexer, and Deployment Server roles.

#### Notes

- Sprint 6B remains in progress pending Docker runtime validation and evidence capture.
- Data onboarding, dashboards, detections, and alerting remain out of scope.

### Sprint 6A — Enterprise Observability Home Lab

#### Added

- Started the Enterprise Observability Home Lab project.
- Defined the initial distributed Splunk architecture.
- Established project scope and limitations.
- Defined the Linux authentication monitoring use case.
- Added architecture decisions and implementation planning.

#### Notes

- v0.6.0 remains in architecture and planning.
- No Splunk deployment, data onboarding, search, dashboard, or alert is claimed as complete.

---

# v0.1.0 — Genesis 🌱

**Release Date:** July 16, 2026

**Project Status:** Initial Release

---

## v0.1.1 — First Deployment

### Added

- GitHub Pages deployment workflow
- Automated deployment using GitHub Actions
- Static export configuration for Next.js


🚀 First Public Deployment

Status
🟢 LIVE

Deployment
GitHub Pages

URL
https://jannsenagustin.github.io/resumeops/

## 🎯 Objective

Create the foundation of ResumeOps by setting up the development environment and building the first functional homepage.

---

## ✨ Features

- Created a Next.js application
- Configured Tailwind CSS
- Built the first homepage
- Added responsive navigation bar
- Added Hero section
- Centered layout using Flexbox
- Added hover effects for navigation
- Implemented dark theme
- Initialized Git repository
- Created the first Git milestone

---

## 🛠 Technologies

- Next.js
- React
- TypeScript
- Tailwind CSS
- Git
- Node.js
- VS Code

---

## 📚 Knowledge Gained

### Frontend

- JSX
- React Components
- Semantic HTML
- Flexbox
- Tailwind utility classes
- Hot Reload

### Development Workflow

- Git initialization
- Version control
- Commit history
- Local development server

---

## 🧠 Developer Journal

Today was the first day of ResumeOps.

I started with no experience in modern web development.

Instead of relying on templates, I learned how each piece worked by building the homepage from scratch.

Some concepts, like Flexbox, were confusing at first, but after experimenting with parent and child containers, the layout finally made sense.

This milestone represents the beginning of my transition from Splunk Administrator and Developer into someone capable of building full-stack web applications.

---

## 📸 Milestone

Screenshot:

milestones/v0.1-genesis.png

Git Commit:

696f97b

Commit Message:

Milestone 1 - ResumeOps Foundation

---

## 🚀 Next Target

v0.2 — Navigation

Goals

- Improve navbar design
- Add Contact button
- Better spacing
- Professional typography
- Recruiter-focused UI

## v0.2

### Added

- Introduced a new "Why I Build" section to establish the engineering philosophy behind ResumeOps.

### Changed

- Homepage now follows a narrative flow:
  Hero → Why I Build → Projects

### Notes

- This marks the first feature implemented through the ChatGPT → Codex → PR Review workflow.

## Foundation Refactor

### Changed

- Moved engineering case-study metadata into a typed shared data module.
- Normalized case-study status, route, slug, and link metadata.
- Expanded AGENTS.md into the ResumeOps engineering handbook.

### Added

- Architecture Decision Records under `docs/decisions`.
- Codex prompting guide under `docs/PROMPTING.md`.

### Notes

- The ResumeOps case study remains in progress.

## Case Study Content Refactor

### Changed

- Moved ResumeOps case-study content into a dedicated typed data module.
- Reduced the case-study route to a presentation and composition layer.
- Verified clean UTF-8 case-study content.
- Verified internal case-study navigation for local and GitHub Pages builds.

### Notes

- Sprint 4 remains in progress.

## Sprint 4B — Enterprise Experience

### Added

- Expanded Enterprise Experience into a structured engineering profile.
- Added typed engineering-domain, enterprise-delivery, leadership, and technology-stack data.
- Added verified Accenture delivery experience across selected global client environments.
- Added leadership, mentoring, internal training, and reusable-asset contributions.

### Changed

- Replaced résumé-style experience presentation with engineering-domain and delivery-focused content.
- Improved navigation focus treatment and semantics.

### Notes

- Accenture remains the employer of record for all listed client delivery.
- Unsupported metrics, confidential implementation details, and unverified architecture claims were intentionally excluded.

## Sprint 4C — Hero Redesign

### Changed

- Replaced the oversized résumé-style Hero with a compact engineering landing section.
- Updated the professional capability line to “Splunk Administrator • Developer.”
- Added clear case-study and résumé calls to action.
- Added a static Currently Building summary.
- Added concise metadata for experience, enterprise delivery, focus, and location.
- Improved Hero responsiveness, hierarchy, and accessibility.

### Removed

- Removed unsupported title wording from the Hero capability line.
- Removed full-screen vertical spacing that created excessive empty space.

### Notes

- The résumé control remains disabled until a verified downloadable asset is added.

## Sprint 4D — Brand & Content Refinement

### Added

- Official ResumeOps tagline:
  "Turning operational data into engineering insight."

### Changed

- Repositioned ResumeOps around Observability Engineering.
- Updated the primary professional identity to "Observability Engineer."
- Updated the supporting line to "Specializing in Splunk Enterprise."
- Refined the Hero summary to reflect a broader observability focus while preserving the verified Splunk specialization.
- Refined Hero messaging to accurately reflect verified enterprise experience.
- Updated browser title to reflect Observability Engineering positioning.
- Updated metadata to align with ResumeOps branding.
- Updated browser metadata and SEO.

## v0.5.0 — Documentation Architecture

### Added

- Documentation homepage under `docs/README.md`.
- Architecture documentation for the site and component structure.
- Architecture Decision Records for observability branding and GitHub Pages static export.
- Sprint 4A through Sprint 4D engineering journals.
- v0.4.0 retrospective release notes.
- Phased engineering roadmap under `docs/roadmap.md`.

### Changed

- Refactored the root README into a concise project entry point.
- Moved the canonical roadmap into the documentation hierarchy.
- Preserved the changelog and original decision archive as permanent history.

### Notes

- This release changes documentation architecture only. Application behavior and branding remain unchanged.
