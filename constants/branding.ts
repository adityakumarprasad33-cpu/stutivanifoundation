export const BRANDING = {
  ORGANIZATION: {
    NAME: 'Stuti-Vani Foundation',
    SHORT_NAME: 'Stuti-Vani',
    TAGLINE: 'An initiative to educate girl child',
    MISSION: 'Empower underprivileged children by providing quality of education, awareness and health care benefits, irrespective of caste and creed.',
    VISION: 'Overcome gender inequality in India by educating the girl child and providing affordable private education in rural India.',
    REGISTRATION_NUMBER: 'S000088',
    FOUNDER: 'Abhishek Kumar',
    TEAM: [
      {
        name: 'Abhishek Kumar',
        role: 'Founder & Secretary',
        description: 'He holds an MBA in healthcare management from Symbiosis International University, Pune. Builds future road map, planning, building strategies, project development and management.',
      },
      {
        name: 'Anisha Mehta',
        role: 'Treasurer',
        description: 'Consultant at Deloitte Consulting India Pvt. Ltd. Builds capacity of NGOs in improving grant and risk management strategies. Exceptional leadership in mobilizing people on gender issues.',
      }
    ],
  },

  CONTACT: {
    EMAIL: 'stutivanifoundation@gmail.com',
    PHONE: '+91-9028165232',
    ADDRESS: {
      STREET: '',
      CITY: 'Pune', // Symbiosis Pune / Founder's base
      REGION: 'Maharashtra',
      POSTAL_CODE: '',
      COUNTRY: 'India',
      DISPLAY: 'India',
    },
    HOURS: 'Mon-Sat: 9:00 AM - 6:00 PM',
  },

  BANKING: {
    ACCOUNT_NAME: 'Stuti-Vani Foundation',
    ACCOUNT_NUMBER: '3643073704',
    IFSC: 'CBIN0283807',
    PAYTM: '9028165232',
  },

  SOCIAL: {
    FACEBOOK_URL: 'https://www.facebook.com/stutivanifoundation/',
    TWITTER_URL: '',
    LINKEDIN_URL: '',
    INSTAGRAM_URL: '',
    YOUTUBE_URL: '',
  },

  ASSETS: {
    LOGO: '/branding/logo/logo.png', // TODO: Missing official asset
    FAVICON: '/branding/favicon/favicon.ico', // TODO: Missing official asset
    OG_IMAGE_DEFAULT: '/branding/og/default-og.png', // TODO: Missing official asset
    MANIFEST: '/branding/manifest/site.webmanifest',
  },

  COLORS: {
    PRIMARY: '#2563eb', // Sync with CSS
    SECONDARY: '#1e40af',
    ACCENT: '#3b82f6',
    BACKGROUND: '#ffffff',
    TEXT: '#111827',
  },

  DEFAULTS: {
    LANGUAGE: 'en-IN',
    TIMEZONE: 'Asia/Kolkata',
    CURRENCY: 'INR',
    DATE_FORMAT: 'DD/MM/YYYY',
    TIME_FORMAT: '12h',
  }
} as const;
