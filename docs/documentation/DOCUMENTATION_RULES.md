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

If a current-state sentence requires frequent manual synchronization across multiple files, it is likely owned in the wrong place.

Application interfaces must consume current milestone and executable-work state
through the typed project-state layer. Hardcoded copies of current status,
active objectives, evidence availability, or milestone phase are prohibited.
Run `npm run audit:state` before treating project-state work as complete.

## Change order

1. Identify the information type and owner in the [ownership matrix](OWNERSHIP_MATRIX.md).
2. Update and validate the owner.
3. Update only affected summaries and links.
4. Label historical material or remove obsolete material.
5. Run the [audit checklist](AUDIT_CHECKLIST.md).
