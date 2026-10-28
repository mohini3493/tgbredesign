export const siteConfig = {
  name: "TGB – The Good Biker",
  shortName: "TGB",
  tagline: "Do the ride thing.",
  description:
    "India's largest motorcycling ecosystem connecting riders, clubs, routes, events, rentals and motorcycle businesses.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  logo: "https://tgb.theshashank.com/wp-content/themes/hello-elementor-child/assets/images/tgb-logo-color.png",
  appLinks: {
    android: "https://play.google.com/store/apps/details?id=com.thegoodbiker.userapp",
    ios: "https://apps.apple.com/us/app/the-good-biker/id6448780305",
    download: "/download",
    /** Smart link: opens the right store for the visitor's device */
    smart: "https://thegoodbiker.page.link/tgb",
  },
} as const;

export type NavItem = { label: string; href: string };

export const mainNav: NavItem[] = [
  { label: "Routes", href: "/routes" },
  { label: "Rides", href: "/rides" },
  { label: "Clubs", href: "/clubs" },
  { label: "Events", href: "/events" },
  { label: "Garage", href: "/garage" },
  { label: "Marketplace", href: "/marketplace" },
  { label: "Cities", href: "/cities" },
  { label: "Blog", href: "/blog" },
];

export const footerColumns: { title: string; links: NavItem[] }[] = [
  {
    title: "Community",
    links: [
      { label: "Clubs", href: "/clubs" },
      { label: "Riders", href: "/riders" },
      { label: "Rides", href: "/rides" },
      { label: "Events", href: "/events" },
    ],
  },
  {
    title: "Discover",
    links: [
      { label: "Routes & Trips", href: "/routes" },
      { label: "Cities", href: "/cities" },
      { label: "Garage", href: "/garage" },
      { label: "Blogs", href: "/blog" },
    ],
  },
  {
    title: "Marketplace",
    links: [
      { label: "Rentals", href: "/marketplace/rentals" },
      { label: "Accessories", href: "/marketplace/accessories" },
      { label: "Services", href: "/marketplace/services" },
    ],
  },
];

export const socialLinks = [
  { label: "Instagram", href: "https://instagram.com/thegoodbiker", icon: "instagram" },
  { label: "Facebook", href: "https://facebook.com/thegoodbiker", icon: "facebook" },
  { label: "YouTube", href: "https://youtube.com/@thegoodbiker", icon: "youtube" },
  { label: "X", href: "https://x.com/thegoodbiker", icon: "x" },
] as const;

/** "Everything a rider needs" — static marketing content (can move to CMS later). */
export const riderServices = [
  {
    key: "garage",
    title: "Garage",
    description: "Bikes, services & maintenance",
    href: "/garage",
    image: "/images/services/garage.png",
  },
  {
    key: "rentals",
    title: "Rentals",
    description: "Rent a bike in any city",
    href: "/marketplace/rentals",
    image: "/images/services/rentals.png",
  },
  {
    key: "accessories",
    title: "Accessories",
    description: "Helmets, jackets, luggage & more",
    href: "/marketplace/accessories",
    image: "/images/services/accessories.png",
  },
  {
    key: "schools",
    title: "Riding Schools",
    description: "Learn to ride from experts",
    href: "/riding-schools",
    image: "/images/services/riding-schools.png",
  },
  {
    key: "blog",
    title: "Blogs & Guides",
    description: "Tips, stories & travel guides",
    href: "/blog",
    image: "/images/services/blogs-guides.png",
  },
] as const;

export const valueProps = [
  {
    key: "community",
    title: "Amazing community",
    description: "Real riders, real connections — in 25+ cities.",
  },
  {
    key: "routes",
    title: "Best routes",
    description: "Curated by riders, with season, terrain and stops.",
  },
  {
    key: "marketplace",
    title: "Trusted marketplace",
    description: "Verified rentals, gear and service partners.",
  },
  {
    key: "allinone",
    title: "All in one place",
    description: "Plan, ride, track and share — one app.",
  },
] as const;

/**
 * Optional hero background video (e.g. "/hero.mp4" in /public, or a CDN URL).
 * When set, it plays muted & looped over the poster image below.
 */
export const heroVideo: string | null = null;

export const heroImage =
  "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?w=2400&q=80&auto=format&fit=crop";

/** Backdrop for the "Take the ride with you" app banner (black & white group ride) */
export const appBannerImage =
  "https://images.unsplash.com/photo-1558980664-2cd663cf8dde?w=2000&q=75&auto=format&fit=crop";

/** Backdrop for the "Take the ride further" app download popup */
export const appPromptImage =
  "https://images.unsplash.com/photo-1670644654521-6fbfffeaba87?w=2000&q=75&auto=format&fit=crop";

/** Rider faces shown in the hero "Trusted by" pill */
export const heroTrustAvatars = [
  "https://images.unsplash.com/photo-1757744705465-ea08b0ddc38a?w=96&h=96&q=75&auto=format&fit=crop&crop=faces",
  "https://images.unsplash.com/photo-1789500381106-ba13068a6520?w=96&h=96&q=75&auto=format&fit=crop&crop=faces",
  "https://images.unsplash.com/photo-1741363863033-2d68f0bd9fde?w=96&h=96&q=75&auto=format&fit=crop&crop=faces",
  "https://images.unsplash.com/photo-1658985416866-d059ee62dafd?w=96&h=96&q=75&auto=format&fit=crop&crop=faces",
];
