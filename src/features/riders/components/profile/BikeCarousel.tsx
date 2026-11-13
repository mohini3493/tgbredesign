"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { SmartImage } from "@/components/shared/SmartImage";
import type { Bike } from "../../profile";

const arrow =
  "grid size-7 place-items-center rounded-full border border-border text-ink transition-colors hover:border-primary hover:text-primary disabled:opacity-40";

/** "Currently riding" card body: steps through the rider's garage with the header arrows. */
export function BikeCarousel({ bikes, titleId }: { bikes: Bike[]; titleId: string }) {
  const [index, setIndex] = useState(0);
  const bike = bikes[index];
  const many = bikes.length > 1;

  return (
    <>
      <div className="flex items-center justify-between">
        <h2 id={titleId} className="font-jakarta text-ink text-lg font-semibold">
          Currently Riding
        </h2>
        {many && (
          <div className="flex gap-1.5">
            <button
              type="button"
              aria-label="Previous bike"
              className={arrow}
              onClick={() => setIndex((i) => (i - 1 + bikes.length) % bikes.length)}
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              type="button"
              aria-label="Next bike"
              className={arrow}
              onClick={() => setIndex((i) => (i + 1) % bikes.length)}
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        )}
      </div>

      <div aria-live="polite">
        <div className="relative mt-4 aspect-[16/10] overflow-hidden rounded-[12px]">
          <SmartImage key={bike.image} src={bike.image} alt={bike.name} fill sizes="380px" className="animate-fade-up object-cover" />
        </div>
        <div className="mt-4 flex items-start justify-between gap-3">
          <p className="font-jakarta text-ink text-lg font-semibold">{bike.name}</p>
          <span className="font-display text-primary text-xl leading-none font-extrabold italic uppercase">
            {bike.make}
          </span>
        </div>
        <p className="text-body mt-1 text-sm">
          {bike.year}
          <span className="text-border mx-2" aria-hidden>
            |
          </span>
          {bike.odometerKm.toLocaleString("en-IN")} km
        </p>
      </div>
    </>
  );
}
