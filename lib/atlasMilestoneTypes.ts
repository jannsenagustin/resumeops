export const milestoneStatuses = ["Planned", "In Progress", "Complete"] as const;
export const validationStates = ["Not Validated", "Partially Validated", "Validated"] as const;

export type MilestoneStatus = (typeof milestoneStatuses)[number];
export type ValidationState = (typeof validationStates)[number];

export type AtlasMilestoneRecord = {
  id: string;
  number: string;
  title: string;
  status: MilestoneStatus;
  validationState: ValidationState;
  outcome: string;
  evidence: string;
  evidenceHref?: string;
};

export type CurrentMilestoneDetail = {
  id: string;
  currentPhase: string;
  completedWork: string[];
  completedFoundation: string[];
  activeTasks: string[];
  activeBatchId: string;
  nextObjective: string;
  evidencePath: string;
  boundary: string;
};

export type AtlasProjectState = {
  milestones: AtlasMilestoneRecord[];
  currentMilestone: AtlasMilestoneRecord;
  currentDetail: CurrentMilestoneDetail;
  completedTasks: Array<{ id: string; title: string }>;
  activeBatch: { id: string; status: string; objective: string };
  activeTasks: Array<{ id: string; title: string }>;
  evidenceSummary: string;
  currentBoundary: string;
};
