import React from 'react';
import { requirePermission } from '@/lib/auth/server-guards';
import { BlogRepository } from '@/features/blogs/services/blog.repository';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Blogs | Stuti-Vani Foundation',
};

export default async function BlogsPage() {
  await requirePermission('read_blogs');

  const blogRepo = new BlogRepository();
  const { data: blogs } = await blogRepo.query({ sort: [{ field: 'publishDate', direction: 'desc' }] });

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Blogs</h1>
          <p className="text-sm text-gray-500">Manage organizational publishing and content.</p>
        </div>
        <Link href="/dashboard/blogs/create">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Create Blog
          </Button>
        </Link>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
        <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
          <thead className="bg-gray-50 dark:bg-gray-800 text-xs uppercase text-gray-700 dark:text-gray-300">
            <tr>
              <th className="px-6 py-4 font-semibold">Title</th>
              <th className="px-6 py-4 font-semibold">Category</th>
              <th className="px-6 py-4 font-semibold">Status</th>
              <th className="px-6 py-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {blogs.map((blog) => (
              <tr key={blog.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                  {blog.title}
                </td>
                <td className="px-6 py-4">{blog.category}</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 rounded text-xs font-bold">
                    {blog.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <Link href={`/dashboard/blogs/${blog.slug}/edit`} className="text-blue-600 hover:underline text-sm font-medium">
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
            {blogs.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                  No blogs found. Create your first post.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
