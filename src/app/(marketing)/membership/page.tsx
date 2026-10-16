import type { Metadata } from "next";
import { ComingSoon } from "@/components/shared/ComingSoon";

export const metadata: Metadata = { title: "Membership", description: "Perks, partner discounts and members-only rides — launching soon." };

export default function MembershipPage() {
  return <ComingSoon title="Membership" description="Perks, partner discounts and members-only rides — launching soon." />;
}
