"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, BarChart2 } from "lucide-react";
import { PropertyData } from "./data";

interface CompareBarProps {
  selected: PropertyData[];
  onRemove: (id: string) => void;
  onCompare: () => void;
  onClear: () => void;
}

export default function CompareBar({ selected, onRemove, onCompare, onClear }: CompareBarProps) {
  const slots = [selected[0] ?? null, selected[1] ?? null, selected[2] ?? null];

  return (
    <AnimatePresence>
      {selected.length >= 1 && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
          style={{
            position: "fixed",
            bottom: 24,
            left: "50%",
            transform: "translateX(-50%)",
            background: "white",
            borderRadius: 16,
            boxShadow: "0px 24px 60px rgba(0,0,0,0.18), 0px 4px 12px rgba(0,0,0,0.08)",
            border: "1px solid rgba(194,198,213,0.30)",
            padding: "14px 20px",
            display: "flex",
            alignItems: "center",
            gap: 16,
            zIndex: 160,
            minWidth: 540,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
            <BarChart2 size={16} color="#005CBD" />
            <span style={{ fontSize: 13, fontWeight: 600, color: "#191C22", whiteSpace: "nowrap" }}>
              Compare {selected.length}/3
            </span>
          </div>

          <div style={{ display: "flex", gap: 8, flex: 1 }}>
            {slots.map((p, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  height: 44,
                  borderRadius: 9,
                  border: p ? "1px solid rgba(0,92,189,0.20)" : "1.5px dashed rgba(194,198,213,0.70)",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "0 10px",
                  background: p ? "#F0F5FF" : "transparent",
                  overflow: "hidden",
                }}
              >
                {p ? (
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.image} alt={p.name} style={{ width: 28, height: 28, borderRadius: 5, objectFit: "cover", flexShrink: 0 }} />
                    <span style={{ fontSize: 11, fontWeight: 500, color: "#191C22", flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {p.name}
                    </span>
                    <button
                      onClick={() => onRemove(p.id)}
                      style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex", flexShrink: 0 }}
                    >
                      <X size={12} color="#6B7280" />
                    </button>
                  </>
                ) : (
                  <span style={{ fontSize: 11, color: "#C2C6D5", userSelect: "none" }}>Select hotel…</span>
                )}
              </div>
            ))}
          </div>

          <motion.button
            whileHover={selected.length >= 2 ? { scale: 1.02 } : undefined}
            whileTap={selected.length >= 2 ? { scale: 0.98 } : undefined}
            onClick={onCompare}
            disabled={selected.length < 2}
            style={{
              paddingLeft: 18, paddingRight: 18, paddingTop: 10, paddingBottom: 10,
              background: selected.length >= 2 ? "#005CBD" : "#E1E2EB",
              borderRadius: 10,
              color: selected.length >= 2 ? "white" : "#9CA3AF",
              fontSize: 13, fontWeight: 600,
              border: "none",
              cursor: selected.length >= 2 ? "pointer" : "not-allowed",
              fontFamily: "inherit",
              whiteSpace: "nowrap",
              flexShrink: 0,
            }}
          >
            Compare Now
          </motion.button>

          <button
            onClick={onClear}
            style={{ background: "none", border: "none", cursor: "pointer", color: "#9CA3AF", fontSize: 12, whiteSpace: "nowrap", flexShrink: 0 }}
          >
            Clear
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
