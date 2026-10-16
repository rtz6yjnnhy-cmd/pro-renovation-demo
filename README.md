# Pro-Renovation — Website Concept

Unofficial website concept for **Pro-Renovation by Emerson Services LLC** (Marietta, Georgia),
created as a design proposal and portfolio piece. It is not the company's official website.
Photography is illustrative stock imagery from Pexels (see `IMAGE_CREDITS.md`).

Built with Next.js 14 (App Router, static export), TypeScript, Tailwind CSS and Framer Motion.

## Local development

```bash
npm ci
npm run dev        # http://localhost:3000 (also generates responsive images)
```

## Production build

```bash
npm run build      # static site in ./out
```

`npm run build` first runs `npm run images`, which pre-renders WebP versions of every photo
into `public/img-opt/` (generated, not committed). A custom `next/image` loader
(`src/lib/image-loader.js`) serves those files, so phones download small images on
GitHub Pages without an image server.

To reproduce the GitHub Pages paths locally:

```bash
PAGES_BASE_PATH=/pro-renovation-demo npm run build
```

## Publishing to GitHub Pages

1. Create a repository named `pro-renovation-demo` and push this project to `main`.
2. In **Settings → Pages**, set **Source** to **GitHub Actions**.
3. Every push to `main` runs `.github/workflows/deploy-pages.yml`: lint, static build with the
   repository base path, and deployment.

The site will be available at `https://<user>.github.io/pro-renovation-demo/`.
No environment variables or secrets are required.

The page is marked `noindex` so search engines do not list it while it remains a proposal.
