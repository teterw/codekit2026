"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onChange: (page: number) => void;
}

function getPages(current: number, total: number): (number | "...")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages: (number | "...")[] = [1];
  if (current > 3) pages.push("...");
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  for (let i = start; i <= end; i++) pages.push(i);
  if (current < total - 2) pages.push("...");
  pages.push(total);
  return pages;
}

export default function Pagination({ currentPage, totalPages, onChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = getPages(currentPage, totalPages);

  const btnStyle = (active: boolean, disabled = false): React.CSSProperties => ({
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
    border: active ? "none" : "1px solid rgba(194,198,213,0.50)",
    cursor: disabled || active ? "default" : "pointer",
    fontFamily: "inherit",
    opacity: disabled ? 0.4 : 1,
    boxShadow: active
      ? "0px 4px 6px -4px rgba(0,92,189,0.20), 0px 10px 15px -3px rgba(0,92,189,0.20)"
      : "0px 1px 2px rgba(0,0,0,0.05)",
  });

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 32, paddingBottom: 32 }}>
      <motion.button
        whileHover={currentPage > 1 ? { scale: 1.06 } : undefined}
        whileTap={currentPage > 1 ? { scale: 0.95 } : undefined}
        onClick={() => currentPage > 1 && onChange(currentPage - 1)}
        style={btnStyle(false, currentPage === 1)}
      >
        <ChevronLeft size={16} color="#424753" />
      </motion.button>

      {pages.map((page, i) =>
        page === "..." ? (
          <span
            key={`dots-${i}`}
            style={{ width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, color: "#424753" }}
          >
            ...
          </span>
        ) : (
          <motion.button
            key={page}
            whileHover={page !== currentPage ? { scale: 1.06 } : undefined}
            whileTap={page !== currentPage ? { scale: 0.95 } : undefined}
            onClick={() => onChange(page as number)}
            style={btnStyle(page === currentPage)}
          >
            {page}
          </motion.button>
        )
      )}

      <motion.button
        whileHover={currentPage < totalPages ? { scale: 1.06 } : undefined}
        whileTap={currentPage < totalPages ? { scale: 0.95 } : undefined}
        onClick={() => currentPage < totalPages && onChange(currentPage + 1)}
        style={btnStyle(false, currentPage === totalPages)}
      >
        <ChevronRight size={16} color="#424753" />
      </motion.button>
    </div>
  );
}
