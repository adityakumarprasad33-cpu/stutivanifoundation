'use client';

import React from 'react';
import { BlogForm } from '@/features/blogs/components/blog-form';
import { createBlog } from '@/features/blogs/actions/blog.actions';
import { type BlogFormData } from '@/features/blogs/validation/blog.schemas';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

export default function CreateBlogPage() {
  const router = useRouter();

  const handleSubmit = async (data: BlogFormData) => {
    const result = await createBlog(data);
    if (result.success) {
      toast.success('Blog created successfully');
      router.push(`/dashboard/blogs/${result.slug}/edit`);
    } else {
      toast.error(result.error || 'Failed to create blog');
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/blogs" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Create New Blog</h1>
          <p className="text-sm text-gray-500">Initialize a new content piece.</p>
        </div>
      </div>
      
      <BlogForm onSubmit={handleSubmit} />
    </div>
  );
}
