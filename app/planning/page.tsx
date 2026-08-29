import type { Metadata } from "next";
import PlanningBacklog from "../../components/PlanningBacklog";
import PlanningSidebar from "../../components/PlanningSidebar";
import PlanningQuickNav from "../../components/PlanningQuickNav";
import {
  canonicalPlanningSources,
  getAtlasPlanningData,
} from "../../lib/atlasPlanning";
import { planningPriorities } from "../../lib/atlasPlanningTypes";
import { getAtlasProjectState } from "../../lib/atlasProjectState";
import { getLatestCommit } from "../../lib/repositoryMetadata";

export const metadata: Metadata = {
  title: "Planning Console",
  description: "Read-only projection of the repository-backed Atlas Engineering Operating System.",
  openGraph: {
    title: "Planning Console | Project Atlas",
    description: "Read-only projection of the repository-backed Atlas Engineering Operating System.",
  },
  twitter: {
    title: "Planning Console | Project Atlas",
    description: "Read-only projection of the repository-backed Atlas Engineering Operating System.",
  },
};

export default function PlanningPage() {
  const data = getAtlasPlanningData();
  const projectState = getAtlasProjectState();
  const latestCommit = getLatestCommit();
  const proposalGroups = data.proposals.reduce<Map<string, typeof data.proposals>>((groups, proposal) => {
    groups.set(proposal.status, [...(groups.get(proposal.status) ?? []), proposal]);
    return groups;
  }, new Map());
  const activeBatchIsEmpty = data.activeBatch.batchId === "Unassigned";

  return (
    <main className="planning-console">
      <header className="planning-topbar">
        <p className="planning-wordmark">PROJECT ATLAS <span>/ PLANNING CONSOLE</span></p>
      </header>
      <PlanningQuickNav />

      <div className="planning-workspace">
        <PlanningSidebar projectState={projectState} latestCommit={latestCommit} />
        <div className="planning-workspace__content">
      <section id="planning-overview" className="planning-hero" aria-labelledby="planning-title">
        <div>
          <p>ATLAS EOS / READ-ONLY REPOSITORY PROJECTION</p>
          <h1 id="planning-title">Engineering Planning Console</h1>
          <p>Project orientation grounded in canonical Markdown. Git owns the data; this interface only presents it.</p>
        </div>
        <dl>
          <div><dt>AUTHORITY</dt><dd>Git repository</dd></div>
          <div><dt>INTERACTION</dt><dd>Read-only</dd></div>
          <div><dt>ACTIVE BATCH</dt><dd>{data.activeBatch.status}</dd></div>
          <div><dt>WORKFLOW</dt><dd>Human approved</dd></div>
        </dl>
      </section>

      <section className="planning-overview-grid" aria-label="Current planning state">
        <article id="current-milestone" className="planning-panel planning-milestone">
          <header><span>01 / CURRENT MILESTONE</span><h2>{projectState.currentMilestone.id}</h2></header>
          <dl>
            <div><dt>STATUS</dt><dd>{projectState.currentMilestone.status}</dd></div>
            <div><dt>VALIDATION</dt><dd>{projectState.currentMilestone.validationState}</dd></div>
            <div><dt>COMPLETED WORK</dt><dd>{projectState.completedTasks.map((task) => task.id).join(", ")}</dd></div>
            <div><dt>ACTIVE OBJECTIVE</dt><dd>{projectState.activeTasks[0] ? <a href={data.backlog.find((item) => item.id === projectState.activeTasks[0].id)?.sourceUrl} target="_blank" rel="noopener noreferrer">{projectState.activeTasks[0].id} — {projectState.activeTasks[0].title} ↗</a> : "Awaiting human approval"}</dd></div>
          </dl>
        </article>

        <article id="active-batch" className="planning-panel planning-active-batch">
          <header><span>02 / ACTIVE BATCH</span><h2>{activeBatchIsEmpty ? "No Active Batch" : data.activeBatch.batchId}</h2></header>
          {activeBatchIsEmpty ? (
            <div className="planning-empty-state">
              <p>Work begins only after explicit human approval.</p>
              <span>The backlog is not executable scope.</span>
            </div>
          ) : (
            <dl>
              <div><dt>STATUS</dt><dd>{data.activeBatch.status}</dd></div>
              <div><dt>OBJECTIVE</dt><dd>{data.activeBatch.objective}</dd></div>
              <div><dt>INCLUDED TASKS</dt><dd>{data.activeBatch.includedTasks}</dd></div>
              <div><dt>DEPENDENCIES</dt><dd>{data.activeBatch.dependencies}</dd></div>
              <div><dt>HUMAN VALIDATION</dt><dd>{data.activeBatch.humanValidationRequired}</dd></div>
            </dl>
          )}
          <a href={data.activeBatch.sourceUrl} target="_blank" rel="noopener noreferrer">Open canonical Active Batch ↗</a>
        </article>
      </section>

      <div id="planning-backlog"><PlanningBacklog items={data.backlog} ideas={data.ideas} currentMilestone={projectState.currentMilestone.id} /></div>

      <section id="planning-proposals" className="planning-section" aria-labelledby="proposals-title">
        <header className="planning-section__header"><div><span>05 / EVALUATION</span><h2 id="proposals-title">Engineering Proposals</h2></div><p>Ideas requiring evaluation before executable commitment.</p></header>
        <div className="planning-proposal-groups">
          {[...proposalGroups.entries()].map(([status, proposals]) => (
            <section key={status} aria-labelledby={`proposal-${status.toLowerCase().replace(/\s/g, "-")}`}>
              <h3 id={`proposal-${status.toLowerCase().replace(/\s/g, "-")}`}>{status}</h3>
              {proposals.map((proposal) => (
                <article className="planning-card" key={proposal.id}>
                  <span>{proposal.id}</span><h4>{proposal.title}</h4><p>{proposal.problem}</p>
                  <a href={proposal.sourceUrl} target="_blank" rel="noopener noreferrer">Open proposal ↗</a>
                </article>
              ))}
            </section>
          ))}
        </div>
      </section>

      <div className="planning-record-grid">
        <section id="planning-decisions" className="planning-section" aria-labelledby="decisions-title">
          <header className="planning-section__header"><div><span>06 / GOVERNANCE</span><h2 id="decisions-title">Recent Decisions</h2></div></header>
          <ol className="planning-record-list">
            {data.decisions.slice(-5).reverse().map((decision) => (
              <li key={decision.id}><a href={decision.sourceUrl} target="_blank" rel="noopener noreferrer"><span>{decision.id}</span><strong>{decision.title}</strong><p>{decision.decision}</p></a></li>
            ))}
          </ol>
        </section>

        <section id="planning-lessons" className="planning-section" aria-labelledby="lessons-title">
          <header className="planning-section__header"><div><span>07 / REUSABLE KNOWLEDGE</span><h2 id="lessons-title">Lessons Learned</h2></div></header>
          <ol className="planning-record-list">
            {data.lessons.slice(-5).reverse().map((lesson) => (
              <li key={lesson.id}><a href={lesson.sourceUrl} target="_blank" rel="noopener noreferrer"><span>{lesson.id}</span><strong>{lesson.title}</strong><p>{lesson.reusableLesson}</p></a></li>
            ))}
          </ol>
        </section>
      </div>

      <section id="planning-sources" className="planning-section planning-sources" aria-labelledby="sources-title">
        <header className="planning-section__header"><div><span>08 / SOURCE OF TRUTH</span><h2 id="sources-title">Canonical Sources</h2></div><p>Every planning record begins and ends in the repository.</p></header>
        <ul>
          {canonicalPlanningSources.map(([label, href], index) => <li key={href}><a href={href} target="_blank" rel="noopener noreferrer"><span>{String(index + 1).padStart(2, "0")}</span>{label}<b>↗</b></a></li>)}
        </ul>
      </section>

      <footer className="planning-footer">
        <span>ATLAS EOS / REPOSITORY AUTHORITY</span>
        <p>{planningPriorities.join(" · ")} / Human approval required</p>
      </footer>
        </div>
      </div>
    </main>
  );
}
