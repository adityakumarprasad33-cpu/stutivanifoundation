import { env } from '@/lib/env';
import { UploadError } from '@/lib/errors';

import type { CloudinarySignatureResponse } from './server';

export interface CloudinaryUploadResponse {
  public_id: string;
  secure_url: string;
  width: number;
  height: number;
  bytes: number;
  format: string;
  resource_type: string;
}

/**
 * Generates an optimized Cloudinary Image URL
 */
export const getCloudinaryUrl = (publicId: string, width = 800, height?: number): string => {
  if (!publicId) return '';
  const heightTransform = height ? `,h_${height}` : '';
  return `https://res.cloudinary.com/${env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_fill,w_${width}${heightTransform},q_auto,f_auto/${publicId}`;
};

/**
 * Uploads a file to Cloudinary directly from the browser (signed)
 * Requires a signature payload generated from a secure Server Action
 */
export const uploadToCloudinary = async (file: File, signaturePayload: CloudinarySignatureResponse, folder?: string, tags?: string): Promise<CloudinaryUploadResponse> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('api_key', signaturePayload.apiKey);
  formData.append('timestamp', signaturePayload.timestamp.toString());
  formData.append('signature', signaturePayload.signature);
  
  if (folder) {
    formData.append('folder', folder);
  }
  
  if (tags) {
    formData.append('tags', tags);
  }

  try {
    const response = await fetch(`https://api.cloudinary.com/v1_1/${signaturePayload.cloudName}/auto/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Upload failed');
    }

    const data = await response.json();
    return data as CloudinaryUploadResponse;
  } catch (error) {
    throw new UploadError('Failed to upload file to Cloudinary securely', error as Error);
  }
};
