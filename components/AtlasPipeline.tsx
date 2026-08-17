import Link from "next/link";
import { ingestionPath, managementPath } from "../data/homeConsole";
import TelemetryFlow from "./TelemetryFlow";

type PipelineNodeProps = {
  name: string;
  role: string;
  state: string;
  href: string;
  variant: "validated" | "planned" | "future";
};

function PipelineNode({ name, role, state, href, variant }: PipelineNodeProps) {
  return (
    <li className={`console-pipeline__node console-pipeline__node--${variant}`}>
      <p><Link href={href}>{name}</Link></p>
      <span>{role}</span>
      <strong>{state}</strong>
    </li>
  );
}

export default function AtlasPipeline() {
  return (
    <section
      id="architecture"
      className="console-section console-pipeline"
      aria-labelledby="pipeline-title"
    >
      <header className="console-section__header">
        <div>
          <p className="console-section__index">02 / SYSTEM PATHS</p>
          <h2 id="pipeline-title">How telemetry moves through Atlas</h2>
        </div>
        <p>
          The validated ingestion path remains separate from Milestone 05
          management work.
        </p>
      </header>

      <div className="console-pipeline__legend" aria-label="System state legend">
        <span data-state="validated">Validated</span>
        <span data-state="planned">In Progress / Not Validated</span>
        <span data-state="future">Future Relationship</span>
      </div>

      <div className="console-pipeline__path">
        <div className="console-pipeline__label">
          <span>INGESTION PATH</span>
          <strong>VALIDATED</strong>
        </div>
        <ol aria-label="Validated Atlas ingestion path">
          {ingestionPath.map((node) => (
            <PipelineNode key={node.id} {...node} variant="validated" />
          ))}
        </ol>
        <TelemetryFlow className="console-pipeline__flow" />
      </div>

      <div className="console-pipeline__path console-pipeline__path--management">
        <div className="console-pipeline__label">
          <span>MANAGEMENT PATH</span>
          <strong>IN PROGRESS / NOT VALIDATED</strong>
        </div>
        <ol aria-label="Planned Atlas management path">
          <PipelineNode {...managementPath[0]} variant="planned" />
          <PipelineNode {...managementPath[1]} variant="future" />
        </ol>
      </div>

      <a className="console-inline-action" href="/projects/atlas/#system">
        Inspect full architecture <span aria-hidden="true">→</span>
      </a>
    </section>
  );
}
