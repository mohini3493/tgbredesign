import { z } from "zod";

export const homeStatsSchema = z.object({
  riders: z.number(),
  clubs: z.number(),
  routes: z.number(),
  events: z.number(),
  cities: z.number(),
  kmRidden: z.number(),
});
export type HomeStats = z.infer<typeof homeStatsSchema>;
