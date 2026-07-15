/**
 * Cloudinary Service Abstractions
 * 
 * Note: No upload logic should exist yet. This is a placeholder for future implementation.
 */

export interface CloudinaryAsset {
  publicId: string;
  secureUrl: string;
  assetType: 'image' | 'video' | 'raw';
  width?: number;
  height?: number;
  format?: string;
}

// TODO: Implement abstractions for generating signed URLs, uploading, deleting, and fetching transformations
