"use client";

import { useState, useRef, useEffect } from "react";
import { MapPin, Calendar, Users, ChevronDown, Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { DESTINATIONS, DATE_RANGES } from "./data";
import { useBreakpoint } from "@/hooks/useBreakpoint";

const fieldStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 12,
  paddingLeft: 16,
  paddingRight: 16,
  paddingTop: 12,
  paddingBottom: 12,
  background: "#ECEDF6",
  borderRadius: 12,
  outline: "1px rgba(194,198,213,0.50) solid",
  outlineOffset: -1,
  cursor: "pointer",
  position: "relative",
};

const labelStyle: React.CSSProperties = {
  fontSize: 12,
  color: "#424753",
  fontWeight: 500,
  lineHeight: "12px",
  marginBottom: 2,
};

const valueStyle: React.CSSProperties = {
  fontSize: 14,
  color: "#191C22",
  fontWeight: 600,
  lineHeight: "19.6px",
  letterSpacing: "0.14px",
  whiteSpace: "nowrap",
};

const dropdownStyle: React.CSSProperties = {
  position: "absolute",
  top: "calc(100% + 6px)",
  left: 0,
  background: "white",
  borderRadius: 10,
  boxShadow: "0px 10px 25px -5px rgba(0,0,0,0.15), 0px 4px 10px -4px rgba(0,0,0,0.08)",
  border: "1px solid rgba(194,198,213,0.30)",
  zIndex: 150,
  minWidth: "100%",
  overflow: "hidden",
};

interface SearchBarProps {
  destination: string;
  onDestinationChange: (d: string) => void;
  dateRange: string;
  onDateRangeChange: (d: string) => void;
  adults: number;
  onAdultsChange: (n: number) => void;
  rooms: number;
  onRoomsChange: (n: number) => void;
  onSearch: () => void;
}

function useClickOutside(ref: React.RefObject<HTMLElement | null>, onClose: () => void) {
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [ref, onClose]);
}

export default function SearchBar({
  destination,
  onDestinationChange,
  dateRange,
  onDateRangeChange,
  adults,
  onAdultsChange,
  rooms,
  onRoomsChange,
  onSearch,
}: SearchBarProps) {
  const [destOpen, setDestOpen] = useState(false);
  const [dateOpen, setDateOpen] = useState(false);
  const [travelOpen, setTravelOpen] = useState(false);
  const { isMobile } = useBreakpoint();

  const destRef = useRef<HTMLDivElement>(null);
  const dateRef = useRef<HTMLDivElement>(null);
  const travelRef = useRef<HTMLDivElement>(null);

  useClickOutside(destRef, () => setDestOpen(false));
  useClickOutside(dateRef, () => setDateOpen(false));
  useClickOutside(travelRef, () => setTravelOpen(false));

  const travelLabel = `${adults} Adult${adults !== 1 ? "s" : ""}, ${rooms} Room${rooms !== 1 ? "s" : ""}`;

  return (
    <div
      style={{
        position: "sticky",
        top: 64,
        zIndex: 40,
        background: "white",
        boxShadow: "0px 1px 2px rgba(0,0,0,0.05)",
        borderBottom: "1px rgba(194,198,213,0.30) solid",
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          paddingLeft: isMobile ? 16 : 24,
          paddingRight: isMobile ? 16 : 24,
          paddingTop: 12,
          paddingBottom: 12,
          display: "flex",
          flexWrap: isMobile ? "wrap" : "nowrap",
          alignItems: isMobile ? "stretch" : "center",
          gap: isMobile ? 8 : 16,
        }}
      >
        {/* Destination */}
        <div ref={destRef} style={{ ...fieldStyle, flex: isMobile ? "1 1 100%" : "1 1 0", minWidth: isMobile ? 0 : 280 }} onClick={() => setDestOpen((o) => !o)}>
          <MapPin size={20} color="#005CBD" style={{ flexShrink: 0 }} />
          <div style={{ flex: 1 }}>
            <p style={labelStyle}>Destination</p>
            <p style={valueStyle}>{destination}</p>
          </div>
          <motion.span animate={{ rotate: destOpen ? 180 : 0 }} transition={{ duration: 0.2 }} style={{ display: "flex" }}>
            <ChevronDown size={14} color="#6B7280" />
          </motion.span>
          <AnimatePresence>
            {destOpen && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.15 }}
                style={dropdownStyle}
                onClick={(e) => e.stopPropagation()}
              >
                {DESTINATIONS.map((d) => (
                  <motion.button
                    key={d}
                    whileHover={{ background: d === destination ? "#E6EEFA" : "#F5F7FF" }}
                    onClick={() => { onDestinationChange(d); setDestOpen(false); }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      width: "100%",
                      padding: "10px 16px",
                      background: d === destination ? "#EEF3FF" : "white",
                      border: "none",
                      cursor: "pointer",
                      fontFamily: "inherit",
                      fontSize: 14,
                      color: d === destination ? "#005CBD" : "#191C22",
                      fontWeight: d === destination ? 600 : 400,
                      textAlign: "left",
                    }}
                  >
                    <MapPin size={13} color={d === destination ? "#005CBD" : "#6B7280"} />
                    {d}
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Dates */}
        <div ref={dateRef} style={{ ...fieldStyle, flex: isMobile ? "1 1 calc(50% - 4px)" : undefined }} onClick={() => setDateOpen((o) => !o)}>
          <Calendar size={20} color="#005CBD" style={{ flexShrink: 0 }} />
          <div>
            <p style={labelStyle}>Dates</p>
            <p style={valueStyle}>{dateRange}</p>
          </div>
          <motion.span animate={{ rotate: dateOpen ? 180 : 0 }} transition={{ duration: 0.2 }} style={{ display: "flex", marginLeft: 8 }}>
            <ChevronDown size={14} color="#6B7280" />
          </motion.span>
          <AnimatePresence>
            {dateOpen && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.15 }}
                style={{ ...dropdownStyle, minWidth: 260 }}
                onClick={(e) => e.stopPropagation()}
              >
                {DATE_RANGES.map((d) => (
                  <motion.button
                    key={d}
                    whileHover={{ background: d === dateRange ? "#E6EEFA" : "#F5F7FF" }}
                    onClick={() => { onDateRangeChange(d); setDateOpen(false); }}
                    style={{
                      display: "block",
                      width: "100%",
                      padding: "10px 16px",
                      background: d === dateRange ? "#EEF3FF" : "white",
                      border: "none",
                      cursor: "pointer",
                      fontFamily: "inherit",
                      fontSize: 14,
                      color: d === dateRange ? "#005CBD" : "#191C22",
                      fontWeight: d === dateRange ? 600 : 400,
                      textAlign: "left",
                    }}
                  >
                    {d}
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Travelers */}
        <div ref={travelRef} style={{ ...fieldStyle, flex: isMobile ? "1 1 calc(50% - 4px)" : undefined }} onClick={() => setTravelOpen((o) => !o)}>
          <Users size={16} color="#005CBD" style={{ flexShrink: 0 }} />
          <div>
            <p style={labelStyle}>Travelers</p>
            <p style={valueStyle}>{travelLabel}</p>
          </div>
          <motion.span animate={{ rotate: travelOpen ? 180 : 0 }} transition={{ duration: 0.2 }} style={{ display: "flex", marginLeft: 8 }}>
            <ChevronDown size={14} color="#6B7280" />
          </motion.span>
          <AnimatePresence>
            {travelOpen && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.15 }}
                style={{ ...dropdownStyle, minWidth: 240, padding: "16px" }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Adults row */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 600, color: "#191C22", marginBottom: 2 }}>Adults</p>
                    <p style={{ fontSize: 12, color: "#6B7280" }}>Ages 18+</p>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <motion.button
                      whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                      onClick={() => onAdultsChange(Math.max(1, adults - 1))}
                      style={{ width: 28, height: 28, borderRadius: 9999, border: "1px solid #C2C6D5", background: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
                    >
                      <Minus size={12} color="#424753" />
                    </motion.button>
                    <span style={{ fontSize: 14, fontWeight: 600, color: "#191C22", minWidth: 20, textAlign: "center" }}>{adults}</span>
                    <motion.button
                      whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                      onClick={() => onAdultsChange(Math.min(10, adults + 1))}
                      style={{ width: 28, height: 28, borderRadius: 9999, border: "none", background: "#005CBD", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
                    >
                      <Plus size={12} color="white" />
                    </motion.button>
                  </div>
                </div>
                {/* Rooms row */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 600, color: "#191C22", marginBottom: 2 }}>Rooms</p>
                    <p style={{ fontSize: 12, color: "#6B7280" }}>Number of rooms</p>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <motion.button
                      whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                      onClick={() => onRoomsChange(Math.max(1, rooms - 1))}
                      style={{ width: 28, height: 28, borderRadius: 9999, border: "1px solid #C2C6D5", background: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
                    >
                      <Minus size={12} color="#424753" />
                    </motion.button>
                    <span style={{ fontSize: 14, fontWeight: 600, color: "#191C22", minWidth: 20, textAlign: "center" }}>{rooms}</span>
                    <motion.button
                      whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                      onClick={() => onRoomsChange(Math.min(10, rooms + 1))}
                      style={{ width: 28, height: 28, borderRadius: 9999, border: "none", background: "#005CBD", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
                    >
                      <Plus size={12} color="white" />
                    </motion.button>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  onClick={() => setTravelOpen(false)}
                  style={{ marginTop: 16, width: "100%", padding: "8px 0", background: "#005CBD", color: "white", border: "none", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}
                >
                  Done
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Update Search */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onSearch}
          style={{
            flex: isMobile ? "1 1 100%" : undefined,
            paddingLeft: 32,
            paddingRight: 32,
            paddingTop: 12,
            paddingBottom: 12,
            background: "#005CBD",
            borderRadius: 12,
            boxShadow: "0px 4px 6px -4px rgba(0,92,189,0.20), 0px 10px 15px -3px rgba(0,92,189,0.20)",
            color: "white",
            fontSize: 16,
            fontWeight: 400,
            lineHeight: "24px",
            whiteSpace: "nowrap",
            border: "none",
            cursor: "pointer",
            fontFamily: "inherit",
          }}
        >
          Update Search
        </motion.button>
      </div>
    </div>
  );
}
