import { MapPin } from "lucide-react";
import { ReactNode } from "react";

const sectionTitleStyle: React.CSSProperties = {
  fontSize: 14,
  color: "#191C22",
  fontWeight: 600,
  lineHeight: "19.6px",
  letterSpacing: "0.14px",
  marginBottom: 12,
};

const checkboxStyle: React.CSSProperties = {
  width: 20,
  height: 20,
  background: "white",
  borderRadius: 4,
  border: "1px solid #C2C6D5",
  flexShrink: 0,
};

const labelStyle: React.CSSProperties = {
  fontSize: 14,
  color: "#191C22",
  fontWeight: 400,
  lineHeight: "20px",
};

function CheckItem({ label }: { label: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <div style={checkboxStyle} />
      <span style={labelStyle}>{label}</span>
    </div>
  );
}

function StarCheckItem({ count }: { count: number }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <div style={checkboxStyle} />
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
    </div>
  );
}

function Section({ title, gap = 8, children }: { title: string; gap?: number; children: ReactNode }) {
  return (
    <div style={{ paddingTop: 8 }}>
      <p style={sectionTitleStyle}>{title}</p>
      <div style={{ display: "flex", flexDirection: "column", gap }}>{children}</div>
    </div>
  );
}

function Divider() {
  return (
    <div
      style={{
        height: 1,
        background: "rgba(194, 198, 213, 0.30)",
        margin: "4px 0",
      }}
    />
  );
}

export default function FilterSidebar() {
  return (
    <div style={{ width: 256, flexShrink: 0, display: "flex", flexDirection: "column", gap: 16 }}>
      {/* Filter card */}
      <div
        style={{
          background: "white",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.05)",
          borderRadius: 12,
          outline: "1px rgba(194, 198, 213, 0.20) solid",
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
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {/* Filter icon */}
          <svg width="18" height="12" viewBox="0 0 18 12" fill="#005CBD">
            <rect y="0" width="18" height="2" rx="1" />
            <rect x="3" y="5" width="12" height="2" rx="1" />
            <rect x="6" y="10" width="6" height="2" rx="1" />
          </svg>
          <span style={{ fontSize: 18, color: "#191C22", fontWeight: 400, lineHeight: "28px" }}>
            Filters
          </span>
        </div>

        {/* Price Range */}
        <div>
          <p style={sectionTitleStyle}>Price Range</p>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
            <span style={{ fontSize: 12, color: "#424753", fontWeight: 500 }}>$0</span>
            <span style={{ fontSize: 12, color: "#424753", fontWeight: 500 }}>$1000+</span>
          </div>
          <div
            style={{
              height: 6,
              background: "#E1E2EB",
              borderRadius: 8,
              position: "relative",
            }}
          />
        </div>

        <Divider />

        <Section title="Property Type">
          {["Hotels", "Resorts", "Apartments", "Villas"].map((t) => (
            <CheckItem key={t} label={t} />
          ))}
        </Section>

        <Divider />

        <Section title="Star Rating">
          <StarCheckItem count={5} />
          <StarCheckItem count={4} />
        </Section>

        <Divider />

        <Section title="Facilities">
          {["Free Wi-Fi", "Swimming Pool", "Fitness Center", "Spa", "Parking", "Pet Friendly"].map(
            (f) => (
              <CheckItem key={f} label={f} />
            )
          )}
        </Section>

        <Divider />

        <Section title="Review Score">
          {["Superb 9+", "Very Good 8+", "Good 7+"].map((s) => (
            <CheckItem key={s} label={s} />
          ))}
        </Section>

        <Divider />

        <Section title="Neighborhood">
          {["Patong", "Karon", "Kata", "Kamala"].map((n) => (
            <CheckItem key={n} label={n} />
          ))}
        </Section>

        <Divider />

        <Section title="Bed Type">
          {["Single", "Double", "King"].map((b) => (
            <CheckItem key={b} label={b} />
          ))}
        </Section>
      </div>

      {/* Map preview */}
      <div
        style={{
          height: 160,
          borderRadius: 12,
          overflow: "hidden",
          position: "relative",
          boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.05)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=512&h=320&fit=crop&q=80"
          alt="Map"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        {/* Blue overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0, 92, 189, 0.20)",
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
              boxShadow:
                "0px 4px 6px -4px rgba(0, 0, 0, 0.10), 0px 10px 15px -3px rgba(0, 0, 0, 0.10)",
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
