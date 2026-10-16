import type { MetadataRoute } from "next";
import { mainNav, siteConfig } from "@/config/site";
import { routesService } from "@/features/routes/services";
import { citiesService } from "@/features/cities/services";
import { eventsService } from "@/features/events/services";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [routes, cities, events] = await Promise.all([
    routesService.getPopular(50),
    citiesService.getAll(),
    eventsService.getUpcoming(50),
  ]);
  const u = (p: string) => `${siteConfig.url}${p}`;
  return [
    { url: u("/"), changeFrequency: "daily", priority: 1 },
    ...mainNav.map((n) => ({ url: u(n.href), changeFrequency: "weekly" as const, priority: 0.8 })),
    ...routes.map((r) => ({ url: u(`/routes/${r.slug}`), changeFrequency: "monthly" as const, priority: 0.7 })),
    ...cities.map((c) => ({ url: u(`/cities/${c.slug}`), changeFrequency: "weekly" as const, priority: 0.6 })),
    ...events.map((e) => ({ url: u(`/events/${e.slug}`), changeFrequency: "weekly" as const, priority: 0.7 })),
  ];
}
