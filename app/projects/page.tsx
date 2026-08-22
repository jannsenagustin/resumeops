import type { Metadata } from "next";
import Link from "next/link";
import ProjectCard from "../../components/ProjectCard";
import SectionHeader from "../../components/SectionHeader";
import { getProjects } from "../../data/projects";
import { getAtlasProjectState } from "../../lib/atlasProjectState";

export const metadata: Metadata = {
  title: "Engineering Projects",
  description:
    "Explore Project Atlas and its evidence-backed engineering project roadmap.",
  openGraph: {
    title: "Engineering Projects | Project Atlas",
    description: "Explore Project Atlas and its evidence-backed engineering project roadmap.",
  },
  twitter: {
    title: "Engineering Projects | Project Atlas",
    description: "Explore Project Atlas and its evidence-backed engineering project roadmap.",
  },
};

export default function ProjectsPage() {
  const projects = getProjects(getAtlasProjectState());
  const flagship = projects.find((project) => project.featured);
  const roadmap = projects.filter((project) => !project.featured);

  return (
    <main className="min-h-screen bg-black px-6 py-16 text-white sm:px-8 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/"
          className="motion-link text-sm font-semibold text-gray-400 hover:text-green-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400"
        >
          ← Back to Project Atlas
        </Link>

        <div className="mt-12" data-motion-reveal>
          <SectionHeader
            eyebrow="Engineering Projects"
            title="Projects"
            description="Atlas is the flagship implementation. Future work remains explicitly on the roadmap until scope, source, and evidence exist."
            headingLevel="h1"
          />
        </div>

        {flagship && (
          <section aria-labelledby="flagship-project" className="mt-12" data-motion-reveal>
            <h2 id="flagship-project" className="sr-only">Flagship project</h2>
            <ProjectCard project={flagship} />
          </section>
        )}

        <section aria-labelledby="future-projects" className="mt-20" data-motion-reveal>
          <h2 id="future-projects" className="text-2xl font-bold tracking-tight">
            Future projects
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-gray-400">
            These are direction markers, not completed work. Each will earn a
            dedicated page only after its scope and implementation begin.
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {roadmap.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
