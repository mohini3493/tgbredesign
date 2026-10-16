import { Compass, HeartHandshake, Quote, ShieldCheck, Sparkles } from "lucide-react";
import { valueProps } from "@/config/site";
import { SmartImage } from "@/components/shared/SmartImage";
import { Skeleton } from "@/components/ui/skeleton";
import { testimonialsService } from "@/features/testimonials/services";

const icons = { community: HeartHandshake, routes: Compass, marketplace: ShieldCheck, allinone: Sparkles } as const;

export function ValueProps() {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {valueProps.map((v) => {
        const Icon = icons[v.key];
        return (
          <li key={v.key} className="rounded-card border border-border bg-white p-6">
            <span className="grid size-12 place-items-center rounded-full bg-secondary-tint text-secondary">
              <Icon className="size-6" strokeWidth={1.75} aria-hidden />
            </span>
            <h3 className="mt-4 text-base font-bold">{v.title}</h3>
            <p className="mt-1 text-sm text-body">{v.description}</p>
          </li>
        );
      })}
    </ul>
  );
}

export async function Testimonials() {
  const items = await testimonialsService.getFeatured();
  return (
    <ul className="mt-6 grid gap-4 md:grid-cols-3">
      {items.slice(0, 3).map((t) => (
        <li key={t.id}>
          <figure className="flex h-full flex-col rounded-card bg-white p-6 shadow-card">
            <Quote className="size-7 text-primary" aria-hidden />
            <blockquote className="mt-3 flex-1 text-[15px] leading-relaxed text-ink">“{t.quote}”</blockquote>
            <figcaption className="mt-5 flex items-center gap-3">
              <span className="relative size-10 overflow-hidden rounded-full bg-secondary-tint">
                <SmartImage src={t.avatar} alt="" fill sizes="40px" className="object-cover" />
              </span>
              <span>
                <span className="block text-sm font-bold text-ink">{t.name}</span>
                <span className="block text-xs text-muted">{t.city}</span>
              </span>
            </figcaption>
          </figure>
        </li>
      ))}
    </ul>
  );
}

export function TestimonialsSkeleton() {
  return (
    <div className="mt-6 grid gap-4 md:grid-cols-3">
      {Array.from({ length: 3 }, (_, i) => (
        <Skeleton key={i} className="h-52" />
      ))}
    </div>
  );
}
