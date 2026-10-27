"use client";

import Link from "next/link";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import type { MouseEvent } from "react";
import { heroImage, heroTrustAvatars, heroVideo, siteConfig, socialLinks } from "@/config/site";
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
        {/* Zoom anchored at the rider so the Ken Burns drift doesn't push them toward the bottom */}
        <motion.div
          className="absolute inset-0"
          style={{ originX: 0.5, originY: 0.7 }}
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
              alt="Motorcycle rider on the open Leh–Manali highway below snow-capped Himalayan peaks"
              fill
              priority
              sizes="100vw"
              className="object-cover object-[50%_100%]"
            />
          )}
        </motion.div>
      </motion.div>

      {/* Light overlays: the photo is bright, so keep the shading minimal */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.3)_0%,transparent_18%,transparent_70%,rgba(0,0,0,0.3)_100%)]" />
      {/* Soft left fade keeps the white headline readable; extra tint on small screens where text sits over the photo */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,26,34,0.72)_0%,rgba(15,26,34,0.5)_30%,rgba(15,26,34,0.12)_50%,transparent_62%)]" />
      <div className="bg-deep/35 absolute inset-0 md:hidden" />
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

      <Container className="relative z-10 flex h-full flex-col justify-start pt-[22vh]">
        {/* Trust pill */}
        <motion.div
          {...enter(0.1, 14)}
          className="inline-flex w-fit items-center gap-3 rounded-full border border-white/15 bg-white/[0.06] py-2 pr-5 pl-2 backdrop-blur-md"
        >
          <div className="flex" aria-hidden>
            {heroTrustAvatars.map((src, i) => (
              <span
                key={src}
                className={`bg-secondary-tint relative size-8 overflow-hidden rounded-full border-2 border-white ${i > 0 ? "-ml-2.5" : ""}`}
              >
                <SmartImage src={src} alt="" fill sizes="32px" className="object-cover" />
              </span>
            ))}
          </div>
          <span className="text-sm text-white/75 md:text-[15px]">
            Trusted by <strong className="font-semibold text-white">10,000+ riders</strong> across
            India
          </span>
        </motion.div>

        <motion.h1
          id="hero-title"
          {...enter(0.25, 22)}
          className="font-jakarta mt-6 max-w-[860px] text-[clamp(2.75rem,6.2vw,5.75rem)] leading-[1.05] font-medium tracking-[-0.02em] text-white"
        >
          Ride Further.
          <br />
          Ride <RotatingWord words={DESTINATIONS} className="text-primary" />
        </motion.h1>

        <motion.p
          {...enter(0.42)}
          className="mt-5 max-w-[540px] text-base leading-relaxed text-white/75 md:text-xl"
        >
          Find riders, discover routes and join clubs — India&apos;s largest motorcycling ecosystem,
          in one app.
        </motion.p>

        <motion.div {...enter(0.58)} className="mt-9 flex items-center gap-4">
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link
              href={siteConfig.appLinks.download}
              className="bg-secondary hover:bg-primary hover:border-primary inline-flex items-center rounded-full border border-white/15 px-8 py-4 text-base font-semibold text-white transition-colors"
            >
              Download the App
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.93 }} className="relative">
            {!reduce && (
              <span className="border-secondary/70 pointer-events-none absolute inset-0 animate-ping rounded-full border [animation-duration:2.4s]" />
            )}
            <Link
              href="/rides"
              aria-label="Explore rides"
              title="Explore rides"
              className="hover:border-primary hover:bg-primary grid size-14 place-items-center rounded-full border border-white/25 bg-white/12 text-white backdrop-blur-sm transition-colors"
            >
              <motion.span
                className="inline-flex"
                animate={reduce ? undefined : { x: [0, 2, 0, -1, 0], rotate: [0, -2, 0, 1, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              >
                <MotorcycleIcon className="size-8" />
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
                  className="hover:border-primary text-primary grid size-[34px] place-items-center rounded-full border border-white/20 transition-colors"
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
