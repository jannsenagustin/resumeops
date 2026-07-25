# Project Atlas Environment Variables

Create `infrastructure/atlas/.env` from `.env.example`, then replace every blocking placeholder before startup. The `.env` file is sensitive and must never be committed.

| Variable | Purpose | Example Placeholder | Sensitive | Required |
| --- | --- | --- | --- | --- |
| `ATLAS_PROJECT_NAME` | Sets the Docker Compose project identity. | `atlas` | No | Yes |
| `SPLUNK_IMAGE` | Selects the official image repository. | `splunk/splunk` | No | Yes |
| `SPLUNK_VERSION` | Pins a verified supported image tag; never use `latest` silently. | `VERIFY_SUPPORTED_TAG` | No | Yes |
| `SPLUNK_PASSWORD` | Sets the local Splunk administrator password. | `CHANGE_ME` | **Yes** | Yes |
| `SPLUNK_START_ARGS` | Records license acceptance arguments after the user reviews the applicable license. | `REVIEW_LICENSE_BEFORE_USE` | No | Yes |
| `SPLUNK_GENERAL_TERMS` | Records any general-terms acceptance argument required by the selected image version after user review. | `REVIEW_GENERAL_TERMS_BEFORE_USE` | No | Version-dependent |
| `ATLAS_SEARCH_HEAD_WEB_PORT` | Publishes Search Head Splunk Web to localhost. | `8000` | No | Yes |
| `ATLAS_INDEXER_WEB_PORT` | Publishes Indexer Splunk Web to a distinct localhost port. | `8001` | No | Yes |
| `ATLAS_DEPLOYMENT_SERVER_WEB_PORT` | Publishes Deployment Server Splunk Web to a distinct localhost port. | `8002` | No | Yes |
| `ATLAS_SEARCH_HEAD_MANAGEMENT_PORT` | Reserves a proposed localhost port if temporary host publication is later required. It is not used by the current Compose file. | `8089` | No | No |
| `ATLAS_INDEXER_MANAGEMENT_PORT` | Reserves a proposed localhost port if temporary host publication is later required. It is not used by the current Compose file. | `8090` | No | No |
| `ATLAS_DEPLOYMENT_SERVER_MANAGEMENT_PORT` | Reserves a proposed localhost port if temporary host publication is later required. It is not used by the current Compose file. | `8091` | No | No |
| `ATLAS_INDEXER_RECEIVER_PORT` | Identifies the internal future Splunk-to-Splunk receiving port. Sprint 6C must enable the receiver before use. | `9997` | No | Yes |

## Port Basis

Official Splunk documentation identifies `8000` as the default Splunk Web port, `8089` as the management/API port used for distributed connections, and `9997` as the conventional Indexer receiving port. Atlas publishes only the three Web interfaces to `127.0.0.1`. Management communication stays inside `atlas-network`, and receiving is not enabled in Sprint 6B.

The distinct Indexer and Deployment Server host Web ports are proposed collision-avoidance mappings. They map to container port `8000` and may be changed locally if already occupied.

## Secret Rules

- Never commit `.env`.
- Never replace the example password with a real value in `.env.example`.
- Never commit a Splunk license file.
- Do not include resolved Compose output containing a real password in evidence.
- Use a strong local administrator password that meets the selected Splunk version's requirements.
- Re-run `git status` and secret scanning before every commit.
