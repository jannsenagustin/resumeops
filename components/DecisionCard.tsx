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
    <article className="atlas-panel motion-card p-5 sm:p-6">
      <p className="atlas-eyebrow">
        Decision {decision.id}
      </p>
      <h3 className="mt-3 text-xl font-semibold text-white">
        {decision.title}
      </h3>
      <p className="mt-4 text-sm leading-7 text-gray-400">{decision.reason}</p>
    </article>
  );
}
