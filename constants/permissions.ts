export const PERMISSIONS = {
  // Projects
  MANAGE_PROJECTS: 'manage_projects',
  READ_PROJECTS: 'read_projects',
  CREATE_PROJECTS: 'projects.create',
  EDIT_PROJECTS: 'projects.edit',
  DELETE_PROJECTS: 'projects.delete',
  PUBLISH_PROJECTS: 'projects.publish',
  ARCHIVE_PROJECTS: 'projects.archive',
  
  // Programs
  MANAGE_PROGRAMS: 'programs.manage',
  READ_PROGRAMS: 'programs.view',
  CREATE_PROGRAMS: 'programs.create',
  EDIT_PROGRAMS: 'programs.edit',
  DELETE_PROGRAMS: 'programs.delete',
  PUBLISH_PROGRAMS: 'programs.publish',
  ARCHIVE_PROGRAMS: 'programs.archive',
  
  // Gallery
  MANAGE_GALLERY: 'gallery.manage',
  READ_GALLERY: 'gallery.view',
  UPLOAD_GALLERY: 'gallery.upload',
  EDIT_GALLERY: 'gallery.edit',
  DELETE_GALLERY: 'gallery.delete',
  ARCHIVE_GALLERY: 'gallery.archive',
  RESTORE_GALLERY: 'gallery.restore',
  
  // Blogs
  MANAGE_BLOGS: 'manage_blogs',
  READ_BLOGS: 'read_blogs',
  CREATE_BLOGS: 'blogs.create',
  EDIT_BLOGS: 'blogs.edit',
  DELETE_BLOGS: 'blogs.delete',
  PUBLISH_BLOGS: 'blogs.publish',
  ARCHIVE_BLOGS: 'blogs.archive',
  RESTORE_BLOGS: 'blogs.restore',
  
  // Events
  MANAGE_EVENTS: 'events.manage',
  READ_EVENTS: 'events.view',
  CREATE_EVENTS: 'events.create',
  EDIT_EVENTS: 'events.edit',
  DELETE_EVENTS: 'events.delete',
  PUBLISH_EVENTS: 'events.publish',
  ARCHIVE_EVENTS: 'events.archive',
  RESTORE_EVENTS: 'events.restore',
  
  // Volunteers
  MANAGE_VOLUNTEERS: 'volunteers.manage',
  READ_VOLUNTEERS: 'volunteers.view',
  CREATE_VOLUNTEERS: 'volunteers.create',
  EDIT_VOLUNTEERS: 'volunteers.edit',
  DELETE_VOLUNTEERS: 'volunteers.delete',
  ASSIGN_VOLUNTEERS: 'volunteers.assign',
  ARCHIVE_VOLUNTEERS: 'volunteers.archive',
  RESTORE_VOLUNTEERS: 'volunteers.restore',
  
  // Donors
  MANAGE_DONORS: 'donors.manage',
  READ_DONORS: 'donors.view',
  CREATE_DONORS: 'donors.create',
  EDIT_DONORS: 'donors.edit',
  DELETE_DONORS: 'donors.delete',
  
  // Donations
  MANAGE_DONATIONS: 'donations.manage',
  READ_DONATIONS: 'donations.view',
  CREATE_DONATIONS: 'donations.create',
  EDIT_DONATIONS: 'donations.edit',
  DELETE_DONATIONS: 'donations.delete',
  REFUND_DONATIONS: 'donations.refund',

  // Campaigns
  MANAGE_CAMPAIGNS: 'campaigns.manage',
  READ_CAMPAIGNS: 'campaigns.view',
  CREATE_CAMPAIGNS: 'campaigns.create',
  EDIT_CAMPAIGNS: 'campaigns.edit',
  DELETE_CAMPAIGNS: 'campaigns.delete',
  
  // Finance
  MANAGE_FINANCE: 'finance.manage',
  READ_FINANCE: 'finance.view',

  // Reports (Moved to Analytics section)
  // Users
  MANAGE_USERS: 'manage_users',
  READ_USERS: 'read_users',
  
  // Settings
  MANAGE_SETTINGS: 'manage_settings',
  
  // Donations (Defined above)
  
  // Analytics & Reports
  READ_ANALYTICS: 'analytics.read',
  MANAGE_ANALYTICS: 'analytics.manage',
  READ_REPORTS: 'reports.read',
  MANAGE_REPORTS: 'reports.manage',
  EXPORT_REPORTS: 'reports.export',
  
  // Partners
  MANAGE_PARTNERS: 'partners.manage',
  READ_PARTNERS: 'partners.view',
  CREATE_PARTNERS: 'partners.create',
  EDIT_PARTNERS: 'partners.edit',
  DELETE_PARTNERS: 'partners.delete',
  
  // Activity Logs
  READ_ACTIVITY_LOGS: 'read_activity_logs',
  
} as const;

export type Permission = typeof PERMISSIONS[keyof typeof PERMISSIONS];
