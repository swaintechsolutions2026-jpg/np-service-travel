# AGENTS.md

NP Service – Tour & Travels website on TanStack Start + Netlify. **Read PLAN.md first** for what's done and next.

## Structure
- `src/data/fixtures.ts` — all seed content (settings, tours, departures, gallery, FAQs, terms, pending source notes). Mirrors the planned DB tables.
- `src/lib/tours.ts` — the only access layer for content (upcoming/past departures, pricing, WhatsApp URL builder, mobile validation, Image CDN `img()`). Swap fixtures for DB queries here.
- `src/lib/seo.ts` — per-route title/description/OG/canonical.
- `src/components/site/` — Header, Footer, ConversionBar, TourCard, TourFilters, BookingForm, Gallery, FAQAccordion, PageHero, PolicyLayout, primitives (Reveal, Picture, etc.).
- `src/routes/_site.*` — public pages under a shared layout; `admin.login.tsx` is outside it.
- `public/img/np/` — authentic NP Service photos; `public/img/dest-*.png`, `hero-darjeeling.png` — generated scenic illustrations (never present these as real trips).

## Non-obvious rules
- Only `approval: 'confirmed'` departures with dates ≥ today (IST) are public offers. Pending claims (North/South India dates, ₹10,500, emails, proprietor spelling, extra phones) stay in admin-only lists.
- Never invent prices, dates, capacity, amenities, testimonials or stats.
- The booking form does NOT save leads yet and says so; don't claim persistence until the server path exists.
- Brand colors are Tailwind tokens: `navy`, `royal`, `turquoise`, `gold`; fonts `font-display` (Fraunces), `font-odia`.
- Images go through `Picture` / `img()` (Netlify Image CDN).
