"use client";

import { useMemo, useState, type ReactNode, type SyntheticEvent } from "react";
import type { AtlasEvidenceArtifact, AtlasMilestoneRecord } from "../lib/atlasMilestoneTypes";
import EvidenceViewer from "./EvidenceViewer";

const primaryEvidence = new Set([
  "m03-atlas-search-head-job-inspector-01.png",
  "m04-atlas-search-head-job-inspector-01.png",
]);

function EvidenceGroup({ children, count, current, defaultExpanded, label }: { children: ReactNode; count: number; current: boolean; defaultExpanded: boolean; label: string }) {
  const [expanded, setExpanded] = useState(defaultExpanded);
  return <details className="evidence-group" open={expanded} onToggle={(event: SyntheticEvent<HTMLDetailsElement>) => setExpanded(event.currentTarget.open)}><summary><span><strong>{label}</strong>{current && <small>Current</small>}</span><em>{count} artifacts</em></summary>{children}</details>;
}

function EvidenceRecord({ artifact }: { artifact: AtlasEvidenceArtifact }) {
  const isPrimary = primaryEvidence.has(artifact.filename);
  const assignment = [artifact.milestone, artifact.batch, artifact.atlTask].join(" · ");
  return <article id={artifact.id} className={`evidence-record ${isPrimary ? "is-primary" : ""}`}><div><b>{assignment}</b><h3>{artifact.shortDescription}</h3><dl><div><dt>FILE</dt><dd>{artifact.filename}</dd></div><div><dt>PURPOSE</dt><dd>{artifact.validationPurpose}</dd></div><div><dt>RESULT</dt><dd className="state-value">{artifact.reviewState.toUpperCase()}</dd></div><div><dt>COMPONENT</dt><dd>{artifact.component}</dd></div></dl></div><EvidenceViewer src={artifact.image} alt={`${artifact.shortDescription}. ${artifact.validationPurpose}.`} caption={`${artifact.milestone} · ${artifact.shortDescription}`} prominence={isPrimary ? "primary" : "supporting"} /></article>;
}

export default function AtlasEvidenceBrowser({ artifacts, currentMilestone, milestones }: { artifacts: AtlasEvidenceArtifact[]; currentMilestone: string; milestones: AtlasMilestoneRecord[] }) {
  const [query, setQuery] = useState("");
  const search = query.trim().toLocaleLowerCase();
  const matches = search ? artifacts.filter((artifact) => [artifact.filename, artifact.milestone, artifact.atlTask, artifact.shortDescription, artifact.validationPurpose].join(" ").toLocaleLowerCase().includes(search)) : artifacts;
  const groups = useMemo(() => {
    const grouped = new Map<string, AtlasEvidenceArtifact[]>();
    matches.forEach((artifact) => grouped.set(artifact.milestone, [...(grouped.get(artifact.milestone) ?? []), artifact]));
    const milestoneOrder = new Map(milestones.map((milestone, index) => [milestone.id, index]));
    return [...grouped.entries()].sort(([left], [right]) => (milestoneOrder.get(right) ?? -1) - (milestoneOrder.get(left) ?? -1));
  }, [matches, milestones]);
  const titles = new Map(milestones.map((milestone) => [milestone.id, milestone.title]));

  return <div className="evidence-browser"><div className="evidence-search"><label htmlFor="evidence-search">Search evidence</label><div><input id="evidence-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Filename, milestone, ATL, description…" />{query && <button type="button" onClick={() => setQuery("")}>Clear</button>}</div><p aria-live="polite">{matches.length} matching artifacts</p></div>{groups.length === 0 ? <p className="evidence-empty">No evidence matches this search.</p> : <div className="evidence-groups">{groups.map(([milestone, records]) => <EvidenceGroup key={`${milestone}-${search ? "search" : "grouped"}`} label={`${milestone} ${titles.get(milestone) ?? ""}`.trim()} count={records.length} current={milestone === currentMilestone} defaultExpanded={Boolean(search) || milestone === currentMilestone}><div>{records.map((artifact) => <EvidenceRecord key={artifact.id} artifact={artifact} />)}</div></EvidenceGroup>)}</div>}</div>;
}
