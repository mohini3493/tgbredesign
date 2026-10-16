# Shop module (future)

Products, cart, checkout and orders for accessories, rentals and services.

- `types.ts` – Zod schemas for Product / Variant, plus Cart / Order types
- `store/cart.ts` – persisted Zustand cart (`useCart`)
- `services/payments.ts` – payment provider boundary (Razorpay planned)

Enable with `NEXT_PUBLIC_FEATURE_SHOP=true` — the header cart icon appears and
`/shop/checkout` becomes reachable (see `src/proxy.ts`).
