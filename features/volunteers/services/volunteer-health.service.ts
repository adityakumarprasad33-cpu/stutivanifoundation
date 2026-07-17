export class VolunteerHealthService {
  /**
   * Computes the burnout risk based on recent activity volume.
   */
  static computeBurnoutRisk(completedHours: number, lastActive: Date | null): 'LOW' | 'MEDIUM' | 'HIGH' {
    if (!lastActive) return 'LOW';
    
    const daysSinceLastActive = (new Date().getTime() - lastActive.getTime()) / (1000 * 3600 * 24);
    
    // If they have been extremely active recently and putting in massive hours
    // (e.g. over 100 hours and active within the last 14 days)
    if (completedHours > 100 && daysSinceLastActive < 14) {
      return 'HIGH';
    }
    
    if (completedHours > 50 && daysSinceLastActive < 30) {
      return 'MEDIUM';
    }

    return 'LOW';
  }
}
