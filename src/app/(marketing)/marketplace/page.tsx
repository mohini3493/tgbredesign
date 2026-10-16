import type { Metadata } from "next";
import { ComingSoon } from "@/components/shared/ComingSoon";

export const metadata: Metadata = { title: "Marketplace", description: "Rentals, accessories and trusted service partners." };

export default function MarketplacePage() {
  return <ComingSoon title="Marketplace" description="Rentals, accessories and trusted service partners." />;
}
