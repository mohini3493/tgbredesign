/**
 * Demo rider profile for the /rider page.
 * Shaped like an API response so it can later come from the riders service (fetch by username).
 */

const unsplash = (id: string, w = 1200, extra = "") =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=75&auto=format&fit=crop${extra}`;
const face = (id: string) => unsplash(id, 96, "&h=96&crop=faces");

const faces = [
  face("1757744705465-ea08b0ddc38a"),
  face("1789500381106-ba13068a6520"),
  face("1741363863033-2d68f0bd9fde"),
  face("1759840278381-bf7d5e332050"),
];

export type RideSummary = {
  title: string;
  image: string;
  date: { month: string; day: string };
  distanceKm: number;
  days: number;
  riders: number;
  avatars: string[];
};

export type Trail = { name: string; image: string; distanceKm: number; tag: string };

export type Bike = { name: string; make: string; year: number; odometerKm: number; image: string };

export const riderProfile = {
  name: "Arjun Mehta",
  username: "arjunrider",
  verified: true,
  isOnline: true,
  location: "Bengaluru, Karnataka",
  joined: "Mar 2023",
  instagram: "arjunrider",
  avatar: unsplash("1658985416866-d059ee62dafd", 400, "&h=400&crop=faces"),
  cover: "/images/hero/slide-5.webp",
  bio: "Weekend escapes, mountain roads and stories on two wheels. Always chasing better roads and better people.",
  quote: "Mountains fix things that cities break.",
  styles: ["Touring", "Adventure", "Photography", "Community"],

  stats: {
    followers: "1.2K",
    following: "480",
    ridesCompleted: 86,
    statesExplored: 12,
    clubsRiddenWith: 38,
  },

  rideStats: {
    totalKm: "14,320 km",
    ridesCompleted: 86,
    statesExplored: 12,
    dayRides: 32,
    overnightRides: 18,
    internationalRides: 3,
  },

  bikes: [
    { name: "KTM 390 Adventure", make: "KTM", year: 2022, odometerKm: 28400, image: unsplash("1558980664-3a031cf67ea8", 800) },
    { name: "Royal Enfield Himalayan 450", make: "Royal Enfield", year: 2024, odometerKm: 9800, image: unsplash("1670644654521-6fbfffeaba87", 800) },
  ] satisfies Bike[],

  gear: [
    { brand: "Axxis", item: "Helmet" },
    { brand: "Rynox", item: "Jacket" },
    { brand: "TCX", item: "Boots" },
  ],

  featuredRide: {
    title: "Hampi Trails",
    image: unsplash("1701599346665-88d37f67fed0", 1800),
    distanceKm: 320,
    days: 2,
    riders: 12,
    description: "Ancient routes, rugged roads and unforgettable views.",
    photos: [
      unsplash("1579010461011-47920f63d8d4", 200),
      unsplash("1700891591563-5327de496cfd", 200),
      unsplash("1762696782497-2b39df0f4523", 200),
      unsplash("1558980664-3a031cf67ea8", 200),
    ],
    morePhotos: 16,
  },

  recentRides: [
    { title: "Nandi Hills Sunrise Ride", image: unsplash("1758090524309-199d4588e225", 700), date: { month: "Jun", day: "08" }, distanceKm: 78, days: 1, riders: 20, avatars: faces },
    { title: "Coorg Monsoon Escape", image: unsplash("1690540293130-2ca04fbf815b", 700), date: { month: "May", day: "22" }, distanceKm: 260, days: 2, riders: 14, avatars: faces },
    { title: "BR Hills Forest Ride", image: unsplash("1738494777740-21b07e9da9a2", 700), date: { month: "Apr", day: "12" }, distanceKm: 160, days: 1, riders: 18, avatars: faces },
  ] satisfies RideSummary[],

  favoriteTrails: [
    { name: "Bangalore to Chikmagalur", image: unsplash("1618805714320-f8825019c1be", 600), distanceKm: 250, tag: "Forest" },
    { name: "Coorg Backroads", image: unsplash("1572782252655-9c8771392601", 600), distanceKm: 180, tag: "Scenic" },
    { name: "Hampi Loop", image: unsplash("1582510003544-4d00b7f74220", 600), distanceKm: 320, tag: "Heritage" },
    { name: "Kolli Hills", image: unsplash("1560357647-62a43d9897bb", 600), distanceKm: 190, tag: "Twisties" },
  ] satisfies Trail[],

  map: { states: 12, destinations: 48, totalKm: "14,320 km" },

  clubs: [
    { name: "GearUpWheels", logo: "/images/clubs/gearupwheels.svg", role: "Member", since: "2 years" },
    { name: "Touring Tribe India", logo: "/images/clubs/touring-tribe-india.svg", role: "Member", since: "1 year" },
    { name: "Himalayan Highlanders", logo: "/images/clubs/himalayan-highlanders.svg", role: "Guest rider", since: "6 rides" },
  ],
};

export type RiderProfile = typeof riderProfile;
