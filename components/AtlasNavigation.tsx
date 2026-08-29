import Link from "next/link";

const destinations = [
  { id: "console", label: "Console / Home", href: "/" },
  { id: "atlas", label: "Atlas", href: "/projects/atlas/" },
  { id: "planning", label: "Planning", href: "/planning/" },
] as const;

export type AtlasDestination = (typeof destinations)[number]["id"];

export default function AtlasNavigation({ active, onNavigate }: { active: AtlasDestination; onNavigate?: () => void }) {
  return <nav className="atlas-global-nav" aria-label="Atlas Navigation"><h2>Atlas Navigation</h2><ul>{destinations.map((destination) => <li key={destination.id}><Link href={destination.href} aria-current={active === destination.id ? "page" : undefined} onClick={onNavigate}><span>{destination.label}</span>{active === destination.id && <small>Current</small>}</Link></li>)}</ul></nav>;
}
