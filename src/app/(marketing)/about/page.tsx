import type { Metadata } from "next";
import {
  AboutApp,
  AboutBrands,
  AboutHero,
  AboutJourney,
  AboutMission,
  AboutPillars,
  AboutStats,
  AboutStory,
  AboutWhatWeDo,
} from "@/features/about/components/AboutSections";

export const metadata: Metadata = {
  title: "About TGB",
  description:
    "The Good Biker is India's most trusted motorcycling community — riders, clubs, routes, events, brands and stories, on and off the road.",
};

/** About page. Not linked from the nav or footer yet. CTAs open the app download popup. */
export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutMission />
      <AboutPillars />
      <AboutStats />
      <AboutStory />
      <AboutWhatWeDo />
      <AboutApp />
      <AboutBrands />
      <AboutJourney />
    </>
  );
}
