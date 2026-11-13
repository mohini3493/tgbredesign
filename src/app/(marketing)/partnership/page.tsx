import type { Metadata } from "next";
import {
  PartnershipAudience,
  PartnershipBrands,
  PartnershipCta,
  PartnershipHero,
  PartnershipPlatforms,
  PartnershipRacing,
  PartnershipTestimonials,
  PartnershipWhy,
} from "@/features/partnership/components/PartnershipSections";
import { statsService } from "@/features/stats/services";

export const metadata: Metadata = {
  title: "Partner with TGB",
  description:
    "Advertise with The Good Biker: reach India's biking community across our mobile app, website, community events and racing team.",
  // Partner brands and testimonials are from the design mock-up: index once each one is confirmed.
  robots: { index: false, follow: false },
};

/** Partnership / advertising page. Not linked anywhere yet. */
export default async function PartnershipPage() {
  const stats = await statsService.getHomeStats();
  return (
    <>
      <PartnershipHero stats={stats} />
      <PartnershipWhy />
      <PartnershipPlatforms />
      <PartnershipAudience stats={stats} />
      <PartnershipRacing />
      <PartnershipBrands />
      <PartnershipTestimonials />
      <PartnershipCta />
    </>
  );
}
