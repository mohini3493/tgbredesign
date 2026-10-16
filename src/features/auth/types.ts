import type { MembershipTierId } from "@/features/membership/types";

/** Session shape shared with the mobile app's auth (JWT from the TGB API). */
export type SessionUser = {
  id: string;
  name: string;
  username: string;
  avatar?: string;
  city?: string;
  membershipTier: MembershipTierId;
};

export type Session = { user: SessionUser; accessToken: string; expiresAt: string } | null;

export const SESSION_COOKIE = "tgb_session";
