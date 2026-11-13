import { Flame, Gauge, Landmark, Moon, Mountain, Sunrise, Trophy, UsersRound, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { BadgeKey } from "../data";

const badges: Record<BadgeKey, { label: string; icon: LucideIcon; tone: string }> = {
  trail: { label: "Trail Blazer", icon: Mountain, tone: "text-secondary ring-secondary/60" },
  sunrise: { label: "Sunrise Chaser", icon: Sunrise, tone: "text-primary ring-primary/60" },
  distance: { label: "10K KM Explorer", icon: Gauge, tone: "text-primary ring-primary/60" },
  club: { label: "Club Contributor", icon: UsersRound, tone: "text-secondary ring-secondary/60" },
  top: { label: "Top 5% Rider", icon: Trophy, tone: "text-primary ring-primary/60" },
  streak: { label: "Ride Streak", icon: Flame, tone: "text-primary ring-primary/60" },
  heritage: { label: "Heritage Rider", icon: Landmark, tone: "text-white ring-white/40" },
  night: { label: "Night Rider", icon: Moon, tone: "text-secondary ring-secondary/60" },
};

/** Round achievement medal. `size="lg"` for the milestones shelf. */
export function AchievementBadge({ badge, size = "sm", className }: { badge: BadgeKey; size?: "sm" | "lg"; className?: string }) {
  const { label, icon: Icon, tone } = badges[badge];
  return (
    <span
      role="img"
      aria-label={label}
      title={label}
      className={cn(
        "bg-deep grid shrink-0 place-items-center rounded-full ring-2 ring-offset-2 ring-offset-white",
        size === "lg" ? "size-14" : "size-8",
        tone,
        className,
      )}
    >
      <Icon className={size === "lg" ? "size-6" : "size-4"} strokeWidth={1.8} aria-hidden />
    </span>
  );
}
