import Link from "next/link";
import AtlasSystemExplorer from "./AtlasSystemExplorer";
import { atlasHomepageRecord, atlasMilestones } from "../data/atlasProject";
import { enterpriseExperience } from "../data/experience";
import { projects } from "../data/projects";

const recordEntries = [["CHECKPOINT", atlasHomepageRecord.checkpoint], ["STATUS", atlasHomepageRecord.status], ["INGESTION", atlasHomepageRecord.ingestion], ["SEARCH", atlasHomepageRecord.search], ["SPLUNK", atlasHomepageRecord.splunkVersion], ["EVIDENCE", `${atlasHomepageRecord.evidenceCount} public artifacts`], ["UPDATED", atlasHomepageRecord.updated]];

export default function ResumeOpsHome() {
  const atlas = projects.find((project) => project.id === "atlas")!;
  const completedMilestones = atlasMilestones.filter((milestone) => milestone.status === "Validated");
  return <>
    <section className="atlas-opening" aria-labelledby="atlas-title">
      <div className="atlas-opening__intro"><p className="record-label">RESUMEOPS / ENGINEERING RECORD</p><h1 id="atlas-title"><span>PROJECT</span> ATLAS</h1><p className="atlas-opening__lede">A working distributed Splunk environment ingesting real Windows telemetry.</p><dl className="record-metadata">{recordEntries.map(([term, value]) => <div key={term}><dt>{term}</dt><dd className={["STATUS", "INGESTION", "SEARCH"].includes(term) ? "state-value" : ""}>{value}</dd></div>)}</dl><Link className="record-action" href="/projects/atlas/">OPEN PROJECT RECORD <span aria-hidden="true">→</span></Link></div>
      <AtlasSystemExplorer />
    </section>
    <section className="milestone-record" aria-labelledby="milestone-title"><div className="section-line"><p className="record-label">BUILD PROGRESS</p><h2 id="milestone-title" className="sr-only">Completed Atlas milestones</h2><span>04 / 04 VALIDATED</span></div><ol>{completedMilestones.map((milestone) => <li key={milestone.id}><span className="milestone-id">{milestone.id}</span><div><strong>{milestone.title}</strong><span className="state-value">COMPLETE / VALIDATED</span></div></li>)}</ol></section>
    <div className="home-record-grid">
      <section id="about" className="engineer-record" aria-labelledby="engineer-title"><p className="record-label">THE ENGINEER</p><h2 id="engineer-title">Jannsen Agustin</h2><p className="engineer-role">Splunk / Observability Engineer</p><p>{enterpriseExperience.summary}</p><dl className="engineer-facts"><div><dt>LOCATION</dt><dd>Edmonton, Alberta, Canada</dd></div><div><dt>FOCUS</dt><dd>Splunk / Observability</dd></div><div><dt>EXPERIENCE</dt><dd>Approximately 7 years with Splunk</dd></div></dl><div className="record-links"><a href="#experience">VIEW EXPERIENCE →</a><Link href="/resume/Jannsen-Agustin-Resume.pdf" prefetch={false}>DOWNLOAD RESUME ↓</Link><a href="#contact">CONTACT →</a></div></section>
      <section id="projects" className="selected-record" aria-labelledby="selected-work-title"><p className="record-label">SELECTED WORK / 001</p><h2 id="selected-work-title">Project Atlas</h2><p>{atlas.description}</p><dl><div><dt>MILESTONES</dt><dd>04 validated</dd></div><div><dt>EVIDENCE</dt><dd>{atlasHomepageRecord.evidenceCount} artifacts</dd></div><div><dt>STATE</dt><dd className="state-value">ACTIVE RECORD</dd></div></dl><Link className="record-action" href="/projects/atlas/">EXPLORE SYSTEM <span aria-hidden="true">→</span></Link></section>
    </div>
  </>;
}
