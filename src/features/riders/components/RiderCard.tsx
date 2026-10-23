import Link from "next/link";
import { SmartImage } from "@/components/shared/SmartImage";
import { formatKm } from "@/lib/format";
import type { Rider } from "../schemas";

export function RiderCard({ rider }: { rider: Rider }) {
  return (
    <li className="group rounded-card border-border shadow-card hover:shadow-card-hover relative flex h-full items-center gap-3 border bg-white p-3.5 transition duration-300 hover:-translate-y-1">
      <div className="relative shrink-0">
        <div className="bg-secondary-tint relative size-14 overflow-hidden rounded-full">
          <SmartImage src={rider.avatar} alt="" fill sizes="56px" className="object-cover" />
        </div>
        {rider.isOnline && (
          <span
            className="bg-secondary absolute right-0 bottom-0 size-3.5 rounded-full border-2 border-white"
            aria-label="Online"
          />
        )}
      </div>
      <div className="min-w-0 flex-1 text-left">
        <p className="text-ink truncate text-sm font-semibold">
          <Link href={`/riders/${rider.username}`} className="after:absolute after:inset-0">
            {rider.name}
          </Link>
        </p>
        <p className="text-muted truncate text-xs">
          {rider.city}
          {rider.bike && ` · ${rider.bike}`}
        </p>
        <div className="mt-1.5 flex flex-wrap gap-1">
          {rider.styles.map((s) => (
            <span
              key={s}
              className="bg-secondary-tint text-secondary rounded-full px-2 py-0.5 text-[11px] font-semibold"
            >
              {s}
            </span>
          ))}
        </div>
        <p className="text-muted mt-1.5 truncate text-xs">
          <span className="text-ink font-bold">{rider.ridesCount} rides</span> ·{" "}
          {formatKm(rider.totalKm)}
        </p>
      </div>
    </li>
  );
}
