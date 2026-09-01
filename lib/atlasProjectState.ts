import { getAtlasPlanningData } from "./atlasPlanning";
import { getAtlasEvidenceArtifacts } from "./atlasEvidence";
import { parseAtlasMilestones } from "./atlasMilestones";
import type { AtlasProjectState } from "./atlasMilestoneTypes";
import { getAtlasStatusTone } from "./atlasStatus";

export function getAtlasProjectState(): AtlasProjectState {
  const milestoneData = parseAtlasMilestones();
  const evidenceArtifacts = getAtlasEvidenceArtifacts();
  const planning = getAtlasPlanningData();
  const backlog = new Map(planning.backlog.map((task) => [task.id, task]));
  const completedTasks = milestoneData.currentDetail.completedWork.map((id) => {
    const task = backlog.get(id);
    if (!task) throw new Error(`Current milestone references unknown completed task: ${id}`);
    if (task.status !== "Done") throw new Error(`Current milestone completed work ${id} is not Done`);
    return { id, title: task.title, status: task.status, statusTone: getAtlasStatusTone(task.status) };
  });
  if (planning.activeBatch.batchId !== milestoneData.currentDetail.activeBatchId) throw new Error(`Current milestone batch ${milestoneData.currentDetail.activeBatchId} does not match ACTIVE_BATCH.md ${planning.activeBatch.batchId}`);
  const activeBatchIsEmpty = planning.activeBatch.batchId === "Unassigned";
  if (activeBatchIsEmpty && planning.activeBatch.status !== "Empty") throw new Error("Unassigned Active Batch must have Empty status");
  if (!activeBatchIsEmpty && !["In Progress", "Review"].includes(planning.activeBatch.status)) throw new Error(`Active batch ${planning.activeBatch.batchId} is not In Progress or Review`);
  const includedTasks = planning.activeBatch.includedTasks.match(/ATL-\d{3}/g) ?? [];
  if (includedTasks.length !== milestoneData.currentDetail.activeTasks.length || includedTasks.some((id) => !milestoneData.currentDetail.activeTasks.includes(id))) throw new Error("Current milestone active tasks do not match ACTIVE_BATCH.md");
  const activeTasks = includedTasks.map((id) => {
    const task = backlog.get(id);
    if (!task) throw new Error(`Active batch references unknown backlog task: ${id}`);
    return { id, title: task.title, status: task.status, statusTone: getAtlasStatusTone(task.status) };
  });
  const objectiveTaskIds: string[] = planning.activeBatch.objective.match(/ATL-\d{3}/g) ?? [];
  const objectiveMatchesTasks = objectiveTaskIds.length === activeTasks.length
    && activeTasks.every((task) => objectiveTaskIds.includes(task.id));
  if (!activeBatchIsEmpty && !objectiveMatchesTasks) {
    throw new Error(`Active Batch objective task references do not match Included Tasks.\n\nFound objective:\n${planning.activeBatch.objective}\n\nExpected:\nObjective must reference included task${activeTasks.length === 1 ? "" : "s"} ${activeTasks.map((task) => task.id).join(", ")}`);
  }
  return {
    ...milestoneData,
    completedTasks,
    activeBatch: { id: planning.activeBatch.batchId, status: planning.activeBatch.status, objective: planning.activeBatch.objective, statusTone: getAtlasStatusTone(planning.activeBatch.status) },
    activeTasks,
    evidenceArtifacts,
    evidenceSummary: `${milestoneData.currentMilestone.validationState} · ${milestoneData.currentDetail.evidencePath}`,
    currentBoundary: milestoneData.currentDetail.boundary,
  };
}
