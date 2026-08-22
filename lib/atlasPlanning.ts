import fs from "node:fs";
import path from "node:path";
import type {
  ActiveBatch,
  AtlasPlanningData,
  BacklogItem,
  Decision,
  Idea,
  Lesson,
  PlanningPriority,
  Proposal,
} from "./atlasPlanningTypes";

const repositoryRoot = "https://github.com/jannsenagustin/resumeops/blob/main";
const documentsRoot = path.join(/* turbopackIgnore: true */ process.cwd(), "docs");
const planningDirectory = path.join(documentsRoot, "planning");
const proposalsDirectory = path.join(documentsRoot, "engineering-proposals");

export const canonicalPlanningSources = [
  ["Planning README", `${repositoryRoot}/docs/planning/README.md`],
  ["Idea Inbox", `${repositoryRoot}/docs/planning/IDEAS.md`],
  ["Backlog", `${repositoryRoot}/docs/planning/BACKLOG.md`],
  ["Active Batch", `${repositoryRoot}/docs/planning/ACTIVE_BATCH.md`],
  ["Decisions", `${repositoryRoot}/docs/planning/DECISIONS.md`],
  ["Lessons Learned", `${repositoryRoot}/docs/planning/LESSONS_LEARNED.md`],
  ["Engineering Proposals", `${repositoryRoot}/docs/engineering-proposals/README.md`],
  ["Execution Reports", `${repositoryRoot}/docs/execution-reports/README.md`],
] as const;

function readPlanningDocument(filename: string) {
  return fs.readFileSync(path.join(planningDirectory, filename), "utf8");
}

function parseFields(body: string) {
  return Object.fromEntries(
    [...body.matchAll(/^\*\*([^*]+):\*\*\s*([^\r\n]*)/gm)].map((match) => [
      match[1].trim().toLowerCase(),
      match[2].trim(),
    ]),
  );
}

function parseHeadingSections(document: string, pattern: RegExp) {
  const matches = [...document.matchAll(pattern)];
  return matches.map((match, index) => ({
    id: match[1],
    title: match[2].trim(),
    body: document.slice(match.index! + match[0].length, matches[index + 1]?.index ?? document.length),
  }));
}

function githubAnchor(id: string, title: string) {
  const heading = `${id} ${title}`.toLowerCase().replace(/[—–]/g, "");
  return heading.replace(/[^\p{L}\p{N}\s-]/gu, "").trim().replace(/\s/g, "-");
}

function sectionText(body: string, heading: string) {
  const escaped = heading.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return body.match(new RegExp(`## ${escaped}\\s+([\\s\\S]*?)(?=\\n## |$)`))?.[1].trim() ?? "";
}

function subsectionText(body: string, heading: string) {
  const escaped = heading.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return body.match(new RegExp(`### ${escaped}\\s+([\\s\\S]*?)(?=\\n### |$)`))?.[1].trim() ?? "";
}

function parseBacklog() {
  const document = readPlanningDocument("BACKLOG.md");
  return parseHeadingSections(document, /^## (ATL-\d{3}) — ([^\r\n]+)/gm).map(({ id, title, body }) => {
    const fields = parseFields(body);
    return {
      id,
      title,
      categories: fields.category.split(";").map((category) => category.trim()),
      milestone: fields.milestone,
      priority: fields.priority as PlanningPriority,
      status: fields.status,
      description: fields.description,
      whyItMatters: fields["why it matters"],
      dependencies: fields.dependencies,
      acceptanceCriteria: fields["acceptance criteria"],
      humanValidationRequired: fields["human validation required"],
      source: fields["source or related proposal"],
      notes: fields.notes,
      sourceUrl: `${repositoryRoot}/docs/planning/BACKLOG.md#${githubAnchor(id, title)}`,
    } satisfies BacklogItem;
  });
}

function parseProposals() {
  return fs.readdirSync(proposalsDirectory)
    .filter((filename) => /^EP-\d{3}-.+\.md$/.test(filename))
    .sort()
    .map((filename) => {
      const document = fs.readFileSync(path.join(proposalsDirectory, filename), "utf8");
      const heading = document.match(/^# (EP-\d{3}) — ([^\r\n]+)/m);
      if (!heading) throw new Error(`Invalid proposal heading in ${filename}`);
      const fields = parseFields(document);
      return {
        id: heading[1],
        title: heading[2].trim(),
        status: fields.status,
        origin: fields.origin,
        problem: sectionText(document, "Problem"),
        recommendation: sectionText(document, "Recommendation"),
        sourceUrl: `${repositoryRoot}/docs/engineering-proposals/${filename}`,
      } satisfies Proposal;
    });
}

function parseIdeas() {
  const document = readPlanningDocument("IDEAS.md");
  const sections = parseHeadingSections(document, /^## (IDEA-\d{3}) — ([^\r\n]+)/gm);
  const ids = new Set<string>();
  const approvedStatuses = new Set<Idea["status"]>(["New", "Reviewing", "Promoted", "Archived"]);
  const requiredFields = ["category", "date recorded", "origin", "status", "potential destination", "related proposal", "related backlog"];

  if (sections.length === 0) throw new Error("IDEAS.md contains no IDEA-NNN records");

  return sections.map(({ id, title, body }) => {
    const fields = parseFields(body);
    const missingFields = requiredFields.filter((field) => !fields[field]);
    const description = subsectionText(body, "Description");
    const whyItMightMatter = subsectionText(body, "Why It Might Matter");
    const notes = subsectionText(body, "Notes");

    if (ids.has(id)) throw new Error(`Duplicate idea identifier: ${id}`);
    ids.add(id);
    if (missingFields.length > 0) throw new Error(`${id} is missing required fields: ${missingFields.join(", ")}`);
    if (!description || !whyItMightMatter || !notes) throw new Error(`${id} is missing Description, Why It Might Matter, or Notes content`);
    if (!approvedStatuses.has(fields.status as Idea["status"])) throw new Error(`${id} uses invalid idea status: ${fields.status}`);

    return {
      id,
      title,
      category: fields.category,
      dateRecorded: fields["date recorded"],
      origin: fields.origin,
      description,
      whyItMightMatter,
      status: fields.status as Idea["status"],
      potentialDestination: fields["potential destination"],
      relatedProposal: fields["related proposal"],
      relatedBacklog: fields["related backlog"],
      notes,
      sourceUrl: `${repositoryRoot}/docs/planning/IDEAS.md`,
    } satisfies Idea;
  });
}

function parseDecisions() {
  const document = readPlanningDocument("DECISIONS.md");
  return parseHeadingSections(document, /^## (DEC-\d{3}) — ([^\r\n]+)/gm).map(({ id, title, body }) => {
    const fields = parseFields(body);
    return {
      id,
      title,
      decision: fields.decision,
      status: fields.status,
      sourceUrl: `${repositoryRoot}/docs/planning/DECISIONS.md#${githubAnchor(id, title)}`,
    } satisfies Decision;
  });
}

function parseLessons() {
  const document = readPlanningDocument("LESSONS_LEARNED.md");
  return parseHeadingSections(document, /^## (LESSON-\d{3}) — ([^\r\n]+)/gm).map(({ id, title, body }) => {
    const fields = parseFields(body);
    return {
      id,
      title,
      reusableLesson: fields["reusable lesson"],
      status: fields.status,
      sourceUrl: `${repositoryRoot}/docs/planning/LESSONS_LEARNED.md#${githubAnchor(id, title)}`,
    } satisfies Lesson;
  });
}

function parseActiveBatch() {
  const fields = parseFields(readPlanningDocument("ACTIVE_BATCH.md"));
  return {
    batchId: fields["batch id"],
    status: fields.status,
    objective: fields.objective,
    includedTasks: fields["included tasks"],
    dependencies: fields.dependencies,
    humanValidationRequired: fields["human validation required"],
    sourceUrl: `${repositoryRoot}/docs/planning/ACTIVE_BATCH.md`,
  } satisfies ActiveBatch;
}

export function getAtlasPlanningData(): AtlasPlanningData {
  return {
    backlog: parseBacklog(),
    ideas: parseIdeas(),
    proposals: parseProposals(),
    decisions: parseDecisions(),
    lessons: parseLessons(),
    activeBatch: parseActiveBatch(),
  };
}
