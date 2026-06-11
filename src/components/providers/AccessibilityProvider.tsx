"use client";

import { useEffect } from "react";

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Handle keyboard navigation
    const handleKeyboardNav = (e: KeyboardEvent) => {
      // Skip to main content with Tab
      if (e.key === "Tab") {
        document.body.classList.add("keyboard-nav");
      }
    };

    // Remove focus outline on mouse navigation
    const handleMouseNav = () => {
      document.body.classList.remove("keyboard-nav");
    };

    document.addEventListener("keydown", handleKeyboardNav);
    document.addEventListener("mousedown", handleMouseNav);

    return () => {
      document.removeEventListener("keydown", handleKeyboardNav);
      document.removeEventListener("mousedown", handleMouseNav);
    };
  }, []);

  return <>{children}</>;
}

// Announce dynamic content changes to screen readers
export function useAnnounce() {
  const announce = (message: string, priority: "polite" | "assertive" = "polite") => {
    const announcer = document.createElement("div");
    announcer.setAttribute("role", "status");
    announcer.setAttribute("aria-live", priority);
    announcer.setAttribute("aria-atomic", "true");
    announcer.className = "sr-only";
    announcer.textContent = message;
    document.body.appendChild(announcer);

    setTimeout(() => {
      document.body.removeChild(announcer);
    }, 1000);
  };

  return { announce };
}

// Focus trap for modals
export function useFocusTrap(isActive: boolean) {
  useEffect(() => {
    if (!isActive) return;

    const modal = document.querySelector("[role='dialog']") as HTMLElement | null;
    if (!modal) return;

    const focusable = modal.querySelectorAll<HTMLElement>(
      "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])"
    );
    const firstFocusable = focusable[0];
    const lastFocusable = focusable[focusable.length - 1];

    const handleTab = (e: Event) => {
      const ke = e as KeyboardEvent;
      if (ke.key !== "Tab") return;

      if (ke.shiftKey && document.activeElement === firstFocusable) {
        e.preventDefault();
        lastFocusable?.focus();
      } else if (!ke.shiftKey && document.activeElement === lastFocusable) {
        e.preventDefault();
        firstFocusable?.focus();
      }
    };

    modal.addEventListener("keydown", handleTab);
    firstFocusable?.focus();

    return () => modal.removeEventListener("keydown", handleTab);
  }, [isActive]);
}
