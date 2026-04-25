"use client";

import { useEffect } from "react";

interface Shortcuts {
  onEsc?: () => void;
  onEnter?: () => void;
  onArrowUp?: () => void;
  onArrowDown?: () => void;
}

export function useKeyboardShortcuts(shortcuts: Shortcuts, enabled = true) {
  useEffect(() => {
    if (!enabled) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") shortcuts.onEsc?.();
      if (e.key === "Enter") shortcuts.onEnter?.();
      if (e.key === "ArrowUp") { e.preventDefault(); shortcuts.onArrowUp?.(); }
      if (e.key === "ArrowDown") { e.preventDefault(); shortcuts.onArrowDown?.(); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [shortcuts, enabled]);
}
