import { type ArchitectureNode } from "../components/ArchitectureDiagram";
import { type ProjectNavItem } from "../components/ProjectNav";
import { type EngineeringDecision } from "../components/DecisionCard";

export const atlasStatus =
  "Milestone 01 validated — Splunk Indexer operational in Docker";

export const atlasTechnologies = [
  "Splunk Enterprise",
  "Docker Desktop",
  "Docker Compose",
  "Linux",
  "Git",
];

export const atlasNavigation: ProjectNavItem[] = [
  { label: "Overview", href: "#overview" },
  { label: "Architecture", href: "#architecture" },
  { label: "Current status", href: "#current-status" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Decisions", href: "#decisions" },
  { label: "Evidence", href: "#evidence" },
  { label: "Challenges", href: "#challenges" },
  { label: "Limitations", href: "#limitations" },
  { label: "Milestones", href: "#milestones" },
  { label: "Source", href: "#source" },
];

export const atlasArchitecture: ArchitectureNode = {
  label: "Windows workstation · Docker Desktop",
  children: [
    {
      label: "atlas-network · dedicated bridge",
      children: [
        { label: "Search Head · not deployed", planned: true },
        { label: "Indexer · operational", operational: true },
        { label: "Deployment Server · not deployed", planned: true },
        { label: "Linux log source + Universal Forwarder", planned: true },
      ],
    },
  ],
};

export type AtlasCapability = {
  title: string;
  description: string;
  status: "Validated" | "Planned";
};

export const atlasCapabilities: AtlasCapability[] = [
  {
    title: "Docker Compose configuration",
    description:
      "The resolved Compose configuration expanded successfully with the required environment values.",
    status: "Validated",
  },
  {
    title: "Indexer persistence",
    description:
      "Dedicated Indexer volumes preserve Splunk configuration and runtime data across container recreation.",
    status: "Validated",
  },
  {
    title: "Dedicated Atlas network",
    description:
      "The Atlas bridge network was created while Splunk Web remained bound to localhost.",
    status: "Validated",
  },
  {
    title: "Containerized Splunk Indexer",
    description:
      "The official Splunk 10.0.8 RHEL 9 image is running as a healthy container with verified administrator access.",
    status: "Validated",
  },
  {
    title: "Additional roles and ingestion",
    description:
      "Search Head, Deployment Server, distributed search, Universal Forwarder, HEC, SC4S, dashboards, detections, and alerts remain future work.",
    status: "Planned",
  },
];

export type AtlasMilestone = {
  id: string;
  title: string;
  status: "Validated" | "Next" | "Roadmap";
  summary: string;
};

export const atlasMilestones: AtlasMilestone[] = [
  {
    id: "01",
    title: "First Containerized Deployment",
    status: "Validated",
    summary:
      "Deployed the first Splunk Enterprise service as a healthy Docker container and verified Splunk Web access.",
  },
  {
    id: "02",
    title: "Search Head Deployment",
    status: "Next",
    summary:
      "Inspect the running Indexer, then deploy the Search Head and validate service communication.",
  },
  {
    id: "03",
    title: "Deployment Server",
    status: "Roadmap",
    summary: "Deploy and validate the forwarder-management role.",
  },
  {
    id: "04",
    title: "Distributed Search",
    status: "Roadmap",
    summary: "Configure and validate the Search Head-to-Indexer relationship.",
  },
  {
    id: "05",
    title: "Data Ingestion",
    status: "Roadmap",
    summary: "Implement and validate an evidence-backed ingestion path.",
  },
  {
    id: "06",
    title: "Detection Engineering",
    status: "Roadmap",
    summary: "Build detections only after validated data is searchable.",
  },
];

export const atlasNextMilestone = {
  title: "Search Head Deployment",
  description:
    "Inspect the running Indexer's network attachment, mounts, labels, environment, health check, and container metadata before deploying the Search Head.",
};

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
  "Only the Indexer role has been deployed and validated; the Search Head and Deployment Server remain undeployed.",
  "Distributed search has not been configured or validated.",
  "No Universal Forwarder or other ingestion pipeline has been validated; HEC and SC4S remain planned.",
  "Dashboards, detections, and alerts remain planned.",
  "The environment is a local workstation learning lab, not a production deployment.",
  "Clustering, high availability, TLS hardening, and production secret management are deferred.",
];
