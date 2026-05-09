# Cavomarina Beach Hotel

A luxury hotel website for Cavomarina Beach Hotel (Kavos, Corfu, Greece) — showcasing rooms, amenities, the Discover Cavos guide, and a booking widget.

## Run & Operate

- `pnpm --filter @workspace/cavomarina run dev` — start the web app (Vite, reads `PORT`)
- `pnpm run typecheck` — full typecheck across all packages
- No backend or database required — static React SPA

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- React 19 + Vite 7, Tailwind CSS, shadcn/ui, Framer Motion
- Routing: Wouter
- i18n: custom flat-key context in `src/lib/i18n.tsx` (EN / DE / EL)
- Icons: Lucide React
- CDN images: `https://image-tc.galaxy.tf/`

## Where things live

- `artifacts/cavomarina/src/` — all source code
- `src/pages/Home.tsx` — main hotel page (hero, rooms, amenities, reviews, gallery, contact)
- `src/pages/DiscoverCavos.tsx` — Kavos/Corfu guide (activities, sights, itineraries, restaurants, practical info)
- `src/lib/i18n.tsx` — `LanguageProvider`, `useLang()` hook, `LangSwitcher` component, all translations
- `src/App.tsx` — router + wraps app in `<LanguageProvider>`

## Architecture decisions

- i18n uses a single flat `T = { en, de, el }` object; `TKey = keyof typeof T.en` gives full type-safety across all three locales
- Booking widget links to TravelClick reservation engine (`reservations.travelclick.com/114932`)
- `LangSwitcher` accepts `dark` prop (default `true`) for use on dark vs light navbars
- `PRACTICAL_INFO_META` stores only icon + translation key pairs — content is always resolved via `t()` at render time
- `NAV_SECTION_IDS` (DiscoverCavos) stores `{ id, labelKey: TKey }` so section nav labels are translated

## Product

- Full single-page hotel website with hero slideshow, room cards, amenity grid, guest reviews, photo gallery
- Discover Cavos guide: things to do, sights, itineraries (with day-by-day modal + reservation form), restaurants, practical info accordion
- Booking widget pre-fills TravelClick URL with check-in/out, adults, rooms, promo code
- Language switcher: 🇬🇧 EN | 🇩🇪 DE | 🇬🇷 EL — every UI string translated; review quotes stay in English as genuine guest text

## User preferences

- Reviews text stays in English (genuine guest quotes — not translated)
- CDN base: `https://image-tc.galaxy.tf/`
- Booking engine: `https://reservations.travelclick.com/114932`
- Contact email: `info@cavomarina.com`

## Gotchas

- Pre-existing framer-motion TS2322 errors on `variants` prop — these are a framer-motion type definition issue, not runtime bugs; the animations work correctly
- Always use `t(key: TKey)` — TypeScript will catch missing/misspelled keys at compile time

## Pointers

- See the `pnpm-workspace` skill for workspace structure and TypeScript setup
- i18n key reference: `artifacts/cavomarina/src/lib/i18n.tsx` (single source of truth for all strings)
