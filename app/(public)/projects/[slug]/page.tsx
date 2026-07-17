import React from 'react';
import { generateSeoMetadata } from '@/features/public/utils/seo';
import { Breadcrumbs } from '@/features/public/components/layout/breadcrumbs';

import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/badge';

export const revalidate = 1800;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  return generateSeoMetadata({
    title: `Project: ${resolvedParams.slug.replace(/-/g, ' ')}`,
    url: `/projects/${resolvedParams.slug}`,
    type: 'article',
  });
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  if (!resolvedParams.slug) return notFound();

  return (
    <div className="container py-12 md:py-16">
      <Breadcrumbs items={[{ label: 'Projects', href: '/projects' }, { label: resolvedParams.slug.replace(/-/g, ' ') }]} />
      
      <div className="max-w-4xl mx-auto mt-8">
        <div className="aspect-video bg-muted rounded-2xl mb-8 w-full flex items-center justify-center text-muted-foreground relative">
           Cover Image Placeholder
           <div className="absolute top-4 right-4"><Badge>Active</Badge></div>
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6 capitalize">
          {resolvedParams.slug.replace(/-/g, ' ')}
        </h1>
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p>
            Detailed content for the project goes here.
          </p>
        </div>
      </div>
    </div>
  );
}
