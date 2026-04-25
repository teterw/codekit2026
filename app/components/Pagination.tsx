import { ChevronLeft, ChevronRight } from "lucide-react";

const pageBtn = (active = false): React.CSSProperties => ({
  width: 40,
  height: 40,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 8,
  fontSize: 14,
  fontWeight: active ? 600 : 400,
  color: active ? "white" : "#424753",
  background: active ? "#005CBD" : "white",
  border: active ? "none" : "1px solid rgba(194, 198, 213, 0.50)",
  cursor: "pointer",
  fontFamily: "inherit",
  boxShadow: active
    ? "0px 4px 6px -4px rgba(0, 92, 189, 0.20), 0px 10px 15px -3px rgba(0, 92, 189, 0.20)"
    : "0px 1px 2px rgba(0, 0, 0, 0.05)",
});

export default function Pagination() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        marginTop: 32,
        paddingBottom: 32,
      }}
    >
      <button style={pageBtn()}>
        <ChevronLeft size={16} color="#424753" />
      </button>
      <button style={pageBtn(true)}>1</button>
      <button style={pageBtn()}>2</button>
      <button style={pageBtn()}>3</button>
      <span
        style={{
          width: 40,
          height: 40,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 14,
          color: "#424753",
        }}
      >
        ...
      </span>
      <button style={pageBtn()}>12</button>
      <button style={pageBtn()}>
        <ChevronRight size={16} color="#424753" />
      </button>
    </div>
  );
}
