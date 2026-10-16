"use client";

import { useQuery } from "@tanstack/react-query";
import { features } from "@/config/features";
import type { Session } from "../types";

/** Client-side session hook. Disabled until the auth feature flag is on. */
export function useSession() {
  return useQuery<Session>({
    queryKey: ["session"],
    enabled: features.auth,
    queryFn: async () => {
      const res = await fetch("/api/auth/session");
      if (!res.ok) return null;
      return res.json();
    },
    staleTime: 60_000,
  });
}
