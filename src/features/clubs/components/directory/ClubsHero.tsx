import { CalendarDays, MapPin, Users, UsersRound, type LucideIcon } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SmartImage } from "@/components/shared/SmartImage";
import type { HomeStats } from "@/features/stats/schemas";
import { formatCompact } from "@/lib/format";

const heroImage =
  "https://images.unsplash.com/photo-1700891591563-5327de496cfd?w=2400&q=75&auto=format&fit=crop";

export function ClubsHero({ stats }: { stats: HomeStats }) {
  const items: { value: string; label: string; icon: LucideIcon }[] = [
    { value: `${formatCompact(stats.clubs)}+`, label: "Active Clubs", icon: UsersRound },
    { value: `${formatCompact(stats.riders)}+`, label: "Riders Connected", icon: Users },
    { value: `${formatCompact(stats.cities)}+`, label: "Cities", icon: MapPin },
    { value: `${formatCompact(stats.events)}+`, label: "Events Hosted", icon: CalendarDays },
  ];

  return (
    <section aria-labelledby="clubs-title" className="bg-deep relative isolate overflow-hidden">
      <SmartImage
        src={heroImage}
        alt="Club riders on a mountain highway"
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover object-[60%_55%]"
      />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(15,26,34,0.92)_0%,rgba(15,26,34,0.72)_40%,rgba(15,26,34,0.15)_75%,transparent_100%)]" />
      <div className="bg-deep/40 absolute inset-0 -z-10 md:hidden" />

      <Container className="pt-14 pb-28 lg:pt-16 lg:pb-32">
        <h1
          id="clubs-title"
          className="font-display text-5xl leading-[0.9] font-extrabold text-white uppercase md:text-7xl lg:text-[84px]"
        >
          Find your people.
          <br />
          <span className="text-primary">Ride together.</span>
        </h1>
        <p className="mt-6 max-w-[480px] text-base leading-relaxed text-white/85 md:text-lg">
          Explore motorcycle clubs across India and connect with riders who share your passion for
          the road.
        </p>

        <dl className="mt-10 grid max-w-[900px] grid-cols-2 gap-6 md:grid-cols-4">
          {items.map(({ value, label, icon: Icon }) => (
            <div key={label} className="flex items-center gap-3.5">
              <span className="grid size-12 shrink-0 place-items-center rounded-full border border-white/40 text-white">
                <Icon className="size-5.5" strokeWidth={1.6} aria-hidden />
              </span>
              <div className="flex flex-col-reverse">
                <dt className="mt-0.5 text-sm text-white/80">{label}</dt>
                <dd className="font-display text-3xl leading-none font-bold text-white">{value}</dd>
              </div>
            </div>
          ))}
        </dl>
      </Container>

      <TornEdge />
    </section>
  );
}

/** Ragged paper-tear edge in the page colour along the bottom of the hero. */
function TornEdge() {
  return (
    <svg
      className="fill-page absolute inset-x-0 -bottom-px h-14 w-full md:h-20"
      viewBox="0 0 1440 80"
      preserveAspectRatio="none"
      aria-hidden
    >
      <filter id="clubs-tear" x="0" y="-50%" width="100%" height="200%">
        <feTurbulence type="fractalNoise" baseFrequency="0.012 0.25" numOctaves="3" seed="3" />
        <feDisplacementMap in="SourceGraphic" scale="36" />
      </filter>
      <path filter="url(#clubs-tear)" d="M-20 46 Q360 26 720 40 T1460 30 L1460 110 L-20 110 Z" />
    </svg>
  );
}
