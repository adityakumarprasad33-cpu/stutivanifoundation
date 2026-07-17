import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CalendarIcon, MapPinIcon } from 'lucide-react';
import { format } from 'date-fns';

interface EventCardProps {
  event: Record<string, any>; 
}

export function EventCard({ event }: EventCardProps) {
  const isUpcoming = event.startDate ? new Date(event.startDate) > new Date() : false;

  return (
    <Card className="h-full">
      <div data-slot="card-image" className="aspect-[16/9] w-full bg-muted relative overflow-hidden rounded-t-2xl">
        {event.coverImage ? (
          <Image src={event.coverImage} alt={event.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground bg-primary/10">Event Image</div>
        )}
        <div className="absolute top-2 right-2">
          <Badge variant={isUpcoming ? "default" : "secondary"}>
            {isUpcoming ? 'Upcoming' : 'Past Event'}
          </Badge>
        </div>
      </div>
      <CardHeader>
        <CardTitle className="line-clamp-2">{event.title}</CardTitle>
        <div className="flex flex-col space-y-1 mt-2 text-sm text-muted-foreground">
          {event.startDate && (
            <div className="flex items-center">
              <CalendarIcon className="mr-2 h-4 w-4 shrink-0" />
              <span>{format(new Date(event.startDate), 'PPP')}</span>
            </div>
          )}
          {event.location && (
            <div className="flex items-center">
              <MapPinIcon className="mr-2 h-4 w-4 shrink-0" />
              <span className="truncate">{event.location}</span>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-muted-foreground line-clamp-2 text-sm">{event.description}</p>
      </CardContent>
      <CardFooter>
        <Button asChild variant={isUpcoming ? "default" : "outline"} className="w-full">
          <Link href={`/events/${event.slug || event.id}`}>
            {isUpcoming ? 'Register Now' : 'View Details'}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
