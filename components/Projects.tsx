import { caseStudies } from "../data/caseStudies";
import ProjectCard from "./ProjectCard";
import SectionHeader from "./SectionHeader";

export default function Projects() {
  const featuredCaseStudy = caseStudies.find(
    (caseStudy) => caseStudy.featured,
  );
  const plannedCaseStudies = caseStudies.filter(
    (caseStudy) => !caseStudy.featured,
  );

  return (
    <section
      id="case-studies"
      className="scroll-mt-24 bg-black px-6 py-20 sm:px-8 sm:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="Engineering Portfolio"
          title="Engineering Case Studies"
          description="An evolving collection of engineering case studies documenting systems, Splunk labs, architectural decisions, troubleshooting, and lessons learned."
        />

        {featuredCaseStudy && (
          <div className="mt-10">
            <ProjectCard caseStudy={featuredCaseStudy} />
          </div>
        )}

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {plannedCaseStudies.map((caseStudy) => (
            <ProjectCard key={caseStudy.id} caseStudy={caseStudy} />
          ))}
        </div>
      </div>
    </section>
  );
}
