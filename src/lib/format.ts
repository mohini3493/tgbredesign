const compact = new Intl.NumberFormat("en-IN", { notation: "compact", maximumFractionDigits: 1 });
const inr = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });

/** 42000 -> "42K" */
export function formatCompact(value: number): string {
  return compact.format(value).replace("T", "K");
}

/** 490 -> "490 km", 42000 -> "42K km" */
export function formatKm(value: number): string {
  return value >= 10000 ? `${formatCompact(value)} km` : `${value.toLocaleString("en-IN")} km`;
}

/** 1499 -> "₹1,499" */
export function formatINR(value: number): string {
  return inr.format(value);
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** Parse "YYYY-MM-DD" without timezone drift. */
function parts(iso: string) {
  const [y, m, d] = iso.slice(0, 10).split("-").map(Number);
  return { y, m: m - 1, d };
}

/** ("2026-12-06","2026-12-08") -> "06 – 08 Dec 2026" */
export function formatDateRange(startIso: string, endIso: string): string {
  const s = parts(startIso);
  const e = parts(endIso);
  const dd = (n: number) => String(n).padStart(2, "0");
  if (s.y === e.y && s.m === e.m) return `${dd(s.d)} – ${dd(e.d)} ${MONTHS[e.m]} ${e.y}`;
  if (s.y === e.y) return `${dd(s.d)} ${MONTHS[s.m]} – ${dd(e.d)} ${MONTHS[e.m]} ${e.y}`;
  return `${dd(s.d)} ${MONTHS[s.m]} ${s.y} – ${dd(e.d)} ${MONTHS[e.m]} ${e.y}`;
}

/** "2026-12-06" -> { day: "06", month: "DEC" } */
export function dateBlock(iso: string) {
  const { m, d } = parts(iso);
  return { day: String(d).padStart(2, "0"), month: MONTHS[m].toUpperCase() };
}
