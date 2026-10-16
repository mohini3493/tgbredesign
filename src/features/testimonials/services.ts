import { cacheLife, cacheTag } from "next/cache";
import { apiFetch, paginated } from "@/lib/api/client";
import { endpoints } from "@/lib/api/endpoints";
import { isMock } from "@/lib/data-source";
import mock from "@/mocks/testimonials.json";
import { testimonialSchema } from "./schemas";

const listSchema = paginated(testimonialSchema);

async function getFeatured() {
  "use cache";
  cacheLife("days");
  cacheTag("testimonials");
  const res = isMock()
    ? listSchema.parse(mock)
    : await apiFetch(endpoints.testimonials(), listSchema);
  return res.data;
}

export const testimonialsService = { getFeatured };
