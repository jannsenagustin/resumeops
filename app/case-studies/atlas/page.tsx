import Link from "next/link";
import ActionButton from "../../../components/ActionButton";
import ArchitectureDiagram from "../../../components/ArchitectureDiagram";
import CaseStudyNav from "../../../components/CaseStudyNav";
import DecisionCard from "../../../components/DecisionCard";
import SectionHeader from "../../../components/SectionHeader";
import StatusBadge from "../../../components/StatusBadge";
import TechBadge from "../../../components/TechBadge";
import {
  atlasArchitecture,
  atlasCapabilities,
  atlasDecisions,
  atlasLimitations,
  atlasNavigation,
  atlasStatus,
  atlasTechnologies,
} from "../../../data/atlasCaseStudy";

const repositoryUrl = "https://github.com/jannsenagustin/resumeops";

export default function AtlasCaseStudyPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <header className="border-b border-white/10 px-6 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <Link
            href="/"
            className="text-sm font-semibold text-gray-400 transition-colors hover:text-green-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400"
          >
            ← Back to ResumeOps
          </Link>
          <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-green-400">
                Flagship Observability Project
              </p>
              <h1 className="mt-4 text-5xl font-bold tracking-tight sm:text-6xl">
                Atlas
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-300">
                A containerized lab that models separate Splunk search,
                indexing, and deployment responsibilities on one workstation.
              </p>
              <div className="mt-6"><StatusBadge status="configured" label={atlasStatus} /></div>
            </div>
            <div className="flex flex-wrap gap-3 lg:max-w-xs">
              <ActionButton href={`${repositoryUrl}/blob/main/docs/architecture.md`} label="View Architecture" />
              <ActionButton href={`${repositoryUrl}/blob/main/CASE_STUDY.md`} label="Read Case Study" variant="secondary" />
              <ActionButton href={`${repositoryUrl}/tree/main/infrastructure/atlas`} label="View Source" variant="secondary" />
            </div>
          </div>
          <ul className="mt-10 flex flex-wrap gap-2" aria-label="Atlas technologies">
            {atlasTechnologies.map((technology) => (
              <li key={technology}><TechBadge technology={technology} /></li>
            ))}
          </ul>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 sm:px-8 lg:grid-cols-[13rem_minmax(0,1fr)]">
        <aside className="lg:sticky lg:top-8 lg:self-start">
          <CaseStudyNav items={atlasNavigation} />
        </aside>
        <div className="space-y-24">
          <section id="architecture" className="scroll-mt-24">
            <SectionHeader
              eyebrow="System design"
              title="Architecture"
              description="The initial design isolates core Splunk responsibilities while keeping the lab achievable on a single workstation."
            />
            <div className="mt-8">
              <ArchitectureDiagram title="Configured and planned Atlas topology" root={atlasArchitecture} />
            </div>
            <p className="mt-6 text-sm leading-7 text-gray-400">
              Compose defines one dedicated bridge network and six named volumes:
              separate <code className="text-green-300">etc</code> and <code className="text-green-300">var</code> storage for each Splunk role.
              Only Splunk Web ports are published, and they bind to localhost.
            </p>
          </section>

          <section id="capabilities" className="scroll-mt-24">
            <SectionHeader eyebrow="Engineering scope" title="Capabilities and status" description="Configuration is separated from runtime proof so the project does not imply evidence that does not exist." />
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {atlasCapabilities.map((capability) => (
                <article key={capability.title} className="rounded-xl border border-white/10 bg-zinc-950 p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-amber-200">{capability.status}</p>
                  <h3 className="mt-3 text-lg font-semibold">{capability.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-gray-400">{capability.description}</p>
                </article>
              ))}
            </div>
          </section>

          <section id="decisions" className="scroll-mt-24">
            <SectionHeader eyebrow="Trade-offs" title="Engineering decisions" description="Only decisions that materially shape the lab architecture are surfaced." />
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {atlasDecisions.map((decision) => <DecisionCard key={decision.id} decision={decision} />)}
            </div>
          </section>

          <section id="evidence" className="scroll-mt-24">
            <SectionHeader eyebrow="What can be verified" title="Validation and evidence" description="The repository currently proves the design and configuration, not a completed observability pipeline." />
            <div className="mt-8 rounded-xl border border-amber-400/20 bg-amber-400/5 p-6">
              <h3 className="font-semibold text-amber-100">Available now</h3>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-gray-300">
                <li>• Typed Docker Compose definitions for three Splunk roles.</li>
                <li>• Dedicated network, localhost-only Web mappings, and persistent-volume design.</li>
                <li>• Sanitized workstation evidence confirming Docker Desktop and Compose availability.</li>
              </ul>
              <p className="mt-5 text-sm leading-7 text-gray-400">
                The workstation screenshot is environment-setup evidence only.
                It is not proof that Splunk roles, ingestion, dashboards, or alerts are operational.
              </p>
            </div>
          </section>

          <section id="limitations" className="scroll-mt-24">
            <SectionHeader eyebrow="Honest boundary" title="Current limitations" description="These constraints define exactly what Atlas does—and does not—demonstrate today." />
            <ul className="mt-8 space-y-3">
              {atlasLimitations.map((limitation) => (
                <li key={limitation} className="rounded-lg border border-white/10 bg-zinc-950 px-5 py-4 text-sm leading-7 text-gray-300">{limitation}</li>
              ))}
            </ul>
          </section>

          <section id="next-milestone" className="scroll-mt-24 rounded-2xl border border-green-400/25 bg-green-400/5 p-7 sm:p-9">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-green-400">Next milestone</p>
            <h2 className="mt-3 text-2xl font-bold">Runtime deployment validation</h2>
            <p className="mt-4 max-w-3xl leading-7 text-gray-300">
              Resolve the supported image tag and license inputs locally, render
              the Compose configuration, start all three services, then capture
              sanitized evidence of container health, Web access, network DNS,
              and persistent volumes.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
