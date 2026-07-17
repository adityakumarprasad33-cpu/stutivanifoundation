import { Timestamp } from 'firebase/firestore'; // Using firestore timestamp for core types

export type ProjectStatus = 
  | 'DRAFT'
  | 'PENDING_REVIEW'
  | 'APPROVED'
  | 'PUBLISHED'
  | 'ACTIVE'
  | 'ON_HOLD'
  | 'COMPLETED'
  | 'CANCELLED'
  | 'ARCHIVED'
  | 'SOFT_DELETED';

export type ProjectPhase = 
  | 'PLANNING'
  | 'APPROVAL'
  | 'EXECUTION'
  | 'MONITORING'
  | 'COMPLETED';

export interface ProjectFinancials {
  estimatedBudget: number;
  approvedBudget: number;
  fundsRaised: number;
  fundsUtilized: number;
  // remainingBudget is derived: fundsRaised - fundsUtilized (or approvedBudget - fundsUtilized depending on rules)
}

export interface ProjectBeneficiaries {
  expected: number;
  current: number;
  completed: number;
}

export interface ProjectLocation {
  state: string;
  district: string;
  village?: string;
  latitude?: number;
  longitude?: number;
}

export interface ProjectSEO {
  metaTitle?: string;
  metaDescription?: string;
  canonicalUrl?: string;
  ogImage?: string;
  keywords?: string[];
}

export interface CloudinaryAssetReference {
  publicId: string;
  secureUrl: string;
  resourceType: 'image' | 'raw' | 'video';
  format?: string;
  bytes?: number;
  originalFilename?: string;
}

export interface ProjectDocument {
  id: string;
  title: string;
  type: 'PROPOSAL' | 'BUDGET' | 'APPROVAL' | 'REPORT' | 'OTHER';
  asset: CloudinaryAssetReference;
  uploadedAt: Timestamp | Date;
}

export interface Project {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  detailedDescription?: string;
  categoryId: string; // Ref to categories
  
  status: ProjectStatus;
  phase: ProjectPhase;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  visibility: 'PUBLIC' | 'PRIVATE' | 'INTERNAL';
  isFeatured: boolean;

  location: ProjectLocation;
  financials: ProjectFinancials;
  beneficiaries: ProjectBeneficiaries;

  // Dates
  startDate?: Timestamp | Date;
  endDate?: Timestamp | Date;
  expectedCompletionDate?: Timestamp | Date;

  // Relationships (IDs)
  managerId?: string;
  volunteerIds: string[];
  partnerIds: string[];
  programId?: string; // If it belongs to a larger program

  tags: string[];
  seo: ProjectSEO;

  // Media
  coverImage?: CloudinaryAssetReference;
  galleryImages: CloudinaryAssetReference[];
  documents: ProjectDocument[];

  // Auditing
  createdBy: string;
  updatedBy: string;
  createdAt: Timestamp | Date;
  updatedAt: Timestamp | Date;
  archivedAt?: Timestamp | Date;
  deletedAt?: Timestamp | Date;

  // Search Preparation
  normalizedTitle?: string;
  normalizedDescription?: string;
  searchVector?: number[]; // Future embeddings

  // Analytics Preparation
  analytics?: {
    views: number;
    shares: number;
    downloads: number;
    bookmarks: number;
  };

  // Relationships
  parentProjectId?: string;
  childProjectIds?: string[];
  relatedProjectIds?: string[];
  dependencyIds?: string[];

  // AI Integration Preparation
  ai?: {
    summary?: string;
    generatedTags?: string[];
    impactReport?: string;
    suggestedImprovements?: string[];
    lastAnalyzedAt?: Timestamp | Date;
  };
}
