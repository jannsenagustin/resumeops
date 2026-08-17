"use client";

import { useEffect, useRef, useState } from "react";
import { resumeDocumentPath } from "../data/homeConsole";
import { openResumeViewerEvent } from "./ResumeViewerTrigger";

const focusableSelector =
  'button:not([disabled]), [href], iframe, [tabindex]:not([tabindex="-1"])';

export default function ResumeViewer() {
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    function openViewer(event: Event) {
      const customEvent = event as CustomEvent<{ trigger?: HTMLElement }>;
      triggerRef.current = customEvent.detail?.trigger ?? null;
      setIsOpen(true);
    }

    window.addEventListener(openResumeViewerEvent, openViewer);
    return () => window.removeEventListener(openResumeViewerEvent, openViewer);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const shell = document.getElementById("atlas-console-shell");
    const shellWasInert = shell?.hasAttribute("inert") ?? false;
    const previousOverflow = document.body.style.overflow;

    shell?.setAttribute("inert", "");
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        setIsOpen(false);
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(focusableSelector),
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (!first || !last) {
        event.preventDefault();
      } else if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      if (!shellWasInert) shell?.removeAttribute("inert");
      triggerRef.current?.focus();
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="resume-viewer__backdrop"
      onMouseDown={() => setIsOpen(false)}
    >
      <div
        ref={dialogRef}
        className="resume-viewer"
        role="dialog"
        aria-modal="true"
        aria-labelledby="resume-viewer-title"
        aria-describedby="resume-viewer-description"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <header className="resume-viewer__header">
          <div>
            <p>Resume Viewer</p>
            <h2 id="resume-viewer-title">Jannsen Agustin Resume</h2>
            <span id="resume-viewer-description">
              Preview the published Resume PDF, open it full size, or download a copy.
            </span>
          </div>
          <button
            ref={closeRef}
            type="button"
            className="resume-viewer__close"
            onClick={() => setIsOpen(false)}
          >
            Close
          </button>
        </header>

        <div className="resume-viewer__document">
          <iframe
            src={resumeDocumentPath}
            title="Jannsen Agustin Resume Preview"
          />
          <div className="resume-viewer__mobile-fallback">
            <p>
              Embedded PDF previews vary by mobile browser. Open the Resume PDF
              full size for the most reliable reading experience.
            </p>
          </div>
        </div>

        <footer className="resume-viewer__controls">
          <a
            className="atlas-button atlas-button--primary"
            href={resumeDocumentPath}
            download="Jannsen-Agustin-Resume.pdf"
          >
            Download Resume
          </a>
          <a
            className="atlas-button atlas-button--secondary"
            href={resumeDocumentPath}
            target="_blank"
            rel="noopener noreferrer"
          >
            Open Full Size
          </a>
        </footer>
      </div>
    </div>
  );
}
