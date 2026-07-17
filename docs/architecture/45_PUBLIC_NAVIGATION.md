# 45. Public Navigation

## Single Source of Truth
`config/public-nav.ts` dictates all primary, mobile, and footer navigation links. Hardcoded links in UI components are strictly prohibited.

## Components
- **Header**: Sticky, backdrop-blur, responsive desktop nav.
- **MobileNavigation**: Shadcn UI Sheet displaying a mobile-friendly menu.
- **Footer**: Extended multi-column directory with categorized links (Organization, Initiatives, Legal).
- **Breadcrumbs**: Generates contextual navigation trails mapped to JSON-LD.
