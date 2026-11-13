import { z } from "zod";

export const clubSchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  city: z.string(),
  memberCount: z.number(),
  coverImage: z.string().url(),
  // Absolute URL (API/CDN) or a site-relative path like /images/clubs/x.svg
  logo: z
    .string()
    .regex(/^(https?:\/\/|\/)/)
    .nullable(),
  ridingStyle: z.string().optional(),
  verified: z.boolean().default(false),
  membershipRequired: z.boolean().default(false),
});
export type Club = z.infer<typeof clubSchema>;

/** A club as listed in the /clubs directory: the card data plus what the filters work on. */
export const clubListingSchema = clubSchema.extend({
  /** Empty for pan-India clubs */
  state: z.string(),
  rideCount: z.number(),
  tags: z.array(z.string()),
  description: z.string(),
  type: z.string(),
  bikeType: z.string(),
});
export type ClubListing = z.infer<typeof clubListingSchema>;
