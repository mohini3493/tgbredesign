"use client";

import { Check, Share2 } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

/** Native share sheet where available, otherwise copies the profile link. */
export function ShareProfileButton({ title, className }: { title: string; className?: string }) {
  const [copied, setCopied] = useState(false);

  const share = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Share sheet dismissed or clipboard blocked: nothing to do
    }
  };

  return (
    <button
      type="button"
      onClick={share}
      aria-label={copied ? "Profile link copied" : "Share profile"}
      title={copied ? "Link copied" : "Share profile"}
      className={cn(
        "border-border text-ink hover:border-primary hover:text-primary grid size-11 shrink-0 place-items-center rounded-btn border bg-white transition-colors",
        className,
      )}
    >
      {copied ? <Check className="text-primary size-4" /> : <Share2 className="size-4" />}
    </button>
  );
}
