# Project Atlas Verification Checklist

All items remain unchecked until they are validated in the target Docker Desktop environment.

## Static Configuration

- [ ] Docker Desktop is running.
- [ ] `docker compose config` validates the Compose file with the local `.env`.
- [ ] The selected Splunk image tag is supported and documented.
- [ ] The local `.env` is ignored by Git.
- [ ] No credentials, license files, or secret values are tracked by Git.

## Containers and Storage

- [ ] The dedicated `atlas-network` exists.
- [ ] The `atlas-search-head` container is running.
- [ ] The `atlas-indexer` container is running.
- [ ] The `atlas-deployment-server` container is running.
- [ ] The Search Head Web interface is accessible.
- [ ] The Indexer Web interface is accessible.
- [ ] The Deployment Server Web interface is accessible.
- [ ] All six Atlas persistent volumes exist.
- [ ] Each volume is mounted to its intended `/opt/splunk/var` or `/opt/splunk/etc` path.
- [ ] Containers resolve each other by service name.

## Role Verification

- [ ] The Search Head is configured as the user search interface.
- [ ] The Monitoring Console is available on the Search Head.
- [ ] The Indexer can be added as a Search Head search peer.
- [ ] The Search Head can run a distributed search against the Indexer.
- [ ] The Deployment Server is ready for future deployment apps and server classes.
- [ ] No fake Universal Forwarder client is present.

## Evidence

- [ ] Docker Desktop container screenshot is captured.
- [ ] Sanitized `docker compose ps` output is captured.
- [ ] All three login pages are captured.
- [ ] Docker network inspection is captured.
- [ ] Persistent-volume listing is captured.
- [ ] Distributed-search configuration is captured.
- [ ] Successful Indexer search-peer evidence is captured.
- [ ] Relevant sanitized container health or log output is captured.

Sprint 6B must remain **In Progress** until all completion criteria are verified and the documentation reflects actual results.
