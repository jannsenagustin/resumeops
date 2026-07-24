import Link from "next/link";
import ActionButton from "../../../components/ActionButton";
import ArchitectureDiagram from "../../../components/ArchitectureDiagram";
import CaseStudyNav from "../../../components/CaseStudyNav";
import CaseStudyTimeline from "../../../components/CaseStudyTimeline";
import DecisionCard from "../../../components/DecisionCard";
import LessonCard from "../../../components/LessonCard";
import SectionHeader from "../../../components/SectionHeader";
import StatusBadge from "../../../components/StatusBadge";
import TechBadge from "../../../components/TechBadge";
import {
  resumeOpsComponentArchitecture,
  resumeOpsDecisions,
  resumeOpsHomepageArchitecture,
  resumeOpsLessons,
  resumeOpsMilestones,
  resumeOpsNavigationItems,
  resumeOpsOverviewPurposes,
  resumeOpsRoadmap,
  resumeOpsTechnologies,
  resumeOpsWorkflow,
} from "../../../data/resumeopsCaseStudy";

export default function ResumeOpsCaseStudyPage() {
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

          <div className="mt-10 flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-green-400">
                Engineering Case Study
              </p>
              <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-6xl">
                ResumeOps
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-300">
                A self-documenting technical portfolio built to showcase
                engineering work, architectural decisions, career development,
                and future Splunk and observability labs.
              </p>
            </div>
            <StatusBadge status="active" />
          </div>

          <ul className="mt-8 flex flex-wrap gap-2" aria-label="Technologies">
            {resumeOpsTechnologies.map((technology) => (
              <li key={technology}>
                <TechBadge technology={technology} />
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-3">
            <ActionButton
              href="https://github.com/jannsenagustin/resumeops"
              label="GitHub"
            />
            <ActionButton
              href="https://jannsenagustin.github.io/resumeops/"
              label="Live Demo"
              variant="secondary"
            />
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 sm:px-8 lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-16 lg:py-20">
        <aside className="lg:sticky lg:top-8 lg:self-start">
          <CaseStudyNav items={resumeOpsNavigationItems} />
        </aside>

        <div className="min-w-0 space-y-24">
          <section id="overview" className="scroll-mt-24">
            <SectionHeader
              eyebrow="Context"
              title="Overview"
              description="ResumeOps began as a personal resume website and evolved into a technical engineering portfolio and documentation platform."
            />
            <p className="mt-8 max-w-3xl leading-8 text-gray-300">
              The site provides a structured place to present completed
              engineering work while documenting future Splunk and
              observability labs as they are built. It also records
              architectural decisions and demonstrates an organized,
              reviewable development process.
            </p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {resumeOpsOverviewPurposes.map((purpose) => (
                <li
                  key={purpose}
                  className="rounded-lg border border-white/10 bg-zinc-950 px-4 py-3 text-sm text-gray-300"
                >
                  {purpose}
                </li>
              ))}
            </ul>
          </section>

          <section id="architecture" className="scroll-mt-24">
            <SectionHeader
              eyebrow="System structure"
              title="Architecture"
              description="The site uses a small App Router composition and shared presentation components that can support additional documented case studies."
            />
            <div className="mt-8 grid gap-6 xl:grid-cols-2">
              <ArchitectureDiagram
                title="Homepage composition"
                root={resumeOpsHomepageArchitecture}
              />
              <ArchitectureDiagram
                title="Component composition"
                root={resumeOpsComponentArchitecture}
              />
            </div>
          </section>

          <section id="workflow" className="scroll-mt-24">
            <SectionHeader
              eyebrow="Delivery process"
              title="Development Workflow"
              description="AI assists planning and implementation, while product direction, testing, engineering judgment, and approval remain with the project owner."
            />
            <ol className="mt-8 grid gap-4">
              {resumeOpsWorkflow.map((item, index) => (
                <li
                  key={item.step}
                  className="grid gap-3 rounded-xl border border-white/10 bg-zinc-950 p-5 sm:grid-cols-[3rem_1fr] sm:p-6"
                >
                  <span className="font-mono text-sm text-green-400">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-semibold text-white">{item.step}</h3>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-gray-500">
                      {item.owner}
                    </p>
                    <p className="mt-3 text-sm leading-6 text-gray-400">
                      {item.detail}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section id="timeline" className="scroll-mt-24">
            <SectionHeader
              eyebrow="Development history"
              title="Sprint Timeline"
              description="Focused milestones show how the site progressed from a simple homepage into a documented engineering portfolio."
            />
            <div className="mt-8">
              <CaseStudyTimeline milestones={resumeOpsMilestones} />
            </div>
          </section>

          <section id="decisions" className="scroll-mt-24">
            <SectionHeader
              eyebrow="Decision record"
              title="Engineering Decisions"
              description="These decisions establish the product structure and the engineering principles used to grow ResumeOps."
            />
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {resumeOpsDecisions.map((decision) => (
                <DecisionCard key={decision.id} decision={decision} />
              ))}
            </div>
          </section>

          <section id="lessons" className="scroll-mt-24">
            <SectionHeader
              eyebrow="Repository evidence"
              title="Lessons Learned"
              description="The repository demonstrates practical lessons about structuring, documenting, and validating an evolving application."
            />
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {resumeOpsLessons.map((lesson) => (
                <LessonCard key={lesson.title} lesson={lesson} />
              ))}
            </div>
          </section>

          <section id="roadmap" className="scroll-mt-24">
            <SectionHeader
              eyebrow="Planned direction"
              title="Future Roadmap"
              description="Website foundations come first, followed by Splunk labs that will become documented engineering case studies as they are built."
            />
            <ol className="mt-8 space-y-3">
              {resumeOpsRoadmap.map((item, index) => (
                <li
                  key={item.label}
                  className="flex flex-col gap-3 rounded-lg border border-white/10 bg-zinc-950 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-sm text-green-400">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm font-medium text-gray-200">
                      {item.label}
                    </span>
                  </div>
                  <span className="w-fit rounded-full border border-slate-500/30 bg-slate-500/10 px-2.5 py-1 text-xs text-slate-300">
                    {item.category}
                  </span>
                </li>
              ))}
            </ol>
          </section>
        </div>
      </div>
    </main>
  );
}
