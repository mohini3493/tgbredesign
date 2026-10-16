import { cacheLife, cacheTag } from "next/cache";
import { apiFetch, paginated } from "@/lib/api/client";
import { endpoints } from "@/lib/api/endpoints";
import { isMock } from "@/lib/data-source";
import mock from "@/mocks/routes.json";
import { routeSchema } from "./schemas";

const listSchema = paginated(routeSchema);

async function getPopular(limit = 5) {
  "use cache";
  cacheLife("hours");
  cacheTag("routes");
  const res = isMock()
    ? listSchema.parse(mock)
    : await apiFetch(endpoints.popularRoutes(limit), listSchema);
  return res.data.slice(0, limit);
}

export const routesService = { getPopular };
