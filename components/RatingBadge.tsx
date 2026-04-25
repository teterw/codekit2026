"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { animate } from "framer-motion";

interface RatingBadgeProps {
  score: string;
  label: string;
  count: string;
  animateOnMount?: boolean;
}

export default function RatingBadge({ score, label, count, animateOnMount = true }: RatingBadgeProps) {
  const [displayScore, setDisplayScore] = useState(animateOnMount ? "0.0" : score);

  useEffect(() => {
    if (!animateOnMount) return;
    const target = parseFloat(score);
    const controls = animate(0, target, {
      duration: 0.9,
      ease: [0.16, 1, 0.3, 1],
      delay: 0.25,
      onUpdate: (v) => setDisplayScore(v.toFixed(1)),
    });
    return controls.stop;
  }, [score, animateOnMount]);

  return (
    <motion.div
      initial={animateOnMount ? { opacity: 0, scale: 0.82, y: -6 } : false}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 380, damping: 26, delay: 0.1 }}
      whileHover={{
        scale: 1.05,
        boxShadow: "0px 8px 20px rgba(46, 63, 142, 0.18)",
        y: -1,
      }}
      style={{
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "flex-start",
        padding: "10px 14px",
        background: "#EEF1FA",
        borderRadius: 12,
        border: "1px solid rgba(100, 130, 220, 0.18)",
        cursor: "default",
        userSelect: "none",
      }}
    >
      <div style={{ display: "flex", alignItems: "baseline", gap: 5 }}>
        <span
          style={{
            fontSize: 18,
            fontWeight: 700,
            color: "#2E4190",
            lineHeight: 1.2,
            letterSpacing: "-0.3px",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {displayScore}
        </span>
        <span
          style={{
            fontSize: 14,
            fontWeight: 600,
            color: "#2E4190",
            lineHeight: 1.2,
          }}
        >
          {label}
        </span>
      </div>
      <span
        style={{
          fontSize: 12,
          color: "#6B7280",
          fontWeight: 400,
          marginTop: 3,
          lineHeight: 1,
        }}
      >
        {count} reviews
      </span>
    </motion.div>
  );
}
