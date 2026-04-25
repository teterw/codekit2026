"use client";

import { useState } from "react";

export function useWishlist() {
  const [saved, setSaved] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setSaved((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return {
    isSaved: (id: string) => saved.has(id),
    toggle,
    savedIds: Array.from(saved),
    count: saved.size,
  };
}
