# Chloe Patterson PM agent guide

This is a guinea-pig consumer site for `laptopclub/foundation`.

## Read first

- `README.md`: setup and validation
- Foundation guidance: https://github.com/laptopclub/foundation/blob/main/AGENTS.md

## Content voice

- Write site copy in first person from Chloe's perspective.
- Prefer phrasing like "I'm a detail-oriented project manager" over third-person phrasing like "Chloe does X, Y and Z".

## Boundaries

- Keep Chloe-specific content, styling and composition in this repository.
- Put reusable schemas, blocks, components and framework fixes in `laptopclub/foundation`.
- Do not edit code inside installed Foundation packages.
- Add site-specific schemas in `sanity/schema-types.ts`.
- Add site-specific renderers in `lib/blocks.ts`.
- Upgrade all `@laptopclub/foundation-*` packages together.
- Do not mutate production Sanity content unless explicitly requested.
- Never commit `.env` files, package tokens, Sanity tokens or webhook secrets.
- Do not hand-edit `sanity.types.ts` or `schema.json`.
- Do not add dependencies without explicit approval.

## Required checks

```bash
pnpm check
pnpm build
```

For schema or GROQ query changes:

```bash
pnpm sanity:schema
pnpm sanity:typegen
```

## Definition of done

- Framework changes are made upstream when reusable.
- Package installation, checks and production build pass.
- A Vercel preview is reviewed for package upgrades.
- No secrets or temporary generated files are committed.
