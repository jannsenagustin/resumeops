import type { StaticImageData } from "next/image";
import type { AtlasStatusTone } from "./atlasStatus";

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
  statusTone: AtlasStatusTone;
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

export type AtlasEvidenceArtifact = {
  id: string;
  filename: string;
  canonicalPath: string;
  relativePath: string;
  milestone: string;
  batch: string;
  atlTask: string;
  shortDescription: string;
  validationPurpose: string;
  reviewState: "Reviewed";
  component: string;
  sequence: number;
  order: number;
  image: StaticImageData;
};

export type AtlasProjectState = {
  milestones: AtlasMilestoneRecord[];
  currentMilestone: AtlasMilestoneRecord;
  currentDetail: CurrentMilestoneDetail;
  completedTasks: Array<{ id: string; title: string }>;
  activeBatch: { id: string; status: string; objective: string; statusTone: AtlasStatusTone };
  activeTasks: Array<{ id: string; title: string; status: string; statusTone: AtlasStatusTone }>;
  evidenceArtifacts: AtlasEvidenceArtifact[];
  evidenceSummary: string;
  currentBoundary: string;
};
