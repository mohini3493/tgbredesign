import { describe, expect, it } from "vitest";
import { z } from "zod";
import { paginated } from "../api/client";
import { routeSchema } from "@/features/routes/schemas";
import { eventSchema } from "@/features/events/schemas";
import { clubSchema } from "@/features/clubs/schemas";
import { riderSchema } from "@/features/riders/schemas";
import { citySchema } from "@/features/cities/schemas";
import { homeStatsSchema } from "@/features/stats/schemas";
import routes from "@/mocks/routes.json";
import events from "@/mocks/events.json";
import clubs from "@/mocks/clubs.json";
import riders from "@/mocks/riders.json";
import cities from "@/mocks/cities.json";
import stats from "@/mocks/home-stats.json";

// Mocks must match the API contract exactly, so switching to the live API is safe.
describe("mock fixtures match API schemas", () => {
  it.each([
    ["routes", routes, paginated(routeSchema)],
    ["events", events, paginated(eventSchema)],
    ["clubs", clubs, paginated(clubSchema)],
    ["riders", riders, paginated(riderSchema)],
    ["cities", cities, paginated(citySchema)],
    ["stats", stats, z.object({ data: homeStatsSchema })],
  ] as const)("%s", (_name, fixture, schema) => {
    expect(schema.safeParse(fixture).success).toBe(true);
  });
});
