export type EngineeringDecision = {
  id: string;
  title: string;
  reason: string;
};

type DecisionCardProps = {
  decision: EngineeringDecision;
};

export default function DecisionCard({ decision }: DecisionCardProps) {
  return (
    <article className="rounded-xl border border-white/10 bg-zinc-950 p-5 sm:p-6">
      <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-green-400">
        Decision {decision.id}
      </p>
      <h3 className="mt-3 text-xl font-semibold text-white">
        {decision.title}
      </h3>
      <p className="mt-4 text-sm leading-7 text-gray-400">{decision.reason}</p>
    </article>
  );
}
