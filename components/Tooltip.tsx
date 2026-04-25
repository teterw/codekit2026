"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  position?: "top" | "bottom";
  maxWidth?: number;
}

export default function Tooltip({ content, children, position = "top", maxWidth = 200 }: TooltipProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div
      style={{ position: "relative", display: "inline-flex" }}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, y: position === "top" ? 4 : -4, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: position === "top" ? 4 : -4, scale: 0.95 }}
            transition={{ duration: 0.13 }}
            style={{
              position: "absolute",
              [position === "top" ? "bottom" : "top"]: "calc(100% + 7px)",
              left: "50%",
              transform: "translateX(-50%)",
              background: "#1C2433",
              color: "white",
              fontSize: 11,
              fontWeight: 500,
              lineHeight: "1.4",
              padding: "6px 10px",
              borderRadius: 7,
              zIndex: 500,
              maxWidth,
              textAlign: "center",
              pointerEvents: "none",
              whiteSpace: maxWidth ? "normal" : "nowrap",
            }}
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
