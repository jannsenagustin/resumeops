import type { Metadata } from "next";
import Link from "next/link";
import ActionButton from "../../../components/ActionButton";
import ArchitectureDiagram from "../../../components/ArchitectureDiagram";
import DecisionCard from "../../../components/DecisionCard";
import EvidenceViewer from "../../../components/EvidenceViewer";
import ProjectNav from "../../../components/ProjectNav";
import SectionHeader from "../../../components/SectionHeader";
import StatusBadge from "../../../components/StatusBadge";
import TechBadge from "../../../components/TechBadge";
import {
  atlasArchitecture,
  atlasCapabilities,
  atlasDecisions,
  atlasLimitations,
  atlasMilestones,
  atlasNavigation,
  atlasNextMilestone,
  atlasStatus,
  atlasTechnologies,
} from "../../../data/atlasProject";
import composeValidationEvidence from "../../../docs/evidence/milestone-01-first-containerized-deployment/2026-08-01_001_compose_validation.png";
import containerHealthyEvidence from "../../../docs/evidence/milestone-01-first-containerized-deployment/2026-08-01_002_container_healthy.png";
import dockerDesktopEvidence from "../../../docs/evidence/milestone-01-first-containerized-deployment/2026-08-01_003_docker_desktop.png";
import successfulLoginEvidence from "../../../docs/evidence/milestone-01-first-containerized-deployment/2026-08-01_004_first_successful_login.png";
import multiServiceHealthyEvidence from "../../../docs/evidence/milestone-02-search-head/2026-08-05_001_search_head_and_indexer_healthy.png";
import searchHeadLoginEvidence from "../../../docs/evidence/milestone-02-search-head/2026-08-05_002_search_head_first_login.png";
import multiServiceDockerEvidence from "../../../docs/evidence/milestone-02-search-head/2026-08-05_003_docker_desktop_multi_service.png";
import sharedNetworkEvidence from "../../../docs/evidence/milestone-02-search-head/2026-08-05_004_shared_network.png";
import searchPeerEvidence from "../../../docs/evidence/milestone-03-deployment-server/2026-08-06_001_search_peer_configuration.png";
import distributedSearchEvidence from "../../../docs/evidence/milestone-03-deployment-server/2026-08-06_001_distributed_spl_ search_results.png";
import jobInspectorEvidence from "../../../docs/evidence/milestone-03-deployment-server/2026-08-06_001_search_job_inspector_results.png";

const repositoryUrl = "https://github.com/jannsenagustin/resumeops";

const milestoneOneEvidence = [
  { src: containerHealthyEvidence, alt: "Docker CLI showing the Atlas Indexer running with a healthy status.", caption: "Healthy atlas-indexer container" },
  { src: successfulLoginEvidence, alt: "Splunk Enterprise home page after successful administrator login to the Atlas Indexer.", caption: "Verified administrator access" },
];

const milestoneOneSupportingEvidence = [
  { src: composeValidationEvidence, alt: "Docker Compose validation output for the Atlas infrastructure configuration.", caption: "Compose configuration validation" },
  { src: dockerDesktopEvidence, alt: "Docker Desktop showing the running Atlas Indexer container.", caption: "Docker Desktop container view" },
];

const milestoneTwoEvidence = [
  { src: multiServiceHealthyEvidence, alt: "Docker CLI showing the Atlas Search Head and Indexer containers running with healthy status.", caption: "Healthy Search Head and Indexer containers" },
  { src: searchHeadLoginEvidence, alt: "Splunk Enterprise home page after successful administrator login to the Atlas Search Head.", caption: "Verified Search Head administrator access" },
];

const milestoneTwoSupportingEvidence = [
  { src: multiServiceDockerEvidence, alt: "Docker Desktop showing the Atlas Search Head and Indexer running together.", caption: "Docker Desktop multi-service runtime" },
  { src: sharedNetworkEvidence, alt: "Docker network inspection showing the Atlas Search Head and Indexer attached to atlas-network.", caption: "Shared atlas-network membership" },
];

const milestoneThreeEvidence = [
  {
    src: searchPeerEvidence,
    alt: "Splunk Search Peers page showing atlas-indexer on port 8089 as Up, Healthy, and Enabled with no health-check failures.",
    caption: "Search peer healthy and enabled",
  },
  {
    src: distributedSearchEvidence,
    alt: "Search Head results for the metadata hosts query showing atlas-indexer and atlas-search-head.",
    caption: "Distributed metadata search returns both Atlas hosts",
  },
  {
    src: jobInspectorEvidence,
    alt: "Splunk Search Job Inspector showing dispatch.stream.remote.atlas-indexer activity for the distributed metadata search.",
    caption: "Job Inspector confirms remote Indexer execution",
  },
];

export const metadata: Metadata = {
  title: "Atlas | Observability Engineering Project",
  description:
    "Explore Atlas, a containerized Splunk observability project with operational Indexer and Search Head roles connected through validated distributed search.",
};

export default function AtlasProjectPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <header className="border-b border-white/10 px-6 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <Link
            href="/"
            className="motion-link text-sm font-semibold text-gray-400 hover:text-green-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400"
          >
            ← Back to projects
          </Link>
          <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start">
            <div className="hero-enter max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-green-400">
                Flagship Observability Project
              </p>
              <h1 className="mt-4 text-5xl font-bold tracking-tight sm:text-6xl">
                Atlas
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-300">
                A containerized Splunk lab with operational Indexer and Search
                Head roles connected through validated distributed search.
              </p>
              <div className="mt-6">
                <StatusBadge
                  status="in-progress"
                  label={atlasStatus}
                />
              </div>
            </div>
            <div className="hero-enter hero-enter-delay-1 flex flex-wrap gap-3 lg:max-w-xs">
              <ActionButton
                href="#architecture"
                label="View Architecture"
                external={false}
              />
              <ActionButton
                href="#evidence"
                label="View Evidence"
                variant="secondary"
                external={false}
              />
              <ActionButton
                href={`${repositoryUrl}/tree/main/infrastructure/atlas`}
                label="View Source"
                variant="secondary"
              />
            </div>
          </div>
          <ul className="hero-enter hero-enter-delay-2 mt-10 flex flex-wrap gap-2" aria-label="Atlas technologies">
            {atlasTechnologies.map((technology) => (
              <li key={technology}><TechBadge technology={technology} /></li>
            ))}
          </ul>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 sm:px-8 lg:grid-cols-[13rem_minmax(0,1fr)]">
        <aside className="min-w-0 lg:sticky lg:top-8 lg:self-start">
          <ProjectNav items={atlasNavigation} />
        </aside>

        <div className="space-y-24">
          <section id="overview" className="scroll-mt-24" data-motion-reveal>
            <SectionHeader
              eyebrow="Project overview"
              title="A practical distributed-role lab"
              description="Atlas progressed from one operational Splunk role, to two independent roles, to a functioning distributed-search architecture backed by peer health, SPL results, and Job Inspector evidence."
            />
            <p className="mt-6 max-w-3xl text-base leading-8 text-gray-300">
              One Splunk instance would conceal the relationship between search,
              indexing, and deployment management. Atlas separates those
              responsibilities while staying achievable within the CPU, memory,
              storage, and licensing constraints of a personal workstation.
            </p>
          </section>

          <section id="architecture" className="scroll-mt-24" data-motion-reveal>
            <SectionHeader
              eyebrow="System design"
              title="Architecture"
              description="The Search Head coordinates remote search execution with the Indexer over HTTPS 8089 on atlas-network while host-facing Splunk Web remains on localhost ports 8000 and 8001."
            />
            <div className="mt-8">
              <ArchitectureDiagram
                title="Configured and planned Atlas topology"
                root={atlasArchitecture}
              />
            </div>
            <p className="mt-6 text-sm leading-7 text-gray-400">
              Docker DNS resolves <code className="text-green-300">atlas-indexer</code>{" "}
              inside the bridge network. Distributed search uses the internal
              Splunk management interface at <code className="text-green-300">https://atlas-indexer:8089</code>,
              not either host-facing Splunk Web port.
            </p>
          </section>

          <section id="current-status" className="scroll-mt-24" data-motion-reveal>
            <SectionHeader
              eyebrow="Current status"
              title="Milestone 03 validated; Atlas remains in progress"
              description="The Indexer and Search Head are operational, and their distributed-search relationship is functionally validated. Deployment Server and ingestion remain unvalidated."
            />
            <div className="mt-8 grid gap-5 sm:grid-cols-3">
              {[
                ["Indexer", "Operational search peer with independent persistent storage"],
                ["Search Head", "Operational search interface and distributed-search coordinator"],
                ["Distributed Search", "Validated through peer health, SPL results, and remote execution evidence"],
              ].map(([status, detail]) => (
                <article key={status} className="motion-card rounded-xl border border-white/10 bg-zinc-950 p-6">
                  <h3 className="font-semibold text-white">{status}</h3>
                  <p className="mt-3 text-sm leading-7 text-gray-400">{detail}</p>
                </article>
              ))}
            </div>
          </section>

          <section id="capabilities" className="scroll-mt-24" data-motion-reveal>
            <SectionHeader
              eyebrow="Engineering scope"
              title="Capabilities"
              description="Each capability distinguishes validated Milestone 01 through 03 outcomes from planned work."
            />
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {atlasCapabilities.map((capability) => (
                <article key={capability.title} className="motion-card rounded-xl border border-white/10 bg-zinc-950 p-6">
                  <p className={`text-xs font-semibold uppercase tracking-[0.14em] ${capability.status === "Validated" ? "text-green-300" : "text-slate-300"}`}>
                    {capability.status}
                  </p>
                  <h3 className="mt-3 text-lg font-semibold">{capability.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-gray-400">
                    {capability.description}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section id="decisions" className="scroll-mt-24" data-motion-reveal>
            <SectionHeader
              eyebrow="Trade-offs"
              title="Engineering decisions"
              description="Only decisions that materially shape the lab architecture are surfaced."
            />
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {atlasDecisions.map((decision) => (
                <DecisionCard key={decision.id} decision={decision} />
              ))}
            </div>
          </section>

          <section id="evidence" className="scroll-mt-24" data-motion-reveal>
            <SectionHeader
              eyebrow="What can be verified"
              title="Validation and evidence"
              description="Evidence follows the validation chain from healthy search peer, to successful distributed SPL, to Job Inspector proof of remote execution."
            />
            <h3 className="mt-8 text-lg font-semibold text-white">Milestone 03 · Distributed Search</h3>
            <div className="mt-8 grid items-start gap-5 md:grid-cols-2">
              {milestoneThreeEvidence.map((evidence) => (
                <EvidenceViewer key={evidence.caption} {...evidence} />
              ))}
            </div>
            <h3 className="mt-8 text-lg font-semibold text-white">Milestone 02 · Search Head deployment</h3>
            <div className="mt-8 grid items-start gap-5 md:grid-cols-2">
              {milestoneTwoEvidence.map((evidence) => (
                <EvidenceViewer key={evidence.caption} {...evidence} />
              ))}
            </div>
            <div className="mt-5 grid items-start gap-4 sm:grid-cols-2">
              {milestoneTwoSupportingEvidence.map((evidence) => (
                <EvidenceViewer key={evidence.caption} {...evidence} prominence="supporting" />
              ))}
            </div>
            <h3 className="mt-12 text-lg font-semibold text-white">Milestone 01 · First Indexer deployment</h3>
            <div className="mt-5 grid items-start gap-5 md:grid-cols-2">
              {milestoneOneEvidence.map((evidence) => (
                <EvidenceViewer key={evidence.caption} {...evidence} />
              ))}
            </div>
            <div className="mt-5 grid items-start gap-4 sm:grid-cols-2">
              {milestoneOneSupportingEvidence.map((evidence) => (
                <EvidenceViewer key={evidence.caption} {...evidence} prominence="supporting" />
              ))}
            </div>
          </section>

          <section id="challenges" className="scroll-mt-24" data-motion-reveal>
            <SectionHeader
              eyebrow="Engineering challenge"
              title="Correcting configuration with minimal container impact"
              description="Milestone 03 turned a stanza-placement error into a repeatable lesson in inspection, minimal tooling, scoped restarts, and layered validation."
            />
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              <article className="motion-card rounded-xl border border-white/10 bg-zinc-950 p-6">
                <h3 className="font-semibold">Problem</h3>
                <p className="mt-3 text-sm leading-7 text-gray-400">
                  The initial shell user could not read server.conf, the minimal
                  container lacked common editors, and an appended setting
                  landed under the wrong Splunk stanza.
                </p>
              </article>
              <article className="motion-card rounded-xl border border-white/10 bg-zinc-950 p-6">
                <h3 className="font-semibold">Resolution and lesson</h3>
                <p className="mt-3 text-sm leading-7 text-gray-400">
                  The file was inspected as root, corrected through docker cp
                  and a host editor, verified before restart, and applied with
                  an Indexer-only restart. Peer health and Job Inspector then
                  validated configuration and remote execution separately.
                </p>
              </article>
            </div>
          </section>

          <section id="limitations" className="scroll-mt-24" data-motion-reveal>
            <SectionHeader
              eyebrow="Honest boundary"
              title="Limitations"
              description="These constraints define exactly what Atlas does—and does not—demonstrate today."
            />
            <ul className="mt-8 space-y-3">
              {atlasLimitations.map((limitation) => (
                <li key={limitation} className="motion-card rounded-lg border border-white/10 bg-zinc-950 px-5 py-4 text-sm leading-7 text-gray-300">
                  {limitation}
                </li>
              ))}
            </ul>
          </section>

          <section id="milestones" className="scroll-mt-24" data-motion-reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-green-400">
              Milestones
            </p>
            <h2 className="mt-3 text-2xl font-bold">{atlasNextMilestone.title} is next</h2>
            <p className="mt-4 max-w-3xl leading-7 text-gray-300">{atlasNextMilestone.description}</p>
            <ol className="mt-8 grid gap-4 md:grid-cols-2">
              {atlasMilestones.map((milestone) => (
                <li key={milestone.id} className="motion-card rounded-xl border border-white/10 bg-zinc-950 p-5">
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-mono text-xs text-gray-500">{milestone.id}</span>
                    <span className={`rounded-full border px-2.5 py-1 text-xs ${milestone.status === "Validated" ? "border-green-400/30 bg-green-400/10 text-green-300" : milestone.status === "Next" ? "border-amber-400/30 bg-amber-400/10 text-amber-200" : "border-slate-500/30 bg-slate-500/10 text-slate-300"}`}>
                      {milestone.status}
                    </span>
                  </div>
                  <h3 className="mt-4 font-semibold text-white">{milestone.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-gray-400">{milestone.summary}</p>
                </li>
              ))}
            </ol>
            <a
              href={`${repositoryUrl}/blob/main/docs/milestones.md`}
              target="_blank"
              rel="noopener noreferrer"
              className="motion-link mt-6 inline-flex text-sm font-semibold text-green-300 hover:text-green-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400"
            >
              See Milestones →
            </a>
          </section>

          <section id="source" className="scroll-mt-24" data-motion-reveal>
            <SectionHeader
              eyebrow="Inspect the implementation"
              title="Source and supporting documentation"
              description="Start with the infrastructure source. Architecture and the longer engineering narrative provide supporting depth."
            />
            <div className="mt-8 flex flex-wrap gap-3">
              <ActionButton href={`${repositoryUrl}/tree/main/infrastructure/atlas`} label="View Source" />
              <ActionButton href={`${repositoryUrl}/blob/main/docs/architecture.md`} label="View Architecture" variant="secondary" />
              <ActionButton href={`${repositoryUrl}/blob/main/CASE_STUDY.md`} label="Engineering Narrative" variant="secondary" />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
