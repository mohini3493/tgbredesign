import { apiFetch, paginated } from "@/lib/api/client";
import { endpoints } from "@/lib/api/endpoints";
import { isMock } from "@/lib/data-source";
import mock from "@/mocks/riders.json";
import { riderSchema, type NearbyQuery } from "./schemas";

const listSchema = paginated(riderSchema);

/**
 * Riders near you is personalised (location), so it is NOT cached with "use cache".
 * It is served through the BFF route /api/riders/nearby and fetched client-side
 * with TanStack Query.
 */
export const ridersService = {
  async getNearby(query: NearbyQuery) {
    if (isMock()) {
      const all = listSchema.parse(mock).data;
      // Mock "nearby": riders in the requested city first, online riders next
      const city = query.city?.toLowerCase();
      return [...all]
        .sort(
          (a, b) =>
            Number(b.city.toLowerCase() === city) - Number(a.city.toLowerCase() === city) ||
            Number(b.isOnline) - Number(a.isOnline),
        )
        .slice(0, query.limit);
    }
    const res = await apiFetch(endpoints.nearbyRiders(query), listSchema, { cache: "no-store" });
    return res.data;
  },
};
