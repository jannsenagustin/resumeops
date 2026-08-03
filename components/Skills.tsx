import { enterpriseExperience } from "../data/experience";
import SectionHeader from "./SectionHeader";
import TechBadge from "./TechBadge";

export default function Skills() {
  return (
    <section
      id="skills"
      data-motion-reveal
      className="scroll-mt-24 border-t border-white/10 bg-black px-6 py-20 sm:px-8 sm:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="Technical capabilities"
          title="Skills"
          description="Capabilities grounded in enterprise delivery, current source code, and documented project work."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {enterpriseExperience.technologyGroups.map((group) => (
            <article
              key={group.id}
              className="motion-card rounded-xl border border-white/10 bg-zinc-950 p-6"
            >
              <h3 className="font-semibold text-white">{group.title}</h3>
              <ul className="mt-4 flex flex-wrap gap-2" aria-label={group.title}>
                {group.items.map((item) => (
                  <li key={item}><TechBadge technology={item} /></li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
