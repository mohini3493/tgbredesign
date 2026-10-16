import type { Metadata } from "next";
import { ComingSoon } from "@/components/shared/ComingSoon";

export const metadata: Metadata = { title: "Cities", description: "Riders, clubs and routes in 25+ cities." };

export default function CitiesPage() {
  return <ComingSoon title="Cities" description="Riders, clubs and routes in 25+ cities." />;
}
