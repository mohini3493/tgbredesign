"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import type { HeroSlide } from "@/config/site";
import { SmartImage } from "@/components/shared/SmartImage";

const INTERVAL_MS = 6000;

/**
 * Hero background slider: every slide is mounted (so each is loaded before it fades in)
 * and the active one crossfades over the rest. Reduced motion keeps the first slide.
 */
export function HeroSlides({ slides }: { slides: HeroSlide[] }) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (reduce || slides.length < 2) return;
    const id = setInterval(() => setActive((i) => (i + 1) % slides.length), INTERVAL_MS);
    return () => clearInterval(id);
  }, [reduce, slides.length]);

  return slides.map((slide, i) => (
    <motion.div
      key={slide.src}
      className="absolute inset-0"
      initial={false}
      animate={{ opacity: i === active ? 1 : 0 }}
      transition={{ duration: 1.4, ease: "easeInOut" }}
      aria-hidden={i !== active}
    >
      <SmartImage
        src={slide.src}
        alt={slide.alt}
        fill
        priority={i === 0}
        sizes="100vw"
        className="object-cover"
        style={{ objectPosition: slide.position }}
      />
    </motion.div>
  ));
}
