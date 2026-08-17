import { atlasHomepageRecord } from "./atlasProject";

export const consoleNavigation = [
  ["Current State", "#current-state"],
  ["Architecture", "#architecture"],
  ["Milestones", "#milestones"],
  ["Evidence", "#evidence"],
  ["Engineering Records", "#engineering-records"],
  ["Experience", "#experience"],
] as const;

export const consoleStatus = [
  ["Project", "Atlas", "neutral"],
  ["Location", "Edmonton, Canada", "neutral"],
  ["Validated", "Milestones 01–04", "validated"],
  ["Current Work", "M05 / Infrastructure Provisioning", "planned"],
  ["Evidence", `${atlasHomepageRecord.evidenceCount} Records`, "neutral"],
  ["Experience", "7+ Years Splunk", "neutral"],
] as const;

export const systemState = [
  ["Distributed Search", "Validated", "validated"],
  ["Windows Event Ingestion", "Validated", "validated"],
  ["Deployment Server", "In Progress / Not Validated", "planned"],
  ["Evidence Records", String(atlasHomepageRecord.evidenceCount), "neutral"],
  ["Current Milestone", "05", "neutral"],
] as const;

export const ingestionPath = [
  {
    id: "windows-host",
    name: "Windows Host",
    role: "Application, Security, and System Event Logs",
    state: "Validated",
    href: "/projects/atlas/#validation",
  },
  {
    id: "universal-forwarder",
    name: "Universal Forwarder",
    role: "Collects and forwards host telemetry",
    state: "Validated",
    href: "/projects/atlas/#system",
  },
  {
    id: "atlas-indexer",
    name: "Atlas Indexer",
    role: "Receives, indexes, and searches events",
    state: "Validated",
    href: "/projects/atlas/#system",
  },
  {
    id: "atlas-search-head",
    name: "Atlas Search Head",
    role: "Coordinates distributed search",
    state: "Validated",
    href: "/projects/atlas/#validation",
  },
] as const;

export const managementPath = [
  {
    id: "deployment-server",
    name: "Rocky Linux Deployment Server",
    role: "Planned centralized forwarder configuration management",
    state: "In Progress / Not Validated",
    href: "/projects/atlas/#limitations",
  },
  {
    id: "managed-forwarder",
    name: "Universal Forwarder",
    role: "Future management client; current direct forwarding remains in place",
    state: "Future Relationship",
    href: "/projects/atlas/#limitations",
  },
] as const;

export const evidenceGroups = [
  ["01", "Containerized Splunk Foundation", 4],
  ["02", "Search Head Deployment", 4],
  ["03", "Distributed Search", 3],
  ["04", "Windows Event Ingestion", 5],
  ["05", "Infrastructure Provisioning", 0],
] as const;

export const currentActivity = {
  completed: [
    "Atlas External Network created",
    "Hyper-V storage standardized",
    "atlas-deployment-server VM created",
    "Virtual hardware configured with 4 vCPU and 8 GB RAM",
    "Generation 2 and Linux Secure Boot configured",
    "Production checkpoints configured",
  ],
  next: [
    "Rocky Linux installation",
    "Linux baseline configuration",
    "Clean operating-system checkpoint",
  ],
} as const;

export const repositoryUrl =
  "https://github.com/jannsenagustin/resumeops";

export const linkedInUrl =
  "https://www.linkedin.com/in/jannsen-agustin/";

export const resumeRoute = "/resume/Jannsen-Agustin-Resume.pdf";

export const resumeDocumentPath = `${
  process.env.NODE_ENV === "production" ? "/resumeops" : ""
}${resumeRoute}`;

export const labState = [
  ...ingestionPath.map((component) => ({
    id: component.id,
    name: component.name,
    state: "Validated" as const,
  })),
  {
    id: managementPath[0].id,
    name: managementPath[0].name,
    state: "In Progress / Not Validated" as const,
  },
  {
    id: "future-expansion",
    name: "Future Expansion",
    state: "Future" as const,
  },
] as const;

export const engineeringShortcuts = [
  ["Windows Ingestion", "/projects/atlas/#validation", "internal"],
  ["Distributed Search", "/projects/atlas/#validation", "internal"],
  ["Validation Records", "/projects/atlas/#validation", "internal"],
  ["Docker Compose", `${repositoryUrl}/blob/main/infrastructure/atlas/docker-compose.yml`, "external"],
  ["Canonical Milestones", "/projects/atlas/#milestones", "internal"],
  ["Atlas Documentation", "/projects/atlas/", "internal"],
] as const;

export const atlasPrinciple = {
  text: "Evidence before claims.",
  href: `${repositoryUrl}/blob/main/ATLAS_PRINCIPLES.md`,
} as const;
