import { SmartImage } from "@/components/shared/SmartImage";
import { StoreBadges } from "@/components/shared/StoreBadges";
import { Container } from "@/components/layout/Container";
import { appBannerImage } from "@/config/site";
import { cn } from "@/lib/utils";
import { Bike, CalendarDays, Navigation, Users } from "lucide-react";

export function AppBanner({ className }: { className?: string }) {
  return (
    <section aria-labelledby="app-title" className={cn("py-12 md:py-20", className)}>
      <Container>
        <div className="bg-deep relative isolate overflow-hidden rounded-[24px] px-6 py-12 md:px-12 lg:px-16 lg:py-16">
          {/* Group ride backdrop; heavier on the right so the copy stays readable */}
          <SmartImage
            src={appBannerImage}
            alt=""
            fill
            sizes="(min-width: 1620px) 1560px, 100vw"
            className="-z-20 object-cover object-[50%_55%]"
          />
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(8,9,11,0.6)_0%,rgba(8,9,11,0.45)_42%,rgba(8,9,11,0.82)_60%,rgba(8,9,11,0.88)_100%)]" />
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_120%,rgba(255,119,35,0.18),transparent_60%)]" />

          <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
            <AppScreensShowcase />

            <div className="lg:pl-16 xl:pl-24">
              <p className="text-primary text-xs font-bold tracking-[0.18em] uppercase">
                TGB Mobile App
              </p>
              <h2
                id="app-title"
                className="font-display mt-3 text-5xl leading-[0.95] font-extrabold text-white uppercase md:text-6xl"
              >
                Take the ride
                <br />
                with you
              </h2>
              <p className="text-deep-text mt-5 max-w-md text-base leading-relaxed">
                Track rides live, join clubs, message riders and access the entire TGB ecosystem —
                only on the app.
              </p>
              <ul className="mt-6 grid max-w-md grid-cols-2 gap-3 text-sm text-white">
                {[
                  { icon: Navigation, label: "Live ride tracking" },
                  { icon: Users, label: "Club feeds & chat" },
                  { icon: CalendarDays, label: "Event tickets" },
                  { icon: Bike, label: "Digital garage" },
                ].map(({ icon: Icon, label }) => (
                  <li key={label} className="flex items-center gap-2">
                    <Icon className="text-primary size-4" aria-hidden /> {label}
                  </li>
                ))}
              </ul>
              <StoreBadges className="mt-8" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/**
 * App screens, large and tilted, bleeding off the banner's top, bottom and left edges.
 * On lg the panel spans the banner's left half (positioned against the banner, not the grid cell).
 */
function AppScreensShowcase() {
  return (
    <div className="relative -mx-6 -mt-12 h-[440px] sm:h-[540px] md:-mx-12 lg:static lg:m-0 lg:h-[560px]">
      <div className="absolute inset-0 overflow-hidden [mask-image:linear-gradient(180deg,#000_75%,transparent)] lg:right-auto lg:w-[47%] lg:[mask-image:linear-gradient(90deg,#000_85%,transparent)]">
        <SmartImage
          src="/images/app/app-screens.png"
          alt="TGB app screens: home, bike brands, login and rider feed"
          width={1087}
          height={1505}
          sizes="(min-width: 1024px) 1000px, 130vw"
          className="absolute top-1/2 left-1/2 h-auto w-[105%] max-w-none -translate-x-1/2 -translate-y-1/2 -rotate-[20deg] drop-shadow-[0_30px_50px_rgba(0,0,0,0.55)] lg:left-[52%] lg:w-[98%]"
        />
      </div>
    </div>
  );
}
