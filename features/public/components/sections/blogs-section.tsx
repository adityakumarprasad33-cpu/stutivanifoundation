import React from 'react';
import { PageSection } from '@/components/layout/page-section';
import { Grid } from '@/components/layout/grid';
import { Button } from '@/components/ui/button';
import { BlogCard } from '../cards/blog-card';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function BlogsSection({ blogs = [] }: { blogs?: any[] }) {
  if (!blogs || blogs.length === 0) return null;

  return (
    <PageSection 
      className="bg-background"
      title="Latest Stories & News"
      description="Read about our latest activities, impact stories, and foundation updates."
      headerActions={
        <Button asChild variant="ghost" className="shrink-0 group">
          <Link href="/blogs">
            Read All Stories <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      }
    >
      <Grid cols={4} gap={6}>
        {blogs.map((blog, i) => (
          <BlogCard key={i} blog={blog} />
        ))}
      </Grid>
    </PageSection>
  );
}
