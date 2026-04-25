"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, ChevronUp, ChevronDown, X } from "lucide-react";
import { PropertyData } from "./data";

interface RecentlyViewedWidgetProps {
  properties: PropertyData[];
  onOpen: (property: PropertyData) => void;
}

export default function RecentlyViewedWidget({ properties, onOpen }: RecentlyViewedWidgetProps) {
  const [expanded, setExpanded] = useState(false);

  if (properties.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ type: "spring", stiffness: 380, damping: 28 }}
      style={{
        position: "fixed",
        bottom: 24,
        right: 24,
        zIndex: 90,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        gap: 8,
      }}
    >
      {/* Expanded thumbnails */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 360, damping: 26 }}
            style={{
              background: "white",
              borderRadius: 14,
              boxShadow: "0px 12px 32px rgba(0,0,0,0.15), 0px 4px 10px rgba(0,0,0,0.08)",
              border: "1px solid rgba(194,198,213,0.30)",
              padding: 12,
              width: 200,
            }}
          >
            <p style={{ fontSize: 11, fontWeight: 600, color: "#6B7280", margin: "0 0 10px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
              Recently Viewed
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {properties.map((p, i) => (
                <motion.button
                  key={p.id}
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  whileHover={{ background: "#F5F7FF" }}
                  onClick={() => { onOpen(p); setExpanded(false); }}
                  style={{
                    display: "flex", alignItems: "center", gap: 9,
                    background: "none", border: "none", cursor: "pointer",
                    fontFamily: "inherit", borderRadius: 8, padding: "4px 6px",
                    width: "100%", textAlign: "left",
                  }}
                >
                  <div style={{ width: 36, height: 36, borderRadius: 7, overflow: "hidden", flexShrink: 0 }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.image} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 12, fontWeight: 500, color: "#191C22", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {p.name}
                    </p>
                    <p style={{ fontSize: 11, color: "#B61B4A", fontWeight: 600, margin: 0 }}>
                      {p.price}
                    </p>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <motion.button
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        onClick={() => setExpanded((o) => !o)}
        style={{
          display: "flex", alignItems: "center", gap: 8,
          paddingLeft: 14, paddingRight: 14, paddingTop: 10, paddingBottom: 10,
          background: "white",
          borderRadius: 12,
          boxShadow: "0px 8px 24px rgba(0,0,0,0.14), 0px 2px 6px rgba(0,0,0,0.07)",
          border: "1px solid rgba(194,198,213,0.30)",
          cursor: "pointer",
          fontFamily: "inherit",
        }}
      >
        <Clock size={14} color="#005CBD" />
        <span style={{ fontSize: 13, fontWeight: 600, color: "#191C22" }}>
          Recently Viewed
        </span>
        <span style={{
          paddingLeft: 6, paddingRight: 6, paddingTop: 1, paddingBottom: 1,
          background: "#005CBD", borderRadius: 9999,
          fontSize: 11, color: "white", fontWeight: 700,
        }}>
          {properties.length}
        </span>
        {expanded ? <ChevronDown size={13} color="#6B7280" /> : <ChevronUp size={13} color="#6B7280" />}
      </motion.button>
    </motion.div>
  );
}
