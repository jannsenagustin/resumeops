import fs from "node:fs";
import path from "node:path";
import {
  milestoneStatuses,
  validationStates,
  type AtlasMilestoneRecord,
  type CurrentMilestoneDetail,
  type MilestoneStatus,
  type ValidationState,
} from "./atlasMilestoneTypes";

const milestonesPath = path.join(process.cwd(), "docs", "milestones.md");

function fields(body: string) {
  return Object.fromEntries([...body.matchAll(/^\*\*([^*]+):\*\*\s*(.+)$/gm)].map((match) => [match[1].trim(), match[2].trim()]));
}

export function parseAtlasMilestones() {
  const document = fs.readFileSync(milestonesPath, "utf8");
  const rows = [...document.matchAll(/^\| (\d{2}) · ([^|]+) \| ([^|]+) \| ([^|]+) \| ([^|]+) \| ([^|]+) \|$/gm)];
  if (rows.length === 0) throw new Error("docs/milestones.md contains no milestone records");

  const ids = new Set<string>();
  const milestones = rows.map((row) => {
    const id = `M${row[1]}`;
    const status = row[3].trim() as MilestoneStatus;
    const validationState = row[4].trim() as ValidationState;
    if (ids.has(id)) throw new Error(`Duplicate milestone identifier: ${id}`);
    if (!milestoneStatuses.includes(status)) throw new Error(`${id} uses invalid milestone status: ${status}`);
    if (!validationStates.includes(validationState)) throw new Error(`${id} uses invalid validation state: ${validationState}`);
    ids.add(id);
    const evidence = row[6].trim();
    const evidenceHref = evidence.match(/\[[^\]]+\]\(([^)]+)\)/)?.[1];
    for (const link of evidence.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)) {
      if (!fs.existsSync(path.resolve(path.dirname(milestonesPath), link[1]))) throw new Error(`${id} references missing evidence path: ${link[1]}`);
    }
    return { id, number: row[1], title: row[2].trim(), status, validationState, outcome: row[5].trim(), evidence, evidenceHref } satisfies AtlasMilestoneRecord;
  });

  const detailMatches = [...document.matchAll(/^## (M\d{2}) — ([^\r\n]+)\r?\n+([\s\S]*?)(?=\r?\n## |(?![\s\S]))/gm)];
  const currentDetails = detailMatches.map((match) => ({ id: match[1], values: fields(match[3]) })).filter(({ values }) => values.Current === "Yes");
  if (currentDetails.length !== 1) throw new Error(`Expected exactly one current milestone definition, found ${currentDetails.length}`);
  const { id, values } = currentDetails[0];
  const required = ["Current Phase", "Completed Work", "Completed Foundation", "Active Work", "Next Objective", "Evidence", "Boundary"];
  const missing = required.filter((field) => !values[field]);
  if (missing.length) throw new Error(`${id} is missing required fields: ${missing.join(", ")}`);
  const activeWork = values["Active Work"];
  const activeWorkPattern = /^(?:None|BATCH-\d{3} \/ ATL-\d{3})$/;
  if (!activeWorkPattern.test(activeWork)) {
    const batchReference = activeWork.match(/BATCH-\d{3}/)?.[0] ?? "BATCH-NNN";
    const taskReference = activeWork.match(/ATL-\d{3}/)?.[0] ?? "ATL-NNN";
    throw new Error(`${id} Active Work uses a non-canonical value.\n\nFound:\n${activeWork}\n\nExpected:\n${batchReference} / ${taskReference}`);
  }
  const activeParts = activeWork.split("/").map((value) => value.trim());
  const activeTasks = activeParts.filter((value) => /^ATL-\d{3}$/.test(value));
  const activeBatchId = activeParts.find((value) => /^BATCH-\d{3}$/.test(value)) ?? (activeWork === "None" ? "Unassigned" : undefined);
  if (!activeBatchId || (activeBatchId !== "Unassigned" && !activeTasks.length)) throw new Error(`${id} Active Work could not be parsed after canonical-format validation`);
  if (!fs.existsSync(path.resolve(path.dirname(milestonesPath), values.Evidence))) throw new Error(`${id} references missing evidence path: ${values.Evidence}`);
  const currentDetail = {
    id,
    currentPhase: values["Current Phase"],
    completedWork: values["Completed Work"].split(/[;,]/).map((value) => value.trim()),
    completedFoundation: values["Completed Foundation"].split(";").map((value) => value.trim()),
    activeTasks,
    activeBatchId,
    nextObjective: values["Next Objective"],
    evidencePath: values.Evidence,
    boundary: values.Boundary,
  } satisfies CurrentMilestoneDetail;
  const currentMilestone = milestones.find((milestone) => milestone.id === id);
  if (!currentMilestone) throw new Error(`Current milestone ${id} does not exist in the milestone table`);
  return { milestones, currentMilestone, currentDetail };
}
