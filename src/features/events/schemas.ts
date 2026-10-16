import { z } from "zod";

export const eventSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  venue: z.string(),
  city: z.string(),
  startDate: z.string(), // ISO yyyy-mm-dd
  endDate: z.string(),
  coverImage: z.string().url(),
  ticketUrl: z.string(),
  priceINR: z.number().optional(),
  category: z.string().optional(),
  membersOnly: z.boolean().default(false),
});
export type TgbEvent = z.infer<typeof eventSchema>;
