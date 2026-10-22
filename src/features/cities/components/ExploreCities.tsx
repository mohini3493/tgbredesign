import { Carousel } from "@/components/shared/Carousel";
import { EmptyState } from "@/components/shared/EmptyState";
import { Skeleton } from "@/components/ui/skeleton";
import { citiesService } from "../services";
import { CityTile } from "./CityTile";

// 6 visible on desktop, 3 on tablet, ~2 on mobile (gap: 16px mobile, 24px md+)
const slide = "w-[45%] shrink-0 snap-start sm:w-[calc(33.333%-16px)] lg:w-[calc(16.666%-20px)]";

export async function ExploreCities() {
  const cities = await citiesService.getAll();
  if (cities.length === 0) return <EmptyState title="No cities yet" />;

  return (
    <Carousel label="Explore by city" autoplay={3000}>
      {cities.map((city) => (
        <div key={city.id} className={slide}>
          <CityTile city={city} className="h-56 md:h-64" />
        </div>
      ))}
    </Carousel>
  );
}

export function ExploreCitiesSkeleton() {
  return (
    <div className="flex gap-4 overflow-hidden md:gap-6">
      {Array.from({ length: 6 }, (_, i) => (
        <Skeleton key={i} className={`${slide} h-56 md:h-64`} />
      ))}
    </div>
  );
}
