import React from 'react';
import { requirePermission } from '@/lib/auth/server-guards';
import { BlogRepository } from '@/features/blogs/services/blog.repository';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Blog Preview | Stuti-Vani Foundation',
};

export default async function BlogPreviewPage({ params }: { params: Promise<{ slug: string }> }) {
  await requirePermission('read_blogs');

  const { slug } = await params;
  const blogRepo = new BlogRepository();
  const blog = await blogRepo.getBySlug(slug);

  if (!blog) {
    notFound();
  }

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <Link href="/dashboard/blogs" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 dark:hover:text-white">
        <ArrowLeft size={16} className="mr-2" /> Back to Blogs
      </Link>
      
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-8">
        <div className="mb-8 border-b border-gray-200 dark:border-gray-800 pb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 rounded-full text-xs font-bold uppercase tracking-wider">
              {blog.category}
            </span>
            <span className="px-3 py-1 bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 rounded-full text-xs font-bold uppercase tracking-wider">
              {blog.status}
            </span>
            <span className="text-sm text-gray-500 ml-auto">
              {blog.analytics.readingTimeMinutes} min read
            </span>
          </div>
          
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4 leading-tight">
            {blog.title}
          </h1>
          
          {blog.excerpt && (
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
              {blog.excerpt}
            </p>
          )}
          
          <div className="flex items-center text-sm text-gray-500">
            <span>By {blog.author.authorId}</span>
            <span className="mx-2">•</span>
            <span>{blog.publishDate?.toLocaleDateString() || 'Unpublished'}</span>
          </div>
        </div>

        <div 
          className="prose prose-blue sm:prose lg:prose-lg xl:prose-xl dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: blog.content }} 
        />
      </div>
    </div>
  );
}
