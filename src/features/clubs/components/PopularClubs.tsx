import Link from "next/link";
import { ArrowRight, Flag } from "lucide-react";
import { EmptyState } from "@/components/shared/EmptyState";
import { Skeleton } from "@/components/ui/skeleton";
import { clubsService } from "../services";
import { ClubCard } from "./ClubCard";

const grid = "grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-5 lg:grid-cols-5";

export async function PopularClubs() {
  const clubs = await clubsService.getPopular(5);
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
      {Array.from({ length: 5 }, (_, i) => (
        <Skeleton key={i} className="h-80" />
      ))}
    </div>
  );
}

function StartClubCta() {
  return (
    <Link
      href="/clubs/new"
      className="group rounded-card border-secondary/20 bg-secondary-tint hover:border-secondary mt-4 flex items-center gap-4 border p-5 transition-colors md:mt-5"
    >
      <span className="bg-secondary grid size-12 shrink-0 place-items-center rounded-full text-white">
        <Flag className="size-5" aria-hidden />
      </span>
      <span className="flex-1">
        <span className="text-ink block font-bold">Run a riding club?</span>
        <span className="text-body block text-sm">
          List it on TGB — manage members, plan rides and sell event tickets.
        </span>
      </span>
      <ArrowRight
        className="text-secondary size-5 shrink-0 transition-transform group-hover:translate-x-1"
        aria-hidden
      />
    </Link>
  );
}
