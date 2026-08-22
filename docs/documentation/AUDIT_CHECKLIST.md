# Documentation Audit Checklist

- [ ] Every current engineering fact has one canonical owner.
- [ ] Narrative claims link to their owner and remain concise.
- [ ] Milestone status appears canonically in `docs/milestones.md`.
- [ ] Future priority appears canonically in `docs/planning/BACKLOG.md`.
- [ ] Executable scope appears only in `docs/planning/ACTIVE_BATCH.md`.
- [ ] Architecture separates ingestion, management, and administration paths.
- [ ] Status claims have evidence or an explicit unvalidated label.
- [ ] Historical records are recognizable as historical.
- [ ] Obsolete Deployment Server-in-Compose claims are absent from current narratives.
- [ ] Project identity is Atlas except for intentional history and stable paths.
- [ ] Markdown links resolve with case-sensitive paths.
- [ ] IDs are unique.
- [ ] No evidence, runtime configuration, or protected artifact changed.
- [ ] `git diff --check`, lint, TypeScript, and build results are recorded for review.
