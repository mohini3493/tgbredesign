import { Crown } from "lucide-react";
import { cn } from "@/lib/utils";

export function MembersOnlyBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full bg-ink/85 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur",
        className,
      )}
    >
      <Crown className="size-3 text-primary" aria-hidden />
      Members only
    </span>
  );
}
