"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";

interface WishlistButtonProps {
  isSaved: boolean;
  onToggle: (e: React.MouseEvent) => void;
}

export default function WishlistButton({ isSaved, onToggle }: WishlistButtonProps) {
  return (
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
  );
}
