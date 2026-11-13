"use client";

import { CalendarDays, Check, Globe, Megaphone, Smartphone, Trophy, type LucideIcon } from "lucide-react";
import { useState } from "react";
import { SmartImage } from "@/components/shared/SmartImage";
import { cn } from "@/lib/utils";
import type { Platform } from "../data";
import { HomeBannerScreen, MarketplaceScreen, PhoneFrame, SponsoredEventScreen } from "./PhoneMockups";

const tabIcons: Record<string, LucideIcon> = {
  app: Smartphone,
  website: Globe,
  events: CalendarDays,
  racing: Trophy,
  content: Megaphone,
};

const appScreens = [
  { label: "Home Screen Banner", screen: <HomeBannerScreen /> },
  { label: "Sponsored Event", screen: <SponsoredEventScreen /> },
  { label: "Marketplace Promotion", screen: <MarketplaceScreen /> },
];

/** "Our platforms" switcher: each tab shows that placement's pitch and a preview. */
export function PlatformTabs({ platforms }: { platforms: Platform[] }) {
  const [activeId, setActiveId] = useState(platforms[0].id);
  const active = platforms.find((p) => p.id === activeId) ?? platforms[0];

  return (
    <>
      <div role="tablist" aria-label="Advertising platforms" className="no-scrollbar -mx-4 mt-8 flex gap-3 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0">
        {platforms.map((p) => {
          const Icon = tabIcons[p.id] ?? Megaphone;
          const selected = p.id === active.id;
          return (
            <button
              key={p.id}
              type="button"
              role="tab"
              id={`platform-tab-${p.id}`}
              aria-selected={selected}
              aria-controls="platform-panel"
              onClick={() => setActiveId(p.id)}
              className={cn(
                "rounded-btn inline-flex h-12 shrink-0 items-center gap-2 border px-5 text-sm font-semibold transition-colors",
                selected ? "bg-primary border-primary text-white" : "border-border text-ink hover:border-primary hover:text-primary bg-white",
              )}
            >
              <Icon className="size-4" aria-hidden /> {p.tab}
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id="platform-panel"
        aria-labelledby={`platform-tab-${active.id}`}
        className="mt-12 grid items-center gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,2fr)]"
      >
        <div key={active.id} className="animate-fade-up">
          <p className="text-primary text-xs font-bold tracking-[0.18em] uppercase">{active.eyebrow}</p>
          <h3 className="font-jakarta text-ink mt-3 text-2xl leading-tight font-semibold md:text-3xl">{active.title}</h3>
          <p className="mt-4 text-sm leading-relaxed md:text-base">{active.text}</p>
          <ul className="mt-6 space-y-3">
            {active.points.map((pt) => (
              <li key={pt} className="text-ink flex items-center gap-3 text-sm">
                <span className="bg-primary grid size-5 shrink-0 place-items-center rounded-full text-white">
                  <Check className="size-3" strokeWidth={3} aria-hidden />
                </span>
                {pt}
              </li>
            ))}
          </ul>
        </div>

        {active.image ? (
          <div key={`${active.id}-img`} className="rounded-card animate-fade-up relative aspect-[16/9] overflow-hidden">
            <SmartImage src={active.image.src} alt={active.image.alt} fill sizes="(min-width: 1024px) 60vw, 100vw" className="object-cover" />
          </div>
        ) : (
          // Swipeable row on phones, three columns from sm up
          <ul className="animate-fade-up no-scrollbar -mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-3 sm:gap-6 sm:overflow-visible sm:px-0" aria-label="App placements">
            {appScreens.map(({ label, screen }) => (
              <li key={label} className="w-[220px] shrink-0 snap-center sm:mx-auto sm:w-full sm:max-w-[250px]">
                <PhoneFrame>{screen}</PhoneFrame>
                <p className="text-ink mt-4 text-center text-sm font-semibold">{label}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
