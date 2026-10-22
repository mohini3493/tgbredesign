import Link from "next/link";
import { SmartImage } from "@/components/shared/SmartImage";
import { formatCompact } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { City } from "../schemas";

export function CityTile({ city, size = "sm", className }: { city: City; size?: "lg" | "md" | "sm"; className?: string }) {
  return (
    <Link
      href={`/cities/${city.slug}`}
      className={cn(
        "group relative isolate flex min-h-44 flex-col justify-end overflow-hidden rounded-card bg-deep p-4 md:p-5",
        className,
      )}
    >
      <SmartImage
        src={city.image}
        alt={`${city.name} landmark`}
        fill
        sizes={size === "lg" ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 17vw, (min-width: 640px) 33vw, 45vw"}
        className="-z-10 object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(15,26,34,0)_30%,rgba(15,26,34,0.9)_100%)]" />
      <h3 className={cn("font-display font-bold uppercase leading-none text-white", size === "lg" ? "text-4xl md:text-5xl" : "text-2xl")}>
        {city.name}
      </h3>
      <p className="mt-1.5 text-xs font-medium text-deep-text md:text-sm">
        {formatCompact(city.ridersCount)} riders · {city.clubsCount} clubs
      </p>
      <span className="absolute bottom-0 left-0 h-1 w-0 bg-primary transition-all duration-300 group-hover:w-full" />
    </Link>
  );
}
