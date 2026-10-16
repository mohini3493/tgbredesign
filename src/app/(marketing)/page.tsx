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
import { UpcomingEvents, UpcomingEventsSkeleton } from "@/features/events/components/UpcomingEvents";
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

      <SectionBoundary title="Stats">
        <Suspense fallback={<StatsStripSkeleton />}>
          <StatsStrip />
        </Suspense>
      </SectionBoundary>

      <Section aria-labelledby="routes-title">
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

      <Section aria-label="Clubs and riders">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <SectionHeader eyebrow="Ride together" title="Popular clubs" action={{ label: "View all clubs", href: "/clubs" }} />
            <SectionBoundary title="Clubs">
              <Suspense fallback={<PopularClubsSkeleton />}>
                <PopularClubs />
              </Suspense>
            </SectionBoundary>
          </div>
          <div className="flex flex-col lg:col-span-5">
            <SectionHeader eyebrow="Your next riding buddy" title="Riders near you" />
            <div className="flex-1">
              <RidersNearYou />
            </div>
          </div>
        </div>
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

      <Section aria-labelledby="services-title" className="bg-white">
        <SectionHeader
          id="services-title"
          eyebrow="Beyond the ride"
          title="Everything a rider needs"
          description="Service your bike, rent one in a new city, gear up, or learn from the best."
        />
        <RiderServices />
      </Section>

      <AppBanner />

      <Section aria-labelledby="why-title" className="pt-0 md:pt-0">
        <SectionHeader id="why-title" eyebrow="Why TGB" title="Why riders love TGB" />
        <ValueProps />
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
