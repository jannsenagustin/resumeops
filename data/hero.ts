export type HeroMetadataItem = {
  id: string;
  label: string;
  value: string;
  supportingText: string;
};

export const heroContent = {
  name: "Jannsen Agustin",
  primaryIdentity: "Splunk Administrator | Observability Engineer",
  tagline: "Building practical observability systems.",
  summary:
    "I work with Splunk, operational data, dashboards, platform administration, and automation. Atlas is my current hands-on project: a containerized lab for documenting distributed Splunk architecture honestly, from configuration through validation.",
  metadata: [
    {
      id: "splunk-experience",
      label: "Splunk Experience",
      value: "Approximately 7 Years",
      supportingText: "Enterprise administration and development",
    },
    {
      id: "enterprise-delivery",
      label: "Enterprise Delivery",
      value: "6 Client Environments",
      supportingText: "Selected global delivery through Accenture",
    },
    {
      id: "current-project",
      label: "Current Project",
      value: "Atlas",
      supportingText: "Configuration complete; runtime validation pending",
    },
    {
      id: "location",
      label: "Location",
      value: "Edmonton, Alberta",
      supportingText: "Canada",
    },
  ] satisfies HeroMetadataItem[],
};
