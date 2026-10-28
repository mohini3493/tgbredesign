import Link from "next/link";
import { footerColumns, socialLinks } from "@/config/site";
import { socialIconMap } from "@/components/shared/BrandIcons";
import { StoreBadges } from "@/components/shared/StoreBadges";
import { Container } from "./Container";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="bg-page text-body border-border border-t pb-24 md:pb-0">
      <Container className="grid grid-cols-1 gap-10 pt-12 pb-8 sm:grid-cols-2 lg:grid-cols-[1.4fr_repeat(4,1fr)] lg:gap-8 lg:pt-14">
        <div className="sm:col-span-2 lg:col-span-1">
          <Logo className="[&_img]:h-12 md:[&_img]:h-14" />
          <p className="mt-5 max-w-[330px] text-sm leading-relaxed">
            India&apos;s largest motorcycling community. Discover routes, riders, clubs and events —
            and ride together.
          </p>
          <ul className="mt-5 -ml-2 flex gap-1" aria-label="Social media">
            {socialLinks.map((s) => {
              const Icon = socialIconMap[s.icon];
              return (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="text-primary grid size-9 place-items-center rounded-full transition-colors hover:bg-white"
                  >
                    <Icon className="size-4" />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        {footerColumns.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <h3 className="text-ink/70 text-xs font-medium tracking-wider uppercase">
              {col.title}
            </h3>
            <ul className="mt-5 space-y-3.5">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-primary text-sm transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <div>
          <h3 className="text-ink/70 text-xs font-medium tracking-wider uppercase">Get the app</h3>
          <StoreBadges className="mt-5 flex-col" />
        </div>
      </Container>

      <Container className="flex flex-col gap-3 pb-8 text-sm sm:flex-row sm:items-center sm:justify-between">
        <p>© {COPYRIGHT_YEAR} The Good Biker. All rights reserved.</p>
        <div className="flex gap-10">
          <Link href="/terms" className="hover:text-primary transition-colors">
            Terms of Use
          </Link>
          <Link href="/privacy" className="hover:text-primary transition-colors">
            Privacy Policy
          </Link>
        </div>
      </Container>
    </footer>
  );
}

// Static on purpose: new Date() would make the footer dynamic under Cache Components.
const COPYRIGHT_YEAR = 2026;
