# 46. Public Components

## Sections Pattern
Instead of monolithic pages, the website is composed of reusable section blocks (`features/public/components/sections/`):
- `HeroSection`
- `ImpactSection`
- `ProgramsSection`
- `FAQSection`
- `CTASection`

## Base Cards
Standardized display cards for each entity type ensuring visual consistency:
- `ProgramCard`
- `ProjectCard`
- `EventCard`
- `BlogCard`
- `GalleryCard`
- `CampaignCard`

## Skeletons
Optimized loading states matching card layouts to prevent Cumulative Layout Shift (CLS).
