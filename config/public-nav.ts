export interface PublicNavItem {
  title: string;
  href: string;
  description?: string;
  items?: PublicNavItem[];
}

export const PUBLIC_NAV: PublicNavItem[] = [
  {
    title: 'About Us',
    href: '/about',
    items: [
      { title: 'Our Story', href: '/about#story', description: 'The history and mission of Stuti-Vani Foundation' },
      { title: 'Leadership', href: '/about#leadership', description: 'Meet our board members and directors' },
      { title: 'Partners', href: '/about#partners', description: 'Organizations that support our cause' },
    ]
  },
  {
    title: 'Programs',
    href: '/programs',
  },
  {
    title: 'Projects',
    href: '/projects',
  },
  {
    title: 'Events',
    href: '/events',
  },
  {
    title: 'Media',
    href: '#',
    items: [
      { title: 'Blogs & Articles', href: '/blogs', description: 'Read our latest updates and stories' },
      { title: 'Gallery', href: '/gallery', description: 'Photos and videos from our activities' },
    ]
  },
  {
    title: 'Contact',
    href: '/contact',
  }
];

export const FOOTER_LINKS = {
  organization: [
    { title: 'About Us', href: '/about' },
    { title: 'Contact', href: '/contact' },
    { title: 'Careers', href: '/careers' }, // Future
  ],
  initiatives: [
    { title: 'Programs', href: '/programs' },
    { title: 'Projects', href: '/projects' },
    { title: 'Events', href: '/events' },
  ],
  resources: [
    { title: 'Blogs', href: '/blogs' },
    { title: 'Gallery', href: '/gallery' },
    { title: 'Annual Reports', href: '/about#reports' },
  ],
  legal: [
    { title: 'Privacy Policy', href: '/privacy' },
    { title: 'Terms of Service', href: '/terms' },
    { title: 'Refund Policy', href: '/refunds' }, // Important for donations
  ]
};
