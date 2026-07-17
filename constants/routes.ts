export const ROUTES = {
  // Public
  PUBLIC: {
    HOME: '/',
    ABOUT: '/about',
    PROJECTS: '/projects',
    EVENTS: '/events',
    DONATE: '/donate',
    CONTACT: '/contact',
    BLOG: '/blog',
  },
  
  // Auth
  AUTH: {
    LOGIN: '/login',
    FORGOT_PASSWORD: '/forgot-password',
    UNAUTHORIZED: '/unauthorized',
    FORBIDDEN: '/forbidden',
  },
  
  // Protected (Require Authentication)
  PROTECTED: {
    DASHBOARD: '/dashboard',
    PROFILE: '/dashboard/profile',
  },
  
  // Admin & Super Admin specific sub-routes within dashboard
  ADMIN: {
    USERS: '/dashboard/users',
    SETTINGS: '/dashboard/settings',
    REPORTS: '/dashboard/reports',
  }
} as const;

export const ROUTE_CATEGORIES = {
  isPublicRoute: (path: string) => {
    return Object.values(ROUTES.PUBLIC).some(r => r === path) || path.startsWith('/projects/') || path.startsWith('/blog/');
  },
  isAuthRoute: (path: string) => {
    return path === ROUTES.AUTH.LOGIN || path === ROUTES.AUTH.FORGOT_PASSWORD;
  },
  isProtectedRoute: (path: string) => {
    return path.startsWith('/dashboard') || path.startsWith('/portal');
  },
};
