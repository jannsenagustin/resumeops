import fs from "node:fs";
import path from "node:path";

const artifactHeading = "## Canonical Artifact Index";
const nextHeading = "## Excluded Captures";
const canonicalFilename = /^m(?<milestone>\d{2})-(?:atl-(?<atl>\d{3})-)?(?<subject>[a-z0-9]+(?:-[a-z0-9]+)*)-(?<sequence>\d{2})\.png$/;
const knownComponents = ["atlas-search-head", "atlas-indexer", "windows-uf", "windows", "rocky", "docker"];

function unwrapCode(value) {
  const match = value.match(/^`([^`]+)`$/);
  return match?.[1] ?? value;
}

function parseArtifactLink(value) {
  const match = value.match(/^\[Artifact\]\(([^)]+)\)$/);
  if (!match) throw new Error(`invalid canonical artifact link: ${value}`);
  return match[1];
}

function componentFromSubject(subject) {
  return knownComponents.find((component) => subject === component || subject.startsWith(`${component}-`)) ?? subject.split("-")[0];
}

export function parseAtlasEvidenceIndex(root = process.cwd()) {
  const evidenceRoot = path.join(root, "docs", "evidence");
  const indexPath = path.join(evidenceRoot, "README.md");
  const document = fs.readFileSync(indexPath, "utf8");
  const start = document.indexOf(artifactHeading);
  const end = document.indexOf(nextHeading, start + artifactHeading.length);
  if (start < 0 || end < 0) throw new Error("Evidence index is missing its canonical artifact table boundary");

  const tableLines = document.slice(start + artifactHeading.length, end).split(/\r?\n/).filter((line) => line.startsWith("|"));
  if (tableLines.length < 3) throw new Error("Evidence index contains no canonical artifact rows");
  const header = tableLines[0].split("|").slice(1, -1).map((cell) => cell.trim());
  const expectedHeader = ["Filename", "Milestone", "Batch", "ATL", "Short description", "Validation purpose", "Review", "Canonical path"];
  if (header.join("|") !== expectedHeader.join("|")) throw new Error(`Evidence index header is malformed: ${header.join(" | ")}`);

  const artifacts = tableLines.slice(2).map((line, index) => {
    const cells = line.split("|").slice(1, -1).map((cell) => cell.trim());
    if (cells.length !== expectedHeader.length) throw new Error(`Evidence index row ${index + 1} has ${cells.length} columns; expected ${expectedHeader.length}`);
    const [filenameCell, milestone, batch, atlTask, shortDescription, validationPurpose, reviewState, linkCell] = cells;
    const filename = unwrapCode(filenameCell);
    const relativePath = parseArtifactLink(linkCell);
    const filenameMatch = filename.match(canonicalFilename);
    if (!filenameMatch?.groups) throw new Error(`Evidence filename violates the canonical convention: ${filename}`);
    if (path.basename(relativePath) !== filename) throw new Error(`Evidence index filename/path mismatch: ${filename} -> ${relativePath}`);
    if (milestone !== `M${filenameMatch.groups.milestone}`) throw new Error(`Evidence milestone/filename mismatch: ${filename} -> ${milestone}`);
    const filenameAtl = filenameMatch.groups.atl ? `ATL-${filenameMatch.groups.atl}` : "Pre-ATL";
    if (atlTask !== filenameAtl) throw new Error(`Evidence ATL/filename mismatch: ${filename} -> ${atlTask}`);
    if (batch !== "Pre-batch" && !/^BATCH-\d{3}$/.test(batch)) throw new Error(`Evidence row uses an invalid batch: ${filename} -> ${batch}`);
    if (reviewState !== "Reviewed") throw new Error(`Published evidence must be Reviewed: ${filename} -> ${reviewState}`);
    if (!shortDescription || !validationPurpose) throw new Error(`Evidence row is missing descriptive metadata: ${filename}`);
    const absolutePath = path.resolve(evidenceRoot, relativePath);
    if (!absolutePath.startsWith(`${evidenceRoot}${path.sep}`) || !fs.existsSync(absolutePath)) throw new Error(`Evidence artifact does not resolve inside docs/evidence: ${relativePath}`);
    return {
      id: filename.replace(/\.png$/, ""),
      filename,
      canonicalPath: `docs/evidence/${relativePath.replaceAll("\\", "/")}`,
      relativePath: relativePath.replaceAll("\\", "/"),
      milestone,
      batch,
      atlTask,
      shortDescription: unwrapCode(shortDescription),
      validationPurpose: unwrapCode(validationPurpose),
      reviewState,
      component: componentFromSubject(filenameMatch.groups.subject),
      sequence: Number(filenameMatch.groups.sequence),
      order: index,
    };
  });

  const duplicate = artifacts.find((artifact, index) => artifacts.findIndex((candidate) => candidate.filename === artifact.filename || candidate.canonicalPath === artifact.canonicalPath) !== index);
  if (duplicate) throw new Error(`Duplicate canonical evidence artifact: ${duplicate.filename}`);
  return artifacts;
}
