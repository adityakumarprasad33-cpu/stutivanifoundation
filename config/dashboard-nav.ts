import type { Role, Permission } from '@/constants';
import { LucideIcon } from 'lucide-react';

export interface NavigationItem {
  id: string;
  title: string;
  description?: string;
  icon?: LucideIcon;
  href?: string;
  group?: string;
  order: number;
  badge?: string | number;
  permission?: Permission;
  roles?: Role[];
  featureFlag?: string;
  hidden?: boolean;
  children?: NavigationItem[];
}

// Global registry for plugins to inject navigation items at runtime or build time
class NavigationRegistry {
  private items: NavigationItem[] = [];

  register(item: NavigationItem) {
    this.items.push(item);
  }

  registerMany(items: NavigationItem[]) {
    this.items.push(...items);
  }

  getItems(): NavigationItem[] {
    return this.items.sort((a, b) => a.order - b.order);
  }
}

export const dashboardNavigation = new NavigationRegistry();

// Base Configuration
import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  Target,
  FolderKanban, 
  CalendarDays, 
  Image, 
  HeartHandshake, 
  Gift, 
  MessageSquare, 
  BarChart3,
  BarChart2
} from 'lucide-react';

dashboardNavigation.registerMany([

  {
    id: 'overview',
    title: 'Overview',
    href: '/dashboard',
    icon: LayoutDashboard,
    order: 10,
    group: 'Main',
  },
  {
    id: 'programs',
    title: 'Programs',
    href: '/dashboard/programs',
    icon: Target,
    permission: 'programs.view',
    order: 15,
    group: 'Main',
  },
  {
    id: 'projects',
    title: 'Projects',
    href: '/dashboard/projects',
    icon: FolderKanban,
    permission: 'read_projects' as Permission,
    order: 20,
    group: 'Content',
  },
  {
    id: 'events',
    title: 'Events',
    href: '/dashboard/events',
    icon: CalendarDays,
    permission: 'events.view' as Permission,
    order: 30,
    group: 'Content',
  },
  {
    id: 'blogs',
    title: 'Blogs',
    href: '/dashboard/blogs',
    icon: MessageSquare,
    permission: 'read_blogs' as Permission,
    order: 40,
    group: 'Content',
  },
  {
    id: 'gallery',
    title: 'Gallery',
    href: '/dashboard/gallery',
    icon: Image,
    permission: 'gallery.view' as Permission,
    order: 50,
    group: 'Content',
  },
  {
    id: 'events',
    title: 'Events',
    href: '/dashboard/events',
    icon: CalendarDays,
    order: 60,
    group: 'Community',
  },
  {
    id: 'donations',
    title: 'Donations',
    href: '/dashboard/donations',
    icon: Gift,
    order: 62,
    group: 'Community',
  },
  {
    id: 'campaigns',
    title: 'Campaigns',
    href: '/dashboard/campaigns',
    icon: Target,
    order: 64,
    group: 'Community',
  },
  {
    id: 'volunteers',
    title: 'Volunteers',
    href: '/dashboard/volunteers',
    icon: Users,
    description: 'Manage volunteers and workforce',
    permission: 'volunteers.view' as Permission,
    order: 65,
    group: 'Community',
  },
  {
    id: 'donations',
    title: 'Donations',
    href: '/dashboard/donations',
    icon: Gift,
    order: 70,
    group: 'Community',
    roles: ['super_admin', 'admin'],
  },
  {
    id: 'volunteers',
    title: 'Volunteers',
    href: '/dashboard/volunteers',
    icon: HeartHandshake,
    order: 80,
    group: 'Community',
  },
  {
    id: 'analytics',
    title: 'Analytics',
    href: '/dashboard/analytics',
    icon: BarChart3,
    order: 90,
    group: 'System',
    roles: ['super_admin', 'admin'],
  },
  {
    id: 'users',
    title: 'Users',
    href: '/dashboard/users',
    icon: Users,
    order: 100,
    group: 'System',
    roles: ['super_admin'],
  },
  {
    id: 'settings',
    title: 'Settings',
    href: '/dashboard/settings',
    icon: Settings,
    order: 90,
    group: 'Platform',
    permission: 'manage_settings' as Permission
  },
  {
    id: 'reports',
    title: 'Reports & Analytics',
    href: '/dashboard/analytics',
    icon: BarChart2,
    order: 72,
    group: 'Platform',
    permission: 'analytics.read' as Permission
  }
]);
