import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { format } from 'date-fns';

interface BlogCardProps {
  blog: any; 
}

export function BlogCard({ blog }: BlogCardProps) {
  return (
    <Card className="h-full relative group">
      <div data-slot="card-image" className="aspect-[4/3] w-full bg-muted relative overflow-hidden rounded-t-2xl">
        {blog.coverImage ? (
          <Image 
            src={blog.coverImage} 
            alt={blog.title} 
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300" 
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground bg-primary/10">No Image</div>
        )}
      </div>
      <CardHeader>
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
          {blog.category && <span className="font-semibold text-primary">{blog.category}</span>}
          {blog.category && <span>•</span>}
          <span>{blog.publishedAt ? format(new Date(blog.publishedAt), 'MMM d, yyyy') : 'Recent'}</span>
        </div>
        <CardTitle className="line-clamp-2">
          <Link href={`/blogs/${blog.slug || blog.id}`} className="after:absolute after:inset-0">
            {blog.title}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-muted-foreground line-clamp-3 text-sm">{blog.excerpt || blog.content?.substring(0, 150)}...</p>
      </CardContent>
    </Card>
  );
}
