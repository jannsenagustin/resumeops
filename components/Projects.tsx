"use client";

export default function Projects() {
  const projects = [
    "Splunk Dashboard",
    "Azure DevOps Pipeline",
    "ResumeOps Portfolio",
    "SIEM Monitoring",
  ];

  return (
    <div className="mt-12 text-center">
      <h2 className="mb-6 text-3xl">
        My Projects
      </h2>

      {projects.map((project) => {
    return (
        <h3 key={project}>
            {project}
        </h3>
    );
})}
    </div>
  );
}