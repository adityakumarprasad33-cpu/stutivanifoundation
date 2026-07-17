'use server';

import { ProgramRepository } from '../services/program.repository';
import { programSchema, type ProgramFormData } from '../validation/program.schemas';
import { requirePermission, requireAuth } from '@/lib/auth/server-guards';
import { ActivityRepository } from '@/features/activity/services/activity.repository';
import type { Program } from '../types/program.types';

const programRepository = new ProgramRepository();
const activityRepository = new ActivityRepository();

export async function createProgram(data: ProgramFormData) {
  try {
    const session = await requireAuth();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await requirePermission(['programs.create'] as any);

    const validatedData = programSchema.parse(data);

    // Auto-generate unique slug
    const slug = await programRepository.generateUniqueSlug(validatedData.name);

    // Explicitly construct the Program object
    const newProgram: Omit<Program, 'id'> = {
      ...validatedData,
      startDate: validatedData.startDate || undefined,
      endDate: validatedData.endDate || undefined,
      expectedCompletionDate: validatedData.expectedCompletionDate || undefined,
      slug,
      status: 'DRAFT', // Always start as Draft from UI
      createdBy: session.uid,
      updatedBy: session.uid,
      createdAt: new Date(),
      updatedAt: new Date(),
      progressPercentage: 0,
    };

    const createdId = await programRepository.create(newProgram);

    // Audit Log
    await activityRepository.log({
      userId: session.uid,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      action: 'CREATE' as any,
      module: 'PROGRAMS',
      description: `Created program: ${validatedData.name}`,
      metadata: { programId: createdId, slug }
    });

    return { success: true, id: createdId, slug };
  } catch (error) {
    console.error('Error creating program:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export async function updateProgram(id: string, data: ProgramFormData) {
  try {
    const session = await requireAuth();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await requirePermission(['programs.edit'] as any);

    const validatedData = programSchema.parse(data);
    const existing = await programRepository.getById(id);
    if (!existing) throw new Error('Program not found');

    // Only regenerate slug if name changed significantly (optional logic, kept simple here)
    let slug = existing.slug;
    if (existing.name !== validatedData.name) {
      slug = await programRepository.generateUniqueSlug(validatedData.name);
    }

    const updates: Partial<Program> = {
      ...validatedData,
      startDate: validatedData.startDate || undefined,
      endDate: validatedData.endDate || undefined,
      expectedCompletionDate: validatedData.expectedCompletionDate || undefined,
      slug,
      updatedBy: session.uid,
      updatedAt: new Date(),
    };

    await programRepository.update(id, updates);

    await activityRepository.log({
      userId: session.uid,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      action: 'UPDATE' as any,
      module: 'PROGRAMS',
      description: `Updated program: ${validatedData.name}`,
      oldValue: existing,
      newValue: { ...existing, ...updates },
      metadata: { programId: id, slug }
    });

    return { success: true, id, slug };
  } catch (error) {
    console.error('Error updating program:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}
