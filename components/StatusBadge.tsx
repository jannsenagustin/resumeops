import { type ProjectStatus } from "../data/projects";

export type Status = ProjectStatus;

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
    classes: "border-green-400/30 bg-green-400/10 text-green-300",
  },
  "configuration-complete": {
    label: "Configuration Complete",
    classes: "border-amber-400/30 bg-amber-400/10 text-amber-200",
  },
  roadmap: {
    label: "Roadmap",
    classes: "border-slate-500/30 bg-slate-500/10 text-slate-300",
  },
  validated: {
    label: "Validated",
    classes: "border-green-300/30 bg-green-300/10 text-green-200",
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
      className={`inline-flex w-fit rounded-full border px-3 py-1 text-xs font-medium ${config.classes} ${className}`}
    >
      {label ?? config.label}
    </span>
  );
}
