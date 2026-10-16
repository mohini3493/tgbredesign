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
          sizes="(min-width: 1024px) 400px, 85vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute left-4 top-4 flex gap-2">
          {event.category && <Badge tone="glass">{event.category}</Badge>}
          {event.membersOnly && <MembersOnlyBadge />}
        </div>
      </div>

      <div className="relative flex flex-1 flex-col p-5 pt-8">
        <div className="absolute -top-8 right-5 flex w-16 flex-col items-center rounded-btn bg-white py-2 shadow-card">
          <span className="font-display text-3xl font-bold leading-none text-primary">{day}</span>
          <span className="text-[11px] font-bold tracking-widest text-ink">{month}</span>
        </div>
        <h3 className="pr-16 font-display text-2xl font-bold uppercase leading-tight">
          <Link href={`/events/${event.slug}`} className="after:absolute after:inset-0">
            {event.title}
          </Link>
        </h3>
        <p className="mt-2 flex items-center gap-1.5 text-sm text-body">
          <MapPin className="size-4 text-secondary" aria-hidden /> {event.venue}, {event.city}
        </p>
        <p className="mt-1 text-sm text-muted">{formatDateRange(event.startDate, event.endDate)}</p>

        <div className="mt-auto flex items-center justify-between gap-3 pt-5">
          {event.priceINR != null ? (
            <p className="text-sm text-muted">
              From <span className="text-base font-bold text-ink">{formatINR(event.priceINR)}</span>
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
