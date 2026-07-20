# terrydavis903.github.io

Personal engineering portfolio — a single-page site with a live, in-browser
fingerprint dashboard. Built with [Astro](https://astro.build) and organized
along atomic-design lines (atoms → molecules → organisms).

## Develop

```bash
npm install
npm run dev      # local dev server
npm run build    # static output to ./dist
npm run preview  # preview the built site
```

## Structure

```
src/
├── styles/      design tokens + global base styles
├── data/        site copy, projects, stack (content lives here, not in markup)
├── scripts/     the fingerprint dashboard, one module per signal vector
├── components/  atoms / molecules / organisms
├── layouts/     BaseLayout (head, fonts, meta)
└── pages/       index.astro
```

Everything on the page is computed locally in the browser. The only external
request is a single IP/geo lookup (`ipwho.is`) for the network tile, isolated in
`src/scripts/fingerprint/vectors/network.ts` with a timeout and graceful
fallback.

## Deploy

Pushing to `main` builds and deploys to GitHub Pages via
`.github/workflows/deploy.yml`. In the repository settings, set
**Settings → Pages → Source** to **GitHub Actions**.
