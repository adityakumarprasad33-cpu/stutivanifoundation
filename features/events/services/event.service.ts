import type { Event } from '../types/event.types';

export class EventService {
  /**
   * Generates a URL-friendly slug from the event title
   */
  static generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  }

  /**
   * Normalizes a string for search (lowercase, removes special chars, splits into words)
   */
  static generateSearchVector(title: string, tags: string[] = []): string[] {
    const titleWords = title
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .split(/\s+/)
      .filter(word => word.length > 1);
      
    const tagWords = tags.map(t => t.toLowerCase());
    
    return Array.from(new Set([...titleWords, ...tagWords]));
  }

  /**
   * Validates capacity constraints (e.g., current registrations cannot exceed max capacity if not 0)
   */
  static validateCapacityConstraints(capacity: Event['capacity']): boolean {
    if (!capacity) return true;
    if (capacity.maximumCapacity > 0 && capacity.currentRegistrations > capacity.maximumCapacity) {
      return false; // Exceeded capacity
    }
    return true;
  }

  /**
   * Validates schedule constraints (end date must be after start date)
   */
  static validateSchedule(schedule: Event['schedule']): boolean {
    if (!schedule) return true;
    
    if (schedule.endDate <= schedule.startDate) {
      return false; // End date must be after start date
    }
    
    if (schedule.registrationStart && schedule.registrationEnd) {
      if (schedule.registrationEnd <= schedule.registrationStart) {
        return false; // Registration end must be after start
      }
    }
    
    return true;
  }
}
