import type { Volunteer } from '../types/volunteer.types';

export class VolunteerService {
  /**
   * Generates a unique, SEO-friendly slug for a volunteer
   */
  static generateSlug(firstName: string, lastName: string, volunteerNumber: string): string {
    const base = `${firstName} ${lastName}`
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    
    // Extract the unique number part from the volunteer number (e.g. VOL-2026-000001 -> 000001)
    const uniqueSuffix = volunteerNumber.split('-').pop() || Date.now().toString(36);
    
    return `${base}-${uniqueSuffix}`;
  }

  /**
   * Normalizes a string for search (lowercase, removes special chars)
   */
  static normalizeString(str: string): string {
    return str.toLowerCase().replace(/[^a-z0-9\s]/g, '').trim();
  }

  /**
   * Generates a search vector for a volunteer based on key fields
   */
  static generateSearchVector(volunteer: Partial<Volunteer>): string[] {
    const vector = new Set<string>();

    const addTokens = (str?: string) => {
      if (str) {
        const tokens = str.toLowerCase().split(/[\s-]+/);
        tokens.forEach(t => { if (t.length > 2) vector.add(t); });
      }
    };

    addTokens(volunteer.personalInfo?.firstName);
    addTokens(volunteer.personalInfo?.lastName);
    addTokens(volunteer.personalInfo?.email);
    addTokens(volunteer.personalInfo?.phone);
    addTokens(volunteer.volunteerNumber);
    addTokens(volunteer.volunteerType);
    
    if (volunteer.profileDetails?.skills) {
      volunteer.profileDetails.skills.forEach(addTokens);
    }
    
    if (volunteer.profileDetails?.occupation) {
      addTokens(volunteer.profileDetails.occupation);
    }

    return Array.from(vector);
  }
}
