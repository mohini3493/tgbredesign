import type { Metadata } from "next";
import { ComingSoon } from "@/components/shared/ComingSoon";

export const metadata: Metadata = { title: "Rides", description: "Join group rides near you or host your own." };

export default function RidesPage() {
  return <ComingSoon title="Rides" description="Join group rides near you or host your own." />;
}
