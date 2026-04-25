"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, CheckCircle, Heart } from "lucide-react";
import { PropertyData } from "./data";
import RatingStars from "./RatingStars";
import TagBadge from "./TagBadge";
import RatingBadge from "./RatingBadge";
import { getTagIcon } from "./tagIcons";
import { getMatchScore, getPriceInsight } from "@/utils/propertyUtils";

interface QuickViewModalProps {
  property: PropertyData | null;
  onClose: () => void;
  isSaved: boolean;
  onSaveToggle: () => void;
}

export default function QuickViewModal({ property, onClose, isSaved, onSaveToggle }: QuickViewModalProps) {
  const [step, setStep] = useState<"detail" | "loading" | "success">("detail");

  useEffect(() => {
    if (property) setStep("detail");
  }, [property]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const handleConfirm = () => {
    setStep("loading");
    setTimeout(() => setStep("success"), 1800);
  };

  return (
    <AnimatePresence>
      {property && (
        <motion.div
          key="qv-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(10, 15, 30, 0.58)",
            backdropFilter: "blur(5px)",
            zIndex: 200,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 24,
          }}
        >
          <motion.div
            key="qv-content"
            initial={{ opacity: 0, scale: 0.93, y: 28 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.93, y: 28 }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "white",
              borderRadius: 20,
              width: "100%",
              maxWidth: 620,
              overflow: "hidden",
              boxShadow: "0px 32px 64px -12px rgba(0,0,0,0.28)",
            }}
          >
            {step === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{ padding: 52, display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 320, damping: 20, delay: 0.1 }}
                >
                  <CheckCircle size={68} color="#16A34A" />
                </motion.div>
                <h2 style={{ fontSize: 22, fontWeight: 700, color: "#191C22", textAlign: "center", margin: 0 }}>
                  Booking Confirmed!
                </h2>
                <p style={{ fontSize: 14, color: "#424753", textAlign: "center", lineHeight: "20px", margin: 0 }}>
                  Your stay at <strong>{property.name}</strong> has been reserved.<br />
                  A confirmation email will be sent shortly.
                </p>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onClose}
                  style={{
                    marginTop: 8, paddingLeft: 36, paddingRight: 36, paddingTop: 13, paddingBottom: 13,
                    background: "#005CBD", borderRadius: 11, color: "white", fontSize: 14,
                    fontWeight: 600, border: "none", cursor: "pointer", fontFamily: "inherit",
                  }}
                >
                  Done
                </motion.button>
              </motion.div>
            ) : (
              <>
                {/* Hero image */}
                <div style={{ height: 240, position: "relative", overflow: "hidden" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={property.image}
                    alt={property.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.12) 55%, transparent 100%)" }} />

                  {/* Close */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={onClose}
                    style={{
                      position: "absolute", top: 14, right: 14,
                      width: 36, height: 36,
                      background: "rgba(255,255,255,0.18)", backdropFilter: "blur(6px)",
                      borderRadius: 9999, border: "none", cursor: "pointer",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}
                  >
                    <X size={18} color="white" />
                  </motion.button>

                  {/* Wishlist */}
                  <motion.button
                    whileHover={{ scale: 1.12 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => { e.stopPropagation(); onSaveToggle(); }}
                    style={{
                      position: "absolute", top: 14, right: 58,
                      width: 36, height: 36,
                      background: isSaved ? "rgba(182,27,74,0.9)" : "rgba(255,255,255,0.18)",
                      backdropFilter: "blur(6px)",
                      borderRadius: 9999, border: "none", cursor: "pointer",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}
                  >
                    <Heart size={16} color="white" fill={isSaved ? "white" : "none"} />
                  </motion.button>

                  {/* AI Match badge */}
                  {(() => {
                    const score = getMatchScore(property);
                    const color = score >= 90 ? "#16A34A" : score >= 80 ? "#005CBD" : "#D97706";
                    return (
                      <div style={{ position: "absolute", top: 14, left: 14, display: "flex", alignItems: "center", gap: 5, paddingLeft: 10, paddingRight: 10, paddingTop: 5, paddingBottom: 5, background: "rgba(255,255,255,0.92)", backdropFilter: "blur(6px)", borderRadius: 9999, border: `1px solid ${color}40` }}>
                        <svg width="7" height="7" viewBox="0 0 6 6"><circle cx="3" cy="3" r="3" fill={color} /></svg>
                        <span style={{ fontSize: 11, fontWeight: 700, color: "#191C22" }}>AI Match {score}%</span>
                      </div>
                    );
                  })()}

                  {/* Property name overlay */}
                  <div style={{ position: "absolute", bottom: 18, left: 22, right: 22 }}>
                    <h2 style={{ fontSize: 21, fontWeight: 700, color: "white", lineHeight: "28px", margin: 0 }}>
                      {property.name}
                    </h2>
                    <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 4 }}>
                      <MapPin size={12} color="rgba(255,255,255,0.80)" />
                      <span style={{ fontSize: 12, color: "rgba(255,255,255,0.80)" }}>
                        {property.location} • {property.locationDetail}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div style={{ padding: 24 }}>
                  {/* Rating row */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <RatingStars count={property.stars} starSize={14} />
                      <span style={{ fontSize: 12, color: "#424753" }}>{property.stars}-star property</span>
                    </div>
                    <RatingBadge
                      score={property.ratingScore}
                      label={property.ratingLabel}
                      count={property.ratingCount}
                      animateOnMount={false}
                    />
                  </div>

                  {/* AI Match explanation */}
                  {(() => {
                    const score = getMatchScore(property);
                    const color = score >= 90 ? "#16A34A" : score >= 80 ? "#005CBD" : "#D97706";
                    return (
                      <div style={{
                        display: "flex", alignItems: "flex-start", gap: 10,
                        padding: "10px 14px", background: `${color}0D`,
                        borderRadius: 10, border: `1px solid ${color}25`, marginBottom: 16,
                      }}>
                        <svg width="14" height="14" viewBox="0 0 14 14" style={{ flexShrink: 0, marginTop: 1 }}>
                          <circle cx="7" cy="7" r="6" fill={color} opacity="0.2" />
                          <circle cx="7" cy="7" r="3" fill={color} />
                        </svg>
                        <div>
                          <p style={{ fontSize: 12, fontWeight: 600, color, margin: 0, marginBottom: 2 }}>
                            {score}% Match for You
                          </p>
                          <p style={{ fontSize: 11, color: "#6B7280", margin: 0, lineHeight: "16px" }}>
                            Matched based on your budget, location preference, rating, and travel style.
                          </p>
                        </div>
                      </div>
                    );
                  })()}

                  {/* Tags */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 18 }}>
                    {property.tagLabels.map((label) => (
                      <TagBadge key={label} icon={getTagIcon(label)} label={label} />
                    ))}
                  </div>

                  {/* Price + insight */}
                  <div style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    padding: "14px 18px", background: "#F8F9FA", borderRadius: 12, marginBottom: 20,
                  }}>
                    <div>
                      <p style={{ fontSize: 12, color: "#424753", margin: 0, marginBottom: 2 }}>Price per night</p>
                      {property.oldPrice && (
                        <p style={{ fontSize: 12, color: "#9CA3AF", textDecoration: "line-through", margin: 0 }}>{property.oldPrice}</p>
                      )}
                      {(() => {
                        const insight = getPriceInsight(property);
                        return (
                          <p style={{ fontSize: 11, color: insight.color, fontWeight: 600, margin: 0, marginTop: 2 }}>
                            ↑ {insight.label}
                          </p>
                        );
                      })()}
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <span style={{ fontSize: 28, fontWeight: 700, color: "#B61B4A" }}>{property.price}</span>
                      <span style={{ fontSize: 12, color: "#424753" }}> /night</span>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div style={{ display: "flex", gap: 12 }}>
                    <motion.button
                      whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}
                      onClick={onClose}
                      style={{
                        flex: 1, paddingTop: 12, paddingBottom: 12,
                        background: "white", borderRadius: 10,
                        color: "#424753", fontSize: 14, fontWeight: 600,
                        border: "1px solid #C2C6D5", cursor: "pointer", fontFamily: "inherit",
                      }}
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      whileHover={step !== "loading" ? { scale: 1.01, boxShadow: "0px 8px 20px rgba(0,92,189,0.3)" } : undefined}
                      whileTap={step !== "loading" ? { scale: 0.98 } : undefined}
                      onClick={handleConfirm}
                      disabled={step === "loading"}
                      style={{
                        flex: 2, paddingTop: 12, paddingBottom: 12,
                        background: step === "loading" ? "#7BA8E0" : "#005CBD",
                        borderRadius: 10, color: "white", fontSize: 14, fontWeight: 600,
                        border: "none", cursor: step === "loading" ? "default" : "pointer",
                        fontFamily: "inherit",
                        display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                        transition: "background 0.2s",
                      }}
                    >
                      {step === "loading" ? (
                        <>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                            <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83">
                              <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="0.8s" repeatCount="indefinite" />
                            </path>
                          </svg>
                          Processing...
                        </>
                      ) : "Confirm Booking"}
                    </motion.button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
