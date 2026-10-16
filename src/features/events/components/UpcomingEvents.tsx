import { Carousel } from "@/components/shared/Carousel";
import { EmptyState } from "@/components/shared/EmptyState";
import { Skeleton } from "@/components/ui/skeleton";
import { eventsService } from "../services";
import { EventCard } from "./EventCard";

const slide = "w-[85%] shrink-0 snap-start sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]";

export async function UpcomingEvents() {
  const events = await eventsService.getUpcoming(6);
  if (events.length === 0) return <EmptyState title="No upcoming events" description="New events are added every week." />;

  return (
    <Carousel label="Upcoming events">
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
    <div className="flex gap-6 overflow-hidden">
      {Array.from({ length: 3 }, (_, i) => (
        <Skeleton key={i} className={`${slide} h-[420px]`} />
      ))}
    </div>
  );
}
