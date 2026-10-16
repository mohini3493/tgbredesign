import type { Metadata } from "next";
import { ComingSoon } from "@/components/shared/ComingSoon";

export const metadata: Metadata = { title: "Routes & Trips", description: "5,000+ rider-curated routes with season, terrain, fuel stops and stays." };

export default function RoutesPage() {
  return <ComingSoon title="Routes & Trips" description="5,000+ rider-curated routes with season, terrain, fuel stops and stays." />;
}
