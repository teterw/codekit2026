"use client";

import { useRef, useCallback } from "react";
import { MapPin } from "lucide-react";
import { motion } from "framer-motion";

export interface FiltersState {
  propertyTypes: string[];
  starRatings: number[];
  facilities: string[];
  reviewScores: string[];
  neighborhoods: string[];
  bedTypes: string[];
  priceMin: number;
  priceMax: number;
}

export const DEFAULT_FILTERS: FiltersState = {
  propertyTypes: [],
  starRatings: [],
  facilities: [],
  reviewScores: [],
  neighborhoods: [],
  bedTypes: [],
  priceMin: 0,
  priceMax: 1000,
};

interface FilterSidebarProps {
  filters: FiltersState;
  onChange: (filters: FiltersState) => void;
  onReset: () => void;
}

const PRICE_MIN = 0;
const PRICE_MAX = 1000;

const sectionTitleStyle: React.CSSProperties = {
  fontSize: 14,
  color: "#191C22",
  fontWeight: 600,
  lineHeight: "19.6px",
  letterSpacing: "0.14px",
  marginBottom: 12,
};

const labelStyle: React.CSSProperties = {
  fontSize: 14,
  color: "#191C22",
  fontWeight: 400,
  lineHeight: "20px",
};

function toggle<T>(arr: T[], val: T): T[] {
  return arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val];
}

function CheckItem({
  label,
  checked,
  onToggle,
}: {
  label: string;
  checked: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      whileHover={{ x: 2 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      onClick={onToggle}
      style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer", userSelect: "none" }}
    >
      <div
        style={{
          width: 20,
          height: 20,
          background: checked ? "#005CBD" : "white",
          borderRadius: 4,
          border: checked ? "none" : "1px solid #C2C6D5",
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "background 0.15s, border 0.15s",
        }}
      >
        {checked && (
          <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
            <path d="M1 4L4 7L10 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>
      <span style={labelStyle}>{label}</span>
    </motion.div>
  );
}

function StarCheckItem({
  count,
  checked,
  onToggle,
}: {
  count: number;
  checked: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      whileHover={{ x: 2 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      onClick={onToggle}
      style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer", userSelect: "none" }}
    >
      <div
        style={{
          width: 20,
          height: 20,
          background: checked ? "#005CBD" : "white",
          borderRadius: 4,
          border: checked ? "none" : "1px solid #C2C6D5",
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "background 0.15s, border 0.15s",
        }}
      >
        {checked && (
          <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
            <path d="M1 4L4 7L10 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>
      <div style={{ display: "flex" }}>
        {Array.from({ length: count }, (_, i) => (
          <svg key={i} width="15" height="14.25" viewBox="0 0 24 24" fill="#EAB308">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        ))}
        {Array.from({ length: 5 - count }, (_, i) => (
          <svg key={`e${i}`} width="15" height="14.25" viewBox="0 0 24 24" fill="#E1E2EB">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        ))}
      </div>
    </motion.div>
  );
}

function Section({ title, gap = 8, children }: { title: string; gap?: number; children: React.ReactNode }) {
  return (
    <div style={{ paddingTop: 8 }}>
      <p style={sectionTitleStyle}>{title}</p>
      <div style={{ display: "flex", flexDirection: "column", gap }}>{children}</div>
    </div>
  );
}

function Divider() {
  return <div style={{ height: 1, background: "rgba(194,198,213,0.30)", margin: "4px 0" }} />;
}

function PriceRangeSlider({
  min,
  max,
  onChange,
}: {
  min: number;
  max: number;
  onChange: (min: number, max: number) => void;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const dragging = useRef<"low" | "high" | null>(null);

  const pct = (v: number) => ((v - PRICE_MIN) / (PRICE_MAX - PRICE_MIN)) * 100;
  const lowPct = pct(min);
  const highPct = pct(max);

  const getValueFromX = useCallback((clientX: number): number => {
    const rect = trackRef.current?.getBoundingClientRect();
    if (!rect) return 0;
    const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    return Math.round(ratio * (PRICE_MAX - PRICE_MIN) + PRICE_MIN);
  }, []);

  const startDrag = (thumb: "low" | "high") => (e: React.PointerEvent) => {
    dragging.current = thumb;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (thumb: "low" | "high") => (e: React.PointerEvent) => {
    if (dragging.current !== thumb) return;
    const val = getValueFromX(e.clientX);
    if (thumb === "low") {
      onChange(Math.min(val, max - 10), max);
    } else {
      onChange(min, Math.max(val, min + 10));
    }
  };

  const endDrag = () => { dragging.current = null; };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
        <span style={{ fontSize: 12, color: "#424753", fontWeight: 500 }}>${min}</span>
        <span style={{ fontSize: 12, color: "#424753", fontWeight: 500 }}>{max >= PRICE_MAX ? "$1000+" : `$${max}`}</span>
      </div>
      <div
        ref={trackRef}
        style={{ position: "relative", height: 20, display: "flex", alignItems: "center" }}
      >
        {/* Track background */}
        <div style={{ position: "absolute", width: "100%", height: 6, background: "#E1E2EB", borderRadius: 8 }} />
        {/* Selected range */}
        <div
          style={{
            position: "absolute",
            left: `${lowPct}%`,
            width: `${highPct - lowPct}%`,
            height: 6,
            background: "#005CBD",
            borderRadius: 8,
          }}
        />
        {/* Low thumb */}
        <div
          onPointerDown={startDrag("low")}
          onPointerMove={onPointerMove("low")}
          onPointerUp={endDrag}
          style={{
            position: "absolute",
            left: `${lowPct}%`,
            transform: "translate(-50%, 0)",
            width: 18,
            height: 18,
            background: "white",
            border: "2px solid #005CBD",
            borderRadius: 9999,
            cursor: "grab",
            boxShadow: "0px 2px 4px rgba(0,0,0,0.18)",
            touchAction: "none",
          }}
        />
        {/* High thumb */}
        <div
          onPointerDown={startDrag("high")}
          onPointerMove={onPointerMove("high")}
          onPointerUp={endDrag}
          style={{
            position: "absolute",
            left: `${highPct}%`,
            transform: "translate(-50%, 0)",
            width: 18,
            height: 18,
            background: "white",
            border: "2px solid #005CBD",
            borderRadius: 9999,
            cursor: "grab",
            boxShadow: "0px 2px 4px rgba(0,0,0,0.18)",
            touchAction: "none",
          }}
        />
      </div>
    </div>
  );
}

export default function FilterSidebar({ filters, onChange, onReset }: FilterSidebarProps) {
  const hasActiveFilters =
    filters.propertyTypes.length > 0 ||
    filters.starRatings.length > 0 ||
    filters.facilities.length > 0 ||
    filters.reviewScores.length > 0 ||
    filters.neighborhoods.length > 0 ||
    filters.bedTypes.length > 0 ||
    filters.priceMin > 0 ||
    filters.priceMax < PRICE_MAX;

  return (
    <div style={{ width: 256, flexShrink: 0, display: "flex", flexDirection: "column", gap: 16 }}>
      <div
        style={{
          background: "white",
          boxShadow: "0px 4px 12px rgba(0,0,0,0.05)",
          borderRadius: 12,
          outline: "1px rgba(194,198,213,0.20) solid",
          outlineOffset: -1,
          paddingTop: 15.5,
          paddingBottom: 32,
          paddingLeft: 16,
          paddingRight: 16,
          display: "flex",
          flexDirection: "column",
          gap: 15,
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <svg width="18" height="12" viewBox="0 0 18 12" fill="#005CBD">
              <rect y="0" width="18" height="2" rx="1" />
              <rect x="3" y="5" width="12" height="2" rx="1" />
              <rect x="6" y="10" width="6" height="2" rx="1" />
            </svg>
            <span style={{ fontSize: 18, color: "#191C22", fontWeight: 400, lineHeight: "28px" }}>Filters</span>
          </div>
          {hasActiveFilters && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onReset}
              style={{
                fontSize: 12,
                color: "#B61B4A",
                fontWeight: 600,
                background: "none",
                border: "none",
                cursor: "pointer",
                fontFamily: "inherit",
                padding: 0,
              }}
            >
              Reset
            </motion.button>
          )}
        </div>

        {/* Price Range */}
        <div>
          <p style={sectionTitleStyle}>Price Range</p>
          <PriceRangeSlider
            min={filters.priceMin}
            max={filters.priceMax}
            onChange={(min, max) => onChange({ ...filters, priceMin: min, priceMax: max })}
          />
        </div>

        <Divider />

        <Section title="Property Type">
          {(["Hotels", "Resorts", "Apartments", "Villas"] as const).map((t) => (
            <CheckItem
              key={t}
              label={t}
              checked={filters.propertyTypes.includes(t)}
              onToggle={() => onChange({ ...filters, propertyTypes: toggle(filters.propertyTypes, t) })}
            />
          ))}
        </Section>

        <Divider />

        <Section title="Star Rating">
          {[5, 4, 3].map((count) => (
            <StarCheckItem
              key={count}
              count={count}
              checked={filters.starRatings.includes(count)}
              onToggle={() => onChange({ ...filters, starRatings: toggle(filters.starRatings, count) })}
            />
          ))}
        </Section>

        <Divider />

        <Section title="Facilities">
          {["Free Wi-Fi", "Swimming Pool", "Fitness Center", "Spa", "Parking", "Pet Friendly"].map((f) => (
            <CheckItem
              key={f}
              label={f}
              checked={filters.facilities.includes(f)}
              onToggle={() => onChange({ ...filters, facilities: toggle(filters.facilities, f) })}
            />
          ))}
        </Section>

        <Divider />

        <Section title="Review Score">
          {["Superb 9+", "Very Good 8+", "Good 7+"].map((s) => (
            <CheckItem
              key={s}
              label={s}
              checked={filters.reviewScores.includes(s)}
              onToggle={() => onChange({ ...filters, reviewScores: toggle(filters.reviewScores, s) })}
            />
          ))}
        </Section>

        <Divider />

        <Section title="Neighborhood">
          {(["Patong", "Karon", "Kata", "Kamala"] as const).map((n) => (
            <CheckItem
              key={n}
              label={n}
              checked={filters.neighborhoods.includes(n)}
              onToggle={() => onChange({ ...filters, neighborhoods: toggle(filters.neighborhoods, n) })}
            />
          ))}
        </Section>

        <Divider />

        <Section title="Bed Type">
          {(["Single", "Double", "King"] as const).map((b) => (
            <CheckItem
              key={b}
              label={b}
              checked={filters.bedTypes.includes(b)}
              onToggle={() => onChange({ ...filters, bedTypes: toggle(filters.bedTypes, b) })}
            />
          ))}
        </Section>
      </div>

      {/* Map preview */}
      <div style={{ height: 160, borderRadius: 12, overflow: "hidden", position: "relative", boxShadow: "0px 1px 2px rgba(0,0,0,0.05)" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=512&h=320&fit=crop&q=80"
          alt="Map"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,92,189,0.20)",
            backdropFilter: "blur(1px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <button
            style={{
              paddingLeft: 16,
              paddingRight: 16,
              paddingTop: 8,
              paddingBottom: 8,
              background: "white",
              borderRadius: 9999,
              boxShadow: "0px 4px 6px -4px rgba(0,0,0,0.10), 0px 10px 15px -3px rgba(0,0,0,0.10)",
              display: "flex",
              alignItems: "center",
              gap: 8,
              border: "none",
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            <MapPin size={13.5} color="#005CBD" />
            <span style={{ fontSize: 16, color: "#005CBD", fontWeight: 400 }}>View on Map</span>
          </button>
        </div>
      </div>
    </div>
  );
}
