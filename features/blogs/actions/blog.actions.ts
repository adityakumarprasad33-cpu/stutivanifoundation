'use server';

import { requireAuth, requirePermission } from '@/lib/auth/server-guards';
import { BlogRepository } from '../services/blog.repository';
import { BlogService } from '../services/blog.service';
import { BlogSEOService } from '../services/blog-seo.service';
import { blogFormSchema, type BlogFormData } from '../validation/blog.schemas';
import { ActivityRepository } from '@/features/activity/services/activity.repository';
import { revalidatePath } from 'next/cache';
import type { CreateBlogDTO } from '../types/blog.types';

const blogRepo = new BlogRepository();
const activityRepo = new ActivityRepository();

export async function createBlog(data: BlogFormData) {
  try {
    const user = await requireAuth();
    await requirePermission('blogs.create');

    const validated = blogFormSchema.parse(data);
    const slug = validated.slug || BlogService.generateSlug(validated.title);
    
    const existing = await blogRepo.getBySlug(slug);
    if (existing) {
      return { success: false, error: 'A blog with this slug already exists' };
    }

    const seo = BlogSEOService.prepareSEO(validated);
    const readingTime = BlogService.calculateReadingTime(validated.content);
    
    const blogObj: CreateBlogDTO = {
      ...validated,
      slug,
      seo,
      analytics: {
        views: 0,
        uniqueViews: 0,
        readingTimeMinutes: readingTime,
        wordCount: BlogService.countWords(validated.content),
        shares: 0,
        downloads: 0,
        bookmarks: 0,
      },
      allowComments: false,
      aiMetadata: {},
      normalizedTitle: validated.title.toLowerCase(),
      normalizedContent: BlogService.normalizeContent(validated.content),
      latestRevisionNumber: 1,
      createdBy: user.id,
      updatedBy: user.id,
    };

    const created = await blogRepo.create(blogObj);

    await activityRepo.log({
      action: 'BLOG_CREATED',
      module: 'BLOGS',
      userId: user.id,
      description: `Created blog: ${validated.title}`,
      metadata: { entityId: created.id, title: validated.title }
    });

    revalidatePath('/dashboard/blogs');
    return { success: true, slug: created.slug };
  } catch (error: unknown) {
    console.error('Error creating blog:', error);
    return { success: false, error: (error as Error).message || 'Failed to create blog' };
  }
}

export async function updateBlog(slug: string, data: BlogFormData) {
  try {
    const user = await requireAuth();
    await requirePermission('blogs.edit');

    const existing = await blogRepo.getBySlug(slug);
    if (!existing) {
      return { success: false, error: 'Blog not found' };
    }

    const validated = blogFormSchema.parse(data);
    const readingTime = BlogService.calculateReadingTime(validated.content);
    
    // We do not allow slug changes on update to preserve URLs, unless explicitly needed.
    // For now we keep existing slug.
    
    await blogRepo.update(existing.id, {
      ...validated,
      slug: existing.slug,
      analytics: {
        ...existing.analytics,
        readingTimeMinutes: readingTime,
        wordCount: BlogService.countWords(validated.content),
      },
      normalizedTitle: validated.title.toLowerCase(),
      normalizedContent: BlogService.normalizeContent(validated.content),
      latestRevisionNumber: existing.latestRevisionNumber + 1,
      updatedBy: user.id,
    });

    await activityRepo.log({
      action: 'BLOG_UPDATED',
      module: 'BLOGS',
      userId: user.id,
      description: `Updated blog: ${validated.title}`,
      metadata: { entityId: existing.id, title: validated.title }
    });

    revalidatePath(`/dashboard/blogs/${existing.slug}`);
    revalidatePath('/dashboard/blogs');
    return { success: true };
  } catch (error: unknown) {
    console.error('Error updating blog:', error);
    return { success: false, error: (error as Error).message || 'Failed to update blog' };
  }
}
