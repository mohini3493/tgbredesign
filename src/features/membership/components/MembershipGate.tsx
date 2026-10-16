import Link from "next/link";
import { Lock } from "lucide-react";
import type { ReactNode } from "react";
import { features } from "@/config/features";
import { hasTier, type MembershipTierId } from "../types";

type Props = {
  tier: MembershipTierId;
  /** The viewer's current tier (from the session). Defaults to "free". */
  currentTier?: MembershipTierId;
  children: ReactNode;
  fallback?: ReactNode;
};

/**
 * Renders children only for members of `tier` or above; otherwise an upgrade prompt.
 * While the membership feature flag is off, it renders children for everyone.
 */
export function MembershipGate({ tier, currentTier = "free", children, fallback }: Props) {
  if (!features.membership || hasTier(currentTier, tier)) return <>{children}</>;
  return (
    fallback ?? (
      <div className="rounded-card border border-border bg-primary-tint p-6 text-center">
        <Lock className="mx-auto size-6 text-primary" aria-hidden />
        <p className="mt-2 font-semibold text-ink">Members only</p>
        <p className="mt-1 text-sm text-body">Upgrade to unlock this.</p>
        <Link href="/membership" className="mt-3 inline-block text-sm font-semibold text-primary">
          See membership plans →
        </Link>
      </div>
    )
  );
}
