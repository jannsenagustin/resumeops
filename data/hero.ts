export type HeroMetadataItem = {
  id: string;
  label: string;
  value: string;
  supportingText: string;
};

export type HeroContent = {
  status: string;
  name: string;
  primaryIdentity: string;
  capabilities: string[];
  tagline: string;
  summary: string;
  currentProject: {
    projectId: string;
    description: string;
    nextFocusId: string;
  };
  metadata: HeroMetadataItem[];
};

export const heroContent: HeroContent = {
  status: "I Love Splunking",
  name: "Jannsen Agustin",
  primaryIdentity: "Observability Engineer",
  capabilities: ["Specializing in Splunk Enterprise"],
  tagline: "Turning operational data into engineering insight.",
  summary:
    "I administer, enhance, automate, and support enterprise observability platforms that help engineering teams monitor systems, investigate issues, and turn operational data into actionable insights. ResumeOps documents my enterprise experience, engineering decisions, ongoing technical work, and production-style projects.",
  currentProject: {
    projectId: "enterprise-splunk-home-lab",
    description:
      "Building a production-style Splunk environment for observability, platform operations, and future detection-engineering projects.",
    nextFocusId: "detection-engineering",
  },
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
      id: "current-focus",
      label: "Current Focus",
      value: "Observability",
      supportingText: "Splunk • Automation • Engineering",
    },
    {
      id: "location",
      label: "Location",
      value: "Edmonton, Alberta",
      supportingText: "Canada",
    },
  ],
};
