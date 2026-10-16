import { z } from "zod";

export const difficultySchema = z.enum(["easy", "intermediate", "expert"]);
export type Difficulty = z.infer<typeof difficultySchema>;

export const routeSchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  state: z.string(),
  distanceKm: z.number(),
  difficulty: difficultySchema,
  bestSeason: z.string(),
  durationDays: z.number().optional(),
  coverImage: z.string().url(),
  tagline: z.string().optional(),
});
export type Route = z.infer<typeof routeSchema>;
