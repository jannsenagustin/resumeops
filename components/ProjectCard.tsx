import { type Project } from "../data/projects";
import ActionButton from "./ActionButton";
import ProjectHeader from "./ProjectHeader";
import TechBadge from "./TechBadge";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className={`flex h-full flex-col bg-zinc-950 transition-colors ${
      project.featured
        ? "rounded-2xl border border-green-400/30 p-7 hover:border-green-400/50 sm:p-10"
        : "rounded-xl border border-white/10 p-6 hover:border-green-400/30"
    }`}>
      <ProjectHeader
        subtitle={project.subtitle}
        title={project.title}
        status={project.status}
        featured={project.featured}
      />
      <p className="mt-7 max-w-3xl text-base leading-7 text-gray-300 sm:text-lg">
        {project.description}
      </p>
      {project.outcomes && (
        <div className="mt-7">
          <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
            Engineering outcomes
          </h4>
          <ul className="mt-4 grid gap-3 text-sm leading-6 text-gray-300 sm:grid-cols-2">
            {project.outcomes.map((outcome) => (
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
          {project.technologies.map((technology) => (
            <li key={technology}>
              <TechBadge technology={technology} />
            </li>
          ))}
        </ul>
      </div>
      {project.links && (
        <div className="mt-8 flex flex-wrap gap-3">
          {project.links.map((link) => (
            <ActionButton key={link.href} {...link} />
          ))}
        </div>
      )}
    </article>
  );
}
