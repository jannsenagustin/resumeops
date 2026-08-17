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

export const atlasHomepageRecord = {
  checkpoint: "04 / Windows Event Ingestion",
  status: "Complete",
  ingestion: "Validated",
  search: "Validated",
  splunkVersion: "10.0.8",
  evidenceCount: 16,
  updated: "2026-08-12",
} as const;

export type AtlasMilestone = {
  id: string;
  title: string;
  status: "Validated" | "In Progress" | "Planned" | "Roadmap";
  summary: string;
  href?: string;
  linkLabel?: string;
  external?: boolean;
  evidenceLabel?: string;
};

export const atlasMilestones: AtlasMilestone[] = [
  {
    id: "01",
    title: "Containerized Splunk Foundation",
    status: "Validated",
    summary:
      "Established the first containerized Splunk runtime, confirmed a healthy Indexer, and created the Docker foundation for Atlas.",
    href: "https://github.com/jannsenagustin/resumeops/blob/main/docs/journal/sprint-6c-first-successful-containerized-splunk-deployment.md",
    linkLabel: "Engineering Record",
    external: true,
    evidenceLabel: "4 artifacts",
  },
  {
    id: "02",
    title: "Search Head Deployment",
    status: "Validated",
    summary:
      "Introduced a healthy Search Head as a separate role on the shared Docker network, preparing Atlas for Distributed Search.",
    href: "https://github.com/jannsenagustin/resumeops/blob/main/docs/journal/sprint-6d-search-head-deployment.md",
    linkLabel: "Engineering Record",
    external: true,
    evidenceLabel: "4 artifacts",
  },
  {
    id: "03",
    title: "Distributed Search",
    status: "Validated",
    summary:
      "Connected Search Head and Indexer over HTTPS/8089 and proved remote execution.",
    href: "https://github.com/jannsenagustin/resumeops/blob/main/docs/journal/sprint-6e-distributed-search.md",
    linkLabel: "Engineering Record",
    external: true,
    evidenceLabel: "3 public artifacts",
  },
  {
    id: "04",
    title: "Windows Event Ingestion via Universal Forwarder",
    status: "Validated",
    summary:
      "Installed UF on Windows, selected three Event Log inputs, configured direct forwarding, resolved inactive forwarding, and proved end-to-end search.",
    href: "https://github.com/jannsenagustin/resumeops/blob/main/docs/journal/sprint-6f-windows-event-ingestion.md",
    linkLabel: "Engineering Record",
    external: true,
    evidenceLabel: "5 artifacts",
  },
  {
    id: "05",
    title: "Rocky Linux Deployment Server & Configuration Management",
    status: "In Progress",
    summary:
      "Infrastructure provisioning is underway; Rocky Linux installation and Deployment Server implementation are not yet validated.",
    href: "/projects/atlas/#limitations",
    linkLabel: "Current Boundary",
    external: false,
    evidenceLabel: "No evidence yet",
  },
  {
    id: "06",
    title: "Detection Engineering",
    status: "Roadmap",
    summary: "Build detections only after validated data is searchable.",
  },
];

export const atlasNextMilestone = {
  title: "Rocky Linux Deployment Server & Configuration Management",
  description:
    "Milestone 05 infrastructure provisioning is underway. Rocky Linux installation, Splunk Deployment Server, and managed forwarder configuration remain unvalidated.",
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
  "The Windows Universal Forwarder is configured directly; Deployment Server and app-based configuration management are in progress but not validated.",
  "Only Windows Application, Security, and System Event Logs are validated; performance inputs and additional sources remain future work.",
  "Dashboards, detections, and alerts remain planned.",
  "The environment is a local workstation learning lab, not a production deployment.",
  "Clustering, high availability, TLS hardening, and production secret management are deferred.",
];
