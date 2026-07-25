# Enterprise Observability Home Lab Security Considerations

This project is a learning lab, not a secured production system. Its security controls reduce avoidable local risk but do not establish production readiness.

## Credential and Secret Handling

- Do not commit credentials or secret values to Git.
- Supply sensitive values through environment variables or local secret files.
- Keep secret files excluded through `.gitignore`.
- Change default credentials before using any deployed service.
- Use placeholders rather than real secrets in documentation, examples, screenshots, and command output.

## Network Exposure

- Use a dedicated Docker network for lab components.
- Restrict host-exposed ports to those required for deliberate host access.
- Keep container-to-container communication internal where practical.
- Verify port requirements against the selected Splunk version and official documentation before deployment.
- Review local firewall behavior and avoid exposing the lab to untrusted networks.

## Data Handling

- Do not ingest personal data or sensitive production data.
- Use controlled, non-sensitive lab events for searches, dashboards, and alerts.
- Sanitize evidence before committing it to the repository.
- Review logs and screenshots for tokens, credentials, addresses, or other unintended disclosures.

## Operational Boundary

The environment will share a personal workstation and is intended for learning. It lacks the isolation, resilience, access governance, certificate management, audit controls, and hardening expected from a secured production system.
