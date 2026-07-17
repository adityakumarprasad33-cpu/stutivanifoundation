import { Timestamp } from 'firebase/firestore';
import type { CloudinaryAssetReference, ProjectDocument } from '../../projects/types/project.types';

export type ProgramStatus = 
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

export type ProgramPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
export type ProgramVisibility = 'PUBLIC' | 'INTERNAL' | 'PRIVATE';

export interface ProgramLocation {
  state: string;
  district: string;
  village?: string;
  latitude?: number;
  longitude?: number;
}

export interface ProgramFinancials {
  estimatedBudget: number;
  approvedBudget: number;
  fundsUtilized: number;
}

export interface ProgramBeneficiaries {
  expected: number;
  current: number;
  completed: number;
}

export interface Program {
  id: string; // Document ID
  name: string;
  slug: string;
  shortDescription: string;
  detailedDescription?: string;
  
  // Categorization
  categoryId: string; // Configuration driven
  status: ProgramStatus;
  priority: ProgramPriority;
  visibility: ProgramVisibility;
  tags: string[];
  isFeatured: boolean;

  // Strategic Direction
  objectives: string[];
  expectedOutcomes: string[];

  // Scope
  location: ProgramLocation;

  // Timeline
  startDate?: Timestamp | Date;
  endDate?: Timestamp | Date;
  expectedCompletionDate?: Timestamp | Date;

  // Stakeholders
  coordinatorId?: string;
  teamMemberIds: string[];
  partnerIds: string[];

  // Impact & Finance
  beneficiaries: ProgramBeneficiaries;
  financials: ProgramFinancials;
  progressPercentage: number; // Derived/cached

  // Media
  coverImage?: CloudinaryAssetReference;
  galleryImages: CloudinaryAssetReference[];
  documents: ProjectDocument[]; // Reusing document structure

  // SEO & Web
  seo: {
    metaTitle?: string;
    metaDescription?: string;
    canonicalUrl?: string;
    ogImage?: string;
    keywords: string[];
  };

  // Search Preparation
  normalizedTitle?: string;
  normalizedDescription?: string;
  searchVector?: number[]; // Future AI embeddings

  // Analytics Preparation
  analytics?: {
    views: number;
    shares: number;
    downloads: number;
    bookmarks: number;
  };

  // AI Integration Preparation
  ai?: {
    summary?: string;
    generatedTags?: string[];
    insights?: string[];
    impactReport?: string;
    lastAnalyzedAt?: Timestamp | Date;
  };

  // Auditing
  createdBy: string;
  updatedBy: string;
  createdAt: Timestamp | Date;
  updatedAt: Timestamp | Date;
  archivedAt?: Timestamp | Date;
  deletedAt?: Timestamp | Date;
}
