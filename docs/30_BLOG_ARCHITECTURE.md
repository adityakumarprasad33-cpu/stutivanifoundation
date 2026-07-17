# Blogs Module & Content Management System (CMS) Architecture

## Overview
The Blogs Module represents the core Content Management System (CMS) for the Stuti-Vani Foundation. It enables the organization to draft, publish, and manage long-form content, articles, and organizational updates.

## Core Features
1. **Rich Text Editing:** Integrated with TipTap, providing extensive formatting, blockquotes, tables, and media embeds.
2. **Media Integration:** Seamless integration with the Gallery/DAM module using `MediaSelectorDialog` for inserting Cloudinary-hosted images and YouTube videos.
3. **SEO Management:** Granular control over meta titles, descriptions, focus keywords, indexing directives (noIndex, noFollow), and OpenGraph data.
4. **AI Readiness:** Pre-configured architecture for AI-assisted summaries, SEO suggestions, and readability scoring (`blog.aiMetadata`).
5. **Role-Based Access Control:** Strict permission-based publishing workflow ensuring only authorized personnel can approve or publish content.
6. **Version History & Auditing:** Continuous auditing using the `ActivityRepository` and version incrementing for compliance tracking.

## Domain Model
```typescript
interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string; // TipTap HTML
  featuredImageId?: string; // Reference to Media Library
  
  category: string;
  tags: string[];
  
  status: 'DRAFT' | 'PENDING_REVIEW' | 'APPROVED' | 'SCHEDULED' | 'PUBLISHED' | 'ARCHIVED' | 'SOFT_DELETED';
  visibility: 'PUBLIC' | 'INTERNAL' | 'PRIVATE';
  featured: boolean;
  
  author: {
    authorId: string;
    coAuthorIds: string[];
  };
  
  seo: BlogSEO;
  aiMetadata: BlogAIMetadata;
  relations: BlogRelations;
  analytics: BlogAnalytics;
}
```

## Security & Workflow
- **Creation:** `blogs.create` permission is required. Drafts are private by default.
- **Publishing:** `blogs.publish` permission (Admin/Super Admin) is required to transition content to `PUBLISHED` state.
- **Editing:** Editors can only update metadata and content without directly modifying slug URLs to prevent broken external links.
- **Media Security:** Media uploaded inside blogs follow strict Signed Upload constraints through the Gallery module. No raw files are directly injected; only references to the `media` collection are used.

## Search & Indexing
To support efficient frontend querying, `normalizedTitle` and `normalizedContent` (stripped of HTML) are automatically generated and synced on document updates.
