import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { AppleIcon, GooglePlayIcon } from "./BrandIcons";

const badge =
  "flex h-[54px] w-[200px] items-center gap-2.5 whitespace-nowrap rounded-[10px] bg-[#000] px-3 text-white ring-1 ring-white/20 transition hover:ring-primary";

export function StoreBadges({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-wrap gap-2.5", className)}>
      <a href={siteConfig.appLinks.ios} className={badge} target="_blank" rel="noopener noreferrer">
        <AppleIcon className="size-8" />
        <span className="flex flex-col leading-none">
          <span className="text-[11px]">Download on the</span>
          <span className="mt-0.5 text-[23px] font-medium tracking-tight">App Store</span>
        </span>
      </a>
      <a href={siteConfig.appLinks.android} className={badge} target="_blank" rel="noopener noreferrer">
        <GooglePlayIcon className="size-8" />
        <span className="flex flex-col leading-none">
          <span className="text-[10px] uppercase">Get it on</span>
          <span className="mt-0.5 text-[23px] font-medium tracking-tight">Google Play</span>
        </span>
      </a>
    </div>
  );
}
