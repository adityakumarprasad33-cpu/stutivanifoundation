import { 
  UserCircle, 
  CalendarDays, 
  CheckCircle, 
  Award, 
  FolderOpen, 
  Settings,
  Bell,
  Activity,
  LayoutDashboard
} from 'lucide-react';

export const PORTAL_NAV = [
  {
    title: 'Dashboard',
    href: '/portal',
    icon: LayoutDashboard,
  },
  {
    title: 'My Profile',
    href: '/portal/profile',
    icon: UserCircle,
  },
  {
    title: 'Assignments',
    href: '/portal/assignments',
    icon: CalendarDays,
  },
  {
    title: 'Attendance',
    href: '/portal/attendance',
    icon: CheckCircle,
  },
  {
    title: 'Performance',
    href: '/portal/performance',
    icon: Activity,
  },
  {
    title: 'Documents',
    href: '/portal/documents',
    icon: FolderOpen,
  },
  {
    title: 'Certificates',
    href: '/portal/certificates',
    icon: Award,
  },
];

export const PORTAL_BOTTOM_NAV = [
  {
    title: 'Notifications',
    href: '/portal/notifications',
    icon: Bell,
  },
  {
    title: 'Settings',
    href: '/portal/settings',
    icon: Settings,
  },
];
