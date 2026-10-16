"use server";

import { z } from "zod";
import { apiFetch } from "@/lib/api/client";
import { endpoints } from "@/lib/api/endpoints";
import { isMock } from "@/lib/data-source";

export type NewsletterState = { status: "idle" | "success" | "error"; message?: string };

const schema = z.object({ email: z.string().trim().email("Please enter a valid email") });

export async function subscribeToNewsletter(
  _prev: NewsletterState,
  formData: FormData,
): Promise<NewsletterState> {
  const parsed = schema.safeParse({ email: formData.get("email") });
  if (!parsed.success) {
    return { status: "error", message: parsed.error.issues[0]?.message ?? "Invalid email" };
  }
  try {
    if (!isMock()) {
      await apiFetch(endpoints.newsletter(), z.unknown(), { method: "POST", body: parsed.data });
    }
    return { status: "success", message: "You're in. Ride reports coming your way." };
  } catch {
    return { status: "error", message: "Couldn't subscribe right now. Try again." };
  }
}
