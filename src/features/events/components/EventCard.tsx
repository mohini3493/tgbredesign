import Link from "next/link";
import { MapPin } from "lucide-react";
import { SmartImage } from "@/components/shared/SmartImage";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MembersOnlyBadge } from "@/features/membership/components/MembersOnlyBadge";
import { dateBlock, formatDateRange, formatINR } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { TgbEvent } from "../schemas";

export function EventCard({ event }: { event: TgbEvent }) {
  const { day, month } = dateBlock(event.startDate);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-card border border-border bg-white shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-card-hover">
      <div className="relative aspect-[16/10] overflow-hidden bg-deep">
        <SmartImage
          src={event.coverImage}
          alt={event.title}
          fill
          sizes="(min-width: 1024px) 17vw, (min-width: 640px) 33vw, 70vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          {event.category && <Badge tone="glass">{event.category}</Badge>}
          {event.membersOnly && <MembersOnlyBadge />}
        </div>
      </div>

      <div className="relative flex flex-1 flex-col p-4 pt-7">
        <div className="absolute -top-7 right-4 flex w-12 flex-col items-center rounded-btn bg-white py-1.5 shadow-card">
          <span className="font-display text-2xl font-bold leading-none text-primary">{day}</span>
          <span className="text-[10px] font-bold tracking-widest text-ink">{month}</span>
        </div>
        <h3 className="line-clamp-2 pr-12 font-display text-lg font-bold uppercase leading-tight">
          <Link href={`/events/${event.slug}`} className="after:absolute after:inset-0">
            {event.title}
          </Link>
        </h3>
        <p className="mt-2 flex items-start gap-1.5 text-xs text-body">
          <MapPin className="mt-px size-3.5 shrink-0 text-secondary" aria-hidden />
          <span className="line-clamp-2">
            {event.venue}, {event.city}
          </span>
        </p>
        <p className="mt-1 text-xs text-muted">{formatDateRange(event.startDate, event.endDate)}</p>

        <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-4">
          {event.priceINR != null ? (
            <p className="text-xs text-muted">
              From <span className="text-sm font-bold text-ink">{formatINR(event.priceINR)}</span>
            </p>
          ) : (
            <span />
          )}
          <Link href={event.ticketUrl} className={cn(buttonVariants({ size: "sm" }), "relative z-10")}>
            Book Now
          </Link>
        </div>
      </div>
    </article>
  );
}
