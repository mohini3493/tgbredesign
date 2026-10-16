import type { Metadata } from "next";
import { ComingSoon } from "@/components/shared/ComingSoon";

export const metadata: Metadata = { title: "Riders", description: "Discover riders who ride like you." };

export default function RidersPage() {
  return <ComingSoon title="Riders" description="Discover riders who ride like you." />;
}
