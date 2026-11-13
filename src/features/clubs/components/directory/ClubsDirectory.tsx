"use client";

import {
  ArrowDownUp,
  BadgeCheck,
  Bike,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  List,
  MapPin,
  Search,
  SlidersHorizontal,
  Target,
  Users,
  type LucideIcon,
} from "lucide-react";
import { useMemo, useRef, useState, type ReactNode } from "react";
import { EmptyState } from "@/components/shared/EmptyState";
import { SmartImage } from "@/components/shared/SmartImage";
import { ButtonLink } from "@/components/ui/button";
import { AppPromptZone } from "@/features/home/components/AppPrompt";
import { cn } from "@/lib/utils";
import type { ClubListing } from "../../schemas";
import { ClubListingCard, clubLocation } from "./ClubListingCard";

const PAGE_SIZE = 9;

const sizes = [
  { id: "xs", label: "1 – 25 Members", min: 1, max: 25 },
  { id: "s", label: "26 – 100 Members", min: 26, max: 100 },
  { id: "m", label: "101 – 250 Members", min: 101, max: 250 },
  { id: "l", label: "250+ Members", min: 251, max: Infinity },
] as const;

const sorts = {
  active: { label: "Most Active", compare: (a: ClubListing, b: ClubListing) => b.rideCount - a.rideCount },
  members: { label: "Most Members", compare: (a: ClubListing, b: ClubListing) => b.memberCount - a.memberCount },
  name: { label: "Name (A–Z)", compare: (a: ClubListing, b: ClubListing) => a.name.localeCompare(b.name) },
} as const;
type SortKey = keyof typeof sorts;

type Filters = {
  query: string;
  location: string;
  type: string;
  focus: string;
  bikeType: string;
  sizes: string[];
  sort: SortKey;
  verifiedOnly: boolean;
  openOnly: boolean;
};

const initialFilters: Filters = {
  query: "",
  location: "",
  type: "",
  focus: "",
  bikeType: "",
  sizes: [],
  sort: "active",
  verifiedOnly: false,
  openOnly: false,
};

const unique = (values: string[]) => [...new Set(values)].sort((a, b) => a.localeCompare(b));

/** Searchable, filterable club directory. All clubs arrive from the server; filtering is instant on the client. */
export function ClubsDirectory({ clubs }: { clubs: ClubListing[] }) {
  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [page, setPage] = useState(1);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [moreOpen, setMoreOpen] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  const options = useMemo(
    () => ({
      locations: unique(clubs.map(clubLocation)),
      types: unique(clubs.map((c) => c.type)),
      focus: unique(clubs.flatMap((c) => c.tags)),
      bikeTypes: unique(clubs.map((c) => c.bikeType)),
    }),
    [clubs],
  );

  const results = useMemo(() => {
    const q = filters.query.trim().toLowerCase();
    const picked = sizes.filter((s) => filters.sizes.includes(s.id));
    return clubs
      .filter(
        (c) =>
          (!q || [c.name, c.city, c.state, c.description, ...c.tags].some((v) => v.toLowerCase().includes(q))) &&
          (!filters.location || clubLocation(c) === filters.location) &&
          (!filters.type || c.type === filters.type) &&
          (!filters.focus || c.tags.includes(filters.focus)) &&
          (!filters.bikeType || c.bikeType === filters.bikeType) &&
          (!picked.length || picked.some((s) => c.memberCount >= s.min && c.memberCount <= s.max)) &&
          (!filters.verifiedOnly || c.verified) &&
          (!filters.openOnly || !c.membershipRequired),
      )
      .sort(sorts[filters.sort].compare);
  }, [clubs, filters]);

  const pages = Math.max(1, Math.ceil(results.length / PAGE_SIZE));
  const current = Math.min(page, pages);
  const visible = results.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);
  const dirty = JSON.stringify(filters) !== JSON.stringify(initialFilters);

  // Any filter change goes back to page 1
  const update = <K extends keyof Filters>(key: K, value: Filters[K]) => {
    setFilters((f) => ({ ...f, [key]: value }));
    setPage(1);
  };
  const toggleSize = (id: string) =>
    update("sizes", filters.sizes.includes(id) ? filters.sizes.filter((s) => s !== id) : [...filters.sizes, id]);
  const goTo = (p: number) => {
    setPage(p);
    resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="grid lg:grid-cols-[300px_minmax(0,1fr)]">
      {/* ---------- Filters ---------- */}
      <div className="border-border bg-page/60 border-b p-5 lg:border-r lg:border-b-0 lg:p-6">
        <button
          type="button"
          onClick={() => setMobileFiltersOpen((o) => !o)}
          aria-expanded={mobileFiltersOpen}
          aria-controls="club-filters"
          className="border-border text-ink flex w-full items-center justify-between rounded-btn border bg-white px-4 py-3 text-sm font-semibold lg:hidden"
        >
          <span className="inline-flex items-center gap-2">
            <SlidersHorizontal className="size-4" aria-hidden /> Filters
          </span>
          <ChevronDown className={cn("size-4 transition-transform", mobileFiltersOpen && "rotate-180")} aria-hidden />
        </button>

        <form
          id="club-filters"
          role="search"
          aria-label="Filter clubs"
          onSubmit={(e) => e.preventDefault()}
          className={cn("mt-5 lg:mt-0 lg:block", mobileFiltersOpen ? "block" : "hidden")}
        >
          <div className="flex items-center justify-between">
            <h2 className="text-ink text-sm font-bold tracking-[0.08em] uppercase">Filters</h2>
            <button
              type="button"
              disabled={!dirty}
              onClick={() => {
                setFilters(initialFilters);
                setPage(1);
              }}
              className="text-primary hover:text-primary-hover text-sm font-semibold disabled:opacity-40"
            >
              Clear all
            </button>
          </div>

          <Field label="Search" htmlFor="club-search">
            <div className="relative">
              <input
                id="club-search"
                type="search"
                value={filters.query}
                onChange={(e) => update("query", e.target.value)}
                placeholder="Search clubs..."
                className="border-border text-ink placeholder:text-muted focus:border-secondary h-11 w-full rounded-btn border bg-white pr-10 pl-3.5 text-sm outline-none"
              />
              <Search className="text-ink pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2" aria-hidden />
            </div>
          </Field>

          <SelectField id="club-location" label="Location" icon={MapPin} value={filters.location} onChange={(v) => update("location", v)} allLabel="All Cities" options={options.locations} />
          <SelectField id="club-type" label="Club Type" icon={Users} value={filters.type} onChange={(v) => update("type", v)} allLabel="All Types" options={options.types} />
          <SelectField id="club-focus" label="Focus" icon={Target} value={filters.focus} onChange={(v) => update("focus", v)} allLabel="All Focus Areas" options={options.focus} />
          <SelectField id="club-bike" label="Bike Type" icon={Bike} value={filters.bikeType} onChange={(v) => update("bikeType", v)} allLabel="All Bike Types" options={options.bikeTypes} />

          <fieldset className="mt-6">
            <legend className="text-ink mb-3 text-xs font-bold tracking-[0.08em] uppercase">Club Size</legend>
            <div className="space-y-2.5">
              {sizes.map((s) => (
                <Checkbox key={s.id} checked={filters.sizes.includes(s.id)} onChange={() => toggleSize(s.id)}>
                  {s.label}
                </Checkbox>
              ))}
            </div>
          </fieldset>

          <SelectField
            id="club-sort"
            label="Sort By"
            icon={ArrowDownUp}
            value={filters.sort}
            onChange={(v) => update("sort", v as SortKey)}
            options={Object.entries(sorts).map(([value, s]) => ({ value, label: s.label }))}
          />

          <button
            type="button"
            onClick={() => setMoreOpen((o) => !o)}
            aria-expanded={moreOpen}
            aria-controls="club-more-filters"
            className="border-ink/70 text-ink hover:border-primary hover:text-primary mt-6 flex h-11 w-full items-center justify-center gap-2 rounded-btn border bg-white text-sm font-semibold transition-colors"
          >
            <SlidersHorizontal className="size-4" aria-hidden /> {moreOpen ? "Fewer Filters" : "More Filters"}
          </button>
          {moreOpen && (
            <div id="club-more-filters" className="mt-4 space-y-2.5">
              <Checkbox checked={filters.verifiedOnly} onChange={() => update("verifiedOnly", !filters.verifiedOnly)}>
                <span className="inline-flex items-center gap-1.5">
                  Verified clubs only <BadgeCheck className="text-primary size-4" aria-hidden />
                </span>
              </Checkbox>
              <Checkbox checked={filters.openOnly} onChange={() => update("openOnly", !filters.openOnly)}>
                Open to everyone
              </Checkbox>
            </div>
          )}
        </form>

        <StartClubCard className="mt-8 hidden lg:block" />
      </div>

      {/* ---------- Results ---------- */}
      <div ref={resultsRef} className="scroll-mt-28 p-5 lg:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="font-display text-ink text-2xl font-bold uppercase">Active Clubs</span>
            <BadgeCheck className="text-primary size-5" aria-hidden />
            <span className="text-muted text-sm font-normal" aria-live="polite">
              {results.length} {results.length === 1 ? "Club" : "Clubs"} Found
            </span>
          </h2>
          <div className="flex items-center gap-1.5" role="group" aria-label="Layout">
            <span className="text-ink mr-1.5 text-sm">View</span>
            <ViewButton label="Grid view" active={view === "grid"} onClick={() => setView("grid")} icon={LayoutGrid} />
            <ViewButton label="List view" active={view === "list"} onClick={() => setView("list")} icon={List} />
          </div>
        </div>

        {visible.length ? (
          // Club pages aren't built yet: card links open the app download popup
          <AppPromptZone>
            <ul className={cn("mt-5 grid gap-5", view === "grid" ? "sm:grid-cols-2 xl:grid-cols-3" : "grid-cols-1")}>
              {visible.map((club) => (
                <li key={club.id}>
                  <ClubListingCard club={club} layout={view} />
                </li>
              ))}
            </ul>
          </AppPromptZone>
        ) : (
          <div className="mt-5">
            <EmptyState title="No clubs match those filters" description="Try another city or focus, or clear the filters to see every club." />
          </div>
        )}

        {pages > 1 && <Pagination page={current} pages={pages} onChange={goTo} />}

        <StartClubCard className="mt-8 lg:hidden" />
      </div>
    </div>
  );
}

/* ---------- Bits ---------- */

function Field({ label, htmlFor, children }: { label: string; htmlFor: string; children: ReactNode }) {
  return (
    <div className="mt-6">
      <label htmlFor={htmlFor} className="text-ink mb-2 block text-xs font-bold tracking-[0.08em] uppercase">
        {label}
      </label>
      {children}
    </div>
  );
}

function SelectField({
  id,
  label,
  icon: Icon,
  value,
  onChange,
  allLabel,
  options,
}: {
  id: string;
  label: string;
  icon: LucideIcon;
  value: string;
  onChange: (value: string) => void;
  allLabel?: string;
  options: (string | { value: string; label: string })[];
}) {
  return (
    <Field label={label} htmlFor={id}>
      <div className="relative">
        <Icon className="text-ink pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2" aria-hidden />
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="border-border text-ink focus:border-secondary h-11 w-full cursor-pointer appearance-none rounded-btn border bg-white pr-10 pl-10 text-sm outline-none"
        >
          {allLabel && <option value="">{allLabel}</option>}
          {options.map((o) => {
            const opt = typeof o === "string" ? { value: o, label: o } : o;
            return (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            );
          })}
        </select>
        <ChevronDown className="text-ink pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2" aria-hidden />
      </div>
    </Field>
  );
}

function Checkbox({ checked, onChange, children }: { checked: boolean; onChange: () => void; children: ReactNode }) {
  return (
    <label className="text-ink flex cursor-pointer items-center gap-3 text-sm">
      <input type="checkbox" checked={checked} onChange={onChange} className="accent-primary border-border size-4.5 cursor-pointer rounded" />
      {children}
    </label>
  );
}

function ViewButton({ label, active, onClick, icon: Icon }: { label: string; active: boolean; onClick: () => void; icon: LucideIcon }) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={active}
      onClick={onClick}
      className={cn("grid size-9 place-items-center rounded-[10px] transition-colors", active ? "bg-primary-tint text-primary" : "text-ink hover:text-primary")}
    >
      <Icon className="size-5" />
    </button>
  );
}

function Pagination({ page, pages, onChange }: { page: number; pages: number; onChange: (page: number) => void }) {
  const btn = "grid size-9 place-items-center rounded-[10px] text-sm font-semibold transition-colors";
  return (
    <nav aria-label="Club pages" className="mt-8 flex items-center justify-center gap-1.5">
      <button type="button" aria-label="Previous page" disabled={page === 1} onClick={() => onChange(page - 1)} className={cn(btn, "text-ink hover:text-primary disabled:opacity-30")}>
        <ChevronLeft className="size-4" />
      </button>
      {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
        <button
          key={p}
          type="button"
          onClick={() => onChange(p)}
          aria-current={p === page ? "page" : undefined}
          className={cn(btn, p === page ? "bg-primary text-white" : "text-ink hover:bg-page")}
        >
          {p}
        </button>
      ))}
      <button type="button" aria-label="Next page" disabled={page === pages} onClick={() => onChange(page + 1)} className={cn(btn, "text-ink hover:text-primary disabled:opacity-30")}>
        <ChevronRight className="size-4" />
      </button>
    </nav>
  );
}

function StartClubCard({ className }: { className?: string }) {
  return (
    <aside aria-labelledby="start-club-title" className={cn("rounded-card bg-primary-tint relative isolate overflow-hidden", className)}>
      <div className="p-6 pb-0">
        <h2 id="start-club-title" className="font-jakarta text-ink text-2xl leading-tight font-semibold">
          Can&apos;t find a club that fits?
        </h2>
        <p className="text-body mt-3 text-sm">Start your own club and build your tribe.</p>
        {/* Club creation lives in the app for now */}
        <AppPromptZone className="mt-5 inline-flex">
          <ButtonLink href="/clubs/new">Start Your Club</ButtonLink>
        </AppPromptZone>
      </div>
      <div className="relative -mt-4 h-40">
        <SmartImage
          src="https://images.unsplash.com/photo-1758090524309-199d4588e225?w=700&q=75&auto=format&fit=crop"
          alt=""
          fill
          sizes="300px"
          className="-z-10 object-cover object-[50%_60%] [mask-image:linear-gradient(180deg,transparent_0%,#000_45%)]"
        />
      </div>
    </aside>
  );
}
