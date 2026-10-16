import type { Metadata } from "next";
import { ComingSoon } from "@/components/shared/ComingSoon";

export const metadata: Metadata = { title: "Contact Us" };

export default function ContactPage() {
  return <ComingSoon title="Contact Us" />;
}
