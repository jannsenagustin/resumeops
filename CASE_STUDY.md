# Project Atlas Engineering Overview

## Problem and constraints

Project Atlas makes a distributed Splunk workflow understandable and reviewable on workstation-scale infrastructure. It must operate within one Windows workstation, preserve local secret handling and narrow network exposure, and distinguish designed, implemented, and validated work.

## Architecture rationale

Search and indexing use separate Splunk containers so their responsibilities and distributed-search relationship remain visible. A Windows Universal Forwarder supplies host Event Logs to the Indexer. Configuration management is a separate management plane: the approved M05 direction uses a dedicated Rocky Linux Hyper-V VM as the Deployment Server, not another Compose service.

[Architecture](docs/architecture.md) owns topology and limitations. [Milestones](docs/milestones.md) owns validation state, with proof in [evidence](docs/evidence/README.md).

## Engineering approach

Atlas advances in small evidence-gated milestones. Configuration expresses intent; runtime observation establishes behavior; reviewed evidence supports validation. Changes preserve role boundaries, minimize exposed ports, retain independent persistent state, and separate management traffic from ingestion.

## Major challenges and decisions

Early work had to distinguish network reachability from a healthy Splunk session and correct stanza placement without weakening secret handling. The durable response was to inspect configuration structure, restart the smallest affected scope, and require functional proof beyond configuration screens.

Architecture began with containerized Splunk roles and no clustering to keep the lab feasible. Later planning separated Deployment Server management onto a dedicated VM. Accepted architecture history remains in [ADRs](docs/adr/); current governance decisions remain in [Atlas decisions](docs/planning/DECISIONS.md).

## Validation philosophy

Claims are intentionally narrow. Point-in-time counts are not architectural facts, configuration is not proof of operation, and sensitive values are excluded even when that limits publishable evidence. The milestone record is the sole current-status ledger; this narrative does not reproduce it.

## Lessons and current direction

Atlas has shown that enabled is not validated, management and ingestion topology must remain distinct, and a manual workflow should be proven before automation. Reusable findings belong in [Lessons Learned](docs/planning/LESSONS_LEARNED.md).

Current M05 work extends the validated ingestion foundation with infrastructure and configuration management. Future priorities belong to the [backlog](docs/planning/BACKLOG.md) and [roadmap](ROADMAP.md); executable work belongs only to the [active batch](docs/planning/ACTIVE_BATCH.md). Atlas remains an engineering lab, not a production or high-availability deployment.
