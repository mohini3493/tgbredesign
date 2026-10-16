"use client";

import { useQuery } from "@tanstack/react-query";
import { z } from "zod";
import { riderSchema } from "../schemas";

export type Coords = { lat: number; lng: number };

const responseSchema = z.object({ data: z.array(riderSchema) });

/** Fetches nearby riders through the BFF route (keeps API keys & base URL server-side). */
export function useNearbyRiders(params: { coords?: Coords; city?: string }) {
  return useQuery({
    queryKey: ["riders", "nearby", params.coords ?? null, params.city ?? null],
    queryFn: async ({ signal }) => {
      const qs = new URLSearchParams({ limit: "6" });
      if (params.coords) {
        qs.set("lat", params.coords.lat.toFixed(3));
        qs.set("lng", params.coords.lng.toFixed(3));
      }
      if (params.city) qs.set("city", params.city);
      const res = await fetch(`/api/riders/nearby?${qs}`, { signal });
      if (!res.ok) throw new Error("Failed to load riders");
      return responseSchema.parse(await res.json()).data;
    },
    staleTime: 60_000,
  });
}
