import React from 'react';
import { generateSeoMetadata } from '@/features/public/utils/seo';
import { Breadcrumbs } from '@/features/public/components/layout/breadcrumbs';

import { notFound } from 'next/navigation';
import { EventSchema } from '@/features/public/components/structured-data';
import { EventRepository } from '@/features/events/services/event.repository';
import Image from 'next/image';

export const revalidate = 300;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return generateSeoMetadata({
    title: `Event: ${slug.replace(/-/g, ' ')}`,
    url: `/events/${slug}`,
    type: 'article',
  });
}

export default async function EventDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!slug) return notFound();
  
  const repo = new EventRepository();
  const { data } = await repo.query({
    filters: [
      { field: 'slug', operator: '==', value: slug }
    ],
    limit: 1
  });

  const event = data.length > 0 ? data[0] : null;

  if (!event) {
    return notFound();
  }

  return (
    <>
      <EventSchema event={event} url={`/events/${slug}`} />
      <div className="container py-12 md:py-16">
        <Breadcrumbs items={[{ label: 'Events', href: '/events' }, { label: event.title }]} />
        
        <div className="max-w-4xl mx-auto mt-8">
          {/* Removed coverImage block as the property doesn't exist on Event schema yet */}

          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6 capitalize">
            {event.title}
          </h1>
          <div className="prose prose-lg dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: event.detailedDescription || '' }} />
        </div>
      </div>
    </>
  );
}
