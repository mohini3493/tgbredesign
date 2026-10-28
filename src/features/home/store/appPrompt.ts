"use client";

import { create } from "zustand";

type AppPromptState = {
  open: boolean;
  show: () => void;
  hide: () => void;
};

/** Open state of the "Take the ride further" app download popup (one instance per page). */
export const useAppPrompt = create<AppPromptState>()((set) => ({
  open: false,
  show: () => set({ open: true }),
  hide: () => set({ open: false }),
}));
