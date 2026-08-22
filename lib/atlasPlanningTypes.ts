export const planningPriorities = ["P0", "P1", "P2", "P3", "Icebox"] as const;
export const planningFilters = [
  "Infrastructure",
  "Splunk",
  "Website / UX",
  "Documentation",
  "AI Governance",
  "Observability",
  "Technical Debt",
  "Future Milestones",
  "Platform Engineering",
  "Career Presentation",
] as const;

export type PlanningPriority = (typeof planningPriorities)[number];
export type PlanningFilter = (typeof planningFilters)[number];

export type BacklogItem = {
  id: string;
  title: string;
  categories: string[];
  milestone: string;
  priority: PlanningPriority;
  status: string;
  description: string;
  whyItMatters: string;
  dependencies: string;
  acceptanceCriteria: string;
  humanValidationRequired: string;
  source: string;
  notes: string;
  sourceUrl: string;
};

export type Proposal = {
  id: string;
  title: string;
  status: string;
  origin: string;
  problem: string;
  recommendation: string;
  sourceUrl: string;
};

export type Idea = {
  id: string;
  title: string;
  category: string;
  dateRecorded: string;
  origin: string;
  description: string;
  whyItMightMatter: string;
  status: "New" | "Reviewing" | "Promoted" | "Archived";
  potentialDestination: string;
  relatedProposal: string;
  relatedBacklog: string;
  notes: string;
  sourceUrl: string;
};

export type Decision = {
  id: string;
  title: string;
  decision: string;
  status: string;
  sourceUrl: string;
};

export type Lesson = {
  id: string;
  title: string;
  reusableLesson: string;
  status: string;
  sourceUrl: string;
};

export type ActiveBatch = {
  batchId: string;
  status: string;
  objective: string;
  includedTasks: string;
  dependencies: string;
  humanValidationRequired: string;
  sourceUrl: string;
};

export type AtlasPlanningData = {
  backlog: BacklogItem[];
  ideas: Idea[];
  proposals: Proposal[];
  decisions: Decision[];
  lessons: Lesson[];
  activeBatch: ActiveBatch;
};
