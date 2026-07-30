import { caseStudies } from "../data/caseStudies";
import ProjectCard from "./ProjectCard";
import SectionHeader from "./SectionHeader";

export default function Projects() {
  const atlas = caseStudies[0];

  return (
    <section
      id="projects"
      className="scroll-mt-24 bg-black px-6 py-20 sm:px-8 sm:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="Featured Project"
          title="Atlas"
          description="The primary technical project in ResumeOps: a deliberately scoped Splunk environment designed to turn infrastructure decisions into verifiable engineering evidence."
        />
        <div className="mt-10">
          <ProjectCard caseStudy={atlas} />
        </div>
      </div>
    </section>
  );
}
