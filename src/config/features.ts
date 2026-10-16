/**
 * Feature flags. Shop, membership and auth ship independently —
 * flip the env var and the related UI (cart icon, gates, login) appears.
 */
const flag = (v: string | undefined) => v === "true";

export const features = {
  shop: flag(process.env.NEXT_PUBLIC_FEATURE_SHOP),
  membership: flag(process.env.NEXT_PUBLIC_FEATURE_MEMBERSHIP),
  auth: flag(process.env.NEXT_PUBLIC_FEATURE_AUTH),
} as const;

export type FeatureName = keyof typeof features;
