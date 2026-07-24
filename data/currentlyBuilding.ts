export type BuildingStatus =
  | "Planning"
  | "Research"
  | "Design"
  | "Roadmap"
  | "Future";

export type CurrentlyBuildingItem = {
  id: string;
  title: string;
  status: BuildingStatus;
  technologies: string[];
};

export const currentlyBuildingItems: CurrentlyBuildingItem[] = [
  {
    id: "enterprise-splunk-home-lab",
    title: "Enterprise Splunk Home Lab",
    status: "Planning",
    technologies: ["Splunk Enterprise", "Docker", "Linux"],
  },
  {
    id: "detection-engineering",
    title: "Detection Engineering",
    status: "Research",
    technologies: ["Splunk", "SPL", "Security Monitoring"],
  },
  {
    id: "splunk-app-development",
    title: "Splunk App Development",
    status: "Design",
    technologies: ["Splunk", "JavaScript", "App Packaging"],
  },
  {
    id: "ci-cd-for-splunk",
    title: "CI/CD for Splunk",
    status: "Roadmap",
    technologies: ["GitHub Actions", "Git", "Splunk"],
  },
  {
    id: "splunk-soar",
    title: "Splunk SOAR",
    status: "Future",
    technologies: ["Splunk SOAR"],
  },
];
