import { EmptyState } from "@/components/shared/EmptyState";
import { Skeleton } from "@/components/ui/skeleton";
import { routesService } from "../services";
import { RouteCard } from "./RouteCard";

const grid = "grid gap-4 md:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2 md:gap-6";

export async function PopularRoutes() {
  const routes = await routesService.getPopular(5);
  if (routes.length === 0) return <EmptyState title="No routes yet" description="Check back soon." />;
  const [featured, ...rest] = routes;

  return (
    <div className={grid}>
      <RouteCard route={featured} featured className="md:col-span-2 lg:row-span-2" />
      {rest.map((r) => (
        <RouteCard key={r.id} route={r} />
      ))}
    </div>
  );
}

export function PopularRoutesSkeleton() {
  return (
    <div className={grid}>
      <Skeleton className="h-[420px] md:col-span-2 lg:row-span-2 lg:h-auto" />
      {Array.from({ length: 4 }, (_, i) => (
        <Skeleton key={i} className="h-64" />
      ))}
    </div>
  );
}
