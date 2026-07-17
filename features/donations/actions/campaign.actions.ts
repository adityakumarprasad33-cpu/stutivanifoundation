'use server';

import { revalidatePath } from 'next/cache';
import { campaignFormSchema, type CampaignFormData } from '../validation/campaign.schemas';
import { CampaignRepository } from '../services/campaign.repository';
import { DonationPolicy } from '../policy/donation.policy';
import { ActivityRepository } from '@/features/activity/services/activity.repository';
type ActionResponse<T> = { success: true; data?: T } | { success: false; error: string };
const slugify = (text: string) => text.toLowerCase().replace(/[\s_]+/g, '-').replace(/[^\w-]+/g, '');

export async function createCampaign(data: CampaignFormData): Promise<ActionResponse<string>> {
  try {
    await DonationPolicy.canManageCampaigns();
    
    const validated = campaignFormSchema.parse(data);
    const campaignRepo = new CampaignRepository();
    const activityRepo = new ActivityRepository();

    const campaign = await campaignRepo.create({
      ...validated,
      createdBy: 'SYSTEM',
      updatedBy: 'SYSTEM',
      slug: slugify(validated.title),
      raisedAmount: 0,
      donorCount: 0
    });

    await activityRepo.log({
      action: 'CAMPAIGN_CREATED',
      module: 'CAMPAIGNS',
      description: `Created campaign ${validated.title}`,
      metadata: { campaignId: campaign.id, goal: validated.goalAmount }
    });

    revalidatePath('/dashboard/campaigns');
    return { success: true, data: campaign.id };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}

export async function updateCampaign(id: string, data: CampaignFormData): Promise<ActionResponse<void>> {
  try {
    await DonationPolicy.canManageCampaigns();
    
    const validated = campaignFormSchema.parse(data);
    const campaignRepo = new CampaignRepository();
    const activityRepo = new ActivityRepository();

    await campaignRepo.update(id, {
      ...validated,
      slug: slugify(validated.title)
    });

    await activityRepo.log({
      action: 'CAMPAIGN_UPDATED',
      module: 'CAMPAIGNS',
      description: `Updated campaign ${validated.title}`,
      metadata: { campaignId: id }
    });

    revalidatePath('/dashboard/campaigns');
    revalidatePath(`/dashboard/campaigns/${id}`);
    return { success: true };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}

export async function deleteCampaign(id: string): Promise<ActionResponse<void>> {
  try {
    await DonationPolicy.canManageCampaigns();
    
    const campaignRepo = new CampaignRepository();
    const activityRepo = new ActivityRepository();

    await campaignRepo.delete(id);

    await activityRepo.log({
      action: 'CAMPAIGN_ARCHIVED',
      module: 'CAMPAIGNS',
      description: `Archived/Deleted campaign`,
      metadata: { campaignId: id }
    });

    revalidatePath('/dashboard/campaigns');
    return { success: true };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}
