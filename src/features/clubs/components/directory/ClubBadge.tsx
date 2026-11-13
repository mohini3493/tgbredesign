import { SmartImage } from "@/components/shared/SmartImage";
import { cn } from "@/lib/utils";
import type { Club } from "../../schemas";

/**
 * Round club crest: the club's logo, or a type-set badge of its name
 * (last word in brand orange) for clubs that haven't uploaded one.
 */
/** `large` scales the type-set name up for hero-sized badges. */
export function ClubBadge({
  club,
  large = false,
  className,
}: {
  club: Pick<Club, "name" | "logo">;
  large?: boolean;
  className?: string;
}) {
  const words = club.name.split(/\s+/);
  // Long words ("BANGALORE") step down a size so they stay inside the circle
  const longest = Math.max(...words.map((w) => w.length));
  return (
    <span
      className={cn(
        "bg-deep shadow-card relative grid shrink-0 place-items-center overflow-hidden rounded-full border-4 border-white",
        className,
      )}
    >
      {club.logo ? (
        <SmartImage src={club.logo} alt={`${club.name} logo`} fill sizes={large ? "180px" : "88px"} className="object-cover" />
      ) : (
        <>
          <span className={cn("border-primary/50 pointer-events-none absolute rounded-full border", large ? "inset-2.5 border-2" : "inset-1")} aria-hidden />
          <span
            className={cn(
              "font-display px-2 text-center leading-[0.88] font-extrabold tracking-wide uppercase",
              large
                ? longest > 8 ? "text-[20px] lg:text-[26px]" : "text-[24px] lg:text-[30px]"
                : longest > 8 ? "text-[12px]" : longest > 6 ? "text-[13px]" : "text-[15px]",
            )}
            aria-hidden
          >
            {words.map((w, i) => (
              <span key={i} className={cn("block", i === words.length - 1 && words.length > 1 ? "text-primary" : "text-white")}>
                {w}
              </span>
            ))}
          </span>
        </>
      )}
    </span>
  );
}
