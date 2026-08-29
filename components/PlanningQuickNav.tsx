const sections = [
  ["Current Milestone", "#current-milestone"],
  ["Active Batch", "#active-batch"],
  ["Backlog", "#backlog"],
  ["Idea Inbox", "#idea-inbox"],
  ["Proposals", "#planning-proposals"],
  ["Decisions", "#planning-decisions"],
  ["Lessons", "#planning-lessons"],
  ["Canonical Sources", "#planning-sources"],
] as const;

export default function PlanningQuickNav() {
  return <nav className="planning-quick-nav" aria-label="Planning quick navigation">{sections.map(([label, href]) => <a key={href} href={href}>{label}</a>)}</nav>;
}
