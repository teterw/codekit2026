"use client";

import { motion } from "framer-motion";
import Tooltip from "./Tooltip";

interface CompareButtonProps {
  isSelected: boolean;
  canAdd: boolean;
  onToggle: (e: React.MouseEvent) => void;
}

export default function CompareButton({ isSelected, canAdd, onToggle }: CompareButtonProps) {
  const disabled = !canAdd && !isSelected;
  const tip = disabled
    ? "Max 3 hotels to compare"
    : isSelected
    ? "Remove from compare"
    : "Add to compare";

  return (
    <Tooltip content={tip} position="top">
      <motion.button
        whileHover={!disabled ? { scale: 1.08 } : undefined}
        whileTap={!disabled ? { scale: 0.94 } : undefined}
        onClick={(e) => { e.stopPropagation(); if (!disabled) onToggle(e); }}
        style={{
          width: 36,
          height: 36,
          background: isSelected ? "#005CBD" : "white",
          borderRadius: 8,
          border: `1.5px solid ${isSelected ? "#005CBD" : "rgba(194,198,213,0.60)"}`,
          cursor: disabled ? "not-allowed" : "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          opacity: disabled ? 0.45 : 1,
          transition: "background 0.18s, border 0.18s",
          boxShadow: "0px 1px 2px rgba(0,0,0,0.05)",
        }}
      >
        {isSelected ? (
          <svg width="13" height="10" viewBox="0 0 13 10" fill="none">
            <path d="M1.5 5L4.5 8L11.5 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : (
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <rect x="0.75" y="0.75" width="4.5" height="4.5" rx="0.75" stroke="#6B7280" strokeWidth="1.3" />
            <rect x="7.75" y="0.75" width="4.5" height="4.5" rx="0.75" stroke="#6B7280" strokeWidth="1.3" />
            <rect x="0.75" y="7.75" width="4.5" height="4.5" rx="0.75" stroke="#6B7280" strokeWidth="1.3" />
            <rect x="7.75" y="7.75" width="4.5" height="4.5" rx="0.75" stroke="#6B7280" strokeWidth="1.3" />
          </svg>
        )}
      </motion.button>
    </Tooltip>
  );
}
