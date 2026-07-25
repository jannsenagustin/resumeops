# Enterprise Observability Home Lab Use Cases

## Linux Authentication Monitoring

Linux Authentication Monitoring is the first planned operational use case. It will use authentication and related system events from the lab Linux source to explore account targeting, authentication failure patterns, and privileged activity.

No search, dashboard, or alert described here has been implemented or validated.

## Questions to Answer

- Are repeated authentication failures occurring?
- Which accounts are being targeted?
- Which source addresses generate the most failures?
- Are privileged commands being executed?
- Are login failures increasing over time?

## Planned Outputs

### Authentication Overview Dashboard

A planned summary view will combine authentication volume, failure trends, targeted accounts, source addresses, and privileged-command activity.

### Failed-Login Trend

A planned time-series search and visualization will show authentication failures over time.

### Top Targeted Accounts

A planned search and ranking will identify accounts most frequently associated with failed authentication attempts.

### Top Source Addresses

A planned search and ranking will identify source addresses associated with the most failures when the event data provides a reliable address field.

### Privileged-Command Activity

A planned search and visualization will summarize relevant privileged-command events available in the onboarded data.

### Repeated-Authentication-Failure Alert

A planned alert will identify repeated failures within a defined time window. Thresholds, grouping logic, scheduling, and suppression behavior remain open decisions that require controlled lab validation.

## Validation Approach

Sprint 6D will generate controlled, non-sensitive lab activity and compare expected events with search, dashboard, and alert results. Searches must document field assumptions and account for variation in Linux distributions and log formats.
