# TASKS.md — work items for Claude Code

Work top to bottom. Run `npm run build` after each task and stop if it fails.
Ask me for any real value you don't have (phone, domain, social URLs) rather than guessing.

## 1. Get it running
- [ ] `npm install`, then `npm run build` to confirm a clean baseline.
- [ ] `npm run dev` and confirm the page renders at http://localhost:3000.

## 2. Drop in the real details
- [ ] Replace the three social URLs in the footer of `app/page.js`
      (`YOUR-PAGE`, `YOUR-HANDLE`). Remove any platform we don't use.
- [x] Find/replace `YOURDOMAIN.com.au` with the real domain (`nowrapressurewashingsolutions.com.au`)
      in `app/layout.js` and in the JSON-LD inside `app/page.js`. Email updated to
      `enquiries@nowrapressurewashingsolutions.com.au` throughout.
- [x] Replace `04XX XXX XXX` with the real phone number (`0401 455 632`) everywhere it appears.

## 3. Social share image
- [ ] Add `public/social-share.jpg` (~1200×630) and confirm the Open Graph / Twitter
      tags in `app/layout.js` point to it.

## 4. Quote form (optional but recommended)
- [ ] The quote form currently builds a `mailto:` link. Wire it to a real form service
      (e.g. Formspree) so enquiries arrive without relying on the visitor's mail app.
      Keep the same fields and validation.

## 5. SEO plumbing (once the domain is set)
- [x] Add `app/robots.js` and `app/sitemap.js` (Next.js metadata routes).
- [x] Confirm `metadataBase` in `app/layout.js` matches the live domain.
- [ ] (Owner action) Set up Google Search Console, verify the domain, submit the
      sitemap, and request indexing on the homepage.

## 6. Optional quality refactor (only if asked)
- [ ] Split `app/page.js` into components: `Header`, `Hero` (before/after slider),
      `Ticker`, `Stats`, `Services`, `HotWater`, `Why`, `Process`, `Area`, `Move`,
      `Reviews`, `Faq`, `Quote`, `Footer`.
- [ ] Re-implement the interactivity as idiomatic React (state/refs/hooks) instead of
      the single `useEffect` setup block. Behaviour must stay identical.
- [ ] Consider swapping `<img>` for `next/image` for the logo and before/after photos.

## 7. Deploy
- [ ] Prepare for Vercel: confirm build passes, `.gitignore` covers `node_modules`/`.next`.
- [ ] (Owner action) Push to GitHub, import into Vercel, connect the domain.
- [ ] Confirm `public/terms-and-conditions.pdf` resolves at `/terms-and-conditions.pdf`.

## Guardrails
- Australian spelling, no emoji, no invented facts/testimonials/stats.
- Don't add "Pty Ltd"/ACN (registered business name only) unless I confirm a company.
- Keep the honest oil-removal wording and the brand palette.
