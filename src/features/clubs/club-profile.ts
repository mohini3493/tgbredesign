/**
 * Demo club profile for the /clubs page (Bangalore Bikers from the club directory).
 * Shaped like an API response so it can later come from the clubs service (fetch by slug).
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

export type ClubRide = {
  title: string;
  image: string;
  date: { month: string; day: string };
  when: string;
  from: string;
  distanceKm: number;
  type: string;
  open: boolean;
  going: number;
  avatars: string[];
};

export type ClubPost = { text: string; image: string; ago: string; likes: number; comments: number };

export const clubProfile = {
  slug: "bangalore-bikers",
  name: "Bangalore Bikers",
  logo: null,
  verified: true,
  location: "Bengaluru, Karnataka",
  established: 2016,
  tagline: "A community of passionate riders exploring roads and creating unforgettable memories.",
  tags: ["Touring", "Adventure", "Community", "Weekend Rides"],
  cover: unsplash("1762696782497-2b39df0f4523", 2400),
  memberCount: 256,
  memberAvatars: faces,

  about:
    "Bangalore Bikers is more than just a club — we're a family of riders who live for the open road. From weekend getaways to long expeditions, we ride together, support each other and celebrate the spirit of motorcycling.",
  values: [
    "Open to riders with all kinds of motorcycles",
    "Weekly rides and monthly breakfast runs",
    "Safety, respect and responsible riding",
    "Brotherhood. Adventure. Memories.",
  ],

  stats: { members: 256, ridesCompleted: 32, citiesExplored: 18, yearsTogether: 10 },

  founder: {
    name: "Arjun R",
    handle: "arjunonwheels",
    avatar: unsplash("1741363863033-2d68f0bd9fde", 160, "&h=160&crop=faces"),
    quote:
      "It started with a few friends and a plan for a weekend ride. Today, it's a community that feels like home on every road we take.",
  },

  upcomingRides: [
    {
      title: "Nandi Hills Sunrise Ride",
      image: unsplash("1618805714320-f8825019c1be", 700),
      date: { month: "Nov", day: "22" },
      when: "Sun, 22 Nov • 6:00 AM",
      from: "Bengaluru",
      distanceKm: 150,
      type: "Weekend Ride",
      open: true,
      going: 20,
      avatars: faces,
    },
    {
      title: "Coorg Monsoon Escape",
      image: unsplash("1572782252655-9c8771392601", 700),
      date: { month: "Nov", day: "29" },
      when: "Sun, 29 Nov • 6:30 AM",
      from: "Bengaluru",
      distanceKm: 260,
      type: "Touring",
      open: true,
      going: 28,
      avatars: faces,
    },
    {
      title: "Chikmagalur Coffee Trail",
      image: unsplash("1560357647-62a43d9897bb", 700),
      date: { month: "Dec", day: "06" },
      when: "Sun, 6 Dec • 6:00 AM",
      from: "Bengaluru",
      distanceKm: 210,
      type: "Adventure",
      open: true,
      going: 18,
      avatars: faces,
    },
  ] satisfies ClubRide[],

  nextMeetup: {
    title: "Club Meetup & Bike Wash",
    when: "Sun, 15 Nov 2026 • 8:00 AM",
    venue: "Bangalore Bikers Garage, Koramangala, Bengaluru",
  },

  gallery: {
    photos: [
      { src: unsplash("1758090524309-199d4588e225", 1200), alt: "Club riders on a mountain road" },
      { src: unsplash("1579010461011-47920f63d8d4", 500), alt: "Riders crossing a high-altitude plateau" },
      { src: unsplash("1700891591563-5327de496cfd", 500), alt: "Club ride on a mountain highway" },
      { src: unsplash("1690540293130-2ca04fbf815b", 500), alt: "Two riders on a green country road" },
      { src: unsplash("1738494777740-21b07e9da9a2", 500), alt: "Bikes parked beside a mountain river" },
    ],
    more: 42,
  },

  posts: [
    { text: "Sunrise vibes at Nandi Hills. What a ride!", image: unsplash("1758090524309-199d4588e225", 300), ago: "2 days ago", likes: 34, comments: 6 },
    { text: "Coorg trails were something else!", image: unsplash("1572782252655-9c8771392601", 300), ago: "5 days ago", likes: 28, comments: 4 },
    { text: "New members, new stories. Welcome to the family!", image: unsplash("1687181493462-0ca5d5627285", 300), ago: "1 week ago", likes: 41, comments: 9 },
  ] satisfies ClubPost[],

  ctaImage: unsplash("1670644654521-6fbfffeaba87", 2000),
};

export type ClubProfile = typeof clubProfile;
