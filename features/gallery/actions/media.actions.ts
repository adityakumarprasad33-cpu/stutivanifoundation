'use server';

import { requireAuth, requirePermission } from '@/lib/auth/server-guards';
import { MediaRepository } from '../services/media.repository';
import { MediaUsageService } from '../services/media-usage.service';
import { mediaAssetSchema, type MediaAssetFormData } from '../validation/media.schemas';
import { ActivityRepository } from '@/features/activity/services/activity.repository';
import { CloudinaryServer, type CloudinarySignatureResponse, type CloudinarySignatureParams } from '@/lib/cloudinary/server';
import { revalidatePath } from 'next/cache';

const generateUniqueSlug = (title: string) => {
  const base = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  return `${base}-${Math.random().toString(36).substring(2, 6)}`;
};

const mediaRepo = new MediaRepository();
const usageService = new MediaUsageService();
const activityRepo = new ActivityRepository();

export async function generateCloudinarySignature(params: Partial<CloudinarySignatureParams> = {}): Promise<CloudinarySignatureResponse> {
  await requirePermission('gallery.upload');
  
  return CloudinaryServer.generateUploadSignature(params);
}

export async function createMediaAsset(data: MediaAssetFormData) {
  try {
    const user = await requireAuth();
    await requirePermission('gallery.upload');

    const validated = mediaAssetSchema.parse(data);
    const slug = generateUniqueSlug(validated.title);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mediaObj: any = {
      ...validated,
      slug,
      normalizedTitle: validated.title.toLowerCase().trim(),
      uploadedBy: user.id,
    };

    const created = await mediaRepo.create(mediaObj);

    await activityRepo.log({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      action: 'MEDIA_UPLOADED' as any,
      module: 'GALLERY',
      userId: user.id,
      description: `Uploaded media: ${validated.title}`,
      metadata: { entityId: created.id, title: validated.title, type: validated.assetType }
    });

    revalidatePath('/dashboard/gallery');
    return { success: true, id: created.id };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : 'Failed to create media asset' };
  }
}

export async function deleteMediaAsset(id: string) {
  try {
    const user = await requireAuth();
    await requirePermission('gallery.delete');

    const isUsed = await usageService.isAssetUsed(id);
    if (isUsed) {
      throw new Error('Cannot delete media that is currently in use. Remove references first.');
    }

    await mediaRepo.delete(id, false);

    await activityRepo.log({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      action: 'MEDIA_DELETED' as any,
      module: 'GALLERY',
      userId: user.id,
      description: `Deleted media: ${id}`,
      metadata: { entityId: id }
    });

    revalidatePath('/dashboard/gallery');
    return { success: true };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : 'Failed to delete media asset' };
  }
}
