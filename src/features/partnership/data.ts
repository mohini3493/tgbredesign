import {
  BarChart3,
  Camera,
  Flag,
  Heart,
  MapPin,
  ShieldCheck,
  TrendingUp,
  Trophy,
  Users,
  UsersRound,
  type LucideIcon,
} from "lucide-react";

/**
 * Copy for the /partnership page.
 * NOTE: partner brands, testimonials and audience figures come from the design mock-up.
 * Confirm each with the partner (and swap brand names for approved logo files) before indexing the page.
 */

const unsplash = (id: string, w = 1600) => `https://images.unsplash.com/photo-${id}?w=${w}&q=75&auto=format&fit=crop`;

export const partnershipImages = {
  hero: unsplash("1670644654521-6fbfffeaba87", 2400),
  audience: unsplash("1558980664-3a031cf67ea8", 1600),
  racing: "/images/hero/slide-1.webp",
  cta: unsplash("1700891591563-5327de496cfd", 2400),
};

export const reasons: { title: string; text: string; icon: LucideIcon }[] = [
  { title: "Relevant Audience", text: "Reach motorcyclists across cities, bike types and riding interests.", icon: UsersRound },
  { title: "Multi-Channel Exposure", text: "Website, mobile app, events, content and racing team.", icon: BarChart3 },
  { title: "Authentic Context", text: "Your brand appears where riders plan, ride and engage.", icon: ShieldCheck },
  { title: "High Engagement", text: "An active community that trusts recommendations.", icon: Heart },
  { title: "Measurable Impact", text: "Track impressions, clicks and real-world engagement.", icon: TrendingUp },
  { title: "Pan-India Reach", text: "From metro cities to riding destinations.", icon: MapPin },
];

export type Platform = {
  id: string;
  tab: string;
  eyebrow: string;
  title: string;
  text: string;
  points: string[];
  /** Photo shown for platforms without phone mock-ups */
  image?: { src: string; alt: string };
};

export const platforms: Platform[] = [
  {
    id: "app",
    tab: "Mobile App",
    eyebrow: "Mobile app",
    title: "Be part of every ride, every plan and every story.",
    text: "Showcase your brand inside the TGB app with high-visibility placements across key touchpoints in a rider's journey.",
    points: ["Home screen banners", "Ride summaries", "In-app promotions", "Club and event highlights", "Sponsored challenges", "Marketplace integration"],
  },
  {
    id: "website",
    tab: "Website",
    eyebrow: "Website",
    title: "Be seen where riders discover their next ride.",
    text: "Feature across route guides, club pages, city pages and rider stories that riders read while planning.",
    points: ["Homepage and section banners", "Sponsored route guides", "Club and city page features", "Newsletter placements"],
    image: { src: unsplash("1579010461011-47920f63d8d4", 1400), alt: "Riders crossing a high-altitude plateau" },
  },
  {
    id: "events",
    tab: "Events & Rides",
    eyebrow: "Events & rides",
    title: "Meet riders on the road, not just on screen.",
    text: "Put your brand at the heart of community rides, meetups and festivals across India.",
    points: ["Title and co-sponsorship", "On-ground stalls and test rides", "Branded ride kits", "Event content and coverage"],
    image: { src: unsplash("1762696782497-2b39df0f4523", 1400), alt: "Club riders lined up at a ride stop" },
  },
  {
    id: "racing",
    tab: "Racing Team",
    eyebrow: "Racing team",
    title: "Your brand on track with TGB Bharat Racing.",
    text: "Bike and gear liveries, race-weekend presence and rider collaborations on national and international tracks.",
    points: ["Bike and gear branding", "Race event presence", "Rider collaborations", "Race-weekend content"],
    image: { src: "/images/hero/slide-1.webp", alt: "Racer at speed on a track" },
  },
  {
    id: "content",
    tab: "Content & Community",
    eyebrow: "Content & community",
    title: "Stories riders actually want to watch and share.",
    text: "Co-create ride films, reviews, guides and social series with the TGB community.",
    points: ["Branded ride films", "Product reviews and guides", "Social media series", "Community challenges"],
    image: { src: unsplash("1758090524309-199d4588e225", 1400), alt: "Group of riders on a mountain road" },
  },
];

export const audience: { value: string; label: string; icon: LucideIcon }[] = [
  { value: "70%", label: "Male Riders", icon: Users },
  { value: "18 – 40", label: "Age Group", icon: UsersRound },
  { value: "Tier 1, 2 & 3", label: "Cities", icon: MapPin },
];

export const racingOffers: { label: string; icon: LucideIcon }[] = [
  { label: "Bike & Gear Branding", icon: Trophy },
  { label: "Race Event Presence", icon: Flag },
  { label: "Social & Media Coverage", icon: Camera },
  { label: "On-ground Activations", icon: MapPin },
  { label: "Rider Collaborations", icon: UsersRound },
];

export const partnerBrands = ["Axxis", "Motul", "Rynox", "CEAT", "TVS", "KTM", "Himalayan", "GoPro", "Castrol", "Michelin"];

export const testimonials = [
  {
    brand: "Axxis",
    quote:
      "The Good Biker gave us direct access to an engaged and relevant audience. The campaign delivered great visibility and genuine rider interest.",
    name: "Marketing Team",
    org: "Axxis Helmets",
  },
  {
    brand: "Motul",
    quote: "From digital to on-ground events, TGB helped us connect with real riders in an authentic and impactful way.",
    name: "Brand Manager",
    org: "Motul India",
  },
  {
    brand: "Rynox",
    quote: "A fantastic platform to showcase our gear to a passionate community that truly lives the riding lifestyle.",
    name: "Head – Marketing",
    org: "Rynox",
  },
];
