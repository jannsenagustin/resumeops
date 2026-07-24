type TechBadgeProps = {
  technology: string;
};

export default function TechBadge({ technology }: TechBadgeProps) {
  return (
    <span className="inline-flex rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-gray-300">
      {technology}
    </span>
  );
}
