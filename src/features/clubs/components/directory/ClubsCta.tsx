import { UsersRound } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { AppPromptZone } from "@/features/home/components/AppPrompt";

export function ClubsCta() {
  return (
    <section
      aria-labelledby="clubs-cta-title"
      className="bg-deep rounded-card relative isolate flex flex-col gap-6 overflow-hidden px-6 py-8 md:flex-row md:items-center md:justify-between md:px-10"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_0%_50%,rgba(255,119,35,0.18),transparent_55%)]" />
      <div className="flex items-center gap-5">
        <span className="grid size-16 shrink-0 place-items-center rounded-full border border-white/15 bg-white/5">
          <UsersRound className="text-primary size-8" strokeWidth={1.8} aria-hidden />
        </span>
        <div>
          <h2 id="clubs-cta-title" className="font-jakarta text-2xl leading-tight font-semibold text-white">
            Stronger together.
            <br />
            Better on two wheels.
          </h2>
          <p className="text-deep-text mt-2 max-w-[360px] text-sm">
            Join a club, attend rides, make memories and be part of something bigger.
          </p>
        </div>
      </div>
      {/* Rides and sign-up live in the app for now */}
      <AppPromptZone className="flex flex-wrap gap-3">
        <ButtonLink href="/rides" variant="outline-light" size="lg">
          Explore Rides
        </ButtonLink>
        <ButtonLink href="/download" size="lg">
          Join the Community
        </ButtonLink>
      </AppPromptZone>
    </section>
  );
}
