import { cacheLife, cacheTag } from "next/cache";
import { z } from "zod";
import { apiFetch } from "@/lib/api/client";
import { endpoints } from "@/lib/api/endpoints";
import { isMock } from "@/lib/data-source";
import mock from "@/mocks/home-stats.json";
import { homeStatsSchema } from "./schemas";

const responseSchema = z.object({ data: homeStatsSchema });

async function getHomeStats() {
  "use cache";
  cacheLife("hours");
  cacheTag("stats");
  const res = isMock()
    ? responseSchema.parse(mock)
    : await apiFetch(endpoints.homeStats(), responseSchema);
  return res.data;
}

export const statsService = { getHomeStats };
