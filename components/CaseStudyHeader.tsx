import StatusBadge, { type Status } from "./StatusBadge";

type CaseStudyHeaderProps = {
  subtitle?: string;
  title: string;
  status: Status;
  featured?: boolean;
};

export default function CaseStudyHeader({
  subtitle,
  title,
  status,
  featured = false,
}: CaseStudyHeaderProps) {
  return (
    <div
      className={
        featured
          ? "flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between"
          : ""
      }
    >
      <div>
        {subtitle && (
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-green-400">
            {subtitle}
          </p>
        )}

        <h3
          className={`font-bold tracking-tight text-white ${
            featured ? "text-3xl sm:text-4xl" : "text-2xl"
          }`}
        >
          {title}
        </h3>
      </div>

      <StatusBadge status={status} className="mt-5 sm:mt-0" />
    </div>
  );
}
