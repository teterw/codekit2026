import { ChevronDown } from "lucide-react";

export default function ResultsHeader() {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <span style={{ fontSize: 20, color: "#191C22", fontWeight: 400, lineHeight: "28px" }}>
        245 properties in Bali
      </span>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ fontSize: 12, color: "#424753", fontWeight: 500, lineHeight: "16.8px" }}>
          Sort by:
        </span>
        <button
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            fontSize: 16,
            color: "#005CBD",
            fontWeight: 400,
            lineHeight: "24px",
            background: "none",
            border: "none",
            cursor: "pointer",
            fontFamily: "inherit",
            padding: "8px 0 8px 12px",
          }}
        >
          Recommended
          <ChevronDown size={16} color="#6B7280" />
        </button>
      </div>
    </div>
  );
}
