import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { AppleIcon, GooglePlayIcon } from "./BrandIcons";

const badge =
  "inline-flex h-13 items-center gap-3 rounded-btn border border-white/25 bg-ink px-4 text-white transition-colors hover:border-primary";

export function StoreBadges({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-wrap gap-3", className)}>
      <a href={siteConfig.appLinks.android} className={badge} target="_blank" rel="noopener noreferrer">
        <GooglePlayIcon className="size-6" />
        <span className="flex flex-col leading-tight">
          <span className="text-[10px] uppercase tracking-wide text-deep-text">Get it on</span>
          <span className="text-base font-semibold">Google Play</span>
        </span>
      </a>
      <a href={siteConfig.appLinks.ios} className={badge} target="_blank" rel="noopener noreferrer">
        <AppleIcon className="size-6" />
        <span className="flex flex-col leading-tight">
          <span className="text-[10px] uppercase tracking-wide text-deep-text">Download on the</span>
          <span className="text-base font-semibold">App Store</span>
        </span>
      </a>
    </div>
  );
}
