"use client";

import Image, { type StaticImageData } from "next/image";
import {
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

type EvidenceViewerProps = {
  src: StaticImageData;
  alt: string;
  caption: string;
  prominence?: "primary" | "supporting";
};

const focusableSelector =
  'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export default function EvidenceViewer({
  src,
  alt,
  caption,
  prominence = "primary",
}: EvidenceViewerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    const previousPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const pageContent = document.querySelector<HTMLElement>("main");
    const pageWasInert = pageContent?.hasAttribute("inert") ?? false;
    const triggerElement = triggerRef.current;

    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
    pageContent?.setAttribute("inert", "");
    closeRef.current?.focus();

    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setIsOpen(false);
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusableElements = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(focusableSelector),
      );
      if (focusableElements.length === 0) {
        event.preventDefault();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPaddingRight;
      if (!pageWasInert) pageContent?.removeAttribute("inert");
      triggerElement?.focus();
    };
  }, [isOpen]);

  const isPrimary = prominence === "primary";

  return (
    <>
      <figure
        className={`motion-evidence overflow-hidden bg-zinc-950 ${
          isPrimary
            ? "motion-card rounded-xl border border-green-400/20"
            : "rounded-lg border border-white/10"
        }`}
      >
        <button
          ref={triggerRef}
          type="button"
          className="evidence-preview-frame group relative flex w-full cursor-zoom-in items-center justify-center overflow-hidden bg-[#080b0d] text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-green-400"
          aria-label={`View enlarged evidence: ${caption}`}
          aria-haspopup="dialog"
          onClick={() => setIsOpen(true)}
        >
          <Image
            src={src}
            alt={alt}
            className="evidence-preview-image"
            sizes={isPrimary ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 640px) 50vw, 100vw"}
          />
          <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/80 px-3 py-1.5 text-xs font-semibold text-gray-200 shadow-lg backdrop-blur-sm transition-colors group-hover:border-green-400/50 group-hover:text-green-300 group-focus-visible:border-green-400/50 group-focus-visible:text-green-300">
            <svg aria-hidden="true" viewBox="0 0 20 20" className="h-3.5 w-3.5 fill-none stroke-current" strokeWidth="1.7">
              <circle cx="8.5" cy="8.5" r="5.25" />
              <path d="m12.5 12.5 4 4M8.5 6v5M6 8.5h5" />
            </svg>
            View evidence
          </span>
        </button>
        <figcaption
          className={
            isPrimary
              ? "border-t border-white/10 px-5 py-4 text-sm font-medium text-gray-300"
              : "border-t border-white/10 px-4 py-3 text-xs text-gray-400"
          }
        >
          {caption}
        </figcaption>
      </figure>

      {isOpen &&
        createPortal(
          <div
            className="evidence-lightbox-backdrop fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-3 backdrop-blur-sm sm:p-6"
            onClick={() => setIsOpen(false)}
          >
            <div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              className="evidence-lightbox-panel relative flex max-h-[94dvh] max-w-[95vw] flex-col rounded-xl border border-white/15 bg-zinc-950 p-2 shadow-2xl sm:p-3"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                ref={closeRef}
                type="button"
                onClick={() => setIsOpen(false)}
                className="absolute right-3 top-3 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/85 text-xl text-white shadow-lg transition-colors hover:border-green-400/60 hover:text-green-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400"
                aria-label="Close evidence viewer"
              >
                <span aria-hidden="true">×</span>
              </button>
              <Image
                src={src}
                alt={alt}
                className="h-auto max-h-[calc(94dvh-5.5rem)] w-auto max-w-[calc(95vw-1rem)] rounded-lg object-contain sm:max-w-[calc(95vw-1.5rem)]"
                sizes="95vw"
                priority
              />
              <p id={titleId} className="px-2 pb-1 pt-3 text-sm font-medium text-gray-300">
                {caption}
              </p>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
