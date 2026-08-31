# 👋 Before You Start

If you're wondering where Project Atlas currently stands, don't start by reading random documents.

Head over to the **Planning** folder first:

[https://github.com/jannsenagustin/resumeops/tree/main/docs/planning](https://github.com/jannsenagustin/resumeops/tree/main/docs/planning)

That's the living source of truth for the project.

It tells you:

- what we're currently working on
- what's coming next
- ideas we're parking for later
- engineering decisions we've made
- lessons we've learned
- the active batch being executed

Everything else in the repository should support what's documented there—not the other way around.

If something appears to disagree with the Planning docs, assume the Planning docs are correct and treat the discrepancy as documentation drift that should be fixed.

# Project Atlas

Project Atlas is an evidence-backed Engineering Console and workstation-scale systems lab. It demonstrates Splunk role separation, Windows telemetry, controlled configuration delivery, engineering decisions, and validation without presenting planned work as complete.

## Key links

- Recruiters: [live Engineering Console](https://jannsenagustin.github.io/resumeops/), [Project Atlas](https://jannsenagustin.github.io/resumeops/projects/atlas/), and [professional resume](https://jannsenagustin.github.io/resumeops/resume/)
- Technical reviewers: [architecture](docs/architecture.md), [milestones](docs/milestones.md), and [evidence](docs/evidence/README.md)
- Durable narrative: [Engineering Overview](CASE_STUDY.md)

Atlas originated as ResumeOps; the repository and GitHub Pages path retain `resumeops` to preserve links.

## Validated at a glance

Milestones 01-04 validate the containerized Indexer and Search Head, distributed search, and Windows Application, Security, and System Event Log ingestion. Milestone 05 has now validated centralized input and output delivery plus searchable ingestion through the Deployment Server and remains current pending review and later Git-controlled release work. [Milestones](docs/milestones.md) owns status; [evidence](docs/evidence/README.md) owns proof.

## Canonical documentation map

- [Documentation index](docs/documentation/README.md)
- Engineering: [architecture](docs/architecture.md), [milestones](docs/milestones.md), [evidence](docs/evidence/README.md), [infrastructure guide](infrastructure/atlas/README.md)
- Planning: [Atlas EOS](docs/planning/README.md), [backlog](docs/planning/BACKLOG.md), [active batch](docs/planning/ACTIVE_BATCH.md), [ideas](docs/planning/IDEAS.md), [proposals](docs/engineering-proposals/README.md), [decisions](docs/planning/DECISIONS.md), [lessons](docs/planning/LESSONS_LEARNED.md), [execution reports](docs/execution-reports/README.md)
- Governance: [Project Philosophy](ai/PROJECT_PHILOSOPHY.md), [AI Rules](ai/AI_RULES.md), [Constitution](ai/CONSTITUTION.md), [documentation rules](docs/documentation/DOCUMENTATION_RULES.md)
- Engineering method: [Canonical Projection Principle](ai/ENGINEERING_PHILOSOPHY.md#canonical-projection-principle)
- Direction: [roadmap](ROADMAP.md)

## Local development

Requires Node.js 20 or another version supported by the locked dependencies.

```bash
npm ci
npm run dev
```

## Validation commands

```bash
npm run lint
npx tsc --noEmit
npm run build
git diff --check
```

The static export uses the base path in `next.config.ts` and writes to `out/`.

## License

Available under the [MIT License](LICENSE).
