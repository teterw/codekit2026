"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Eye, CalendarCheck } from "lucide-react";
import { PropertyData } from "./data";
import { getTagIcon } from "./tagIcons";
import RatingStars from "./RatingStars";
import TagBadge from "./TagBadge";
import RatingBadge from "./RatingBadge";
import WishlistButton from "./WishlistButton";
import MatchScoreBadge from "./MatchScoreBadge";
import CompareButton from "./CompareButton";
import { getMatchScore, getPriceInsight, getTrustData } from "@/utils/propertyUtils";

interface PropertyCardProps {
  property: PropertyData;
  onBook: () => void;
  isSaved: boolean;
  onSaveToggle: (e: React.MouseEvent) => void;
  isCompared: boolean;
  canCompare: boolean;
  onCompareToggle: (e: React.MouseEvent) => void;
}

export default function PropertyCard({
  property,
  onBook,
  isSaved,
  onSaveToggle,
  isCompared,
  canCompare,
  onCompareToggle,
}: PropertyCardProps) {
  const [hovered, setHovered] = useState(false);

  const score = getMatchScore(property);
  const insight = getPriceInsight(property);
  const trust = getTrustData(property.id);

  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      animate={{
        y: hovered ? -4 : 0,
        boxShadow: isCompared
          ? hovered
            ? "inset 0 0 0 2px #005CBD, 0px 16px 36px rgba(0,92,189,0.18), 0px 4px 10px rgba(0,0,0,0.06)"
            : "inset 0 0 0 2px #005CBD, 0px 4px 12px rgba(0,92,189,0.10)"
          : hovered
          ? "0px 16px 36px rgba(0,0,0,0.11), 0px 4px 10px rgba(0,0,0,0.06)"
          : "0px 4px 12px rgba(0,0,0,0.05)",
      }}
      transition={{ type: "spring", stiffness: 360, damping: 28 }}
      onClick={onBook}
      style={{
        display: "flex",
        background: "white",
        borderRadius: 12,
        outline: isCompared ? "none" : "1px rgba(194, 198, 213, 0.20) solid",
        outlineOffset: -1,
        overflow: "hidden",
        cursor: "pointer",
      }}
    >
      {/* Image with overlays */}
      <div style={{ width: 256, flexShrink: 0, position: "relative", overflow: "hidden" }}>
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

        {/* Hover overlay darken */}
        <motion.div
          animate={{ opacity: hovered ? 0.12 : 0 }}
          transition={{ duration: 0.3 }}
          style={{ position: "absolute", inset: 0, background: "#000", pointerEvents: "none" }}
        />

        {/* Top badge (e.g. "Free Cancellation") */}
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

        {/* Wishlist button — top right */}
        <div
          style={{ position: "absolute", top: 12, right: 12 }}
          onClick={(e) => e.stopPropagation()}
        >
          <WishlistButton isSaved={isSaved} onToggle={onSaveToggle} />
        </div>

        {/* AI Match badge — bottom left */}
        <div
          style={{ position: "absolute", bottom: 12, left: 12 }}
          onClick={(e) => e.stopPropagation()}
        >
          <MatchScoreBadge score={score} />
        </div>

        {/* Trust signal — bottom of image, appears on hover */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.22 }}
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                padding: "20px 12px 10px",
                background: "linear-gradient(to top, rgba(0,0,0,0.64) 0%, transparent 100%)",
                display: "flex",
                flexDirection: "column",
                gap: 3,
                pointerEvents: "none",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <Eye size={9} color="rgba(255,255,255,0.85)" />
                <span style={{ fontSize: 9.5, color: "rgba(255,255,255,0.85)", fontWeight: 500 }}>
                  {trust.viewers} people viewing now
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <CalendarCheck size={9} color="rgba(255,255,255,0.85)" />
                <span style={{ fontSize: 9.5, color: "rgba(255,255,255,0.85)", fontWeight: 500 }}>
                  Booked {trust.bookings}× today
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Middle content */}
      <div style={{ flex: 1, padding: 20, display: "flex", flexDirection: "column", justifyContent: "space-between", minWidth: 0 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
            <motion.span
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05, duration: 0.3 }}
              style={{ fontSize: 18, color: "#191C22", fontWeight: 600, lineHeight: "28px" }}
            >
              {property.name}
            </motion.span>
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

      {/* Right — rating + price + actions */}
      <div
        style={{ padding: 20, display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "flex-end", flexShrink: 0, minWidth: 190 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
          <AnimatePresence>
            {isCompared && (
              <motion.div
                initial={{ opacity: 0, y: -6, scale: 0.88 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.88 }}
                transition={{ type: "spring", stiffness: 400, damping: 28 }}
                style={{
                  display: "flex", alignItems: "center", gap: 4,
                  paddingLeft: 8, paddingRight: 8, paddingTop: 3, paddingBottom: 3,
                  background: "#EEF3FF", borderRadius: 9999,
                  border: "1px solid rgba(0,92,189,0.30)",
                }}
              >
                <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                  <path d="M1.5 4L3.2 5.7L6.5 2.3" stroke="#005CBD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span style={{ fontSize: 10, fontWeight: 600, color: "#005CBD" }}>Comparing</span>
              </motion.div>
            )}
          </AnimatePresence>
          <RatingBadge
            score={property.ratingScore}
            label={property.ratingLabel}
            count={property.ratingCount}
            animateOnMount={false}
          />
        </div>

        <div style={{ textAlign: "right" }}>
          {property.oldPrice ? (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 }}
              style={{ fontSize: 10, color: "#424753", fontWeight: 400, textDecoration: "line-through", display: "block", lineHeight: "10px", marginBottom: 2 }}
            >
              {property.oldPrice}
            </motion.span>
          ) : (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 }}
              style={{ fontSize: 10, color: insight.color, fontWeight: 600, display: "block", lineHeight: "10px", marginBottom: 2 }}
            >
              {insight.label}
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

          {/* Book + Compare row */}
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 12, justifyContent: "flex-end" }}>
            <CompareButton
              isSelected={isCompared}
              canAdd={canCompare}
              onToggle={onCompareToggle}
            />
            <motion.button
              whileHover={{ scale: 1.04, boxShadow: "0px 8px 20px rgba(182,27,74,0.35)" }}
              whileTap={{ scale: 0.97 }}
              onClick={(e) => { e.stopPropagation(); onBook(); }}
              style={{
                paddingLeft: 20,
                paddingRight: 20,
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
      </div>
    </motion.div>
  );
}
