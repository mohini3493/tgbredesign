"use client";

import { motion, useReducedMotion } from "framer-motion";

// Deterministic streaks (no Math.random → stable SSR output)
const STREAKS = [
  { top: "58%", w: 180, d: 2.6, delay: 0 },
  { top: "64%", w: 120, d: 2.1, delay: 0.8 },
  { top: "71%", w: 220, d: 3.0, delay: 1.4 },
  { top: "77%", w: 90, d: 1.8, delay: 0.4 },
  { top: "83%", w: 160, d: 2.4, delay: 1.9 },
  { top: "49%", w: 100, d: 2.2, delay: 2.6 },
];

/** Thin speed lines rushing past — a sense of wind and motion. */
export function WindStreaks() {
  const reduce = useReducedMotion();
  if (reduce) return null;
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {STREAKS.map((s, i) => (
        <motion.span
          key={i}
          className="absolute right-0 h-px bg-linear-to-l from-transparent via-white/40 to-transparent"
          style={{ top: s.top, width: s.w }}
          initial={{ x: "0vw", opacity: 0 }}
          animate={{ x: ["10vw", "-110vw"], opacity: [0, 1, 0] }}
          transition={{ duration: s.d, delay: s.delay, repeat: Infinity, repeatDelay: 1.2, ease: "easeIn" }}
        />
      ))}
    </div>
  );
}
