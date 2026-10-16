import { cacheLife, cacheTag } from "next/cache";
import { apiFetch, paginated } from "@/lib/api/client";
import { endpoints } from "@/lib/api/endpoints";
import { isMock } from "@/lib/data-source";
import mock from "@/mocks/events.json";
import { eventSchema } from "./schemas";

const listSchema = paginated(eventSchema);

async function getUpcoming(limit = 6) {
  "use cache";
  // Events change more often than routes: revalidate every 15 minutes
  cacheLife({ stale: 300, revalidate: 900, expire: 86400 });
  cacheTag("events");
  const res = isMock()
    ? listSchema.parse(mock)
    : await apiFetch(endpoints.upcomingEvents(limit), listSchema);
  return [...res.data]
    .sort((a, b) => a.startDate.localeCompare(b.startDate))
    .slice(0, limit);
}

export const eventsService = { getUpcoming };
