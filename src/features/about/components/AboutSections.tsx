import {
  ArrowRight,
  Building2,
  CalendarDays,
  Flag,
  MapPin,
  Mountain,
  Route,
  Store,
  Users,
  UsersRound,
  Warehouse,
  type LucideIcon,
} from "lucide-react";
import type { ReactNode } from "react";
import { Container } from "@/components/layout/Container";
import { ScriptNote, Swoosh } from "@/components/shared/ScriptNote";
import { SmartImage } from "@/components/shared/SmartImage";
import { StoreBadges } from "@/components/shared/StoreBadges";
import { ButtonLink } from "@/components/ui/button";
import { AppPromptZone } from "@/features/home/components/AppPrompt";
import { cn } from "@/lib/utils";

const unsplash = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=75&auto=format&fit=crop`;

const images = {
  hero: unsplash("1700891591563-5327de496cfd", 2400),
  mission: unsplash("1670644654521-6fbfffeaba87", 1400),
  connect: unsplash("1762696782497-2b39df0f4523", 900),
  support: unsplash("1621958776520-ed4c553222f3", 900),
  sport: "/images/hero/slide-1.webp",
  story: [
    unsplash("1579010461011-47920f63d8d4", 900),
    unsplash("1658985416866-d059ee62dafd", 700),
    unsplash("1738494777740-21b07e9da9a2", 700),
    unsplash("1690540293130-2ca04fbf815b", 900),
  ],
  whatWeDo: unsplash("1558980664-3a031cf67ea8", 2400),
  brands: unsplash("1687181493462-0ca5d5627285", 2400),
  journey: unsplash("1758090524309-199d4588e225", 2400),
};

/**
 * Painted brush-stroke mask: a slanted band whose edges are roughened with SVG turbulence.
 * Used as a CSS mask so the photo keeps its normal next/image loading.
 */
const brushMask = `url("data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 280' preserveAspectRatio='none'>
    <filter id='b' x='-10%' y='-10%' width='120%' height='120%'>
      <feTurbulence type='fractalNoise' baseFrequency='0.035 0.18' numOctaves='3' seed='7'/>
      <feDisplacementMap in='SourceGraphic' scale='34'/>
    </filter>
    <path filter='url(#b)' d='M30 70 Q120 40 210 34 T388 18 L384 236 Q300 250 200 256 T22 262 Z'/>
  </svg>`,
)}")`;

/* ---------- Shared bits ---------- */

function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("text-primary text-xs font-bold tracking-[0.18em] uppercase", className)}>
      {children}
    </p>
  );
}

function Heading({ id, children, light = false, className }: { id: string; children: ReactNode; light?: boolean; className?: string }) {
  return (
    <h2
      id={id}
      className={cn(
        "font-jakarta mt-3 text-3xl leading-[1.12] font-semibold tracking-[-0.02em] md:text-[42px]",
        light ? "text-white" : "text-ink",
        className,
      )}
    >
      {children}
    </h2>
  );
}

/** CTA that opens the app download popup until the target page exists. */
function PromptButton({ href, children, variant }: { href: string; children: ReactNode; variant?: "outline-light" }) {
  return (
    <AppPromptZone className="mt-8 inline-flex">
      <ButtonLink href={href} size="lg" variant={variant}>
        {children} <ArrowRight />
      </ButtonLink>
    </AppPromptZone>
  );
}

/* ---------- Sections ---------- */

export function AboutHero() {
  return (
    <section aria-labelledby="about-title" className="bg-deep relative isolate overflow-hidden">
      <SmartImage
        src={images.hero}
        alt="Group of riders on a mountain highway in Ladakh"
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover object-[60%_55%]"
      />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(15,26,34,0.92)_0%,rgba(15,26,34,0.75)_35%,rgba(15,26,34,0.15)_65%,transparent_100%)]" />
      <div className="bg-deep/40 absolute inset-0 -z-10 md:hidden" />

      <Container className="flex min-h-[480px] flex-col justify-center py-16 lg:min-h-[540px]">
        <Eyebrow>About us</Eyebrow>
        <h1
          id="about-title"
          className="font-display mt-4 text-6xl leading-[0.9] font-extrabold text-white uppercase md:text-7xl lg:text-[96px]"
        >
          More than
          <br />
          a ride.
          <br />
          <span className="text-primary">A movement.</span>
        </h1>
        <p className="mt-6 max-w-[460px] text-base leading-relaxed text-white/85 md:text-lg">
          The Good Biker is India&apos;s most trusted motorcycling community, bringing together
          riders, clubs, routes, events, brands and stories — on and off the road.
        </p>
        <div className="font-script mt-8 text-3xl text-white">
          #DoTheRideThing
          <Swoosh className="-mt-1 ml-2 h-4 w-[180px]" />
        </div>
      </Container>
    </section>
  );
}

export function AboutMission() {
  return (
    <section aria-labelledby="mission-title" className="py-16 md:py-24">
      <Container className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <Eyebrow>Our mission</Eyebrow>
          <Heading id="mission-title" className="max-w-[600px]">
            Build a stronger, safer and more connected riding community in India.
          </Heading>
          <p className="mt-5 max-w-[520px] text-base leading-relaxed">
            We believe motorcycling is more than a ride — it&apos;s a lifestyle, a community and a
            force for good. The Good Biker exists to make riding more social, more meaningful and
            more accessible for every kind of rider.
          </p>
          <PromptButton href="/download">Join the community</PromptButton>
        </div>

        <div className="relative">
          {/* Brush-stroke cut-out */}
          <div
            className="relative aspect-[10/7] w-full max-w-[580px] xl:max-w-[480px] 2xl:max-w-[580px]"
            style={{ maskImage: brushMask, WebkitMaskImage: brushMask, maskSize: "100% 100%", WebkitMaskSize: "100% 100%" }}
          >
            <SmartImage
              src={images.mission}
              alt="Rider heading up a snowy mountain highway"
              fill
              sizes="(min-width: 1024px) 580px, 100vw"
              className="object-cover object-[50%_70%]"
            />
          </div>
          <ScriptNote
            lines={["Good", "Roads", "Better", "People."]}
            className="text-ink absolute top-1/2 right-0 hidden -translate-y-1/2 -rotate-[8deg] text-[40px] xl:block 2xl:right-8"
          />
        </div>
      </Container>
    </section>
  );
}

const pillars: { title: string; text: string; icon: LucideIcon; tone: string; image: string; tags: string[] }[] = [
  {
    title: "Connect Riders",
    text: "Bring riders, clubs and like-minded people together across India.",
    icon: Users,
    tone: "bg-secondary",
    image: images.connect,
    tags: ["Clubs", "Rides", "Community"],
  },
  {
    title: "Support Businesses",
    text: "Help brands, services and destinations reach real riders with real stories.",
    icon: Store,
    tone: "bg-primary",
    image: images.support,
    tags: ["Products", "Services", "Events"],
  },
  {
    title: "Grow the Sport",
    text: "Promote responsible riding, safety and a stronger motorcycling culture.",
    icon: Mountain,
    tone: "bg-secondary",
    image: images.sport,
    tags: ["Racing", "Training", "Awareness"],
  },
];

export function AboutPillars() {
  return (
    <section aria-labelledby="pillars-title" className="bg-deep py-16 md:py-20">
      <Container>
        <Eyebrow>The TGB ecosystem</Eyebrow>
        <Heading id="pillars-title" light>
          Three pillars. One community.
        </Heading>

        <ul className="mt-10 grid gap-5 md:grid-cols-3">
          {pillars.map(({ title, text, icon: Icon, tone, image, tags }) => (
            <li
              key={title}
              className="relative isolate flex min-h-[380px] flex-col justify-end overflow-hidden rounded-card border border-white/10 bg-deep p-6"
            >
              <SmartImage src={image} alt="" fill sizes="(min-width: 768px) 33vw, 100vw" className="-z-20 object-cover" />
              <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(15,26,34,0)_15%,rgba(15,26,34,0.75)_50%,#0f1a22_75%)]" />

              <div className="flex items-start gap-4">
                <span className={cn("grid size-12 shrink-0 place-items-center rounded-full text-white", tone)}>
                  <Icon className="size-6" strokeWidth={1.75} aria-hidden />
                </span>
                <div>
                  <h3 className="font-jakarta text-xl font-semibold text-white">{title}</h3>
                  <p className="text-deep-text mt-2 text-sm leading-relaxed">{text}</p>
                </div>
              </div>
              <ul className="mt-6 flex flex-wrap gap-2" aria-label={`${title} topics`}>
                {tags.map((tag) => (
                  <li key={tag} className="rounded-full border border-white/25 px-3 py-1 text-xs font-medium text-white">
                    {tag}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

const stats: { value: string; label: string; icon: LucideIcon }[] = [
  { value: "10K+", label: "Riders on the platform", icon: Users },
  { value: "150+", label: "Active clubs", icon: Flag },
  { value: "5K+", label: "Routes & trails", icon: Route },
  { value: "200+", label: "Events hosted", icon: CalendarDays },
  { value: "25+", label: "Cities across India", icon: Building2 },
];

export function AboutStats() {
  return (
    <Container className="relative z-10 pt-12 md:pt-16">
      <dl className="rounded-card border-border shadow-card grid grid-cols-2 gap-y-6 border bg-white px-4 py-6 sm:grid-cols-3 md:py-8 lg:grid-cols-5 lg:divide-x lg:divide-border">
        {stats.map(({ value, label, icon: Icon }) => (
          <div key={label} className="flex items-center gap-3 px-2 lg:justify-center lg:px-5">
            <Icon className="text-primary size-8 shrink-0" strokeWidth={1.5} aria-hidden />
            <div className="flex flex-col-reverse">
              <dt className="text-muted mt-1 text-xs font-medium">{label}</dt>
              <dd className="font-display text-ink text-3xl leading-none font-bold md:text-4xl">{value}</dd>
            </div>
          </div>
        ))}
      </dl>
    </Container>
  );
}

export function AboutStory() {
  const [a, b, c, d] = images.story;
  return (
    <section aria-labelledby="story-title" className="py-16 md:py-24">
      <Container className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <Eyebrow>Our story</Eyebrow>
          <Heading id="story-title">Born from a simple idea.</Heading>
          <p className="font-jakarta text-ink mt-2 text-xl font-semibold md:text-2xl">
            Good people make great rides.
          </p>
          <p className="mt-5 max-w-[540px] text-base leading-relaxed">
            The Good Biker started as a passion project by riders, for riders. What began as a small
            community has now grown into a nationwide ecosystem — powered by thousands of riders,
            clubs, organisers, brands and partners who believe in the same idea:
          </p>
          <p className="text-ink mt-5 font-medium">Better riders. Better roads. A better tomorrow.</p>
        </div>

        {/* Mosaic: wide + narrow on top, narrow + wide below */}
        <div className="grid grid-cols-5 gap-3">
          {[
            { src: a, span: "col-span-3", alt: "Riders crossing a high-altitude plateau" },
            { src: b, span: "col-span-2", alt: "Rider portrait on their motorcycle" },
            { src: c, span: "col-span-2", alt: "Riders parked beside a mountain river" },
            { src: d, span: "col-span-3", alt: "Two riders on a winding country road" },
          ].map((img) => (
            <div key={img.src} className={cn("relative h-[120px] overflow-hidden rounded-[12px] sm:h-[180px] lg:h-[200px]", img.span)}>
              <SmartImage src={img.src} alt={img.alt} fill sizes="(min-width: 1024px) 30vw, 60vw" className="object-cover" />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

const offerings: { title: string; text: string; icon: LucideIcon }[] = [
  { title: "Clubs & Community", text: "Discover and join clubs, meet riders and grow together.", icon: UsersRound },
  { title: "Rides & Trails", text: "Explore handpicked routes, track rides and relive the memories.", icon: MapPin },
  { title: "Events & Activations", text: "Find rides, track days, festivals and brand events.", icon: CalendarDays },
  { title: "Digital Garage", text: "Manage your bikes, gear, ride history and more.", icon: Warehouse },
];

export function AboutWhatWeDo() {
  return (
    <section aria-labelledby="what-title" className="bg-deep relative isolate overflow-hidden">
      <SmartImage
        src={images.whatWeDo}
        alt=""
        fill
        sizes="100vw"
        className="-z-20 object-cover object-[25%_50%]"
      />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(15,26,34,0.1)_0%,rgba(15,26,34,0.55)_35%,rgba(15,26,34,0.94)_52%,#0f1a22_100%)]" />
      <div className="bg-deep/60 absolute inset-0 -z-10 lg:hidden" />

      <Container className="grid py-16 md:py-24 lg:grid-cols-[2fr_3fr]">
        <div className="lg:col-start-2">
          <Eyebrow>What we do</Eyebrow>
          <Heading id="what-title" light>
            Everything a rider needs,
            <br className="hidden sm:block" /> in one place.
          </Heading>
          <ul className="mt-10 grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
            {offerings.map(({ title, text, icon: Icon }) => (
              <li key={title}>
                <Icon className="text-primary size-8" strokeWidth={1.5} aria-hidden />
                <h3 className="font-jakarta mt-4 text-base font-semibold text-white">{title}</h3>
                <p className="text-deep-text mt-2 text-sm leading-relaxed">{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}

export function AboutApp() {
  return (
    <section aria-labelledby="companion-title" className="overflow-hidden py-16 md:py-20">
      <Container className="grid items-center gap-12 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <Eyebrow>The Good Biker app</Eyebrow>
          <Heading id="companion-title">Your riding companion.</Heading>
          <p className="mt-5 max-w-[480px] text-base leading-relaxed">
            Track your rides, discover routes, join clubs, find events, manage your bikes and be part
            of a growing community. Available now on Android and iOS.
          </p>
          <StoreBadges className="mt-8" />
        </div>

        <div className="relative">
          {/* Top of the app-screens collage: three phones side by side */}
          <div className="relative mx-auto aspect-[1087/900] w-full max-w-[500px] overflow-hidden [mask-image:linear-gradient(180deg,#000_62%,transparent_92%)] lg:mx-0">
            <SmartImage
              src="/images/app/app-screens.png"
              alt="TGB app screens: home, bike brands and rider feed"
              fill
              sizes="(min-width: 1024px) 500px, 100vw"
              className="object-cover object-top"
            />
          </div>
          <ScriptNote
            lines={["Plan.", "Ride.", "Track.", "Belong."]}
            className="text-ink absolute top-1/2 right-0 hidden -translate-y-1/2 -rotate-[8deg] text-[40px] xl:block 2xl:right-8"
          />
        </div>
      </Container>
    </section>
  );
}

export function AboutBrands() {
  return (
    <section aria-labelledby="brands-title" className="bg-deep relative isolate overflow-hidden">
      <SmartImage src={images.brands} alt="" fill sizes="100vw" className="-z-20 object-cover object-[50%_45%]" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(15,26,34,0.95)_0%,rgba(15,26,34,0.82)_40%,rgba(15,26,34,0.3)_75%,rgba(15,26,34,0.15)_100%)]" />

      <Container className="py-16 md:py-20">
        <Eyebrow>For brands &amp; organisers</Eyebrow>
        <Heading id="brands-title" light>
          Be part of a growing movement.
        </Heading>
        <p className="text-deep-text mt-4 max-w-[460px] text-base leading-relaxed">
          Reach active riders, clubs and communities through meaningful brand partnerships, events
          and activations.
        </p>
        <PromptButton href="/contact">Partner with us</PromptButton>
      </Container>
    </section>
  );
}

export function AboutJourney() {
  return (
    <section aria-labelledby="journey-title" className="bg-deep relative isolate overflow-hidden border-t border-white/10">
      <SmartImage src={images.journey} alt="" fill sizes="100vw" className="-z-20 object-cover object-[50%_40%]" />
      <div className="bg-deep/75 absolute inset-0 -z-10" />

      <Container className="flex flex-col items-start justify-between gap-6 py-12 md:flex-row md:items-center md:py-14">
        <h2
          id="journey-title"
          className="font-display text-4xl leading-[0.95] font-extrabold text-white uppercase md:text-5xl"
        >
          Real riders. Real stories.
          <br />
          <span className="text-primary">Be part of the journey.</span>
        </h2>
        <AppPromptZone className="inline-flex shrink-0">
          <ButtonLink href="/download" size="lg">
            Join the community <ArrowRight />
          </ButtonLink>
        </AppPromptZone>
      </Container>
    </section>
  );
}
