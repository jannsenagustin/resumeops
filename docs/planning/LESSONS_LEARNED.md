# Atlas Lessons Learned

> Parser-readiness note: Keep `LESSON-NNN` headings, field labels, and status values stable for future build-time parsing.

Lessons capture reusable engineering knowledge rather than serving as incident logs.

## LESSON-001 — Wait for installer shutdown before removing media

**Lesson ID:** LESSON-001
**Title:** Do not eject installation media before the installer has fully exited or rebooted.
**Context:** Rocky Linux installation on the dedicated M05 VM.
**What happened:** SQUASHFS read failures occurred after installation media was removed while the installer environment was still active.
**Reusable lesson:** Separate installation completion from installer shutdown or reboot completion; remove media only after the environment no longer depends on it.
**Related milestone or task:** M05; ATL-001.
**Status:** Confirmed

## LESSON-002 — Enabled does not equal validated

**Lesson ID:** LESSON-002
**Title:** Enabled does not equal validated.
**Context:** Rocky Linux time-service configuration.
**What happened:** Network Time was enabled, but the installer reported no working NTP server.
**Reusable lesson:** Validate service behavior independently of configuration or enabled state.
**Related milestone or task:** M05; ATL-001.
**Status:** Confirmed

## LESSON-003 — Redact persistent identifiers from evidence

**Lesson ID:** LESSON-003
**Title:** Evidence can remain credible without exposing persistent identifiers.
**Context:** Review of public infrastructure validation evidence.
**What happened:** Machine ID, Boot ID, MAC address, and global IPv6 values were redacted while the necessary engineering result remained visible.
**Reusable lesson:** Publish only the evidence necessary to prove the engineering claim.
**Related milestone or task:** M05; DEC-014.
**Status:** Confirmed

## LESSON-004 — Use one scroll offset

**Lesson ID:** LESSON-004
**Title:** Shared scroll offsets prevent navigation drift.
**Context:** Engineering Console section navigation.
**What happened:** Sticky navigation, anchor behavior, and observer logic used inconsistent offsets.
**Reusable lesson:** Derive scroll positioning and observer activation from one canonical responsive offset.
**Related milestone or task:** Engineering Console navigation reliability fix.
**Status:** Confirmed

## LESSON-005 — Preserve inspector geometry

**Lesson ID:** LESSON-005
**Title:** Selection may change information, but it should not change geometry.
**Context:** Atlas component inspector interaction.
**What happened:** The inspector resized depending on the selected component's metadata.
**Reusable lesson:** Keep inspection surfaces geometrically stable when selection changes to improve perceived precision and reduce layout distraction.
**Related milestone or task:** Engineering Console interaction work.
**Status:** Confirmed

## LESSON-006 — Separate management and ingestion topology

**Lesson ID:** LESSON-006
**Title:** The management path and ingestion path are different architectural concerns.
**Context:** M05 Deployment Server planning.
**What happened:** The Deployment Server manages Universal Forwarders but is not part of the event-ingestion path.
**Reusable lesson:** Model management topology separately from data flow so control relationships are not mistaken for telemetry transport.
**Related milestone or task:** M05; ATL-003; ATL-004.
**Status:** Confirmed

## LESSON-007 — Validate manually before automating

**Lesson ID:** LESSON-007
**Title:** Manual execution should be understood before automation is introduced.
**Context:** Planned Deployment Server configuration delivery.
**What happened:** The workflow was deliberately sequenced so a harmless manual deployment proves behavior before GitHub Actions is considered.
**Reusable lesson:** Automate a validated process, not an assumed process.
**Related milestone or task:** M05; ATL-005; ATL-006; ATL-007.
**Status:** Confirmed
