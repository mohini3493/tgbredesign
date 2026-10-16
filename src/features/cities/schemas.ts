import { z } from "zod";

export const citySchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  image: z.string().url(),
  ridersCount: z.number(),
  clubsCount: z.number(),
});
export type City = z.infer<typeof citySchema>;
