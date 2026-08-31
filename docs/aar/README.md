# Architecture Analysis Reviews

Architecture Analysis Review (AAR) records preserve formal architecture
investigation, analysis, alternatives, findings, assumptions, limitations, and
certification assessments. They are analytical source records and do not
independently authorize implementation, activate tasks, or replace architecture
decision records, planning decisions, normative requirements, or conformance
tests.

## Canonical Location and Naming

The canonical directory for AAR records is `docs/aar/`.

Each record uses a unique `AAR-NNN` identifier. The recommended filename format
is `AAR-NNN-short-descriptive-title.md`.

## Lifecycle

The [AAR Standard](AAR_STANDARD.md#document-lifecycle) is the sole owner of AAR
lifecycle states, transitions, review outcomes, and correction semantics.

## Use by Other Records

Downstream records may cite AARs as rationale. Consumers may summarize an AAR's
title, scope, major findings, certification conclusion, and canonical link, but
must not silently strengthen or redefine its conclusions. Architecture
conclusions become binding only through a separately approved architecture
decision or resolution record.
