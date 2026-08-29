"use client";

import { useState, type SyntheticEvent } from "react";

export default function PlanningSources({ sources }: { sources: readonly (readonly [string, string])[] }) {
  const [expanded, setExpanded] = useState(false);
  return <details className="planning-sources__disclosure" open={expanded} onToggle={(event: SyntheticEvent<HTMLDetailsElement>) => setExpanded(event.currentTarget.open)}><summary aria-expanded={expanded}><span>Canonical Sources</span><small>{sources.length} repository documents</small></summary><ul>{sources.map(([label, href], index) => <li key={href}><a href={href} target="_blank" rel="noopener noreferrer"><span>{String(index + 1).padStart(2, "0")}</span>{label}<b>↗</b></a></li>)}</ul></details>;
}
