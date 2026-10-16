import type { Metadata } from "next";
import { ComingSoon } from "@/components/shared/ComingSoon";

export const metadata: Metadata = { title: "Events", description: "Festivals, track days, expeditions and meetups." };

export default function EventsPage() {
  return <ComingSoon title="Events" description="Festivals, track days, expeditions and meetups." />;
}
