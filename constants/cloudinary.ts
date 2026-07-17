export const CLOUDINARY_FOLDERS = {
  BASE: 'stuti-vani',
  BRANDING: {
    LOGO: 'branding/logo',
    FAVICON: 'branding/favicon',
  },
  GALLERY: {
    IMAGES: 'gallery/images',
  },
  DOCUMENTS: {
    REPORTS: 'documents/reports',
    CERTIFICATES: 'documents/certificates',
    LEGAL: 'documents/legal',
    TEMPLATES: 'documents/templates',
    OTHERS: 'documents/others',
  },
  PROJECTS: (projectId: string) => `projects/${projectId}`,
  PROGRAMS: (programId: string) => `programs/${programId}`,
  BLOGS: 'blogs',
  EVENTS: 'events',
  VOLUNTEERS: 'volunteers',
  DONATIONS: 'donations',
  REPORTS: 'reports',
  TEMP: {
    UPLOADS: 'temp/uploads',
  },
} as const;
