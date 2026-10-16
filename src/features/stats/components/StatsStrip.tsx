import { Bike, CalendarDays, Gauge, MapPin, Route, Users } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Skeleton } from "@/components/ui/skeleton";
import { statsService } from "../services";
import { CountUp } from "./CountUp";

export async function StatsStrip() {
  const s = await statsService.getHomeStats();
  const items = [
    { label: "Riders", value: s.riders, icon: Users, format: "compact" as const },
    { label: "Clubs", value: s.clubs, icon: Bike, format: "plain" as const },
    { label: "Routes", value: s.routes, icon: Route, format: "compact" as const },
    { label: "Events", value: s.events, icon: CalendarDays, format: "plain" as const },
    { label: "Cities", value: s.cities, icon: MapPin, format: "plain" as const },
    { label: "Km ridden", value: s.kmRidden, icon: Gauge, format: "compact" as const },
  ];

  return (
    <StatsShell>
      <dl className="grid grid-cols-3 gap-y-6 lg:grid-cols-6 lg:divide-x lg:divide-border">
        {items.map(({ label, value, icon: Icon, format }) => (
          <div key={label} className="flex flex-col items-center gap-1 px-2 text-center lg:flex-row lg:gap-3 lg:px-5 lg:text-left">
            <Icon className="size-6 shrink-0 text-secondary" strokeWidth={1.75} aria-hidden />
            <div className="flex flex-col-reverse">
              <dt className="mt-1 text-xs font-medium uppercase tracking-wide text-muted">{label}</dt>
              <dd className="font-display text-3xl font-bold leading-none text-ink md:text-4xl">
                <CountUp value={value} format={format} />
              </dd>
            </div>
          </div>
        ))}
      </dl>
    </StatsShell>
  );
}

function StatsShell({ children }: { children: React.ReactNode }) {
  return (
    <Container className="relative z-10 -mt-20 md:-mt-24">
      <div className="rounded-card border border-border bg-white px-4 py-6 shadow-card md:py-8">{children}</div>
    </Container>
  );
}

export function StatsStripSkeleton() {
  return (
    <StatsShell>
      <Skeleton className="h-16" />
    </StatsShell>
  );
}
