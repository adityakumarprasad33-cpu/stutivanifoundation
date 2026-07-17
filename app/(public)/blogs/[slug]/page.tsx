import React from 'react';
import { generateSeoMetadata } from '@/features/public/utils/seo';
import { Breadcrumbs } from '@/features/public/components/layout/breadcrumbs';

import { notFound } from 'next/navigation';
import { ArticleSchema } from '@/features/public/components/structured-data';
import { BlogRepository } from '@/features/blogs/services/blog.repository';
import Image from 'next/image';

export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return generateSeoMetadata({
    title: slug.replace(/-/g, ' '),
    url: `/blogs/${slug}`,
    type: 'article',
  });
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!slug) return notFound();
  
  const repo = new BlogRepository();
  const { data } = await repo.query({
    filters: [
      { field: 'slug', operator: '==', value: slug },
      { field: 'status', operator: '==', value: 'PUBLISHED' }
    ],
    limit: 1
  });

  const article = data.length > 0 ? data[0] : null;

  if (!article) {
    return notFound();
  }

  return (
    <>
      <ArticleSchema article={article} url={`/blogs/${slug}`} />
      <div className="container py-12 md:py-16">
        <Breadcrumbs items={[{ label: 'Blogs', href: '/blogs' }, { label: article.title }]} />
        
        <article className="max-w-3xl mx-auto mt-8">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6 capitalize leading-tight">
            {article.title}
          </h1>
          
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-8 pb-8 border-b">
            <span>By Stuti-Vani Editor</span>
            <span>•</span>
            <time>{article.publishDate ? new Date(article.publishDate).toLocaleDateString() : 'Unknown Date'}</time>
          </div>
          
          <div className="prose prose-lg dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: article.content || '' }} />
        </article>
      </div>
    </>
  );
}
