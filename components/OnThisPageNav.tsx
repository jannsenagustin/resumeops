"use client";

import { useEffect, useMemo, useState } from "react";

export type OnThisPageGroup = {
  label: string;
  links: readonly { label: string; href: `#${string}` }[];
};

export default function OnThisPageNav({ groups, label }: { groups: readonly OnThisPageGroup[]; label: string }) {
  const sectionIds = useMemo(() => groups.flatMap((group) => group.links.map((link) => link.href.slice(1))), [groups]);
  const [activeId, setActiveId] = useState(sectionIds[0]);
  useEffect(() => {
    const sections = sectionIds.map((id) => document.getElementById(id)).filter((section): section is HTMLElement => Boolean(section));
    const observer = new IntersectionObserver((entries) => { const visible = entries.filter((entry) => entry.isIntersecting).sort((left, right) => right.intersectionRatio - left.intersectionRatio)[0]; if (visible) setActiveId(visible.target.id); }, { rootMargin: "-15% 0px -70%", threshold: [0, .2, .6] });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [sectionIds]);
  return <nav className="on-this-page" aria-label={label}><p>On This Page</p><div>{groups.map((group) => <section key={group.label} aria-labelledby={`on-this-page-${group.label.toLowerCase().replaceAll(" ", "-")}`}><h2 id={`on-this-page-${group.label.toLowerCase().replaceAll(" ", "-")}`}>{group.label}</h2><ul>{group.links.map((link) => { const target = link.href.slice(1); return <li key={link.href}><a href={link.href} aria-current={activeId === target ? "location" : undefined}>{link.label}</a></li>; })}</ul></section>)}</div></nav>;
}
