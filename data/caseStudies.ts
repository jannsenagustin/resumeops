export type CaseStudyStatus =
  | "active"
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
};

export const caseStudies: CaseStudy[] = [
  {
    id: "resumeops",
    slug: "resumeops",
    title: "ResumeOps",
    subtitle: "Active Case Study",
    description:
      "An evolving technical portfolio documenting its own architecture, engineering decisions, development workflow, career journey, and future Splunk labs.",
    status: "active",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "GitHub Actions",
    ],
    route: "/case-studies/resumeops/",
    links: [
      {
        label: "View Case Study",
        href: "/case-studies/resumeops/",
        external: false,
        variant: "primary",
      },
      {
        label: "GitHub",
        href: "https://github.com/jannsenagustin/resumeops",
        external: true,
        variant: "secondary",
      },
      {
        label: "Live Demo",
        href: "https://jannsenagustin.github.io/resumeops/",
        external: true,
        variant: "secondary",
      },
    ],
    featured: true,
  },
  {
    id: "enterprise-splunk-home-lab",
    slug: "enterprise-splunk-home-lab",
    title: "Enterprise Splunk Home Lab",
    description:
      "A planned enterprise-style Splunk environment for practicing distributed architecture, data onboarding, configuration management, monitoring, and troubleshooting.",
    status: "planned",
    technologies: ["Splunk Enterprise", "Docker", "Linux", "Git"],
    featured: false,
  },
  {
    id: "detection-engineering",
    slug: "detection-engineering",
    title: "Detection Engineering",
    description:
      "A planned collection of Splunk detections, SPL searches, testing notes, investigation workflows, and documented detection logic.",
    status: "planned",
    technologies: [
      "Splunk",
      "SPL",
      "Security Monitoring",
      "Detection Engineering",
    ],
    featured: false,
  },
  {
    id: "splunk-app-development",
    slug: "splunk-app-development",
    title: "Splunk App Development",
    description:
      "A planned custom Splunk application focused on reusable dashboards, configuration, packaged knowledge objects, and maintainable deployment.",
    status: "planned",
    technologies: ["Splunk", "XML", "JavaScript", "App Packaging"],
    featured: false,
  },
  {
    id: "ci-cd-for-splunk",
    slug: "ci-cd-for-splunk",
    title: "CI/CD for Splunk",
    description:
      "A planned automation project for validating, versioning, and deploying Splunk configuration through a controlled CI/CD workflow.",
    status: "planned",
    technologies: ["GitHub Actions", "Git", "Splunk", "CI/CD"],
    featured: false,
  },
];
