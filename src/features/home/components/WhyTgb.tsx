import { Compass, HeartHandshake, Quote, ShieldCheck, Sparkles } from "lucide-react";
import { valueProps } from "@/config/site";
import { Carousel } from "@/components/shared/Carousel";
import { SmartImage } from "@/components/shared/SmartImage";
import { Skeleton } from "@/components/ui/skeleton";
import { testimonialsService } from "@/features/testimonials/services";

const icons = {
  community: HeartHandshake,
  routes: Compass,
  marketplace: ShieldCheck,
  allinone: Sparkles,
} as const;

export function ValueProps() {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {valueProps.map((v) => {
        const Icon = icons[v.key];
        return (
          <li key={v.key} className="rounded-card border-border border bg-white p-6">
            <span className="bg-secondary-tint text-secondary grid size-12 place-items-center rounded-full">
              <Icon className="size-6" strokeWidth={1.75} aria-hidden />
            </span>
            <h3 className="mt-4 text-base font-bold">{v.title}</h3>
            <p className="text-body mt-1 text-sm">{v.description}</p>
          </li>
        );
      })}
    </ul>
  );
}

// 5 visible on desktop, 3 on tablet, ~1 on mobile (gap: 16px mobile, 24px md+)
const slide = "w-[85%] shrink-0 snap-start sm:w-[calc(33.333%-16px)] lg:w-[calc(20%-19.2px)]";

function initials(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

export async function Testimonials() {
  const items = await testimonialsService.getFeatured();
  return (
    <Carousel label="Rider testimonials" autoplay={3500}>
      {items.map((t) => (
        <figure
          key={t.id}
          className={`${slide} rounded-card shadow-card flex flex-col bg-white p-6`}
        >
          <Quote className="text-primary size-7" aria-hidden />
          <blockquote className="text-ink mt-3 flex-1 text-[15px] leading-relaxed">
            “{t.quote}”
          </blockquote>
          <figcaption className="mt-5 flex items-center gap-3">
            <span className="bg-secondary-tint relative grid size-10 shrink-0 place-items-center overflow-hidden rounded-full">
              {t.avatar ? (
                <SmartImage src={t.avatar} alt="" fill sizes="40px" className="object-cover" />
              ) : (
                <span className="text-secondary text-xs font-bold">{initials(t.name)}</span>
              )}
            </span>
            <span className="min-w-0">
              <span className="text-ink block truncate text-sm font-bold">{t.name}</span>
              <span className="text-muted block truncate text-xs">{t.city}</span>
            </span>
          </figcaption>
        </figure>
      ))}
    </Carousel>
  );
}

export function TestimonialsSkeleton() {
  return (
    <div className="flex gap-4 overflow-hidden md:gap-6">
      {Array.from({ length: 5 }, (_, i) => (
        <Skeleton key={i} className={`${slide} h-64`} />
      ))}
    </div>
  );
}
