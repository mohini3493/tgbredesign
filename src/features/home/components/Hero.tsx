"use client";

import Link from "next/link";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import type { MouseEvent } from "react";
import { heroImage, heroVideo, siteConfig, socialLinks } from "@/config/site";
import { Container } from "@/components/layout/Container";
import { SmartImage } from "@/components/shared/SmartImage";
import { MotorcycleIcon } from "@/components/shared/MotorcycleIcon";
import { socialIconMap } from "@/components/shared/BrandIcons";
import { HeroRoad } from "./HeroRoad";
import { HeroLiveCards } from "./HeroLiveCards";
import { RotatingWord } from "./RotatingWord";
import { WindStreaks } from "./WindStreaks";

const DESTINATIONS = ["Together.", "Ladakh.", "Spiti.", "Coorg.", "Tawang.", "Further."];

const ease = "easeOut" as const;
const enter = (delay: number, y = 16) => ({
  initial: { opacity: 0, y },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease },
});

/**
 * Full-screen hero: cinematic background, content anchored top-left,
 * trust pill → headline → copy → CTAs, socials pinned bottom-left.
 * Accents use brand colors only (#ff7723, #4b98bf).
 */
export function Hero() {
  const reduce = useReducedMotion();

  // Cursor parallax (-0.5 … 0.5), smoothed with a spring
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const mx = useSpring(rawX, { stiffness: 60, damping: 20 });
  const my = useSpring(rawY, { stiffness: 60, damping: 20 });
  const bgX = useTransform(mx, (v) => v * -24);
  const bgY = useTransform(my, (v) => v * -16);
  const roadX = useTransform(mx, (v) => v * 30);
  const glowX = useTransform(mx, (v) => v * 60);

  const onMove = (e: MouseEvent<HTMLElement>) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    rawX.set((e.clientX - r.left) / r.width - 0.5);
    rawY.set((e.clientY - r.top) / r.height - 0.5);
  };

  return (
    <section
      aria-labelledby="hero-title"
      onMouseMove={onMove}
      className="bg-deep relative h-svh min-h-[680px] w-full overflow-hidden"
    >
      {/* Background with slow Ken Burns drift + cursor parallax */}
      <motion.div style={{ x: bgX, y: bgY }} className="absolute -inset-8">
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.12 }}
          animate={reduce ? { scale: 1.05 } : { scale: [1.05, 1.16], x: [0, -30], y: [0, -12] }}
          transition={
            reduce
              ? { duration: 0 }
              : { duration: 24, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }
          }
        >
          {heroVideo ? (
            <video
              className="absolute inset-0 h-full w-full object-cover"
              src={heroVideo}
              poster={heroImage}
              autoPlay
              muted
              loop
              playsInline
              aria-hidden
            />
          ) : (
            <SmartImage
              src={heroImage}
              alt="Motorcycle rider crossing a high-altitude Ladakh plateau"
              fill
              priority
              sizes="100vw"
              className="object-cover object-[60%_55%]"
            />
          )}
        </motion.div>
      </motion.div>

      {/* Light overlays (kept subtle so the image stays vivid) */}
      <div className="absolute inset-0 bg-black/10" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.45)_0%,transparent_22%,transparent_60%,rgba(0,0,0,0.45)_100%)]" />
      {/* Strong left fade keeps the headline readable; extra tint on small screens where text sits over the rider */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,26,34,0.92)_0%,rgba(15,26,34,0.75)_30%,rgba(15,26,34,0.3)_52%,transparent_68%)]" />
      <div className="bg-deep/45 absolute inset-0 md:hidden" />
      {/* Brand glows */}
      <motion.div
        style={{ x: glowX }}
        animate={reduce ? undefined : { opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -top-[14%] left-[20%] h-[720px] w-[1000px] bg-[radial-gradient(ellipse_at_50%_30%,rgba(255,119,35,0.2)_0%,transparent_68%)]"
      />
      <motion.div
        animate={reduce ? undefined : { opacity: [1, 0.6, 1], scale: [1, 1.08, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -right-[10%] -bottom-[20%] h-[600px] w-[800px] bg-[radial-gradient(ellipse_at_center,rgba(75,152,191,0.25)_0%,transparent_65%)]"
      />

      <WindStreaks />

      {/* Animated route with a rider */}
      <motion.div
        style={{ x: roadX }}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
        className="pointer-events-none absolute right-0 bottom-0 h-[30%] w-full [mask-image:linear-gradient(to_right,transparent,black_22%)] md:h-[40%] md:w-[72%]"
      >
        <HeroRoad className="h-full w-full" />
      </motion.div>

      <HeroLiveCards mx={mx} my={my} />

      <Container className="relative z-10 flex h-full flex-col justify-start pt-[24vh]">
        {/* Trust pill */}
        <motion.div
          {...enter(0.1, 14)}
          className="inline-flex w-fit items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.06] py-1.5 pr-4 pl-1.5 backdrop-blur-md"
        >
          <div className="flex">
            {[
              "from-primary to-secondary",
              "from-secondary to-primary",
              "from-primary to-secondary",
            ].map((g, i) => (
              <span
                key={i}
                className={`border-deep/90 size-[22px] rounded-full border-2 bg-linear-135 ${g} ${i > 0 ? "-ml-2" : ""}`}
              />
            ))}
          </div>
          <span className="text-[12.5px] text-white/75">
            Trusted by <strong className="font-semibold text-white">10,000+ riders</strong> across
            India
          </span>
        </motion.div>

        <motion.h1
          id="hero-title"
          {...enter(0.25, 22)}
          className="font-jakarta mt-[22px] max-w-[620px] text-[clamp(2.4rem,4.6vw,4.1rem)] leading-[1.08] font-medium tracking-[-0.02em] text-white"
        >
          Ride Further.
          <br />
          Ride <RotatingWord words={DESTINATIONS} className="text-primary" />
        </motion.h1>

        <motion.p
          {...enter(0.42)}
          className="mt-4 max-w-[380px] text-[15px] leading-relaxed text-white/70"
        >
          Find riders, discover routes and join clubs — India&apos;s largest motorcycling ecosystem,
          in one app.
        </motion.p>

        <motion.div {...enter(0.58)} className="mt-[30px] flex items-center gap-3.5">
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link
              href={siteConfig.appLinks.download}
              className="bg-ink hover:border-primary inline-flex items-center rounded-full border border-white/15 px-[26px] py-3.5 text-sm font-semibold text-white transition-colors"
            >
              Download the App
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.93 }} className="relative">
            {!reduce && (
              <span className="border-primary/70 pointer-events-none absolute inset-0 animate-ping rounded-full border [animation-duration:2.4s]" />
            )}
            <Link
              href="/rides"
              aria-label="Explore rides"
              title="Explore rides"
              className="hover:border-primary hover:bg-primary grid size-12 place-items-center rounded-full border border-white/25 bg-white/12 text-white backdrop-blur-sm transition-colors"
            >
              <motion.span
                className="inline-flex"
                animate={reduce ? undefined : { x: [0, 2, 0, -1, 0], rotate: [0, -2, 0, 1, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              >
                <MotorcycleIcon className="size-7" />
              </motion.span>
            </Link>
          </motion.div>
        </motion.div>
      </Container>

      {/* Socials pinned bottom-left */}
      <Container className="absolute inset-x-0 bottom-[104px] z-10 md:bottom-[34px]">
        <motion.ul
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex gap-2.5"
          aria-label="TGB on social media"
        >
          {socialLinks.map((s) => {
            const Icon = socialIconMap[s.icon];
            return (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="hover:border-primary hover:text-primary grid size-[34px] place-items-center rounded-full border border-white/20 text-white/75 transition-colors"
                >
                  <Icon className="size-3.5" />
                </a>
              </li>
            );
          })}
        </motion.ul>
      </Container>
    </section>
  );
}
