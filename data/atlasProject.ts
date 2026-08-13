import { type ArchitectureNode } from "../components/ArchitectureDiagram";
import { type ProjectNavItem } from "../components/ProjectNav";
import { type EngineeringDecision } from "../components/DecisionCard";

export const atlasStatus =
  "Milestone 04 validated — Windows Event Log ingestion operational";

export const atlasTechnologies = [
  "Splunk Enterprise",
  "Docker Desktop",
  "Docker Compose",
  "Universal Forwarder",
  "Windows Event Logs",
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
  label: "Windows workstation · JNNSN",
  children: [
    {
      label: "Universal Forwarder 10.0.8 · Windows service",
      operational: true,
      children: [
        { label: "Application · Security · System Event Logs", operational: true },
        {
          label: "Active forward · 127.0.0.1:9997",
          operational: true,
          children: [
            { label: "Docker published port · loopback only", operational: true },
          ],
        },
      ],
    },
    {
      label: "Docker Desktop · atlas-network",
      children: [
        {
          label: "Search Head · operational · Web localhost:8000",
          operational: true,
          children: [
            {
              label: "Distributed search · HTTPS 8089",
              operational: true,
              children: [
                {
                  label: "Indexer · search peer · Web localhost:8001",
                  operational: true,
                },
              ],
            },
          ],
        },
        { label: "Deployment Server · not deployed", planned: true },
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
    title: "Persistent role storage",
    description:
      "Dedicated Indexer and Search Head volumes preserve each role's Splunk configuration and runtime data.",
    status: "Validated",
  },
  {
    title: "Dedicated Atlas bridge network",
    description:
      "Docker inspection confirmed the Indexer and Search Head share atlas-network while Splunk Web remains bound to localhost.",
    status: "Validated",
  },
  {
    title: "Containerized Splunk roles",
    description:
      "The official Splunk 10.0.8 RHEL 9 image runs as healthy Indexer and Search Head containers with verified Web access and administrator login.",
    status: "Validated",
  },
  {
    title: "Distributed search",
    description:
      "The Search Head resolves atlas-indexer through Docker DNS, reaches its management interface on HTTPS 8089, and coordinates searches that execute remotely on the Indexer.",
    status: "Validated",
  },
  {
    title: "Windows Event Log ingestion",
    description:
      "A Windows-host Universal Forwarder sends Application, Security, and System logs through the loopback-published TCP 9997 receiver to the Indexer, where they are searchable from the Search Head.",
    status: "Validated",
  },
  {
    title: "Managed forwarding and detection workflow",
    description:
      "Deployment Server, app-based forwarder management, HEC, SC4S, dashboards, detections, and alerts remain unimplemented.",
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
    status: "Validated",
    summary:
      "Deployed and validated a healthy Splunk Search Head alongside the existing Indexer on the shared Atlas Docker network.",
  },
  {
    id: "03",
    title: "Distributed Search",
    status: "Validated",
    summary:
      "Registered the Indexer as a healthy search peer and verified remote execution from the Search Head through Job Inspector.",
  },
  {
    id: "04",
    title: "Windows Event Ingestion via Universal Forwarder",
    status: "Validated",
    summary:
      "Forwarded Windows Application, Security, and System Event Logs to the Dockerized Indexer and validated remote search execution.",
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
  title: "Managed data onboarding",
  description:
    "Future work may add Deployment Server and app-based forwarder management; neither is part of Milestone 04.",
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
  {
    id: "005",
    title: "Publish the receiver on loopback only",
    reason:
      "The Windows-host forwarder needs a host-published endpoint, while a 127.0.0.1 binding keeps TCP 9997 unavailable to the LAN.",
  },
];

export const atlasLimitations = [
  "Distributed search is validated between one Search Head and one Indexer; the Deployment Server remains undeployed.",
  "The Windows Universal Forwarder is configured directly; Deployment Server and app-based configuration management remain future work.",
  "Only Windows Application, Security, and System Event Logs are validated; performance inputs and additional sources remain future work.",
  "Dashboards, detections, and alerts remain planned.",
  "The environment is a local workstation learning lab, not a production deployment.",
  "Clustering, high availability, TLS hardening, and production secret management are deferred.",
];
