"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { PropertyData } from "./data";
import { getTagIcon } from "./tagIcons";
import RatingStars from "./RatingStars";
import TagBadge from "./TagBadge";
import RatingBadge from "./RatingBadge";

interface PropertyCardProps {
  property: PropertyData;
  onBook: () => void;
}

export default function PropertyCard({ property, onBook }: PropertyCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      animate={{
        y: hovered ? -4 : 0,
        boxShadow: hovered
          ? "0px 16px 36px rgba(0,0,0,0.11), 0px 4px 10px rgba(0,0,0,0.06)"
          : "0px 4px 12px rgba(0,0,0,0.05)",
      }}
      transition={{ type: "spring", stiffness: 360, damping: 28 }}
      style={{
        display: "flex",
        background: "white",
        borderRadius: 12,
        outline: "1px rgba(194, 198, 213, 0.20) solid",
        outlineOffset: -1,
        overflow: "hidden",
        cursor: "default",
      }}
    >
      {/* Image with zoom */}
      <Link
        href="/detail"
        aria-label={`View details for ${property.name}`}
        style={{
          width: 256,
          flexShrink: 0,
          position: "relative",
          overflow: "hidden",
          display: "block",
          color: "inherit",
          textDecoration: "none",
          cursor: "pointer",
        }}
      >
        <motion.div
          animate={{ scale: hovered ? 1.07 : 1 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          style={{ width: "100%", height: "100%", minHeight: 200 }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={property.image}
            alt={property.name}
            style={{ width: "100%", height: "100%", objectFit: "cover", minHeight: 200, display: "block" }}
          />
        </motion.div>

        {/* Overlay darkens slightly on hover */}
        <motion.div
          animate={{ opacity: hovered ? 0.12 : 0 }}
          transition={{ duration: 0.3 }}
          style={{ position: "absolute", inset: 0, background: "#000", pointerEvents: "none" }}
        />

        {property.topBadge && (
          <motion.div
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15, type: "spring", stiffness: 400, damping: 28 }}
            style={{
              position: "absolute",
              top: 12,
              left: 12,
              display: "flex",
              alignItems: "center",
              gap: 4,
              paddingLeft: 10,
              paddingRight: 10,
              paddingTop: 4,
              paddingBottom: 4,
              background: "#005CBD",
              borderRadius: 9999,
              boxShadow: "0px 4px 6px -4px rgba(0,0,0,0.10), 0px 10px 15px -3px rgba(0,0,0,0.10)",
            }}
          >
            <svg width="10" height="8" viewBox="0 0 10 8" fill="white">
              <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
            <span style={{ fontSize: 12, color: "white", fontWeight: 600, lineHeight: "16px" }}>
              {property.topBadge}
            </span>
          </motion.div>
        )}
      </Link>

      {/* Middle content */}
      <div style={{ flex: 1, padding: 20, display: "flex", flexDirection: "column", justifyContent: "space-between", minWidth: 0 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
            <Link
              href="/detail"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              <motion.span
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05, duration: 0.3 }}
                style={{ fontSize: 18, color: "#191C22", fontWeight: 600, lineHeight: "28px", cursor: "pointer" }}
              >
                {property.name}
              </motion.span>
            </Link>
            <RatingStars count={property.stars} starSize={10} />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 12 }}>
            <MapPin size={10} color="#424753" style={{ flexShrink: 0 }} />
            <span style={{ fontSize: 12, color: "#424753", fontWeight: 400, lineHeight: "16px" }}>
              {property.location} • {property.locationDetail}
            </span>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.3 }}
            style={{ display: "flex", flexWrap: "wrap", gap: 8 }}
          >
            {property.tagLabels.map((label, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 + i * 0.05, type: "spring", stiffness: 400, damping: 28 }}
              >
                <TagBadge icon={getTagIcon(label)} label={label} />
              </motion.div>
            ))}
          </motion.div>
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{ fontSize: 12, color: property.noteColor, fontWeight: 500, lineHeight: "16px", marginTop: 12 }}
        >
          {property.note}
        </motion.p>
      </div>

      {/* Right — rating + price */}
      <div style={{ padding: 20, display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "flex-end", flexShrink: 0, minWidth: 190 }}>
        <RatingBadge
          score={property.ratingScore}
          label={property.ratingLabel}
          count={property.ratingCount}
        />

        <div style={{ textAlign: "right" }}>
          {property.oldPrice && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 }}
              style={{ fontSize: 10, color: "#424753", fontWeight: 400, textDecoration: "line-through", display: "block", lineHeight: "10px", marginBottom: 2 }}
            >
              {property.oldPrice}
            </motion.span>
          )}
          <motion.div
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.18, type: "spring", stiffness: 400, damping: 28 }}
            style={{ display: "flex", alignItems: "baseline", gap: 4, justifyContent: "flex-end" }}
          >
            <span style={{ fontSize: 24, color: "#B61B4A", fontWeight: 600, lineHeight: "31.2px" }}>
              {property.price}
            </span>
            <span style={{ fontSize: 10, color: "#424753", fontWeight: 400 }}>/night</span>
          </motion.div>
          <motion.button
            whileHover={{ scale: 1.04, boxShadow: "0px 8px 20px rgba(182,27,74,0.35)" }}
            whileTap={{ scale: 0.97 }}
            onClick={onBook}
            style={{
              marginTop: 12,
              paddingLeft: 24,
              paddingRight: 24,
              paddingTop: 8,
              paddingBottom: 8,
              background: "#B61B4A",
              borderRadius: 8,
              boxShadow: "0px 4px 6px -4px rgba(182,27,74,0.20), 0px 10px 15px -3px rgba(182,27,74,0.20)",
              color: "white",
              fontSize: 14,
              fontWeight: 600,
              lineHeight: "20px",
              border: "none",
              cursor: "pointer",
              fontFamily: "inherit",
              whiteSpace: "nowrap",
              transition: "box-shadow 0.2s",
            }}
          >
            Book Now
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
