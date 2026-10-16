import type { Metadata } from "next";
import { ComingSoon } from "@/components/shared/ComingSoon";

export const metadata: Metadata = { title: "Search", description: "Search routes, riders, clubs and events." };

export default function SearchPage() {
  return <ComingSoon title="Search" description="Search routes, riders, clubs and events." />;
}
