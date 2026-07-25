# Project Atlas Troubleshooting

Run commands from `infrastructure/atlas`. Do not paste resolved passwords, license material, or other secret values into committed evidence.

## Docker Desktop Is Not Running

- **Symptom:** `docker` cannot connect to the engine, or Compose reports that the daemon is unavailable.
- **Likely cause:** Docker Desktop is stopped, still starting, or using an unavailable context.
- **Diagnostic command:** `docker info`
- **Safe corrective action:** Start Docker Desktop, wait for the engine to report ready, confirm the selected context, and rerun `docker info`.

## Port Already in Use

- **Symptom:** Container creation fails with a bind or address-in-use error.
- **Likely cause:** Another process or container already uses a proposed host Web port.
- **Diagnostic command:** `Get-NetTCPConnection -State Listen | Select-Object LocalAddress,LocalPort,OwningProcess`
- **Safe corrective action:** Select an unused localhost port in `.env`, run `docker compose config`, and restart the affected service. Do not expose the service on all interfaces to bypass the conflict.

## Container Keeps Restarting

- **Symptom:** `docker compose ps` shows repeated restarts or an exited service.
- **Likely cause:** Invalid environment values, incomplete license acceptance, insufficient resources, volume problems, or initialization failure.
- **Diagnostic command:** `docker compose logs --tail=100 <service-name>`
- **Safe corrective action:** Correct the reported local configuration, preserve volumes, and recreate only after reviewing the error. Do not delete volumes as the first response.

## Insufficient Memory or CPU

- **Symptom:** Slow initialization, unexpected exits, host pressure, or out-of-memory messages.
- **Likely cause:** Docker Desktop limits or shared host capacity are insufficient for three Splunk instances.
- **Diagnostic command:** `docker stats --no-stream`
- **Safe corrective action:** Stop unnecessary workloads, adjust Docker Desktop limits conservatively, or start services sequentially for diagnosis. Record actual resource observations.

## Invalid Environment Variables

- **Symptom:** Compose interpolation fails, a blocking placeholder remains, or Splunk initialization rejects a value.
- **Likely cause:** `.env` is missing, malformed, or incomplete.
- **Diagnostic command:** `docker compose config`
- **Safe corrective action:** Compare the local file with `.env.example`, replace every blocking placeholder, and validate again. Keep the resolved password out of shared output.

## License Acceptance Is Not Configured

- **Symptom:** Splunk refuses to start and logs report missing acceptance arguments.
- **Likely cause:** The user has not reviewed or configured the arguments required by the selected image version.
- **Diagnostic command:** `docker compose logs --tail=100 <service-name>`
- **Safe corrective action:** Review the applicable official license and general terms, then update the local `.env` with the required arguments only if accepted.

## Password Requirements Are Not Met

- **Symptom:** Initialization fails with an administrator password validation error.
- **Likely cause:** The local value does not meet the selected Splunk version's password requirements or remains `CHANGE_ME`.
- **Diagnostic command:** `docker compose logs --tail=100 <service-name>`
- **Safe corrective action:** Set a strong compliant password in the untracked `.env`. Do not place it in the Compose file, documentation, or command examples.

## Persistent-Volume Permission Problems

- **Symptom:** Splunk cannot read or write `/opt/splunk/etc` or `/opt/splunk/var`.
- **Likely cause:** Incorrect volume state, ownership, or an unsupported mount modification.
- **Diagnostic command:** `docker compose logs --tail=100 <service-name>`
- **Safe corrective action:** Inspect mounts with `docker inspect <container-name>`, preserve evidence, and correct the mount design. Use a destructive volume reset only after confirming that all stored lab state may be deleted.

## Service-Name Resolution Failure

- **Symptom:** One container cannot resolve `atlas-search-head`, `atlas-indexer`, or `atlas-deployment-server`.
- **Likely cause:** A service is not attached to `atlas-network`, the network was not created correctly, or the wrong name is used.
- **Diagnostic command:** `docker network inspect atlas-network`
- **Safe corrective action:** Confirm all three containers appear in the network inspection, use Compose service names, and recreate the containers with `docker compose down` followed by `docker compose up -d`.

## Search Head Cannot Reach the Indexer

- **Symptom:** Adding `atlas-indexer:8089` as a search peer fails or the peer is unavailable.
- **Likely cause:** Indexer startup is incomplete, internal DNS fails, management communication is unavailable, or authentication is rejected.
- **Diagnostic command:** `docker compose exec atlas-search-head getent hosts atlas-indexer`
- **Safe corrective action:** Verify both services are healthy, confirm internal resolution and management-port availability, then retry with credentials entered interactively. Do not publish management ports to the host unless diagnosis proves it necessary.

## Accidental Secret Tracking

- **Symptom:** `git status` shows `.env`, a license file, or another sensitive artifact.
- **Likely cause:** The file is outside the ignored path, uses an unexpected extension, or was tracked before the ignore rule existed.
- **Diagnostic command:** `git check-ignore -v infrastructure/atlas/.env`
- **Safe corrective action:** Stop before committing. Move the material to an ignored local path and verify `git status`. If sensitive content was already committed or pushed, do not merely delete it—rotate the secret and follow repository-history remediation procedures.

## Destructive Reset Warning

`docker compose down` preserves named volumes. `docker compose down --volumes` deletes Atlas data and configuration permanently. Use the volume-deleting form only for an intentional clean rebuild after capturing evidence and confirming that nothing must be retained.
