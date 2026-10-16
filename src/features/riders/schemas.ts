import { z } from "zod";

export const riderSchema = z.object({
  id: z.string(),
  username: z.string(),
  name: z.string(),
  avatar: z.string().url(),
  city: z.string(),
  styles: z.array(z.string()),
  ridesCount: z.number(),
  totalKm: z.number(),
  isOnline: z.boolean(),
  bike: z.string().optional(),
});
export type Rider = z.infer<typeof riderSchema>;

export const nearbyQuerySchema = z.object({
  lat: z.coerce.number().min(-90).max(90).optional(),
  lng: z.coerce.number().min(-180).max(180).optional(),
  city: z.string().max(60).optional(),
  limit: z.coerce.number().int().min(1).max(20).default(6),
});
export type NearbyQuery = z.infer<typeof nearbyQuerySchema>;
