import { Suspense } from "react";
import { Section } from "@/components/layout/Section";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { SectionBoundary } from "@/components/shared/SectionBoundary";
import { Hero } from "@/features/home/components/Hero";
import { AppBanner } from "@/features/home/components/AppBanner";
import { RiderServices } from "@/features/home/components/RiderServices";
import { Testimonials, TestimonialsSkeleton, ValueProps } from "@/features/home/components/WhyTgb";
import { StatsStrip, StatsStripSkeleton } from "@/features/stats/components/StatsStrip";
import { PopularRoutes, PopularRoutesSkeleton } from "@/features/routes/components/PopularRoutes";
import {
  UpcomingEvents,
  UpcomingEventsSkeleton,
} from "@/features/events/components/UpcomingEvents";
import { PopularClubs, PopularClubsSkeleton } from "@/features/clubs/components/PopularClubs";
import { RidersNearYou } from "@/features/riders/components/RidersNearYou";
import { ExploreCities, ExploreCitiesSkeleton } from "@/features/cities/components/ExploreCities";
import { HomeJsonLd } from "@/features/home/components/HomeJsonLd";

/**
 * Homepage. Every data-driven section is wrapped in:
 *   SectionBoundary (error fallback) -> Suspense (skeleton) -> async server component (service call)
 * so one failing API call never breaks the page.
 */
export default function HomePage() {
  return (
    <>
      <Hero />

      <Section aria-labelledby="routes-title" className="pb-10 md:pb-14">
        <SectionHeader
          id="routes-title"
          eyebrow="Curated by riders"
          title="Popular routes"
          description="Legendary passes, coastal highways and weekend escapes — with season, distance and difficulty."
          action={{ label: "View all routes", href: "/routes" }}
        />
        <SectionBoundary title="Routes">
          <Suspense fallback={<PopularRoutesSkeleton />}>
            <PopularRoutes />
          </Suspense>
        </SectionBoundary>
      </Section>

      {/* Platform stats, right after the routes */}
      <div className="pb-12 md:pb-20">
        <SectionBoundary title="Stats">
          <Suspense fallback={<StatsStripSkeleton />}>
            <StatsStrip />
          </Suspense>
        </SectionBoundary>
      </div>

      <Section aria-labelledby="events-title" className="bg-white">
        <SectionHeader
          id="events-title"
          eyebrow="Mark your calendar"
          title="Upcoming events"
          action={{ label: "View all events", href: "/events" }}
        />
        <SectionBoundary title="Events">
          <Suspense fallback={<UpcomingEventsSkeleton />}>
            <UpcomingEvents />
          </Suspense>
        </SectionBoundary>
      </Section>

      <Section aria-labelledby="clubs-title">
        <SectionHeader
          id="clubs-title"
          eyebrow="Ride together"
          title="Popular clubs"
          action={{ label: "View all clubs", href: "/clubs" }}
        />
        <SectionBoundary title="Clubs">
          <Suspense fallback={<PopularClubsSkeleton />}>
            <PopularClubs />
          </Suspense>
        </SectionBoundary>
      </Section>

      <Section aria-labelledby="riders-title" className="pt-0 md:pt-0">
        <SectionHeader id="riders-title" eyebrow="Your next riding buddy" title="Riders near you" />
        <RidersNearYou />
      </Section>

      <Section aria-labelledby="cities-title" className="pt-0 md:pt-0">
        <SectionHeader
          id="cities-title"
          eyebrow="25+ cities"
          title="Explore by city"
          action={{ label: "View all cities", href: "/cities" }}
        />
        <SectionBoundary title="Cities">
          <Suspense fallback={<ExploreCitiesSkeleton />}>
            <ExploreCities />
          </Suspense>
        </SectionBoundary>
      </Section>

      <AppBanner className="pt-0 md:pt-0" />

      <Section aria-labelledby="services-title" className="bg-white">
        <SectionHeader
          id="services-title"
          eyebrow="Beyond the ride"
          title="Everything a rider needs"
          description="Service your bike, rent one in a new city, gear up, or learn from the best."
        />
        <RiderServices />
      </Section>

      <Section aria-labelledby="why-title">
        <SectionHeader id="why-title" eyebrow="Why TGB" title="Why riders love TGB" />
        <ValueProps />
      </Section>

      <Section aria-labelledby="testimonials-title" className="pt-0 md:pt-0">
        <SectionHeader id="testimonials-title" eyebrow="Testimonials" title="What riders say" />
        <SectionBoundary title="Testimonials">
          <Suspense fallback={<TestimonialsSkeleton />}>
            <Testimonials />
          </Suspense>
        </SectionBoundary>
      </Section>

      <Suspense>
        <HomeJsonLd />
      </Suspense>
    </>
  );
}
