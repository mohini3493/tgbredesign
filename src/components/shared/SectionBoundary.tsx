"use client";

import { catchError, type ErrorInfo } from "next/error";
import { RotateCw } from "lucide-react";

/**
 * Error boundary for a single homepage section.
 * If one API call fails, only that section shows this fallback — the page keeps working.
 */
function SectionErrorFallback(props: { title: string }, { retry }: ErrorInfo) {
  return (
    <div className="flex flex-col items-center justify-center rounded-card border border-border bg-surface px-6 py-10 text-center">
      <p className="font-semibold text-ink">Couldn&apos;t load {props.title.toLowerCase()}</p>
      <p className="mt-1 text-sm text-muted">Something went wrong on our side.</p>
      <button
        type="button"
        onClick={() => retry()}
        className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-secondary hover:text-secondary-hover"
      >
        <RotateCw className="size-4" aria-hidden /> Try again
      </button>
    </div>
  );
}

export const SectionBoundary = catchError(SectionErrorFallback);
