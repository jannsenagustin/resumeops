"use client";

import { useEffect } from "react";

const revealSelector = "[data-motion-reveal]";

export default function MotionObserver() {
  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    if (reducedMotion.matches || !("IntersectionObserver" in window)) {
      return;
    }

    const elements = Array.from(
      document.querySelectorAll<HTMLElement>(revealSelector),
    );
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.remove("motion-reveal-pending");
          entry.target.classList.add("motion-reveal-visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8%", threshold: 0.08 },
    );

    elements.forEach((element) => {
      const isInitiallyVisible =
        element.getBoundingClientRect().top < window.innerHeight * 0.92;

      if (isInitiallyVisible) {
        element.classList.add("motion-reveal-visible");
        return;
      }

      element.classList.add("motion-reveal-pending");
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return null;
}
