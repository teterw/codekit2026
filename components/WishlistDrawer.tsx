"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Heart, MapPin } from "lucide-react";
import { PropertyData } from "./data";
import RatingBadge from "./RatingBadge";
import { useBreakpoint } from "@/hooks/useBreakpoint";

interface WishlistDrawerProps {
  open: boolean;
  onClose: () => void;
  properties: PropertyData[];
  onRemove: (id: string) => void;
  onBook: (property: PropertyData) => void;
}

export default function WishlistDrawer({ open, onClose, properties, onRemove, onBook }: WishlistDrawerProps) {
  const { isMobile } = useBreakpoint();
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            style={{
              position: "fixed", inset: 0,
              background: "rgba(10,15,30,0.40)",
              backdropFilter: "blur(3px)",
              zIndex: 210,
            }}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 340, damping: 32 }}
            style={{
              position: "fixed",
              top: 0, right: 0, bottom: 0,
              width: isMobile ? "100%" : 400,
              background: "white",
              boxShadow: "-8px 0 40px rgba(0,0,0,0.14)",
              zIndex: 211,
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            {/* Header */}
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "20px 24px",
              borderBottom: "1px solid rgba(194,198,213,0.30)",
              flexShrink: 0,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <Heart size={18} color="#B61B4A" fill="#B61B4A" />
                <span style={{ fontSize: 18, fontWeight: 600, color: "#191C22" }}>
                  Saved Hotels
                </span>
                {properties.length > 0 && (
                  <span style={{
                    paddingLeft: 8, paddingRight: 8, paddingTop: 2, paddingBottom: 2,
                    background: "#B61B4A", borderRadius: 9999,
                    fontSize: 12, color: "white", fontWeight: 700,
                  }}>
                    {properties.length}
                  </span>
                )}
              </div>
              <motion.button
                whileHover={{ scale: 1.1, background: "#F3F4F6" }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                style={{
                  width: 36, height: 36, borderRadius: 9999,
                  background: "#F8F9FA", border: "none", cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}
              >
                <X size={16} color="#424753" />
              </motion.button>
            </div>

            {/* Content */}
            <div style={{ flex: 1, overflowY: "auto", padding: "16px 24px", display: "flex", flexDirection: "column", gap: 12 }}>
              {properties.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    display: "flex", flexDirection: "column", alignItems: "center",
                    justifyContent: "center", flex: 1, gap: 12, paddingTop: 64,
                  }}
                >
                  <Heart size={48} color="#E1E2EB" />
                  <p style={{ fontSize: 16, fontWeight: 600, color: "#9CA3AF", margin: 0 }}>No saved hotels yet</p>
                  <p style={{ fontSize: 13, color: "#C2C6D5", textAlign: "center", margin: 0 }}>
                    Click the heart icon on any property to save it here.
                  </p>
                </motion.div>
              ) : (
                <AnimatePresence initial={false}>
                {properties.map((p, i) => (
                  <motion.div
                    key={p.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20, height: 0, marginBottom: -8 }}
                    transition={{ delay: i * 0.04 }}
                    style={{
                      display: "flex",
                      background: "#F8F9FA",
                      borderRadius: 12,
                      overflow: "hidden",
                      border: "1px solid rgba(194,198,213,0.25)",
                    }}
                  >
                    {/* Image */}
                    <div style={{ width: 90, height: 90, flexShrink: 0, position: "relative" }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={p.image} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>

                    {/* Info */}
                    <div style={{ flex: 1, padding: "10px 12px", display: "flex", flexDirection: "column", justifyContent: "space-between", minWidth: 0 }}>
                      <div>
                        <p style={{ fontSize: 13, fontWeight: 600, color: "#191C22", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {p.name}
                        </p>
                        <div style={{ display: "flex", alignItems: "center", gap: 3, marginTop: 2 }}>
                          <MapPin size={9} color="#6B7280" />
                          <span style={{ fontSize: 11, color: "#6B7280" }}>{p.location}</span>
                        </div>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <span style={{ fontSize: 15, fontWeight: 700, color: "#B61B4A" }}>{p.price}<span style={{ fontSize: 10, color: "#6B7280", fontWeight: 400 }}>/night</span></span>
                        <motion.button
                          whileHover={{ scale: 1.04 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => onBook(p)}
                          style={{
                            paddingLeft: 12, paddingRight: 12, paddingTop: 5, paddingBottom: 5,
                            background: "#005CBD", borderRadius: 7,
                            color: "white", fontSize: 11, fontWeight: 600,
                            border: "none", cursor: "pointer", fontFamily: "inherit",
                          }}
                        >
                          Book
                        </motion.button>
                      </div>
                    </div>

                    {/* Remove */}
                    <button
                      onClick={() => onRemove(p.id)}
                      style={{
                        width: 36, background: "none", border: "none",
                        cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <X size={13} color="#9CA3AF" />
                    </button>
                  </motion.div>
                ))}
                </AnimatePresence>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
