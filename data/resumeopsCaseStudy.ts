import { type ArchitectureNode } from "../components/ArchitectureDiagram";
import { type CaseStudyNavItem } from "../components/CaseStudyNav";
import { type TimelineMilestone } from "../components/CaseStudyTimeline";
import { type EngineeringDecision } from "../components/DecisionCard";
import { type EngineeringLesson } from "../components/LessonCard";

export type WorkflowStep = {
  owner: string;
  step: string;
  detail: string;
};

export type RoadmapCategory = "Website" | "Planned Splunk case study";

export type RoadmapItem = {
  label: string;
  category: RoadmapCategory;
};

export const resumeOpsNavigationItems: CaseStudyNavItem[] = [
  { label: "Overview", href: "#overview" },
  { label: "Architecture", href: "#architecture" },
  { label: "Development Workflow", href: "#workflow" },
  { label: "Sprint Timeline", href: "#timeline" },
  { label: "Engineering Decisions", href: "#decisions" },
  { label: "Lessons Learned", href: "#lessons" },
  { label: "Future Roadmap", href: "#roadmap" },
];

export const resumeOpsTechnologies = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "GitHub Actions",
  "GitHub Pages",
];

export const resumeOpsHomepageArchitecture: ArchitectureNode = {
  label: "Homepage",
  children: [
    { label: "Navbar" },
    { label: "Hero" },
    { label: "Why I Build" },
    { label: "Engineering Case Studies" },
    { label: "Professional Experience", planned: true },
    { label: "Career Journey", planned: true },
    { label: "Contact", planned: true },
  ],
};

export const resumeOpsComponentArchitecture: ArchitectureNode = {
  label: "app/page.tsx",
  children: [
    { label: "Navbar" },
    { label: "Hero" },
    { label: "WhyIBuild" },
    {
      label: "Projects",
      children: [
        { label: "SectionHeader" },
        {
          label: "ProjectCard",
          children: [
            {
              label: "CaseStudyHeader",
              children: [{ label: "StatusBadge" }],
            },
            { label: "TechBadge" },
            { label: "ActionButton" },
          ],
        },
      ],
    },
  ],
};

export const resumeOpsWorkflow: WorkflowStep[] = [
  {
    owner: "Jannsen",
    step: "Product direction and approval",
    detail: "Defines priorities, approves product direction, and owns the result.",
  },
  {
    owner: "ChatGPT",
    step: "Architecture and Codex prompt design",
    detail: "Translates approved direction into scoped architecture and constraints.",
  },
  {
    owner: "Codex",
    step: "Implementation and validation",
    detail: "Implements the scoped change and runs the required automated checks.",
  },
  {
    owner: "Jannsen",
    step: "Local testing",
    detail: "Tests behavior and presentation in the local development environment.",
  },
  {
    owner: "ChatGPT and Jannsen",
    step: "Code and UI review",
    detail: "Review the implementation against intent, quality, and usability.",
  },
  {
    owner: "Project workflow",
    step: "Git commit and changelog update",
    detail: "Records a focused checkpoint and documents the completed milestone.",
  },
  {
    owner: "GitHub Actions",
    step: "GitHub Pages deployment",
    detail: "Builds and publishes the approved static site.",
  },
];

export const resumeOpsMilestones: TimelineMilestone[] = [
  {
    title: "Sprint 1 — Component Cleanup",
    status: "complete",
    items: [
      "Removed learning-only components",
      "Simplified the homepage",
      "Extracted Navbar, Hero, and Projects into reusable components",
    ],
  },
  {
    title: "Sprint 2 — Why I Build",
    status: "complete",
    items: [
      "Added the engineering philosophy section",
      "Established the ChatGPT → Codex → review workflow",
    ],
  },
  {
    title: "Sprint 3 — Project Showcase System",
    status: "complete",
    items: [
      "Created a featured ResumeOps card",
      "Added planned Splunk engineering work",
      "Introduced typed project data and reusable project cards",
    ],
  },
  {
    title: "Sprint 3.1 — Engineering Case Studies",
    status: "complete",
    items: [
      "Reframed Projects as Engineering Case Studies",
      "Positioned ResumeOps as an active case study",
      "Kept future labs clearly marked as planned",
    ],
  },
  {
    title: "Sprint 3.5 — Foundation Design System",
    status: "complete",
    items: [
      "Added shared section headers, status badges, technology badges, action buttons, and case-study header components",
      "Reduced duplicated styling and markup",
    ],
  },
  {
    title: "Sprint 4 — ResumeOps Case Study",
    status: "active",
    statusLabel: "In Progress",
    items: [
      "Building the first full documentation-style engineering case study",
    ],
  },
];

export const resumeOpsDecisions: EngineeringDecision[] = [
  {
    id: "001",
    title: "Technical Portfolio Instead of Chronological Resume",
    reason:
      "ResumeOps should emphasize technical work, documented labs, and engineering ability rather than reproduce an entire employment history.",
  },
  {
    id: "002",
    title: "Career Journey Separate from Professional Experience",
    reason:
      "Accenture and future technical roles belong in Professional Experience. Walmart and Trenton may be represented later as part of a Career Journey focused on resilience and relocation rather than technical credentials.",
  },
  {
    id: "003",
    title: "Why I Build Before Case Studies",
    reason:
      "Visitors should understand the engineering motivation before viewing the work.",
  },
  {
    id: "004",
    title: "Engineering Case Studies Instead of Project List",
    reason:
      "Engineering work should document architecture, implementation, troubleshooting, decisions, and lessons learned rather than only display a title and technology list.",
  },
  {
    id: "005",
    title: "Reusable Design System",
    reason:
      "Shared components improve consistency and reduce duplication as the portfolio grows.",
  },
  {
    id: "006",
    title: "AI-Assisted Development with Human Review",
    reason:
      "ChatGPT and Codex accelerate planning and implementation, while Jannsen retains product ownership, tests the result, and approves changes.",
  },
];

export const resumeOpsLessons: EngineeringLesson[] = [
  {
    title: "Component composition",
    description:
      "Small, focused components make complex pages easier to assemble without coupling content to one layout.",
  },
  {
    title: "Typed data models",
    description:
      "Typed project and timeline data keeps repeated content consistent and exposes mistakes during validation.",
  },
  {
    title: "Reusable design systems",
    description:
      "Shared headers, badges, and actions reduce styling drift as new case studies are added.",
  },
  {
    title: "Git checkpoints and focused commits",
    description:
      "Small checkpoints make each milestone easier to review, explain, and recover.",
  },
  {
    title: "Documentation-first engineering",
    description:
      "Recording architecture and decisions makes the implementation easier to maintain and discuss.",
  },
  {
    title: "Writing constrained implementation prompts",
    description:
      "Clear scope, acceptance criteria, and validation steps produce more predictable implementation work.",
  },
  {
    title: "Validating AI-generated work",
    description:
      "Generated changes still require linting, builds, local testing, and human review before approval.",
  },
  {
    title: "Separating product decisions from implementation tasks",
    description:
      "Product ownership determines what should be built; implementation planning determines how to build it safely.",
  },
];

export const resumeOpsRoadmap: RoadmapItem[] = [
  { label: "Complete ResumeOps version 1", category: "Website" },
  { label: "Professional Experience section", category: "Website" },
  { label: "Career Journey section", category: "Website" },
  { label: "Enterprise Splunk Home Lab", category: "Planned Splunk case study" },
  { label: "Detection Engineering", category: "Planned Splunk case study" },
  { label: "Splunk App Development", category: "Planned Splunk case study" },
  { label: "CI/CD for Splunk", category: "Planned Splunk case study" },
  { label: "Splunk SOAR Home Lab", category: "Planned Splunk case study" },
];

export const resumeOpsOverviewPurposes = [
  "Showcase completed engineering work",
  "Document future Splunk and observability labs",
  "Record architectural and design decisions",
  "Demonstrate an organized development process",
  "Prepare material for technical interviews",
];
