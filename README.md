# Chloe Patterson PM

Guinea-pig site built with the Laptop Club Foundation framework.

- Framework: https://github.com/laptopclub/foundation
- Foundation Demo canary: https://github.com/laptopclub/foundation-demo
- Sanity project: `2d96josg`
- Dataset: `production`

## Setup

A GitHub token with `read:packages` access is required for the private Foundation packages.

```bash
npm login --scope=@laptopclub --auth-type=legacy --registry=https://npm.pkg.github.com
pnpm install
cp .env.example .env.local
pnpm dev
```

Open:

- Site: http://localhost:3333
- Embedded Studio: http://localhost:3333/studio

## Validation

```bash
pnpm check
pnpm build
```

## Framework upgrades

Upgrade all `@laptopclub/foundation-*` packages together. Validate package upgrades through CI and a Vercel preview before merging.

## Site intent

Single-page project-manager portfolio inspired by editorial slide-deck layouts. Keep reusable block or theme improvements upstream in `laptopclub/foundation`; keep site-specific composition and content here.
