import Link from "next/link";
import {
  ArrowRight,
  BookOpenText,
  GraduationCap,
  Motorbike,
  ShoppingBag,
  Warehouse,
} from "lucide-react";
import { riderServices } from "@/config/site";
import { SmartImage } from "@/components/shared/SmartImage";

const icons = {
  garage: Warehouse,
  rentals: Motorbike,
  accessories: ShoppingBag,
  schools: GraduationCap,
  blog: BookOpenText,
} as const;

/**
 * Soft grey cards: outline icon, title, short copy and "Explore" on the left,
 * a cut-out product image anchored bottom-right.
 */
export function RiderServices() {
  return (
    <ul className="no-scrollbar -mx-4 flex snap-x gap-4 overflow-x-auto px-4 pb-2 md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0 lg:grid-cols-5">
      {riderServices.map((s) => {
        const Icon = icons[s.key];
        return (
          <li key={s.key} className="w-[80%] shrink-0 snap-start sm:w-[45%] md:w-auto">
            <Link
              href={s.href}
              className="group rounded-card bg-page hover:shadow-card-hover relative isolate flex h-full min-h-56 flex-col overflow-hidden p-5 transition duration-300 hover:-translate-y-1"
            >
              <Icon className="text-primary size-7" strokeWidth={1.5} aria-hidden />
              <h3 className="text-ink mt-5 text-lg font-bold">{s.title}</h3>
              <p className="text-body mt-2 max-w-[55%] flex-1 text-sm leading-relaxed">
                {s.description}
              </p>
              <span className="text-secondary mt-4 inline-flex items-center gap-1.5 text-sm font-semibold">
                Explore
                <ArrowRight
                  className="text-primary size-4 transition-transform group-hover:translate-x-0.5"
                  aria-hidden
                />
              </span>
              <div className="pointer-events-none absolute right-0 bottom-0 -z-10 h-[72%] w-[52%]">
                <SmartImage
                  src={s.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 10vw, 40vw"
                  className="object-contain object-right-bottom drop-shadow-[0_10px_14px_rgba(15,26,34,0.18)] transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
