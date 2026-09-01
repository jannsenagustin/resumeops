export const consoleNavigation = [
  ["Current State", "#current-state"],
  ["Architecture", "#architecture"],
  ["Milestones", "#milestones"],
  ["Engineering Proof", "#evidence"],
  ["Decision Record", "#engineering-records"],
  ["Experience", "#experience"],
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
    role: "Distributes centrally managed forwarder applications",
    state: "Validated",
    href: "/projects/atlas/#system",
  },
  {
    id: "managed-forwarder",
    name: "Universal Forwarder",
    role: "Enrolled client receiving managed applications",
    state: "Validated",
    href: "/projects/atlas/#system",
  },
] as const;

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
