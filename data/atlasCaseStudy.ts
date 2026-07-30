import { type ArchitectureNode } from "../components/ArchitectureDiagram";
import { type CaseStudyNavItem } from "../components/CaseStudyNav";
import { type EngineeringDecision } from "../components/DecisionCard";

export const atlasStatus =
  "Configuration complete; runtime validation pending";

export const atlasTechnologies = [
  "Splunk Enterprise",
  "Docker Desktop",
  "Docker Compose",
  "Linux",
  "Git",
];

export const atlasNavigation: CaseStudyNavItem[] = [
  { label: "Architecture", href: "#architecture" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Decisions", href: "#decisions" },
  { label: "Evidence", href: "#evidence" },
  { label: "Limitations", href: "#limitations" },
  { label: "Next milestone", href: "#next-milestone" },
];

export const atlasArchitecture: ArchitectureNode = {
  label: "Windows workstation · Docker Desktop",
  children: [
    {
      label: "atlas-network · dedicated bridge",
      children: [
        { label: "Search Head · configured" },
        { label: "Indexer · configured" },
        { label: "Deployment Server · configured" },
        { label: "Linux log source + Universal Forwarder", planned: true },
      ],
    },
  ],
};

export type AtlasCapability = {
  title: string;
  description: string;
  status: "Configured" | "Validation pending" | "Planned";
};

export const atlasCapabilities: AtlasCapability[] = [
  {
    title: "Separated Splunk roles",
    description:
      "Compose defines independent Search Head, Indexer, and Deployment Server services.",
    status: "Configured",
  },
  {
    title: "Persistent state",
    description:
      "Role-specific named volumes preserve Splunk configuration and runtime data across container recreation.",
    status: "Configured",
  },
  {
    title: "Dedicated networking",
    description:
      "A private bridge network provides service-name resolution while Web interfaces bind only to localhost.",
    status: "Configured",
  },
  {
    title: "Runtime role readiness",
    description:
      "Container startup, Splunk Web access, service DNS, and role behavior have not yet been verified.",
    status: "Validation pending",
  },
  {
    title: "Linux authentication ingestion",
    description:
      "Universal Forwarder data onboarding, indexed events, dashboards, and alerts belong to later milestones.",
    status: "Planned",
  },
];

export const atlasDecisions: EngineeringDecision[] = [
  {
    id: "001",
    title: "Model distributed roles with containers",
    reason:
      "Separate services make search, indexing, and deployment responsibilities visible without requiring multiple physical hosts.",
  },
  {
    id: "002",
    title: "Begin without clustering",
    reason:
      "Clustering would increase resource use and operational complexity before the single-instance role boundaries and data flow are validated.",
  },
  {
    id: "003",
    title: "Persist each role independently",
    reason:
      "Separate named volumes preserve role state and make ownership clearer during rebuilds and troubleshooting.",
  },
  {
    id: "004",
    title: "Use a dedicated private network",
    reason:
      "Container DNS supports explicit service communication while management traffic remains inside the lab boundary.",
  },
];

export const atlasLimitations = [
  "The Compose file has not yet completed runtime validation.",
  "No distributed-search peer relationship is claimed as working.",
  "No Universal Forwarder, indexed Linux events, dashboard, detection, or alert is implemented.",
  "The design is a workstation learning lab, not a production deployment.",
  "Clustering, high availability, TLS hardening, and production secret management are deferred.",
];
