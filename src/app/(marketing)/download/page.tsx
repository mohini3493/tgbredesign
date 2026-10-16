import type { Metadata } from "next";
import { ComingSoon } from "@/components/shared/ComingSoon";

export const metadata: Metadata = { title: "Get the TGB App", description: "Track rides, join clubs and message riders — on Android and iOS." };

export default function DownloadPage() {
  return <ComingSoon title="Get the TGB App" description="Track rides, join clubs and message riders — on Android and iOS." />;
}
