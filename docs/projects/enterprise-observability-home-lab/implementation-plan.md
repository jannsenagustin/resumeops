# Enterprise Observability Home Lab Implementation Plan

The implementation is divided into evidence-driven sprints. Later sprints remain planned until their completion criteria have been met and documented.

## Sprint 6A — Architecture

### Objective

Establish an accurate, bounded architecture and documentation foundation before deployment.

### Planned Work

- Define component responsibilities and data flow.
- Record networking categories without guessing version-dependent ports.
- Identify initial Linux data sources and validation areas.
- Define the first operational use case.
- Record security considerations, limitations, and architecture decisions.

### Expected Evidence

- Reviewed project documentation
- Valid Mermaid architecture diagram
- ADR-003 and ADR-004
- Roadmap and changelog entries showing planning status

### Completion Criteria

- All Sprint 6A documents are internally consistent and linked.
- Planned and completed work are clearly distinguished.
- No deployment files, credentials, or unsupported production claims are added.
- Repository validation passes.

## Sprint 6B — Infrastructure

### Objective

Deploy the minimum distributed Splunk topology described by the approved Sprint 6A architecture.

### Planned Work

- Verify supported container images, versions, resource requirements, and exact ports against official documentation.
- Define local secret handling and deployment configuration.
- Create the dedicated Docker network.
- Deploy the Search Head, Indexer, and Deployment Server.
- Configure the Monitoring Console on the Search Head.
- Validate role-level connectivity and access.
- Prepare the Deployment Server for the later Universal Forwarder without creating a fake client.

### Expected Evidence

- Version and port decision record
- Sanitized configuration excerpts
- Container and network status output
- Role-access and connectivity checks
- Resource-usage observations

### Completion Criteria

- Every planned core role starts reliably.
- Required communication paths are validated.
- Credentials and secret values remain outside Git.
- Actual architecture differences are documented.

## Sprint 6C — Data Engineering

### Objective

Onboard Linux authentication and system logs through the Universal Forwarder and validate event quality.

### Planned Work

- Configure forwarder management through the Deployment Server.
- Monitor the selected Linux log paths.
- Send events from the Universal Forwarder to the Indexer.
- Assign and verify proposed metadata.
- Troubleshoot event breaking, timestamps, and host/source classification.

### Expected Evidence

- Sanitized forwarder configuration
- Deployment-client status
- Connectivity checks
- Event-count and metadata validation searches
- Samples demonstrating correct event boundaries and timestamps

### Completion Criteria

- Authentication and system events are searchable through the Search Head.
- Connectivity, event count, event breaking, timestamps, host, source, and sourcetype are validated.
- Any distribution-specific path changes are documented.

## Sprint 6D — Observability

### Objective

Implement and validate Linux Authentication Monitoring using the onboarded data.

### Planned Work

- Build searches for authentication failures, targeted accounts, source addresses, privileged commands, and trends.
- Create an authentication overview dashboard.
- Create a repeated-authentication-failure alert.
- Generate controlled lab activity for validation.
- Tune logic to reduce misleading results.

### Expected Evidence

- Search definitions
- Dashboard panels or screenshots
- Alert configuration
- Controlled test events and resulting matches
- Validation notes and known gaps

### Completion Criteria

- Each defined question has a validated search or visualization.
- The dashboard and alert work against controlled lab data.
- Search assumptions, thresholds, and limitations are documented.

## Sprint 6E — Engineering Case Study

### Objective

Convert the validated implementation into an honest, reproducible engineering case study and v0.6.0 release record.

### Planned Work

- Consolidate architecture, implementation, testing, and troubleshooting evidence.
- Document engineering decisions and lessons learned.
- Reconcile planned architecture with the implemented state.
- Record limitations and future improvements.
- Publish release and case-study documentation without overstating maturity.

### Expected Evidence

- Completed case-study sections
- Final architecture diagram
- Validation summary
- Troubleshooting examples
- Release notes and updated changelog

### Completion Criteria

- The case study distinguishes verified results from future work.
- Documentation reflects the actual deployed state.
- Relevant links and validation commands pass.
- v0.6.0 is marked complete only after the evidence is reviewed.
