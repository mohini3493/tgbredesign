/**
 * Every backend path lives here. Shared contract with the mobile app (v1).
 * Paginated list responses use: { data: T[], meta: { page, limit, total } }
 */
export const endpoints = {
  homeStats: () => "/v1/home/stats",
  popularRoutes: (limit = 5) => `/v1/routes?popular=true&limit=${limit}`,
  upcomingEvents: (limit = 6) => `/v1/events?upcoming=true&limit=${limit}`,
  popularClubs: (limit = 6) => `/v1/clubs?popular=true&limit=${limit}`,
  nearbyRiders: (q: { lat?: number; lng?: number; city?: string; limit?: number }) => {
    const p = new URLSearchParams();
    if (q.lat != null) p.set("lat", String(q.lat));
    if (q.lng != null) p.set("lng", String(q.lng));
    if (q.city) p.set("city", q.city);
    p.set("limit", String(q.limit ?? 6));
    return `/v1/riders/nearby?${p.toString()}`;
  },
  cities: () => "/v1/cities",
  testimonials: () => "/v1/testimonials?featured=true",
  newsletter: () => "/v1/newsletter/subscribe",
  // Future modules
  products: () => "/v1/shop/products",
  cart: () => "/v1/shop/cart",
  membershipTiers: () => "/v1/membership/tiers",
  me: () => "/v1/auth/me",
} as const;
