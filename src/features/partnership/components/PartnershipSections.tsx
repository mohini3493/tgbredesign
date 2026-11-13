import Link from "next/link";
import { ArrowRight, Bike, CalendarDays, Download, MapPin, Route, Users, UsersRound, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { Container } from "@/components/layout/Container";
import { ScriptNote } from "@/components/shared/ScriptNote";
import { SmartImage } from "@/components/shared/SmartImage";
import { ButtonLink } from "@/components/ui/button";
import type { HomeStats } from "@/features/stats/schemas";
import { formatCompact } from "@/lib/format";
import { cn } from "@/lib/utils";
import { audience, partnerBrands, partnershipImages, platforms, racingOffers, reasons, testimonials } from "../data";
import { FeedScreen, PhoneFrame, RideMapScreen } from "./PhoneMockups";
import { PlatformTabs } from "./PlatformTabs";

/* ---------- Shared bits ---------- */

function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("text-primary text-xs font-bold tracking-[0.18em] uppercase", className)}>{children}</p>;
}

/** Condensed uppercase heading used across this page (same treatment as the About hero). */
function DisplayHeading({ id, children, light = false, className }: { id: string; children: ReactNode; light?: boolean; className?: string }) {
  return (
    <h2
      id={id}
      className={cn("font-display mt-3 text-4xl leading-[0.95] font-extrabold uppercase md:text-5xl", light ? "text-white" : "text-ink", className)}
    >
      {children}
    </h2>
  );
}

const mediaKitHref = "/contact?topic=media-kit";
const contactHref = "/contact?topic=partnership";

/* ---------- Hero ---------- */

export function PartnershipHero({ stats }: { stats: HomeStats }) {
  const items: { value: string; label: string; icon: LucideIcon }[] = [
    { value: `${formatCompact(stats.riders)}+`, label: "Active Riders", icon: Users },
    { value: `${formatCompact(stats.clubs)}+`, label: "Riding Clubs", icon: UsersRound },
    { value: `${formatCompact(stats.routes)}+`, label: "Routes & Trails", icon: Route },
    { value: `${formatCompact(stats.events)}+`, label: "Events & Activations", icon: CalendarDays },
    { value: `${formatCompact(stats.cities)}+`, label: "Cities Across India", icon: MapPin },
  ];

  return (
    <section aria-labelledby="partner-title" className="bg-deep relative isolate overflow-hidden">
      <SmartImage src={partnershipImages.hero} alt="" fill priority sizes="100vw" className="-z-20 object-cover object-[70%_50%]" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(15,26,34,0.94)_0%,rgba(15,26,34,0.8)_40%,rgba(15,26,34,0.3)_75%,rgba(15,26,34,0.45)_100%)]" />

      <Container className="relative grid gap-10 pt-14 pb-12 lg:grid-cols-[1.1fr_1fr] lg:pt-16 lg:pb-16">
        <div>
          <Eyebrow>Advertise with The Good Biker</Eyebrow>
          <h1 id="partner-title" className="font-display mt-4 text-5xl leading-[0.92] font-extrabold text-white uppercase md:text-7xl lg:text-[80px]">
            Reach India&apos;s
            <br />
            biking community.
            <br />
            <span className="text-primary">On every route.</span>
          </h1>
          <p className="mt-6 max-w-[520px] text-base leading-relaxed text-white/85 md:text-lg">
            The Good Biker is India&apos;s most trusted platform for motorcyclists. Partner with us to showcase your
            brand across our mobile app, website, community events and racing team.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="#placements" size="lg">
              Explore Advertising Options <ArrowRight />
            </ButtonLink>
            <ButtonLink href={mediaKitHref} size="lg" variant="outline-light">
              <Download /> Download Media Kit
            </ButtonLink>
          </div>
        </div>

        {/* Two app screens, offset, with the script note */}
        <div className="relative hidden min-h-[460px] lg:block">
          <PhoneFrame dark className="absolute top-2 left-0 w-[220px] -rotate-6">
            <RideMapScreen />
          </PhoneFrame>
          <PhoneFrame className="absolute top-20 left-[30%] w-[230px] rotate-3">
            <FeedScreen />
          </PhoneFrame>
          <ScriptNote lines={["Good", "Brands", "Ride", "Further."]} className="absolute top-0 right-0 -rotate-[8deg] text-[38px] text-white" />
        </div>
      </Container>

      <div className="border-t border-white/10 bg-[#0f1a22]/80 backdrop-blur-md">
        <Container>
          <dl className="grid grid-cols-2 gap-y-6 py-6 sm:grid-cols-3 lg:grid-cols-5 lg:divide-x lg:divide-white/10">
            {items.map(({ value, label, icon: Icon }) => (
              <div key={label} className="flex items-center gap-3.5 px-2 lg:justify-center lg:px-4">
                <Icon className="size-8 shrink-0 text-white" strokeWidth={1.4} aria-hidden />
                <div className="flex flex-col-reverse">
                  <dt className="mt-1 text-xs text-white/75 md:text-sm">{label}</dt>
                  <dd className="font-display text-3xl leading-none font-bold text-white">{value}</dd>
                </div>
              </div>
            ))}
          </dl>
        </Container>
      </div>
    </section>
  );
}

/* ---------- Why advertise ---------- */

export function PartnershipWhy() {
  return (
    <section aria-labelledby="why-title" className="py-16 md:py-20">
      <Container className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
        <div>
          <Eyebrow>Why advertise with TGB</Eyebrow>
          <DisplayHeading id="why-title" className="md:text-[52px]">
            A highly engaged and passionate rider community.
          </DisplayHeading>
          <p className="mt-5 max-w-[480px] text-base leading-relaxed">
            Our platform connects real riders, clubs and biking enthusiasts who actively explore, plan, ride and buy.
            Your brand gets meaningful visibility in a trusted, relevant and premium environment.
          </p>
        </div>
        <ul className="grid gap-4 sm:grid-cols-2">
          {reasons.map(({ title, text, icon: Icon }) => (
            <li key={title} className="rounded-card border-border hover:shadow-card flex gap-4 border bg-white p-5 transition-shadow">
              <Icon className="text-primary size-8 shrink-0" strokeWidth={1.5} aria-hidden />
              <div>
                <h3 className="text-ink font-semibold">{title}</h3>
                <p className="mt-1 text-sm leading-relaxed">{text}</p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

/* ---------- Platforms ---------- */

export function PartnershipPlatforms() {
  return (
    <section id="placements" aria-labelledby="platforms-title" className="scroll-mt-24 bg-white py-16 md:py-20">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow>Our platforms</Eyebrow>
            <DisplayHeading id="platforms-title">Multiple placements. One powerful ecosystem.</DisplayHeading>
          </div>
          <p className="text-body max-w-[300px] text-sm">Choose the right mix of platforms to showcase your brand to riders across India.</p>
        </div>
        <PlatformTabs platforms={platforms} />
      </Container>
    </section>
  );
}

/* ---------- Audience ---------- */

export function PartnershipAudience({ stats }: { stats: HomeStats }) {
  const items = [...audience, { value: `${formatCompact(stats.clubs)}+`, label: "Active Clubs", icon: Bike }];
  return (
    <section aria-labelledby="audience-title" className="bg-deep relative isolate overflow-hidden">
      <div className="absolute inset-y-0 left-0 -z-10 w-full lg:w-[45%]">
        <SmartImage src={partnershipImages.audience} alt="" fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover object-[30%_50%]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(15,26,34,0.2)_0%,rgba(15,26,34,0.6)_60%,#0f1a22_100%)]" />
        <div className="bg-deep/70 absolute inset-0 lg:hidden" />
      </div>

      <Container className="grid items-center gap-10 py-16 md:py-20 lg:grid-cols-[0.9fr_1.1fr_1.1fr]">
        <div className="hidden lg:block" />
        <div>
          <Eyebrow>Our audience</Eyebrow>
          <DisplayHeading id="audience-title" light>
            Real riders.
            <br />
            Real influence.
          </DisplayHeading>
          <p className="text-deep-text mt-5 max-w-[420px] text-base leading-relaxed">
            A diverse and active community of touring riders, daily commuters, adventure seekers, track enthusiasts and
            club members.
          </p>
        </div>
        <dl className="grid grid-cols-2 overflow-hidden rounded-card border border-white/10 bg-white/[0.04]">
          {items.map(({ value, label, icon: Icon }, i) => (
            <div key={label} className={cn("flex items-center gap-4 p-5 md:p-6", i % 2 === 0 && "border-r border-white/10", i < 2 && "border-b border-white/10")}>
              <Icon className="text-primary size-8 shrink-0" strokeWidth={1.5} aria-hidden />
              <div className="flex flex-col-reverse">
                <dt className="mt-1 text-xs text-white/70">{label}</dt>
                <dd className="font-jakarta text-lg leading-tight font-semibold text-white md:text-xl">{value}</dd>
              </div>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}

/* ---------- Racing ---------- */

export function PartnershipRacing() {
  return (
    <section aria-labelledby="racing-title" className="relative isolate overflow-hidden bg-white">
      <div className="absolute inset-0 -z-10 lg:left-[30%]">
        <SmartImage src={partnershipImages.racing} alt="" fill sizes="(min-width: 1024px) 70vw, 100vw" className="object-cover object-[45%_50%]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#ffffff_0%,rgba(255,255,255,0.85)_18%,rgba(255,255,255,0)_45%)] max-lg:bg-white/85" />
      </div>
      <Container className="grid items-center gap-10 py-16 md:py-20 lg:grid-cols-[1fr_1fr_320px]">
        <div>
          <Eyebrow>TGB Bharat Racing Team</Eyebrow>
          <DisplayHeading id="racing-title">
            Speed. Skill. Spirit.
            <br />
            Your brand on track.
          </DisplayHeading>
          <p className="mt-5 max-w-[460px] text-base leading-relaxed">
            Be part of our racing journey as we represent The Good Biker on national and international platforms. Gain
            premium visibility through our racing team, bike liveries, race events, media coverage and rider stories.
          </p>
          <ButtonLink href={contactHref} size="lg" className="mt-8">
            Explore Racing Opportunities <ArrowRight />
          </ButtonLink>
        </div>
        <div className="hidden lg:block" />
        <ul className="bg-deep/90 rounded-card divide-y divide-white/10 p-2 backdrop-blur-md" aria-label="Racing partnership options">
          {racingOffers.map(({ label, icon: Icon }) => (
            <li key={label} className="flex items-center gap-4 px-4 py-4 text-sm font-medium text-white">
              <Icon className="text-primary size-5 shrink-0" aria-hidden /> {label}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

/* ---------- Brands + testimonials ---------- */

function BrandMark({ name, className }: { name: string; className?: string }) {
  return <span className={cn("font-display text-ink text-2xl font-extrabold tracking-wide uppercase italic", className)}>{name}</span>;
}

export function PartnershipBrands() {
  return (
    <section aria-labelledby="brands-title" className="py-14 md:py-16">
      <Container>
        <Eyebrow>Brands that ride with us</Eyebrow>
        <p id="brands-title" className="mt-2 text-sm">
          A growing list of brands, destinations and communities that have partnered with The Good Biker.
        </p>
        <ul className="mt-8 flex flex-wrap items-center justify-between gap-x-10 gap-y-6">
          {partnerBrands.map((b) => (
            <li key={b}>
              <BrandMark name={b} className="opacity-80 transition-opacity hover:opacity-100" />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

export function PartnershipTestimonials() {
  return (
    <section aria-labelledby="testimonials-title" className="pb-16 md:pb-20">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <Eyebrow>Partner testimonials</Eyebrow>
            <p id="testimonials-title" className="mt-2 text-sm">
              Trusted by leading brands in the motorcycling ecosystem.
            </p>
          </div>
          <Link href={contactHref} className="group text-secondary hover:text-primary inline-flex items-center gap-1.5 text-sm font-semibold">
            Become a partner
            <ArrowRight className="text-primary size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
          </Link>
        </div>
        <ul className="mt-8 grid gap-5 md:grid-cols-3">
          {testimonials.map((t) => (
            <li key={t.brand} className="rounded-card border-border shadow-card flex flex-col border bg-white p-6">
              <BrandMark name={t.brand} className="text-xl" />
              <blockquote className="text-ink mt-4 flex-1 text-sm leading-relaxed">&ldquo;{t.quote}&rdquo;</blockquote>
              <div className="mt-5 flex items-center gap-3">
                <span className="bg-deep text-primary grid size-10 shrink-0 place-items-center rounded-full text-xs font-bold" aria-hidden>
                  {t.brand.slice(0, 2).toUpperCase()}
                </span>
                <div>
                  <p className="text-ink text-sm font-semibold">{t.name}</p>
                  <p className="text-muted text-xs">{t.org}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

/* ---------- CTA ---------- */

export function PartnershipCta() {
  return (
    <section aria-labelledby="partner-cta-title" className="bg-deep relative isolate overflow-hidden">
      <SmartImage src={partnershipImages.cta} alt="" fill sizes="100vw" className="-z-20 object-cover object-[60%_55%]" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(15,26,34,0.95)_0%,rgba(15,26,34,0.75)_45%,rgba(15,26,34,0.25)_100%)]" />
      <Container className="py-14 md:py-16">
        <Eyebrow>Let&apos;s build something meaningful</Eyebrow>
        <h2 id="partner-cta-title" className="font-jakarta mt-3 text-3xl font-semibold text-white md:text-4xl">
          Partner with The Good Biker.
        </h2>
        <p className="mt-3 max-w-[460px] text-base text-white/85">
          Reach an active, passionate and growing motorcycling community through strategic branding, content and
          real-world experiences.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href={contactHref} size="lg">
            Get in Touch <ArrowRight />
          </ButtonLink>
          <ButtonLink href={mediaKitHref} size="lg" variant="outline-light">
            <Download /> Download Media Kit
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
