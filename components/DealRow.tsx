"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";
import { motion } from "framer-motion";
import RatingStars from "./RatingStars";

interface DealRowProps {
  image: string;
  badge: string;
  name: string;
  location: string;
  locationDetail: string;
  stars: number;
  oldPrice: string;
  newPrice: string;
  hasBorderTop?: boolean;
}

export default function DealRow({
  image,
  badge,
  name,
  location,
  locationDetail,
  stars,
  oldPrice,
  newPrice,
  hasBorderTop = false,
}: DealRowProps) {
  const [claimState, setClaimState] = useState<"idle" | "loading" | "claimed">("idle");

  const handleClaim = () => {
    if (claimState !== "idle") return;
    setClaimState("loading");
    setTimeout(() => setClaimState("claimed"), 1500);
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "stretch",
        height: 192,
        borderTop: hasBorderTop ? "1px rgba(194, 198, 213, 0.10) solid" : "none",
      }}
    >
      {/* Image */}
      <div style={{ width: 256, flexShrink: 0, position: "relative", overflow: "hidden" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt={name}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        {/* Discount badge with pulse animation */}
        <motion.div
          animate={{ scale: [1, 1.07, 1] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute",
            top: 12,
            left: 12,
            paddingLeft: 12,
            paddingRight: 12,
            paddingTop: 4,
            paddingBottom: 4,
            background: "#B61B4A",
            borderRadius: 8,
            boxShadow: "0px 4px 6px -4px rgba(0,0,0,0.10), 0px 10px 15px -3px rgba(0,0,0,0.10)",
          }}
        >
          <span style={{ fontSize: 12, color: "white", fontWeight: 800, lineHeight: "16px" }}>
            {badge}
          </span>
        </motion.div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, padding: 20, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          {/* Left info */}
          <div style={{ display: "flex", flexDirection: "column", gap: 3.5 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 18, color: "#191C22", fontWeight: 400, lineHeight: "28px" }}>{name}</span>
              <RatingStars count={stars} starSize={10} />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <MapPin size={10} color="#424753" style={{ flexShrink: 0 }} />
              <span style={{ fontSize: 12, color: "#424753", fontWeight: 400, lineHeight: "16px" }}>
                {location} • {locationDetail}
              </span>
            </div>
          </div>

          {/* Right pricing + claim */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
            <span style={{ fontSize: 10, color: "#424753", fontWeight: 400, textDecoration: "line-through", lineHeight: "10px" }}>
              {oldPrice}
            </span>
            <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginTop: 2 }}>
              <span style={{ fontSize: 24, color: "#B61B4A", fontWeight: 600, lineHeight: "31.2px" }}>{newPrice}</span>
              <span style={{ fontSize: 10, color: "#424753", fontWeight: 400, lineHeight: "15px" }}>/night</span>
            </div>
            <motion.button
              whileHover={claimState === "idle" ? { scale: 1.04 } : undefined}
              whileTap={claimState === "idle" ? { scale: 0.97 } : undefined}
              onClick={handleClaim}
              disabled={claimState !== "idle"}
              style={{
                marginTop: 8,
                paddingLeft: 16,
                paddingRight: 16,
                paddingTop: 6,
                paddingBottom: 6,
                background: claimState === "claimed" ? "#16A34A" : "#B61B4A",
                borderRadius: 8,
                boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.05)",
                color: "white",
                fontSize: 12,
                fontWeight: 700,
                lineHeight: "16px",
                border: "none",
                cursor: claimState === "idle" ? "pointer" : "default",
                fontFamily: "inherit",
                minWidth: 80,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 4,
                transition: "background 0.3s",
              }}
            >
              {claimState === "loading" ? (
                <>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83">
                      <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="0.7s" repeatCount="indefinite" />
                    </path>
                  </svg>
                  Claiming...
                </>
              ) : claimState === "claimed" ? "Claimed ✓" : "Claim"}
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}
