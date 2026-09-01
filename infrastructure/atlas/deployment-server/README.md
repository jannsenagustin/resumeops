# Atlas Deployment Server Configuration Release

This directory is the Git-controlled source for configuration released manually
to the dedicated Rocky Linux Deployment Server. It implements the reviewed
ATL-006 workflow without CI/CD or unattended deployment.

The source tree mirrors paths below `/opt/splunk/etc/deployment-apps/`. The
feature change has been reviewed and merged, but that does not authorize a
release. A human must separately approve the manual release commands.

## Current Change

The initial controlled change places the validated `TA-atlas-demo-inputs`
configuration under source control and increments its app metadata version from
`1.0.0` to `1.0.1`. The monitored source, index, sourcetype, and enabled state
remain unchanged.

`TA-atlas-outputs` remains a separate Deployment Server application under
DEC-024. It is outside this change because the complete live app metadata has
not yet been captured as a canonical repository source. Its validated runtime
target remains documented by the M05 records.

## Source-to-Target Mapping

| Repository source | Deployment Server target |
| --- | --- |
| `deployment-apps/TA-atlas-demo-inputs/default/app.conf` | `/opt/splunk/etc/deployment-apps/TA-atlas-demo-inputs/default/app.conf` |
| `deployment-apps/TA-atlas-demo-inputs/default/inputs.conf` | `/opt/splunk/etc/deployment-apps/TA-atlas-demo-inputs/default/inputs.conf` |

The Deployment Server remains the sole source of managed client configuration.
Do not edit the Universal Forwarder application directories manually.

## Merged Change Review Record

The merged change was reviewed to confirm:

- the branch contains only ATL-006 scope;
- the source-to-target mapping is unchanged;
- `inputs.conf` still monitors the approved `*.log` wildcard under the Atlas logs directory;
- `index = main`, `sourcetype = atlas:demo`, and `disabled = false` remain
  unchanged;
- the only intended runtime-neutral change is `version = 1.0.1`;
- no credentials, authentication state, or persistent client identifiers are
  present; and
- rollback and validation commands remain accurate.

Merge approval does not authorize release. Release requires a separate human
approval at the manual control point below.

### Verify Existing Deployment Assignment

Before changing the live application, privately verify in Forwarder Management
that:

- `TA-atlas-demo-inputs` remains assigned to the existing approved server class;
- the expected Windows Universal Forwarder remains a qualifying client;
- no unexpected clients are included; and
- no `serverclass.conf` change is required for this release.

This is a read-only verification of the ATL-005 mapping. Do not edit
`serverclass.conf` as part of BATCH-005.

Do not publish client GUIDs, private addresses, or other persistent client
identifiers captured during this verification.

### Prepare Reviewed Release Source

Before beginning the manual release:

- obtain a local checkout of the reviewed repository on the Deployment Server;
- ensure it contains the approved merged commit;
- checkout that exact commit;
- set `ATLAS_RELEASE_SOURCE` to that working copy.

The runtime release procedure assumes the repository already exists locally.
It does not clone, fetch, or update the repository automatically.

## Manual Release Control Point

For the reviewed merged change, record the exact final commit SHA approved for
release and obtain explicit human release approval.

```bash
# Record the reviewed merged commit that is being released.
export ATLAS_RELEASE_COMMIT="REPLACE_WITH_MERGED_COMMIT_SHA"

# Point to the reviewed checkout.
export ATLAS_RELEASE_SOURCE=/path/to/reviewed/resumeops

# Bind this release's rollback checkpoint to that exact commit.
export ATLAS_BACKUP_ROOT="/opt/splunk/var/atlas-release-backups/BATCH-005/${ATLAS_RELEASE_COMMIT}"

# Stop unless the reviewed checkout is at the exact commit approved for release.
if [ "$(git -C "$ATLAS_RELEASE_SOURCE" rev-parse HEAD)" != "$ATLAS_RELEASE_COMMIT" ]; then
  echo "Release source does not match ATLAS_RELEASE_COMMIT." >&2
  exit 1
fi
```

On the Deployment Server, run normal Splunk
administration as the `splunk` service account. Use elevated filesystem commands
only for the controlled file installation and ownership boundary.

Set `ATLAS_RELEASE_SOURCE` to a reviewed checkout of the merged repository and
inspect the candidate files before changing the live application:

```bash
sudo diff -u \
  /opt/splunk/etc/deployment-apps/TA-atlas-demo-inputs/default/app.conf \
  "$ATLAS_RELEASE_SOURCE/infrastructure/atlas/deployment-server/deployment-apps/TA-atlas-demo-inputs/default/app.conf"

sudo diff -u \
  /opt/splunk/etc/deployment-apps/TA-atlas-demo-inputs/default/inputs.conf \
  "$ATLAS_RELEASE_SOURCE/infrastructure/atlas/deployment-server/deployment-apps/TA-atlas-demo-inputs/default/inputs.conf"
```

Stop if the diff contains anything beyond the reviewed change. If it matches,
create a recoverable checkpoint and install the reviewed files:

```bash
# Never overwrite an existing rollback checkpoint.
if sudo test -e "$ATLAS_BACKUP_ROOT"; then
  echo "Rollback checkpoint already exists: $ATLAS_BACKUP_ROOT" >&2
  exit 1
fi

sudo install -d -o splunk -g splunk -m 0750 \
  "$ATLAS_BACKUP_ROOT/TA-atlas-demo-inputs/default"

sudo cp -a \
  /opt/splunk/etc/deployment-apps/TA-atlas-demo-inputs/default/app.conf \
  "$ATLAS_BACKUP_ROOT/TA-atlas-demo-inputs/default/app.conf"

sudo cp -a \
  /opt/splunk/etc/deployment-apps/TA-atlas-demo-inputs/default/inputs.conf \
  "$ATLAS_BACKUP_ROOT/TA-atlas-demo-inputs/default/inputs.conf"

sudo install -o splunk -g splunk -m 0640 \
  "$ATLAS_RELEASE_SOURCE/infrastructure/atlas/deployment-server/deployment-apps/TA-atlas-demo-inputs/default/app.conf" \
  /opt/splunk/etc/deployment-apps/TA-atlas-demo-inputs/default/app.conf

sudo install -o splunk -g splunk -m 0640 \
  "$ATLAS_RELEASE_SOURCE/infrastructure/atlas/deployment-server/deployment-apps/TA-atlas-demo-inputs/default/inputs.conf" \
  /opt/splunk/etc/deployment-apps/TA-atlas-demo-inputs/default/inputs.conf
```

Inspect the installed files and effective configuration before reloading:

```bash
sudo -u splunk cat /opt/splunk/etc/deployment-apps/TA-atlas-demo-inputs/default/app.conf
sudo -u splunk cat /opt/splunk/etc/deployment-apps/TA-atlas-demo-inputs/default/inputs.conf
sudo -u splunk -H /opt/splunk/bin/splunk reload deploy-server
```

Allow a complete client phone-home cycle before diagnosing propagation as
failed.

## Client and Runtime Validation

On the Windows Universal Forwarder, verify the deployed source and effective
input configuration without making local configuration changes:

```powershell
Get-Content 'C:\Program Files\SplunkUniversalForwarder\etc\apps\TA-atlas-demo-inputs\default\app.conf'
Get-Content 'C:\Program Files\SplunkUniversalForwarder\etc\apps\TA-atlas-demo-inputs\default\inputs.conf'
Set-Location 'C:\Program Files\SplunkUniversalForwarder\bin'
.\splunk.exe btool inputs list --debug | Select-String -Pattern 'TA-atlas-demo-inputs|logs\\\*\.log|atlas:demo' -Context 1,3
Get-Service SplunkForwarder
```

Then append a new uniquely identifiable validation event to the controlled log
and confirm that `index=main sourcetype=atlas:demo` returns that event. App
delivery alone is insufficient; validation must cover deployed files, effective
configuration, service health, ingestion, and search.

## Manual Rollback

If inspection, reload, deployment, or client validation fails, restore the
checkpoint and reload the Deployment Server:

```bash
sudo install -o splunk -g splunk -m 0640 \
  "$ATLAS_BACKUP_ROOT/TA-atlas-demo-inputs/default/app.conf" \
  /opt/splunk/etc/deployment-apps/TA-atlas-demo-inputs/default/app.conf

sudo install -o splunk -g splunk -m 0640 \
  "$ATLAS_BACKUP_ROOT/TA-atlas-demo-inputs/default/inputs.conf" \
  /opt/splunk/etc/deployment-apps/TA-atlas-demo-inputs/default/inputs.conf

sudo -u splunk -H /opt/splunk/bin/splunk reload deploy-server
```

After a complete phone-home cycle, verify the restored client files and
effective configuration. Record whether rollback was executed or remained an
unexercised recovery path; do not claim rollback validation without evidence.
