import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: { label: string; href: string };
  className?: string;
  id?: string;
};

export function SectionHeader({ eyebrow, title, description, action, className, id }: Props) {
  return (
    <div className={cn("mb-8 flex flex-wrap items-end justify-between gap-4 md:mb-10", className)}>
      <div className="max-w-2xl">
        {eyebrow && (
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-primary">{eyebrow}</p>
        )}
        <h2 id={id} className="font-display text-4xl font-bold uppercase leading-none md:text-5xl">
          {title}
        </h2>
        {description && <p className="mt-3 text-base text-body">{description}</p>}
      </div>
      {action && (
        <Link
          href={action.href}
          className="group inline-flex items-center gap-1.5 text-sm font-semibold text-secondary hover:text-primary"
        >
          {action.label}
          <ArrowRight className="size-4 text-primary transition-transform group-hover:translate-x-0.5" aria-hidden />
        </Link>
      )}
    </div>
  );
}
