"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";
import AtlasNavigation, { type AtlasDestination } from "./AtlasNavigation";

const focusableSelector =
  'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])';

export default function AtlasSidebar({
  active,
  children,
  ariaLabel,
}: {
  active: AtlasDestination;
  children?: ReactNode;
  ariaLabel: string;
}) {
  const [open, setOpen] = useState(false);
  const sidebarRef = useRef<HTMLElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const trigger = triggerRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        return;
      }
      if (event.key !== "Tab" || !sidebarRef.current) return;
      const focusable = Array.from(sidebarRef.current.querySelectorAll<HTMLElement>(focusableSelector));
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) event.preventDefault();
      else if (event.shiftKey && document.activeElement === first) {
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
      trigger?.focus();
    };
  }, [open]);

  return (
    <>
      <div className="atlas-sidebar-mobile">
        <div><span>Project Atlas</span><small>Engineering Console</small></div>
        <button ref={triggerRef} type="button" aria-expanded={open} aria-controls={`atlas-sidebar-${active}`} onClick={() => setOpen(true)}>Menu</button>
      </div>
      {open && <button className="atlas-sidebar-backdrop" type="button" aria-label="Close navigation" onClick={() => setOpen(false)} />}
      <aside ref={sidebarRef} id={`atlas-sidebar-${active}`} className="atlas-sidebar atlas-shared-sidebar" aria-label={ariaLabel} data-open={open || undefined}>
        <div className="atlas-sidebar__mobile-header"><strong>Navigation</strong><button ref={closeRef} type="button" onClick={() => setOpen(false)}>Close</button></div>
        <div className="atlas-sidebar__identity"><p>Project Atlas</p><span>Engineering Console</span><small>Edmonton, Canada</small></div>
        <AtlasNavigation active={active} onNavigate={() => setOpen(false)} />
        {children}
      </aside>
    </>
  );
}
