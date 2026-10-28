"use client";

import type { MouseEvent, ReactNode } from "react";
import { useAppPrompt } from "../store/appPrompt";
import { AppDownloadModal } from "./AppDownloadModal";

/** Mount once per page; renders the shared app download popup. */
export function AppPromptHost() {
  const open = useAppPrompt((s) => s.open);
  const hide = useAppPrompt((s) => s.hide);
  return <AppDownloadModal open={open} onClose={hide} />;
}

/**
 * Any link clicked inside opens the app download popup instead of navigating.
 * Modified clicks (new tab / window) still follow the link.
 */
export function AppPromptZone({ children }: { children: ReactNode }) {
  const show = useAppPrompt((s) => s.show);

  const onClickCapture = (e: MouseEvent<HTMLDivElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    if (!(e.target as Element).closest("a[href]")) return;
    e.preventDefault();
    e.stopPropagation();
    show();
  };

  return <div onClickCapture={onClickCapture}>{children}</div>;
}
