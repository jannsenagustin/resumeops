export type EngineeringDomain = {
  id: string;
  title: string;
  description: string;
};

export type EnterpriseDelivery = {
  id: string;
  organization: string;
  region: string;
  focus: string;
};

export type LeadershipContribution = {
  id: string;
  title: string;
  description: string;
};

export type TechnologyGroup = {
  id: string;
  title: string;
  items: string[];
};

export type EnterpriseExperience = {
  company: string;
  location: string;
  role: string;
  period: string;
  summary: string;
  splunkExperienceLabel: string;
  engineeringDomains: EngineeringDomain[];
  technicalFocus: string[];
  deliveryExperience: EnterpriseDelivery[];
  leadershipContributions: LeadershipContribution[];
  technologyGroups: TechnologyGroup[];
};

export type CareerJourneyItem = {
  id: string;
  title: string;
  context: string;
  description: string;
};

export const enterpriseExperience: EnterpriseExperience = {
  company: "Accenture Inc.",
  location: "Metro Manila, Philippines",
  role: "Data Management and Governance Specialist — Data Engineer, Splunk",
  period: "November 2015 – March 2024",
  summary:
    "More than eight years of enterprise technology experience at Accenture, including approximately seven years focused on Splunk administration and development. Delivered data onboarding, dashboards, monitoring, application support, platform changes, technical documentation, and operational improvements across global enterprise environments.",
  splunkExperienceLabel: "Splunk administration and development",
  engineeringDomains: [
    {
      id: "observability",
      title: "Observability",
      description:
        "Supported Splunk environments and created searchable operational, reporting, and monitoring views.",
    },
    {
      id: "platform-operations",
      title: "Platform Operations",
      description:
        "Administered Splunk components, forwarders, applications, add-ons, configurations, upgrades, deployments, and production support processes.",
    },
    {
      id: "dashboard-engineering",
      title: "Dashboard Engineering",
      description:
        "Created operational, reporting, analytics, migration, and disaster-recovery dashboards.",
    },
    {
      id: "data-engineering",
      title: "Data Engineering",
      description:
        "Supported data onboarding, parsing validation, indexes, SPL, lookups, data models, saved searches, SQL, ETL, and reporting workflows.",
    },
    {
      id: "application-support",
      title: "Application Support",
      description:
        "Resolved incidents and change requests, maintained documentation, followed escalation procedures, supported access management, and communicated resolutions.",
    },
    {
      id: "cloud-enablement",
      title: "Cloud Enablement",
      description:
        "Supported Splunk Enterprise-to-Splunk Cloud migration, compatibility testing, configuration deployment, dashboard and index validation, and access verification.",
    },
  ],
  technicalFocus: [
    "Splunk Administration",
    "Splunk App Development",
    "SPL Development",
    "Data Onboarding",
    "Dashboard Engineering",
    "Searches, Reports, and Alerts",
    "Operational Monitoring",
    "Performance Optimization",
    "Splunk Cloud Migration Support",
    "Splunk Upgrades",
    "Deployment Server",
    "Access and Role Management",
    "Incident and Change Management",
    "Technical Documentation",
  ],
  deliveryExperience: [
    {
      id: "shell",
      organization: "Shell",
      region: "Europe",
      focus:
        "Data onboarding, application maintenance, configuration deployment, upgrades, incident handling, and Splunk Cloud migration support.",
    },
    {
      id: "ameren",
      organization: "Ameren",
      region: "United States",
      focus:
        "Splunk administration, platform monitoring, troubleshooting, clustered deployments, operational dashboards, and technical documentation.",
    },
    {
      id: "carlsberg",
      organization: "Carlsberg",
      region: "Europe",
      focus:
        "Disaster-recovery dashboards, dashboard optimization, alerts, reports, lookups, data models, and saved searches.",
    },
    {
      id: "loreal",
      organization: "L’Oréal",
      region: "Europe",
      focus:
        "ServiceNow analytics dashboards, requirements gathering, use-case analysis, reporting, and data visualization.",
    },
    {
      id: "hawaiian-telecom",
      organization: "Hawaiian Telecom",
      region: "United States",
      focus:
        "Dashboard engineering supporting migration from legacy reporting tools to Splunk-based reporting and visualization.",
    },
    {
      id: "kering",
      organization: "Kering",
      region: "Europe",
      focus:
        "Application support for MicroStrategy and ETL workflows, incident resolution, data-flow monitoring, and proactive issue prevention.",
    },
  ],
  leadershipContributions: [
    {
      id: "team-leadership",
      title: "Team Leadership",
      description:
        "Led a four-person team, distributed workloads, supported delivery timelines, communicated with customers, and helped resolve team issues.",
    },
    {
      id: "internal-splunk-faculty",
      title: "Internal Splunk Faculty",
      description:
        "Helped teach and upskill developers through the Accenture Splunk Liquid Hub, contributing to an internal training initiative that supported more than 50 developer certifications.",
    },
    {
      id: "mentoring-knowledge-sharing",
      title: "Mentoring and Knowledge Sharing",
      description:
        "Delivered brown-bag sessions, mentored junior team members, and documented reusable technical processes and resolutions.",
    },
    {
      id: "internal-asset-team",
      title: "Internal Asset Team",
      description:
        "Helped establish an internal initiative for reviewing, installing, and sharing reusable custom Splunk applications.",
    },
  ],
  technologyGroups: [
    {
      id: "splunk-observability",
      title: "Splunk and Observability",
      items: [
        "Splunk Enterprise",
        "Splunk Cloud",
        "SPL",
        "Splunkbase Apps and Add-ons",
        "Deployment Server",
        "Forwarders",
      ],
    },
    {
      id: "data-visualization",
      title: "Data and Visualization",
      items: [
        "Dashboards",
        "Reports",
        "Alerts",
        "Lookups",
        "Data Models",
        "Saved Searches",
        "SQL",
        "ETL",
        "MicroStrategy",
      ],
    },
    {
      id: "infrastructure-cloud",
      title: "Infrastructure and Cloud",
      items: ["Linux", "AWS", "Azure", "Citrix"],
    },
    {
      id: "delivery-operations",
      title: "Delivery and Operations",
      items: [
        "Azure DevOps",
        "GitHub",
        "ServiceNow",
        "Jira",
        "Confluence",
        "Incident Management",
        "Change Management",
        "Agile Delivery",
      ],
    },
  ],
};

export const careerJourney: CareerJourneyItem[] = [
  {
    id: "enterprise-foundation",
    title: "Enterprise Engineering Foundation",
    context: "Accenture",
    description:
      "Built a technical foundation through enterprise Splunk, data, and observability work.",
  },
  {
    id: "relocation-to-canada",
    title: "Relocation and Resilience",
    context: "Canada",
    description:
      "Walmart and Trenton are part of the relocation journey and are represented as personal resilience and continuity, not as technical credentials.",
  },
  {
    id: "documented-growth",
    title: "Documented Engineering Growth",
    context: "ResumeOps",
    description:
      "ResumeOps records continued learning, engineering decisions, and the path toward documented Splunk and observability case studies.",
  },
];
