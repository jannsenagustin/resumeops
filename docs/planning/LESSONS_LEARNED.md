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

## LESSON-011 — Canonical documents alone do not prevent UI drift

**Lesson ID:** LESSON-011
**Title:** Canonical documents alone do not prevent UI drift.
**Context:** M05 was current in the milestone ledger while application consumers retained older planned-state copy.
**What happened:** Independently maintained TypeScript objects and component prose diverged from canonical Markdown.
**Reusable lesson:** Canonical records must feed application consumers programmatically or be checked automatically.
**Related milestone or task:** M05; ATL-025; DEC-016.
**Status:** Confirmed

## LESSON-012 — Evidence filenames are reference-bearing interfaces

**Lesson ID:** LESSON-012
**Title:** Evidence filenames are reference-bearing interfaces.
**Context:** Normalizing evidence used by both Markdown journals and static application imports.
**What happened:** A naming-only migration affected multiple consumer types even though the image bytes did not change.
**Reusable lesson:** Inventory inbound references before using `git mv`, then validate Markdown links, application imports, and the production build.
**Related milestone or task:** ATL-026; DEC-017.
**Status:** Confirmed

## LESSON-013 — Isolate address-family failures during downloads

**Lesson ID:** LESSON-013
**Title:** Isolate address-family failures during downloads.
**Context:** Downloading the Splunk Enterprise 10.0.8 RPM on Rocky Linux.
**What happened:** `wget` automatically selected IPv6 and the large download timed out; HTTPS connectivity succeeded with `curl`, and `wget -4` completed immediately over IPv4.
**Reusable lesson:** When HTTPS is reachable but a large download stalls, inspect the selected address family and retry explicitly over IPv4 before changing broader network configuration.
**Related milestone or task:** M05; ATL-002.
**Status:** Confirmed

## LESSON-014 — Use explicit Splunk executable paths

**Lesson ID:** LESSON-014
**Title:** Do not assume the Splunk CLI is on `PATH`.
**Context:** Validating the host-based Splunk Enterprise installation.
**What happened:** The Splunk executable was installed under `/opt/splunk/bin` and was validated from that location.
**Reusable lesson:** Use `/opt/splunk/bin/splunk` in installation and recovery procedures unless the environment explicitly manages a trusted path entry.
**Related milestone or task:** M05; ATL-002.
**Status:** Confirmed

## LESSON-015 — Align ownership before service migration

**Lesson ID:** LESSON-015
**Title:** A root first-start creates ownership work before service migration.
**Context:** Moving the initial Splunk startup to a dedicated systemd runtime.
**What happened:** The initial root startup created files under `/opt/splunk` that the `splunk` runtime account could not use, causing service failures until ownership was corrected recursively.
**Reusable lesson:** Start Splunk with its intended runtime account, or reconcile the entire Splunk home ownership before enabling a dedicated service account.
**Related milestone or task:** M05; ATL-002; DEC-018.
**Status:** Confirmed

## LESSON-016 — Inspect service journals before correction

**Lesson ID:** LESSON-016
**Title:** Inspect the service journal before modifying a failed service.
**Context:** Troubleshooting the Splunk systemd migration.
**What happened:** `systemctl`, `journalctl`, and process inspection isolated a permissions failure caused by the ownership mismatch.
**Reusable lesson:** Use service status, journal entries, and process ownership to identify the failing boundary before changing service configuration or filesystem state.
**Related milestone or task:** M05; ATL-002.
**Status:** Confirmed

## LESSON-017 — Validate the effective runtime identity

**Lesson ID:** LESSON-017
**Title:** Service activation does not prove the intended runtime identity.
**Context:** Final validation of the host-based Splunk service.
**What happened:** Process inspection confirmed that active `splunkd` processes ran as `splunk` after the service migration.
**Reusable lesson:** Validate the effective process user after installation or service-account changes; do not infer it from a unit-file setting or an active status alone.
**Related milestone or task:** M05; ATL-002; DEC-018.
**Status:** Confirmed

## LESSON-018 — Separate service health from external reachability

**Lesson ID:** LESSON-018
**Title:** A healthy service does not prove external reachability.
**Context:** Validating Splunk Web access on the Rocky Linux Deployment Server host before ATL-003 role configuration.
**What happened:** Splunk, systemd, the CLI, and local TCP/8000 access were healthy while the Windows browser timed out. Successful localhost and VM-address requests isolated the application from the failure; firewalld lacked an inbound TCP/8000 allowance.
**Reusable lesson:** Validate the service locally, confirm its listening ports, test the host address, and then inspect the guest firewall before changing a healthy application. Keep application health and external reachability as separate validation claims.
**Related milestone or task:** M05; ATL-003.
**Status:** Confirmed
