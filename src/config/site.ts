export const siteConfig = {
  name: "TGB – The Good Biker",
  shortName: "TGB",
  tagline: "Do the ride thing.",
  description:
    "India's largest motorcycling ecosystem connecting riders, clubs, routes, events, rentals and motorcycle businesses.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  logo: "https://tgb.theshashank.com/wp-content/themes/hello-elementor-child/assets/images/tgb-logo-color.png",
  appLinks: {
    android: "https://play.google.com/store/apps/details?id=com.thegoodbiker",
    ios: "https://apps.apple.com/in/app/the-good-biker",
    download: "/download",
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
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Contact Us", href: "/contact" },
      { label: "Privacy Policy", href: "/privacy" },
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
    description: "Bikes, service history & maintenance reminders.",
    href: "/garage",
    image: "https://images.unsplash.com/photo-1558981000-f294a6ed32b2?w=800&q=75&auto=format&fit=crop",
  },
  {
    key: "rentals",
    title: "Rentals",
    description: "Rent a verified bike in any city, by the day or week.",
    href: "/marketplace/rentals",
    image: "https://images.unsplash.com/photo-1611004061856-ccc3cbe944b2?w=800&q=75&auto=format&fit=crop",
  },
  {
    key: "accessories",
    title: "Accessories",
    description: "Helmets, jackets, luggage and touring gear.",
    href: "/marketplace/accessories",
    image: "https://images.unsplash.com/photo-1590506995460-d0d9892b54da?w=800&q=75&auto=format&fit=crop",
  },
  {
    key: "schools",
    title: "Riding Schools",
    description: "Learn to ride, or level up off-road, with certified coaches.",
    href: "/riding-schools",
    image: "https://images.unsplash.com/photo-1606907568152-58fcb0a0a4e5?w=800&q=75&auto=format&fit=crop",
  },
  {
    key: "blog",
    title: "Blogs & Guides",
    description: "Ride reports, route guides and gear reviews.",
    href: "/blog",
    image: "https://images.unsplash.com/photo-1575312363468-c8455fb38a76?w=800&q=75&auto=format&fit=crop",
  },
] as const;

export const valueProps = [
  { key: "community", title: "Amazing community", description: "Real riders, real connections — in 25+ cities." },
  { key: "routes", title: "Best routes", description: "Curated by riders, with season, terrain and stops." },
  { key: "marketplace", title: "Trusted marketplace", description: "Verified rentals, gear and service partners." },
  { key: "allinone", title: "All in one place", description: "Plan, ride, track and share — one app." },
] as const;

/**
 * Optional hero background video (e.g. "/hero.mp4" in /public, or a CDN URL).
 * When set, it plays muted & looped over the poster image below.
 */
export const heroVideo: string | null = null;

export const heroImage =
  "https://images.unsplash.com/photo-1781950879206-29092ae8a44c?w=2400&q=80&auto=format&fit=crop";
