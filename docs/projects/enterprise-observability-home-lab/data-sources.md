# Enterprise Observability Home Lab Data Sources

## Initial Scope

The first onboarding scope contains two Linux log categories:

- **Linux authentication logs**, commonly available at a path such as `/var/log/auth.log`
- **Linux system logs**, commonly available at a path such as `/var/log/syslog`

Exact paths vary by Linux distribution, logging service, and configuration. Sprint 6C must verify the paths inside the selected Linux log-source environment before configuring monitoring.

## Planned Metadata

The following Splunk metadata fields will be assigned and validated:

| Field | Purpose | Planning Guidance |
| --- | --- | --- |
| `index` | Selects the destination data store. | Final name is undecided; use a lab-specific index proposed and approved during implementation. |
| `sourcetype` | Describes the event format and parsing behavior. | Final values are undecided; prefer supported Splunk sourcetypes where they match the source. |
| `source` | Identifies the originating file or input. | Expected to reflect the monitored file path; verify actual assignment. |
| `host` | Identifies the system that generated the event. | Expected to represent the Linux log source; verify that container naming does not cause misleading values. |

Any example names introduced during Sprint 6C must be labeled as proposed until configuration and validation are complete.

## Planned Validation

Data onboarding will be checked in these areas:

- **Connectivity:** confirm the Universal Forwarder can reach the Indexer through the intended network path.
- **Event count:** compare generated or observed activity with indexed events over a controlled interval.
- **Event breaking:** confirm multiline and single-line events are separated correctly.
- **Timestamp extraction:** confirm event time is parsed correctly, including time zone behavior.
- **Host assignment:** confirm `host` identifies the intended Linux source.
- **Source assignment:** confirm `source` identifies the monitored input accurately.
- **Sourcetype assignment:** confirm `sourcetype` matches the event format and parsing behavior.

No data source is considered onboarded until these checks have produced evidence.
