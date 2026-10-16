"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

/**
 * Brand logo — used exactly as supplied (never recolored).
 * Falls back to a text wordmark only if the image can't load.
 */
export function Logo({ className, priority }: { className?: string; priority?: boolean }) {
  const [failed, setFailed] = useState(false);
  return (
    <Link href="/" aria-label="TGB – The Good Biker, home" className={cn("inline-flex shrink-0 items-center", className)}>
      {failed ? (
        <span className="flex items-center gap-2">
          <span className="font-display text-4xl font-extrabold italic leading-none tracking-tight text-primary">
            TGB
          </span>
          <span className="font-display text-[13px] font-bold uppercase leading-[1.05] text-secondary">
            The Good
            <br />
            Biker
          </span>
        </span>
      ) : (
        <Image
          src={siteConfig.logo}
          alt="TGB – The Good Biker"
          width={180}
          height={54}
          priority={priority}
          className="h-10 w-auto md:h-11"
          onError={() => setFailed(true)}
        />
      )}
    </Link>
  );
}
