# Enterprise Observability Home Lab

The Enterprise Observability Home Lab is a planned containerized learning environment designed to simulate distributed Splunk roles on a personal workstation. It provides a documented setting for learning how data collection, indexing, search, dashboards, alerts, and deployment management fit together.

This project is not a production deployment and is not presented as production-ready.

## Purpose

- Practice a distributed Splunk workflow without requiring multiple physical systems.
- Document architectural decisions before implementation.
- Build an evidence-based operational use case from data onboarding through monitoring outputs.
- Create a foundation for a mature ResumeOps engineering case study.

## Planned Architecture

The initial design uses a Windows gaming PC running Docker Desktop. A dedicated Docker network will connect one Splunk Search Head, one Splunk Indexer, one Splunk Deployment Server, one Linux log source, and one Splunk Universal Forwarder. The Monitoring Console will initially be hosted on the Search Head.

See [Architecture](architecture.md) and the [architecture diagram](diagrams/architecture.md) for component responsibilities and planned communication paths.

## Primary Technologies

- Windows
- Docker Desktop
- Docker networking
- Splunk Enterprise
- Splunk Universal Forwarder
- Linux
- Mermaid

## Operational Use Case

The first planned use case is Linux Authentication Monitoring. It will examine failed authentication activity, targeted accounts, source addresses, privileged-command activity, and failure trends. All searches, dashboards, and alerts remain planned.

See [Use Cases](use-cases.md) for the questions and outputs in scope.

## Sprint Roadmap

- **Sprint 6A — Architecture and Planning:** define the design, scope, use case, constraints, and implementation sequence.
- **Sprint 6B — Core Deployment:** deploy and validate the planned core Splunk roles.
- **Sprint 6C — Data Onboarding:** connect the Universal Forwarder and validate Linux event metadata.
- **Sprint 6D — Operational Use Case:** implement and validate the Linux authentication monitoring searches and outputs.
- **Sprint 6E — Case Study and Release:** consolidate evidence, lessons, limitations, and release documentation.

Detailed objectives, evidence, and completion criteria are in the [Implementation Plan](implementation-plan.md).

## Current Status

- **Release:** v0.6.0
- **Current Sprint:** Sprint 6A
- **Status:** Architecture and Planning

Only the architecture and planning foundation is in place. No Splunk deployment, data onboarding, search, dashboard, or alert is claimed as complete.

## Documentation

- [Architecture](architecture.md)
- [Architecture Diagram](diagrams/architecture.md)
- [Implementation Plan](implementation-plan.md)
- [Data Sources](data-sources.md)
- [Use Cases](use-cases.md)
- [Ports and Networking](ports-and-networking.md)
- [Security Considerations](security-considerations.md)
- [Limitations](limitations.md)
- [ADR-003: Use Containers to Simulate Distributed Splunk Roles](../../adr/ADR-003-containerized-home-lab.md)
- [ADR-004: Begin the Home Lab Without Splunk Clustering](../../adr/ADR-004-start-without-clustering.md)
