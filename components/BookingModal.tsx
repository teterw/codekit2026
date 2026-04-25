"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, CheckCircle } from "lucide-react";
import { PropertyData } from "./data";
import RatingStars from "./RatingStars";
import TagBadge from "./TagBadge";
import { getTagIcon } from "./tagIcons";

interface BookingModalProps {
  property: PropertyData | null;
  onClose: () => void;
}

export default function BookingModal({ property, onClose }: BookingModalProps) {
  const [step, setStep] = useState<"detail" | "loading" | "success">("detail");

  // Reset step when property changes
  useEffect(() => {
    if (property) setStep("detail");
  }, [property]);

  // ESC to close
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
          key="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(10, 15, 30, 0.55)",
            backdropFilter: "blur(4px)",
            zIndex: 200,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 24,
          }}
        >
          <motion.div
            key="modal-content"
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 24 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "white",
              borderRadius: 16,
              width: "100%",
              maxWidth: 560,
              overflow: "hidden",
              boxShadow: "0px 24px 48px -12px rgba(0, 0, 0, 0.25)",
            }}
          >
            {step === "success" ? (
              /* Success state */
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{ padding: 48, display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
                >
                  <CheckCircle size={64} color="#16A34A" />
                </motion.div>
                <h2 style={{ fontSize: 22, fontWeight: 700, color: "#191C22", textAlign: "center" }}>
                  Booking Confirmed!
                </h2>
                <p style={{ fontSize: 14, color: "#424753", textAlign: "center", lineHeight: "20px" }}>
                  Your stay at <strong>{property.name}</strong> has been reserved.<br />
                  A confirmation email will be sent shortly.
                </p>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onClose}
                  style={{
                    marginTop: 8,
                    paddingLeft: 32,
                    paddingRight: 32,
                    paddingTop: 12,
                    paddingBottom: 12,
                    background: "#005CBD",
                    borderRadius: 10,
                    color: "white",
                    fontSize: 14,
                    fontWeight: 600,
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "inherit",
                  }}
                >
                  Done
                </motion.button>
              </motion.div>
            ) : (
              <>
                {/* Header image */}
                <div style={{ height: 220, position: "relative", overflow: "hidden" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={property.image}
                    alt={property.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)" }} />
                  {/* Close button */}
                  <motion.button
                    whileHover={{ scale: 1.1, background: "rgba(255,255,255,0.3)" }}
                    whileTap={{ scale: 0.9 }}
                    onClick={onClose}
                    style={{
                      position: "absolute",
                      top: 12,
                      right: 12,
                      width: 36,
                      height: 36,
                      background: "rgba(255,255,255,0.2)",
                      borderRadius: 9999,
                      border: "none",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backdropFilter: "blur(4px)",
                    }}
                  >
                    <X size={18} color="white" />
                  </motion.button>
                  {/* Property name on image */}
                  <div style={{ position: "absolute", bottom: 16, left: 20, right: 20 }}>
                    <h2 style={{ fontSize: 20, fontWeight: 700, color: "white", lineHeight: "28px" }}>
                      {property.name}
                    </h2>
                    <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 4 }}>
                      <MapPin size={12} color="rgba(255,255,255,0.8)" />
                      <span style={{ fontSize: 12, color: "rgba(255,255,255,0.8)" }}>
                        {property.location} • {property.locationDetail}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div style={{ padding: 24 }}>
                  {/* Rating + stars row */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <RatingStars count={property.stars} starSize={14} />
                      <span style={{ fontSize: 12, color: "#424753" }}>{property.stars}-star property</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{ textAlign: "right" }}>
                        <p style={{ fontSize: 12, color: "#005CBD", fontWeight: 600 }}>{property.ratingLabel}</p>
                        <p style={{ fontSize: 11, color: "#6B7280" }}>{property.ratingCount} reviews</p>
                      </div>
                      <div style={{
                        width: 40, height: 40, background: "#005CBD", borderRadius: 8,
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}>
                        <span style={{ fontSize: 15, color: "white", fontWeight: 700 }}>{property.ratingScore}</span>
                      </div>
                    </div>
                  </div>

                  {/* Tags */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
                    {property.tagLabels.map((label) => (
                      <TagBadge key={label} icon={getTagIcon(label)} label={label} />
                    ))}
                  </div>

                  {/* Price */}
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "16px 20px",
                    background: "#F8F9FA",
                    borderRadius: 12,
                    marginBottom: 20,
                  }}>
                    <div>
                      <p style={{ fontSize: 12, color: "#424753" }}>Price per night</p>
                      {property.oldPrice && (
                        <p style={{ fontSize: 12, color: "#9CA3AF", textDecoration: "line-through" }}>{property.oldPrice}</p>
                      )}
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <span style={{ fontSize: 28, fontWeight: 700, color: "#B61B4A" }}>{property.price}</span>
                      <span style={{ fontSize: 12, color: "#424753" }}> /night</span>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div style={{ display: "flex", gap: 12 }}>
                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={onClose}
                      style={{
                        flex: 1,
                        paddingTop: 12,
                        paddingBottom: 12,
                        background: "white",
                        borderRadius: 10,
                        color: "#424753",
                        fontSize: 14,
                        fontWeight: 600,
                        border: "1px solid #C2C6D5",
                        cursor: "pointer",
                        fontFamily: "inherit",
                      }}
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleConfirm}
                      disabled={step === "loading"}
                      style={{
                        flex: 2,
                        paddingTop: 12,
                        paddingBottom: 12,
                        background: step === "loading" ? "#7BA8E0" : "#005CBD",
                        borderRadius: 10,
                        color: "white",
                        fontSize: 14,
                        fontWeight: 600,
                        border: "none",
                        cursor: step === "loading" ? "default" : "pointer",
                        fontFamily: "inherit",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 8,
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
