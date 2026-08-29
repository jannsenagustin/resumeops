"use client";

import { useMemo, useState, type ReactNode, type SyntheticEvent } from "react";
import { planningFilters, type BacklogItem, type Idea, type PlanningFilter } from "../lib/atlasPlanningTypes";

type SelectedFilter = PlanningFilter | "All";
const normalize = (value: string) => value.toLocaleLowerCase();

function TaskRecord({ item }: { item: BacklogItem }) {
  return <details id={item.id.toLowerCase()} className="planning-task"><summary><span><b>{item.id}</b><small>{item.status}</small></span><strong>{item.title}</strong><em>{item.priority}</em></summary><div><p>{item.description}</p><dl><div><dt>WHY IT MATTERS</dt><dd>{item.whyItMatters}</dd></div><div><dt>DEPENDENCIES</dt><dd>{item.dependencies}</dd></div><div><dt>ACCEPTANCE</dt><dd>{item.acceptanceCriteria}</dd></div><div><dt>HUMAN VALIDATION</dt><dd>{item.humanValidationRequired}</dd></div></dl><a href={item.sourceUrl} target="_blank" rel="noopener noreferrer">Open canonical task ↗</a></div></details>;
}

function IdeaRecord({ idea }: { idea: Idea }) {
  return <article className="planning-idea-card" data-status={idea.status.toLowerCase()}><header><span>{idea.id}</span><small>{idea.status}</small></header><h3>{idea.title}</h3><p>{idea.description}</p><dl><div><dt>CATEGORY</dt><dd>{idea.category}</dd></div><div><dt>POTENTIAL DESTINATION</dt><dd>{idea.potentialDestination}</dd></div>{idea.relatedProposal !== "None" && <div><dt>RELATED PROPOSAL</dt><dd>{idea.relatedProposal}</dd></div>}{idea.relatedBacklog !== "None" && <div><dt>RELATED BACKLOG</dt><dd>{idea.relatedBacklog}</dd></div>}</dl><a href={idea.sourceUrl} target="_blank" rel="noopener noreferrer">Open canonical idea ↗</a></article>;
}

function DisclosureGroup({ children, defaultExpanded, label, count, kind }: { children: ReactNode; defaultExpanded: boolean; label: string; count: number; kind: "Milestone" | "Category" }) {
  const [expanded, setExpanded] = useState(defaultExpanded);
  return <details className="planning-record-group" open={expanded} onToggle={(event: SyntheticEvent<HTMLDetailsElement>) => setExpanded(event.currentTarget.open)}><summary aria-expanded={expanded}><span><strong>{label}</strong><small>{count} records</small></span><em>{kind}</em></summary>{children}</details>;
}

export default function PlanningBacklog({ items, ideas, currentMilestone }: { items: BacklogItem[]; ideas: Idea[]; currentMilestone: string }) {
  const [filter, setFilter] = useState<SelectedFilter>("All");
  const [query, setQuery] = useState("");
  const search = normalize(query.trim());
  const categoryItems = filter === "All" ? items : items.filter((item) => item.categories.includes(filter));
  const categoryIdeas = filter === "All" ? ideas : ideas.filter((idea) => idea.category === filter || (filter === "Website / UX" && idea.category === "Website"));
  const filteredItems = search ? categoryItems.filter((item) => normalize([item.id, item.title, item.categories.join(" "), item.status, item.priority, item.milestone, item.description].join(" ")).includes(search)) : categoryItems;
  const filteredIdeas = search ? categoryIdeas.filter((idea) => normalize([idea.id, idea.title, idea.category, idea.status, idea.description, idea.whyItMightMatter, idea.potentialDestination].join(" ")).includes(search)) : categoryIdeas;
  const backlogGroups = useMemo(() => { const groups = new Map<string, BacklogItem[]>(); filteredItems.forEach((item) => groups.set(item.milestone, [...(groups.get(item.milestone) ?? []), item])); return [...groups.entries()]; }, [filteredItems]);
  const ideaGroups = useMemo(() => { const groups = new Map<string, Idea[]>(); filteredIdeas.forEach((idea) => groups.set(idea.category, [...(groups.get(idea.category) ?? []), idea])); return [...groups.entries()]; }, [filteredIdeas]);
  const resultCount = filteredItems.length + filteredIdeas.length;

  return <>
    <section id="backlog" className="planning-section" aria-labelledby="planning-backlog-title">
      <header className="planning-section__header"><div><span>03 / WORK INVENTORY</span><h2 id="planning-backlog-title">Backlog by milestone</h2></div><p>Groups and filters change only this view. Canonical task state remains in Git.</p></header>
      <div className="planning-search"><label htmlFor="planning-search">Search Backlog and Idea Inbox</label><div><input id="planning-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="ID, title, status, milestone, description…" />{query && <button type="button" onClick={() => setQuery("")}>Clear</button>}</div><p aria-live="polite">{resultCount} matching records</p></div>
      <div className="planning-filters" aria-label="Filter backlog and Idea Inbox by category">{(["All", ...planningFilters] as const).map((category) => <button key={category} type="button" aria-pressed={filter === category} onClick={() => setFilter(category)}>{category}</button>)}</div>
      <div className="planning-disclosure-groups">{backlogGroups.length === 0 ? <p className="planning-inline-empty">No backlog records match.</p> : backlogGroups.map(([milestone, records]) => <DisclosureGroup key={`${milestone}-${search ? "search" : "grouped"}`} label={milestone} count={records.length} kind="Milestone" defaultExpanded={Boolean(search) || milestone === currentMilestone || records.some((item) => item.status === "Active" || item.status === "Review")}><div className="planning-backlog-grid">{records.map((item) => <TaskRecord key={item.id} item={item} />)}</div></DisclosureGroup>)}</div>
    </section>
    <section id="idea-inbox" className="planning-section" aria-labelledby="idea-inbox-title"><header className="planning-section__header"><div><span>04 / CAPTURE LAYER</span><h2 id="idea-inbox-title">Idea Inbox by category</h2></div><p>Lightweight possibilities awaiting human review. Ideas are not commitments.</p></header><div className="planning-disclosure-groups planning-idea-groups">{ideaGroups.length === 0 ? <p className="planning-inline-empty">No ideas match.</p> : ideaGroups.map(([category, records]) => <DisclosureGroup key={`${category}-${search ? "search" : "grouped"}`} label={category} count={records.length} kind="Category" defaultExpanded={Boolean(search) || records.some((idea) => idea.status === "Reviewing")}><div className="planning-idea-grid">{records.map((idea) => <IdeaRecord key={idea.id} idea={idea} />)}</div></DisclosureGroup>)}</div></section>
  </>;
}
