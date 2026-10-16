"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, LocateFixed, RotateCw } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useNearbyRiders, type Coords } from "../hooks/useNearbyRiders";
import { RiderRow } from "./RiderRow";

const DEFAULT_CITY = "Bangalore";

/**
 * Personalised list — rendered client-side. We never prompt for location on load;
 * the rider opts in with "Use my location". Until then we show a city fallback.
 */
export function RidersNearYou() {
  const [coords, setCoords] = useState<Coords>();
  const [geoState, setGeoState] = useState<"idle" | "locating" | "denied">("idle");
  const { data, isPending, isError, refetch } = useNearbyRiders({ coords, city: coords ? undefined : DEFAULT_CITY });

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
    <div className="flex h-full flex-col rounded-card border border-border bg-white p-5 shadow-card md:p-6">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-muted">
          {coords ? "Showing riders around you" : `Showing riders in ${DEFAULT_CITY}`}
        </p>
        {!coords && (
          <button
            type="button"
            onClick={locate}
            disabled={geoState === "locating"}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-secondary hover:text-secondary-hover disabled:opacity-60"
          >
            <LocateFixed className="size-4" aria-hidden />
            {geoState === "locating" ? "Locating…" : "Use my location"}
          </button>
        )}
      </div>
      {geoState === "denied" && (
        <p className="mt-2 text-xs text-muted">Location unavailable — showing {DEFAULT_CITY} instead.</p>
      )}

      <div aria-live="polite" className="flex-1">
        {isPending ? (
          <div className="mt-2 space-y-4 py-2">
            {Array.from({ length: 4 }, (_, i) => (
              <Skeleton key={i} className="h-16" />
            ))}
          </div>
        ) : isError ? (
          <div className="py-10 text-center">
            <p className="text-sm text-body">Couldn&apos;t load riders.</p>
            <button type="button" onClick={() => refetch()} className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-secondary">
              <RotateCw className="size-4" aria-hidden /> Try again
            </button>
          </div>
        ) : data.length === 0 ? (
          <p className="py-10 text-center text-sm text-muted">No riders nearby yet. Invite your crew!</p>
        ) : (
          <ul className="divide-y divide-border">
            {data.slice(0, 4).map((r) => (
              <RiderRow key={r.id} rider={r} />
            ))}
          </ul>
        )}
      </div>

      <Link href="/riders" className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-secondary hover:text-secondary-hover">
        View all riders <ArrowRight className="size-4" aria-hidden />
      </Link>
    </div>
  );
}
