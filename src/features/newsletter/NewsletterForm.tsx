"use client";

import { useActionState } from "react";
import { ArrowRight } from "lucide-react";
import { subscribeToNewsletter, type NewsletterState } from "./actions";

const initial: NewsletterState = { status: "idle" };

export function NewsletterForm() {
  const [state, action, pending] = useActionState(subscribeToNewsletter, initial);

  return (
    <form action={action} className="w-full max-w-md" noValidate>
      <label htmlFor="newsletter-email" className="text-sm font-semibold text-white">
        Ride reports, routes & event drops — monthly.
      </label>
      <div className="mt-3 flex gap-2">
        <input
          id="newsletter-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          aria-invalid={state.status === "error"}
          aria-describedby="newsletter-status"
          className="h-12 min-w-0 flex-1 rounded-btn border border-white/15 bg-white/5 px-4 text-white placeholder:text-deep-text/70 focus:border-secondary focus:outline-none"
        />
        <button
          type="submit"
          disabled={pending}
          className="inline-flex h-12 items-center gap-2 rounded-btn bg-primary px-5 text-sm font-semibold text-white transition-colors hover:bg-primary-hover disabled:opacity-60"
        >
          {pending ? "…" : "Subscribe"} <ArrowRight className="size-4" aria-hidden />
        </button>
      </div>
      <p
        id="newsletter-status"
        role="status"
        className={`mt-2 min-h-5 text-sm ${state.status === "error" ? "text-primary" : "text-deep-text"}`}
      >
        {state.message}
      </p>
    </form>
  );
}
