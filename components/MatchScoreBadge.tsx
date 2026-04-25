"use client";

import Tooltip from "./Tooltip";

interface MatchScoreBadgeProps {
  score: number;
}

export default function MatchScoreBadge({ score }: MatchScoreBadgeProps) {
  const color =
    score >= 90 ? "#16A34A" : score >= 80 ? "#005CBD" : "#D97706";

  return (
    <Tooltip
      content="Matched based on your budget, location, rating, and travel style."
      position="top"
      maxWidth={200}
    >
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 4,
          paddingLeft: 7,
          paddingRight: 7,
          paddingTop: 3,
          paddingBottom: 3,
          background: "rgba(255,255,255,0.90)",
          backdropFilter: "blur(6px)",
          borderRadius: 9999,
          border: `1px solid ${color}40`,
          cursor: "default",
        }}
      >
        <svg width="6" height="6" viewBox="0 0 6 6">
          <circle cx="3" cy="3" r="3" fill={color} />
        </svg>
        <span style={{ fontSize: 10, fontWeight: 700, color: "#191C22", whiteSpace: "nowrap" }}>
          AI Match {score}%
        </span>
      </div>
    </Tooltip>
  );
}
