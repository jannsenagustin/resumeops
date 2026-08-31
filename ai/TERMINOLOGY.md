# Atlas Terminology

Use these terms consistently. Status words and identifier formats are defined
by [Atlas EOS](../docs/planning/README.md).

## Milestone

A meaningful stage in Atlas system evolution with a defined purpose and
validation boundary. [Milestones](../docs/milestones.md) own milestone status.

## Batch

The single human-approved unit of executable work. A batch contains one or more
backlog tasks and receives an execution report after an attempt.

## Task

A stable `ATL-NNN` backlog record describing bounded work, acceptance criteria,
dependencies, priority, and status. A task is executable only when included in
the active batch.

## Engineering Record

A durable account of what was designed, changed, observed, decided, validated,
or learned. Milestones, execution reports, decisions, lessons, ADRs, journals,
and evidence each record different parts of the work.

## Foundation Work

Prerequisite engineering that creates a safe, understandable base for later
capabilities without necessarily delivering the later capability itself.

## Evidence

A reviewable artifact that supports a specific claim. Evidence may include
runtime behavior, command output, logs, configuration, or screenshots; it does
not create status by itself.

## Validation

The act of testing an explicit claim or acceptance criterion against observed
results. Validation records both what succeeded and the boundary of what was
not proven.

## Deployment Server

The Splunk Enterprise management role that distributes approved applications
and configuration bundles to deployment clients. In current Atlas architecture,
it runs on a dedicated Rocky Linux virtual machine.

## Server Class

A Deployment Server rule that associates a set of deployment clients with one
or more deployable apps, using defined matching criteria.

## Forwarder

A Splunk component that collects and sends data to another Splunk role. Atlas
uses a Windows Universal Forwarder for Windows telemetry.

## Search Head

The Splunk role that provides the search and user interface layer and
coordinates searches against configured search peers.

## Indexer

The Splunk role that receives, processes, stores, and searches indexed data. In
Atlas, it is also the remote search peer used by the Search Head.

## Configuration Intelligence

A planned Atlas application for inspecting and explaining configuration state
through the Atlas MCP Platform. It is future work until its planning records
authorize and validate it.

## Canonical State

The authoritative repository representation of a fact. Canonical ownership
depends on information type; summaries and interfaces must link to or derive
from that owner.

## Planning

The repository-backed Atlas Engineering Operating System in `docs/planning`.
It captures ideas, approved work, executable scope, decisions, lessons, and
results without making a chat or user interface authoritative.

## Decision Record

A durable explanation of a choice, its context, rationale, and consequences.
Concise governance decisions live in `docs/planning/DECISIONS.md`; consequential
architecture decisions use an ADR in `docs/adr`.

## Lesson Learned

A reusable finding grounded in actual engineering or validation. A lesson is
proposed from experience and becomes canonical after human confirmation in
`docs/planning/LESSONS_LEARNED.md`.
