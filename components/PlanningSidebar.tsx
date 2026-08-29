import AtlasNavigation from "./AtlasNavigation";
import type { AtlasProjectState } from "../lib/atlasMilestoneTypes";

type PlanningSidebarProps = {
  projectState: AtlasProjectState;
  latestCommit: { short: string; url: string };
};

const navigationGroups = [
  { label: "Plan", links: [["Current Milestone", "#current-milestone"], ["Active Batch", "#active-batch"], ["Backlog", "#backlog"], ["Idea Inbox", "#idea-inbox"], ["Proposals", "#planning-proposals"]] },
  { label: "Engineering Record", links: [["Decisions", "#planning-decisions"], ["Lessons", "#planning-lessons"], ["Canonical Sources", "#planning-sources"]] },
] as const;

export default function PlanningSidebar({ projectState, latestCommit }: PlanningSidebarProps) {
  const currentTask = projectState.activeTasks[0];
  return (
    <aside className="planning-sidebar" aria-label="Planning Console navigation and project status">
      <AtlasNavigation active="planning" />
      <nav aria-label="Planning sections">
        {navigationGroups.map((group) => (
          <section key={group.label}><h2>{group.label}</h2><ul>{group.links.map(([label, href]) => <li key={href}><a href={href}>{label}</a></li>)}</ul></section>
        ))}
      </nav>
      <section className="planning-sidebar__status" aria-labelledby="planning-project-status">
        <h2 id="planning-project-status">Current Work</h2>
        <dl>
          <div><dt>Milestone</dt><dd>{projectState.currentMilestone.id}</dd></div>
          <div><dt>Batch</dt><dd>{projectState.activeBatch.id}</dd></div>
          <div><dt>Current ATL</dt><dd>{currentTask?.id ?? "None"}</dd></div>
          <div><dt>Validation</dt><dd>{projectState.currentMilestone.validationState}</dd></div>
          <div><dt>Latest Commit</dt><dd><a href={latestCommit.url} target="_blank" rel="noopener noreferrer">{latestCommit.short} ↗</a></dd></div>
        </dl>
      </section>
      <section className="planning-sidebar__current-links" aria-labelledby="planning-current-links"><h2 id="planning-current-links">Quick Access</h2><ul><li><a href="#current-milestone">Current milestone: {projectState.currentMilestone.id}</a></li>{projectState.activeBatch.id === "Unassigned" ? <li><span>No Active Batch or current ATL task.</span></li> : <><li><a href="#active-batch">Active Batch: {projectState.activeBatch.id}</a></li>{currentTask && <li><a href={`#${currentTask.id.toLowerCase()}`}>Current task: {currentTask.id}</a></li>}</>}</ul></section>
      <section className="planning-sidebar__shortcuts" aria-labelledby="planning-shortcuts">
        <h2 id="planning-shortcuts">Engineering Shortcuts</h2>
        <ul>
          <li><a href="https://github.com/jannsenagustin/resumeops/tree/main/docs/execution-reports" target="_blank" rel="noopener noreferrer">Execution Reports ↗</a></li>
          <li><a href="https://github.com/jannsenagustin/resumeops/blob/main/docs/architecture.md" target="_blank" rel="noopener noreferrer">Architecture ↗</a></li>
          <li><a href="https://github.com/jannsenagustin/resumeops/tree/main/docs/evidence" target="_blank" rel="noopener noreferrer">Evidence ↗</a></li>
          <li><a href="https://github.com/jannsenagustin/resumeops/blob/main/docs/milestones.md" target="_blank" rel="noopener noreferrer">Milestones ↗</a></li>
          <li><a href="https://github.com/jannsenagustin/resumeops/blob/main/docs/engineering-proposals/EP-003-atlas-mcp-platform.md" target="_blank" rel="noopener noreferrer">MCP Platform ↗</a></li>
        </ul>
      </section>
    </aside>
  );
}
