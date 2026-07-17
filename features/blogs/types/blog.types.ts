import { z } from 'zod';
import { 
  blogSchema, 
  blogStatusSchema, 
  blogVisibilitySchema,
  blogVersionHistorySchema,
  blogAIMetadataSchema,
  blogAnalyticsSchema,
  blogSEOSchema,
  blogAuthorSchema,
  blogRelationsSchema
} from '../validation/blog.schemas';

export type Blog = z.infer<typeof blogSchema>;
export type BlogStatus = z.infer<typeof blogStatusSchema>;
export type BlogVisibility = z.infer<typeof blogVisibilitySchema>;
export type BlogVersionHistory = z.infer<typeof blogVersionHistorySchema>;
export type BlogAIMetadata = z.infer<typeof blogAIMetadataSchema>;
export type BlogAnalytics = z.infer<typeof blogAnalyticsSchema>;
export type BlogSEO = z.infer<typeof blogSEOSchema>;
export type BlogAuthor = z.infer<typeof blogAuthorSchema>;
export type BlogRelations = z.infer<typeof blogRelationsSchema>;

export type CreateBlogDTO = Omit<Blog, 'id' | 'createdAt' | 'updatedAt' | 'archivedAt' | 'deletedAt'>;
export type UpdateBlogDTO = Partial<CreateBlogDTO>;
