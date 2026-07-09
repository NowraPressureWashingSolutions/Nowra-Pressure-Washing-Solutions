# CLAUDE.md — Nowra Pressure Washing Solutions website

Context for Claude Code working in this repo. Read this before making changes.

## What this is
Marketing website (single landing page) for **Nowra Pressure Washing Solutions**, a
pressure-washing business in Nowra, NSW servicing the Shoalhaven. Ported from a
hand-built single-file HTML site into **Next.js (App Router)**.

## Stack
- Next.js 14 (App Router), React 18. **JavaScript, not TypeScript.**
- Plain CSS in `app/globals.css` (no Tailwind/CSS-modules). Google Fonts (Archivo +
  Hanken Grotesk) loaded via `@import` at the top of that file.
- No database, no API routes. Static/prerendered.

## Structure
- `app/layout.js` — SEO metadata (title, description, Open Graph, Twitter, geo, canonical).
- `app/page.js` — a **client component** holding all page markup, the JSON-LD business
  schema, and all interactivity (before/after slider, sticky header, service ticker,
  count-up stats, FAQ, quote form). That interactivity currently runs **once** inside a
  `useEffect` setup block (a faithful port of the original vanilla JS), guarded by
  `window.__npwsInit`.
- `app/globals.css` — all styles.
- `public/` — `logo.png`, `before.jpg`, `after.jpg`, `terms-and-conditions.pdf`.

## Commands
- `npm install`
- `npm run dev` → http://localhost:3000
- `npm run build` then `npm start` for production.
- **Always run `npm run build` after changes to confirm it still compiles.**

## Business facts (use these; do not invent others)
- Registered business name: **NOWRA PRESSURE WASHING SOLUTIONS**
- ABN: **21 785 952 316**  (it is a registered business name — **not** a Pty Ltd company;
  do NOT add "Pty Ltd" or an ACN unless the owner confirms one exists)
- Email: **NowraPressureWashingSolutions@gmail.com**
- Area: based in Nowra, servicing Berry to Sussex Inlet and the wider Shoalhaven, NSW
- Two operators: a **registered nurse** and a **civil engineer** (core trust signal)
- Equipment: standard cold-water pressure washers **plus a hot-water unit** (heats the
  pressurised water — the differentiator for oil/grease)
- Services: house & soft washing; driveways/paths/concrete; decks/fences/timber;
  trucks/fleet/machinery (hot water); shopfronts/factories/strata; end-of-lease/pre-sale.
  **Roofs and gutters are intentionally excluded.**

## Placeholders to replace before launch
- `YOURDOMAIN.com.au` → real domain (in `app/layout.js` metadata AND the JSON-LD in `app/page.js`)
- `04XX XXX XXX` → real phone number
- Social links in the footer of `app/page.js`: `YOUR-PAGE` / `YOUR-HANDLE`
- Add `public/social-share.jpg` (~1200×630) for the link-preview image referenced in metadata

## Writing / content rules (important)
- **Australian spelling.** No emoji.
- **Accuracy over invention** — if a fact isn't in this file or clearly true, ask; don't fabricate.
- Do NOT add testimonials, review counts, star ratings, or stats that aren't real.
- Do NOT re-introduce removed claims: no "100% satisfaction guarantee", no "2 owner-operators".
- Keep oil-removal framing honest: methods reduce the visual impact, but oil-stained
  unsealed concrete cannot be restored to new.
- Brand palette: navy `#082a3d`, blue `#0e76b5`, aqua `#34c6e8`. Keep the existing look.
- Preserve the SEO metadata and JSON-LD when refactoring.
