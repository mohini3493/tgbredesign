/**
 * Stylised map of India with the rider's routes. The outline is a simplified mainland
 * shape projected from lon/lat (x = (lon − 68) × 10, y = (37.5 − lat) × 10) — decorative, not survey-accurate.
 */
const INDIA =
  "M64 5 L79 9 L98 20 L109 32 L107 49 L115 65 L130 73 L121 87 L139 96 L161 100 L179 109 L201 111 L208 102 L218 108 L241 107 L240 97 L266 82 L282 81 L294 93 L280 102 L272 109 L266 123 L262 137 L253 145 L246 156 L239 139 L242 126 L220 123 L218 115 L206 120 L202 130 L209 146 L209 159 L190 160 L184 175 L170 181 L162 192 L143 209 L133 212 L123 220 L121 240 L123 245 L119 256 L118 272 L109 283 L101 286 L95 294 L86 286 L82 275 L78 260 L69 247 L64 230 L57 216 L50 199 L48 185 L49 170 L46 163 L45 156 L30 167 L10 151 L20 146 L4 139 L25 132 L30 129 L21 118 L26 105 L39 96 L50 85 L65 66 L66 55 L74 52 L60 45 L59 29 Z";

const places = {
  bengaluru: [96, 245.3],
  hampi: [84.6, 221.7],
  goa: [59, 221],
  mumbai: [48.8, 184.2],
  pune: [58.6, 189.8],
  coorg: [77.4, 250.8],
  chikmagalur: [77.7, 241.8],
  ooty: [87, 260.9],
  kolli: [103.4, 262.5],
  hyderabad: [104.8, 201.1],
  delhi: [92, 89],
  manali: [91.9, 52.6],
  leh: [95.8, 33.5],
  jaipur: [78, 106],
} as const;

type Place = keyof typeof places;

const routes: Place[][] = [
  ["bengaluru", "chikmagalur", "goa", "mumbai", "pune", "hyderabad", "bengaluru"],
  ["bengaluru", "hampi"],
  ["bengaluru", "coorg", "ooty", "kolli", "bengaluru"],
  ["jaipur", "delhi", "manali", "leh"],
];

export function IndiaRideMap({ className }: { className?: string }) {
  return (
    <svg viewBox="-6 -4 308 304" className={className} role="img" aria-label="Map of India showing the rider's routes across 12 states">
      <path d={INDIA} fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.35)" strokeWidth="1.2" strokeLinejoin="round" />
      {routes.map((route) => (
        <polyline
          key={route.join("-")}
          points={route.map((p) => places[p].join(",")).join(" ")}
          fill="none"
          stroke="#ff7723"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.9"
        />
      ))}
      {Object.entries(places).map(([name, [x, y]]) => (
        <g key={name}>
          <circle cx={x} cy={y} r="5" fill="#ff7723" opacity="0.25" />
          <circle cx={x} cy={y} r="2.4" fill="#ff7723" stroke="#0f1a22" strokeWidth="0.8" />
        </g>
      ))}
    </svg>
  );
}
