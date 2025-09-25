# The Boss Minute — Vite + Netlify Functions

Minimal, fast deploy of your one‑pager with ConvertKit + Splitbee + legal PDFs.

## Quickstart

```bash
npm i
npm run dev
```

## Deploy (Netlify)

- Build command: `npm run build`
- Publish directory: `dist`
- Functions directory: `netlify/functions`
- Env vars: `CK_API_KEY`, `CK_FORM_ID`

## PDFs

Place the four PDFs in `public/docs/` with EXACT filenames:

- `bossminute-privacy-2025-09-21.pdf`
- `bossminute-terms-2025-09-21.pdf`
- `bossminute-affiliates-2025-09-21.pdf`
- `bossminute-contact-2025-09-21.pdf`

## Notes

- Paste your latest Canvas code into `src/App.tsx` (default export).
- The `Send Test Email` button is pre‑wired to `/api/subscribe` and tagged for Splitbee events.
