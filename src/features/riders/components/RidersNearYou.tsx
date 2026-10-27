"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, LocateFixed, RotateCw } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useNearbyRiders, type Coords } from "../hooks/useNearbyRiders";
import { RiderCard } from "./RiderCard";

const DEFAULT_CITY = "Bangalore";
const grid = "mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-5 lg:grid-cols-6";

/**
 * Personalised list — rendered client-side. We never prompt for location on load;
 * the rider opts in with "Use my location". Until then we show a city fallback.
 */
export function RidersNearYou() {
  const [coords, setCoords] = useState<Coords>();
  const [geoState, setGeoState] = useState<"idle" | "locating" | "denied">("idle");
  const { data, isPending, isError, refetch } = useNearbyRiders({
    coords,
    city: coords ? undefined : DEFAULT_CITY,
  });

  const locate = () => {
    if (!("geolocation" in navigator)) return setGeoState("denied");
    setGeoState("locating");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setGeoState("idle");
      },
      () => setGeoState("denied"),
      { timeout: 8000, maximumAge: 600_000 },
    );
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-muted text-sm">
          {coords ? "Showing riders around you" : `Showing riders in ${DEFAULT_CITY}`}
        </p>
        {!coords && (
          <button
            type="button"
            onClick={locate}
            disabled={geoState === "locating"}
            className="text-secondary hover:text-primary inline-flex items-center gap-1.5 text-sm font-semibold disabled:opacity-60"
          >
            <LocateFixed className="text-primary size-4" aria-hidden />
            {geoState === "locating" ? "Locating…" : "Use my location"}
          </button>
        )}
      </div>
      {geoState === "denied" && (
        <p className="text-muted mt-2 text-xs">
          Location unavailable — showing {DEFAULT_CITY} instead.
        </p>
      )}

      <div aria-live="polite">
        {isPending ? (
          <div className={grid}>
            {Array.from({ length: 6 }, (_, i) => (
              <Skeleton key={i} className="h-28" />
            ))}
          </div>
        ) : isError ? (
          <div className="py-10 text-center">
            <p className="text-body text-sm">Couldn&apos;t load riders.</p>
            <button
              type="button"
              onClick={() => refetch()}
              className="text-secondary mt-2 inline-flex items-center gap-1.5 text-sm font-semibold"
            >
              <RotateCw className="text-primary size-4" aria-hidden /> Try again
            </button>
          </div>
        ) : data.length === 0 ? (
          <p className="text-muted py-10 text-center text-sm">
            No riders nearby yet. Invite your crew!
          </p>
        ) : (
          <ul className={grid}>
            {data.slice(0, 6).map((r) => (
              <RiderCard key={r.id} rider={r} />
            ))}
          </ul>
        )}
      </div>

      <Link
        href="/riders"
        className="text-secondary hover:text-primary mt-4 inline-flex items-center gap-1.5 text-sm font-semibold"
      >
        View all riders <ArrowRight className="text-primary size-4" aria-hidden />
      </Link>
    </div>
  );
}
