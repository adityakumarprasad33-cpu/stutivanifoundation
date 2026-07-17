import React from 'react';
import { requirePermission } from '@/lib/auth/server-guards';
import { BlogRepository } from '@/features/blogs/services/blog.repository';
import { notFound } from 'next/navigation';
import { EditBlogClient } from './edit-client';

export const metadata = {
  title: 'Edit Blog | Stuti-Vani Foundation',
};

export default async function EditBlogPage({ params }: { params: Promise<{ slug: string }> }) {
  await requirePermission('blogs.edit');

  const { slug } = await params;
  const blogRepo = new BlogRepository();
  const blog = await blogRepo.getBySlug(slug);

  if (!blog) {
    notFound();
  }

  // Sanitize Date objects if necessary for Client Component
  const initialData = {
    ...blog,
    scheduledPublishDate: blog.scheduledPublishDate instanceof Date ? blog.scheduledPublishDate : undefined,
  };

  return <EditBlogClient initialData={initialData} slug={slug} />;
}
