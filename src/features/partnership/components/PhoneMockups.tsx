import {
  Bell,
  Camera,
  CalendarDays,
  ChevronLeft,
  Clock,
  Disc3,
  HardHat,
  Heart,
  Home,
  MapPin,
  MessageCircle,
  Search,
  Shirt,
  Users,
} from "lucide-react";
import type { ReactNode } from "react";
import { SmartImage } from "@/components/shared/SmartImage";
import { IndiaRideMap } from "@/features/riders/components/profile/IndiaRideMap";
import { cn } from "@/lib/utils";

/*
 * Illustrative app screens for advertisers. Ad slots read "Your Brand" on purpose:
 * they show where a partner's brand appears, not an existing sponsorship.
 */

const img = (id: string, w = 500) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=70&auto=format&fit=crop`;

export function PhoneFrame({
  children,
  className,
  dark = false,
}: {
  children: ReactNode;
  className?: string;
  dark?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-[34px] bg-[#0b0c0e] p-[6px] shadow-[0_24px_60px_rgba(17,20,24,0.35)] ring-1 ring-white/10",
        className,
      )}
      aria-hidden
    >
      <div
        className={cn(
          "relative aspect-[9/16.5] overflow-hidden rounded-[28px] text-[9px]",
          dark ? "bg-deep text-white" : "text-ink bg-white",
        )}
      >
        {/* Notch */}
        <div className="absolute top-0 left-1/2 z-10 h-4 w-20 -translate-x-1/2 rounded-b-xl bg-[#0b0c0e]" />
        <div className="flex items-center justify-between px-4 pt-1.5 text-[8px] font-semibold">
          <span>9:41</span>
          <span>●●● ▮</span>
        </div>
        {children}
      </div>
    </div>
  );
}

function Wordmark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "font-display block text-center leading-[0.85] font-extrabold uppercase",
        className,
      )}
    >
      <span className="text-secondary block">The</span>
      <span className="text-secondary block">Good</span>
      <span className="text-primary block">Biker</span>
    </span>
  );
}

function TabBar() {
  return (
    <div className="border-border text-muted absolute inset-x-0 bottom-0 flex justify-around border-t bg-white px-2 pt-1.5 pb-3 text-[7px]">
      {[
        { icon: Home, label: "Home", active: true },
        { icon: MapPin, label: "Rides" },
        { icon: Users, label: "Clubs" },
        { icon: Shirt, label: "Garage" },
        { icon: Users, label: "Profile" },
      ].map(({ icon: Icon, label, active }) => (
        <span
          key={label}
          className={cn("flex flex-col items-center gap-0.5", active && "text-primary")}
        >
          <Icon className="size-3" />
          {label}
        </span>
      ))}
    </div>
  );
}

/** Ride summary with route map (hero, back phone). */
export function RideMapScreen() {
  return (
    <div className="px-3 pt-3">
      <div className="flex items-center justify-between">
        <ChevronLeft className="size-3.5" />
        <span className="text-[13px] font-bold">57.3 km</span>
        <span className="size-3.5" />
      </div>
      <IndiaRideMap className="mx-auto mt-2 w-[88%]" />
      <div className="mt-2 grid grid-cols-3 gap-1 text-center">
        {[
          ["3.1", "Hours"],
          ["64", "Avg Speed"],
          ["12", "Stops"],
        ].map(([v, l]) => (
          <div key={l}>
            <p className="text-[12px] font-bold">{v}</p>
            <p className="text-[7px] text-white/60">{l}</p>
          </div>
        ))}
      </div>
      <div className="bg-primary mx-auto mt-3 w-3/4 rounded-full py-1.5 text-center text-[9px] font-bold">
        Start Ride
      </div>
    </div>
  );
}

/** Community feed (hero, front phone). */
export function FeedScreen() {
  return (
    <>
      <div className="px-3 pt-2">
        <Wordmark className="text-[13px]" />
        <div className="border-border mt-2 flex justify-around border-b pb-1 text-[8px] font-semibold">
          <span className="text-primary border-primary -mb-[5px] border-b-2 pb-1">Community</span>
          <span className="text-muted">Rides</span>
          <span className="text-muted">Events</span>
        </div>
        <div className="mt-2 flex items-center gap-1.5">
          <span className="bg-deep text-primary grid size-5 place-items-center rounded-full text-[6px] font-bold">
            BB
          </span>
          <div>
            <p className="text-[8px] font-bold">Bangalore Bikers Club</p>
            <p className="text-muted text-[7px]">2 hours ago</p>
          </div>
        </div>
        <div className="relative mt-2 h-24 overflow-hidden rounded-lg">
          <SmartImage
            src={img("1758090524309-199d4588e225")}
            alt=""
            fill
            sizes="200px"
            className="object-cover"
          />
        </div>
        <p className="mt-1.5 text-[8px] font-bold">Sunrise ride to Nandi Hills</p>
        <p className="text-muted text-[7px]">Epic roads, amazing company! #DoTheRideThing</p>
        <p className="text-muted mt-1.5 flex gap-3 text-[7px]">
          <span className="inline-flex items-center gap-0.5">
            <Heart className="fill-primary text-primary size-2.5" /> 128
          </span>
          <span className="inline-flex items-center gap-0.5">
            <MessageCircle className="size-2.5" /> 12
          </span>
        </p>
      </div>
      <TabBar />
    </>
  );
}

/** Home screen with a banner slot. */
export function HomeBannerScreen() {
  return (
    <>
      <div className="px-3 pt-2">
        <div className="flex items-center justify-between">
          <span className="size-3" />
          <Wordmark className="text-[12px]" />
          <Bell className="size-3" />
        </div>
        <div className="bg-deep relative mt-2 h-20 overflow-hidden rounded-lg">
          <SmartImage
            src={img("1621958776520-ed4c553222f3")}
            alt=""
            fill
            sizes="200px"
            className="object-cover opacity-50"
          />
          <div className="relative p-2 text-white">
            <p className="text-[7px] font-semibold uppercase">Ride with</p>
            <p className="font-display text-primary text-[16px] leading-none font-extrabold uppercase italic">
              Your Brand
            </p>
            <span className="bg-primary mt-1.5 inline-block rounded px-1.5 py-0.5 text-[6px] font-bold">
              Shop now
            </span>
          </div>
        </div>
        <div className="mt-2 grid grid-cols-4 gap-1 text-center text-[6px]">
          {[
            [MapPin, "Record Ride"],
            [Search, "Find Rides"],
            [Users, "Clubs"],
            [CalendarDays, "Events"],
          ].map(([Icon, l]) => {
            const I = Icon as typeof MapPin;
            return (
              <span key={l as string} className="flex flex-col items-center gap-0.5">
                <span className="bg-primary-tint text-primary grid size-5 place-items-center rounded-full">
                  <I className="size-2.5" />
                </span>
                {l as string}
              </span>
            );
          })}
        </div>
        <p className="mt-2.5 text-[9px] font-bold">Upcoming Rides</p>
        <div className="border-border mt-1 flex gap-1.5 rounded-lg border p-1">
          <span className="relative h-10 w-12 shrink-0 overflow-hidden rounded">
            <SmartImage
              src={img("1700891591563-5327de496cfd", 200)}
              alt=""
              fill
              sizes="48px"
              className="object-cover"
            />
          </span>
          <div className="min-w-0">
            <p className="truncate text-[8px] font-bold">Nandi Hills Sunrise Ride</p>
            <p className="text-muted text-[6px]">Bangalore Bikers • 78 km</p>
            <p className="text-primary mt-0.5 text-[6px] font-semibold">+18 riders going</p>
          </div>
        </div>
      </div>
      <TabBar />
    </>
  );
}

/** Event page with a sponsor strip. */
export function SponsoredEventScreen() {
  return (
    <>
      <div className="px-3 pt-2">
        <div className="flex items-center justify-between">
          <ChevronLeft className="text-primary size-3" />
          <span className="text-muted text-[8px]">Event</span>
          <Search className="size-3" />
        </div>
        <div className="relative mt-2 h-24 overflow-hidden rounded-lg">
          <SmartImage
            src={img("1618805714320-f8825019c1be")}
            alt=""
            fill
            sizes="200px"
            className="object-cover"
          />
          <span className="absolute top-1.5 left-1.5 overflow-hidden rounded bg-white text-center">
            <span className="bg-primary block px-1.5 text-[6px] font-bold text-white">NOV</span>
            <span className="font-display block text-[11px] leading-tight font-bold">22</span>
          </span>
        </div>
        <p className="mt-2 text-[9px] font-bold">Nandi Hills Sunrise Ride</p>
        <p className="text-muted mt-0.5 text-[7px]">Bangalore Bikers</p>
        <p className="text-muted mt-1 flex gap-2 text-[7px]">
          <span className="inline-flex items-center gap-0.5">
            <MapPin className="size-2.5" /> 78 km
          </span>
          <span className="inline-flex items-center gap-0.5">
            <Clock className="size-2.5" /> 5:30 AM
          </span>
        </p>
        <div className="bg-deep mt-2.5 flex items-center justify-between rounded-md px-2 py-1.5">
          <span className="font-display text-primary text-[12px] font-extrabold uppercase italic">
            Your Brand
          </span>
          <span className="text-[6px] font-semibold text-white uppercase">Ride prepared.</span>
        </div>
        <div className="bg-primary mt-2.5 rounded-md py-1.5 text-center text-[8px] font-bold text-white">
          Join Ride
        </div>
      </div>
      <TabBar />
    </>
  );
}

/** Marketplace with promoted products. */
export function MarketplaceScreen() {
  return (
    <div className="px-3 pt-2">
      <div className="flex items-center justify-between">
        <p className="text-[11px] font-bold">Marketplace</p>
        <Search className="size-3" />
      </div>
      <div className="text-muted mt-1.5 flex gap-2 text-[7px]">
        <span className="text-primary border-primary border-b font-semibold">Featured</span>
        <span>Helmets</span>
        <span>Gear</span>
        <span>Accessories</span>
      </div>
      <div className="mt-2 grid grid-cols-2 gap-1.5">
        {[
          [HardHat, "Helmets", "Ride with confidence"],
          [Shirt, "Jackets", "Built for every ride"],
          [Disc3, "Tyres", "Grip the journey"],
          [Camera, "Cameras", "Capture your ride"],
        ].map(([Icon, item, line]) => {
          const I = Icon as typeof HardHat;
          return (
            <div key={item as string} className="border-border rounded-md border p-1.5 text-center">
              <span className="bg-page mx-auto grid h-10 place-items-center rounded">
                <I className="size-5" strokeWidth={1.4} />
              </span>
              <p className="mt-1 text-[7px] font-bold">Your Brand {item as string}</p>
              <p className="text-muted text-[6px]">{line as string}</p>
              <span className="border-border mt-1 inline-block rounded border px-1.5 text-[6px] font-semibold">
                View
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
