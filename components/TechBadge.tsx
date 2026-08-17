type TechBadgeProps = {
  technology: string;
};

export default function TechBadge({ technology }: TechBadgeProps) {
  return (
    <span className="atlas-metadata-chip motion-badge">
      {technology}
    </span>
  );
}
