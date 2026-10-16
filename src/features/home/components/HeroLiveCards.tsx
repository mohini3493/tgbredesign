"use client";

import { motion, useReducedMotion, type MotionValue, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { CalendarDays, Navigation, Users } from "lucide-react";

/** Floating glass cards that hint at the live app. Desktop only. */
export function HeroLiveCards({ mx, my }: { mx: MotionValue<number>; my: MotionValue<number> }) {
  const reduce = useReducedMotion();
  const x1 = useTransform(mx, (v) => v * -18);
  const y1 = useTransform(my, (v) => v * -14);
  const x2 = useTransform(mx, (v) => v * 26);
  const y2 = useTransform(my, (v) => v * 20);

  const [km, setKm] = useState(214.6);
  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setKm((k) => +(k + 0.1).toFixed(1)), 900);
    return () => clearInterval(id);
  }, [reduce]);

  const float = (delay: number) =>
    reduce ? {} : { animate: { y: [0, -10, 0] }, transition: { duration: 6, repeat: Infinity, ease: "easeInOut" as const, delay } };

  return (
    <>
      <motion.div style={{ x: x1, y: y1 }} className="absolute right-[6%] top-[24%] z-10 hidden xl:block">
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.9, ease: "easeOut" }}
        >
          <motion.div {...float(0)} className="w-[260px] rounded-2xl border border-white/15 bg-white/[0.08] p-4 text-white shadow-[0_20px_50px_rgba(0,0,0,0.35)] backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-white/80">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-primary" />
                </span>
                Live ride
              </span>
              <Navigation className="size-4 text-secondary" aria-hidden />
            </div>
            <p className="mt-2 font-jakarta text-lg font-semibold">Manali → Leh</p>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <div className="rounded-xl bg-white/[0.07] px-3 py-2">
                <p className="font-jakarta text-xl font-semibold tabular-nums">{km.toFixed(1)}</p>
                <p className="text-[10px] uppercase tracking-wide text-white/60">km covered</p>
              </div>
              <div className="rounded-xl bg-white/[0.07] px-3 py-2">
                <p className="font-jakarta text-xl font-semibold">4,920</p>
                <p className="text-[10px] uppercase tracking-wide text-white/60">m altitude</p>
              </div>
            </div>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full rounded-full bg-linear-to-r from-secondary to-primary"
                initial={{ width: "20%" }}
                animate={reduce ? { width: "44%" } : { width: ["20%", "78%"] }}
                transition={{ duration: 11, repeat: Infinity, ease: "linear" }}
              />
            </div>
            <p className="mt-2 flex items-center gap-1.5 text-xs text-white/70">
              <Users className="size-3.5 text-secondary" aria-hidden /> 7 riders · Touring Tribe India
            </p>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div style={{ x: x2, y: y2 }} className="absolute right-[6%] top-[52%] z-10 hidden xl:block">
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 1.15, ease: "easeOut" }}
        >
          <motion.div {...float(1.5)} className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/[0.08] py-2.5 pl-2.5 pr-4 text-white shadow-[0_20px_50px_rgba(0,0,0,0.3)] backdrop-blur-xl">
            <span className="grid size-10 place-items-center rounded-xl bg-primary">
              <CalendarDays className="size-5" aria-hidden />
            </span>
            <span>
              <span className="block text-[11px] uppercase tracking-wide text-white/60">Next event</span>
              <span className="block text-sm font-semibold">India Bike Week · 04 Dec</span>
            </span>
          </motion.div>
        </motion.div>
      </motion.div>
    </>
  );
}
