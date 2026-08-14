# Build Record 03 — Distributed Search

## Objective

Milestone 03 connected the independently operational Atlas Search Head and
Indexer into a functioning distributed-search architecture. Success required
more than healthy containers: the Search Head had to register the Indexer as a
peer, return Indexer metadata, and show remote Indexer participation in Job
Inspector.

## Starting architecture

Milestones 01 and 02 left two healthy Splunk Enterprise instances on the same
`atlas-network`. Search Head Splunk Web was available through `localhost:8000`
and Indexer Splunk Web through `localhost:8001`, but the services did not yet
have a validated search-peer relationship.

The intended peer URI was `https://atlas-indexer:8089`. Docker DNS makes the
service hostname stable within the bridge network, unlike a container IP that
may change. Port 8089 is the Indexer's internal Splunk management interface;
the host-facing Web ports are unrelated to distributed-search communication.

## Search-peer configuration

Remote administrative authentication was required to establish the peer. The
Indexer therefore needed this instance-specific override in
`/opt/splunk/etc/system/local/server.conf`:

```ini
[general]
allowRemoteLogin = always
```

No credential or secret-bearing setting is reproduced here.

## Troubleshooting and correction

The first interactive shell ran as the container's `ansible` user, which could
not read `server.conf`. Re-entering explicitly as UID 0 confirmed a minimal
container environment without common tools such as `vi` and `which`.

Inspection as root showed that `server.conf` already had a `[general]` stanza.
An initial shell append placed `allowRemoteLogin = always` after the final
`[lmpool:...]` stanza. A `tail` check exposed the mistake: Splunk parameters
belong to the stanza immediately above them, so the setting was semantically in
the wrong section.

Rather than installing an editor into the application container, the file was
copied to the Windows host with `docker cp`, edited in VS Code, and copied back.
The setting was moved into the existing `[general]` stanza under
`system/local`, preserving the proper instance-specific override layer. The
corrected placement was verified before any restart.

Only `atlas-indexer` was restarted. It returned healthy, while
`atlas-search-head` remained healthy. Retrying the Search Peer configuration
then succeeded.

## Validation

Splunk Web reported the `atlas-indexer:8089` peer as `Up`, `Healthy`, and
`Enabled`, with no health-check failures. This proved configuration and peer
health, but not yet functional distributed execution.

The following SPL was then run from the Search Head:

```spl
| metadata type=hosts index=_internal
```

The point-in-time results included `atlas-indexer` and `atlas-search-head`,
with approximate totals of 151,862 and 100,037 respectively. The counts are
observations, not architectural constants. Returning Indexer metadata showed
functional access through the relationship, but the metadata command alone was
not treated as proof of every execution detail.

Job Inspector supplied the strongest evidence. It showed both
`dispatch.stream.remote` and `dispatch.stream.remote.atlas-indexer`. The latter
recorded five invocations and an output count of 50,752 for this search. Those
values are point-in-time observations; the important fact is the explicit
remote Indexer execution component.

The validation chain was:

```text
Search Peer configured
  → Peer Up / Healthy / Enabled
  → SPL executed from Search Head
  → Indexer metadata returned
  → Job Inspector shows dispatch.stream.remote.atlas-indexer
  → Distributed Search validated
```

## Final architecture

The browser reaches Search Head Splunk Web at `localhost:8000`. The Search Head
coordinates distributed work with `atlas-indexer` over HTTPS/TCP 8089 on
`atlas-network`; the Indexer executes against its data and returns results to
the Search Head. `localhost:8001` remains separate host access to Indexer
Splunk Web. Port 8089 is not claimed as host-published.

## Lessons learned

- Inspect configuration and existing stanzas before editing.
- Splunk stanza placement determines parameter meaning.
- Use `system/local` for instance-specific overrides, not `system/default`.
- Minimal containers intentionally may omit interactive editors.
- Avoid installing unnecessary utilities into application containers.
- Named volumes preserve Splunk configuration outside the disposable layer.
- Validate configuration before restarting and restart the smallest scope.
- Verify service health after every runtime configuration change.
- Peer health and functional remote-execution evidence answer different
  validation questions; both matter.

## Evidence

- [Search Peer status](../evidence/milestone-03-distributed-search/2026-08-06_001_search_peer_configuration.png)
- [Distributed SPL results](../evidence/milestone-03-distributed-search/2026-08-06_001_distributed_search_results.png)
- [Search Job Inspector](../evidence/milestone-03-distributed-search/2026-08-06_001_search_job_inspector_results.png)

The local `server.conf` screenshot was omitted because it exposes secret-bearing
values. The textual record preserves the engineering lesson without publishing
credentials.

## Milestone outcome

Atlas Milestone 03 is complete and validated. Atlas has progressed from one
operational Splunk role, to two independent roles, to a functioning
distributed-search relationship. Deployment Server, ingestion, clustering,
high availability, dashboards, detections, and alerts remain unimplemented.
