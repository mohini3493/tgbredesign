import Link from "next/link";
import { SmartImage } from "@/components/shared/SmartImage";
import { formatKm } from "@/lib/format";
import type { Rider } from "../schemas";

export function RiderRow({ rider }: { rider: Rider }) {
  return (
    <li className="group relative flex items-center gap-4 py-4">
      <div className="relative shrink-0">
        <div className="relative size-14 overflow-hidden rounded-full bg-secondary-tint">
          <SmartImage src={rider.avatar} alt="" fill sizes="56px" className="object-cover" />
        </div>
        {rider.isOnline && (
          <span className="absolute bottom-0.5 right-0.5 size-3.5 rounded-full border-2 border-white bg-secondary" aria-label="Online" />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate font-semibold text-ink">
          <Link href={`/riders/${rider.username}`} className="after:absolute after:inset-0">
            {rider.name}
          </Link>
        </p>
        <p className="truncate text-xs text-muted">
          {rider.city}
          {rider.bike && ` · ${rider.bike}`}
        </p>
        <div className="mt-1.5 flex flex-wrap gap-1">
          {rider.styles.map((s) => (
            <span key={s} className="rounded-full bg-secondary-tint px-2 py-0.5 text-[11px] font-semibold text-secondary">
              {s}
            </span>
          ))}
        </div>
      </div>
      <div className="hidden text-right sm:block">
        <p className="text-sm font-bold text-ink">{rider.ridesCount} rides</p>
        <p className="text-xs text-muted">{formatKm(rider.totalKm)}</p>
      </div>
      <Link
        href={`/riders/${rider.username}/connect`}
        className="relative z-10 rounded-btn px-3 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary-tint"
      >
        Connect
      </Link>
    </li>
  );
}
