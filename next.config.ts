import type { NextConfig } from "next";

const apiImageHost = process.env.NEXT_PUBLIC_IMAGE_HOST; // e.g. cdn.thegoodbiker.com

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "tgb.theshashank.com" },
      ...(apiImageHost ? [{ protocol: "https" as const, hostname: apiImageHost }] : []),
    ],
  },
};

export default nextConfig;
