import { MapPin, Calendar, Users } from "lucide-react";

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
  outline: "1px rgba(194, 198, 213, 0.50) solid",
  outlineOffset: -1,
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

export default function SearchBar() {
  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "white",
        boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.05)",
        borderBottom: "1px rgba(194, 198, 213, 0.30) solid",
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          paddingLeft: 24,
          paddingRight: 24,
          paddingTop: 16,
          paddingBottom: 16,
          display: "flex",
          alignItems: "center",
          gap: 16,
        }}
      >
        {/* Destination */}
        <div style={{ ...fieldStyle, flex: "1 1 0", minWidth: 280 }}>
          <MapPin size={20} color="#005CBD" style={{ flexShrink: 0 }} />
          <div>
            <p style={labelStyle}>Destination</p>
            <p style={valueStyle}>Bali, Indonesia</p>
          </div>
        </div>

        {/* Dates */}
        <div style={fieldStyle}>
          <Calendar size={20} color="#005CBD" style={{ flexShrink: 0 }} />
          <div>
            <p style={labelStyle}>Dates</p>
            <p style={valueStyle}>Oct 12 - Oct 19, 2024</p>
          </div>
        </div>

        {/* Travelers */}
        <div style={fieldStyle}>
          <Users size={16} color="#005CBD" style={{ flexShrink: 0 }} />
          <div>
            <p style={labelStyle}>Travelers</p>
            <p style={valueStyle}>2 Adults, 1 Room</p>
          </div>
        </div>

        {/* Update Search */}
        <button
          style={{
            paddingLeft: 32,
            paddingRight: 32,
            paddingTop: 12,
            paddingBottom: 12,
            background: "#005CBD",
            borderRadius: 12,
            boxShadow:
              "0px 4px 6px -4px rgba(0, 92, 189, 0.20), 0px 10px 15px -3px rgba(0, 92, 189, 0.20)",
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
        </button>
      </div>
    </div>
  );
}
