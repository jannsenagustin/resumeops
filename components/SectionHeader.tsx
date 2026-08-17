type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
  headingLevel?: "h1" | "h2";
};

export default function SectionHeader({
  eyebrow,
  title,
  description,
  headingLevel = "h2",
}: SectionHeaderProps) {
  const Heading = headingLevel;

  return (
    <div className="atlas-section-header max-w-2xl">
      <p className="atlas-eyebrow">
        {eyebrow}
      </p>
      <Heading className="atlas-section-title">
        {title}
      </Heading>
      <p className="atlas-section-description">
        {description}
      </p>
    </div>
  );
}
