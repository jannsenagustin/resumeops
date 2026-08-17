"use client";

import { useEffect, useState } from "react";
import { consoleNavigation } from "../data/homeConsole";
import ConsoleIcon, { type ConsoleIconName } from "./ConsoleIcon";

const navigationIcons: ConsoleIconName[] = ["activity", "network", "flag", "evidence", "file", "briefcase"];

const defaultSection = "current-state";

type AtlasConsoleNavProps = {
  variant?: "header" | "sidebar" | "drawer";
  onNavigate?: () => void;
};

export default function AtlasConsoleNav({
  variant = "header",
  onNavigate,
}: AtlasConsoleNavProps) {
  const [activeSection, setActiveSection] = useState(defaultSection);

  useEffect(() => {
    const sections = consoleNavigation
      .map(([, href]) => document.getElementById(href.slice(1)))
      .filter((section): section is HTMLElement => section !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible[0]?.target.id) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        rootMargin: "-22% 0px -62% 0px",
        threshold: [0, 0.25, 0.75],
      },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label={variant === "header" ? "Homepage console navigation" : "Atlas console sections"}
      className={`console-section-nav console-section-nav--${variant}`}
    >
      <ul>
        {consoleNavigation.map(([label, href], index) => {
          const sectionId = href.slice(1);
          const isActive = sectionId === activeSection;

          return (
            <li key={href}>
              <a
                href={href}
                className={variant !== "header" ? "console-icon-link console-icon-link--indexed" : undefined}
                aria-current={isActive ? "location" : undefined}
                onClick={() => {
                  setActiveSection(sectionId);
                  onNavigate?.();
                }}
              >
                {variant !== "header" && (
                  <span aria-hidden="true">{String(index).padStart(2, "0")}</span>
                )}
                {variant !== "header" && <ConsoleIcon name={navigationIcons[index]} />}
                {variant !== "header" ? <span className="console-label">{label}</span> : label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
