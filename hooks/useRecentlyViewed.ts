"use client";

import { useState } from "react";

export function useRecentlyViewed(max = 4) {
  const [viewed, setViewed] = useState<string[]>([]);

  const add = (id: string) => {
    setViewed((prev) => {
      const filtered = prev.filter((v) => v !== id);
      return [id, ...filtered].slice(0, max);
    });
  };

  return { viewed, add };
}
