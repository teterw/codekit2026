"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SORT_OPTIONS } from "./data";

interface ResultsHeaderProps {
  count: number;
  sortBy: string;
  onSortChange: (sort: string) => void;
}

export default function ResultsHeader({ count, sortBy, onSortChange }: ResultsHeaderProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <span style={{ fontSize: 20, color: "#191C22", fontWeight: 400, lineHeight: "28px" }}>
        {count} properties in Bali
      </span>

      <div ref={ref} style={{ position: "relative", display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ fontSize: 12, color: "#424753", fontWeight: 500, lineHeight: "16.8px" }}>
          Sort by:
        </span>
        <button
          onClick={() => setOpen((o) => !o)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            fontSize: 16,
            color: "#005CBD",
            fontWeight: 400,
            lineHeight: "24px",
            background: "none",
            border: "none",
            cursor: "pointer",
            fontFamily: "inherit",
            padding: "8px 0 8px 12px",
          }}
        >
          {sortBy}
          <motion.span
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            style={{ display: "flex" }}
          >
            <ChevronDown size={16} color="#6B7280" />
          </motion.span>
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -6, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.97 }}
              transition={{ duration: 0.15 }}
              style={{
                position: "absolute",
                top: "calc(100% + 4px)",
                right: 0,
                background: "white",
                borderRadius: 10,
                boxShadow: "0px 10px 25px -5px rgba(0,0,0,0.15), 0px 4px 10px -4px rgba(0,0,0,0.08)",
                border: "1px solid rgba(194,198,213,0.30)",
                zIndex: 100,
                minWidth: 210,
                overflow: "hidden",
              }}
            >
              {SORT_OPTIONS.map((opt) => (
                <motion.button
                  key={opt}
                  whileHover={{ background: opt === sortBy ? "#E6EEFA" : "#F5F7FF" }}
                  onClick={() => { onSortChange(opt); setOpen(false); }}
                  style={{
                    display: "block",
                    width: "100%",
                    textAlign: "left",
                    padding: "10px 16px",
                    background: opt === sortBy ? "#EEF3FF" : "white",
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "inherit",
                    fontSize: 14,
                    color: opt === sortBy ? "#005CBD" : "#191C22",
                    fontWeight: opt === sortBy ? 600 : 400,
                  }}
                >
                  {opt}
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
