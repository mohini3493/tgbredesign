import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { clubProfile } from "@/features/clubs/club-profile";
import {
  ClubAbout,
  ClubHero,
  ClubJoinCta,
  ClubMedia,
  ClubRides,
  ClubTabs,
} from "@/features/clubs/components/profile/ClubProfile";

// Demo club while the clubs API is wired up: keep it out of search.
export const metadata: Metadata = {
  title: clubProfile.name,
  description: clubProfile.tagline,
  robots: { index: false, follow: false },
};

/** Club profile page (Bangalore Bikers). Actions that need an account open the app download popup. */
export default function ClubPage() {
  return (
    <>
      <ClubHero club={clubProfile} />
      <ClubTabs />
      <Container className="flex flex-col gap-10 py-10 lg:gap-12 lg:py-12">
        <ClubAbout club={clubProfile} />
        <ClubRides club={clubProfile} />
        <ClubMedia club={clubProfile} />
        <ClubJoinCta club={clubProfile} />
      </Container>
    </>
  );
}
