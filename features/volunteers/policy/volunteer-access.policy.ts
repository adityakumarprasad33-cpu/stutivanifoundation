import { AuthorizationError } from '@/lib/errors';

export class VolunteerAccessPolicy {
  /**
   * Enforces that a volunteer can only access their own records.
   * Throws AuthorizationError if access is denied.
   */
  static validateSelfAccess(currentUserUid: string, resourceUserId: string) {
    if (!currentUserUid || currentUserUid !== resourceUserId) {
      throw new AuthorizationError('You are not authorized to access this volunteer record.');
    }
  }

  /**
   * Returns true if the user is authorized to access the record.
   */
  static canAccess(currentUserUid: string, resourceUserId: string): boolean {
    return currentUserUid === resourceUserId;
  }
}
