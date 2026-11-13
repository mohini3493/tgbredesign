"use client";

import Link from "next/link";
import { ArrowRight, BadgeCheck, Bookmark, MapPin } from "lucide-react";
import { SmartImage } from "@/components/shared/SmartImage";
import { useAppPrompt } from "@/features/home/store/appPrompt";
import { cn } from "@/lib/utils";
import type { ClubListing } from "../../schemas";
import { ClubBadge } from "./ClubBadge";

/** Brand-palette pill tones; a tag always gets the same tone. */
const tones = [
  "bg-secondary-tint text-secondary",
  "bg-primary-tint text-primary-hover",
  "bg-page text-ink",
];
function toneFor(tag: string) {
  let h = 0;
  for (const ch of tag) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return tones[h % tones.length];
}

export function clubLocation(club: Pick<ClubListing, "city" | "state">) {
  return club.state ? `${club.city}, ${club.state}` : club.city;
}

export function ClubListingCard({ club, layout = "grid" }: { club: ClubListing; layout?: "grid" | "list" }) {
  const list = layout === "list";
  return (
    <article
      className={cn(
        "group rounded-card border-border shadow-card hover:shadow-card-hover relative flex overflow-hidden border bg-white transition duration-300 hover:-translate-y-0.5",
        list ? "flex-col sm:flex-row" : "h-full flex-col",
      )}
    >
      <div className={cn("bg-deep relative shrink-0 overflow-hidden", list ? "h-36 sm:h-auto sm:w-[260px]" : "h-36")}>
        <SmartImage
          src={club.coverImage}
          alt=""
          fill
          sizes={list ? "260px" : "(min-width: 1280px) 22vw, (min-width: 640px) 45vw, 100vw"}
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <SaveClubButton name={club.name} className={list ? "sm:right-auto sm:left-3" : undefined} />
      </div>

      <div className={cn("relative flex flex-1 flex-col px-4 pb-4 md:px-5 md:pb-5", list && "sm:pt-5 sm:pl-14 md:pl-14")}>
        <ClubBadge
          club={club}
          className={cn("relative z-10 size-[84px]", list ? "-mt-10 mb-3 sm:absolute sm:top-5 sm:-left-[54px] sm:mt-0" : "-mt-12 mb-3")}
        />
        <h3 className="font-jakarta text-ink flex items-center gap-1.5 text-lg font-semibold">
          <Link href={`/clubs/${club.slug}`} className="after:absolute after:inset-0">
            {club.name}
          </Link>
          {club.verified && <BadgeCheck className="text-primary size-4.5 shrink-0" aria-label="Verified club" />}
        </h3>
        <p className="text-muted mt-1 flex items-center gap-1.5 text-xs">
          <MapPin className="size-3.5 shrink-0" aria-hidden /> {clubLocation(club)}
        </p>
        <p className="text-muted mt-3 flex gap-5 text-xs">
          <span>
            <strong className="text-ink text-sm font-semibold">{club.memberCount.toLocaleString("en-IN")}</strong> Members
          </span>
          <span>
            <strong className="text-ink text-sm font-semibold">{club.rideCount}</strong> Rides
          </span>
        </p>
        <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Club focus">
          {club.tags.map((tag) => (
            <li key={tag} className={cn("rounded-full px-2.5 py-1 text-[11px] font-semibold", toneFor(tag))}>
              {tag}
            </li>
          ))}
        </ul>
        <div className="mt-4 flex flex-1 items-end justify-between gap-4">
          <p className="text-body line-clamp-3 text-sm leading-relaxed">{club.description}</p>
          <span
            className="border-border text-ink group-hover:border-primary group-hover:bg-primary grid size-9 shrink-0 place-items-center rounded-full border transition-colors group-hover:text-white"
            aria-hidden
          >
            <ArrowRight className="size-4" />
          </span>
        </div>
      </div>
    </article>
  );
}

/** Saving a club needs an account, so for now it opens the app download popup. */
function SaveClubButton({ name, className }: { name: string; className?: string }) {
  const show = useAppPrompt((s) => s.show);
  return (
    <button
      type="button"
      onClick={show}
      aria-label={`Save ${name}`}
      className={cn(
        "bg-deep/55 hover:bg-primary absolute top-3 right-3 z-10 grid size-9 place-items-center rounded-[10px] text-white backdrop-blur transition-colors",
        className,
      )}
    >
      <Bookmark className="size-4.5" />
    </button>
  );
}
