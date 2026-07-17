import React from 'react';
import { generateSeoMetadata } from '@/features/public/utils/seo';
import { PageHeader } from '@/components/layout/page-header';
import { Section } from '@/components/layout/section';
import { Container } from '@/components/layout/container';
import { BlogCard } from '@/features/public/components/cards/blog-card';

export const revalidate = 3600;

export const metadata = generateSeoMetadata({
  title: 'Blogs & Articles',
  description: 'Latest news, stories, and insights from Stuti-Vani Foundation.',
  url: '/blogs',
});

export default function BlogsPage() {
  const blogs = [
    { id: '1', slug: 'impact-of-clean-water', title: 'The Impact of Clean Water in Rural Areas', category: 'Insights', publishedAt: new Date().toISOString(), excerpt: 'Clean water is not just a health issue, it impacts education and livelihood.' },
    { id: '2', slug: 'volunteer-spotlight-aarav', title: 'Volunteer Spotlight: Aarav Sharma', category: 'Community', publishedAt: new Date().toISOString(), excerpt: 'Meet Aarav, who has been teaching kids for the last two years.' },
  ];

  return (
    <>
      <PageHeader 
        title="Stories & News"
        description="Read about our latest activities, impact stories, and foundation updates."
        breadcrumbs={[{ label: 'Blogs & Articles' }]}
        className="bg-background"
      />
      
      <Section className="bg-muted/30">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map(blog => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
