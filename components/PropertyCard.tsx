import { MapPin } from "lucide-react";
import { ReactNode } from "react";
import RatingStars from "./RatingStars";
import TagBadge from "./TagBadge";

interface Tag {
  icon: ReactNode;
  label: string;
}

interface PropertyCardProps {
  image: string;
  topBadge?: string;
  name: string;
  location: string;
  locationDetail: string;
  stars: number;
  tags: Tag[];
  note: string;
  noteColor?: string;
  ratingScore: string;
  ratingLabel: string;
  ratingCount: string;
  oldPrice?: string;
  price: string;
}

export default function PropertyCard({
  image,
  topBadge,
  name,
  location,
  locationDetail,
  stars,
  tags,
  note,
  noteColor = "#424753",
  ratingScore,
  ratingLabel,
  ratingCount,
  oldPrice,
  price,
}: PropertyCardProps) {
  return (
    <div
      style={{
        display: "flex",
        background: "white",
        borderRadius: 12,
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.05)",
        outline: "1px rgba(194, 198, 213, 0.20) solid",
        outlineOffset: -1,
        overflow: "hidden",
      }}
    >
      {/* Image */}
      <div style={{ width: 256, flexShrink: 0, position: "relative" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt={name}
          style={{ width: "100%", height: "100%", objectFit: "cover", minHeight: 200 }}
        />
        {topBadge && (
          <div
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
              boxShadow:
                "0px 4px 6px -4px rgba(0, 0, 0, 0.10), 0px 10px 15px -3px rgba(0, 0, 0, 0.10)",
            }}
          >
            <svg width="10" height="8" viewBox="0 0 10 8" fill="white">
              <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
            <span style={{ fontSize: 12, color: "white", fontWeight: 600, lineHeight: "16px" }}>
              {topBadge}
            </span>
          </div>
        )}
      </div>

      {/* Middle content */}
      <div
        style={{
          flex: 1,
          padding: 20,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          minWidth: 0,
        }}
      >
        <div>
          {/* Name + stars */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
            <span
              style={{
                fontSize: 18,
                color: "#191C22",
                fontWeight: 600,
                lineHeight: "28px",
              }}
            >
              {name}
            </span>
            <RatingStars count={stars} starSize={10} />
          </div>

          {/* Location */}
          <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 12 }}>
            <MapPin size={10} color="#424753" style={{ flexShrink: 0 }} />
            <span style={{ fontSize: 12, color: "#424753", fontWeight: 400, lineHeight: "16px" }}>
              {location} • {locationDetail}
            </span>
          </div>

          {/* Tags */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {tags.map((tag) => (
              <TagBadge key={tag.label} icon={tag.icon} label={tag.label} />
            ))}
          </div>
        </div>

        {/* Note */}
        <p
          style={{
            fontSize: 12,
            color: noteColor,
            fontWeight: 500,
            lineHeight: "16px",
            marginTop: 12,
          }}
        >
          {note}
        </p>
      </div>

      {/* Right — rating + price */}
      <div
        style={{
          padding: 20,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "flex-end",
          flexShrink: 0,
          minWidth: 190,
        }}
      >
        {/* Rating badge */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ textAlign: "right" }}>
            <p
              style={{
                fontSize: 12,
                color: "#005CBD",
                fontWeight: 600,
                lineHeight: "16px",
                textAlign: "right",
              }}
            >
              {ratingLabel}
            </p>
            <p style={{ fontSize: 11, color: "#6B7280", fontWeight: 400, lineHeight: "16px", textAlign: "right" }}>
              {ratingCount} reviews
            </p>
          </div>
          <div
            style={{
              width: 44,
              height: 44,
              background: "#005CBD",
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <span
              style={{ fontSize: 16, color: "white", fontWeight: 700, lineHeight: "24px" }}
            >
              {ratingScore}
            </span>
          </div>
        </div>

        {/* Price + button */}
        <div style={{ textAlign: "right" }}>
          {oldPrice && (
            <span
              style={{
                fontSize: 10,
                color: "#424753",
                fontWeight: 400,
                textDecoration: "line-through",
                display: "block",
                lineHeight: "10px",
                marginBottom: 2,
              }}
            >
              {oldPrice}
            </span>
          )}
          <div style={{ display: "flex", alignItems: "baseline", gap: 4, justifyContent: "flex-end" }}>
            <span
              style={{ fontSize: 24, color: "#B61B4A", fontWeight: 600, lineHeight: "31.2px" }}
            >
              {price}
            </span>
            <span style={{ fontSize: 10, color: "#424753", fontWeight: 400 }}>/night</span>
          </div>
          <button
            style={{
              marginTop: 12,
              paddingLeft: 24,
              paddingRight: 24,
              paddingTop: 8,
              paddingBottom: 8,
              background: "#B61B4A",
              borderRadius: 8,
              boxShadow:
                "0px 4px 6px -4px rgba(182, 27, 74, 0.20), 0px 10px 15px -3px rgba(182, 27, 74, 0.20)",
              color: "white",
              fontSize: 14,
              fontWeight: 600,
              lineHeight: "20px",
              border: "none",
              cursor: "pointer",
              fontFamily: "inherit",
              whiteSpace: "nowrap",
            }}
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}
