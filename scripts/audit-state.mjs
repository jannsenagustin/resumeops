import fs from "node:fs";
import path from "node:path";
import { parseAtlasEvidenceIndex } from "../lib/atlasEvidenceIndex.mjs";
import { renderEvidenceImageRegistry } from "./generate-evidence-image-registry.mjs";

const root = process.cwd();
const read = (relative) => fs.readFileSync(path.join(root, relative), "utf8");
const fail = (message) => { throw new Error(`State integrity audit: ${message}`); };
let milestoneDocument = process.env.ATLAS_AUDIT_MILESTONES_PATH
  ? fs.readFileSync(process.env.ATLAS_AUDIT_MILESTONES_PATH, "utf8")
  : read("docs/milestones.md");
if (process.argv.includes("--test-mismatch")) {
  milestoneDocument = milestoneDocument.replace(
    /^(\| 05 · [^|]+ \|) In Progress (\| Partially Validated \|)/m,
    "$1 Planned $2",
  );
}
const backlogDocument = read("docs/planning/BACKLOG.md");
const batchDocument = read("docs/planning/ACTIVE_BATCH.md");
const evidenceArtifacts = parseAtlasEvidenceIndex(root);
const evidenceRoot = path.join(root, "docs", "evidence");
const evidenceFiles = fs.readdirSync(evidenceRoot, { recursive: true, withFileTypes: true })
  .filter((entry) => entry.isFile() && entry.name.endsWith(".png"))
  .map((entry) => path.join(entry.parentPath, entry.name));
const indexedPaths = new Set(evidenceArtifacts.map((artifact) => path.resolve(root, artifact.canonicalPath)));
const unindexedEvidence = evidenceFiles.filter((file) => !indexedPaths.has(path.resolve(file)));
if (unindexedEvidence.length) fail(`published evidence is missing from the canonical index: ${unindexedEvidence.map((file) => path.relative(root, file)).join(", ")}`);
if (evidenceFiles.length !== evidenceArtifacts.length) fail(`evidence count mismatch: ${evidenceFiles.length} filesystem / ${evidenceArtifacts.length} index`);
const registryPath = path.join(root, "lib", "atlasEvidenceImages.generated.ts");
if (!fs.existsSync(registryPath) || fs.readFileSync(registryPath, "utf8") !== renderEvidenceImageRegistry(evidenceArtifacts)) fail("static evidence image registry is stale; run npm run evidence:generate");

const rows = [...milestoneDocument.matchAll(/^\| (\d{2}) · ([^|]+) \| ([^|]+) \| ([^|]+) \| ([^|]+) \| ([^|]+) \|$/gm)];
if (!rows.length) fail("no canonical milestone records found");
const milestoneIds = rows.map((row) => `M${row[1]}`);
if (new Set(milestoneIds).size !== milestoneIds.length) fail("duplicate milestone IDs");
const allowedStatuses = new Set(["Planned", "In Progress", "Complete"]);
const allowedValidation = new Set(["Not Validated", "Partially Validated", "Validated"]);
for (const row of rows) {
  if (!allowedStatuses.has(row[3].trim())) fail(`invalid status for M${row[1]}: ${row[3].trim()}`);
  if (!allowedValidation.has(row[4].trim())) fail(`invalid validation state for M${row[1]}: ${row[4].trim()}`);
}

const details = [...milestoneDocument.matchAll(/^## (M\d{2}) — [^\r\n]+\r?\n+([\s\S]*?)(?=\r?\n## |(?![\s\S]))/gm)];
const current = details.filter((detail) => /^\*\*Current:\*\* Yes\r?$/m.test(detail[2]));
if (current.length !== 1) fail(`expected one current milestone, found ${current.length}`);
const fields = Object.fromEntries([...current[0][2].matchAll(/^\*\*([^*]+):\*\*\s*(.+)$/gm)].map((match) => [match[1].trim(), match[2].trim()]));
for (const field of ["Current Phase", "Completed Work", "Completed Foundation", "Active Work", "Next Objective", "Evidence", "Boundary"]) {
  if (!fields[field]) fail(`${current[0][1]} missing ${field}`);
}
const currentRow = rows.find((row) => `M${row[1]}` === current[0][1]);
if (!currentRow) fail("current milestone is missing from table");
if (currentRow[3].trim() !== "In Progress") fail(`${current[0][1]} must render In Progress`);
if (currentRow[4].trim() !== "Partially Validated") fail(`${current[0][1]} must remain Partially Validated`);

const backlog = new Map([...backlogDocument.matchAll(/^## (ATL-\d{3}) — ([^\r\n]+)\r?\n+([\s\S]*?)(?=\r?\n## |(?![\s\S]))/gm)].map((match) => {
  const status = match[3].match(/^\*\*Status:\*\*\s*(.+)$/m)?.[1].trim();
  return [match[1], { title: match[2].trim(), status }];
}));
const batchId = batchDocument.match(/^\*\*Batch ID:\*\*\s*(.+)$/m)?.[1].trim();
const batchStatus = batchDocument.match(/^\*\*Status:\*\*\s*(.+)$/m)?.[1].trim();
const batchTasks = batchDocument.match(/^\*\*Included Tasks:\*\*\s*(.+)$/m)?.[1].match(/ATL-\d{3}/g) ?? [];
if (!batchId || (batchId !== "Unassigned" && !/^BATCH-\d{3}$/.test(batchId))) fail("invalid Active Batch ID");
const activeBatchIsEmpty = batchId === "Unassigned";
if (activeBatchIsEmpty && batchStatus !== "Empty") fail("Unassigned Active Batch must have Empty status");
if (!activeBatchIsEmpty && !["In Progress", "Review"].includes(batchStatus)) fail(`${batchId} is not In Progress or Review`);
for (const id of batchTasks) if (!backlog.has(id)) fail(`${batchId} references missing backlog item ${id}`);
const completed = fields["Completed Work"].match(/ATL-\d{3}/g) ?? [];
for (const id of completed) if (backlog.get(id)?.status !== "Done") fail(`completed work ${id} is not Done`);
const activeTasks = fields["Active Work"].match(/ATL-\d{3}/g) ?? [];
const activeBatches = fields["Active Work"].match(/BATCH-\d{3}/g) ?? [];
if (activeBatchIsEmpty && fields["Active Work"] !== "None") fail("empty Active Batch requires milestone Active Work: None");
if (!activeBatchIsEmpty && (activeBatches.length !== 1 || activeBatches[0] !== batchId)) fail("milestone Active Work batch disagrees with ACTIVE_BATCH.md");
if (activeTasks.join() !== batchTasks.join()) fail("milestone Active Work tasks disagree with ACTIVE_BATCH.md");
if (!fs.existsSync(path.join(root, "docs", fields.Evidence))) fail(`missing evidence path ${fields.Evidence}`);

const activeConsumers = [
  "app/page.tsx", "app/projects/page.tsx", "app/projects/atlas/page.tsx", "app/planning/page.tsx",
  "components/AtlasConsoleHome.tsx", "components/AtlasConsoleShell.tsx", "components/AtlasEvidenceBrowser.tsx", "components/AtlasPipeline.tsx", "components/AtlasProjectExplorer.tsx",
];
const stalePhrases = [/implementation has not begun/i, /no validation evidence exists/i, /05 planned/i, /milestone 05[^\n]*planned/i];
for (const file of activeConsumers) {
  const source = read(file);
  for (const phrase of stalePhrases) if (phrase.test(source)) fail(`${file} contains stale state phrase ${phrase}`);
}
for (const file of ["app/page.tsx", "app/projects/page.tsx", "app/projects/atlas/page.tsx", "app/planning/page.tsx"]) {
  const source = read(file);
  if (!source.includes("AtlasProjectState") && !source.includes("getAtlasProjectState") && file !== "app/page.tsx") fail(`${file} does not consume canonical project state`);
}
if (fs.existsSync(path.join(root, "data", "atlasProject.ts"))) fail("legacy duplicate milestone data file still exists");
const atlasPage = read("app/projects/atlas/page.tsx");
const evidenceBrowser = read("components/AtlasEvidenceBrowser.tsx");
if (!atlasPage.includes("artifacts={projectState.evidenceArtifacts}") || !evidenceBrowser.includes("artifacts.filter") || !evidenceBrowser.includes("artifacts: AtlasEvidenceArtifact[]")) fail("Atlas page does not render the canonical evidence model");
if (/const\s+evidence\s*=\s*\[/.test(atlasPage) || atlasPage.includes("docs/evidence/")) fail("Atlas page contains a legacy hard-coded evidence inventory");
const projectStateSource = read("lib/atlasProjectState.ts");
if (!projectStateSource.includes("getAtlasEvidenceArtifacts") || !projectStateSource.includes("evidenceArtifacts")) fail("typed project state does not include canonical evidence artifacts");

console.log(`State integrity audit passed: ${current[0][1]} ${currentRow[3].trim()} / ${currentRow[4].trim()}, ${activeBatchIsEmpty ? "no active batch" : `${batchId} -> ${batchTasks.join(", ")}`}. Evidence: ${evidenceFiles.length} filesystem / ${evidenceArtifacts.length} index / ${evidenceArtifacts.length} model / ${evidenceArtifacts.length} UI source.`);
