export type AssetType = 'IMAGE' | 'DOCUMENT' | 'YOUTUBE';
export type MediaStatus = 'TEMP_UPLOAD' | 'UPLOADED' | 'PROCESSING' | 'READY' | 'ARCHIVED' | 'SOFT_DELETED' | 'BROKEN_REFERENCE' | 'MISSING_ASSET';
export type Visibility = 'PUBLIC' | 'INTERNAL' | 'PRIVATE';

export interface MediaUsageMetadata {
  module: string; // e.g., 'PROGRAMS', 'PROJECTS'
  entityType: string; // e.g., 'Program', 'Project'
  entityId: string;
  fieldName: string; // e.g., 'coverImage', 'galleryImages'
  lastUsedAt: Date;
}

export interface MediaAsset {
  id: string;
  
  // Basic Metadata
  title: string;
  slug: string;
  description?: string;
  altText?: string;
  caption?: string;
  
  // Type and Categorization
  assetType: AssetType;
  categoryId?: string;
  tags: string[];
  keywords: string[];
  
  // Cloudinary Metadata (null for YouTube)
  cloudinary?: {
    publicId: string;
    secureUrl: string;
    thumbnailUrl: string;
    width?: number;
    height?: number;
    fileSize?: number; // bytes
    mimeType?: string;
    folder: string;
    version?: string;
  };

  // YouTube Metadata (null for Cloudinary assets)
  youtube?: {
    originalUrl: string;
    videoId: string;
    videoTitle?: string;
    channelName?: string;
    thumbnailUrl?: string;
    duration?: string;
    embedUrl: string;
  };
  
  // State & Visibility
  status: MediaStatus;
  visibility: Visibility;
  isFeatured: boolean;
  
  // Search & Analytics Preparation
  normalizedTitle: string;
  normalizedFilename?: string;
  searchVector?: number[]; // future AI search
  analytics?: {
    views: number;
    downloads: number;
    shares: number;
    copies: number;
    embeds: number;
    bookmarks: number;
  };

  // Usage Tracking
  usages: MediaUsageMetadata[];
  referenceCount: number;

  // Audit
  uploadedBy: string; // User ID
  createdAt: Date;
  updatedAt: Date;
  archivedAt?: Date;
  deletedAt?: Date;
}
