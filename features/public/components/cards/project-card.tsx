import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ProjectCardProps {
  project: Record<string, any>; 
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="h-full">
      <div data-slot="card-image" className="aspect-video w-full bg-muted relative overflow-hidden rounded-t-2xl">
        {project.coverImage ? (
          <Image src={project.coverImage} alt={project.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground bg-primary/10">No Image</div>
        )}
        <div className="absolute top-2 right-2">
          {project.status === 'COMPLETED' ? (
             <Badge variant="default" className="bg-green-600">Completed</Badge>
          ) : (
             <Badge variant="secondary">Active</Badge>
          )}
        </div>
      </div>
      <CardHeader>
        <CardTitle className="line-clamp-2">{project.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-muted-foreground line-clamp-3 text-sm">{project.description}</p>
      </CardContent>
      <CardFooter>
        <Button asChild variant="ghost" className="w-full rounded-xl hover:bg-primary/5">
          <Link href={`/projects/${project.slug || project.id}`}>View Project Impact</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
