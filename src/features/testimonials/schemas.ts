import { z } from "zod";

export const testimonialSchema = z.object({
  id: z.string(),
  name: z.string(),
  city: z.string(),
  avatar: z.string().url().optional(),
  quote: z.string(),
});
export type Testimonial = z.infer<typeof testimonialSchema>;
