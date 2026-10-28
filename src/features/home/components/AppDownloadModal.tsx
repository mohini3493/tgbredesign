"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  BatteryFull,
  Bell,
  CalendarDays,
  MapPin,
  Route,
  SignalHigh,
  Users,
  UsersRound,
  Warehouse,
  Wifi,
  X,
} from "lucide-react";
import { useEffect, useRef, type SVGProps } from "react";
import { SmartImage } from "@/components/shared/SmartImage";
import { StoreBadges } from "@/components/shared/StoreBadges";
import { appPromptImage, siteConfig } from "@/config/site";
import { QrCode } from "./QrCode";

const exploreImage =
  "https://images.unsplash.com/photo-1653844573020-71f77a0ccb8c?w=600&q=70&auto=format&fit=crop";
const rideImage =
  "https://images.unsplash.com/photo-1618805714320-f8825019c1be?w=600&q=70&auto=format&fit=crop";
const trailImage =
  "https://images.unsplash.com/photo-1670644654521-6fbfffeaba87?w=600&q=70&auto=format&fit=crop";

const features = [
  { icon: Route, title: "Discover", text: "Trails" },
  { icon: Users, title: "Join", text: "Rides & Clubs" },
  { icon: CalendarStarIcon, title: "Find", text: "Events" },
  { icon: HelmetIcon, title: "Track", text: "Your Rides" },
  { icon: Warehouse, title: "Manage", text: "Your Garage" },
  { icon: UsersRound, title: "Be Part of", text: "the Community" },
];

/**
 * "Take the ride further" — full-screen app download prompt.
 * Escape, the close button or a backdrop click dismiss it; body scroll is locked while open.
 */
export function AppDownloadModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const reduce = useReducedMotion();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
      previous?.focus();
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/55 p-3 backdrop-blur-md sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="app-prompt-title"
            aria-describedby="app-prompt-desc"
            className="relative isolate max-h-[94dvh] w-full max-w-[1350px] overflow-y-auto overflow-x-hidden rounded-[28px] bg-deep shadow-[0_40px_120px_rgba(0,0,0,0.55)] ring-1 ring-white/15 lg:h-[min(875px,94dvh)] lg:overflow-hidden"
            initial={reduce ? false : { opacity: 0, y: 32, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.2, 0.7, 0.2, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <Backdrop />

            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute top-4 right-4 z-30 grid size-12 place-items-center rounded-full bg-[#5b6068]/85 text-white backdrop-blur transition hover:bg-[#5b6068] md:top-5 md:right-5 md:size-[50px]"
            >
              <X className="size-7" strokeWidth={2.5} aria-hidden />
            </button>

            <PhoneMockup />
            <ScriptTagline />

            <div className="relative z-10 flex h-full flex-col px-6 pt-10 pb-6 sm:px-10 lg:w-[58%] lg:px-[54px] lg:pt-10 lg:pb-10">
              <Wordmark className="text-[26px] lg:text-[32px]" />

              <h2
                id="app-prompt-title"
                className="font-display mt-6 text-[56px] leading-[0.88] font-extrabold tracking-tight text-white uppercase sm:text-7xl lg:mt-8 lg:text-[86px]"
              >
                Take the
                <br />
                <span className="text-primary">Ride further</span>.
              </h2>
              <p
                id="app-prompt-desc"
                className="mt-4 max-w-[520px] text-base leading-snug text-white/90 sm:text-lg lg:text-[22px] lg:leading-[1.38]"
              >
                Download The Good Biker app and get access to trails, rides, clubs, events, a
                digital garage and a community of riders across India.
              </p>

              <ul className="mt-7 grid max-w-[640px] grid-cols-2 sm:grid-cols-3 lg:mt-8">
                {features.map(({ icon: Icon, title, text }, i) => (
                  <li
                    key={title}
                    className={[
                      "flex items-center gap-3 py-3.5 pr-3 sm:gap-4 sm:pl-0",
                      i % 3 !== 0 ? "sm:border-l sm:border-white/15 sm:pl-6" : "",
                      i < 3 ? "sm:border-b sm:border-white/15" : "",
                    ].join(" ")}
                  >
                    <Icon className="text-primary size-8 shrink-0 sm:size-9" strokeWidth={1.75} aria-hidden />
                    <span className="text-sm leading-tight text-white sm:text-[15px]">
                      <span className="block font-semibold">{title}</span>
                      {text}
                    </span>
                  </li>
                ))}
              </ul>

              <DownloadCard />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Backdrop() {
  return (
    <div className="absolute inset-0 -z-10" aria-hidden>
      {/* Wider than the modal and anchored left so the rider sits at the bottom-right corner */}
      <div className="absolute inset-y-0 left-0 -right-[26%]">
        <SmartImage src={appPromptImage} alt="" fill sizes="1700px" className="object-cover object-bottom" />
      </div>
      {/* Golden-hour wash */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_88%_12%,rgba(255,196,120,0.95),rgba(255,119,35,0.45)_45%,transparent_75%)] mix-blend-soft-light" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,150,70,0.38)_0%,rgba(120,60,30,0.22)_45%,rgba(15,10,8,0.55)_100%)]" />
      {/* Copy spans the full width on small screens */}
      <div className="absolute inset-0 bg-[#050506]/70 lg:hidden" />
      {/* Dark left side for the copy */}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,#050506_0%,rgba(5,5,6,0.94)_32%,rgba(5,5,6,0.6)_52%,rgba(5,5,6,0)_72%)]" />
      {/* Bright fade behind the download card */}
      <div className="absolute inset-x-0 bottom-0 h-[44%] bg-linear-to-t from-white via-white/80 to-transparent [mask-image:linear-gradient(90deg,#000_45%,transparent_62%)] max-lg:hidden" />
    </div>
  );
}

function Wordmark({ className, tone = "dark" }: { className?: string; tone?: "dark" | "light" }) {
  const top = tone === "dark" ? "text-white" : "text-secondary";
  return (
    <p className={`font-display leading-[0.82] font-extrabold tracking-tight uppercase ${className ?? ""}`}>
      <span className={`block ${top}`}>The</span>
      <span className={`block ${top}`}>Good</span>
      <span className="text-primary block">Biker</span>
    </p>
  );
}

function DownloadCard() {
  return (
    <div className="mt-6 flex w-full max-w-[562px] flex-col gap-5 rounded-[20px] bg-white/95 p-4 shadow-[0_18px_50px_rgba(17,20,24,0.14)] sm:flex-row sm:items-center sm:gap-0 lg:mt-auto">
      <div className="relative mx-auto shrink-0 rounded-2xl bg-white p-3 shadow-[0_6px_20px_rgba(17,20,24,0.1)] sm:mx-0">
        <QrCode value={`${siteConfig.url}${siteConfig.appLinks.download}`} size={160} level="H" />
        <span className="font-display text-primary absolute top-1/2 left-1/2 grid size-[52px] -translate-1/2 place-items-center rounded-xl bg-white text-2xl font-extrabold">
          TGB
        </span>
      </div>
      <div className="mx-9 hidden h-[150px] w-px bg-border sm:block" />
      <div className="text-center sm:text-left">
        <p className="text-ink text-lg font-bold tracking-wide uppercase">Scan to download</p>
        <p className="text-body mt-1 text-[15px]">Get The Good Biker app now.</p>
        <StoreBadges className="mt-3 flex-col items-center sm:items-start" />
      </div>
    </div>
  );
}

function ScriptTagline() {
  return (
    <div
      className="font-script absolute top-[29%] right-[3%] z-10 hidden -rotate-[14deg] text-[46px] leading-[1.05] text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)] lg:block"
      aria-hidden
    >
      <p>Do</p>
      <p className="-mt-1 pl-1">The Ride</p>
      <p className="-mt-1 pl-8">Thing.</p>
      <svg viewBox="0 0 120 16" className="-mt-1 ml-6 h-4 w-[110px]" fill="none">
        <path d="M3 13C35 6 75 3 117 3" stroke="#ff7723" strokeWidth="5" strokeLinecap="round" />
      </svg>
    </div>
  );
}

function PhoneMockup() {
  return (
    <div
      className="pointer-events-none absolute top-[74px] left-[51.5%] z-10 hidden w-[372px] rotate-[9deg] lg:block"
      aria-hidden
    >
      {/* Titanium frame */}
      <div className="rounded-[60px] bg-[linear-gradient(135deg,#d8d9db_0%,#6f7276_18%,#2a2c30_45%,#8d9095_80%,#e4e5e7_100%)] p-[3px] shadow-[30px_40px_80px_rgba(0,0,0,0.55)]">
        <div className="rounded-[57px] bg-[#0b0c0e] p-[11px]">
          <div className="relative h-[900px] overflow-hidden rounded-[47px] bg-white">
            {/* Notch */}
            <div className="absolute top-0 left-1/2 z-10 h-[30px] w-[150px] -translate-x-1/2 rounded-b-[20px] bg-[#0b0c0e]">
              <span className="absolute top-[9px] left-[45px] h-[5px] w-[44px] rounded-full bg-[#1f2226]" />
              <span className="absolute top-[7px] right-[38px] size-[9px] rounded-full bg-[#1a2433] ring-2 ring-[#15171a]" />
            </div>

            <div className="flex items-center justify-between px-8 pt-3.5 text-[15px] font-semibold text-ink">
              <span>9:41</span>
              <span className="flex items-center gap-1">
                <SignalHigh className="size-4" strokeWidth={3} />
                <Wifi className="size-4" strokeWidth={2.5} />
                <BatteryFull className="size-5" strokeWidth={2} />
              </span>
            </div>

            <div className="relative mt-4 flex justify-center">
              <Wordmark tone="light" className="text-center text-[22px]" />
              <Bell className="absolute top-4 right-6 size-5 text-ink" strokeWidth={2} />
            </div>

            <div className="px-5">
              <p className="text-ink mt-3 text-lg leading-tight font-medium">
                Good morning,
                <br />
                <span className="text-[22px] font-bold">Rider!</span>
              </p>

              <div className="relative mt-3 h-[150px] overflow-hidden rounded-2xl">
                <SmartImage src={exploreImage} alt="" fill sizes="340px" className="object-cover" />
                <div className="absolute inset-0 bg-linear-to-r from-[#000]/55 to-transparent" />
                <p className="font-display absolute top-1/2 left-4 -translate-y-1/2 text-[26px] leading-[0.95] font-extrabold text-white italic uppercase">
                  Explore
                  <br />
                  Amazing trails
                </p>
                <span className="bg-primary absolute right-3 bottom-3 grid size-10 place-items-center rounded-full text-white">
                  <ArrowRight className="size-5" strokeWidth={2.5} />
                </span>
              </div>

              <div className="mt-3 grid grid-cols-4 gap-2">
                {[
                  { icon: MapPin, label: "Trails", color: "text-primary" },
                  { icon: Users, label: "Rides", color: "text-secondary" },
                  { icon: UsersRound, label: "Clubs", color: "text-secondary" },
                  { icon: CalendarStarIcon, label: "Events", color: "text-ink" },
                ].map(({ icon: Icon, label, color }) => (
                  <div
                    key={label}
                    className="flex h-[78px] flex-col items-center justify-center gap-2 rounded-xl bg-white shadow-[0_3px_12px_rgba(17,20,24,0.1)]"
                  >
                    <Icon className={`size-6 ${color}`} strokeWidth={1.75} />
                    <span className="text-ink text-[11px] font-medium">{label}</span>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex items-baseline justify-between">
                <p className="text-ink text-[17px] font-bold">Upcoming Rides</p>
                <span className="text-body text-xs">View All</span>
              </div>
              <div className="mt-2 overflow-hidden rounded-2xl bg-white shadow-[0_4px_16px_rgba(17,20,24,0.12)]">
                <div className="relative h-[118px]">
                  <SmartImage src={rideImage} alt="" fill sizes="340px" className="object-cover" />
                  <span className="absolute top-3 right-3 rounded-full bg-[#000]/60 px-2.5 py-1 text-[10px] font-bold tracking-wide text-white uppercase backdrop-blur">
                    Group ride
                  </span>
                </div>
                <div className="relative px-3.5 py-3">
                  <p className="text-ink text-[15px] font-bold">Mumbai to Goa Coastal Ride</p>
                  <p className="text-body mt-1 flex items-center gap-3 text-[11px]">
                    <span className="inline-flex items-center gap-1">
                      <CalendarDays className="size-3.5" /> 12 Nov 2026
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Users className="size-3.5" /> 42 riders
                    </span>
                  </p>
                  <span className="bg-primary absolute right-3.5 bottom-3 grid size-8 place-items-center rounded-full text-white">
                    <ArrowRight className="size-4" strokeWidth={2.5} />
                  </span>
                </div>
              </div>

              <div className="mt-4 flex items-baseline justify-between">
                <p className="text-ink text-[17px] font-bold">Featured Trails</p>
                <span className="text-primary text-xs font-medium">View All</span>
              </div>
              <div className="relative mt-2 h-[140px] overflow-hidden rounded-2xl">
                <SmartImage src={trailImage} alt="" fill sizes="340px" className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CalendarStarIcon(p: SVGProps<SVGSVGElement> & { strokeWidth?: number }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <rect x="3" y="4.5" width="18" height="16.5" rx="2" />
      <path d="M8 2.5v4M16 2.5v4M3 9.5h18" />
      <path d="m12 11.8 1.1 2.2 2.4.35-1.75 1.7.42 2.4L12 17.3l-2.17 1.15.42-2.4-1.75-1.7 2.4-.35Z" />
    </svg>
  );
}

function HelmetIcon(p: SVGProps<SVGSVGElement> & { strokeWidth?: number }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M21 14.5A9.5 9.5 0 0 0 3.2 9.6C2.4 11 2 12.6 2 14.3V17a2 2 0 0 0 2 2h9.5a7.5 7.5 0 0 0 7.5-4.5Z" />
      <path d="M21 13h-7.5a3 3 0 0 1-3-3V8.4" />
      <circle cx="7" cy="14.5" r="1.6" />
    </svg>
  );
}
