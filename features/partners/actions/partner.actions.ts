'use server';

import { revalidatePath, revalidateTag } from 'next/cache';
import { partnerRepository } from '../services/partner.repository';
import { partnerSchema, type CreatePartnerDTO, type UpdatePartnerDTO } from '../types/partner.types';
import { requirePermission, requireAuth } from '@/lib/auth/server-guards';
import { ActivityRepository } from '@/features/activity/services/activity.repository';
import { PartnerPolicy } from '../policy/partner.policy';

const activityRepository = new ActivityRepository();

export async function createPartner(data: CreatePartnerDTO) {
  try {
    const session = await requireAuth();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await requirePermission(['partners.create'] as any);

    // Validate data (ignoring id, timestamps)
    const newPartner = await partnerRepository.createPartner(data);

    // Log Activity
    await activityRepository.create({
      userId: session.uid,
      action: 'PARTNER_CREATED',
      module: 'partners',
      description: `Created partner: ${newPartner.name}`,
      metadata: { partnerId: newPartner.id, partnerName: newPartner.name }
    } as any);

    revalidatePath('/dashboard/partners');
    revalidatePath('/');
    
    return { success: true, partner: newPartner };
  } catch (error) {
    console.error('Error in createPartner action:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export async function updatePartner(id: string, data: UpdatePartnerDTO) {
  try {
    const session = await requireAuth();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await requirePermission(['partners.edit'] as any);

    const oldPartner = await partnerRepository.getById(id);
    if (!oldPartner) throw new Error('Partner not found');

    const updatedPartner = await partnerRepository.updatePartner(id, data);

    // Log Activity
    await activityRepository.create({
      userId: session.uid,
      action: 'PARTNER_UPDATED',
      module: 'partners',
      description: `Updated partner: ${updatedPartner.name}`,
      metadata: { partnerId: id, changes: Object.keys(data) }
    } as any);

    revalidatePath('/dashboard/partners');
    revalidatePath(`/dashboard/partners/${id}`);
    revalidatePath('/');
    
    return { success: true, partner: updatedPartner };
  } catch (error) {
    console.error('Error in updatePartner action:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export async function togglePartnerStatus(id: string, currentStatus: boolean) {
  try {
    const session = await requireAuth();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await requirePermission(['partners.edit'] as any);

    const partner = await partnerRepository.getById(id);
    if (!partner) throw new Error('Partner not found');

    const newStatus = !currentStatus;
    await partnerRepository.update(id, { active: newStatus } as any);

    // Log Activity
    await activityRepository.create({
      userId: session.uid,
      action: newStatus ? 'PARTNER_ACTIVATED' : 'PARTNER_DEACTIVATED',
      module: 'partners',
      description: `${newStatus ? 'Activated' : 'Deactivated'} partner: ${partner.name}`,
      metadata: { partnerId: id }
    } as any);

    revalidatePath('/dashboard/partners');
    revalidatePath('/');
    
    return { success: true, active: newStatus };
  } catch (error) {
    console.error('Error in togglePartnerStatus action:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export async function deletePartner(id: string) {
  try {
    const session = await requireAuth();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await requirePermission(['partners.delete'] as any);

    const partner = await partnerRepository.getById(id);
    if (!partner) throw new Error('Partner not found');

    await partnerRepository.delete(id);

    // Log Activity
    await activityRepository.create({
      userId: session.uid,
      action: 'PARTNER_DELETED',
      module: 'partners',
      description: `Deleted partner: ${partner.name}`,
      metadata: { partnerId: id, partnerName: partner.name }
    } as any);

    revalidatePath('/dashboard/partners');
    revalidatePath('/');
    
    return { success: true };
  } catch (error) {
    console.error('Error in deletePartner action:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}
