export default function SkeletonCard() {
  return (
    <div
      style={{
        display: "flex",
        background: "white",
        borderRadius: 12,
        overflow: "hidden",
        outline: "1px rgba(194, 198, 213, 0.20) solid",
        outlineOffset: -1,
      }}
    >
      {/* Image skeleton */}
      <div
        style={{
          width: 256,
          minHeight: 200,
          flexShrink: 0,
          background: "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)",
          backgroundSize: "200% 100%",
          animation: "shimmer 1.5s infinite",
        }}
      />
      {/* Content skeleton */}
      <div style={{ flex: 1, padding: 20, display: "flex", flexDirection: "column", gap: 12 }}>
        <div style={{ height: 24, width: "60%", borderRadius: 6, background: "#f0f0f0", animation: "shimmer 1.5s infinite" }} />
        <div style={{ height: 14, width: "40%", borderRadius: 4, background: "#f0f0f0", animation: "shimmer 1.5s infinite 0.1s" }} />
        <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
          {[80, 60, 90].map((w) => (
            <div key={w} style={{ height: 24, width: w, borderRadius: 6, background: "#f0f0f0", animation: "shimmer 1.5s infinite 0.2s" }} />
          ))}
        </div>
      </div>
      {/* Right skeleton */}
      <div style={{ padding: 20, flexShrink: 0, minWidth: 190, display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div style={{ height: 44, width: 100, borderRadius: 8, background: "#f0f0f0", animation: "shimmer 1.5s infinite" }} />
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8 }}>
          <div style={{ height: 32, width: 80, borderRadius: 6, background: "#f0f0f0", animation: "shimmer 1.5s infinite 0.15s" }} />
          <div style={{ height: 36, width: 100, borderRadius: 8, background: "#f0f0f0", animation: "shimmer 1.5s infinite 0.25s" }} />
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
}
