"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { Bell, Download, Menu, Search, ShoppingBag, X } from "lucide-react";
import { features } from "@/config/features";
import { mainNav, siteConfig } from "@/config/site";
import { cartCount, useCart } from "@/features/shop/store/cart";
import { buttonVariants, ButtonLink } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Container } from "./Container";
import { Logo } from "./Logo";

/**
 * @param overlay  Transparent header that floats over a full-bleed hero (homepage).
 *                 Turns solid white once the page is scrolled or the menu opens.
 */
export function Header({ overlay = false }: { overlay?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const transparent = overlay && !scrolled && !open;

  return (
    <header
      data-transparent={transparent || undefined}
      className={cn(
        "group/header top-0 z-50 border-b transition-[background-color,border-color,box-shadow] duration-300",
        overlay ? "fixed inset-x-0" : "sticky",
        transparent
          ? "border-transparent bg-transparent"
          : "bg-white/95 backdrop-blur",
        !transparent && (scrolled ? "border-border shadow-[0_4px_20px_rgba(17,20,24,0.06)]" : "border-transparent"),
      )}
    >
      <Container className="flex h-[88px] items-center gap-6">
        <Logo priority />

        <nav aria-label="Main" className="ml-auto hidden items-center gap-1 lg:flex">
          {/* usePathname is request data: stream the active state, prerender plain links */}
          <Suspense fallback={<NavLinks variant="desktop" />}>
            <ActiveNavLinks variant="desktop" />
          </Suspense>
        </nav>

        <div className="ml-auto flex items-center gap-1 lg:ml-0">
          <Link href="/search" aria-label="Search" className={cn(buttonVariants({ variant: "ghost", size: "icon" }), iconTone(transparent))}>
            <Search className="!size-5" />
          </Link>
          <Link
            href="/notifications"
            aria-label="Notifications (new)"
            className={cn(buttonVariants({ variant: "ghost", size: "icon" }), iconTone(transparent), "relative hidden sm:inline-flex")}
          >
            <Bell className="!size-5" />
            <span className={cn("absolute right-2.5 top-2.5 size-2 rounded-full bg-primary ring-2", transparent ? "ring-transparent" : "ring-white")} />
          </Link>
          {features.shop && <CartButton />}
          {features.auth && (
            <ButtonLink href="/login" variant="outline" size="sm" className="ml-1 hidden md:inline-flex">
              Log in
            </ButtonLink>
          )}
          <ButtonLink
            href={siteConfig.appLinks.download}
            size="sm"
            className={cn(
              "ml-2 hidden md:inline-flex",
              transparent && "rounded-full bg-white text-ink shadow-[0_4px_18px_rgba(0,0,0,0.25)] hover:bg-white hover:text-primary",
            )}
          >
            Download App <Download />
          </ButtonLink>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
            className={cn(buttonVariants({ variant: "ghost", size: "icon" }), iconTone(transparent), "lg:hidden")}
          >
            {open ? <X className="!size-6" /> : <Menu className="!size-6" />}
          </button>
        </div>
      </Container>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="fixed inset-x-0 top-[88px] bottom-0 z-40 overflow-y-auto border-t border-border bg-white lg:hidden"
      >
        <Container className="py-4">
          <nav aria-label="Mobile" className="flex flex-col">
            <Suspense fallback={<NavLinks variant="mobile" onNavigate={() => setOpen(false)} />}>
              <ActiveNavLinks variant="mobile" onNavigate={() => setOpen(false)} />
            </Suspense>
          </nav>
          <ButtonLink href={siteConfig.appLinks.download} size="lg" className="mt-6 w-full" onClick={() => setOpen(false)}>
            Download the App <Download />
          </ButtonLink>
        </Container>
      </div>
    </header>
  );
}

function CartButton() {
  const items = useCart((s) => s.items);
  const count = cartCount(items);
  return (
    <Link href="/shop/cart" aria-label={`Cart, ${count} items`} className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "relative")}>
      <ShoppingBag className="!size-5" />
      {count > 0 && (
        <span className="absolute right-1 top-1 grid size-4.5 place-items-center rounded-full bg-primary text-[10px] font-bold text-white">
          {count}
        </span>
      )}
    </Link>
  );
}

type NavLinksProps = { variant: "desktop" | "mobile"; pathname?: string; onNavigate?: () => void };

function ActiveNavLinks(props: Omit<NavLinksProps, "pathname">) {
  const pathname = usePathname();
  return <NavLinks {...props} pathname={pathname} />;
}

function NavLinks({ variant, pathname, onNavigate }: NavLinksProps) {
  const isActive = (href: string) => !!pathname && pathname.startsWith(href);
  return mainNav.map((item) => {
    const active = isActive(item.href);
    return (
      <Link
        key={item.href}
        href={item.href}
        onClick={onNavigate}
        aria-current={active ? "page" : undefined}
        className={cn(
          variant === "desktop"
            ? "relative rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:text-primary"
            : "border-b border-border py-4 font-display text-2xl font-bold uppercase",
          active ? "text-primary" : "text-ink group-data-[transparent]/header:text-white/85 group-data-[transparent]/header:hover:text-white",
        )}
      >
        {item.label}
        {variant === "desktop" && active && (
          <span className="absolute inset-x-3 -bottom-[26px] h-0.5 rounded-full bg-primary" />
        )}
      </Link>
    );
  });
}

function iconTone(transparent: boolean) {
  return transparent ? "text-white hover:bg-white/10" : undefined;
}
