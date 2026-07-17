# 43. Public SEO Strategy

## Metadata Generation
The `generateSeoMetadata` utility ensures consistent `title`, `description`, `canonical`, and `OpenGraph`/`Twitter` card generation for every page.

## Structured Data (JSON-LD)
We inject schema.org JSON-LD scripts dynamically for:
- **Organization**: Global details (Logo, address, social links).
- **BreadcrumbList**: Site navigation hierarchy.
- **Article**: Blog posts.
- **Event**: Calendar events.
- **WebSite**: Global search capabilities.

## Crawlability
- `app/sitemap.ts`: Automatically generates an XML sitemap for static and dynamic routes.
- `app/robots.ts`: Allows `*` user-agents, disallows `/dashboard/` and `/admin/`.
