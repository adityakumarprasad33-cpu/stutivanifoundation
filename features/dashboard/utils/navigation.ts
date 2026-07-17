import { dashboardNavigation } from '@/config/dashboard-nav';
import type { NavigationItem } from '@/config/dashboard-nav';
import type { Role } from '@/constants';
import { hasPermission } from '@/lib/auth/guards';

export const getAccessibleNavigation = (role: Role | null): NavigationItem[] => {
  if (!role) return [];
  
  const allItems = dashboardNavigation.getItems();
  
  return allItems.filter(item => {
    if (item.hidden) return false;
    
    // Role check
    if (item.roles && !item.roles.includes(role)) {
      return false;
    }
    
    // Permission check
    if (item.permission && !hasPermission(role, item.permission)) {
      return false;
    }
    
    return true;
  });
};

export interface Breadcrumb {
  title: string;
  href?: string;
  active?: boolean;
}

export const generateBreadcrumbs = (pathname: string): Breadcrumb[] => {
  const items = dashboardNavigation.getItems();
  const paths = pathname.split('/').filter(Boolean);
  
  const breadcrumbs: Breadcrumb[] = [];
  
  // Base dashboard crumb
  breadcrumbs.push({
    title: 'Dashboard',
    href: '/dashboard',
    active: paths.length === 1 && paths[0] === 'dashboard'
  });

  if (paths.length > 1) {
    let currentPath = '/dashboard';
    
    for (let i = 1; i < paths.length; i++) {
      currentPath += `/${paths[i]}`;
      
      // Try to find a matching module in the config
      const matchingItem = items.find(item => item.href === currentPath);
      
      // If we found a config item, use its title. Otherwise, format the path segment.
      const title = matchingItem ? matchingItem.title : formatPathSegment(paths[i]);
      
      breadcrumbs.push({
        title,
        href: i === paths.length - 1 ? undefined : currentPath,
        active: i === paths.length - 1
      });
    }
  }

  return breadcrumbs;
};

const formatPathSegment = (segment: string): string => {
  // Replace hyphens with spaces and capitalize
  return segment
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};
