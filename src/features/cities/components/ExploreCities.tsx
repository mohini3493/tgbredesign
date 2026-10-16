import { EmptyState } from "@/components/shared/EmptyState";
import { Skeleton } from "@/components/ui/skeleton";
import { citiesService } from "../services";
import { CityTile } from "./CityTile";

// Bento layout: 1st city 2x2, 2nd city 2x1, rest 1x1 (fills a 4x3 grid with 8 cities)
const grid = "grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4 lg:auto-rows-[200px]";

export async function ExploreCities() {
  const cities = await citiesService.getAll();
  if (cities.length === 0) return <EmptyState title="No cities yet" />;

  return (
    <div className={grid}>
      {cities.slice(0, 8).map((city, i) => (
        <CityTile
          key={city.id}
          city={city}
          size={i === 0 ? "lg" : i === 1 ? "md" : "sm"}
          className={i === 0 ? "col-span-2 min-h-72 lg:row-span-2" : i === 1 ? "col-span-2" : undefined}
        />
      ))}
    </div>
  );
}

export function ExploreCitiesSkeleton() {
  return (
    <div className={grid}>
      <Skeleton className="col-span-2 h-72 lg:row-span-2 lg:h-auto" />
      <Skeleton className="col-span-2 h-44 lg:h-auto" />
      {Array.from({ length: 6 }, (_, i) => (
        <Skeleton key={i} className="h-44 lg:h-auto" />
      ))}
    </div>
  );
}
