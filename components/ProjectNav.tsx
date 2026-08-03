"use client";

import { useEffect, useState } from "react";

export type ProjectNavItem = {
  label: string;
  href: `#${string}`;
};

type ProjectNavProps = {
  items: ProjectNavItem[];
};

export default function ProjectNav({ items }: ProjectNavProps) {
  const [activeHref, setActiveHref] = useState(items[0]?.href);

  useEffect(() => {
    const sections = items
      .map((item) => document.querySelector<HTMLElement>(item.href))
      .filter((section): section is HTMLElement => Boolean(section));

    const observer = new IntersectionObserver(
      (entries) => {
        const activeEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];

        if (activeEntry) setActiveHref(`#${activeEntry.target.id}`);
      },
      { rootMargin: "-20% 0px -65%", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav aria-label="Project sections" className="min-w-0">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
        On this page
      </p>
      <ol className="mt-4 flex max-w-full gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
        {items.map((item, index) => (
          <li key={item.href} className="shrink-0">
            <a
              href={item.href}
              aria-current={activeHref === item.href ? "location" : undefined}
              className="project-nav-link flex rounded-md border border-white/10 px-3 py-2 text-sm text-gray-400 hover:border-green-400/40 hover:text-green-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400 aria-[current=location]:border-green-400/35 aria-[current=location]:bg-green-400/5 aria-[current=location]:text-green-300"
            >
              <span className="mr-2 text-gray-600">
                {String(index + 1).padStart(2, "0")}
              </span>
              {item.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
