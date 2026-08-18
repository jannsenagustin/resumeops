import Link from "next/link";
import { enterpriseExperience } from "../data/experience";

const selectedEnvironmentIds = [
  "shell",
  "ameren",
  "carlsberg",
  "loreal",
  "hawaiian-telecom",
  "kering",
];

const representativeWork = [
  "Data onboarding",
  "Dashboard engineering",
  "Platform support",
  "Monitoring and alerting",
  "Configuration deployment through existing pipelines",
  "Technical documentation",
];

const capabilities = [
  { name: "Splunk administration", source: "Production experience", href: "#experience" },
  { name: "Data onboarding", source: "Production experience", href: "#experience" },
  { name: "SPL development", source: "Production experience", href: "#experience" },
  { name: "Dashboards and reporting", source: "Production experience", href: "#experience" },
  { name: "Distributed search", source: "Atlas validation", href: "/projects/atlas/#validation" },
  { name: "Windows Event ingestion", source: "Atlas Milestone 04", href: "/projects/atlas/#validation" },
  { name: "Troubleshooting", source: "Atlas field notes", href: "/projects/atlas/#field-notes" },
  { name: "Operational documentation", source: "Experience and Atlas", href: "/projects/atlas/#milestones" },
] as const;

const research = [
  {
    name: "Rocky Linux Deployment Server & Configuration Management",
    state: "PLANNED",
    detail: "Atlas Milestone 05; implementation has not begun.",
  },
  {
    name: "Splunk Config Intelligence",
    state: "DESIGN",
    detail: "A concept for inspecting and explaining configuration changes.",
  },
  {
    name: "OpenTelemetry",
    state: "RESEARCH",
    detail: "Future study of vendor-neutral telemetry collection.",
  },
  {
    name: "Kubernetes / Splunk Operator",
    state: "EXPLORATORY",
    detail: "Exploration only; no implementation claim.",
  },
] as const;

export default function HomeEngineeringRecord() {
  const selectedEnvironments = enterpriseExperience.deliveryExperience.filter(
    (delivery) => selectedEnvironmentIds.includes(delivery.id),
  );

  return (
    <div className="home-engineering-record">
      <section id="experience" className="editorial-section production-proof" aria-labelledby="production-title">
        <header className="editorial-heading">
          <p className="record-label">01 / PRODUCTION PROOF</p>
          <div>
            <h2 id="production-title">Enterprise experience behind Atlas</h2>
            <p>Where has this engineering been applied?</p>
          </div>
        </header>
        <div className="production-proof__lead">
          <div className="production-proof__employer">
            <p className="record-label">EMPLOYER / PERIOD</p>
            <h3>{enterpriseExperience.company}</h3>
            <p>{enterpriseExperience.period}</p>
          </div>
          <p>{enterpriseExperience.summary}</p>
        </div>
        <div className="production-proof__selections">
          <div>
            <h3>Selected environments</h3>
            <ul className="environment-index">
              {selectedEnvironments.map((delivery, index) => (
                <li key={delivery.id}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <div className="environment-index__heading">
                      <strong>{delivery.organization}</strong>
                      <em>{delivery.region}</em>
                    </div>
                    <p>{delivery.focus}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Representative work</h3>
            <ul className="representative-index">
              {representativeWork.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
        </div>
        <Link className="editorial-link" href="/resume/Jannsen-Agustin-Resume.pdf" prefetch={false}>
          VIEW COMPLETE EXPERIENCE IN PROFESSIONAL RESUME ↓
        </Link>
      </section>

      <section id="skills" className="editorial-section capability-editorial" aria-labelledby="capabilities-title">
        <header className="editorial-heading">
          <p className="record-label">02 / DEMONSTRATED CAPABILITY</p>
          <div>
            <h2 id="capabilities-title">Selected Splunk and observability work</h2>
            <p>What can this engineer actually do?</p>
          </div>
        </header>
        <ol className="capability-index">
          {capabilities.map((capability, index) => (
            <li key={capability.name}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{capability.name}</strong>
              <Link href={capability.href}>{capability.source} →</Link>
            </li>
          ))}
        </ol>
      </section>

      <section id="research" className="editorial-section research-editorial" aria-labelledby="research-title">
        <header className="editorial-heading">
          <p className="record-label">03 / TECHNICAL DIRECTION</p>
          <div>
            <h2 id="research-title">Current research</h2>
            <p>What is being rebuilt or learned next?</p>
          </div>
        </header>
        <div className="research-editorial__lead">
          <p className="record-label">NEXT ATLAS MILESTONE</p>
          <h3>05 — Rocky Linux Deployment Server &amp; Configuration Management</h3>
          <p>Planned work toward centralized forwarder configuration management. No implementation is claimed.</p>
        </div>
        <dl className="research-index">
          {research.map((item) => (
            <div key={item.name}>
              <dt><strong>{item.name}</strong><span>{item.detail}</span></dt>
              <dd>{item.state}</dd>
            </div>
          ))}
        </dl>
        <Link className="editorial-link" href="/projects/">VIEW PROJECT ROADMAP →</Link>
      </section>

      <section id="contact" className="editorial-section continue-editorial" aria-labelledby="continue-title">
        <header className="editorial-heading">
          <p className="record-label">04 / CONTINUE INVESTIGATING</p>
          <div>
            <h2 id="continue-title">Follow the engineering record</h2>
            <p>Where should an interested visitor go next?</p>
          </div>
        </header>
        <div className="continue-editorial__body">
          <div>
            <p>Architecture decisions, validation, field notes, evidence, and source remain available in the full Atlas dossier.</p>
            <dl>
              <div><dt>DISCIPLINES</dt><dd>Splunk Engineering · Observability · Platform Operations</dd></div>
              <div><dt>LOCATION</dt><dd>Canada</dd></div>
              <div><dt>WORK MODE</dt><dd>Remote</dd></div>
            </dl>
          </div>
          <nav aria-label="Investigation and availability links">
            <Link href="/projects/atlas/">ATLAS PROJECT RECORD →</Link>
            <Link href="/projects/">PROJECT ROADMAP →</Link>
            <Link href="/resume/Jannsen-Agustin-Resume.pdf" prefetch={false}>PROFESSIONAL RESUME ↓</Link>
            <a href="https://github.com/jannsenagustin" target="_blank" rel="noopener noreferrer">GITHUB →</a>
            <a href="https://www.linkedin.com/in/jannsen-agustin/" target="_blank" rel="noopener noreferrer">LINKEDIN →</a>
          </nav>
        </div>
      </section>
    </div>
  );
}
