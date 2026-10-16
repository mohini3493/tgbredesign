"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Lightweight, accessible carousel: native scroll-snap (swipe on touch),
 * arrow buttons on desktop, keyboard scrollable region.
 */
export function Carousel({
  children,
  label,
  className,
}: {
  children: ReactNode;
  label: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const update = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    update();
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [update]);

  const scroll = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: "smooth" });
  };

  const arrow =
    "absolute top-1/2 z-10 hidden size-11 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-surface text-ink shadow-card transition hover:border-secondary hover:text-secondary disabled:opacity-0 md:flex";

  return (
    <div className={cn("relative", className)}>
      <div
        ref={ref}
        onScroll={update}
        role="region"
        aria-label={label}
        tabIndex={0}
        className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-4 px-4 pb-2 md:mx-0 md:gap-6 md:scroll-px-0 md:px-0"
      >
        {children}
      </div>
      <button type="button" aria-label="Previous" onClick={() => scroll(-1)} disabled={!canPrev} className={cn(arrow, "-left-5")}>
        <ChevronLeft className="size-5" />
      </button>
      <button type="button" aria-label="Next" onClick={() => scroll(1)} disabled={!canNext} className={cn(arrow, "-right-5")}>
        <ChevronRight className="size-5" />
      </button>
    </div>
  );
}
