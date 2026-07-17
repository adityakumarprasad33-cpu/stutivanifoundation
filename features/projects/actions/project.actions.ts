'use server';

import { revalidatePath } from 'next/cache';
import { ProjectRepository } from '../services/project.repository';
import { projectSchema, type ProjectFormData } from '../validation/project.schemas';
import { requirePermission, requireAuth } from '@/lib/auth/server-guards';
import { ActivityRepository } from '@/features/activity/services/activity.repository';
import type { Project } from '../types/project.types';

const projectRepository = new ProjectRepository();
const activityRepository = new ActivityRepository();

export async function createProject(data: ProjectFormData) {
  try {
    const session = await requireAuth();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await requirePermission(['projects.create'] as any); // Type assertion until permissions are merged

    const validatedData = projectSchema.parse(data);

    // Auto-generate Slug
    const slug = await projectRepository.generateUniqueSlug(validatedData.name);

    const now = new Date();
    
    // Explicitly construct the Project object to avoid passing unexpected fields
    const newProject: Omit<Project, 'id'> = {
      ...validatedData,
      startDate: validatedData.startDate || undefined,
      endDate: validatedData.endDate || undefined,
      expectedCompletionDate: validatedData.expectedCompletionDate || undefined,
      slug,
      status: 'DRAFT', // Always start as Draft from UI
      createdBy: session.uid,
      updatedBy: session.uid,
      createdAt: now,
      updatedAt: now,
      seo: {
        ...validatedData.seo,
        canonicalUrl: validatedData.seo.canonicalUrl || `https://stutivani.org/projects/${slug}`
      }
    };

    const createdId = await projectRepository.create(newProject as Project);

    // Audit Log
    await activityRepository.log({
      userId: session.uid,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      action: 'CREATE' as any,
      module: 'PROJECTS',
      description: `Created project: ${validatedData.name}`,
      metadata: { projectId: createdId, slug }
    });

    revalidatePath('/dashboard/projects');
    return { success: true, id: createdId, slug };
  } catch (error) {
    console.error('Failed to create project:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export async function updateProject(id: string, data: ProjectFormData) {
  try {
    const session = await requireAuth();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await requirePermission(['projects.edit'] as any);

    const validatedData = projectSchema.parse(data);
    const existing = await projectRepository.getById(id);

    if (!existing) {
      throw new Error('Project not found');
    }

    // Re-evaluate slug only if name drastically changed and user requests it? 
    // Usually slugs shouldn't change after publication for SEO reasons.
    // For now, keep the original slug unless it's a draft.
    let slug = existing.slug;
    if (existing.status === 'DRAFT' && existing.name !== validatedData.name) {
      slug = await projectRepository.generateUniqueSlug(validatedData.name, id);
    }

    const updates: Partial<Project> = {
      ...validatedData,
      startDate: validatedData.startDate || undefined,
      endDate: validatedData.endDate || undefined,
      expectedCompletionDate: validatedData.expectedCompletionDate || undefined,
      slug,
      updatedBy: session.uid,
      updatedAt: new Date(),
    };

    await projectRepository.update(id, updates);

    await activityRepository.log({
      userId: session.uid,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      action: 'UPDATE' as any,
      module: 'PROJECTS',
      description: `Updated project: ${validatedData.name}`,
      oldValue: existing,
      newValue: { ...existing, ...updates },
      metadata: { projectId: id }
    });

    revalidatePath('/dashboard/projects');
    revalidatePath(`/dashboard/projects/${slug}`);
    
    return { success: true, slug };
  } catch (error) {
    console.error('Failed to update project:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}
