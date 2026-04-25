"use client";

import { useState } from "react";

const MAX = 3;

export function useCompare() {
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (id: string) => {
    setSelected((prev) => {
      if (prev.includes(id)) return prev.filter((v) => v !== id);
      if (prev.length >= MAX) return prev;
      return [...prev, id];
    });
  };

  return {
    selected,
    isSelected: (id: string) => selected.includes(id),
    canAdd: (id: string) => selected.includes(id) || selected.length < MAX,
    toggle,
    clear: () => setSelected([]),
    count: selected.length,
  };
}
