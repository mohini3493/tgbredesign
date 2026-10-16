import Link from "next/link";
import { footerColumns, siteConfig, socialLinks } from "@/config/site";
import { NewsletterForm } from "@/features/newsletter/NewsletterForm";
import { socialIconMap } from "@/components/shared/BrandIcons";
import { Container } from "./Container";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="bg-deep pb-24 text-deep-text md:pb-0">
      <Container className="grid grid-cols-1 gap-12 py-16 lg:grid-cols-12">
        <div className="lg:col-span-4">
          {/* Logo sits on a white chip so its original colors stay true on the dark footer */}
          <div className="inline-flex rounded-btn bg-white px-3 py-2">
            <Logo />
          </div>
          <p className="mt-5 max-w-xs text-sm leading-relaxed">
            India&apos;s largest motorcycling community. Discover routes, riders, clubs and events — and
            ride together.
          </p>
          <ul className="mt-6 flex gap-2" aria-label="Social media">
            {socialLinks.map((s) => {
              const Icon = socialIconMap[s.icon];
              return (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="grid size-11 place-items-center rounded-full border border-white/15 transition-colors hover:border-primary hover:text-primary"
                  >
                    <Icon className="size-4.5" />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-8">
          {footerColumns.map((col) => (
            <div key={col.title}>
              <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-white">{col.title}</h3>
              <ul className="mt-4 space-y-3">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm transition-colors hover:text-primary">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <div className="border-t border-white/10 pt-10 lg:col-span-12">
          <NewsletterForm />
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-3 py-6 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>© {COPYRIGHT_YEAR} The Good Biker. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/terms" className="hover:text-primary">Terms of Use</Link>
            <Link href="/privacy" className="hover:text-primary">Privacy Policy</Link>
            <span className="text-deep-text/60">{siteConfig.tagline}</span>
          </div>
        </Container>
      </div>
    </footer>
  );
}

// Static on purpose: new Date() would make the footer dynamic under Cache Components.
const COPYRIGHT_YEAR = 2026;
