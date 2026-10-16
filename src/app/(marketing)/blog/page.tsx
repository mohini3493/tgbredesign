import type { Metadata } from "next";
import { ComingSoon } from "@/components/shared/ComingSoon";

export const metadata: Metadata = { title: "Blog", description: "Ride reports, route guides and gear reviews." };

export default function BlogPage() {
  return <ComingSoon title="Blog" description="Ride reports, route guides and gear reviews." />;
}
