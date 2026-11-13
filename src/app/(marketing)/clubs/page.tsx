import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { clubsService } from "@/features/clubs/services";
import { ClubsCta } from "@/features/clubs/components/directory/ClubsCta";
import { ClubsDirectory } from "@/features/clubs/components/directory/ClubsDirectory";
import { ClubsHero } from "@/features/clubs/components/directory/ClubsHero";
import { statsService } from "@/features/stats/services";

export const metadata: Metadata = {
  title: "Clubs",
  description: "Explore motorcycle clubs across India and connect with riders who share your passion for the road.",
};

/** Club directory. Both services are cached ("use cache"), so the page prerenders. */
export default async function ClubsPage() {
  const [clubs, stats] = await Promise.all([clubsService.getDirectory(), statsService.getHomeStats()]);
  return (
    <>
      <ClubsHero stats={stats} />
      <Container className="relative z-10 -mt-10 pb-12 md:-mt-14 md:pb-16">
        <div className="rounded-card border-border shadow-card overflow-hidden border bg-white">
          <ClubsDirectory clubs={clubs} />
        </div>
        <div className="mt-10">
          <ClubsCta />
        </div>
      </Container>
    </>
  );
}
