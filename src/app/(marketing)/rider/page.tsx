import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { AboutJourney } from "@/features/about/components/AboutSections";
import { riderProfile } from "@/features/riders/profile";
import { RiderHero, RiderOverview, RiderSidebar } from "@/features/riders/components/profile/RiderProfile";

// Demo profile while the riders API is wired up: keep it out of search.
export const metadata: Metadata = {
  title: `${riderProfile.name} (@${riderProfile.username})`,
  description: riderProfile.bio,
  robots: { index: false, follow: false },
};

/** Rider profile page. Not linked anywhere yet; actions that need an account open the app download popup. */
export default function RiderPage() {
  return (
    <>
      <RiderHero rider={riderProfile} />
      <Container className="grid items-start gap-6 py-10 lg:grid-cols-[340px_minmax(0,1fr)] lg:py-12 xl:grid-cols-[380px_minmax(0,1fr)] xl:gap-8">
        <RiderSidebar rider={riderProfile} />
        <RiderOverview rider={riderProfile} />
      </Container>
      <AboutJourney />
    </>
  );
}
