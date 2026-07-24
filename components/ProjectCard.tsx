import { type CaseStudy } from "../data/caseStudies";
import ActionButton from "./ActionButton";
import CaseStudyHeader from "./CaseStudyHeader";
import TechBadge from "./TechBadge";

type ProjectCardProps = {
  caseStudy: CaseStudy;
};

export default function ProjectCard({ caseStudy }: ProjectCardProps) {
  return (
    <article
      className={`flex h-full flex-col border bg-zinc-950 transition-colors hover:border-green-400/40 ${
        caseStudy.featured
          ? "rounded-2xl border-green-400/30 p-7 sm:p-10"
          : "rounded-xl border-white/10 p-6 sm:p-7"
      }`}
    >
      <CaseStudyHeader
        subtitle={caseStudy.subtitle}
        title={caseStudy.title}
        status={caseStudy.status}
        featured={caseStudy.featured}
      />

      <p
        className={`leading-7 text-gray-300 ${
          caseStudy.featured
            ? "mt-7 max-w-3xl text-base sm:text-lg"
            : "mt-5 text-sm sm:text-base"
        }`}
      >
        {caseStudy.description}
      </p>

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

      {caseStudy.links && caseStudy.links.length > 0 && (
        <div className="mt-8 flex flex-wrap gap-3">
          {caseStudy.links.map((link) => (
            <ActionButton
              key={link.href}
              href={link.href}
              label={link.label}
              variant={link.variant}
              external={link.external}
            />
          ))}
        </div>
      )}
    </article>
  );
}
