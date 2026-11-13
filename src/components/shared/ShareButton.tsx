"use client";

import { Check, Share2 } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Native share sheet where available, otherwise copies the page link.
 * Icon-only by default; pass `label` for a text button (style it with `className`).
 */
export function ShareButton({ title, label, className }: { title: string; label?: string; className?: string }) {
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

  const Icon = copied ? Check : Share2;
  return (
    <button
      type="button"
      onClick={share}
      aria-label={label ? undefined : copied ? "Link copied" : "Share"}
      title={copied ? "Link copied" : "Share"}
      className={cn(
        "border-border text-ink hover:border-primary hover:text-primary rounded-btn inline-flex shrink-0 items-center justify-center gap-2 border bg-white font-semibold transition-colors",
        label ? "h-11 px-5 text-sm" : "size-11",
        className,
      )}
    >
      <Icon className={cn("size-4", copied && !label && "text-primary")} aria-hidden />
      {label && (copied ? "Link copied" : label)}
    </button>
  );
}
