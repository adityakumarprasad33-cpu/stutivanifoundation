export const REVALIDATION = {
  HOMEPAGE: 300, // 5 minutes
  PROGRAMS: 1800, // 30 minutes
  PROJECTS: 1800, // 30 minutes
  BLOGS: 3600, // 1 hour
  EVENTS: 300, // 5 minutes
  GALLERY: 3600, // 1 hour
  STATIC: 86400, // 24 hours (About, Contact, etc.)
  DONATE: 3600, // 1 hour
  VOLUNTEER: 3600, // 1 hour
} as const;
