import type { Metadata } from "next";
import { ComingSoon } from "@/components/shared/ComingSoon";

export const metadata: Metadata = { title: "Clubs", description: "150+ riding clubs across India. Find your tribe." };

export default function ClubsPage() {
  return <ComingSoon title="Clubs" description="150+ riding clubs across India. Find your tribe." />;
}
