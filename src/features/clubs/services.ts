import { cacheLife, cacheTag } from "next/cache";
import { apiFetch, paginated } from "@/lib/api/client";
import { endpoints } from "@/lib/api/endpoints";
import { isMock } from "@/lib/data-source";
import mock from "@/mocks/clubs.json";
import directoryMock from "@/mocks/clubs-directory.json";
import { clubListingSchema, clubSchema } from "./schemas";

const listSchema = paginated(clubSchema);
const directorySchema = paginated(clubListingSchema);

async function getPopular(limit = 6) {
  "use cache";
  cacheLife("hours");
  cacheTag("clubs");
  const res = isMock()
    ? listSchema.parse(mock)
    : await apiFetch(endpoints.popularClubs(limit), listSchema);
  return res.data.slice(0, limit);
}

/** Every club for the /clubs directory; searching, filtering and paging happen client-side. */
async function getDirectory() {
  "use cache";
  cacheLife("hours");
  cacheTag("clubs");
  const res = isMock()
    ? directorySchema.parse(directoryMock)
    : await apiFetch(endpoints.clubs(), directorySchema);
  return res.data;
}

export const clubsService = { getPopular, getDirectory };
