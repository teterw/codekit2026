"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";

interface WishlistButtonProps {
  isSaved: boolean;
  onToggle: (e: React.MouseEvent) => void;
}

const PARTICLES = [
  { angle: -60, dist: 22 },
  { angle: -30, dist: 26 },
  { angle: 0,   dist: 24 },
  { angle: 30,  dist: 26 },
  { angle: 60,  dist: 22 },
];

export default function WishlistButton({ isSaved, onToggle }: WishlistButtonProps) {
  const [burst, setBurst] = useState(false);

  useEffect(() => {
    if (isSaved) {
      setBurst(true);
      const t = setTimeout(() => setBurst(false), 600);
      return () => clearTimeout(t);
    }
  }, [isSaved]);

  return (
    <div style={{ position: "relative", display: "inline-flex" }}>
      {/* Burst particles */}
      <AnimatePresence>
        {burst && PARTICLES.map((p, i) => {
          const rad = (p.angle * Math.PI) / 180;
          const tx = Math.sin(rad) * p.dist;
          const ty = -Math.cos(rad) * p.dist;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 1, scale: 1, x: 0, y: 0 }}
              animate={{ opacity: 0, scale: 0.4, x: tx, y: ty }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: 5,
                height: 5,
                marginLeft: -2.5,
                marginTop: -2.5,
                borderRadius: 9999,
                background: i % 2 === 0 ? "#B61B4A" : "#FF6B9D",
                pointerEvents: "none",
              }}
            />
          );
        })}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.14 }}
        whileTap={{ scale: 0.9 }}
        onClick={onToggle}
        style={{
          width: 32,
          height: 32,
          background: isSaved ? "rgba(182,27,74,0.92)" : "rgba(255,255,255,0.88)",
          backdropFilter: "blur(6px)",
          borderRadius: 9999,
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          transition: "background 0.2s",
          boxShadow: "0px 2px 8px rgba(0,0,0,0.18)",
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={isSaved ? "saved" : "unsaved"}
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.6, opacity: 0 }}
            transition={{ duration: 0.18, type: "spring", stiffness: 500, damping: 30 }}
          >
            <Heart
              size={15}
              color={isSaved ? "white" : "#424753"}
              fill={isSaved ? "white" : "none"}
            />
          </motion.div>
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
