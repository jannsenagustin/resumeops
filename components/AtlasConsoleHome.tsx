import Link from "next/link";
import { atlasMilestones } from "../data/atlasProject";
import { enterpriseExperience } from "../data/experience";
import {
  consoleStatus,
  currentActivity,
  evidenceGroups,
  linkedInUrl,
  systemState,
} from "../data/homeConsole";
import AtlasPipeline from "./AtlasPipeline";
import AtlasConsoleNav from "./AtlasConsoleNav";
import AtlasConsoleShell from "./AtlasConsoleShell";
import Panel from "./Panel";

const homepageMilestones = atlasMilestones.filter((milestone) =>
  ["01", "02", "03", "04", "05"].includes(milestone.id),
);

const validatedRecords = homepageMilestones.filter(
  (milestone) => milestone.status === "Validated",
);

function ConsoleHeader() {
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

function CurrentSystemState() {
  return (
    <section
      id="current-state"
      className="console-current"
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
        metadata="M05 / ACTIVE WORK"
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

function MilestoneProgression() {
  return (
    <section
      id="milestones"
      className="console-section console-milestones"
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
          const state = milestone.status === "Validated" ? "validated" : "planned";
          return (
            <li key={milestone.id} data-state={state}>
              <span className="console-milestone__number">{milestone.id}</span>
              <div>
                <div className="console-milestone__heading">
                  <h3>{milestone.title}</h3>
                  <span>{milestone.status === "Validated" ? "Validated" : "In Progress / Not Validated"}</span>
                </div>
                <p>{milestone.summary}</p>
                <div className="console-milestone__meta">
                  <span>{milestone.evidenceLabel}</span>
                  {milestone.href && milestone.external ? (
                    <a href={milestone.href} target="_blank" rel="noopener noreferrer">
                      {milestone.linkLabel} <span aria-hidden="true">↗</span>
                    </a>
                  ) : milestone.href ? (
                    <Link href={milestone.href}>
                      {milestone.linkLabel} <span aria-hidden="true">→</span>
                    </Link>
                  ) : null}
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

function EvidenceAndRecords() {
  return (
    <div className="console-summary-grid">
      <Panel
        as="section"
        eyebrow="04 / Evidence"
        title="What proof exists?"
        metadata="16 REVIEWED RECORDS"
        className="console-summary-panel"
        headingLevel="h2"
      >
        <div id="evidence" className="console-anchor" aria-hidden="true" />
        <ul className="console-evidence-list">
          {evidenceGroups.map(([id, title, count]) => (
            <li key={id}>
              <span>M{id}</span>
              <div>
                <strong>{title}</strong>
                <small>{count === 0 ? "No evidence yet" : `${count} records`}</small>
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
        as="section"
        eyebrow="05 / Engineering Records"
        title="Where can the decisions be inspected?"
        metadata="MILESTONES 01–04"
        className="console-summary-panel"
        headingLevel="h2"
      >
        <div id="engineering-records" className="console-anchor" aria-hidden="true" />
        <ol className="console-record-list">
          {validatedRecords.map((milestone) => (
            <li key={milestone.id}>
              <span>{milestone.id}</span>
              <div>
                <strong>{milestone.title}</strong>
                <p>{milestone.summary}</p>
              </div>
              {milestone.href && (
                <a href={milestone.href} target="_blank" rel="noopener noreferrer">
                  Open record <span aria-hidden="true">↗</span>
                </a>
              )}
            </li>
          ))}
        </ol>
      </Panel>
    </div>
  );
}

function CurrentActivity() {
  return (
    <section
      id="current-work"
      className="console-section console-activity"
      aria-labelledby="activity-title"
    >
      <header className="console-section__header">
        <div>
          <p className="console-section__index">06 / M05 CURRENT ACTIVITY</p>
          <h2 id="activity-title">Infrastructure provisioning is underway</h2>
        </div>
        <p>Rocky Linux and Splunk Deployment Server are not yet installed or validated.</p>
      </header>
      <div className="console-activity__grid">
        <div>
          <h3>Completed</h3>
          <ul>
            {currentActivity.completed.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
        <div data-state="planned">
          <h3>Next</h3>
          <ul>
            {currentActivity.next.map((item) => <li key={item}>{item}</li>)}
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
      className="console-section console-engineer"
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
  return (
    <AtlasConsoleShell>
      <a className="console-skip-link" href="#current-state">Skip to current system state</a>
      <ConsoleHeader />
      <main className="console-home">
        <CurrentSystemState />
        <AtlasPipeline />
        <MilestoneProgression />
        <EvidenceAndRecords />
        <CurrentActivity />
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
