import { hasPermission } from '@/lib/auth/guards';
import { PERMISSIONS } from '@/constants/permissions';
import { redirect } from 'next/navigation';
import { ROUTES } from '@/constants/routes';
import { verifySession } from '@/lib/auth/session.server';

export class DonationPolicy {
  static async checkPermission(permission: string) {
    const claims = await verifySession();
    if (!claims) redirect(ROUTES.AUTH.UNAUTHORIZED);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const authorized = hasPermission(claims.role, permission as any);
    if (!authorized) redirect(ROUTES.AUTH.UNAUTHORIZED);
  }

  static async canManageDonors() {
    await this.checkPermission(PERMISSIONS.MANAGE_DONORS);
  }

  static async canViewDonors() {
    await this.checkPermission(PERMISSIONS.READ_DONORS);
  }

  static async canManageDonations() {
    await this.checkPermission(PERMISSIONS.MANAGE_DONATIONS);
  }

  static async canViewDonations() {
    await this.checkPermission(PERMISSIONS.READ_DONATIONS);
  }

  static async canManageCampaigns() {
    await this.checkPermission(PERMISSIONS.MANAGE_CAMPAIGNS);
  }

  static async canViewCampaigns() {
    await this.checkPermission(PERMISSIONS.READ_CAMPAIGNS);
  }

  static async canManageFinance() {
    await this.checkPermission(PERMISSIONS.MANAGE_FINANCE);
  }

  static async canViewFinance() {
    await this.checkPermission(PERMISSIONS.READ_FINANCE);
  }
}
