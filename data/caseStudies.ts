export type CaseStudyStatus =
  | "active"
  | "configured"
  | "planned"
  | "complete"
  | "archived";

export type CaseStudyLinkVariant = "primary" | "secondary";

export type CaseStudyLink = {
  label: string;
  href: string;
  external: boolean;
  variant?: CaseStudyLinkVariant;
};

export type CaseStudy = {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  description: string;
  status: CaseStudyStatus;
  technologies: string[];
  links?: CaseStudyLink[];
  featured: boolean;
  route?: string;
  outcomes?: string[];
};

export const caseStudies: CaseStudy[] = [
  {
    id: "atlas",
    slug: "atlas",
    title: "Atlas",
    subtitle: "Flagship Observability Project",
    description:
      "A containerized enterprise observability lab that separates Splunk search, indexing, and deployment responsibilities on one workstation.",
    status: "configured",
    technologies: ["Splunk Enterprise", "Docker Compose", "Linux", "Git"],
    outcomes: [
      "Defined separate Search Head, Indexer, and Deployment Server roles",
      "Created dedicated networking and role-specific persistent volumes",
      "Kept Splunk Web endpoints bound to localhost",
      "Documented secret handling, constraints, and deferred clustering",
    ],
    route: "/case-studies/atlas/",
    links: [
      {
        label: "Explore Atlas",
        href: "/case-studies/atlas/",
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
];
