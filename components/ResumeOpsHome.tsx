import Link from "next/link";
import AtlasSystemExplorer from "./AtlasSystemExplorer";
import { atlasHomepageRecord, atlasMilestones } from "../data/atlasProject";

const atlasSummary = [
  ["SYSTEM", "Distributed Splunk"],
  ["TELEMETRY", "Windows Event Logs"],
  ["VALIDATION", `${atlasHomepageRecord.evidenceCount} public artifacts`],
];

export default function ResumeOpsHome() {
  const publicMilestones = atlasMilestones.filter(
    (milestone) => milestone.status !== "Roadmap",
  );

  return (
    <>
      <section id="about" className="home-introduction" aria-labelledby="home-title">
        <div>
          <p className="record-label">JANNSEN AGUSTIN / EDMONTON, CANADA</p>
          <h1 id="home-title">Splunk / Observability Engineer</h1>
          <p className="home-introduction__lede">
            I build and support enterprise Splunk and observability systems.
            Project Atlas is the public engineering record: a working
            distributed Splunk environment ingesting and searching real Windows
            telemetry.
          </p>
          <div className="record-links">
            <Link className="record-action" href="/projects/atlas/">
              EXPLORE ATLAS <span aria-hidden="true">→</span>
            </Link>
            <Link href="/resume/Jannsen-Agustin-Resume.pdf" prefetch={false}>
              DOWNLOAD RESUME ↓
            </Link>
            <a href="#experience">VIEW EXPERIENCE →</a>
          </div>
        </div>
        <dl className="home-introduction__facts">
          <div><dt>EXPERIENCE</dt><dd>Approximately 7 years with Splunk</dd></div>
          <div><dt>PROOF</dt><dd>Distributed search and Windows event ingestion</dd></div>
          <div><dt>CURRENT FOCUS</dt><dd>Managed forwarding and configuration intelligence</dd></div>
          <div><dt>AVAILABILITY</dt><dd>Remote engineering work in Canada</dd></div>
        </dl>
      </section>

      <section id="projects" className="atlas-opening" aria-labelledby="atlas-title">
        <div className="atlas-opening__intro">
          <p className="record-label">PROJECT ATLAS / SYSTEM PREVIEW</p>
          <h2 id="atlas-title">Architecture before documentation</h2>
          <p className="atlas-opening__lede">
            Follow the ingestion and search paths first. The project record then
            exposes the decisions, validation, field notes, milestone chronology, and
            repository behind the system.
          </p>
          <dl className="record-metadata">
            {atlasSummary.map(([term, value]) => (
              <div key={term}><dt>{term}</dt><dd>{value}</dd></div>
            ))}
          </dl>
          <Link className="record-action" href="/projects/atlas/">
            OPEN PROJECT RECORD <span aria-hidden="true">→</span>
          </Link>
        </div>
        <AtlasSystemExplorer />
      </section>

      <section className="milestone-record" aria-labelledby="milestone-title">
        <div className="section-line">
          <p className="record-label">MILESTONE PROGRESSION</p>
          <h2 id="milestone-title" className="sr-only">Atlas milestone chronology</h2>
          <span>04 VALIDATED / 05 PLANNED</span>
        </div>
        <ol>
          {publicMilestones.map((milestone) => (
            <li key={milestone.id}>
              <span className="milestone-id">{milestone.id}</span>
              <div>
                <strong>{milestone.title}</strong>
                <p>{milestone.summary}</p>
                <span className={milestone.status === "Validated" ? "state-value" : undefined}>
                  {milestone.status === "Validated" ? "COMPLETE / VALIDATED" : "PLANNED"}
                </span>
                {milestone.href && milestone.external ? (
                  <a href={milestone.href} target="_blank" rel="noopener noreferrer">
                    {milestone.linkLabel} →
                  </a>
                ) : milestone.href ? (
                  <Link href={milestone.href}>
                    {milestone.linkLabel} →
                  </Link>
                ) : null}
              </div>
            </li>
          ))}
        </ol>
      </section>

    </>
  );
}
