import Link from "next/link";
import { ArrowRight, Flag } from "lucide-react";
import { EmptyState } from "@/components/shared/EmptyState";
import { Skeleton } from "@/components/ui/skeleton";
import { clubsService } from "../services";
import { ClubCard } from "./ClubCard";

const grid = "grid gap-4 sm:grid-cols-3 md:gap-5";

export async function PopularClubs() {
  const clubs = await clubsService.getPopular(3);
  if (clubs.length === 0) return <EmptyState title="No clubs yet" />;
  return (
    <>
      <div className={grid}>
        {clubs.map((c) => (
          <ClubCard key={c.id} club={c} />
        ))}
      </div>
      <StartClubCta />
    </>
  );
}

export function PopularClubsSkeleton() {
  return (
    <div className={grid}>
      {Array.from({ length: 3 }, (_, i) => (
        <Skeleton key={i} className="h-80" />
      ))}
    </div>
  );
}

function StartClubCta() {
  return (
    <Link
      href="/clubs/new"
      className="group mt-4 flex items-center gap-4 rounded-card border border-secondary/20 bg-secondary-tint p-5 transition-colors hover:border-secondary md:mt-5"
    >
      <span className="grid size-12 shrink-0 place-items-center rounded-full bg-secondary text-white">
        <Flag className="size-5" aria-hidden />
      </span>
      <span className="flex-1">
        <span className="block font-bold text-ink">Run a riding club?</span>
        <span className="block text-sm text-body">
          List it on TGB — manage members, plan rides and sell event tickets.
        </span>
      </span>
      <ArrowRight className="size-5 shrink-0 text-secondary transition-transform group-hover:translate-x-1" aria-hidden />
    </Link>
  );
}
