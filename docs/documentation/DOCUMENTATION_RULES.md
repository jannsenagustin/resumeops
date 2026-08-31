# Documentation Rules

1. One fact has one owner.
2. Narrative documents summarize but do not redefine canonical facts.
3. Update a canonical owner before its consumers.
4. Current-state facts require explicit canonical references.
5. Historical content must be labeled historical.
6. Remove or archive obsolete documents instead of silently leaving them current.
7. Status claims require evidence.
8. Consumers may use concise summaries when they clearly link to the canonical source.
9. Reconcile AI-generated documentation against canonical sources before acceptance.
10. Reduction must not destroy useful operational knowledge or historical traceability.
11. Published evidence must follow the convention and appear in the canonical
    index defined by `docs/evidence/README.md`; evidence renames use `git mv`
    after inbound references are inventoried.
12. Atlas EOS synchronization reads `docs/planning/SESSION_NOTES.md` first as
    the authoritative record of that engineering session; it never uses
    `SESSION_TEMPLATE.md` as evidence of completed work.
13. Website evidence records must be derived from the canonical artifact index
    in `docs/evidence/README.md`; application pages must not maintain separate
    evidence inventories.
14. Milestone `Active Work` contains identifiers only: `None` or exactly
    `BATCH-NNN / ATL-NNN`. Review, Done, and In Progress belong in task or batch
    status fields; never append status prose to `Active Work`.

If a current-state sentence requires frequent manual synchronization across multiple files, it is likely owned in the wrong place.

Application interfaces must consume current milestone and executable-work state
through the typed project-state layer. Hardcoded copies of current status,
active objectives, evidence availability, or milestone phase are prohibited.
Run `npm run audit:state` before treating project-state work as complete.

This is the
[Canonical Projection Principle](../../ai/ENGINEERING_PHILOSOPHY.md#canonical-projection-principle):
repository documents own engineering truth, while applications and services
project it through reproducible, audited parsers and models.

Documentation interfaces also follow
[Engineering Narrative](../../ai/ENGINEERING_PHILOSOPHY.md#engineering-narrative):
each page answers one primary question while supporting detail remains available
without competing with the main story.

## Change order

1. Identify the information type and owner in the [ownership matrix](OWNERSHIP_MATRIX.md).
2. Update and validate the owner.
3. Update only affected summaries and links.
4. Label historical material or remove obsolete material.
5. Run the [audit checklist](AUDIT_CHECKLIST.md).
