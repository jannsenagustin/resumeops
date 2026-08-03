import { projects } from "../data/projects";
import Link from "next/link";
import ProjectCard from "./ProjectCard";
import SectionHeader from "./SectionHeader";

export default function Projects() {
  const atlas = projects[0];

  return (
    <section
      id="projects"
      data-motion-reveal
      className="scroll-mt-24 bg-black px-6 py-20 sm:px-8 sm:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="Featured Project"
          title="Atlas"
          description="The primary technical project in ResumeOps: a deliberately scoped Splunk environment designed to turn infrastructure decisions into verifiable engineering evidence."
        />
        <div className="mt-10">
          <ProjectCard project={atlas} />
        </div>
        <Link
          href="/projects/"
          className="motion-link mt-8 inline-flex text-sm font-semibold text-green-300 hover:text-green-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400"
        >
          View project roadmap →
        </Link>
      </div>
    </section>
  );
}
