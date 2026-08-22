"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import { consoleNavigation } from "../data/homeConsole";
import ConsoleIcon, { type ConsoleIconName } from "./ConsoleIcon";

const navigationIcons: ConsoleIconName[] = ["activity", "network", "flag", "evidence", "file", "briefcase"];
const defaultSection = "current-state";
const navigationEventName = "atlas-console-navigation";
const validSectionIds = new Set(consoleNavigation.map(([, href]) => href.slice(1)));

let navigationTarget: string | null = null;
let navigationRun = 0;
let navigationCleanup: (() => void) | null = null;

type NavigationEventDetail = {
  sectionId: string;
  phase: "start" | "end";
};

type AtlasConsoleNavProps = {
  variant?: "header" | "sidebar" | "drawer";
  onNavigate?: () => void;
};

function announceNavigation(sectionId: string, phase: NavigationEventDetail["phase"]) {
  window.dispatchEvent(new CustomEvent<NavigationEventDetail>(navigationEventName, {
    detail: { sectionId, phase },
  }));
}

function finishNavigation(run: number, sectionId: string) {
  if (run !== navigationRun) return;
  navigationCleanup?.();
  navigationCleanup = null;
  navigationTarget = null;
  announceNavigation(sectionId, "end");
}

function scrollToSection(sectionId: string, updateHash: boolean) {
  const target = document.getElementById(sectionId);
  if (!target || !validSectionIds.has(sectionId)) return false;

  navigationRun += 1;
  const run = navigationRun;
  navigationCleanup?.();
  navigationTarget = sectionId;
  announceNavigation(sectionId, "start");

  if (updateHash) history.replaceState(history.state, "", `#${sectionId}`);

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  target.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });

  if (reducedMotion) {
    finishNavigation(run, sectionId);
    return true;
  }

  let frame = 0;
  let stableFrames = 0;
  let lastTop = Number.NaN;
  let settleTimer = 0;
  let fallbackTimer = 0;

  const checkPosition = () => {
    const top = target.getBoundingClientRect().top;
    const expectedTop = Number.parseFloat(getComputedStyle(target).scrollMarginTop) || 0;
    const atDocumentEnd = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
    stableFrames = Math.abs(top - lastTop) < 1 ? stableFrames + 1 : 0;
    lastTop = top;

    if (stableFrames >= 3 && (Math.abs(top - expectedTop) <= 3 || atDocumentEnd)) {
      finishNavigation(run, sectionId);
      return;
    }
    frame = window.requestAnimationFrame(checkPosition);
  };

  const settleAfterScroll = () => {
    window.clearTimeout(settleTimer);
    settleTimer = window.setTimeout(() => finishNavigation(run, sectionId), 120);
  };

  window.addEventListener("scroll", settleAfterScroll, { passive: true });
  frame = window.requestAnimationFrame(checkPosition);
  fallbackTimer = window.setTimeout(() => finishNavigation(run, sectionId), 1500);
  navigationCleanup = () => {
    window.cancelAnimationFrame(frame);
    window.clearTimeout(settleTimer);
    window.clearTimeout(fallbackTimer);
    window.removeEventListener("scroll", settleAfterScroll);
  };
  return true;
}

export default function AtlasConsoleNav({ variant = "header", onNavigate }: AtlasConsoleNavProps) {
  const [activeSection, setActiveSection] = useState(defaultSection);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const sections = consoleNavigation
      .map(([, href]) => document.getElementById(href.slice(1)))
      .filter((section): section is HTMLElement => section !== null);

    const updateFromViewport = () => {
      if (navigationTarget) return;
      const offset = Number.parseFloat(getComputedStyle(sections[0] ?? document.documentElement).scrollMarginTop) || 0;
      const current = sections
        .map((section) => ({ section, top: section.getBoundingClientRect().top }))
        .filter(({ top }) => top <= offset + 2)
        .sort((a, b) => b.top - a.top)[0]?.section ?? sections[0];
      if (current) setActiveSection(current.id);
    };

    const createObserver = () => {
      observerRef.current?.disconnect();
      const offset = Number.parseFloat(getComputedStyle(sections[0] ?? document.documentElement).scrollMarginTop) || 0;
      observerRef.current = new IntersectionObserver(updateFromViewport, {
        rootMargin: `${-offset}px 0px -55% 0px`,
        threshold: [0, 0.01, 0.5, 1],
      });
      sections.forEach((section) => observerRef.current?.observe(section));
      updateFromViewport();
    };

    const handleNavigationEvent = (event: Event) => {
      setActiveSection((event as CustomEvent<NavigationEventDetail>).detail.sectionId);
    };
    const handleHistoryNavigation = () => {
      const sectionId = decodeURIComponent(window.location.hash.slice(1));
      if (validSectionIds.has(sectionId)) scrollToSection(sectionId, false);
    };

    window.addEventListener(navigationEventName, handleNavigationEvent);
    if (variant === "header") {
      window.addEventListener("hashchange", handleHistoryNavigation);
      window.addEventListener("popstate", handleHistoryNavigation);
    }
    window.addEventListener("resize", createObserver);
    createObserver();

    let firstFrame = 0;
    let secondFrame = 0;
    let cancelled = false;
    if (variant === "header" && validSectionIds.has(decodeURIComponent(window.location.hash.slice(1)))) {
      void document.fonts.ready.then(() => {
        if (cancelled) return;
        firstFrame = window.requestAnimationFrame(() => {
          secondFrame = window.requestAnimationFrame(handleHistoryNavigation);
        });
      });
    }

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(firstFrame);
      window.cancelAnimationFrame(secondFrame);
      observerRef.current?.disconnect();
      window.removeEventListener(navigationEventName, handleNavigationEvent);
      if (variant === "header") {
        window.removeEventListener("hashchange", handleHistoryNavigation);
        window.removeEventListener("popstate", handleHistoryNavigation);
      }
      window.removeEventListener("resize", createObserver);
    };
  }, [variant]);

  const handleNavigation = (event: MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    event.preventDefault();
    if (scrollToSection(sectionId, true)) onNavigate?.();
  };

  return (
    <nav aria-label={variant === "header" ? "Homepage console navigation" : "Atlas console sections"} className={`console-section-nav console-section-nav--${variant}`}>
      <ul>
        {consoleNavigation.map(([label, href], index) => {
          const sectionId = href.slice(1);
          const isActive = sectionId === activeSection;
          return (
            <li key={href}>
              <a href={href} className={variant !== "header" ? "console-icon-link console-icon-link--indexed" : undefined} aria-current={isActive ? "location" : undefined} onClick={(event) => handleNavigation(event, sectionId)}>
                {variant !== "header" && <span aria-hidden="true">{String(index).padStart(2, "0")}</span>}
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
