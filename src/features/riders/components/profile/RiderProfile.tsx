import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  ChevronRight,
  Ellipsis,
  Footprints,
  Globe,
  HardHat,
  MapPin,
  MessageSquare,
  Milestone,
  Moon,
  Quote,
  Mountain,
  MountainSnow,
  Route,
  Shirt,
  Sun,
  UserPlus,
  Users,
  UsersRound,
  type LucideIcon,
} from "lucide-react";
import type { ReactNode } from "react";
import { Container } from "@/components/layout/Container";
import { InstagramIcon } from "@/components/shared/BrandIcons";
import { ScriptNote } from "@/components/shared/ScriptNote";
import { SmartImage } from "@/components/shared/SmartImage";
import { ButtonLink, buttonVariants } from "@/components/ui/button";
import { AppPromptZone } from "@/features/home/components/AppPrompt";
import { cn } from "@/lib/utils";
import type { RideSummary, RiderProfile, Trail } from "../../profile";
import { BikeCarousel } from "./BikeCarousel";
import { IndiaRideMap } from "./IndiaRideMap";
import { ShareProfileButton } from "./ShareProfileButton";

/* ---------- Shared bits ---------- */

function Card({ children, className, ...props }: { children: ReactNode; className?: string; "aria-labelledby"?: string }) {
  return (
    <section className={cn("rounded-card border-border border bg-white p-5 md:p-6", className)} {...props}>
      {children}
    </section>
  );
}

function CardTitle({ id, children }: { id: string; children: ReactNode }) {
  return (
    <h2 id={id} className="font-jakarta text-ink text-lg font-semibold">
      {children}
    </h2>
  );
}

/** Block title with an optional "View all" link (same link treatment as SectionHeader). */
function BlockHeader({ id, title, href }: { id: string; title: string; href?: string }) {
  return (
    <div className="mb-4 flex items-end justify-between gap-4">
      <h2 id={id} className="font-jakarta text-ink text-xl font-semibold">
        {title}
      </h2>
      {href && (
        <Link
          href={href}
          className="group text-secondary hover:text-primary inline-flex items-center gap-1.5 text-sm font-semibold"
        >
          View all
          <ArrowRight className="text-primary size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
        </Link>
      )}
    </div>
  );
}

function Meta({ icon: Icon, children, className }: { icon: LucideIcon; children: ReactNode; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-1.5", className)}>
      <Icon className="size-3.5 shrink-0" aria-hidden />
      {children}
    </span>
  );
}

/* ---------- Hero ---------- */

export function RiderHero({ rider }: { rider: RiderProfile }) {
  const stats: { value: string | number; label: string; icon: LucideIcon }[] = [
    { value: rider.stats.followers, label: "Followers", icon: UsersRound },
    { value: rider.stats.following, label: "Following", icon: UserPlus },
    { value: rider.stats.ridesCompleted, label: "Rides Completed", icon: Milestone },
    { value: rider.stats.statesExplored, label: "States Explored", icon: Mountain },
    { value: rider.stats.clubsRiddenWith, label: "Clubs Ridden With", icon: MapPin },
  ];

  return (
    <section aria-labelledby="rider-name" className="bg-deep relative isolate overflow-hidden">
      <SmartImage src={rider.cover} alt="" fill priority sizes="100vw" className="-z-20 object-cover object-[60%_55%]" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(15,26,34,0.92)_0%,rgba(15,26,34,0.78)_38%,rgba(15,26,34,0.25)_70%,rgba(15,26,34,0.35)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-linear-to-t from-[#0f1a22]/80 to-transparent" />

      <Container className="pt-12 pb-8 lg:pt-16">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center lg:gap-8">
            {/* Avatar with brand ring and online dot */}
            <div className="relative size-[140px] shrink-0 lg:size-[176px]">
              <div className="bg-primary size-full rounded-full p-[3px]">
                <div className="border-deep relative size-full overflow-hidden rounded-full border-4">
                  <SmartImage src={rider.avatar} alt={rider.name} fill priority sizes="176px" className="object-cover" />
                </div>
              </div>
              {rider.isOnline && (
                <span className="ring-deep absolute right-2 bottom-3 size-6 rounded-full bg-[#2fbf71] ring-4 lg:right-3 lg:bottom-4" role="img" aria-label="Online now" />
              )}
            </div>

            <div>
              <p className="text-primary text-xs font-bold tracking-[0.18em] uppercase">Rider</p>
              <h1 id="rider-name" className="font-jakarta mt-2 flex items-center gap-3 text-4xl font-semibold tracking-[-0.02em] text-white md:text-5xl">
                {rider.name}
                {rider.verified && (
                  <BadgeCheck className="fill-primary size-8 shrink-0 text-white" strokeWidth={2} aria-label="Verified rider" />
                )}
              </h1>
              <p className="mt-2 text-base text-white/85 md:text-lg">
                @{rider.username}
                <span className="mx-2.5" aria-hidden>
                  •
                </span>
                {rider.location}
              </p>
              <p className="mt-4 max-w-[520px] text-sm leading-relaxed text-white/80 md:text-base">{rider.bio}</p>
              <ul className="mt-5 flex flex-wrap gap-2" aria-label="Riding styles">
                {rider.styles.map((s) => (
                  <li key={s} className="rounded-full border border-white/40 px-4 py-1.5 text-xs font-medium text-white md:text-sm">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-col gap-8 lg:items-end">
            <ScriptNote
              lines={["Good", "Roads", "Better", "People."]}
              className="hidden -rotate-[8deg] text-[38px] text-white lg:block"
            />
            {/* Social actions need an account: open the app download popup */}
            <AppPromptZone className="flex gap-3">
              <ButtonLink href="/login" size="lg">
                <UserPlus /> Follow
              </ButtonLink>
              <ButtonLink href="/login" size="lg" variant="outline-light">
                <MessageSquare /> Message
              </ButtonLink>
              <Link href="/login" aria-label="More options" className={cn(buttonVariants({ variant: "outline-light", size: "icon" }), "size-13")}>
                <Ellipsis className="!size-5" />
              </Link>
            </AppPromptZone>
          </div>
        </div>

        <dl className="rounded-card mt-10 grid grid-cols-2 gap-y-6 border border-white/10 bg-[#0f1a22]/70 px-4 py-5 backdrop-blur-md sm:grid-cols-3 lg:grid-cols-5 lg:divide-x lg:divide-white/10">
          {stats.map(({ value, label, icon: Icon }, i) => (
            <div key={label} className="flex items-center gap-4 px-2 lg:justify-center lg:px-5">
              <Icon className={cn("size-9 shrink-0", i === 0 ? "text-primary" : "text-white")} strokeWidth={1.4} aria-hidden />
              <div className="flex flex-col-reverse">
                <dt className="mt-1 text-sm text-white/75">{label}</dt>
                <dd className="font-display text-3xl leading-none font-bold text-white">{value}</dd>
              </div>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}

/* ---------- Sidebar ---------- */

export function RiderSidebar({ rider }: { rider: RiderProfile }) {
  const rideStats: { value: string | number; label: string; icon: LucideIcon }[] = [
    { value: rider.rideStats.totalKm, label: "Total Distance", icon: Route },
    { value: rider.rideStats.ridesCompleted, label: "Rides Completed", icon: Mountain },
    { value: rider.rideStats.statesExplored, label: "States Explored", icon: MountainSnow },
    { value: rider.rideStats.dayRides, label: "Day Rides", icon: Sun },
    { value: rider.rideStats.overnightRides, label: "Overnight Rides", icon: Moon },
    { value: rider.rideStats.internationalRides, label: "International Rides", icon: Globe },
  ];
  const gearIcons: Record<string, LucideIcon> = { Helmet: HardHat, Jacket: Shirt, Boots: Footprints };

  return (
    <aside className="flex flex-col gap-5" aria-label={`About ${rider.name}`}>
      <Card>
        <Quote className="fill-primary text-primary size-9 rotate-180" strokeWidth={1} aria-hidden />
        <blockquote className="font-jakarta text-ink mt-4 text-xl leading-snug italic">&ldquo;{rider.quote}&rdquo;</blockquote>
        <ul className="text-ink mt-6 space-y-3.5 text-sm">
          <li className="flex items-center gap-3">
            <MapPin className="size-4.5 shrink-0" aria-hidden /> {rider.location}
          </li>
          <li className="flex items-center gap-3">
            <CalendarDays className="size-4.5 shrink-0" aria-hidden /> Joined TGB in {rider.joined}
          </li>
          <li className="flex items-center gap-3">
            <InstagramIcon className="size-4.5 shrink-0" aria-hidden />
            <a
              href={`https://instagram.com/${rider.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary hover:text-primary transition-colors"
            >
              instagram.com/{rider.instagram}
            </a>
          </li>
        </ul>
        <div className="mt-6 flex gap-3">
          <AppPromptZone className="flex-1">
            <ButtonLink href="/login" className="w-full">
              Follow
            </ButtonLink>
          </AppPromptZone>
          <ShareProfileButton title={`${rider.name} on The Good Biker`} />
        </div>
      </Card>

      <Card aria-labelledby="bike-title">
        <BikeCarousel bikes={rider.bikes} titleId="bike-title" />
      </Card>

      <Card aria-labelledby="ride-stats-title">
        <CardTitle id="ride-stats-title">Ride Stats</CardTitle>
        <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-6">
          {rideStats.map(({ value, label, icon: Icon }) => (
            <div key={label} className="flex items-start gap-3">
              <Icon className="text-ink size-8 shrink-0" strokeWidth={1.4} aria-hidden />
              <div className="flex flex-col-reverse">
                <dt className="text-muted mt-0.5 text-xs">{label}</dt>
                <dd className="text-ink text-sm font-semibold">{value}</dd>
              </div>
            </div>
          ))}
        </dl>
      </Card>

      <Card aria-labelledby="gear-title">
        <CardTitle id="gear-title">Riding Gear</CardTitle>
        <AppPromptZone>
          <ul className="mt-5 grid grid-cols-3 gap-3">
            {rider.gear.map(({ brand, item }) => {
              const Icon = gearIcons[item] ?? HardHat;
              return (
                <li key={item}>
                  <Link href="/marketplace/accessories" className="group block">
                    <span className="bg-page grid aspect-square place-items-center rounded-[12px] transition-colors group-hover:bg-primary-tint">
                      <Icon className="text-ink size-10" strokeWidth={1.3} aria-hidden />
                    </span>
                    <span className="mt-2 flex items-center justify-between gap-1">
                      <span className="text-xs leading-tight">
                        <span className="text-ink block font-semibold">{brand}</span>
                        <span className="text-muted">{item}</span>
                      </span>
                      <ArrowRight className="text-ink group-hover:text-primary size-3.5 shrink-0" aria-hidden />
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </AppPromptZone>
      </Card>
    </aside>
  );
}

/* ---------- Overview ---------- */

const tabs = ["Rides", "Trails", "Photos", "Clubs", "Badges", "About"];

export function RiderOverview({ rider }: { rider: RiderProfile }) {
  const tab = "relative shrink-0 py-3 text-sm font-semibold transition-colors";
  return (
    <div className="min-w-0">
      <nav aria-label="Profile sections" className="border-border no-scrollbar flex gap-7 overflow-x-auto border-b">
        <Link href="/rider" aria-current="page" className={cn(tab, "text-ink after:bg-primary after:absolute after:inset-x-0 after:-bottom-px after:h-0.5 after:rounded-full")}>
          Overview
        </Link>
        {/* Other tabs live in the app for now */}
        <AppPromptZone className="contents">
          {tabs.map((t) => (
            <Link key={t} href={`/rider?tab=${t.toLowerCase()}`} className={cn(tab, "text-body hover:text-primary")}>
              {t}
            </Link>
          ))}
        </AppPromptZone>
      </nav>

      {/* Rides, trails and clubs live in the app for now: links open the download popup */}
      <AppPromptZone className="mt-6 flex flex-col gap-10">
        <FeaturedRide ride={rider.featuredRide} />

        <section aria-labelledby="recent-title">
          <BlockHeader id="recent-title" title="Recent Rides" href="/rides" />
          <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {rider.recentRides.map((ride) => (
              <RideCard key={ride.title} ride={ride} />
            ))}
          </ul>
        </section>

        <section aria-labelledby="trails-title">
          <BlockHeader id="trails-title" title="Favorite Trails" href="/routes" />
          <ul className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {rider.favoriteTrails.map((trail) => (
              <TrailTile key={trail.name} trail={trail} />
            ))}
          </ul>
        </section>

        <div className="grid gap-10 xl:grid-cols-[1.25fr_1fr] xl:gap-6">
          <RidingMap map={rider.map} />
          <ClubsList clubs={rider.clubs} />
        </div>
      </AppPromptZone>
    </div>
  );
}

function FeaturedRide({ ride }: { ride: RiderProfile["featuredRide"] }) {
  return (
    <section aria-labelledby="featured-title" className="bg-deep rounded-card relative isolate flex min-h-[320px] flex-col justify-between gap-8 overflow-hidden p-6 md:p-8">
      <SmartImage src={ride.image} alt="" fill sizes="(min-width: 1024px) 1100px, 100vw" className="-z-20 object-cover object-[50%_60%]" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(15,26,34,0.9)_0%,rgba(15,26,34,0.65)_40%,rgba(15,26,34,0.1)_75%)]" />

      <div>
        <p className="text-primary text-xs font-bold tracking-[0.18em] uppercase">Featured ride</p>
        <h2 id="featured-title" className="font-jakarta mt-2 text-3xl font-semibold tracking-[-0.02em] text-white md:text-4xl">
          {ride.title}
        </h2>
        <p className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/90">
          <Meta icon={MapPin}>{ride.distanceKm} km</Meta>
          <Meta icon={CalendarDays}>{ride.days} Days</Meta>
          <Meta icon={Users}>{ride.riders} Riders</Meta>
        </p>
        <p className="mt-4 max-w-[300px] text-sm leading-relaxed text-white/85 md:text-base">{ride.description}</p>
      </div>

      <div className="flex flex-wrap items-end justify-between gap-6">
        <Link href="/rides" className={cn(buttonVariants({ size: "md" }), "text-ink hover:bg-primary bg-white hover:text-white")}>
          View Ride <ArrowRight />
        </Link>
        <ul className="flex gap-2" aria-label="Ride photos">
          {ride.photos.map((src) => (
            <li key={src} className="relative size-12 overflow-hidden rounded-[8px] ring-2 ring-white/70 md:size-14">
              <SmartImage src={src} alt="" fill sizes="56px" className="object-cover" />
            </li>
          ))}
          <li className="bg-deep/80 grid size-12 place-items-center rounded-[8px] text-sm font-semibold text-white ring-2 ring-white/70 md:size-14">
            +{ride.morePhotos}
          </li>
        </ul>
      </div>
    </section>
  );
}

function AvatarStack({ avatars, more }: { avatars: string[]; more: number }) {
  return (
    <div className="flex items-center">
      {avatars.map((src, i) => (
        <span key={src} className={cn("relative size-7 overflow-hidden rounded-full ring-2 ring-white", i > 0 && "-ml-2")}>
          <SmartImage src={src} alt="" fill sizes="28px" className="object-cover" />
        </span>
      ))}
      {more > 0 && <span className="text-ink bg-page ml-1.5 rounded-full px-2 py-0.5 text-xs font-semibold">+{more}</span>}
    </div>
  );
}

function RideCard({ ride }: { ride: RideSummary }) {
  return (
    <li className="rounded-card border-border group relative overflow-hidden border bg-white transition-shadow hover:shadow-card">
      <div className="relative h-[140px]">
        <SmartImage src={ride.image} alt="" fill sizes="(min-width: 1280px) 25vw, 50vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
        <span className="absolute top-3 left-3 w-12 overflow-hidden rounded-[10px] bg-white text-center shadow-card">
          <span className="bg-primary block py-0.5 text-[10px] font-bold text-white uppercase">{ride.date.month}</span>
          <span className="font-display text-ink block py-0.5 text-xl leading-tight font-bold">{ride.date.day}</span>
        </span>
      </div>
      <div className="p-4">
        <h3 className="font-jakarta text-ink font-semibold">
          <Link href="/rides" className="after:absolute after:inset-0">
            {ride.title}
          </Link>
        </h3>
        <p className="text-muted mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs">
          <Meta icon={Route}>{ride.distanceKm} km</Meta>
          <Meta icon={CalendarDays}>
            {ride.days} {ride.days === 1 ? "Day" : "Days"}
          </Meta>
          <Meta icon={Users}>{ride.riders} Riders</Meta>
        </p>
        <div className="mt-4 flex items-center justify-between">
          <AvatarStack avatars={ride.avatars} more={ride.riders - ride.avatars.length} />
          <span className="border-border text-ink group-hover:border-primary group-hover:bg-primary grid size-8 place-items-center rounded-full border transition-colors group-hover:text-white" aria-hidden>
            <ArrowRight className="size-4" />
          </span>
        </div>
      </div>
    </li>
  );
}

function TrailTile({ trail }: { trail: Trail }) {
  return (
    <li className="rounded-card group bg-deep relative isolate h-[160px] overflow-hidden">
      <SmartImage src={trail.image} alt="" fill sizes="(min-width: 1024px) 20vw, 50vw" className="-z-20 object-cover transition-transform duration-500 group-hover:scale-105" />
      <div className="absolute inset-0 -z-10 bg-linear-to-t from-[#0f1a22]/90 via-[#0f1a22]/20 to-transparent" />
      <div className="absolute inset-x-3 bottom-3 flex items-start gap-2 text-white">
        <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden />
        <div className="min-w-0">
          <h3 className="text-sm leading-tight font-semibold text-white">
            <Link href="/routes" className="after:absolute after:inset-0">
              {trail.name}
            </Link>
          </h3>
          <p className="mt-1 text-xs text-white/80">
            {trail.distanceKm} km
            <span className="mx-1.5" aria-hidden>
              •
            </span>
            {trail.tag}
          </p>
        </div>
      </div>
    </li>
  );
}

function RidingMap({ map }: { map: RiderProfile["map"] }) {
  const rows: { value: string | number; label: string; icon: LucideIcon }[] = [
    { value: map.states, label: "States", icon: Mountain },
    { value: map.destinations, label: "Destinations", icon: MapPin },
    { value: map.totalKm, label: "Total Distance", icon: CalendarDays },
  ];
  return (
    <section aria-labelledby="map-title">
      <BlockHeader id="map-title" title="Riding Map" />
      <div className="bg-deep rounded-card grid overflow-hidden sm:grid-cols-[1.2fr_1fr]">
        <div className="border-b border-white/10 p-4 sm:border-r sm:border-b-0">
          <IndiaRideMap className="mx-auto h-auto w-full max-w-[300px]" />
        </div>
        <div className="flex flex-col p-5">
          <dl className="flex-1 divide-y divide-white/10">
            {rows.map(({ value, label, icon: Icon }) => (
              <div key={label} className="flex items-center gap-4 py-3.5 first:pt-0">
                <Icon className="size-6 shrink-0 text-white" strokeWidth={1.5} aria-hidden />
                <div className="flex flex-col-reverse">
                  <dt className="text-deep-text text-xs">{label}</dt>
                  <dd className="font-semibold text-white">{value}</dd>
                </div>
              </div>
            ))}
          </dl>
          <ButtonLink href="/routes" variant="outline-light" className="mt-4 w-full">
            View Full Map <ArrowRight />
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

function ClubsList({ clubs }: { clubs: RiderProfile["clubs"] }) {
  return (
    <section aria-labelledby="clubs-title">
      <BlockHeader id="clubs-title" title="Clubs I Ride With" href="/clubs" />
      <ul className="rounded-card border-border divide-border divide-y border bg-white">
        {clubs.map((club) => (
          <li key={club.name} className="group relative flex items-center gap-4 p-4">
            <span className="border-border relative size-12 shrink-0 overflow-hidden rounded-full border bg-white">
              <SmartImage src={club.logo} alt="" fill sizes="48px" className="object-contain p-1" />
            </span>
            <div className="min-w-0 flex-1">
              <h3 className="text-ink truncate text-sm font-semibold">
                <Link href="/clubs" className="after:absolute after:inset-0">
                  {club.name}
                </Link>
              </h3>
              <p className="text-muted mt-0.5 text-xs">
                {club.role}
                <span className="mx-1.5" aria-hidden>
                  •
                </span>
                {club.since}
              </p>
            </div>
            <ChevronRight className="text-ink group-hover:text-primary size-5 shrink-0 transition-colors" aria-hidden />
          </li>
        ))}
      </ul>
    </section>
  );
}
