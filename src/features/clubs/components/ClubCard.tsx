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
    <article className="group rounded-card border-border shadow-card hover:shadow-card-hover relative flex h-full flex-col overflow-hidden border bg-white transition duration-300 hover:-translate-y-1">
      <div className="bg-deep relative h-28 overflow-hidden">
        <SmartImage
          src={club.coverImage}
          alt=""
          fill
          sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
          className="object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
        />
        {club.membershipRequired && <MembersOnlyBadge className="absolute top-3 right-3" />}
      </div>
      <div className="flex flex-1 flex-col px-4 pb-4 md:px-5 md:pb-5">
        <div className="bg-ink shadow-card relative z-10 -mt-8 mb-3 grid size-16 place-items-center overflow-hidden rounded-full border-4 border-white">
          {club.logo ? (
            <SmartImage src={club.logo} alt="" width={64} height={64} className="object-cover" />
          ) : (
            <span className="font-display text-primary text-xl font-bold">
              {initials(club.name)}
            </span>
          )}
        </div>
        <h3 className="text-ink flex items-center gap-1.5 text-base font-bold">
          <Link href={`/clubs/${club.slug}`} className="after:absolute after:inset-0">
            {club.name}
          </Link>
          {club.verified && (
            <BadgeCheck className="text-secondary size-4" aria-label="Verified club" />
          )}
        </h3>
        <p className="text-muted mt-1 text-sm">
          {club.city}
          {club.ridingStyle && ` · ${club.ridingStyle}`}
        </p>
        <p className="text-body mt-3 inline-flex items-center gap-1.5 text-sm font-medium">
          <Users className="text-secondary size-4" aria-hidden /> {formatCompact(club.memberCount)}{" "}
          members
        </p>
        <Link
          href={`/clubs/${club.slug}/join`}
          className={cn(
            buttonVariants({ variant: "secondary", size: "sm" }),
            "relative z-10 mt-5 w-full",
          )}
        >
          Join Club
        </Link>
      </div>
    </article>
  );
}
