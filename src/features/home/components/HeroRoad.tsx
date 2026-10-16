"use client";

import { useReducedMotion } from "framer-motion";

/**
 * Animated route scene: a winding road whose centre markings scroll,
 * a rider travelling along it (SVG animateMotion) with a glowing orange trail,
 * and pulsing waypoints. Pure SVG — scales with the viewBox, no JS per frame.
 */
const ROAD =
  "M -40 400 C 160 380, 250 270, 410 280 S 620 380, 760 270 S 900 90, 1060 70";
const DURATION = "11s";

export function HeroRoad({ className }: { className?: string }) {
  const reduce = useReducedMotion();

  return (
    <svg viewBox="0 0 1000 440" preserveAspectRatio="xMaxYMax meet" className={className} aria-hidden>
      <defs>
        <linearGradient id="trail" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="#ff7723" stopOpacity="0" />
          <stop offset="100%" stopColor="#ff7723" />
        </linearGradient>
        <linearGradient id="roadEdge" x1="0" x2="1">
          <stop offset="0%" stopColor="#4b98bf" stopOpacity="0" />
          <stop offset="45%" stopColor="#4b98bf" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#4b98bf" stopOpacity="0.15" />
        </linearGradient>
        <filter id="soft" x="-50%" y="-200%" width="200%" height="500%">
          <feGaussianBlur stdDeviation="2" />
        </filter>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Road body + edges */}
      <path d={ROAD} stroke="rgba(15,26,34,0.45)" strokeWidth="34" fill="none" strokeLinecap="round" />
      <path d={ROAD} stroke="url(#roadEdge)" strokeWidth="36" fill="none" strokeOpacity="0.5" strokeDasharray="1 0" style={{ mixBlendMode: "screen" }} />
      <path d={ROAD} stroke="rgba(15,26,34,0.55)" strokeWidth="30" fill="none" />

      {/* Scrolling centre markings */}
      <path d={ROAD} stroke="rgba(255,255,255,0.55)" strokeWidth="2.5" fill="none" strokeDasharray="16 18">
        {!reduce && <animate attributeName="stroke-dashoffset" from="0" to="-68" dur="0.9s" repeatCount="indefinite" />}
      </path>

      {/* Glowing trail that ends at the rider */}
      <path
        d={ROAD}
        pathLength={1000}
        stroke="#ff7723"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
        strokeDasharray="140 1000"
        strokeDashoffset={reduce ? -500 : 140}
        filter="url(#glow)"
      >
        {!reduce && (
          <animate attributeName="stroke-dashoffset" from="140" to="-860" dur={DURATION} repeatCount="indefinite" />
        )}
      </path>

      {/* Waypoints */}
      {[
        { x: 410, y: 280, label: "Sarchu" },
        { x: 760, y: 270, label: "Khardung La" },
      ].map((w, i) => (
        <g key={w.label} transform={`translate(${w.x} ${w.y})`}>
          <circle r="7" fill="#4b98bf" stroke="#fff" strokeWidth="2.5" />
          {!reduce && (
            <circle r="7" fill="none" stroke="#4b98bf" strokeWidth="2">
              <animate attributeName="r" from="7" to="26" dur="2.2s" begin={`${i * 1.1}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" from="0.9" to="0" dur="2.2s" begin={`${i * 1.1}s`} repeatCount="indefinite" />
            </circle>
          )}
          <g transform="translate(-44 -48)">
            <rect width="88" height="26" rx="13" fill="rgba(15,26,34,0.7)" stroke="rgba(255,255,255,0.18)" />
            <text x="44" y="17.5" textAnchor="middle" fontSize="12" fontWeight="600" fill="#fff" fontFamily="Inter Variable, sans-serif">
              {w.label}
            </text>
          </g>
        </g>
      ))}

      {/* Rider travelling along the road */}
      <g>
        {reduce ? (
          <g transform="translate(560 330)">
            <Rider />
          </g>
        ) : (
          <g>
            <animateMotion dur={DURATION} repeatCount="indefinite" rotate="auto" path={ROAD} />
            <Rider />
          </g>
        )}
      </g>
    </svg>
  );
}

function Rider() {
  // Line-art motorcycle (same mark as MotorcycleIcon), centred on the road
  return (
    <g transform="translate(-30 -46) scale(2.5)">
      <ellipse cx="12" cy="17" rx="11" ry="4" fill="#ff7723" opacity="0.28" filter="url(#soft)" />
      <g fill="none" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="5" cy="16.5" r="3.2" />
        <circle cx="19" cy="16.5" r="3.2" />
        <path d="M5 16.5l2.3-5" />
        <path d="M5.8 11.5h4.4l1.3-1.6h3.3c.9 0 1.6.6 1.8 1.4l.3 1" />
        <path d="M19 16.5l-2.9-7.4" />
        <path d="M14.8 7.6l1.3 1.5 2-.3" />
        <path d="M9.5 13.2h4.3l-1.2 3.3h-2.7z" stroke="#ff7723" />
        <path d="M13.8 13.2l2.6-.9" />
        <path d="M8.6 18.4h3.6" />
      </g>
      {/* spinning spokes */}
      {[5, 19].map((cx) => (
        <g key={cx} transform={`translate(${cx} 16.5)`}>
          <path d="M-2.4 0H2.4M0 -2.4V2.4" stroke="#4b98bf" strokeWidth="0.8" strokeLinecap="round">
            <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="0.5s" repeatCount="indefinite" />
          </path>
        </g>
      ))}
      {/* headlight beam */}
      <path d="M20.5 9.5 L30 7 L30 12 Z" fill="#ff7723" opacity="0.35" />
    </g>
  );
}
