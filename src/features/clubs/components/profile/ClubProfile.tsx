import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Bike,
  CalendarCheck,
  CalendarDays,
  ChevronRight,
  Clock,
  Heart,
  MapPin,
  MessageCircle,
  MessageSquare,
  ShieldCheck,
  Trophy,
  Users,
  UsersRound,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { ShareButton } from "@/components/shared/ShareButton";
import { SmartImage } from "@/components/shared/SmartImage";
import { ButtonLink } from "@/components/ui/button";
import { AppPromptZone } from "@/features/home/components/AppPrompt";
import { cn } from "@/lib/utils";
import type { ClubPost, ClubProfile, ClubRide } from "../../club-profile";
import { ClubBadge } from "../directory/ClubBadge";

/* ---------- Shared bits ---------- */

/** Block title with an optional "View all" link (same link treatment as SectionHeader). */
function BlockHeader({ id, title, link, light = false }: { id: string; title: string; link?: { label: string; href: string }; light?: boolean }) {
  return (
    <div className="mb-4 flex items-end justify-between gap-4">
      <h2 id={id} className={cn("font-jakarta text-xl font-semibold", light ? "text-white" : "text-ink")}>
        {title}
      </h2>
      {link && (
        <Link href={link.href} className="group text-secondary hover:text-primary inline-flex items-center gap-1.5 text-sm font-semibold">
          {link.label}
          <ArrowRight className="text-primary size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
        </Link>
      )}
    </div>
  );
}

function AvatarStack({ avatars, more, ring = "ring-white" }: { avatars: string[]; more: number; ring?: string }) {
  return (
    <div className="flex items-center">
      {avatars.map((src, i) => (
        <span key={src} className={cn("relative size-7 overflow-hidden rounded-full ring-2", ring, i > 0 && "-ml-2")}>
          <SmartImage src={src} alt="" fill sizes="28px" className="object-cover" />
        </span>
      ))}
      {more > 0 && <span className="text-ink bg-page ml-1.5 rounded-full px-2 py-0.5 text-xs font-semibold">+{more}</span>}
    </div>
  );
}

/* ---------- Hero ---------- */

export function ClubHero({ club }: { club: ClubProfile }) {
  return (
    <section aria-labelledby="club-name" className="bg-deep relative isolate overflow-hidden">
      <SmartImage src={club.cover} alt="" fill priority sizes="100vw" className="-z-20 object-cover object-[50%_40%]" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(15,26,34,0.85)_0%,rgba(15,26,34,0.6)_45%,rgba(15,26,34,0.45)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-2/3 bg-linear-to-t from-[#0f1a22]/90 to-transparent" />

      <Container className="pt-6 pb-10 lg:pb-12">
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 text-sm text-white/80">
            <li>
              <Link href="/" className="hover:text-primary transition-colors">
                Home
              </Link>
            </li>
            <ChevronRight className="size-3.5" aria-hidden />
            <li>
              <Link href="/search" className="hover:text-primary transition-colors">
                Clubs
              </Link>
            </li>
            <ChevronRight className="size-3.5" aria-hidden />
            <li aria-current="page" className="font-semibold text-white">
              {club.name}
            </li>
          </ol>
        </nav>

        <div className="mt-16 flex flex-col gap-8 lg:mt-28 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center lg:gap-8">
            <div className="bg-primary size-[140px] shrink-0 rounded-full p-[3px] lg:size-[176px]">
              <ClubBadge club={club} large className="size-full" />
            </div>
            <div>
              <h1 id="club-name" className="font-jakarta flex items-center gap-3 text-4xl font-semibold tracking-[-0.02em] text-white md:text-5xl">
                {club.name}
                {club.verified && <BadgeCheck className="fill-primary size-8 shrink-0 text-white" strokeWidth={2} aria-label="Verified club" />}
              </h1>
              <p className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-base text-white/90">
                <span className="inline-flex items-center gap-2">
                  <MapPin className="size-4" aria-hidden /> {club.location}
                </span>
                <span className="h-4 w-px bg-white/40" aria-hidden />
                <span className="inline-flex items-center gap-2">
                  <CalendarDays className="size-4" aria-hidden /> Est. {club.established}
                </span>
              </p>
              <p className="mt-4 max-w-[540px] text-sm leading-relaxed text-white/85 md:text-base">{club.tagline}</p>
              <ul className="mt-5 flex flex-wrap gap-2" aria-label="Club focus">
                {club.tags.map((t) => (
                  <li key={t} className="rounded-full border border-white/40 px-4 py-1.5 text-xs font-medium text-white md:text-sm">
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-col gap-5 lg:items-end">
            <div className="flex gap-3">
              <ShareButton
                title={`${club.name} on The Good Biker`}
                label="Share"
                className="h-13 border-white/60 bg-transparent px-7 text-base text-white hover:border-primary hover:bg-primary hover:text-white"
              />
              {/* Joining needs an account: open the app download popup */}
              <AppPromptZone className="inline-flex">
                <ButtonLink href={`/clubs/${club.slug}/join`} size="lg" className="px-9">
                  Join Club
                </ButtonLink>
              </AppPromptZone>
            </div>
            <div className="flex items-center gap-4">
              <AvatarStack avatars={club.memberAvatars} more={club.memberCount - club.memberAvatars.length} ring="ring-deep" />
              <span className="font-semibold text-white">{club.memberCount} Members</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ---------- Tabs ---------- */

const tabs = ["Upcoming Rides", "Past Rides", "Events", "Members", "Gallery", "Feed"];

export function ClubTabs() {
  const tab = "relative shrink-0 py-5 text-sm font-semibold transition-colors";
  return (
    <div className="border-border border-b bg-white">
      <Container>
        <nav aria-label="Club sections" className="no-scrollbar flex gap-10 overflow-x-auto">
          <Link href="/clubs" aria-current="page" className={cn(tab, "text-ink after:bg-primary after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:rounded-full")}>
            About
          </Link>
          {/* Other sections live in the app for now */}
          <AppPromptZone className="contents">
            {tabs.map((t) => (
              <Link key={t} href={`/clubs?tab=${t.toLowerCase().replace(/\s+/g, "-")}`} className={cn(tab, "text-body hover:text-primary")}>
                {t}
              </Link>
            ))}
          </AppPromptZone>
        </nav>
      </Container>
    </div>
  );
}

/* ---------- About row ---------- */

export function ClubAbout({ club }: { club: ClubProfile }) {
  const valueIcons: LucideIcon[] = [Bike, CalendarCheck, ShieldCheck, Trophy];
  const stats: { value: number; label: string; icon: LucideIcon }[] = [
    { value: club.stats.members, label: "Members", icon: UsersRound },
    { value: club.stats.ridesCompleted, label: "Rides Completed", icon: Bike },
    { value: club.stats.citiesExplored, label: "Cities Explored", icon: MapPin },
    { value: club.stats.yearsTogether, label: "Years Together", icon: ShieldCheck },
  ];

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr] xl:grid-cols-[1.2fr_1.1fr_0.9fr]">
      <section aria-labelledby="about-club-title" className="lg:pr-6">
        <h2 id="about-club-title" className="font-jakarta text-ink text-xl font-semibold">
          About the Club
        </h2>
        <p className="mt-4 text-sm leading-relaxed md:text-base">{club.about}</p>
        <ul className="mt-5 space-y-3">
          {club.values.map((v, i) => {
            const Icon = valueIcons[i % valueIcons.length];
            return (
              <li key={v} className="text-ink flex items-center gap-3 text-sm">
                <Icon className="text-primary size-4.5 shrink-0" aria-hidden /> {v}
              </li>
            );
          })}
        </ul>
      </section>

      <dl className="rounded-card border-border grid grid-cols-2 self-start overflow-hidden border bg-white" aria-label="Club stats">
        {stats.map(({ value, label, icon: Icon }, i) => (
          <div
            key={label}
            className={cn(
              "border-border flex items-center gap-4 p-5 md:p-6",
              i % 2 === 0 && "border-r",
              i < 2 && "border-b",
            )}
          >
            <span className="text-ink bg-page grid size-12 shrink-0 place-items-center rounded-full">
              <Icon className="size-5.5" strokeWidth={1.5} aria-hidden />
            </span>
            <div className="flex flex-col-reverse">
              <dt className="text-body mt-1 text-sm">{label}</dt>
              <dd className="font-display text-ink text-3xl leading-none font-bold md:text-4xl">{value}</dd>
            </div>
          </div>
        ))}
      </dl>

      <section aria-labelledby="founder-title" className="rounded-card border-border self-start border bg-white p-5 lg:col-span-2 xl:col-span-1">
        <h2 id="founder-title" className="text-muted text-xs font-medium">
          Founded By
        </h2>
        <div className="mt-3 flex items-center gap-3">
          <span className="relative size-12 shrink-0 overflow-hidden rounded-full">
            <SmartImage src={club.founder.avatar} alt="" fill sizes="48px" className="object-cover" />
          </span>
          <div>
            <p className="text-ink font-semibold">{club.founder.name}</p>
            <p className="text-muted text-xs">@{club.founder.handle}</p>
          </div>
        </div>
        <blockquote className="text-ink mt-4 text-sm leading-relaxed">&ldquo;{club.founder.quote}&rdquo;</blockquote>
        <AppPromptZone className="mt-4 inline-flex">
          <ButtonLink href="/login" variant="outline" size="sm">
            <MessageSquare /> Message Founder
          </ButtonLink>
        </AppPromptZone>
      </section>
    </div>
  );
}

/* ---------- Rides + meetup ---------- */

export function ClubRides({ club }: { club: ClubProfile }) {
  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_300px]">
      <section aria-labelledby="club-rides-title" className="rounded-card border-border border bg-white p-4 md:p-5">
        <BlockHeader id="club-rides-title" title="Upcoming Rides" link={{ label: "View all rides", href: "/rides" }} />
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {club.upcomingRides.map((ride) => (
            <RideCard key={ride.title} ride={ride} />
          ))}
        </ul>
      </section>
      <NextMeetup meetup={club.nextMeetup} />
    </div>
  );
}

function RideCard({ ride }: { ride: ClubRide }) {
  return (
    <li className="rounded-card border-border group relative overflow-hidden border bg-white transition-shadow hover:shadow-card">
      <div className="relative h-[130px]">
        <SmartImage src={ride.image} alt="" fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
        <span className="shadow-card absolute top-3 left-3 w-11 overflow-hidden rounded-[10px] bg-white text-center">
          <span className="bg-primary block py-0.5 text-[10px] font-bold text-white uppercase">{ride.date.month}</span>
          <span className="font-display text-ink block py-0.5 text-lg leading-tight font-bold">{ride.date.day}</span>
        </span>
        <span className="absolute bottom-2.5 left-3 flex gap-1.5">
          <span className="bg-secondary-tint text-secondary rounded-full px-2 py-0.5 text-[10px] font-bold uppercase">{ride.type}</span>
          {ride.open && <span className="text-ink rounded-full bg-white px-2 py-0.5 text-[10px] font-bold uppercase">Open</span>}
        </span>
      </div>
      <div className="p-4">
        <h3 className="font-jakarta text-ink font-semibold">
          <Link href="/rides" className="after:absolute after:inset-0">
            {ride.title}
          </Link>
        </h3>
        <p className="text-muted mt-2 flex items-center gap-1.5 text-xs">
          <MapPin className="text-primary size-3.5 shrink-0" aria-hidden />
          {ride.from} • {ride.distanceKm} km
        </p>
        <p className="text-muted mt-1 flex items-center gap-1.5 text-xs">
          <Clock className="text-primary size-3.5 shrink-0" aria-hidden />
          {ride.when}
        </p>
        <div className="mt-4 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <AvatarStack avatars={ride.avatars} more={ride.going - ride.avatars.length} />
            <span className="text-muted text-xs">{ride.going} going</span>
          </div>
          <span
            className="border-border text-ink group-hover:border-primary group-hover:bg-primary grid size-8 shrink-0 place-items-center rounded-full border transition-colors group-hover:text-white"
            aria-hidden
          >
            <ArrowRight className="size-4" />
          </span>
        </div>
      </div>
    </li>
  );
}

function NextMeetup({ meetup }: { meetup: ClubProfile["nextMeetup"] }) {
  return (
    <section aria-labelledby="meetup-title" className="bg-deep rounded-card flex flex-col text-white">
      <h2 id="meetup-title" className="font-jakarta flex items-center gap-3 border-b border-white/10 px-6 py-5 text-lg font-semibold text-white">
        <CalendarDays className="text-primary size-5" aria-hidden /> Next Meetup
      </h2>
      <div className="flex-1 px-6 py-5">
        <h3 className="font-jakarta text-lg font-semibold text-white">{meetup.title}</h3>
        <p className="text-deep-text mt-3 flex items-start gap-2.5 text-sm">
          <CalendarDays className="text-primary mt-0.5 size-4 shrink-0" aria-hidden /> {meetup.when}
        </p>
        <p className="text-deep-text mt-2 flex items-start gap-2.5 text-sm">
          <MapPin className="text-primary mt-0.5 size-4 shrink-0" aria-hidden /> {meetup.venue}
        </p>
        <AppPromptZone className="mt-5 inline-flex">
          <Link
            href="/login"
            className="border-primary text-primary hover:bg-primary rounded-btn inline-flex h-10 items-center gap-2 border px-4 text-sm font-semibold transition-colors hover:text-white"
          >
            <CalendarCheck className="size-4" aria-hidden /> I&apos;m Going
          </Link>
        </AppPromptZone>
      </div>
      <AppPromptZone className="border-t border-white/10">
        <Link href="/events" className="group hover:text-primary flex items-center gap-2 px-6 py-5 text-sm font-semibold text-white transition-colors">
          See all events <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
        </Link>
      </AppPromptZone>
    </section>
  );
}

/* ---------- Gallery + posts ---------- */

export function ClubMedia({ club }: { club: ClubProfile }) {
  const [main, ...rest] = club.gallery.photos;
  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
      <section aria-labelledby="gallery-title">
        <BlockHeader id="gallery-title" title="Gallery" link={{ label: "View all photos", href: "/clubs?tab=gallery" }} />
        <ul className="grid h-[420px] grid-cols-4 grid-rows-2 gap-2 sm:h-[300px]">
          <li className="rounded-card relative col-span-4 overflow-hidden sm:col-span-2 sm:row-span-2">
            <SmartImage src={main.src} alt={main.alt} fill sizes="(min-width: 1280px) 30vw, 60vw" className="object-cover" />
          </li>
          {rest.map((p, i) => (
            <li key={p.src} className="rounded-card relative col-span-1 overflow-hidden">
              <SmartImage src={p.src} alt={p.alt} fill sizes="(min-width: 1280px) 15vw, 30vw" className="object-cover" />
              {i === rest.length - 1 && (
                <span className="font-jakarta bg-deep/55 absolute inset-0 grid place-items-center text-2xl font-semibold text-white">
                  +{club.gallery.more}
                </span>
              )}
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="posts-title" className="rounded-card border-border border bg-white p-4 md:p-5">
        <BlockHeader id="posts-title" title="Recent from the Club" link={{ label: "View all posts", href: "/clubs?tab=feed" }} />
        <ul className="divide-border divide-y">
          {club.posts.map((post) => (
            <PostRow key={post.text} post={post} />
          ))}
        </ul>
      </section>
    </div>
  );
}

function PostRow({ post }: { post: ClubPost }) {
  return (
    <li className="group relative flex gap-4 py-3 first:pt-0 last:pb-0">
      <span className="relative h-[70px] w-[96px] shrink-0 overflow-hidden rounded-[10px]">
        <SmartImage src={post.image} alt="" fill sizes="96px" className="object-cover" />
      </span>
      <div className="flex min-w-0 flex-1 flex-col justify-between">
        <p className="text-ink text-sm font-medium">
          <Link href="/clubs?tab=feed" className="group-hover:text-primary after:absolute after:inset-0">
            {post.text}
          </Link>
        </p>
        <div className="text-muted flex items-center justify-between gap-3 text-xs">
          <span>{post.ago}</span>
          <span className="text-ink flex gap-4 font-semibold">
            <span className="inline-flex items-center gap-1">
              <Heart className="fill-primary text-primary size-3.5" aria-hidden /> {post.likes}
              <span className="sr-only">likes</span>
            </span>
            <span className="inline-flex items-center gap-1">
              <MessageCircle className="size-3.5" aria-hidden /> {post.comments}
              <span className="sr-only">comments</span>
            </span>
          </span>
        </div>
      </div>
    </li>
  );
}

/* ---------- CTA ---------- */

export function ClubJoinCta({ club }: { club: ClubProfile }) {
  return (
    <section aria-labelledby="club-cta-title" className="bg-deep rounded-card relative isolate overflow-hidden">
      <SmartImage src={club.ctaImage} alt="" fill sizes="(min-width: 1620px) 1560px, 100vw" className="-z-20 object-cover object-[60%_60%]" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(15,26,34,0.95)_0%,rgba(15,26,34,0.8)_45%,rgba(15,26,34,0.45)_100%)]" />
      <div className="flex flex-col gap-8 px-6 py-10 md:px-10 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 id="club-cta-title" className="font-display text-4xl leading-[0.95] font-extrabold text-white uppercase md:text-5xl">
            Ride together. Grow together.
            <br />
            <span className="text-primary">Be part of the journey.</span>
          </h2>
          <p className="mt-4 max-w-[440px] text-sm text-white/85 md:text-base">
            Join {club.name} and connect with riders who share your passion for the road.
          </p>
        </div>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:min-w-[300px]">
          <AppPromptZone className="flex">
            <ButtonLink href={`/clubs/${club.slug}/join`} size="lg" className="w-full">
              Join Club
            </ButtonLink>
          </AppPromptZone>
          <ButtonLink href="/search" variant="outline-light" size="lg" className="w-full">
            <Users /> Explore More Clubs
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
