"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, Minus } from "lucide-react";
import { PropertyData } from "./data";
import RatingStars from "./RatingStars";
import { getMatchScore } from "@/utils/propertyUtils";

interface CompareModalProps {
  properties: PropertyData[];
  onClose: () => void;
  onBook: (property: PropertyData) => void;
}

const ALL_TAGS = ["Free Wi-Fi", "Pool", "Spa", "Breakfast", "Private Beach", "Gym", "Parking", "Airport Shuttle", "Fitness Center"];

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "140px repeat(3, 1fr)", borderBottom: "1px solid rgba(194,198,213,0.20)" }}>
      <div style={{ padding: "12px 16px", fontSize: 12, fontWeight: 600, color: "#424753", background: "#F8F9FA", display: "flex", alignItems: "center" }}>
        {label}
      </div>
      {children}
    </div>
  );
}

function Cell({ children, highlight = false }: { children: React.ReactNode; highlight?: boolean }) {
  return (
    <div style={{
      padding: "12px 16px",
      display: "flex", alignItems: "center", justifyContent: "center",
      background: highlight ? "rgba(0,92,189,0.04)" : "white",
      textAlign: "center",
    }}>
      {children}
    </div>
  );
}

export default function CompareModal({ properties, onClose, onBook }: CompareModalProps) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const cols = [...properties, null, null].slice(0, 3) as (PropertyData | null)[];
  const scores = properties.map(getMatchScore);
  const bestScore = Math.max(...scores);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
        style={{
          position: "fixed", inset: 0,
          background: "rgba(10,15,30,0.55)",
          backdropFilter: "blur(5px)",
          zIndex: 220,
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: 24,
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 24 }}
          transition={{ type: "spring", stiffness: 360, damping: 28 }}
          onClick={(e) => e.stopPropagation()}
          style={{
            background: "white",
            borderRadius: 20,
            width: "100%",
            maxWidth: 860,
            maxHeight: "90vh",
            overflow: "hidden",
            boxShadow: "0px 32px 64px -12px rgba(0,0,0,0.28)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Header */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "20px 24px",
            borderBottom: "1px solid rgba(194,198,213,0.25)",
            flexShrink: 0,
          }}>
            <span style={{ fontSize: 18, fontWeight: 700, color: "#191C22" }}>Compare Hotels</span>
            <motion.button
              whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
              onClick={onClose}
              style={{ width: 36, height: 36, borderRadius: 9999, background: "#F3F4F6", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
            >
              <X size={16} color="#424753" />
            </motion.button>
          </div>

          {/* Table */}
          <div style={{ overflowY: "auto", flex: 1 }}>
            {/* Hotel header row */}
            <div style={{ display: "grid", gridTemplateColumns: "140px repeat(3, 1fr)", borderBottom: "2px solid rgba(194,198,213,0.30)", position: "sticky", top: 0, background: "white", zIndex: 10 }}>
              <div style={{ padding: "16px", background: "#F8F9FA" }} />
              {cols.map((p, i) => (
                <div key={i} style={{ padding: "14px 16px", textAlign: "center", background: p && scores[i] === bestScore ? "rgba(0,92,189,0.04)" : "white" }}>
                  {p ? (
                    <>
                      <div style={{ width: "100%", height: 80, borderRadius: 8, overflow: "hidden", marginBottom: 8 }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={p.image} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      </div>
                      <p style={{ fontSize: 13, fontWeight: 600, color: "#191C22", margin: "0 0 2px" }}>{p.name}</p>
                      {scores[i] === bestScore && (
                        <span style={{ fontSize: 10, fontWeight: 700, color: "#005CBD", background: "#EEF3FF", padding: "2px 8px", borderRadius: 9999 }}>
                          Best Match
                        </span>
                      )}
                    </>
                  ) : (
                    <div style={{ height: 80, borderRadius: 8, border: "1.5px dashed rgba(194,198,213,0.60)", display: "flex", alignItems: "center", justifyContent: "center", color: "#C2C6D5", fontSize: 12 }}>
                      —
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Price row */}
            <Row label="Price / night">
              {cols.map((p, i) => (
                <Cell key={i} highlight={!!p && scores[i] === bestScore}>
                  {p ? <span style={{ fontSize: 18, fontWeight: 700, color: "#B61B4A" }}>{p.price}</span> : <Minus size={14} color="#C2C6D5" />}
                </Cell>
              ))}
            </Row>

            {/* Rating row */}
            <Row label="Guest Rating">
              {cols.map((p, i) => (
                <Cell key={i} highlight={!!p && scores[i] === bestScore}>
                  {p ? (
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                      <span style={{ fontSize: 20, fontWeight: 700, color: "#2E4190" }}>{p.ratingScore}</span>
                      <span style={{ fontSize: 11, color: "#6B7280" }}>{p.ratingLabel}</span>
                    </div>
                  ) : <Minus size={14} color="#C2C6D5" />}
                </Cell>
              ))}
            </Row>

            {/* Stars */}
            <Row label="Star Rating">
              {cols.map((p, i) => (
                <Cell key={i} highlight={!!p && scores[i] === bestScore}>
                  {p ? <RatingStars count={p.stars} starSize={13} /> : <Minus size={14} color="#C2C6D5" />}
                </Cell>
              ))}
            </Row>

            {/* AI Match */}
            <Row label="AI Match Score">
              {cols.map((p, i) => (
                <Cell key={i} highlight={!!p && scores[i] === bestScore}>
                  {p ? (
                    <span style={{ fontSize: 14, fontWeight: 700, color: scores[i] >= 90 ? "#16A34A" : "#005CBD" }}>
                      {scores[i]}%
                    </span>
                  ) : <Minus size={14} color="#C2C6D5" />}
                </Cell>
              ))}
            </Row>

            {/* Location */}
            <Row label="Location">
              {cols.map((p, i) => (
                <Cell key={i} highlight={!!p && scores[i] === bestScore}>
                  {p ? <span style={{ fontSize: 12, color: "#424753" }}>{p.location}</span> : <Minus size={14} color="#C2C6D5" />}
                </Cell>
              ))}
            </Row>

            {/* Amenities */}
            {ALL_TAGS.filter(tag => properties.some(p => p.tagLabels.includes(tag))).map((tag) => (
              <Row key={tag} label={tag}>
                {cols.map((p, i) => (
                  <Cell key={i} highlight={!!p && scores[i] === bestScore}>
                    {p ? (
                      p.tagLabels.includes(tag)
                        ? <Check size={16} color="#16A34A" />
                        : <Minus size={14} color="#E1E2EB" />
                    ) : <Minus size={14} color="#C2C6D5" />}
                  </Cell>
                ))}
              </Row>
            ))}

            {/* Book buttons */}
            <div style={{ display: "grid", gridTemplateColumns: "140px repeat(3, 1fr)", padding: "16px 0", background: "#F8F9FA" }}>
              <div />
              {cols.map((p, i) => (
                <div key={i} style={{ padding: "0 16px", display: "flex", justifyContent: "center" }}>
                  {p && (
                    <motion.button
                      whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                      onClick={() => { onClose(); onBook(p); }}
                      style={{
                        paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 10,
                        background: "#B61B4A", borderRadius: 9,
                        color: "white", fontSize: 13, fontWeight: 600,
                        border: "none", cursor: "pointer", fontFamily: "inherit",
                        width: "100%",
                      }}
                    >
                      Book Now
                    </motion.button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
