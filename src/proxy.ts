import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE } from "@/features/auth/types";

/**
 * Optimistic route protection (Next.js 16 "proxy", formerly middleware).
 * - Feature-flagged modules 404 until their flag is on.
 * - Protected areas redirect to /login when there is no session cookie.
 * Real authorization still happens on the server/API.
 */
const flags = {
  shop: process.env.NEXT_PUBLIC_FEATURE_SHOP === "true",
  membership: process.env.NEXT_PUBLIC_FEATURE_MEMBERSHIP === "true",
  auth: process.env.NEXT_PUBLIC_FEATURE_AUTH === "true",
};

const PROTECTED = ["/account", "/membership/manage", "/shop/checkout"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/shop/") && !flags.shop) {
    return NextResponse.rewrite(new URL("/not-found-page", request.url), { status: 404 });
  }
  if (pathname.startsWith("/membership/manage") && !flags.membership) {
    return NextResponse.rewrite(new URL("/not-found-page", request.url), { status: 404 });
  }

  if (PROTECTED.some((p) => pathname.startsWith(p))) {
    if (!flags.auth) return NextResponse.redirect(new URL("/", request.url));
    if (!request.cookies.get(SESSION_COOKIE)) {
      const login = new URL("/login", request.url);
      login.searchParams.set("next", pathname);
      return NextResponse.redirect(login);
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/account/:path*", "/membership/manage/:path*", "/shop/:path+"],
};
