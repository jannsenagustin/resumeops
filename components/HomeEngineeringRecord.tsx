import Link from "next/link";
import { enterpriseExperience } from "../data/experience";

const capabilityGroups = [
  { id:"observability", title:"OBSERVABILITY", items:["Distributed Search","Windows Event Ingestion","Dashboard Development","SPL","Alerting","Reporting"], note:"Distributed Search and Windows Event Ingestion are demonstrated publicly in Atlas.", href:"/projects/atlas/#validation" },
  { id:"platform", title:"PLATFORM", items:["Splunk Administration","Data Onboarding","Index Management","Troubleshooting","Platform Operations","Configuration Deployment"], note:"Enterprise delivery and Atlas build documentation provide supporting context.", href:"/projects/atlas/#build-record" },
  { id:"data", title:"DATA", items:["Parsing Validation","Field Extractions","Sourcetypes","Search Validation","Lookups","Data Models"], note:"Capabilities are grounded in production experience; no separate public exhibit is claimed.", href:null },
] as const;

const evolution = [
  ["01","Enterprise Foundation","Application support, data workflows, and operational delivery"], ["02","Production Delivery","Global enterprise environments through Accenture"],
  ["03","Dashboard Engineering","Operational reporting, analytics, and migration views"], ["04","Splunk Platform","Administration, data onboarding, configuration, and support"],
  ["05","Observability","Searchable operational data, monitoring, and validation"], ["06","Canada","Continued technical development after relocation"],
  ["07","ResumeOps","Engineering work published as structured records"], ["08","Project Atlas","Evidence-backed distributed Splunk proving ground"],
  ["09","Current Research","Managed forwarding, configuration intelligence, and telemetry systems"],
] as const;

const research = [
  ["Deployment Server","PLANNING","Defined as the next Atlas capability; not implemented."],
  ["Splunk Config Intelligence","DESIGN","Roadmap concept for inspecting and explaining configuration changes."],
  ["OpenTelemetry","RESEARCH","Vendor-neutral telemetry collection remains a future learning project."],
  ["Kubernetes / Splunk Operator","EXPLORATION","Explicitly exploratory; no implementation claim."],
] as const;

export default function HomeEngineeringRecord() {
  return <div className="home-engineering-record">
    <section id="experience" className="record-section production-record" aria-labelledby="production-title"><header><p className="record-label">01 / PRODUCTION RECORD</p><h2 id="production-title">Enterprise Delivery</h2><p>Where has this engineering been applied?</p></header><div className="production-entry"><div className="production-employer"><span>ORGANIZATION</span><h3>{enterpriseExperience.company}</h3><p>{enterpriseExperience.period}</p><p>{enterpriseExperience.role}</p></div><div><h3>Production environments supported</h3><ol>{enterpriseExperience.deliveryExperience.map((delivery,index)=><li key={delivery.id}><span>{String(index+1).padStart(2,"0")}</span><strong>{delivery.organization}</strong><em>{delivery.region}</em><p>{delivery.focus}</p></li>)}</ol></div><div className="production-domains"><h3>Engineering domains</h3><ul>{enterpriseExperience.engineeringDomains.map(domain=><li key={domain.id}><strong>{domain.title}</strong><span>{domain.description}</span></li>)}</ul></div></div></section>
    <section id="skills" className="record-section capability-record" aria-labelledby="capabilities-title"><header><p className="record-label">02 / ENGINEERING CAPABILITIES</p><h2 id="capabilities-title">Demonstrated disciplines</h2><p>What can be demonstrated?</p></header><div className="capability-table">{capabilityGroups.map(group=><article key={group.id}><h3>{group.title}</h3><ul>{group.items.map(item=><li key={item}>{item}</li>)}</ul><p>{group.note}</p>{group.href&&<Link href={group.href}>VIEW SUPPORTING RECORD →</Link>}</article>)}</div></section>
    <section id="journey" className="record-section evolution-record" aria-labelledby="evolution-title"><header><p className="record-label">03 / TECHNICAL EVOLUTION</p><h2 id="evolution-title">Engineering progression</h2><p>How has the engineering grown?</p></header><ol>{evolution.map(([id,title,detail])=><li key={id}><span>{id}</span><div><h3>{title}</h3><p>{detail}</p></div></li>)}</ol></section>
    <section id="research" className="record-section research-record" aria-labelledby="research-title"><header><p className="record-label">04 / CURRENT RESEARCH</p><h2 id="research-title">Active learning record</h2><p>What is currently being learned?</p></header><dl>{research.map(([name,state,detail])=><div key={name}><dt><strong>{name}</strong><span>{detail}</span></dt><dd>{state}</dd></div>)}</dl><Link href="/projects/">VIEW PROJECT ROADMAP →</Link></section>
    <section id="contact" className="record-section availability-record" aria-labelledby="availability-title"><header><p className="record-label">05 / AVAILABILITY</p><h2 id="availability-title">Available for engineering work</h2><p>How can this engineer be reached?</p></header><div><dl><div><dt>DISCIPLINES</dt><dd>Splunk Engineering · Observability · Platform Operations</dd></div><div><dt>LOCATION</dt><dd>Canada</dd></div><div><dt>WORK MODE</dt><dd>Remote</dd></div></dl><nav aria-label="Availability links"><a href="https://github.com/jannsenagustin" target="_blank" rel="noopener noreferrer">GITHUB →</a><a href="https://www.linkedin.com/in/jannsen-agustin/" target="_blank" rel="noopener noreferrer">LINKEDIN →</a><Link href="/resume/Jannsen-Agustin-Resume.pdf" prefetch={false}>RESUME ↓</Link></nav></div></section>
  </div>;
}
