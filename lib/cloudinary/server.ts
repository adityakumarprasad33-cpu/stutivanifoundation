import crypto from 'crypto';
import { env } from '@/lib/env';
import { ConfigurationError } from '@/lib/errors';

export interface CloudinarySignatureParams {
  timestamp: number;
  folder?: string;
  tags?: string;
}

export interface CloudinarySignatureResponse {
  signature: string;
  timestamp: number;
  apiKey: string;
  cloudName: string;
}

export class CloudinaryServer {
  static generateUploadSignature(params: Partial<CloudinarySignatureParams> = {}): CloudinarySignatureResponse {
    if (!env.CLOUDINARY_API_SECRET || !env.CLOUDINARY_API_KEY) {
      throw new ConfigurationError('Cloudinary API credentials are not configured');
    }

    const timestamp = Math.round(new Date().getTime() / 1000);
    
    // Sort parameters alphabetically as required by Cloudinary
    const payload = {
      timestamp,
      ...params,
    };
    
    const sortedParams = Object.keys(payload)
      .sort()
      .map(key => `${key}=${payload[key as keyof typeof payload]}`)
      .join('&');

    const signature = crypto
      .createHash('sha1')
      .update(sortedParams + env.CLOUDINARY_API_SECRET)
      .digest('hex');

    return {
      signature,
      timestamp,
      apiKey: env.CLOUDINARY_API_KEY,
      cloudName: env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    };
  }
}
