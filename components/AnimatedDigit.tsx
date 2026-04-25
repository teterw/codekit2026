"use client";

import { motion, AnimatePresence } from "framer-motion";

interface AnimatedDigitProps {
  value: string;
  mono?: boolean;
}

export function AnimatedDigit({ value, mono = true }: AnimatedDigitProps) {
  return (
    <span style={{ display: "inline-block", overflow: "hidden", height: "1.45em", position: "relative", verticalAlign: "bottom" }}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={value}
          initial={{ y: "-110%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "110%", opacity: 0 }}
          transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
          style={{
            display: "block",
            fontFamily: mono ? "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace" : "inherit",
          }}
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

interface AnimatedTimeProps {
  h: string;
  m: string;
  s: string;
  style?: React.CSSProperties;
}

export function AnimatedTime({ h, m, s, style }: AnimatedTimeProps) {
  const seg = (val: string) =>
    val.split("").map((ch, i) => <AnimatedDigit key={i} value={ch} />);

  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 1, ...style }}>
      {seg(h)}
      <span>:</span>
      {seg(m)}
      <span>:</span>
      {seg(s)}
    </span>
  );
}
