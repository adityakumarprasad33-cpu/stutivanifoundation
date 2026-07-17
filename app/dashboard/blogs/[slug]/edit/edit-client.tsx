'use client';

import React from 'react';
import { BlogForm } from '@/features/blogs/components/blog-form';
import { updateBlog } from '@/features/blogs/actions/blog.actions';
import { type BlogFormData } from '@/features/blogs/validation/blog.schemas';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

export function EditBlogClient({ initialData, slug }: { initialData: Partial<BlogFormData>, slug: string }) {
  const handleSubmit = async (data: BlogFormData) => {
    const result = await updateBlog(slug, data);
    if (result.success) {
      toast.success('Blog updated successfully');
    } else {
      toast.error(result.error || 'Failed to update blog');
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/blogs" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Edit Blog</h1>
          <p className="text-sm text-gray-500">Update the content piece.</p>
        </div>
      </div>
      
      <BlogForm initialData={initialData} onSubmit={handleSubmit} />
    </div>
  );
}
