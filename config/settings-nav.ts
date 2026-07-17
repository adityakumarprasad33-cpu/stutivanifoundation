import { LucideIcon, Building2, Palette, ShieldCheck, Users, KeyRound, Bell, Activity, ServerCog } from 'lucide-react';
import type { Role, Permission } from '@/constants';

export interface SettingsNavigationItem {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  roles?: Role[];
  permission?: Permission;
}

export const SETTINGS_NAVIGATION: SettingsNavigationItem[] = [
  {
    id: 'organization',
    title: 'Organization',
    description: 'Manage foundation details, branding, localization, and legal information.',
    icon: Building2,
    href: '/dashboard/settings/organization',
    roles: ['super_admin'],
  },
  {
    id: 'users',
    title: 'Users & Access',
    description: 'Manage administrative users, invite staff, and view statuses.',
    icon: Users,
    href: '/dashboard/settings/users',
    roles: ['super_admin'],
  },
  {
    id: 'roles',
    title: 'Roles & Permissions',
    description: 'View the access matrix and permission assignments.',
    icon: KeyRound,
    href: '/dashboard/settings/roles',
    roles: ['super_admin'],
  },
  {
    id: 'security',
    title: 'Security',
    description: 'Manage password policies, session lengths, and authentication logs.',
    icon: ShieldCheck,
    href: '/dashboard/settings/security',
    roles: ['super_admin'],
  },
  {
    id: 'appearance',
    title: 'Appearance',
    description: 'Customize the dashboard theme, UI layout, and visual preferences.',
    icon: Palette,
    href: '/dashboard/settings/appearance',
  },
  {
    id: 'notifications',
    title: 'Notifications',
    description: 'Configure email alerts, push notifications, and activity digests.',
    icon: Bell,
    href: '/dashboard/settings/notifications',
  },
  {
    id: 'system',
    title: 'System Health',
    description: 'Monitor Firebase, Cloudinary, API limits, and application status.',
    icon: ServerCog,
    href: '/dashboard/settings/system',
    roles: ['super_admin'],
  },
  {
    id: 'activity',
    title: 'Audit Logs',
    description: 'View the comprehensive history of system modifications and logins.',
    icon: Activity,
    href: '/dashboard/settings/activity',
    roles: ['super_admin'],
  }
];
