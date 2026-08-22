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

## LESSON-008 — Duplicated ownership causes documentation drift

**Lesson ID:** LESSON-008
**Title:** Duplicated ownership causes documentation drift.
**Context:** Narrative documents described an older Atlas state while the
milestone record reflected validated Milestones 01-04 and current M05 work.
**What happened:** Multiple narrative documents independently maintained current
state and diverged from canonical milestone and M05 planning records.
**Reusable lesson:** When multiple documents independently maintain the same current-
state fact, they will eventually diverge. Assign one canonical owner and make
all other views derived consumers.
**Related milestone or task:** ATL-021; DEC-015; EP-002.
**Status:** Confirmed

## LESSON-009 — Prefer single-line Hyper-V console commands

**Lesson ID:** LESSON-009
**Title:** Hyper-V console commands are more reliable as single-line commands.
**Context:** Rocky Linux baseline administration through the Hyper-V console.
**What happened:** Multiline shell continuations introduced avoidable command-entry friction in the console.
**Reusable lesson:** Write Atlas runbook commands for the Hyper-V console as single-line commands when practical; use multiline continuations only when their behavior has been validated in that interface.
**Related milestone or task:** M05; ATL-001.
**Status:** Confirmed

## LESSON-010 — Capture the operating-system security baseline before Splunk

**Lesson ID:** LESSON-010
**Title:** Capture the operating-system security baseline before installing Splunk.
**Context:** Rocky Linux baseline hardening for the dedicated M05 Deployment Server VM.
**What happened:** SELinux enforcement, firewalld state, listening services, and NTP synchronization were verified before Splunk installation.
**Reusable lesson:** Preserve a known-good pre-application baseline for SELinux, firewalld, listening services, and NTP so later troubleshooting can distinguish operating-system drift from Splunk changes.
**Related milestone or task:** M05; ATL-001; ATL-002.
**Status:** Confirmed
