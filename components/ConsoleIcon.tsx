import type { SVGProps } from "react";

export type ConsoleIconName =
  | "activity" | "network" | "flag" | "evidence" | "file" | "briefcase"
  | "server" | "resume" | "repository" | "monitor" | "transfer"
  | "database" | "search" | "upload" | "boxes" | "lightbulb";

const paths: Record<ConsoleIconName, React.ReactNode> = {
  activity: <><path d="M3 12h4l2-7 4 14 2-7h6" /></>,
  network: <><rect x="3" y="3" width="6" height="6" rx="1" /><rect x="15" y="15" width="6" height="6" rx="1" /><path d="M9 6h6a3 3 0 0 1 3 3v6M15 18H9a3 3 0 0 1-3-3V9" /></>,
  flag: <><path d="M5 21V4m0 0h11l-1.5 4L16 12H5" /></>,
  evidence: <><path d="M3 7h7l2 2h9v10H3z" /><path d="m9 14 2 2 4-4" /></>,
  file: <><path d="M6 2h8l4 4v16H6z" /><path d="M14 2v5h5M9 12h6M9 16h6" /></>,
  briefcase: <><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M8 7V4h8v3M3 12h18M10 12v2h4v-2" /></>,
  server: <><rect x="3" y="4" width="18" height="6" rx="1" /><rect x="3" y="14" width="18" height="6" rx="1" /><path d="M7 7h.01M7 17h.01" /></>,
  resume: <><path d="M6 2h8l4 4v16H6z" /><circle cx="12" cy="11" r="2" /><path d="M9 17c.7-2 5.3-2 6 0M14 2v5h5" /></>,
  repository: <><circle cx="6" cy="5" r="2" /><circle cx="18" cy="6" r="2" /><circle cx="6" cy="19" r="2" /><path d="M6 7v10M8 6h4a6 6 0 0 1 6 6v-4" /></>,
  monitor: <><rect x="3" y="4" width="18" height="13" rx="2" /><path d="M8 21h8M12 17v4" /></>,
  transfer: <><path d="m7 7-4 4 4 4M3 11h14M17 17l4-4-4-4M21 13H7" /></>,
  database: <><ellipse cx="12" cy="5" rx="8" ry="3" /><path d="M4 5v7c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 12v7c0 1.7 3.6 3 8 3s8-1.3 8-3v-7" /></>,
  search: <><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 5 5" /></>,
  upload: <><rect x="3" y="14" width="18" height="7" rx="1" /><path d="M12 16V3m0 0L7 8m5-5 5 5" /></>,
  boxes: <><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /></>,
  lightbulb: <><path d="M9 18h6M10 22h4M8.5 14.5A6 6 0 1 1 15.5 14.5c-1 .7-1.5 1.5-1.5 2.5h-4c0-1-.5-1.8-1.5-2.5Z" /></>,
};

export default function ConsoleIcon({ name, className, ...props }: { name: ConsoleIconName } & SVGProps<SVGSVGElement>) {
  return <svg className={["console-icon", className].filter(Boolean).join(" ")} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>{paths[name]}</svg>;
}
