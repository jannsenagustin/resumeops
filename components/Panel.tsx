import type { ElementType, ReactNode } from "react";
import type { AtlasStatusTone } from "../lib/atlasStatus";

export type PanelStatus = AtlasStatusTone | "planned" | "failed";

type PanelProps = {
  id?: string;
  children: ReactNode;
  title?: string;
  eyebrow?: string;
  metadata?: ReactNode;
  footer?: ReactNode;
  status?: PanelStatus;
  selected?: boolean;
  className?: string;
  as?: ElementType;
  headingLevel?: "h2" | "h3";
};

export default function Panel({
  id,
  children,
  title,
  eyebrow,
  metadata,
  footer,
  status,
  selected = false,
  className = "",
  as: Component = "section",
  headingLevel = "h3",
}: PanelProps) {
  const Heading = headingLevel;
  const variants = [
    status ? `atlas-panel--${status}` : "",
    selected ? "atlas-panel--selected" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Component id={id} className={`atlas-panel ${variants}`}>
      {(eyebrow || title || metadata) && (
        <header className="atlas-panel__header">
          <div>
            {eyebrow && <p className="atlas-panel__eyebrow">{eyebrow}</p>}
            {title && <Heading className="atlas-panel__title">{title}</Heading>}
          </div>
          {metadata && <div className="atlas-panel__metadata">{metadata}</div>}
        </header>
      )}
      <div className="atlas-panel__body">{children}</div>
      {footer && <footer className="atlas-panel__footer">{footer}</footer>}
    </Component>
  );
}
