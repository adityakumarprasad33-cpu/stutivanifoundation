import React from 'react';
import { generateSeoMetadata } from '@/features/public/utils/seo';
import { PageHeader } from '@/components/layout/page-header';
import { Section } from '@/components/layout/section';
import { Container } from '@/components/layout/container';
import { GalleryCard } from '@/features/public/components/cards/gallery-card';
import { MediaRepository } from '@/features/gallery/services/media.repository';
import { EmptyState } from '@/components/dashboard/ui/empty-state';
import { Image as ImageIcon } from 'lucide-react';

export const revalidate = 3600;

export const metadata = generateSeoMetadata({
  title: 'Gallery',
  description: 'Explore the visual journey of Stuti-Vani Foundation.',
  url: '/gallery',
});

export default async function GalleryPage() {
  const mediaRepo = new MediaRepository();
  const { data: media } = await mediaRepo.query({
    filters: [{ field: 'visibility', operator: '==', value: 'public' }]
  });

  return (
    <>
      <PageHeader 
        title="Our Gallery"
        description="Moments of impact captured across our various initiatives."
        breadcrumbs={[{ label: 'Gallery' }]}
        className="bg-background"
      />
      
      <Section className="bg-muted/30">
        <Container>
          {media.length === 0 ? (
            <div className="py-12">
              <EmptyState 
                icon={ImageIcon}
                title="No media available"
                description="Our gallery is currently being updated. Please check back later!"
              />
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {media.map((item) => (
                <GalleryCard key={item.id} media={item as any} />
              ))}
            </div>
          )}
        </Container>
      </Section>
    </>
  );
}
