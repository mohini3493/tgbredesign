export type MembershipTierId = "free" | "rider" | "pro";

export type MembershipTier = {
  id: MembershipTierId;
  name: string;
  priceINR: number;
  interval: "month" | "year";
  perks: string[];
};

/** Higher rank = more access. Used by <MembershipGate>. */
export const tierRank: Record<MembershipTierId, number> = { free: 0, rider: 1, pro: 2 };

export const hasTier = (current: MembershipTierId, required: MembershipTierId) =>
  tierRank[current] >= tierRank[required];
