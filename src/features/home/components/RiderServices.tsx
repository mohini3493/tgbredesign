import Link from "next/link";
import { ArrowRight, BookOpen, GraduationCap, KeyRound, ShoppingBag, Wrench } from "lucide-react";
import { riderServices } from "@/config/site";
import { SmartImage } from "@/components/shared/SmartImage";

const icons = {
  garage: Wrench,
  rentals: KeyRound,
  accessories: ShoppingBag,
  schools: GraduationCap,
  blog: BookOpen,
} as const;

export function RiderServices() {
  return (
    <ul className="no-scrollbar -mx-4 flex snap-x gap-4 overflow-x-auto px-4 pb-2 md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0 lg:grid-cols-5">
      {riderServices.map((s) => {
        const Icon = icons[s.key];
        return (
          <li key={s.key} className="w-[70%] shrink-0 snap-start sm:w-[45%] md:w-auto">
            <Link
              href={s.href}
              className="group flex h-full flex-col overflow-hidden rounded-card border border-border bg-white shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-card-hover"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-deep">
                <SmartImage src={s.image} alt="" fill sizes="(min-width: 1024px) 20vw, 70vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <span className="grid size-10 place-items-center rounded-btn bg-secondary-tint text-secondary">
                  <Icon className="size-5" aria-hidden />
                </span>
                <h3 className="mt-4 text-lg font-bold">{s.title}</h3>
                <p className="mt-1 flex-1 text-sm text-body">{s.description}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                  Explore <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                </span>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
