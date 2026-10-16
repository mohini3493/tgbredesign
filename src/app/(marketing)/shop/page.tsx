import type { Metadata } from "next";
import { ComingSoon } from "@/components/shared/ComingSoon";

export const metadata: Metadata = { title: "Shop", description: "Gear, accessories and rentals — launching soon." };

export default function ShopPage() {
  return <ComingSoon title="Shop" description="Gear, accessories and rentals — launching soon." />;
}
