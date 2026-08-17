import { type ProjectStatus } from "../data/projects";

export type Status =
  | ProjectStatus
  | "planned"
  | "future"
  | "failed"
  | "active"
  | "inactive";

type StatusBadgeProps = {
  status: Status;
  label?: string;
  className?: string;
};

const statusConfig: Record<
  Status,
  {
    label: string;
    classes: string;
  }
> = {
  "in-progress": {
    label: "In Progress",
    classes: "atlas-status--active",
  },
  "configuration-complete": {
    label: "Configuration Complete",
    classes: "atlas-status--planned",
  },
  roadmap: {
    label: "Roadmap",
    classes: "atlas-status--future",
  },
  validated: {
    label: "Validated",
    classes: "atlas-status--validated",
  },
  planned: {
    label: "Planned",
    classes: "atlas-status--planned",
  },
  future: {
    label: "Future",
    classes: "atlas-status--future",
  },
  failed: {
    label: "Failed",
    classes: "atlas-status--failed",
  },
  active: {
    label: "Active",
    classes: "atlas-status--active",
  },
  inactive: {
    label: "Inactive",
    classes: "atlas-status--inactive",
  },
};

export default function StatusBadge({
  status,
  label,
  className = "",
}: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <span
      className={`atlas-status ${config.classes} ${className}`}
    >
      {label ?? config.label}
    </span>
  );
}
