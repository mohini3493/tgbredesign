import Link from "next/link";
import { ArrowUpRight, CalendarRange, Clock, Gauge } from "lucide-react";
import { SmartImage } from "@/components/shared/SmartImage";
import { formatKm } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { Route } from "../schemas";
import { DifficultyBadge } from "./DifficultyBadge";

export function RouteCard({ route, featured = false, className }: { route: Route; featured?: boolean; className?: string }) {
  return (
    <Link
      href={`/routes/${route.slug}`}
      className={cn(
        "group relative isolate flex min-h-64 flex-col justify-end overflow-hidden rounded-card bg-deep shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-card-hover",
        featured && "min-h-[420px] md:min-h-full",
        className,
      )}
    >
      <SmartImage
        src={route.coverImage}
        alt={`${route.name}, ${route.state}`}
        fill
        sizes={featured ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 25vw, 50vw"}
        className="-z-10 object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(15,26,34,0)_35%,rgba(15,26,34,0.92)_100%)]" />

      <div className="absolute left-4 top-4">
        <DifficultyBadge level={route.difficulty} />
      </div>
      <span className="absolute right-4 top-4 grid size-10 place-items-center rounded-full bg-white/90 text-ink opacity-0 transition group-hover:opacity-100">
        <ArrowUpRight className="size-5" aria-hidden />
      </span>

      <div className={cn("p-5", featured && "md:p-8")}>
        <p className="text-xs font-semibold uppercase tracking-wider text-deep-text">{route.state}</p>
        <h3 className={cn("font-display font-bold uppercase leading-none text-white", featured ? "mt-2 text-5xl md:text-6xl" : "mt-1 text-3xl")}>
          {route.name}
        </h3>
        {featured && route.tagline && <p className="mt-3 max-w-md text-sm text-deep-text md:text-base">{route.tagline}</p>}
        <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs font-medium text-white/90">
          <li className="inline-flex items-center gap-1.5">
            <Gauge className="size-3.5 text-primary" aria-hidden /> {formatKm(route.distanceKm)}
          </li>
          <li className="inline-flex items-center gap-1.5">
            <CalendarRange className="size-3.5 text-primary" aria-hidden /> {route.bestSeason}
          </li>
          {featured && route.durationDays && (
            <li className="inline-flex items-center gap-1.5">
              <Clock className="size-3.5 text-primary" aria-hidden /> {route.durationDays} days
            </li>
          )}
        </ul>
      </div>
    </Link>
  );
}
