"use client";

import { CalendarDays, ChevronDown, Crown, Flag, MapPin, Medal, Trophy, Users, type LucideIcon } from "lucide-react";
import { useMemo, useState, type ReactNode } from "react";
import { EmptyState } from "@/components/shared/EmptyState";
import { SmartImage } from "@/components/shared/SmartImage";
import { ClubBadge } from "@/features/clubs/components/directory/ClubBadge";
import { cn } from "@/lib/utils";
import type { Board, LeaderEntry } from "../data";
import { AchievementBadge } from "./AchievementBadge";

const tabIcons: Record<string, LucideIcon> = { riders: Users, clubs: Medal, monthly: Flag, contributors: Trophy };

/** Rider photo or club crest */
function EntryAvatar({ entry, className }: { entry: LeaderEntry; className?: string }) {
  if (entry.avatar)
    return (
      <span className={cn("relative shrink-0 overflow-hidden rounded-full", className)}>
        <SmartImage src={entry.avatar} alt="" fill sizes="120px" className="object-cover" />
      </span>
    );
  return <ClubBadge club={{ name: entry.name, logo: entry.logo ?? null }} className={cn("border-2", className)} />;
}

function Trend({ value }: { value: number }) {
  if (value === 0) return <span className="text-muted text-sm font-semibold">–</span>;
  const up = value > 0;
  return (
    <span className={cn("inline-flex items-center gap-1 text-sm font-semibold", up ? "text-[#1f9d5c]" : "text-primary-hover")}>
      <span aria-hidden>{up ? "▲" : "▼"}</span>
      {up ? `+${value}` : value}
      <span className="sr-only">{up ? "places up" : "places down"}</span>
    </span>
  );
}

/**
 * Tabs, region filter, podium and the "chasers" table. The sidebar is server-rendered
 * and passed in so it sits beside the board on large screens.
 */
export function LeaderboardBoard({ boards, lastUpdated, sidebar }: { boards: Board[]; lastUpdated: string; sidebar: ReactNode }) {
  const [boardId, setBoardId] = useState(boards[0].id);
  const [region, setRegion] = useState("");
  const board = boards.find((b) => b.id === boardId) ?? boards[0];

  const regions = useMemo(() => [...new Set(boards.flatMap((b) => b.entries.map((e) => e.state)))].sort(), [boards]);
  const ranked = useMemo(
    () => board.entries.filter((e) => !region || e.state === region).sort((a, b) => b.points - a.points),
    [board, region],
  );
  const podium = ranked.slice(0, 3);
  const chasers = ranked.slice(3);

  return (
    <>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div role="tablist" aria-label="Leaderboards" className="no-scrollbar border-border -mx-4 flex overflow-x-auto border-b px-4 sm:mx-0 sm:px-0 lg:border-b-0">
          {boards.map((b) => {
            const Icon = tabIcons[b.id] ?? Trophy;
            const selected = b.id === board.id;
            return (
              <button
                key={b.id}
                type="button"
                role="tab"
                id={`board-tab-${b.id}`}
                aria-selected={selected}
                aria-controls="board-panel"
                onClick={() => setBoardId(b.id)}
                className={cn(
                  "relative inline-flex shrink-0 items-center gap-2 px-6 py-4 text-sm font-semibold transition-colors",
                  selected
                    ? "text-ink after:bg-primary after:absolute after:inset-x-4 after:bottom-0 after:h-0.5 after:rounded-full"
                    : "text-body hover:text-primary",
                )}
              >
                <Icon className={cn("size-4.5", selected && "text-primary")} aria-hidden /> {b.label}
              </button>
            );
          })}
        </div>
        <div className="flex items-center gap-5">
          <p className="text-muted flex items-center gap-2.5 text-xs">
            <CalendarDays className="text-ink size-5" aria-hidden />
            <span>
              Last Updated
              <br />
              <span className="text-ink font-medium">{lastUpdated}</span>
            </span>
          </p>
          <label className="relative">
            <span className="sr-only">Region</span>
            <MapPin className="text-ink pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" aria-hidden />
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="border-border text-ink focus:border-secondary rounded-btn h-11 min-w-[170px] cursor-pointer appearance-none border bg-white pr-9 pl-9 text-sm outline-none"
            >
              <option value="">All India</option>
              {regions.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
            <ChevronDown className="text-ink pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2" aria-hidden />
          </label>
        </div>
      </div>

      <div className="mt-6 grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_340px] xl:grid-cols-[minmax(0,1fr)_380px]">
        <div id="board-panel" role="tabpanel" aria-labelledby={`board-tab-${board.id}`} className="min-w-0">
          {ranked.length === 0 ? (
            <EmptyState title="No one on this board yet" description="Pick another region to see who's leading." />
          ) : (
            <>
              <Podium entries={podium} unit={board.unit} />
              {chasers.length > 0 && <Chasers entries={chasers} unit={board.unit} kind={board.id === "riders" || board.id === "contributors" ? "Rider" : "Club"} />}
            </>
          )}
        </div>
        <aside className="flex flex-col gap-5" aria-label="Leaderboard extras">
          {sidebar}
        </aside>
      </div>
    </>
  );
}

/* ---------- Podium ---------- */

const places = [
  { label: "1st", crown: "bg-[#f2b230] text-white", card: "bg-primary-tint ring-primary/20 sm:-mt-6 sm:pb-10", avatar: "size-24 ring-[#f2b230]" },
  { label: "2nd", crown: "bg-muted text-white", card: "bg-white", avatar: "size-20 ring-border" },
  { label: "3rd", crown: "bg-primary text-white", card: "bg-white", avatar: "size-20 ring-primary/40" },
];

function Podium({ entries, unit }: { entries: LeaderEntry[]; unit: string }) {
  // Visual order 2nd · 1st · 3rd once side by side; reading order stays 1st, 2nd, 3rd
  const order = ["sm:order-2", "sm:order-1", "sm:order-3"];
  return (
    <ol className="grid gap-4 sm:grid-cols-3 sm:pt-6" aria-label="Top 3">
      {entries.map((e, i) => {
        const p = places[i];
        return (
          <li
            key={e.id}
            className={cn("rounded-card border-border shadow-card relative flex flex-col items-center border px-4 pt-6 pb-6 text-center ring-1 ring-transparent", p.card, order[i])}
          >
            <span className={cn("absolute top-4 left-4 grid size-9 place-items-center rounded-full", p.crown)} title={`${p.label} place`}>
              <Crown className="size-4.5" aria-hidden />
              <span className="sr-only">{p.label} place</span>
            </span>
            <EntryAvatar entry={e} className={cn("ring-4 ring-offset-2", p.avatar)} />
            <h3 className="font-jakarta text-ink mt-4 text-lg font-semibold">{e.name}</h3>
            <p className="text-muted mt-1 flex items-center gap-1 text-xs">
              <MapPin className="text-primary size-3.5" aria-hidden /> {e.city}, {e.state}
            </p>
            <p className={cn("font-display text-ink mt-4 leading-none font-bold", i === 0 ? "text-5xl" : "text-4xl")}>{e.points}</p>
            <p className="text-muted mt-1 text-xs">{unit}</p>
            <ul className="mt-4 flex flex-wrap justify-center gap-1.5">
              <li className="bg-secondary-tint text-secondary rounded-full px-2.5 py-1 text-[11px] font-semibold">{e.tags[0]}</li>
              <li className="bg-page text-ink rounded-full px-2.5 py-1 text-[11px] font-semibold">{e.tags[1]}</li>
            </ul>
          </li>
        );
      })}
    </ol>
  );
}

/* ---------- Chasers ---------- */

function Chasers({ entries, unit, kind }: { entries: LeaderEntry[]; unit: string; kind: string }) {
  return (
    <section aria-labelledby="chasers-title" className="mt-12">
      <h2 id="chasers-title" className="font-display text-ink text-3xl font-bold uppercase">
        The Chasers
      </h2>
      <p className="mt-1 text-sm">{kind === "Rider" ? "Riders" : "Clubs"} who are making big moves this month.</p>

      {/* relative: keeps the absolutely positioned sr-only labels inside the scroll area */}
      <div className="rounded-card border-border relative mt-5 overflow-x-auto border bg-white">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="text-muted border-border border-b text-xs font-semibold tracking-wide uppercase">
            <tr>
              <th scope="col" className="py-3.5 pr-2 pl-5">
                #
              </th>
              <th scope="col" className="px-3 py-3.5">
                {kind}
              </th>
              <th scope="col" className="px-3 py-3.5">
                Location
              </th>
              <th scope="col" className="px-3 py-3.5">
                <span className="sr-only">{unit}</span>
                <span aria-hidden>Points</span>
              </th>
              <th scope="col" className="px-3 py-3.5">
                Trend
              </th>
              <th scope="col" className="py-3.5 pr-5 pl-3">
                Badges
              </th>
            </tr>
          </thead>
          <tbody className="divide-border divide-y">
            {entries.map((e, i) => (
              <tr key={e.id} className="hover:bg-page/60 transition-colors">
                <td className="text-ink py-3.5 pr-2 pl-5 font-semibold">{String(i + 4).padStart(2, "0")}</td>
                <td className="px-3 py-3.5">
                  <span className="flex items-center gap-3">
                    <EntryAvatar entry={e} className="size-9" />
                    <span className="text-ink font-semibold">{e.name}</span>
                  </span>
                </td>
                <td className="text-body px-3 py-3.5">
                  {e.city}, {e.state}
                </td>
                <td className="text-ink px-3 py-3.5 font-semibold">{e.points}</td>
                <td className="px-3 py-3.5">
                  <Trend value={e.trend} />
                </td>
                <td className="py-3.5 pr-5 pl-3">
                  <span className="flex gap-2">
                    {e.badges.map((b) => (
                      <AchievementBadge key={b} badge={b} />
                    ))}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
