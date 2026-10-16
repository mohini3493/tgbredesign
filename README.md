# TGB – The Good Biker (web)

Homepage and foundation for the TGB web platform: riders, routes, clubs, events, cities —
built to plug into the same API as the TGB mobile app, with e-commerce and membership ready to add.

**Stack:** Next.js 16 (App Router, Cache Components) · React 19 · TypeScript (strict) · Tailwind CSS v4 ·
Zod · TanStack Query · Zustand · Vitest + Testing Library

## Getting started

```bash
npm install
cp .env.example .env.local   # already set to mock data
npm run dev                  # http://localhost:3000
```

| Script              | What it does                    |
| ------------------- | ------------------------------- |
| `npm run dev`       | Dev server                      |
| `npm run build`     | Production build                |
| `npm start`         | Serve the production build      |
| `npm run lint`      | ESLint                          |
| `npm run typecheck` | TypeScript, no emit             |
| `npm test`          | Vitest (unit + component tests) |
| `npm run format`    | Prettier (sorts Tailwind classes) |

## Brand tokens

Defined once in `src/app/globals.css` (`@theme`). The default Tailwind palette is **removed**, so
only these colors can be used (`bg-primary`, `text-secondary`, `bg-deep`, ...):

| Token | Hex | | Token | Hex |
| --- | --- | --- | --- | --- |
| primary | `#ff7723` | | ink | `#111418` |
| primary-hover | `#e8641a` | | body | `#4a5260` |
| primary-tint | `#fff1e8` | | muted | `#8a919c` |
| secondary | `#4b98bf` | | page | `#f6f7f9` |
| secondary-hover | `#3a82a8` | | border | `#e6e8ec` |
| secondary-tint | `#eaf4f9` | | deep | `#0f1a22` |
| white / surface | `#ffffff` | | deep-text | `#b8c4cc` |

Fonts are self-hosted via Fontsource: **Barlow Condensed** (headings, `font-display`) and **Inter** (body).

## Folder structure

```
src/
  app/
    (marketing)/            homepage + placeholder pages (share Header/Footer)
    api/riders/nearby/      BFF route used by "Riders near you"
    api/revalidate/         on-demand cache revalidation (secret protected)
    sitemap.ts robots.ts not-found.tsx error.tsx
  features/                 one folder per domain
    routes/ events/ clubs/ riders/ cities/ stats/ testimonials/
      schemas.ts            Zod schema = API contract + TS types
      services.ts           the ONLY place data is fetched
      components/           UI for that domain
    home/                   hero, app banner, rider services, why-TGB
    shop/                   future e-commerce (types, cart store, payments boundary)
    membership/             future membership (tiers, <MembershipGate>, badge)
    auth/                   session types, getSession(), useSession()
    newsletter/             server action + form
  components/
    ui/                     button, badge, skeleton (shadcn-style, cva)
    layout/                 Header, Footer, Container, Section, Logo, MobileDownloadBar
    shared/                 SectionHeader, Carousel, SmartImage, SectionBoundary, ...
  config/
    site.ts                 nav, footer, socials, static marketing content
    features.ts             feature flags
  lib/
    api/client.ts           typed fetch: base URL, auth header, retries, Zod validation
    api/endpoints.ts        every backend path in one place
    data-source.ts          mock ↔ api switch
    format.ts               km, INR, dates
  mocks/                    JSON fixtures in the exact API response shape
  proxy.ts                  route protection + feature-flag gating (Next 16 "proxy" = middleware)
```

## Switching from mock data to the live API

1. Set in `.env.local`:
   ```
   NEXT_PUBLIC_DATA_SOURCE=api
   API_BASE_URL=https://api.thegoodbiker.com
   NEXT_PUBLIC_IMAGE_HOST=cdn.thegoodbiker.com   # if API images come from a CDN
   ```
2. Make sure the backend returns the shapes in `features/*/schemas.ts`. **No UI changes needed.**

### API contract (shared with the mobile app)

| Section | Endpoint | Cache |
| --- | --- | --- |
| Stats strip | `GET /v1/home/stats` → `{ data: HomeStats }` | 1h, tag `stats` |
| Popular routes | `GET /v1/routes?popular=true&limit=5` | 1h, tag `routes` |
| Upcoming events | `GET /v1/events?upcoming=true&limit=6` | 15m, tag `events` |
| Popular clubs | `GET /v1/clubs?popular=true&limit=6` | 1h, tag `clubs` |
| Riders near you | `GET /v1/riders/nearby?lat=&lng=&city=&limit=6` | not cached (personalised) |
| Cities | `GET /v1/cities` | 1h, tag `cities` |
| Testimonials | `GET /v1/testimonials?featured=true` | 1d, tag `testimonials` |

Lists use the envelope `{ data: T[], meta: { page, limit, total } }`.
`src/lib/__tests__/mocks-contract.test.ts` fails if a mock drifts from its schema.

### On-demand revalidation

When content changes in the backend/admin, call:

```bash
curl -X POST https://<site>/api/revalidate \
  -H "x-revalidate-secret: $REVALIDATE_SECRET" \
  -H "Content-Type: application/json" \
  -d '{"tags":["events"]}'
```

## How the homepage is rendered

Uses Next 16 **Cache Components**: services are cached with `"use cache"` + `cacheLife` + `cacheTag`,
so the page is prerendered as a static shell and refreshed in the background.
Each data section is wrapped as `SectionBoundary → Suspense (skeleton) → async server component`,
so one failing API call only affects its own section. "Riders near you" is client-side
(TanStack Query → `/api/riders/nearby`) and only asks for location when the rider taps
"Use my location".

## Feature flags (shop, membership, auth)

```
NEXT_PUBLIC_FEATURE_SHOP=true         # cart icon in header, /shop/* routes
NEXT_PUBLIC_FEATURE_MEMBERSHIP=true   # <MembershipGate> enforces tiers, /membership/manage
NEXT_PUBLIC_FEATURE_AUTH=true         # "Log in" button, protected /account routes
```

- **Shop:** `features/shop` has Product/Variant/Cart/Order types, a persisted Zustand cart
  (`useCart`) and a payments boundary (`services/payments.ts`, Razorpay planned).
- **Membership:** `<MembershipGate tier="pro">…</MembershipGate>`; events/clubs already
  carry `membersOnly` / `membershipRequired` and show a "Members only" badge.
- **Auth:** `getSession()` (server) and `useSession()` (client) are stubs ready for the
  mobile app's JWT. `src/proxy.ts` redirects protected routes to `/login`.

## Images

Mock data uses Unsplash photos; the logo loads from `tgb.theshashank.com`. Both hosts are allowed
in `next.config.ts`. `SmartImage` shows a branded fallback if any image fails, so broken API
images never break the layout.

## Next steps

- Detail pages (`/routes/[slug]`, `/events/[slug]`, …) are placeholders: fetch by slug via the
  feature service and add `generateStaticParams`.
- Add shadcn/ui CLI (`npx shadcn@latest init`) when you need dialogs, dropdowns, sheets.
- Connect real auth, then shop and membership behind their flags.
