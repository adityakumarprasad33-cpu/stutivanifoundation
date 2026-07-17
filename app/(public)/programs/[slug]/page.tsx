import React from 'react';
import { generateSeoMetadata } from '@/features/public/utils/seo';
import { Breadcrumbs } from '@/features/public/components/layout/breadcrumbs';

import { notFound } from 'next/navigation';
import { ProgramRepository } from '@/features/programs/services/program.repository';
import Image from 'next/image';

export const revalidate = 1800;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return generateSeoMetadata({
    title: `Program: ${slug.replace(/-/g, ' ')}`,
    url: `/programs/${slug}`,
    type: 'article',
  });
}

export default async function ProgramDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!slug) return notFound();

  const repo = new ProgramRepository();
  const { data } = await repo.query({
    filters: [{ field: 'slug', operator: '==', value: slug }],
    limit: 1
  });

  const program = data.length > 0 ? data[0] : null;

  if (!program) {
    return notFound();
  }

  return (
    <div className="container py-12 md:py-16">
      <Breadcrumbs items={[{ label: 'Programs', href: '/programs' }, { label: program.name }]} />
      
      <div className="max-w-4xl mx-auto mt-8">
        {program.coverImage ? (
          <div className="relative aspect-video rounded-2xl mb-8 w-full overflow-hidden">
             <Image src={(program.coverImage as any).url || program.coverImage} alt={program.name} fill className="object-cover" />
          </div>
        ) : null}
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6 capitalize">
          {program.name}
        </h1>
        <div className="prose prose-lg dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: program.detailedDescription || '' }} />
      </div>
    </div>
  );
}
