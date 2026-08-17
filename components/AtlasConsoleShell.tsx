"use client";

import Link from "next/link";
import { type ReactNode, useEffect, useRef, useState } from "react";
import {
  atlasPrinciple,
  engineeringShortcuts,
  labState,
  linkedInUrl,
  repositoryUrl,
} from "../data/homeConsole";
import AtlasConsoleNav from "./AtlasConsoleNav";
import ConsoleIcon, { type ConsoleIconName } from "./ConsoleIcon";
import ResumeViewer from "./ResumeViewer";
import ResumeViewerTrigger from "./ResumeViewerTrigger";

const focusableSelector =
  'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])';

const labIcons: Record<string, ConsoleIconName> = {
  "windows-host": "monitor",
  "universal-forwarder": "transfer",
  "atlas-indexer": "database",
  "atlas-search-head": "search",
  "deployment-server": "upload",
  "future-expansion": "boxes",
};

const shortcutIcons: ConsoleIconName[] = ["monitor", "network", "evidence", "server", "flag", "file"];

function LabState({ idPrefix }: { idPrefix: string }) {
  return (
    <section className="atlas-sidebar__section" aria-labelledby={`${idPrefix}-lab-title`}>
      <h2 id={`${idPrefix}-lab-title`}>Current Lab</h2>
      <ul className="atlas-sidebar__lab">
        {labState.map((item) => {
          const state = item.state === "Validated"
            ? "validated"
            : item.state === "Future"
              ? "future"
              : "planned";

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
      <ResumeViewerTrigger className="console-icon-link" onActivate={onNavigate}><ConsoleIcon name="resume" /><span className="console-label">View Resume</span></ResumeViewerTrigger>
      <a className="console-icon-link" href={repositoryUrl} target="_blank" rel="noopener noreferrer" onClick={onNavigate}><ConsoleIcon name="repository" /><span className="console-label">Repository</span></a>
    </div>
  );
}

function SidebarContent({
  idPrefix,
  onNavigate,
}: {
  idPrefix: string;
  onNavigate?: () => void;
}) {
  return (
    <>
      <div className="atlas-sidebar__identity">
        <p>Project Atlas</p>
        <span>Engineering Console</span>
        <small>Edmonton, Canada</small>
      </div>
      <section className="atlas-sidebar__section" aria-labelledby={`${idPrefix}-navigation-title`}>
        <h2 id={`${idPrefix}-navigation-title`}>Navigation</h2>
        <AtlasConsoleNav variant="sidebar" onNavigate={onNavigate} />
        <SidebarActions onNavigate={onNavigate} />
      </section>
      <LabState idPrefix={idPrefix} />
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

export default function AtlasConsoleShell({ children }: { children: ReactNode }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!drawerOpen) return;

    const background = Array.from(
      document.querySelectorAll<HTMLElement>("[data-drawer-background]"),
    );
    const drawerTrigger = triggerRef.current;
    const previousOverflow = document.body.style.overflow;

    background.forEach((element) => element.setAttribute("inert", ""));
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        setDrawerOpen(false);
        return;
      }

      if (event.key !== "Tab" || !drawerRef.current) return;
      const focusable = Array.from(
        drawerRef.current.querySelectorAll<HTMLElement>(focusableSelector),
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (!first || !last) {
        event.preventDefault();
      } else if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      background.forEach((element) => element.removeAttribute("inert"));
      drawerTrigger?.focus();
    };
  }, [drawerOpen]);

  return (
    <>
      <div id="atlas-console-shell" className="console-shell">
        <aside
          className="atlas-sidebar"
          aria-label="Project Atlas console context"
          data-drawer-background
        >
          <SidebarContent idPrefix="desktop-sidebar" />
        </aside>

        <div className="console-shell__content" data-drawer-background>
          <div className="console-mobile-bar">
            <div><span>Project Atlas</span><small>Engineering Console</small></div>
            <button
              ref={triggerRef}
              type="button"
              aria-haspopup="dialog"
              aria-expanded={drawerOpen}
              aria-controls="atlas-mobile-drawer"
              onClick={() => setDrawerOpen(true)}
            >
              Menu
            </button>
          </div>
          {children}
        </div>

        {drawerOpen && (
          <div className="atlas-drawer__backdrop" onMouseDown={() => setDrawerOpen(false)}>
            <div
              ref={drawerRef}
              id="atlas-mobile-drawer"
              className="atlas-drawer"
              role="dialog"
              aria-modal="true"
              aria-labelledby="atlas-drawer-title"
              onMouseDown={(event) => event.stopPropagation()}
            >
              <header>
                <h2 id="atlas-drawer-title">Atlas Console Navigation</h2>
                <button ref={closeRef} type="button" onClick={() => setDrawerOpen(false)}>Close</button>
              </header>
              <SidebarContent idPrefix="mobile-drawer" onNavigate={() => setDrawerOpen(false)} />
              <div className="atlas-drawer__external">
                <a href={linkedInUrl} target="_blank" rel="noopener noreferrer">LinkedIn</a>
                <a href={repositoryUrl} target="_blank" rel="noopener noreferrer">GitHub</a>
              </div>
            </div>
          </div>
        )}
      </div>
      <ResumeViewer />
    </>
  );
}
