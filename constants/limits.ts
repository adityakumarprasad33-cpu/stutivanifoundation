export const LIMITS = {
  // Pagination
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
  
  // Files
  MAX_IMAGE_SIZE_MB: 5,
  MAX_DOCUMENT_SIZE_MB: 10,
  MAX_VIDEO_SIZE_MB: 50,
  
  // Input Lengths
  MAX_TITLE_LENGTH: 100,
  MAX_EXCERPT_LENGTH: 300,
  MAX_SLUG_LENGTH: 120,
  
  // Security
  MAX_LOGIN_ATTEMPTS: 5,
  LOCKOUT_DURATION_MS: 15 * 60 * 1000, // 15 mins
  SESSION_TIMEOUT_MS: 30 * 60 * 1000, // 30 mins
} as const;
