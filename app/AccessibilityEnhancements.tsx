"use client";

import { useEffect } from "react";

const focusableSelector = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

export function AccessibilityEnhancements() {
  useEffect(() => {
    const overlays = Array.from(
      document.querySelectorAll<HTMLElement>(".mobile-menu, .work-modal"),
    );
    const backgroundRegions = [
      document.querySelector<HTMLElement>(".site-header"),
      document.querySelector<HTMLElement>("#main-content"),
    ].filter((element): element is HTMLElement => Boolean(element));

    let activeOverlay: HTMLElement | null = null;
    let returnFocus: HTMLElement | null = null;

    const syncOverlayState = () => {
      const nextOverlay =
        overlays.find(
          (overlay) => overlay.getAttribute("aria-hidden") === "false",
        ) ?? null;

      overlays.forEach((overlay) => {
        overlay.inert = overlay !== nextOverlay;
      });

      backgroundRegions.forEach((region) => {
        region.inert = Boolean(nextOverlay);
      });

      if (nextOverlay && nextOverlay !== activeOverlay) {
        returnFocus =
          document.activeElement instanceof HTMLElement
            ? document.activeElement
            : null;
        activeOverlay = nextOverlay;
        window.requestAnimationFrame(() => {
          nextOverlay.querySelector<HTMLElement>(focusableSelector)?.focus();
        });
      } else if (!nextOverlay && activeOverlay) {
        activeOverlay = null;
        window.requestAnimationFrame(() => returnFocus?.focus());
      }
    };

    const trapFocus = (event: KeyboardEvent) => {
      if (event.key !== "Tab" || !activeOverlay) return;

      const focusable = Array.from(
        activeOverlay.querySelectorAll<HTMLElement>(focusableSelector),
      ).filter((element) => !element.inert);

      if (focusable.length === 0) {
        event.preventDefault();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const observer = new MutationObserver(syncOverlayState);
    overlays.forEach((overlay) => {
      observer.observe(overlay, {
        attributes: true,
        attributeFilter: ["aria-hidden"],
      });
    });
    document.addEventListener("keydown", trapFocus);
    syncOverlayState();

    return () => {
      observer.disconnect();
      document.removeEventListener("keydown", trapFocus);
      overlays.forEach((overlay) => {
        overlay.inert = false;
      });
      backgroundRegions.forEach((region) => {
        region.inert = false;
      });
    };
  }, []);

  return null;
}
