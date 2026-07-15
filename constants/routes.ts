export const ROUTES = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  LOGIN: '/login',
  PROJECTS: '/projects',
  BLOGS: '/blogs',
  GALLERY: '/gallery',
  DONATIONS: '/donations',
  VOLUNTEERS: '/volunteers',
  CONTACT: '/contact',
} as const;

export type AppRoutes = typeof ROUTES[keyof typeof ROUTES];
