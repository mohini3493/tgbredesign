import { Carousel } from "@/components/shared/Carousel";
import { EmptyState } from "@/components/shared/EmptyState";
import { Skeleton } from "@/components/ui/skeleton";
import { eventsService } from "../services";
import { EventCard } from "./EventCard";

// 6 visible on desktop, 3 on tablet, ~1.5 on mobile (gap: 16px mobile, 24px md+)
const slide = "w-[70%] shrink-0 snap-start sm:w-[calc(33.333%-16px)] lg:w-[calc(16.666%-20px)]";

export async function UpcomingEvents() {
  const events = await eventsService.getUpcoming(12);
  if (events.length === 0) return <EmptyState title="No upcoming events" description="New events are added every week." />;

  return (
    <Carousel label="Upcoming events" autoplay={3000}>
      {events.map((e) => (
        <div key={e.id} className={slide}>
          <EventCard event={e} />
        </div>
      ))}
    </Carousel>
  );
}

export function UpcomingEventsSkeleton() {
  return (
    <div className="flex gap-4 overflow-hidden md:gap-6">
      {Array.from({ length: 6 }, (_, i) => (
        <Skeleton key={i} className={`${slide} h-[340px]`} />
      ))}
    </div>
  );
}
