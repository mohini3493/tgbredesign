import { QrCode } from "./QrCode";
import { StoreBadges } from "@/components/shared/StoreBadges";
import { Container } from "@/components/layout/Container";
import { siteConfig } from "@/config/site";
import { Bike, CalendarDays, MessageCircle, Navigation, Users } from "lucide-react";

export function AppBanner() {
  return (
    <section aria-labelledby="app-title" className="py-12 md:py-20">
      <Container>
        <div className="bg-deep relative isolate overflow-hidden rounded-[24px] px-6 py-12 md:px-12 lg:px-16 lg:py-16">
          {/* Mountain silhouette */}
          <svg
            viewBox="0 0 1200 300"
            preserveAspectRatio="none"
            className="absolute inset-x-0 bottom-0 -z-10 h-2/3 w-full"
            aria-hidden
          >
            <path
              d="M0 300V180l120-70 90 50 140-120 130 110 90-60 160 120 110-80 150 90 110-60 100 50v110Z"
              fill="#4b98bf"
              opacity="0.12"
            />
            <path
              d="M0 300V230l160-60 120 40 160-90 140 90 120-40 170 70 130-50 200 60v80Z"
              fill="#4b98bf"
              opacity="0.1"
            />
          </svg>
          <div className="bg-primary/15 absolute -top-24 -right-24 -z-10 size-80 rounded-full blur-3xl" />

          <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
            <PhoneMockups />

            <div>
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
              <div className="mt-8 flex flex-wrap items-center gap-6">
                <StoreBadges />
                <div className="rounded-card hidden items-center gap-3 bg-white p-2.5 pr-4 sm:flex">
                  <QrCode value={`${siteConfig.url}${siteConfig.appLinks.download}`} size={72} />
                  <p className="text-ink text-xs leading-tight font-semibold">
                    Scan to
                    <br />
                    download
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function PhoneFrame({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`border-ink bg-ink w-[200px] rounded-[34px] border-[6px] p-1 shadow-[0_30px_60px_rgba(0,0,0,0.45)] md:w-[230px] ${className ?? ""}`}
    >
      <div className="bg-page relative h-[400px] overflow-hidden rounded-[26px] md:h-[460px]">
        <div className="bg-ink absolute top-2 left-1/2 z-10 h-5 w-20 -translate-x-1/2 rounded-full" />
        {children}
      </div>
    </div>
  );
}

function PhoneMockups() {
  return (
    <div
      className="relative mx-auto flex h-[440px] w-full max-w-[460px] items-center justify-center md:h-[500px]"
      aria-hidden
    >
      {/* Phone 1: live ride map */}
      <PhoneFrame className="absolute top-6 left-0 -rotate-6 sm:left-6">
        <div className="bg-secondary-tint absolute inset-0">
          <svg viewBox="0 0 220 460" className="h-full w-full">
            <defs>
              <pattern id="grid" width="22" height="22" patternUnits="userSpaceOnUse">
                <path d="M22 0H0V22" fill="none" stroke="#4b98bf" strokeOpacity="0.15" />
              </pattern>
            </defs>
            <rect width="220" height="460" fill="url(#grid)" />
            <path
              d="M-10 120 Q 60 90 110 140 T 230 120"
              stroke="#ffffff"
              strokeWidth="10"
              fill="none"
            />
            <path d="M60 -10 Q 90 200 40 470" stroke="#ffffff" strokeWidth="8" fill="none" />
            <path
              d="M40 380 C 70 300, 150 320, 140 240 S 90 150, 170 90"
              stroke="#ff7723"
              strokeWidth="5"
              fill="none"
              strokeLinecap="round"
            />
            <circle cx="40" cy="380" r="8" fill="#4b98bf" stroke="#fff" strokeWidth="3" />
            <circle cx="170" cy="90" r="9" fill="#ff7723" stroke="#fff" strokeWidth="3" />
          </svg>
        </div>
        <div className="shadow-card absolute inset-x-3 bottom-3 rounded-2xl bg-white p-3">
          <p className="text-primary text-[10px] font-bold tracking-wider uppercase">● Live ride</p>
          <p className="text-ink mt-1 text-sm font-bold">Nandi Hills sunrise</p>
          <div className="mt-2 grid grid-cols-3 gap-1 text-center">
            {[
              ["62", "km"],
              ["48", "km/h"],
              ["7", "riders"],
            ].map(([v, l]) => (
              <div key={l} className="bg-page rounded-lg py-1.5">
                <p className="text-ink text-sm font-bold">{v}</p>
                <p className="text-muted text-[9px]">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </PhoneFrame>

      {/* Phone 2: club feed */}
      <PhoneFrame className="absolute top-0 right-0 rotate-6 sm:right-6">
        <div className="px-3 pt-10">
          <p className="font-display text-ink text-xl font-bold uppercase">Club feed</p>
          <div className="mt-3 space-y-2.5">
            {[
              { n: "GearUpWheels", t: "Sunday ride to Coorg — 18 going", c: "bg-primary" },
              { n: "Touring Tribe", t: "Spiti expedition slots open", c: "bg-secondary" },
              { n: "Sin City Saints", t: "Night ride · Fri 10 PM", c: "bg-ink" },
            ].map((p) => (
              <div
                key={p.n}
                className="rounded-xl bg-white p-2.5 shadow-[0_2px_8px_rgba(17,20,24,0.06)]"
              >
                <div className="flex items-center gap-2">
                  <span className={`size-6 rounded-full ${p.c}`} />
                  <p className="text-ink text-[11px] font-bold">{p.n}</p>
                </div>
                <p className="text-body mt-1.5 text-[11px] leading-snug">{p.t}</p>
                <div className="mt-2 h-14 rounded-lg bg-[linear-gradient(135deg,#4b98bf,#0f1a22)]" />
              </div>
            ))}
          </div>
        </div>
        <div className="border-border absolute inset-x-0 bottom-0 flex justify-around border-t bg-white py-2.5">
          <Navigation className="text-muted size-4" />
          <Users className="text-primary size-4" />
          <MessageCircle className="text-muted size-4" />
          <Bike className="text-muted size-4" />
        </div>
      </PhoneFrame>
    </div>
  );
}
