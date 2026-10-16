import Link from "next/link";
import { BadgeCheck, Users } from "lucide-react";
import { SmartImage } from "@/components/shared/SmartImage";
import { buttonVariants } from "@/components/ui/button";
import { MembersOnlyBadge } from "@/features/membership/components/MembersOnlyBadge";
import { formatCompact } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { Club } from "../schemas";

function initials(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

export function ClubCard({ club }: { club: Club }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-card border border-border bg-white shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-card-hover">
      <div className="relative h-28 overflow-hidden bg-deep">
        <SmartImage src={club.coverImage} alt="" fill sizes="320px" className="object-cover opacity-90 transition-transform duration-700 group-hover:scale-105" />
        {club.membershipRequired && <MembersOnlyBadge className="absolute right-3 top-3" />}
      </div>
      <div className="flex flex-1 flex-col px-5 pb-5">
        <div className="relative z-10 -mt-8 mb-3 grid size-16 place-items-center overflow-hidden rounded-full border-4 border-white bg-ink shadow-card">
          {club.logo ? (
            <SmartImage src={club.logo} alt="" width={64} height={64} className="object-cover" />
          ) : (
            <span className="font-display text-xl font-bold text-primary">{initials(club.name)}</span>
          )}
        </div>
        <h3 className="flex items-center gap-1.5 text-base font-bold text-ink">
          <Link href={`/clubs/${club.slug}`} className="after:absolute after:inset-0">
            {club.name}
          </Link>
          {club.verified && <BadgeCheck className="size-4 text-secondary" aria-label="Verified club" />}
        </h3>
        <p className="mt-1 text-sm text-muted">
          {club.city}
          {club.ridingStyle && ` · ${club.ridingStyle}`}
        </p>
        <p className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-body">
          <Users className="size-4 text-secondary" aria-hidden /> {formatCompact(club.memberCount)} members
        </p>
        <Link
          href={`/clubs/${club.slug}/join`}
          className={cn(buttonVariants({ variant: "secondary", size: "sm" }), "relative z-10 mt-5 w-full")}
        >
          Join Club
        </Link>
      </div>
    </article>
  );
}
