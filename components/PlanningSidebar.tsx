import AtlasSidebar from "./AtlasSidebar";
import type { AtlasProjectState } from "../lib/atlasMilestoneTypes";

type PlanningSidebarProps = {
  projectState: AtlasProjectState;
  latestCommit: { short: string; url: string };
};

export default function PlanningSidebar({ projectState, latestCommit }: PlanningSidebarProps) {
  return (
    <AtlasSidebar active="planning" ariaLabel="Planning Console navigation and project status">
      <section className="atlas-sidebar__section planning-sidebar__status" aria-labelledby="planning-project-status">
        <h2 id="planning-project-status">Current Work</h2>
        <dl>
          <div><dt>Milestone</dt><dd>{projectState.currentMilestone.id}</dd></div>
          <div><dt>Batch</dt><dd data-state={projectState.activeBatch.statusTone}>{projectState.activeBatch.id}</dd></div>
          <div><dt>Current ATL</dt><dd data-state={projectState.activeBatch.statusTone}>{projectState.activeTasks.map((task) => task.id).join(", ") || "None"}</dd></div>
          <div><dt>Validation</dt><dd data-state={projectState.currentMilestone.statusTone}>{projectState.currentMilestone.validationState}</dd></div>
          <div><dt>Latest Commit</dt><dd><a href={latestCommit.url} target="_blank" rel="noopener noreferrer">{latestCommit.short} ↗</a></dd></div>
        </dl>
      </section>
      <section className="atlas-sidebar__section atlas-sidebar__shortcuts planning-sidebar__shortcuts" aria-labelledby="planning-shortcuts">
        <h2 id="planning-shortcuts">Engineering Shortcuts</h2>
        <ul>
          <li><a href="https://github.com/jannsenagustin/resumeops/tree/main/docs/execution-reports" target="_blank" rel="noopener noreferrer">Execution Reports ↗</a></li>
          <li><a href="https://github.com/jannsenagustin/resumeops/blob/main/docs/architecture.md" target="_blank" rel="noopener noreferrer">Architecture ↗</a></li>
          <li><a href="https://github.com/jannsenagustin/resumeops/tree/main/docs/evidence" target="_blank" rel="noopener noreferrer">Evidence ↗</a></li>
          <li><a href="https://github.com/jannsenagustin/resumeops/blob/main/docs/milestones.md" target="_blank" rel="noopener noreferrer">Milestones ↗</a></li>
          <li><a href="https://github.com/jannsenagustin/resumeops/blob/main/docs/engineering-proposals/EP-003-atlas-mcp-platform.md" target="_blank" rel="noopener noreferrer">MCP Platform ↗</a></li>
        </ul>
      </section>
    </AtlasSidebar>
  );
}
