# Sprint 6D — Search Head Deployment

## Summary

Atlas deployed the Search Head as its second operational Splunk service on
2026-08-05. This milestone validates an independently healthy Search Head
alongside the existing Indexer; it does not validate distributed search.

## Implementation

The Search Head reused the official `splunk/splunk:10.0.8-rhel9` image and
inherited the common Compose configuration. It uses a dedicated container name
and hostname, publishes Splunk Web through `localhost:8000`, retains management
port `8089` inside the Docker network, owns independent persistent volumes for
`/opt/splunk/var` and `/opt/splunk/etc`, and joins `atlas-network`.

## Validation

Splunk container initialization and its Ansible playbook completed. Docker
reported `atlas-search-head` healthy while `atlas-indexer` remained healthy.
Administrator login through Search Head Splunk Web succeeded, and Docker
network inspection showed both services attached to `atlas-network` with
separate private addresses.

## Evidence

- [Search Head and Indexer healthy](../evidence/milestone-02-search-head/2026-08-05_001_search_head_and_indexer_healthy.png)
- [First successful Search Head login](../evidence/milestone-02-search-head/2026-08-05_002_search_head_first_login.png)
- [Docker Desktop multi-service runtime](../evidence/milestone-02-search-head/2026-08-05_003_docker_desktop_multi_service.png)
- [Shared network membership](../evidence/milestone-02-search-head/2026-08-05_004_shared_network.png)

## Limitations

Distributed search has not been configured. The Search Head and Indexer are
healthy but are not yet connected as a Splunk distributed-search topology. No
ingestion workflow has been validated.

## Next Milestone

Distributed Search Configuration is next. The objective is to configure the
Indexer as a search peer for the Search Head and validate a distributed search.
