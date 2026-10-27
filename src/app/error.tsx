"use client";

import { useEffect } from "react";

export default function Error({ error, retry }: { error: unknown; retry: () => void }) {
  useEffect(() => {
    // Hook up Sentry / logging here
    console.error(error);
  }, [error]);

  return (
    <main id="main" className="flex flex-1 flex-col items-center justify-center px-4 py-24 text-center">
      <h1 className="font-display text-4xl font-bold uppercase">Something broke down</h1>
      <p className="mt-3 max-w-md text-body">We hit a pothole loading this page. </p>
      <button type="button" onClick={() => retry()} className="mt-8 h-11 rounded-btn bg-secondary px-6 text-sm font-semibold text-white hover:bg-primary">
        Try again
      </button>
    </main>
  );
}
