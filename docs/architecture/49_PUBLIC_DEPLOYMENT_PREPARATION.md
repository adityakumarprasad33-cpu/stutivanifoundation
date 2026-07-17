# 49. Public Deployment Preparation

## Environment Variables
Ensure the following are set in the production environment:
- `NEXT_PUBLIC_SITE_URL` (Required for absolute URLs in SEO/Sitemap)
- Firebase configurations

## Build Verification
- Run `npm run typecheck` to ensure no implicit `any` types.
- Run `npm run lint` for code standards.
- Run `npm run build` to verify Server Component boundaries and ISR configurations.

## Performance Audits
Post-deployment, execute Lighthouse audits to verify:
- Accessibility (WCAG AA)
- Core Web Vitals (LCP, CLS, FID)
- SEO Score
