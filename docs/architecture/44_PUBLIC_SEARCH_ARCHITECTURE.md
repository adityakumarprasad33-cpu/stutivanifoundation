# 44. Public Search Architecture

## Global Overlay (`⌘K`)
The `SearchOverlay` component provides a unified search experience across the public portal.

## UnifiedSearchService
Acts as an orchestrator, querying multiple entity repositories simultaneously:
- Programs (Service)
- Projects (Service)
- Events (Service)
- Blogs (Service)

## Performance
- Results are debounced by 500ms to prevent excessive DB queries.
- Results are paginated/limited to top 3 per category.
- Future roadmap includes a Vector Database integration for semantic similarity search.
