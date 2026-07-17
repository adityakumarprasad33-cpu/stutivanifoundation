import { FirebaseRepository } from '@/lib/firebase/shared';
import { COLLECTIONS } from '@/constants';
import type { Project, ProjectStatus } from '../types/project.types';
import { projectConverter } from './project.converter';
import { db } from '@/lib/firebase/client';
import { collection, doc, query, where, getDocs, updateDoc } from 'firebase/firestore';
import { DatabaseError } from '@/lib/errors';
import { ProjectPolicy } from '../policy/project.policy';

export class ProjectRepository extends FirebaseRepository<Project> {
  constructor() {
    super(COLLECTIONS.PROJECTS);
  }

  private getCollection() {
    return collection(db, this.collectionName).withConverter(projectConverter);
  }

  private getDocRef(id: string) {
    return doc(db, this.collectionName, id).withConverter(projectConverter);
  }

  /**
   * Generates a unique, SEO-friendly slug from a project name.
   */
  async generateUniqueSlug(name: string, excludeId?: string): Promise<string> {
    const baseSlug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric with hyphens
      .replace(/^-+|-+$/g, '');    // Remove leading/trailing hyphens

    let slug = baseSlug;
    let counter = 1;
    let isUnique = false;

    while (!isUnique) {
      const existing = await this.findBySlug(slug);
      
      if (!existing || (excludeId && existing.id === excludeId)) {
        isUnique = true;
      } else {
        counter++;
        slug = `${baseSlug}-${counter}`;
      }
    }

    return slug;
  }

  /**
   * Finds a project by its unique slug.
   */
  async findBySlug(slug: string): Promise<Project | null> {
    try {
      const q = query(this.getCollection(), where('slug', '==', slug));
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) return null;
      return querySnapshot.docs[0].data();
    } catch (error) {
      throw new DatabaseError(`Failed to fetch project by slug: ${slug}`, error instanceof Error ? error : undefined);
    }
  }

  /**
   * Updates a project's status, enforcing business rules.
   */
  async updateStatus(id: string, newStatus: ProjectStatus, currentStatus: ProjectStatus): Promise<void> {
    try {
      ProjectPolicy.enforceTransition(currentStatus, newStatus);
      
      const updates: Partial<Project> = {
        status: newStatus,
        updatedAt: new Date(),
      };

      if (newStatus === 'ARCHIVED') {
        updates.archivedAt = new Date();
      }
      
      if (newStatus === 'SOFT_DELETED') {
        updates.deletedAt = new Date();
      }

      await updateDoc(this.getDocRef(id), updates);
    } catch (error) {
      throw new DatabaseError(`Failed to transition project ${id} to ${newStatus}`, error instanceof Error ? error : undefined);
    }
  }

  // --- Extended Repository Methods ---

  async getFeaturedProjects(limitCount = 5): Promise<Project[]> {
    const q = query(
      this.getCollection(), 
      where('isFeatured', '==', true),
      where('status', 'in', ['PUBLISHED', 'ACTIVE']),
      where('visibility', '==', 'PUBLIC') // Assuming featured means public
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => doc.data()).slice(0, limitCount);
  }

  async getLatestProjects(limitCount = 10): Promise<Project[]> {
    const { data } = await this.query({
      filters: [
        { field: 'status', operator: 'in', value: ['PUBLISHED', 'ACTIVE'] },
        { field: 'visibility', operator: '==', value: 'PUBLIC' }
      ],
      limit: limitCount
    });
    return data;
  }

  async getProjectsByStatus(status: ProjectStatus): Promise<Project[]> {
    const { data } = await this.query({
      filters: [{ field: 'status', operator: '==', value: status }]
    });
    return data;
  }

  async getProjectsByCategory(categoryId: string): Promise<Project[]> {
    const { data } = await this.query({
      filters: [{ field: 'categoryId', operator: '==', value: categoryId }]
    });
    return data;
  }

  async getProjectsByLocation(state: string, district?: string): Promise<Project[]> {
    const filters: Array<{field: string; operator: '=='; value: string}> = [{ field: 'location.state', operator: '==', value: state }];
    if (district) {
      filters.push({ field: 'location.district', operator: '==', value: district });
    }
    
    const { data } = await this.query({ filters });
    return data;
  }

  /**
   * Prepares the architecture for advanced search.
   * Full text search requires Algolia/Elasticsearch or Firestore indexing.
   */
  async searchProjects(searchTerm: string): Promise<Project[]> {
    // Basic prefix search using the architectural normalizedTitle field
    const normalized = searchTerm.toLowerCase().trim();
    
    // Firestore supports a basic prefix search trick:
    const q = query(
      this.getCollection(),
      where('normalizedTitle', '>=', normalized),
      where('normalizedTitle', '<=', normalized + '\uf8ff')
    );
    
    try {
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => doc.data());
    } catch {
      // Fallback if index missing or field not populated yet
      return [];
    }
  }

  async getProjectStatistics(projectId: string) {
    const project = await this.getById(projectId);
    if (!project) throw new Error('Project not found');
    
    const { ProjectStatisticsService } = await import('./project-statistics.service');
    return ProjectStatisticsService.compute(project);
  }

  async getProjectSummary(projectId: string) {
    const project = await this.getById(projectId);
    if (!project) throw new Error('Project not found');
    
    return {
      id: project.id,
      name: project.name,
      slug: project.slug,
      status: project.status,
      phase: project.phase,
      progressPercentage: (await this.getProjectStatistics(projectId)).progressPercentage,
      location: project.location,
      coverImage: project.coverImage?.secureUrl,
    };
  }
}
