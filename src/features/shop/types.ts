import { z } from "zod";

/**
 * E-commerce domain types (future module).
 * Kept framework-agnostic so they can map to a headless commerce backend
 * (Medusa / Shopify / custom) or the TGB API.
 */
export const variantSchema = z.object({
  id: z.string(),
  sku: z.string(),
  title: z.string(), // e.g. "L / Matte Black"
  priceINR: z.number(),
  compareAtINR: z.number().optional(),
  stock: z.number(),
  options: z.record(z.string(), z.string()).default({}),
});

export const productSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  brand: z.string().optional(),
  category: z.enum(["helmets", "jackets", "gloves", "luggage", "electronics", "parts", "rentals", "services"]),
  images: z.array(z.string().url()),
  description: z.string(),
  variants: z.array(variantSchema).min(1),
  membersPriceINR: z.number().optional(),
});

export type Variant = z.infer<typeof variantSchema>;
export type Product = z.infer<typeof productSchema>;

export type CartItem = {
  productId: string;
  variantId: string;
  title: string;
  image: string;
  unitPriceINR: number;
  quantity: number;
};

export type Cart = { items: CartItem[]; currency: "INR" };

export type OrderStatus = "pending" | "paid" | "shipped" | "delivered" | "cancelled" | "refunded";

export type Order = {
  id: string;
  items: CartItem[];
  subtotalINR: number;
  shippingINR: number;
  taxINR: number;
  totalINR: number;
  status: OrderStatus;
  createdAt: string;
};
