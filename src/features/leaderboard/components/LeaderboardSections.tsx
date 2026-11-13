import Link from "next/link";
import { ArrowRight, CalendarDays, Gauge, MapPin, Route, Trophy, Users, UsersRound, type LucideIcon } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { AppleIcon, GooglePlayIcon } from "@/components/shared/BrandIcons";
import { ScriptNote, Swoosh } from "@/components/shared/ScriptNote";
import { SmartImage } from "@/components/shared/SmartImage";
import { ButtonLink } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { AppPromptZone } from "@/features/home/components/AppPrompt";
import { QrCode } from "@/features/home/components/QrCode";
import type { HomeStats } from "@/features/stats/schemas";
import { formatCompact } from "@/lib/format";
import { cn } from "@/lib/utils";
import { leaderboardImages, milestones, monthlyRace, spotlight } from "../data";
import { AchievementBadge } from "./AchievementBadge";

/* ---------- Hero ---------- */

export function LeaderboardHero({ stats }: { stats: HomeStats }) {
  const items: { value: string; label: string; icon: LucideIcon }[] = [
    { value: `${formatCompact(stats.riders)}+`, label: "Active Riders", icon: UsersRound },
    { value: `${formatCompact(stats.clubs)}+`, label: "Clubs", icon: Users },
    { value: `${formatCompact(stats.events)}+`, label: "Events Hosted", icon: CalendarDays },
    { value: `${formatCompact(stats.cities)}+`, label: "Cities", icon: MapPin },
    { value: `${formatCompact(stats.kmRidden)}+`, label: "Kilometers Explored", icon: Gauge },
  ];

  return (
    <section aria-labelledby="leaderboard-title" className="bg-deep relative isolate overflow-hidden">
      <SmartImage src={leaderboardImages.hero} alt="" fill priority sizes="100vw" className="-z-20 object-cover object-[60%_45%]" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(15,26,34,0.92)_0%,rgba(15,26,34,0.72)_40%,rgba(15,26,34,0.2)_75%,rgba(15,26,34,0.35)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-linear-to-t from-[#0f1a22]/80 to-transparent" />

      <Container className="pt-14 pb-8 lg:pt-16">
        <div className="flex items-start justify-between gap-8">
          <div>
            <p className="text-primary text-xs font-bold tracking-[0.18em] uppercase">Leaderboard</p>
            <h1 id="leaderboard-title" className="font-display mt-4 text-5xl leading-[0.9] font-extrabold text-white uppercase md:text-7xl lg:text-[88px]">
              Celebrate riders.
              <br />
              Fuel <span className="text-primary">consistency.</span>
            </h1>
            <p className="mt-6 max-w-[520px] text-base leading-relaxed text-white/85 md:text-lg">
              The TGB leaderboard ranks rider activity, club participation, exploration miles and community
              contributions. Ride more, explore more, and be part of something bigger.
            </p>
            <div className="font-script mt-7 text-3xl text-white">
              #DoTheRideThing
              <Swoosh className="-mt-1 ml-2 h-4 w-[180px]" />
            </div>
          </div>
          <ScriptNote lines={["Good", "Roads", "Better", "People."]} className="hidden -rotate-[8deg] text-[40px] text-white lg:block" />
        </div>

        <div className="rounded-card mt-10 flex flex-col gap-6 border border-white/10 bg-[#0f1a22]/75 px-5 py-5 backdrop-blur-md xl:flex-row xl:items-center">
          <dl className="grid flex-1 grid-cols-2 gap-y-5 sm:grid-cols-3 lg:grid-cols-5 lg:divide-x lg:divide-white/10">
            {items.map(({ value, label, icon: Icon }, i) => (
              <div key={label} className="flex items-center gap-3.5 px-2 lg:px-5">
                <Icon className={cn("size-8 shrink-0", i === 0 ? "text-white" : "text-primary")} strokeWidth={1.5} aria-hidden />
                <div className="flex flex-col-reverse">
                  <dt className="mt-1 text-xs text-white/75 md:text-sm">{label}</dt>
                  <dd className="font-display text-3xl leading-none font-bold text-white">{value}</dd>
                </div>
              </div>
            ))}
          </dl>
          <AppPromptZone className="inline-flex shrink-0">
            <ButtonLink href="/download" size="lg">
              Join the Community <ArrowRight />
            </ButtonLink>
          </AppPromptZone>
        </div>
      </Container>
    </section>
  );
}

/* ---------- Sidebar ---------- */

export function LeaderboardSidebar() {
  return (
    <>
      <PromoCard />
      <AppCard />
      <MonthlyRaceCard />
      <MilestonesCard />
    </>
  );
}

function PromoCard() {
  return (
    <section aria-labelledby="earn-title" className="bg-deep rounded-card relative isolate overflow-hidden p-6">
      <SmartImage src={leaderboardImages.promo} alt="" fill sizes="380px" className="-z-20 object-cover object-[70%_50%]" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(15,26,34,0.95)_0%,rgba(15,26,34,0.75)_55%,rgba(15,26,34,0.3)_100%)]" />
      <span className="bg-primary grid size-11 place-items-center rounded-full text-white">
        <Trophy className="size-5" aria-hidden />
      </span>
      <h2 id="earn-title" className="font-display mt-5 text-4xl leading-[0.92] font-extrabold text-white uppercase">
        Ride.
        <br />
        Earn.
        <br />
        Be recognised.
      </h2>
      <p className="text-deep-text mt-4 max-w-[240px] text-sm leading-relaxed">
        Log rides, join events, explore new trails and contribute to the community to climb the leaderboard.
      </p>
      {/* Points and badges are earned in the app */}
      <AppPromptZone className="mt-6 inline-flex">
        <ButtonLink href="/download">
          How It Works <ArrowRight />
        </ButtonLink>
      </AppPromptZone>
    </section>
  );
}

function AppCard() {
  const pill =
    "inline-flex h-9 items-center gap-1.5 rounded-[8px] border border-white/40 px-3 text-xs font-semibold text-white transition-colors hover:border-primary hover:bg-primary";
  return (
    <section aria-labelledby="leader-app-title" className="bg-deep rounded-card flex items-center gap-4 p-5">
      <div className="flex-1">
        <h2 id="leader-app-title" className="font-display text-2xl font-bold text-white">
          Download the TGB App
        </h2>
        <p className="text-deep-text mt-2 text-sm leading-snug">Track your rides, earn points and see yourself on the leaderboard.</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <a href={siteConfig.appLinks.ios} target="_blank" rel="noopener noreferrer" className={pill}>
            <AppleIcon className="size-4" /> App Store
          </a>
          <a href={siteConfig.appLinks.android} target="_blank" rel="noopener noreferrer" className={pill}>
            <GooglePlayIcon className="size-3.5" /> Play Store
          </a>
        </div>
      </div>
      <div className="hidden shrink-0 rounded-[12px] bg-white p-2 sm:block lg:hidden xl:block">
        <QrCode value={`${siteConfig.url}${siteConfig.appLinks.download}`} size={88} />
      </div>
    </section>
  );
}

function MonthlyRaceCard() {
  const max = Math.max(...monthlyRace.map((r) => r.rides));
  return (
    <section aria-labelledby="race-title" className="rounded-card border-border border bg-white p-5">
      <h2 id="race-title" className="font-display text-ink text-2xl font-bold uppercase">
        This Month&apos;s Race
      </h2>
      <p className="mt-1 text-sm">Every ride can change the standings.</p>
      <ol className="mt-5 space-y-4">
        {monthlyRace.map((r, i) => (
          <li key={r.name} className="flex items-center gap-3">
            <span
              className={cn(
                "grid size-7 shrink-0 place-items-center rounded-full text-xs font-bold",
                i === 0 ? "bg-primary-tint text-primary" : "text-ink",
              )}
            >
              {i + 1}
            </span>
            <div className="flex-1">
              <div className="flex items-baseline justify-between gap-2 text-sm">
                <span className="text-ink font-semibold">{r.name}</span>
                <span className="text-muted text-xs">{r.rides} rides</span>
              </div>
              <div className="bg-page mt-1.5 h-1.5 overflow-hidden rounded-full" aria-hidden>
                <div className={cn("h-full rounded-full", i === 0 ? "bg-primary" : "bg-secondary")} style={{ width: `${(r.rides / max) * 100}%` }} />
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

function MilestonesCard() {
  return (
    <section aria-labelledby="milestones-title" className="rounded-card border-border border bg-white p-5">
      <div className="flex items-end justify-between gap-3">
        <h2 id="milestones-title" className="font-display text-ink text-2xl font-bold uppercase">
          Recent Milestones
        </h2>
        <AppPromptZone className="inline-flex">
          <Link href="/download" className="group text-secondary hover:text-primary inline-flex items-center gap-1 text-sm font-semibold">
            View all <ArrowRight className="text-primary size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
          </Link>
        </AppPromptZone>
      </div>
      <ul className="mt-5 grid grid-cols-5 gap-2">
        {milestones.map((m) => (
          <li key={m.label} className="flex flex-col items-center text-center">
            <AchievementBadge badge={m.badge} size="lg" className="size-12" />
            <span className="text-ink mt-2 text-[11px] leading-tight font-semibold">{m.label}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ---------- Spotlight + club CTA ---------- */

export function LeaderboardHighlights() {
  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
      <section aria-labelledby="spotlight-title" className="bg-deep rounded-card relative isolate overflow-hidden">
        <div className="absolute inset-y-0 left-0 -z-10 w-full sm:w-[42%]">
          <SmartImage src={spotlight.image} alt="" fill sizes="(min-width: 1024px) 25vw, 100vw" className="object-cover" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_40%,#0f1a22_100%)] max-sm:bg-deep/80" />
        </div>
        <div className="grid gap-6 p-6 sm:ml-[38%] md:grid-cols-[1fr_auto] md:p-8">
          <div>
            <p className="text-primary text-xs font-bold tracking-[0.18em] uppercase">This month&apos;s spotlight</p>
            <h2 id="spotlight-title" className="font-display mt-2 text-3xl font-bold text-white">
              {spotlight.name}
            </h2>
            <p className="text-deep-text mt-1 flex items-center gap-1.5 text-sm">
              <MapPin className="text-primary size-4" aria-hidden /> {spotlight.location}
            </p>
            <blockquote className="mt-4 text-sm leading-relaxed text-white/90 italic">&ldquo;{spotlight.quote}&rdquo;</blockquote>
          </div>
          <div className="flex flex-col gap-4">
            <dl className="space-y-3">
              {spotlight.stats.map((s, i) => {
                const Icon = [Route, Gauge, MapPin][i];
                return (
                  <div key={s.label} className="flex items-center gap-3">
                    <Icon className="size-5 shrink-0 text-white" strokeWidth={1.5} aria-hidden />
                    <div className="flex flex-col-reverse">
                      <dt className="text-deep-text text-xs">{s.label}</dt>
                      <dd className="font-semibold text-white">{s.value}</dd>
                    </div>
                  </div>
                );
              })}
            </dl>
            <ButtonLink href="/rider" variant="outline-light" size="sm">
              View Profile <ArrowRight />
            </ButtonLink>
          </div>
        </div>
      </section>

      <section aria-labelledby="club-next-title" className="rounded-card bg-primary-tint relative isolate overflow-hidden p-6 md:p-8">
        <div className="absolute inset-y-0 right-0 -z-10 hidden w-1/2 sm:block">
          <SmartImage src={leaderboardImages.clubNext} alt="" fill sizes="300px" className="object-cover [mask-image:linear-gradient(90deg,transparent,#000_60%)]" />
        </div>
        <h2 id="club-next-title" className="font-display text-ink max-w-[260px] text-3xl leading-tight font-bold uppercase">
          Your club could be next.
        </h2>
        <p className="mt-3 max-w-[260px] text-sm">Get your club active, explore new trails and climb the leaderboard together.</p>
        <ButtonLink href="/search" className="mt-6">
          Explore Clubs <ArrowRight />
        </ButtonLink>
      </section>
    </div>
  );
}
