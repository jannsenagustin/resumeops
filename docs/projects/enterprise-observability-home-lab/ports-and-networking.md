# Enterprise Observability Home Lab Ports and Networking

## Networking Approach

The planned services will communicate over a dedicated Docker network using internal Docker DNS where appropriate. Only interfaces that require access from the Windows host should be exposed to the host.

Exact ports are intentionally not specified in Sprint 6A. They must be verified against the selected Splunk version, supported container configuration, and official Splunk documentation during Sprint 6B.

## Communication Categories

| Category | Planned Participants | Purpose | Port Decision |
| --- | --- | --- | --- |
| Web interface access | Windows host to Search Head; other role interfaces only if required for administration | Search, dashboard, monitoring, and necessary lab administration | **To verify in Sprint 6B** against the selected version and official documentation |
| Splunk management communication | Splunk components that require an authenticated management connection | Role configuration, distributed-search setup, and management operations | **To verify in Sprint 6B** against the selected version and official documentation |
| Forwarder-to-indexer communication | Universal Forwarder to Indexer | Send collected Linux events for parsing and indexing | **To verify in Sprint 6B** against the selected version and official documentation |
| Deployment Server communication | Universal Forwarder to Deployment Server | Retrieve applicable forwarder configuration | **To verify in Sprint 6B** against the selected version and official documentation |
| Internal Docker DNS and networking | All containers on the dedicated network | Resolve service names and carry approved container-to-container traffic | Docker network behavior and any required configuration are **to verify in Sprint 6B** |

## Sprint 6B Verification

Before deployment, Sprint 6B must:

- Select and record the Splunk Enterprise and Universal Forwarder versions.
- Consult official documentation for every required listening and destination port.
- Confirm which connections initiate from each component.
- Distinguish internal container ports from host-published ports.
- Expose only ports required for host access.
- Document any local firewall considerations.
- Test each required communication path and retain sanitized evidence.

No placeholder in this document should be treated as authorization to use a guessed or default value without verification.
