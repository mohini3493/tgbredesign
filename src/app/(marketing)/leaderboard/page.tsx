import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { AboutJourney } from "@/features/about/components/AboutSections";
import { boards, lastUpdated } from "@/features/leaderboard/data";
import { LeaderboardBoard } from "@/features/leaderboard/components/LeaderboardBoard";
import { LeaderboardHero, LeaderboardHighlights, LeaderboardSidebar } from "@/features/leaderboard/components/LeaderboardSections";
import { statsService } from "@/features/stats/services";

export const metadata: Metadata = {
  title: "Leaderboard",
  description: "The TGB leaderboard ranks rider activity, club participation, exploration miles and community contributions.",
  // Demo standings until the leaderboard API is live
  robots: { index: false, follow: false },
};

/** Leaderboard page. Not linked anywhere yet. */
export default async function LeaderboardPage() {
  const stats = await statsService.getHomeStats();
  return (
    <>
      <LeaderboardHero stats={stats} />
      <Container className="flex flex-col gap-12 py-10 lg:py-12">
        <LeaderboardBoard boards={boards} lastUpdated={lastUpdated} sidebar={<LeaderboardSidebar />} />
        <LeaderboardHighlights />
      </Container>
      <AboutJourney />
    </>
  );
}
