import { FirebaseRepository } from '@/lib/firebase/shared/FirebaseRepository';
import type { Program, ProgramStatus } from '../types/program.types';
import { db } from '@/lib/firebase/client';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { DatabaseError } from '@/lib/errors';
import { ProgramPolicy } from '../policy/program.policy';

export class ProgramRepository extends FirebaseRepository<Program> {
  constructor() {
    super('programs');
  }

  /**
   * Generates a unique slug for a program.
   */
  async generateUniqueSlug(baseName: string): Promise<string> {
    const slugify = (text: string) => text.toString().toLowerCase().trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-');

    const baseSlug = slugify(baseName);
    let uniqueSlug = baseSlug;
    let counter = 1;

    while (true) {
      const existing = await this.findBySlug(uniqueSlug);
      if (!existing) return uniqueSlug;
      uniqueSlug = `${baseSlug}-${counter}`;
      counter++;
    }
  }

  async findBySlug(slug: string): Promise<Program | null> {
    try {
      const { data } = await this.query({ filters: [{ field: 'slug', operator: '==', value: slug }] });
      return data[0] || null;
    } catch (error) {
      throw new DatabaseError(`Failed to fetch program by slug: ${slug}`, error instanceof Error ? error : undefined);
    }
  }

  async updateStatus(id: string, newStatus: ProgramStatus, updatedBy: string): Promise<void> {
    try {
      const program = await this.getById(id);
      if (!program) throw new Error('Program not found');

      if (!ProgramPolicy.isValidTransition(program.status, newStatus)) {
        throw new Error(`Invalid status transition from ${program.status} to ${newStatus}`);
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const updates: Record<string, any> = {
        status: newStatus,
        updatedBy,
        updatedAt: new Date(),
      };

      if (newStatus === 'ARCHIVED') {
        updates.archivedAt = new Date();
      }

      if (newStatus === 'SOFT_DELETED') {
        updates.deletedAt = new Date();
      }

      await this.update(id, updates);
    } catch (error) {
      throw new DatabaseError(`Failed to transition program ${id} to ${newStatus}`, error instanceof Error ? error : undefined);
    }
  }

  // --- Extended Repository Methods ---

  async getFeaturedPrograms(limitCount = 5): Promise<Program[]> {
    const { data } = await this.query({
      filters: [
        { field: 'isFeatured', operator: '==', value: true },
        { field: 'status', operator: 'in', value: ['PUBLISHED', 'ACTIVE'] },
        { field: 'visibility', operator: '==', value: 'PUBLIC' }
      ]
    });
    return data.slice(0, limitCount);
  }

  async getLatestPrograms(limitCount = 10): Promise<Program[]> {
    const { data } = await this.query({
      filters: [
        { field: 'status', operator: 'in', value: ['PUBLISHED', 'ACTIVE'] },
        { field: 'visibility', operator: '==', value: 'PUBLIC' }
      ],
      limit: limitCount
    });
    return data; // Ordering usually applied on client or using composite index
  }

  async getProgramsByCoordinator(coordinatorId: string): Promise<Program[]> {
    const { data } = await this.query({
      filters: [{ field: 'coordinatorId', operator: '==', value: coordinatorId }]
    });
    return data;
  }

  async getProgramsByStatus(status: ProgramStatus): Promise<Program[]> {
    const { data } = await this.query({
      filters: [{ field: 'status', operator: '==', value: status }]
    });
    return data;
  }

  async getProgramsByCategory(categoryId: string): Promise<Program[]> {
    const { data } = await this.query({
      filters: [{ field: 'categoryId', operator: '==', value: categoryId }]
    });
    return data;
  }

  async getProgramsByLocation(state: string, district?: string): Promise<Program[]> {
    const filters: Array<{field: string; operator: '=='; value: string}> = [{ field: 'location.state', operator: '==', value: state }];
    if (district) {
      filters.push({ field: 'location.district', operator: '==', value: district });
    }
    
    const { data } = await this.query({ filters });
    return data;
  }

  async searchPrograms(searchTerm: string): Promise<Program[]> {
    const normalized = searchTerm.toLowerCase().trim();
    const q = query(
      collection(db, this.collectionName),
      where('normalizedTitle', '>=', normalized),
      where('normalizedTitle', '<=', normalized + '\uf8ff')
    );
    
    try {
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as unknown as Program[];
    } catch {
      return [];
    }
  }

  async getProgramStatistics(programId: string) {
    const program = await this.getById(programId);
    if (!program) throw new Error('Program not found');
    
    const { ProgramStatisticsService } = await import('./program-statistics.service');
    return await ProgramStatisticsService.compute(program);
  }

  async getProgramSummary(programId: string) {
    const program = await this.getById(programId);
    if (!program) throw new Error('Program not found');
    
    return {
      id: program.id,
      name: program.name,
      slug: program.slug,
      status: program.status,
      coverImage: program.coverImage?.secureUrl,
    };
  }
}
