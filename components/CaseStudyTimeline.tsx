import StatusBadge, { type Status } from "./StatusBadge";

export type TimelineMilestone = {
  title: string;
  status: Status;
  statusLabel?: string;
  items: string[];
};

type CaseStudyTimelineProps = {
  milestones: TimelineMilestone[];
};

export default function CaseStudyTimeline({
  milestones,
}: CaseStudyTimelineProps) {
  return (
    <ol className="relative space-y-6 border-l border-white/15 pl-6 sm:pl-8">
      {milestones.map((milestone) => (
        <li key={milestone.title} className="relative">
          <span
            aria-hidden="true"
            className="absolute -left-[1.91rem] top-2 h-3 w-3 rounded-full border-2 border-black bg-green-400 sm:-left-[2.41rem]"
          />
          <article className="rounded-xl border border-white/10 bg-zinc-950 p-5 sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-lg font-semibold text-white">
                {milestone.title}
              </h3>
              <StatusBadge
                status={milestone.status}
                label={milestone.statusLabel}
              />
            </div>
            <ul className="mt-4 space-y-2 text-sm leading-6 text-gray-400">
              {milestone.items.map((item) => (
                <li key={item} className="flex gap-3">
                  <span aria-hidden="true" className="text-green-400">
                    —
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        </li>
      ))}
    </ol>
  );
}
