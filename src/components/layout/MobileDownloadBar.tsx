import { Download } from "lucide-react";
import { siteConfig } from "@/config/site";
import { ButtonLink } from "@/components/ui/button";

/** Sticky bottom CTA on phones only. */
export function MobileDownloadBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-white/95 p-3 backdrop-blur md:hidden">
      <ButtonLink href={siteConfig.appLinks.download} size="lg" className="w-full">
        <Download /> Download the TGB App
      </ButtonLink>
    </div>
  );
}
