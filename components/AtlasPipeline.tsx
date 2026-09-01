import Link from "next/link";
import { ingestionPath, managementPath } from "../data/homeConsole";
import { getAtlasStatusTone } from "../lib/atlasStatus";
import TelemetryFlow from "./TelemetryFlow";

type PipelineNodeProps = {
  name: string;
  role: string;
  state: string;
  href: string;
};

function PipelineNode({ name, role, state, href }: PipelineNodeProps) {
  return (
    <li className="console-pipeline__node" data-state={getAtlasStatusTone(state)}>
      <p><Link href={href}>{name}</Link></p>
      <span>{role}</span>
      <strong>{state}</strong>
    </li>
  );
}

export default function AtlasPipeline() {
  const validatedTone = getAtlasStatusTone("Validated");

  return (
    <section
      id="architecture"
      className="atlas-console-section console-section console-pipeline"
      aria-labelledby="pipeline-title"
    >
      <header className="console-section__header">
        <div>
          <p className="console-section__index">02 / SYSTEM PATHS</p>
          <h2 id="pipeline-title">How telemetry moves through Atlas</h2>
        </div>
        <p>
          Validated ingestion and management paths remain separate system
          relationships.
        </p>
      </header>

      <div className="console-pipeline__legend" aria-label="System state legend">
        <span data-state={validatedTone}>Validated</span>
      </div>

      <div className="console-pipeline__path" data-state={validatedTone}>
        <div className="console-pipeline__label">
          <span>INGESTION PATH</span>
          <strong>VALIDATED</strong>
        </div>
        <ol aria-label="Validated Atlas ingestion path">
          {ingestionPath.map((node) => (
            <PipelineNode key={node.id} {...node} />
          ))}
        </ol>
        <TelemetryFlow className="console-pipeline__flow" />
      </div>

      <div className="console-pipeline__path console-pipeline__path--management" data-state={validatedTone}>
        <div className="console-pipeline__label">
          <span>MANAGEMENT PATH</span>
          <strong>VALIDATED</strong>
        </div>
        <ol aria-label="Validated Atlas management path">
          {managementPath.map((node) => (
            <PipelineNode key={node.id} {...node} />
          ))}
        </ol>
      </div>

      <a className="console-inline-action" href="/projects/atlas/#system">
        Inspect full architecture <span aria-hidden="true">→</span>
      </a>
    </section>
  );
}
