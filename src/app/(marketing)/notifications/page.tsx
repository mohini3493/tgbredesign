import type { Metadata } from "next";
import { ComingSoon } from "@/components/shared/ComingSoon";

export const metadata: Metadata = { title: "Notifications", description: "Sign in on the app to see your notifications." };

export default function NotificationsPage() {
  return <ComingSoon title="Notifications" description="Sign in on the app to see your notifications." />;
}
