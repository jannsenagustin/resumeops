"use client";

import Link from "next/link";
import { type ReactNode } from "react";
import {
  atlasPrinciple,
  engineeringShortcuts,
  labState,
  repositoryUrl,
} from "../data/homeConsole";
import AtlasConsoleNav from "./AtlasConsoleNav";
import AtlasSidebar from "./AtlasSidebar";
import ConsoleIcon, { type ConsoleIconName } from "./ConsoleIcon";
import ResumeViewer from "./ResumeViewer";
import ResumeViewerTrigger from "./ResumeViewerTrigger";
import type { AtlasProjectState } from "../lib/atlasMilestoneTypes";
import { getAtlasStatusTone } from "../lib/atlasStatus";

const labIcons: Record<string, ConsoleIconName> = {
  "windows-host": "monitor",
  "universal-forwarder": "transfer",
  "atlas-indexer": "database",
  "atlas-search-head": "search",
  "deployment-server": "upload",
  "future-expansion": "boxes",
};

const shortcutIcons: ConsoleIconName[] = ["monitor", "network", "evidence", "server", "flag", "file"];

function LabState({ idPrefix, projectState }: { idPrefix: string; projectState: AtlasProjectState }) {
  const currentLab = [
    ...labState.slice(0, -1),
    { id: "deployment-server", name: projectState.currentMilestone.title, state: `${projectState.currentMilestone.status} / ${projectState.currentMilestone.validationState}` },
    labState[labState.length - 1],
  ];
  return (
    <section className="atlas-sidebar__section" aria-labelledby={`${idPrefix}-lab-title`}>
      <h2 id={`${idPrefix}-lab-title`}>Current Lab</h2>
      <ul className="atlas-sidebar__lab">
        {currentLab.map((item) => {
          const state = item.id === "deployment-server"
            ? projectState.currentMilestone.statusTone
            : getAtlasStatusTone(item.state);

          return (
            <li key={item.id} data-state={state} className="console-lab-row">
              <ConsoleIcon className="console-lab-icon" name={labIcons[item.id]} />
              <span className="console-lab-content">
                <span className="console-lab-label">{item.name}</span>
                <small className="console-lab-status">{item.state}</small>
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function ShortcutList({
  idPrefix,
  onNavigate,
}: {
  idPrefix: string;
  onNavigate?: () => void;
}) {
  return (
    <section className="atlas-sidebar__section" aria-labelledby={`${idPrefix}-shortcuts-title`}>
      <h2 id={`${idPrefix}-shortcuts-title`}>Engineering Shortcuts</h2>
      <ul className="atlas-sidebar__shortcuts">
        {engineeringShortcuts.map(([label, href, type], index) => (
          <li key={label}>
            {type === "external" ? (
              <a className="console-icon-link" href={href} target="_blank" rel="noopener noreferrer" onClick={onNavigate}>
                <ConsoleIcon name={shortcutIcons[index]} />
                <span className="console-label">{label}</span>
              </a>
            ) : (
              <Link className="console-icon-link" href={href} onClick={onNavigate}>
                <ConsoleIcon name={shortcutIcons[index]} />
                <span className="console-label">{label}</span>
              </Link>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}

function SidebarActions({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="atlas-sidebar__actions">
      <Link className="console-icon-link" href="/projects/atlas/#system" onClick={onNavigate}><ConsoleIcon name="server" /><span className="console-label">Systems</span></Link>
      <a className="console-icon-link" href={repositoryUrl} target="_blank" rel="noopener noreferrer" onClick={onNavigate}><ConsoleIcon name="repository" /><span className="console-label">Repository</span></a>
    </div>
  );
}

function FeaturedArtifact({
  idPrefix,
  onNavigate,
}: {
  idPrefix: string;
  onNavigate?: () => void;
}) {
  const descriptionId = `${idPrefix}-resume-description`;

  return (
    <section
      className="atlas-sidebar__featured"
      aria-labelledby={`${idPrefix}-featured-title`}
    >
      <h2 id={`${idPrefix}-featured-title`}>Featured Artifact</h2>
      <div className="atlas-sidebar__featured-record">
        <div className="atlas-sidebar__featured-heading">
          <ConsoleIcon name="resume" />
          <div>
            <h3>Professional Resume</h3>
            <span>Latest Version</span>
          </div>
        </div>
        <p>Updated Aug 2026</p>
        <div id={descriptionId} className="atlas-sidebar__featured-details">
          <span>Latest professional resume</span>
          <span>PDF Preview Available</span>
        </div>
        <ResumeViewerTrigger
          className="atlas-sidebar__featured-action"
          aria-describedby={descriptionId}
          onActivate={onNavigate}
        >
          View Professional Resume
        </ResumeViewerTrigger>
      </div>
    </section>
  );
}

function SidebarContent({
  idPrefix,
  onNavigate,
  projectState,
}: {
  idPrefix: string;
  onNavigate?: () => void;
  projectState: AtlasProjectState;
}) {
  return (
    <>
      <section className="atlas-sidebar__section" aria-labelledby={`${idPrefix}-navigation-title`}>
        <h2 id={`${idPrefix}-navigation-title`}>Console Sections</h2>
        <AtlasConsoleNav variant="sidebar" onNavigate={onNavigate} />
        <SidebarActions onNavigate={onNavigate} />
      </section>
      <FeaturedArtifact idPrefix={idPrefix} onNavigate={onNavigate} />
      <LabState idPrefix={idPrefix} projectState={projectState} />
      <ShortcutList idPrefix={idPrefix} onNavigate={onNavigate} />
      <aside className="atlas-sidebar__principle" aria-label="Atlas principle">
        <span className="console-icon-link"><ConsoleIcon name="lightbulb" /><span className="console-label">Atlas Principle</span></span>
        <p>{atlasPrinciple.text}</p>
        <a href={atlasPrinciple.href} target="_blank" rel="noopener noreferrer">
          Read canonical principles
        </a>
      </aside>
    </>
  );
}

export default function AtlasConsoleShell({ children, projectState }: { children: ReactNode; projectState: AtlasProjectState }) {
  return (
    <>
      <div id="atlas-console-shell" className="atlas-app-shell console-shell">
        <AtlasSidebar active="console" ariaLabel="Project Atlas console context">
          <SidebarContent idPrefix="desktop-sidebar" projectState={projectState} />
        </AtlasSidebar>

        <div className="console-shell__content">
          {children}
        </div>
      </div>
      <ResumeViewer />
    </>
  );
}
