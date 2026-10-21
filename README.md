# Tamsworld v1 — editorial prototype and Payload model

## Included
- `prototype/index.html`: standalone responsive click-through prototype for Home, Journal, Article, and CMS Preview. It uses sample content and no backend.
- `payload-collections/`: starter Payload collection definitions for Articles, Categories, Tags, and Media.

## Visual direction
- Typography-led editorial journal inspired by the reference direction, not a pixel copy.
- Warm off-white background, deep charcoal text, restrained forest-green accent, fine dividers, generous whitespace.
- Home: editorial thesis, systems diagram, featured article, latest notes.
- Journal: category filters and compact text-first archive rows.
- Article: long-form reading column, sticky contents navigation, diagrams/pull quote.
- CMS: show editorial fields and draft/preview/publish controls in Payload's admin experience.

## Recommended data model
- `articles`: title, slug, dek, excerpt, author, category, tags, hero image, rich-text body, featured flag, reading time, publication date, SEO group, drafts/versions.
- `categories`: title, slug, description, sort order.
- `tags`: title, slug.
- `media`: image uploads to R2, alt text, caption, credit, generated image sizes.
- `users`: Payload auth collection, admin-only access for initial launch.

## Cloudflare architecture
- Cloudflare Workers: Payload + Next.js app runtime, using the official Payload Cloudflare starter as the baseline.
- Cloudflare D1: Payload database via `@payloadcms/db-d1-sqlite`.
- Cloudflare R2: uploads via `@payloadcms/storage-r2` and native R2 binding.
- Cloudflare DNS/WAF/CDN: domain and edge protection.
- GitHub: source control and deployment pipeline; the public site and admin are browser-accessible.

Official references checked 21 Oct 2026:
- Payload Cloudflare deploy template: https://payloadcms.com/posts/blog/deploy-payload-onto-cloudflare-in-a-single-click
- Payload D1 adapter: https://payloadcms.com/docs/database/sqlite
- Payload R2 adapter: https://payloadcms.com/docs/upload/storage-adapters
- Cloudflare Next.js guidance: https://developers.cloudflare.com/workers/framework-guides/web-apps/opennext/

## Important implementation notes
1. Treat this as a design prototype and schema starting point, not a deployable production app yet.
2. Start from the official Payload Cloudflare template rather than assembling an adapter stack from scratch. Verify its currently generated package versions and deployment path before merging custom code.
3. Confirm the final public-site rendering strategy against the current Cloudflare recommendation. Cloudflare's October 2026 docs recommend `vinext` for new Next.js applications, while Payload's official Cloudflare template has its own supported configuration; do not swap adapters without testing Payload admin, uploads, draft preview, and dynamic routes.
4. The `Articles.ts` access rules intentionally allow public reads only for published content and authenticated users to read drafts. Review authoring roles before production.
5. Slug generation, reading-time calculation, scheduled publishing, RSS, sitemap, canonical URLs, Open Graph metadata, search, newsletter integration, rate limits, and backups still need implementation and tests.
6. D1 is SQLite-based. Test concurrent admin writes, migrations, and expected content volume before launch; R2 should be the durable home for media.

## Suggested next build sequence
1. Create a branch and inspect the current `mzahrane/tamsworld` repository before replacing anything.
2. Bootstrap from the official Payload Cloudflare template and confirm a clean deploy with D1 + R2.
3. Add the collections, seed categories, and configure author/admin access.
4. Implement the home, journal, and article templates from the prototype, then connect draft preview.
5. Add SEO/RSS/sitemap, accessibility checks, backup/export, and production smoke tests.
