import { type CaseStudyStatus } from "../data/caseStudies";

export type Status = CaseStudyStatus;

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
  active: {
    label: "Active Development",
    classes: "border-green-400/30 bg-green-400/10 text-green-300",
  },
  planned: {
    label: "Planned",
    classes: "border-slate-500/30 bg-slate-500/10 text-slate-300",
  },
  complete: {
    label: "Complete",
    classes: "border-green-300/30 bg-green-300/10 text-green-200",
  },
  archived: {
    label: "Archived",
    classes: "border-gray-600/30 bg-gray-600/10 text-gray-400",
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
