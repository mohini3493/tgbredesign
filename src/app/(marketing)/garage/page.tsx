import type { Metadata } from "next";
import { ComingSoon } from "@/components/shared/ComingSoon";

export const metadata: Metadata = { title: "Garage", description: "Your bikes, service history and maintenance reminders." };

export default function GaragePage() {
  return <ComingSoon title="Garage" description="Your bikes, service history and maintenance reminders." />;
}
