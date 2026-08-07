export type ProjectStatus =
  | "validated"
  | "configuration-complete"
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
      "A containerized Splunk lab with operational Indexer and Search Head roles and a validated distributed-search relationship.",
    status: "in-progress",
    technologies: ["Splunk Enterprise", "Docker Compose", "Linux", "Git"],
    outcomes: [
      "Deployed the Splunk Indexer and Search Head as healthy Docker containers",
      "Validated shared bridge networking and independent persistent storage",
      "Verified administrator access through localhost-only Splunk Web for both roles",
      "Validated remote Indexer participation in searches coordinated by the Search Head",
      "Kept Deployment Server, ingestion, clustering, and high availability explicitly unvalidated",
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
