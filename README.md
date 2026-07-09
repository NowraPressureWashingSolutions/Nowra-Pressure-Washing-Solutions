# Nowra Pressure Washing Solutions — website (Next.js)

A Next.js (App Router) port of the Nowra Pressure Washing Solutions site.

## Run it locally
Requires Node 18.17+ (or 20+).

```bash
npm install
npm run dev        # http://localhost:3000
```

Production build:
```bash
npm run build
npm start
```

## Project structure
- `app/layout.js` — SEO metadata (title, description, Open Graph, Twitter, geo tags, canonical). Edit the domain and copy here.
- `app/page.js` — all page markup, plus the interactive behaviour (before/after slider, sticky header, ticker, count-ups, FAQ, quote form) which runs once in a client-side setup effect. The JSON-LD business schema is here too.
- `app/globals.css` — all styles. Google Fonts (Archivo + Hanken Grotesk) are pulled in via an `@import` at the top.
- `public/` — images (`logo.png`, `before.jpg`, `after.jpg`) and `terms-and-conditions.pdf`.

## Add / edit your social links
Open `app/page.js` and search for **YOUR-PAGE** and **YOUR-HANDLE**. Update the three links in the footer:
- Facebook  → `https://www.facebook.com/YOUR-PAGE`
- Instagram → `https://www.instagram.com/YOUR-HANDLE`
- TikTok    → `https://www.tiktok.com/@YOUR-HANDLE`

Delete any platform you don't use (remove that whole `<a>…</a>` line).

## Still to finalise before going live
- Replace the **04XX XXX XXX** phone placeholder once a number is available.
- Add a **social-share.jpg** (≈1200×630) to `public/` for the link-preview image referenced in the metadata.
- The footer "Terms & Conditions" link points to `/terms-and-conditions.pdf` — the PDF is already in `public/`.

## Deploy
Easiest is **Vercel** (made by the Next.js team): push this folder to a GitHub repo, import it at vercel.com, and add your custom domain in the project settings. **Netlify** also supports Next.js.

## Note
Interactivity is a faithful port of the original single-file site's JavaScript, run once via a client setup effect. It works as-is; if you later want it broken into idiomatic React components (Header, Hero, Footer, etc.), that can be done incrementally.
