import { type CaseStudy } from "../data/caseStudies";
import ActionButton from "./ActionButton";
import CaseStudyHeader from "./CaseStudyHeader";
import TechBadge from "./TechBadge";

export default function ProjectCard({ caseStudy }: { caseStudy: CaseStudy }) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-green-400/30 bg-zinc-950 p-7 transition-colors hover:border-green-400/50 sm:p-10">
      <CaseStudyHeader
        subtitle={caseStudy.subtitle}
        title={caseStudy.title}
        status={caseStudy.status}
        featured
      />
      <p className="mt-7 max-w-3xl text-base leading-7 text-gray-300 sm:text-lg">
        {caseStudy.description}
      </p>
      {caseStudy.outcomes && (
        <div className="mt-7">
          <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
            Engineering outcomes
          </h4>
          <ul className="mt-4 grid gap-3 text-sm leading-6 text-gray-300 sm:grid-cols-2">
            {caseStudy.outcomes.map((outcome) => (
              <li key={outcome} className="flex gap-3">
                <span aria-hidden="true" className="text-green-400">✓</span>
                <span>{outcome}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="mt-7">
        <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
          Technologies
        </h4>
        <ul className="mt-3 flex flex-wrap gap-2" aria-label="Technologies">
          {caseStudy.technologies.map((technology) => (
            <li key={technology}>
              <TechBadge technology={technology} />
            </li>
          ))}
        </ul>
      </div>
      {caseStudy.links && (
        <div className="mt-8 flex flex-wrap gap-3">
          {caseStudy.links.map((link) => (
            <ActionButton key={link.href} {...link} />
          ))}
        </div>
      )}
    </article>
  );
}
