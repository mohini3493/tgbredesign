import { cacheLife, cacheTag } from "next/cache";
import { apiFetch, paginated } from "@/lib/api/client";
import { endpoints } from "@/lib/api/endpoints";
import { isMock } from "@/lib/data-source";
import mock from "@/mocks/cities.json";
import { citySchema } from "./schemas";

const listSchema = paginated(citySchema);

async function getAll() {
  "use cache";
  cacheLife("hours");
  cacheTag("cities");
  const res = isMock() ? listSchema.parse(mock) : await apiFetch(endpoints.cities(), listSchema);
  return res.data;
}

export const citiesService = { getAll };
