"use client";

import type { ButtonHTMLAttributes, MouseEvent } from "react";

export const openResumeViewerEvent = "atlas:open-resume-viewer";

type ResumeViewerTriggerProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "type" | "onClick"
> & {
  onActivate?: () => void;
};

export default function ResumeViewerTrigger({
  children,
  onActivate,
  ...props
}: ResumeViewerTriggerProps) {
  function handleClick(event: MouseEvent<HTMLButtonElement>) {
    const trigger = event.currentTarget;
    onActivate?.();

    window.setTimeout(() => {
      window.dispatchEvent(
        new CustomEvent(openResumeViewerEvent, { detail: { trigger } }),
      );
    }, 0);
  }

  return (
    <button type="button" onClick={handleClick} {...props}>
      {children}
    </button>
  );
}
