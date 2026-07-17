import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
// import { Program } from '@/features/programs/types/program.types';

// Using partial interface for placeholder compilation
interface ProgramCardProps {
  program: Record<string, any>; 
}

export function ProgramCard({ program }: ProgramCardProps) {
  return (
    <Card className="h-full">
      <div data-slot="card-image" className="aspect-video w-full bg-muted relative overflow-hidden rounded-t-2xl">
        {program.coverImage ? (
          <Image src={program.coverImage} alt={program.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground bg-primary/10">No Image</div>
        )}
        <div className="absolute top-2 right-2 flex gap-2">
          {program.category && <Badge variant="secondary">{program.category}</Badge>}
        </div>
      </div>
      <CardHeader>
        <CardTitle className="line-clamp-2">{program.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-muted-foreground line-clamp-3 text-sm">{program.description}</p>
      </CardContent>
      <CardFooter>
        <Button asChild variant="outline" className="w-full">
          <Link href={`/programs/${program.slug || program.id}`}>Read More</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
