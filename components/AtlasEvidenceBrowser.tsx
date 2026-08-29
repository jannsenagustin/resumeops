"use client";

import { useMemo, useState, type SyntheticEvent } from "react";
import type { AtlasEvidenceArtifact, AtlasMilestoneRecord } from "../lib/atlasMilestoneTypes";
import EvidenceViewer from "./EvidenceViewer";

function EvidenceRecord({ artifact }: { artifact: AtlasEvidenceArtifact }) {
  const assignment = [artifact.milestone, artifact.batch, artifact.atlTask].join(" · ");
  return <article id={artifact.id} className="evidence-record"><div><b>{assignment}</b><h3>{artifact.shortDescription}</h3><dl><div><dt>FILE</dt><dd>{artifact.filename}</dd></div><div><dt>PURPOSE</dt><dd>{artifact.validationPurpose}</dd></div><div><dt>RESULT</dt><dd className="state-value">{artifact.reviewState.toUpperCase()}</dd></div><div><dt>COMPONENT</dt><dd>{artifact.component}</dd></div></dl></div><EvidenceViewer src={artifact.image} alt={`${artifact.shortDescription}. ${artifact.validationPurpose}.`} caption={`${artifact.milestone} · ${artifact.shortDescription}`} prominence="supporting" /></article>;
}

const repositoryRoot = "https://github.com/jannsenagustin/resumeops/blob/main";

function EvidenceGroup({ current, milestone, records }: { current: boolean; milestone: AtlasMilestoneRecord; records: AtlasEvidenceArtifact[] }) {
  const [expanded, setExpanded] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const hero = records[0];
  const supportingCount = Math.max(0, records.length - 1);
  return <details className="evidence-group" data-current={current || undefined} open={expanded} onToggle={(event: SyntheticEvent<HTMLDetailsElement>) => setExpanded(event.currentTarget.open)}><summary aria-expanded={expanded}><span className="evidence-group__identity"><small>Chapter {milestone.number} · {milestone.id}{current ? " · Current" : ""}</small><strong>{milestone.title}</strong><span>{milestone.outcome}</span></span><span className="evidence-group__state"><b>{milestone.status}</b><small>{milestone.validationState}</small><em>{records.length} artifacts</em></span></summary><div className="evidence-group__overview"><div><b>MILESTONE VALIDATION</b><h3>{hero.shortDescription}</h3><dl><div><dt>WHY IT MATTERS</dt><dd>{milestone.outcome}</dd></div><div><dt>WHAT IT VALIDATES</dt><dd>{hero.validationPurpose}</dd></div><div><dt>HERO ARTIFACT</dt><dd>{hero.filename}</dd></div><div><dt>SUPPORTING EVIDENCE</dt><dd>{supportingCount} artifacts</dd></div></dl><div className="evidence-group__references"><a href={`${repositoryRoot}/${hero.canonicalPath}`} target="_blank" rel="noopener noreferrer">Open hero artifact ↗</a><a href={`${repositoryRoot}/docs/evidence/README.md`} target="_blank" rel="noopener noreferrer">Canonical evidence index ↗</a></div></div><EvidenceViewer src={hero.image} alt={`${hero.shortDescription}. ${hero.validationPurpose}.`} caption={`${hero.milestone} · ${hero.shortDescription}`} prominence="primary" /></div>{supportingCount > 0 && <details className="evidence-group__all" open={showAll} onToggle={(event: SyntheticEvent<HTMLDetailsElement>) => setShowAll(event.currentTarget.open)}><summary aria-expanded={showAll}>Supporting evidence <span>({supportingCount})</span></summary><div>{records.slice(1).map((artifact) => <EvidenceRecord key={artifact.id} artifact={artifact} />)}</div></details>}</details>;
}

export default function AtlasEvidenceBrowser({ artifacts, currentMilestone, milestones }: { artifacts: AtlasEvidenceArtifact[]; currentMilestone: string; milestones: AtlasMilestoneRecord[] }) {
  const [query, setQuery] = useState("");
  const search = query.trim().toLocaleLowerCase();
  const matches = search ? artifacts.filter((artifact) => [artifact.filename, artifact.milestone, artifact.atlTask, artifact.shortDescription, artifact.validationPurpose].join(" ").toLocaleLowerCase().includes(search)) : artifacts;
  const groups = useMemo(() => { const grouped = new Map<string, AtlasEvidenceArtifact[]>(); matches.forEach((artifact) => grouped.set(artifact.milestone, [...(grouped.get(artifact.milestone) ?? []), artifact])); const milestoneOrder = new Map(milestones.map((milestone, index) => [milestone.id, index])); return [...grouped.entries()].sort(([left], [right]) => (milestoneOrder.get(right) ?? -1) - (milestoneOrder.get(left) ?? -1)); }, [matches, milestones]);
  const milestoneRecords = new Map(milestones.map((milestone) => [milestone.id, milestone]));
  return <div className="evidence-browser"><div className="evidence-search"><label htmlFor="evidence-search">Search engineering proof</label><div><input id="evidence-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Filename, milestone, ATL, description…" />{query && <button type="button" onClick={() => setQuery("")}>Clear</button>}</div><p aria-live="polite">{matches.length} matching artifacts</p></div>{groups.length === 0 ? <p className="evidence-empty">No evidence matches this search.</p> : search ? <div className="evidence-search-results">{matches.map((artifact) => <EvidenceRecord key={artifact.id} artifact={artifact} />)}</div> : <div className="evidence-groups">{groups.map(([milestoneId, records]) => { const milestone = milestoneRecords.get(milestoneId); if (!milestone) return null; return <EvidenceGroup key={milestoneId} milestone={milestone} current={milestoneId === currentMilestone} records={records} />; })}</div>}</div>;
}
