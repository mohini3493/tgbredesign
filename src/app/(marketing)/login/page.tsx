import type { Metadata } from "next";
import { ComingSoon } from "@/components/shared/ComingSoon";

export const metadata: Metadata = { title: "Log in", description: "Rider accounts are coming to the web soon." };

export default function LoginPage() {
  return <ComingSoon title="Log in" description="Rider accounts are coming to the web soon." />;
}
