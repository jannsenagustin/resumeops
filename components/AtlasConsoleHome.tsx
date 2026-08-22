import Link from "next/link";
import { enterpriseExperience } from "../data/experience";
import {
  linkedInUrl,
} from "../data/homeConsole";
import { getAtlasProjectState } from "../lib/atlasProjectState";
import type { AtlasProjectState } from "../lib/atlasMilestoneTypes";
import AtlasPipeline from "./AtlasPipeline";
import AtlasConsoleNav from "./AtlasConsoleNav";
import AtlasConsoleShell from "./AtlasConsoleShell";
import Panel from "./Panel";

function ConsoleHeader({ state }: { state: AtlasProjectState }) {
  const consoleStatus = [
    ["Project", "Atlas", "neutral"],
    ["Location", "Edmonton, Canada", "neutral"],
    ["Validated", "Milestones 01–04", "validated"],
    ["Current Work", `${state.currentMilestone.id} / ${state.currentDetail.currentPhase}`, "planned"],
    ["Active Batch", state.activeBatch.id, "neutral"],
    ["Experience", "7+ Years Splunk", "neutral"],
  ] as const;
  return (
    <header className="console-header">
      <div className="console-status" aria-label="Atlas project status">
        {consoleStatus.map(([label, value, state]) => (
          <div key={label} data-state={state}>
            <span>{label}</span>
            <strong>{value}</strong>
          </div>
        ))}
      </div>
      <div className="console-nav-wrap">
        <Link className="console-wordmark" href="#current-state">
          <span>PROJECT</span> ATLAS
        </Link>
        <AtlasConsoleNav />
      </div>
    </header>
  );
}

function CurrentSystemState({ state }: { state: AtlasProjectState }) {
  const systemState = [
    ["Distributed Search", "Validated", "validated"],
    ["Windows Event Ingestion", "Validated", "validated"],
    [state.currentMilestone.title, `${state.currentMilestone.status} / ${state.currentMilestone.validationState}`, "planned"],
    ["Active Objective", state.activeTasks[0].id, "neutral"],
    ["Current Milestone", state.currentMilestone.id, "neutral"],
  ] as const;
  return (
    <section
      id="current-state"
      className="atlas-console-section console-current"
      aria-labelledby="console-title"
    >
      <div className="console-current__intro">
        <p className="console-kicker">PROJECT ATLAS / CURRENT SYSTEM STATE</p>
        <h1 id="console-title">An evidence-backed Splunk engineering record</h1>
        <p className="console-current__summary">
          I built Project Atlas to demonstrate how I approach Splunk and
          infrastructure engineering. It documents each system I build, the
          decisions behind it, how I validate it, and the evidence that proves
          it works.
        </p>
        <p>
          Project Atlas documents the construction and validation of a Splunk
          platform from its first containerized runtime through distributed
          search, Windows event ingestion, and the current move toward
          centralized configuration management.
        </p>
        <div className="console-actions" aria-label="Primary paths">
          <Link className="atlas-button atlas-button--primary" href="/projects/atlas/">
            Explore Atlas <span aria-hidden="true">→</span>
          </Link>
          <a className="atlas-button atlas-button--secondary" href="#experience">
            View Experience <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
      <Panel
        eyebrow="System State"
        title="Validated foundation and current boundary"
        metadata={`${state.currentMilestone.id} / ACTIVE WORK`}
        status="planned"
        className="console-current__panel"
        headingLevel="h2"
      >
        <dl className="console-state-list">
          {systemState.map(([label, value, state]) => (
            <div key={label} data-state={state}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </Panel>
    </section>
  );
}

function MilestoneProgression({ state }: { state: AtlasProjectState }) {
  const homepageMilestones = state.milestones.filter((milestone) => Number(milestone.number) <= 5);
  return (
    <section
      id="milestones"
      className="atlas-console-section console-section console-milestones"
      aria-labelledby="milestones-title"
    >
      <header className="console-section__header">
        <div>
          <p className="console-section__index">03 / MILESTONE EVOLUTION</p>
          <h2 id="milestones-title">Five connected engineering chapters</h2>
        </div>
        <p>Each validated capability creates the starting state for the next.</p>
      </header>
      <ol>
        {homepageMilestones.map((milestone) => {
          const visualState = milestone.validationState === "Validated" ? "validated" : "planned";
          return (
            <li key={milestone.id} data-state={visualState}>
              <span className="console-milestone__number">{milestone.number}</span>
              <div>
                <div className="console-milestone__heading">
                  <h3>{milestone.title}</h3>
                  <span>{milestone.status} / {milestone.validationState}</span>
                </div>
                <p>{milestone.outcome}</p>
                <div className="console-milestone__meta">
                  <span>{milestone.evidence === "—" ? "No evidence recorded" : "Evidence linked"}</span>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

function EvidenceAndRecords({ state }: { state: AtlasProjectState }) {
  const evidenceMilestones = state.milestones.filter((milestone) => milestone.evidence !== "—");
  const validatedRecords = state.milestones.filter((milestone) => milestone.validationState === "Validated");
  return (
    <div className="console-summary-grid">
      <Panel
        id="evidence"
        as="section"
        eyebrow="04 / Evidence"
        title="What proof exists?"
        metadata="CANONICAL EVIDENCE MAP"
        className="atlas-console-section console-summary-panel"
        headingLevel="h2"
      >
        <ul className="console-evidence-list">
          {evidenceMilestones.map((milestone) => (
            <li key={milestone.id}>
              <span>{milestone.id}</span>
              <div>
                <strong>{milestone.title}</strong>
                <small>{milestone.validationState}</small>
              </div>
            </li>
          ))}
        </ul>
        <div className="console-panel-actions">
          <Link href="/projects/atlas/#validation">Review validation →</Link>
          <Link href="/projects/atlas/">Open Atlas dossier →</Link>
        </div>
      </Panel>

      <Panel
        id="engineering-records"
        as="section"
        eyebrow="05 / Engineering Records"
        title="Where can the decisions be inspected?"
        metadata="MILESTONES 01–04"
        className="atlas-console-section console-summary-panel"
        headingLevel="h2"
      >
        <ol className="console-record-list">
          {validatedRecords.map((milestone) => (
            <li key={milestone.id}>
              <span>{milestone.number}</span>
              <div>
                <strong>{milestone.title}</strong>
                <p>{milestone.outcome}</p>
              </div>
            </li>
          ))}
        </ol>
      </Panel>
    </div>
  );
}

function CurrentActivity({ state }: { state: AtlasProjectState }) {
  return (
    <section
      id="current-work"
      className="console-section console-activity"
      aria-labelledby="activity-title"
    >
      <header className="console-section__header">
        <div>
          <p className="console-section__index">06 / {state.currentMilestone.id} CURRENT ACTIVITY</p>
          <h2 id="activity-title">{state.currentDetail.nextObjective}</h2>
        </div>
        <p>{state.currentBoundary}</p>
      </header>
      <div className="console-activity__grid">
        <div>
          <h3>Completed</h3>
          <ul>
            {state.currentDetail.completedFoundation.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
        <div data-state="planned">
          <h3>Active · {state.activeBatch.id}</h3>
          <ul>
            {state.activeTasks.map((item) => <li key={item.id}>{item.id} — {item.title}</li>)}
          </ul>
        </div>
      </div>
    </section>
  );
}

function EngineerRecord() {
  return (
    <section
      id="experience"
      className="atlas-console-section console-section console-engineer"
      aria-labelledby="engineer-title"
    >
      <header className="console-section__header">
        <div>
          <p className="console-section__index">07 / ENGINEER</p>
          <h2 id="engineer-title">Jannsen Agustin</h2>
        </div>
        <p>Professional context behind the Atlas engineering record.</p>
      </header>
      <div className="console-engineer__grid">
        <div className="console-engineer__identity">
          <p>Splunk / Observability Engineer</p>
          <dl>
            <div><dt>Location</dt><dd>Edmonton, Alberta, Canada</dd></div>
            <div><dt>Experience</dt><dd>Approximately 7 years with Splunk</dd></div>
            <div><dt>Enterprise</dt><dd>{enterpriseExperience.company}</dd></div>
            <div><dt>Availability</dt><dd>Remote engineering work in Canada</dd></div>
          </dl>
        </div>
        <div className="console-engineer__experience">
          <h3>Enterprise client experience</h3>
          <p>{enterpriseExperience.summary}</p>
          <ul aria-label="Selected enterprise environments">
            {enterpriseExperience.deliveryExperience.map((experience) => (
              <li key={experience.id}>{experience.organization}</li>
            ))}
          </ul>
        </div>
        <nav aria-label="Engineer links" className="console-engineer__links">
          <a href={linkedInUrl} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
        </nav>
      </div>
    </section>
  );
}

export default function AtlasConsoleHome() {
  const state = getAtlasProjectState();
  return (
    <AtlasConsoleShell projectState={state}>
      <a className="console-skip-link" href="#current-state">Skip to current system state</a>
      <ConsoleHeader state={state} />
      <main className="console-home">
        <CurrentSystemState state={state} />
        <AtlasPipeline projectState={state} />
        <MilestoneProgression state={state} />
        <EvidenceAndRecords state={state} />
        <CurrentActivity state={state} />
        <EngineerRecord />
      </main>
      <footer className="console-footer">
        <span>PROJECT ATLAS / ENGINEERING CONSOLE</span>
        <p>Evidence-backed Engineering Console maintained by Jannsen Agustin.</p>
        <div>
          <span>Built with Next.js · Published on GitHub Pages</span>
        </div>
      </footer>
    </AtlasConsoleShell>
  );
}
