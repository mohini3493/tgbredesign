import Form from "next/form";
import { ArrowRight, Download, MapPin, Search } from "lucide-react";
import { heroImage, siteConfig } from "@/config/site";
import { Container } from "@/components/layout/Container";
import { ButtonLink } from "@/components/ui/button";
import { SmartImage } from "@/components/shared/SmartImage";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden bg-deep">
      <SmartImage
        src={heroImage}
        alt="Rider on a motorcycle crossing a Himalayan mountain road"
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover object-[70%_center]"
      />
      {/* Readability overlays */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,#0f1a22_0%,rgba(15,26,34,0.85)_35%,rgba(15,26,34,0.25)_70%,rgba(15,26,34,0.1)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-[linear-gradient(0deg,rgba(15,26,34,0.7),transparent)]" />

      <Container className="pt-16 pb-36 md:pt-24 md:pb-44 lg:pt-28">
        <div className="max-w-2xl animate-fade-up">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-white backdrop-blur">
            <span className="size-1.5 rounded-full bg-primary" /> India&apos;s riding ecosystem
          </p>
          <h1
            id="hero-title"
            className="font-display text-[44px] font-extrabold uppercase leading-[0.95] text-white sm:text-6xl lg:text-[80px]"
          >
            Find riders.
            <br />
            Discover routes.
            <br />
            Join clubs.
            <span className="mt-2 block text-primary">
              Do the ride thing.<sup className="ml-1 align-super text-[0.3em]">®</sup>
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-deep-text md:text-lg">
            {siteConfig.description}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href={siteConfig.appLinks.download} size="lg">
              <Download /> Download the App
            </ButtonLink>
            <ButtonLink href="/rides" variant="outline-light" size="lg">
              Explore Rides <ArrowRight />
            </ButtonLink>
          </div>
        </div>

        <Form
          action="/routes"
          role="search"
          aria-label="Find a ride"
          className="mt-10 flex max-w-3xl flex-col gap-2 rounded-card bg-white p-2 shadow-card sm:flex-row sm:items-center"
        >
          <label className="flex flex-1 items-center gap-3 px-3">
            <MapPin className="size-5 shrink-0 text-secondary" aria-hidden />
            <span className="sr-only">City or route</span>
            <input
              name="q"
              placeholder="Where do you want to ride?"
              className="h-12 w-full bg-transparent text-ink placeholder:text-muted focus:outline-none"
            />
          </label>
          <label className="flex items-center border-border px-3 sm:border-l">
            <span className="sr-only">Ride type</span>
            <select
              name="type"
              defaultValue=""
              className="h-12 w-full bg-transparent pr-2 text-sm font-medium text-ink focus:outline-none sm:w-40"
            >
              <option value="">All ride types</option>
              <option value="weekend">Weekend ride</option>
              <option value="touring">Touring</option>
              <option value="off-road">Off-road</option>
              <option value="expedition">Expedition</option>
            </select>
          </label>
          <button
            type="submit"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-btn bg-primary px-6 text-sm font-semibold text-white transition-colors hover:bg-primary-hover"
          >
            <Search className="size-4" aria-hidden /> Search
          </button>
        </Form>
      </Container>
    </section>
  );
}
