import { ReactNode } from "react";

export default function TagBadge({ icon, label }: { icon?: ReactNode; label: string }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 4,
        paddingBottom: 4,
        background: "#ECEDF6",
        borderRadius: 6,
        fontSize: 12,
        color: "#424753",
        fontWeight: 500,
        lineHeight: "16px",
        whiteSpace: "nowrap",
      }}
    >
      {icon && <span style={{ color: "#005CBD", display: "flex", alignItems: "center" }}>{icon}</span>}
      {label}
    </span>
  );
}
