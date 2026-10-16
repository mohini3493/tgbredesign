import { cacheLife, cacheTag } from "next/cache";
import { apiFetch, paginated } from "@/lib/api/client";
import { endpoints } from "@/lib/api/endpoints";
import { isMock } from "@/lib/data-source";
import mock from "@/mocks/clubs.json";
import { clubSchema } from "./schemas";

const listSchema = paginated(clubSchema);

async function getPopular(limit = 6) {
  "use cache";
  cacheLife("hours");
  cacheTag("clubs");
  const res = isMock()
    ? listSchema.parse(mock)
    : await apiFetch(endpoints.popularClubs(limit), listSchema);
  return res.data.slice(0, limit);
}

export const clubsService = { getPopular };
