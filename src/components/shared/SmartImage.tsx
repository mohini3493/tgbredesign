"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

/**
 * next/image with a branded fallback. API images can be missing or broken —
 * the layout never collapses and never shows a broken-image icon.
 */
export function SmartImage({ className, alt, ...props }: ImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed || !props.src) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={cn(
          "absolute inset-0 overflow-hidden bg-[linear-gradient(160deg,#4b98bf_0%,#0f1a22_75%)]",
          className,
        )}
      >
        <svg
          viewBox="0 0 400 200"
          preserveAspectRatio="xMidYMax slice"
          className="absolute inset-x-0 bottom-0 h-3/4 w-full"
          aria-hidden
        >
          <path d="M0 200 L0 120 L70 60 L120 100 L190 30 L260 110 L310 70 L400 130 L400 200 Z" fill="#0f1a22" opacity="0.55" />
          <path d="M0 200 L0 160 L90 110 L160 150 L240 95 L330 150 L400 120 L400 200 Z" fill="#0f1a22" opacity="0.8" />
          <path d="M150 200 Q 210 160 260 175 T 400 150" stroke="#ff7723" strokeWidth="3" fill="none" opacity="0.8" />
        </svg>
      </div>
    );
  }

  return <Image alt={alt} className={className} onError={() => setFailed(true)} {...props} />;
}
