import { z } from "zod";

export const clubSchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  city: z.string(),
  memberCount: z.number(),
  coverImage: z.string().url(),
  logo: z.string().url().nullable(),
  ridingStyle: z.string().optional(),
  verified: z.boolean().default(false),
  membershipRequired: z.boolean().default(false),
});
export type Club = z.infer<typeof clubSchema>;
