# Enterprise Observability Home Lab Ports and Networking

## Networking Approach

The planned services will communicate over a dedicated Docker network using internal Docker DNS where appropriate. Only interfaces that require access from the Windows host should be exposed to the host.

Sprint 6B reviewed official Splunk guidance for the default communication paths. The selected image tag still requires verification before deployment.

## Communication Categories

| Category | Planned Participants | Purpose | Port Decision |
| --- | --- | --- | --- |
| Web interface access | Windows host to each Splunk role | Search, monitoring, and lab administration | Default container port `8000`; distinct proposed localhost mappings avoid collisions |
| Splunk management communication | Search Head to Indexer and authenticated administrative operations | Distributed-search setup and management API | Internal TCP `8089`; not host-published initially |
| Forwarder-to-indexer communication | Future Universal Forwarder to Indexer | Send Linux events for indexing | Conventional TCP `9997`; exposed internally as a placeholder but not enabled until Sprint 6C |
| Deployment Server communication | Future Universal Forwarder to Deployment Server | Retrieve applicable forwarder configuration | Internal management endpoint on TCP `8089`; no client exists yet |
| Internal Docker DNS and networking | All Atlas containers | Resolve service names and carry approved container-to-container traffic | Dedicated `atlas-network` bridge |

## Sprint 6B Verification

Before runtime deployment, Sprint 6B must:

- Select and record the Splunk Enterprise and Universal Forwarder versions.
- Confirm the reviewed port defaults still apply to the selected version.
- Confirm which connections initiate from each component during validation.
- Verify that only the three localhost Web mappings are host-published.
- Document any local firewall considerations.
- Test each required communication path and retain sanitized evidence.

The Compose design does not publish management or receiving ports to the Windows host. Future TLS hardening remains deferred and the environment must not be exposed to untrusted networks.
