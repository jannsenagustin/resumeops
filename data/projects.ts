export type ProjectStatus =
  | "validated"
  | "configuration-complete"
  | "runtime-validation-pending"
  | "in-progress"
  | "roadmap";

export type ProjectLinkVariant = "primary" | "secondary";

export type ProjectLink = {
  label: string;
  href: string;
  external: boolean;
  variant?: ProjectLinkVariant;
};

export type Project = {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  description: string;
  status: ProjectStatus;
  technologies: string[];
  links?: ProjectLink[];
  featured: boolean;
  route?: string;
  outcomes?: string[];
};

export const projects: Project[] = [
  {
    id: "atlas",
    slug: "atlas",
    title: "Atlas",
    subtitle: "Flagship Observability Project",
    description:
      "A containerized enterprise observability lab that separates Splunk search, indexing, and deployment responsibilities on one workstation.",
    status: "runtime-validation-pending",
    technologies: ["Splunk Enterprise", "Docker Compose", "Linux", "Git"],
    outcomes: [
      "Defined separate Search Head, Indexer, and Deployment Server roles",
      "Created dedicated networking and role-specific persistent volumes",
      "Kept Splunk Web endpoints bound to localhost",
      "Documented secret handling, constraints, and deferred clustering",
    ],
    route: "/projects/atlas/",
    links: [
      {
        label: "Explore Atlas",
        href: "/projects/atlas/",
        external: false,
        variant: "primary",
      },
      {
        label: "View Source",
        href: "https://github.com/jannsenagustin/resumeops/tree/main/infrastructure/atlas",
        external: true,
        variant: "secondary",
      },
    ],
    featured: true,
  },
  {
    id: "splunk-config-intelligence",
    slug: "splunk-config-intelligence",
    title: "Splunk Config Intelligence",
    subtitle: "Future Project",
    description:
      "A roadmap concept for inspecting, validating, and explaining Splunk configuration changes. Scope and architecture are not yet committed.",
    status: "roadmap",
    technologies: ["Splunk Enterprise", "Configuration Management"],
    featured: false,
  },
  {
    id: "detection-engineering-lab",
    slug: "detection-engineering-lab",
    title: "Detection Engineering Lab",
    subtitle: "Future Project",
    description:
      "A roadmap concept for versioned SPL detections, validation inputs, and documented investigation logic.",
    status: "roadmap",
    technologies: ["Splunk Enterprise", "SPL", "Detection Engineering"],
    featured: false,
  },
  {
    id: "opentelemetry-lab",
    slug: "opentelemetry-lab",
    title: "OpenTelemetry Lab",
    subtitle: "Future Project",
    description:
      "A roadmap concept for learning vendor-neutral telemetry collection. No implementation or completion claim is made.",
    status: "roadmap",
    technologies: ["OpenTelemetry", "Observability"],
    featured: false,
  },
];
