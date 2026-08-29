import OnThisPageNav, { type OnThisPageGroup } from "./OnThisPageNav";

const groups = [
  { label: "Overview", links: [{ label: "Current Milestone", href: "#current-milestone" }, { label: "Active Batch", href: "#active-batch" }] },
  { label: "Planning", links: [{ label: "Backlog", href: "#backlog" }, { label: "Idea Inbox", href: "#idea-inbox" }, { label: "Proposals", href: "#planning-proposals" }] },
  { label: "Knowledge", links: [{ label: "Decisions", href: "#planning-decisions" }, { label: "Lessons", href: "#planning-lessons" }, { label: "Canonical Sources", href: "#planning-sources" }] },
] as const;

export default function PlanningQuickNav() {
  return <OnThisPageNav groups={groups satisfies readonly OnThisPageGroup[]} label="Planning page sections" />;
}
