export const COLLECTIONS = {
  USERS: 'users',
  PROJECTS: 'projects',
  PROGRAMS: 'programs',
  BLOGS: 'blogs',
  GALLERY: 'gallery',
  EVENTS: 'events',
  DONATIONS: 'donations',
  VOLUNTEERS: 'volunteers',
  CONTACT_MESSAGES: 'contact_messages',
  PARTNERS: 'partners',
  REPORTS: 'reports',
  SETTINGS: 'settings',
  NOTIFICATIONS: 'notifications',
  ACTIVITY_LOGS: 'activity_logs',
} as const;

export type FirestoreCollection = typeof COLLECTIONS[keyof typeof COLLECTIONS];
