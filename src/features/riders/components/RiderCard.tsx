import Link from "next/link";
import { SmartImage } from "@/components/shared/SmartImage";
import { formatKm } from "@/lib/format";
import type { Rider } from "../schemas";

export function RiderCard({ rider }: { rider: Rider }) {
  return (
    <li className="group rounded-card border-border shadow-card hover:shadow-card-hover relative flex h-full flex-col items-center border bg-white p-4 text-center transition duration-300 hover:-translate-y-1">
      <div className="relative">
        <div className="bg-secondary-tint relative size-20 overflow-hidden rounded-full">
          <SmartImage src={rider.avatar} alt="" fill sizes="80px" className="object-cover" />
        </div>
        {rider.isOnline && (
          <span
            className="bg-secondary absolute right-1 bottom-1 size-4 rounded-full border-2 border-white"
            aria-label="Online"
          />
        )}
      </div>
      <p className="text-ink mt-3 w-full truncate font-semibold">
        <Link href={`/riders/${rider.username}`} className="after:absolute after:inset-0">
          {rider.name}
        </Link>
      </p>
      <p className="text-muted w-full truncate text-xs">
        {rider.city}
        {rider.bike && ` · ${rider.bike}`}
      </p>
      <div className="mt-2 flex flex-wrap justify-center gap-1">
        {rider.styles.map((s) => (
          <span
            key={s}
            className="bg-secondary-tint text-secondary rounded-full px-2 py-0.5 text-[11px] font-semibold"
          >
            {s}
          </span>
        ))}
      </div>
      <p className="text-muted mt-auto pt-3 text-xs">
        <span className="text-ink font-bold">{rider.ridesCount} rides</span> ·{" "}
        {formatKm(rider.totalKm)}
      </p>
      <Link
        href={`/riders/${rider.username}/connect`}
        className="rounded-btn text-primary hover:bg-primary-tint relative z-10 mt-2 w-full py-2 text-sm font-semibold transition-colors"
      >
        Connect
      </Link>
    </li>
  );
}
