/**
 * Demo leaderboard data for the /leaderboard page.
 * Shaped like an API response (one list per board) so it can later come from a leaderboard service.
 */

const unsplash = (id: string, w = 1600, extra = "") =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=75&auto=format&fit=crop${extra}`;
const face = (id: string) => unsplash(id, 120, "&h=120&crop=faces");

export type BadgeKey = "trail" | "sunrise" | "distance" | "club" | "top" | "streak" | "heritage" | "night";

export type LeaderEntry = {
  id: string;
  name: string;
  /** Rider photo; clubs use their crest (logo or type-set name) instead */
  avatar?: string;
  logo?: string | null;
  city: string;
  state: string;
  points: number;
  /** Places gained (+) or lost (−) since last week */
  trend: number;
  badges: BadgeKey[];
  /** Two highlight pills shown on the podium */
  tags: [string, string];
};

export type Board = { id: string; label: string; unit: string; entries: LeaderEntry[] };

const faces = {
  shashank: face("1658985416866-d059ee62dafd"),
  ananya: face("1789500381106-ba13068a6520"),
  kabir: face("1757744705465-ea08b0ddc38a"),
  meera: face("1767607740661-05e668190cdc"),
  rohan: face("1741363863033-2d68f0bd9fde"),
  varsha: face("1759840278381-bf7d5e332050"),
};

const riders: LeaderEntry[] = [
  { id: "r1", name: "Kabir Singh", avatar: faces.kabir, city: "Delhi", state: "Delhi", points: 183, trend: 2, badges: ["trail", "distance", "top"], tags: ["Explorer", "Community Hero"] },
  { id: "r2", name: "Shashank T.", avatar: faces.shashank, city: "Bengaluru", state: "Karnataka", points: 162, trend: 0, badges: ["sunrise", "club", "streak"], tags: ["Trail Blazer", "Event Regular"] },
  { id: "r3", name: "Ananya Rao", avatar: faces.ananya, city: "Pune", state: "Maharashtra", points: 148, trend: 1, badges: ["distance", "night", "club"], tags: ["Long Rides", "Club Builder"] },
  { id: "r4", name: "Rohan Mehta", avatar: faces.rohan, city: "Mumbai", state: "Maharashtra", points: 141, trend: 2, badges: ["trail", "streak", "top"], tags: ["Coastal", "Photographer"] },
  { id: "r5", name: "Varsha Pillai", avatar: faces.varsha, city: "Bengaluru", state: "Karnataka", points: 136, trend: 5, badges: ["sunrise", "trail", "club"], tags: ["Sunrise Chaser", "Weekend Rides"] },
  { id: "r6", name: "Meera Iyer", avatar: faces.meera, city: "Chennai", state: "Tamil Nadu", points: 128, trend: 1, badges: ["heritage", "club", "distance"], tags: ["Heritage", "Community"] },
  { id: "r7", name: "Arjun Mehta", avatar: faces.shashank, city: "Bengaluru", state: "Karnataka", points: 121, trend: -2, badges: ["trail", "night", "streak"], tags: ["Touring", "Adventure"] },
  { id: "r8", name: "Kolli Hills Explorer", avatar: faces.kabir, city: "Chennai", state: "Tamil Nadu", points: 113, trend: 3, badges: ["trail", "sunrise", "distance"], tags: ["Twisties", "Explorer"] },
  { id: "r9", name: "Shahid Traveller", avatar: faces.rohan, city: "Indore", state: "Madhya Pradesh", points: 98, trend: 4, badges: ["distance", "streak", "top"], tags: ["Long Rides", "Solo"] },
  { id: "r10", name: "Neha Kulkarni", avatar: faces.ananya, city: "Hyderabad", state: "Telangana", points: 92, trend: -1, badges: ["club", "sunrise", "heritage"], tags: ["Community", "Events"] },
];

const club = (
  id: string,
  name: string,
  city: string,
  state: string,
  points: number,
  trend: number,
  badges: BadgeKey[],
  tags: [string, string],
  logo: string | null = null,
): LeaderEntry => ({ id, name, logo, city, state, points, trend, badges, tags });

const clubs: LeaderEntry[] = [
  club("c1", "GearUpWheels", "Bengaluru", "Karnataka", 183, 1, ["club", "distance", "top"], ["Explorer", "Community Hero"], "/images/clubs/gearupwheels.svg"),
  club("c2", "Bangalore Bikers", "Bengaluru", "Karnataka", 162, 0, ["sunrise", "club", "streak"], ["Trail Blazer", "Event Regular"]),
  club("c3", "Highway Hunters", "Mumbai", "Maharashtra", 148, 2, ["distance", "trail", "club"], ["Long Rides", "Club Builder"]),
  club("c4", "Touring Tribe India", "Mumbai", "Maharashtra", 141, 2, ["distance", "trail", "top"], ["Touring", "Camping"], "/images/clubs/touring-tribe-india.svg"),
  club("c5", "Wild Trails", "Coorg", "Karnataka", 136, 5, ["trail", "sunrise", "streak"], ["Off-road", "Exploration"]),
  club("c6", "Night Riders India", "Pune", "Maharashtra", 128, 1, ["night", "club", "streak"], ["Night Rides", "Fun"]),
  club("c7", "Northern Nomads", "Delhi NCR", "Delhi", 121, -2, ["trail", "distance", "club"], ["Touring", "Camping"]),
  club("c8", "Throttle Brothers", "Hyderabad", "Telangana", 113, 3, ["top", "streak", "club"], ["Sport", "Track Days"]),
  club("c9", "Coastal Riders", "Mangaluru", "Karnataka", 98, 4, ["sunrise", "trail", "club"], ["Coastal", "Photography"]),
  club("c10", "Classic Souls", "Chennai", "Tamil Nadu", 92, -1, ["heritage", "club", "night"], ["Classic Bikes", "Heritage"]),
];

const rerank = (list: LeaderEntry[], points: number[], trends: number[]) =>
  list.map((e, i) => ({ ...e, points: points[i], trend: trends[i] }));

export const boards: Board[] = [
  { id: "riders", label: "Riders", unit: "Ride Points", entries: riders },
  { id: "clubs", label: "Clubs", unit: "Club Points", entries: clubs },
  {
    id: "monthly",
    label: "Monthly Race",
    unit: "Rides this month",
    entries: rerank(clubs, [22, 18, 14, 12, 11, 9, 8, 7, 6, 5], [0, 1, -1, 2, 3, 0, -2, 1, 2, -1]),
  },
  {
    id: "contributors",
    label: "Top Contributors",
    unit: "Contributions",
    entries: rerank([riders[5], riders[1], riders[3], riders[0], riders[4], riders[2], riders[7], riders[6], riders[9], riders[8]], [64, 58, 51, 47, 42, 39, 33, 30, 26, 21], [1, 0, 2, -1, 3, 0, 1, -2, 4, 0]),
  },
];

export const lastUpdated = "13 Nov 2026";

/** "This month's race" (sidebar): club rides so far this month */
export const monthlyRace = boards[2].entries.slice(0, 5).map((e) => ({ name: e.name, rides: e.points }));

export const milestones: { label: string; badge: BadgeKey }[] = [
  { label: "10K KM Explorer", badge: "distance" },
  { label: "Mountain Rider", badge: "trail" },
  { label: "Sunrise Chaser", badge: "sunrise" },
  { label: "Club Contributor", badge: "club" },
  { label: "Top 5% Rider", badge: "top" },
];

export const spotlight = {
  name: "Kolli Hills Explorer",
  location: "Chennai, Tamil Nadu",
  quote: "It's not just about the destination, but the people you ride with.",
  image: unsplash("1701599346665-88d37f67fed0", 1000),
  stats: [
    { value: "24", label: "Rides this month" },
    { value: "1,860 km", label: "Distance" },
    { value: "4", label: "New trails" },
  ],
};

export const leaderboardImages = {
  hero: "/images/hero/slide-6.webp",
  promo: unsplash("1690540293130-2ca04fbf815b", 900),
  clubNext: unsplash("1762696782497-2b39df0f4523", 900),
};
