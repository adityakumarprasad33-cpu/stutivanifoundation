import { verifySession } from '@/lib/auth/session.server';
import { hasPermission } from '@/lib/auth/guards';
import { redirect } from 'next/navigation';
import { ROUTES } from '@/constants/routes';
import { PERMISSIONS } from '@/constants/permissions';

export class AnalyticsPolicy {
  static async canViewAnalytics() {
    const claims = await verifySession();
    if (!claims) redirect(ROUTES.AUTH.UNAUTHORIZED);
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const authorized = hasPermission(claims.role, PERMISSIONS.READ_ANALYTICS as any);
    if (!authorized) redirect(ROUTES.AUTH.UNAUTHORIZED);
  }

  static async canManageAnalytics() {
    const claims = await verifySession();
    if (!claims) redirect(ROUTES.AUTH.UNAUTHORIZED);
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const authorized = hasPermission(claims.role, PERMISSIONS.MANAGE_ANALYTICS as any);
    if (!authorized) redirect(ROUTES.AUTH.UNAUTHORIZED);
  }

  static async canExportReports() {
    const claims = await verifySession();
    if (!claims) redirect(ROUTES.AUTH.UNAUTHORIZED);
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const authorized = hasPermission(claims.role, PERMISSIONS.EXPORT_REPORTS as any);
    if (!authorized) redirect(ROUTES.AUTH.UNAUTHORIZED);
  }
}
