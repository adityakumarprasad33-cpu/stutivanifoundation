import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface CampaignCardProps {
  campaign: Record<string, any>; 
}

export function CampaignCard({ campaign }: CampaignCardProps) {
  const progress = campaign.goalAmount > 0 ? (campaign.raisedAmount / campaign.goalAmount) * 100 : 0;

  return (
    <Card className="h-full">
      <div data-slot="card-image" className="aspect-video w-full bg-muted relative overflow-hidden rounded-t-2xl">
        {campaign.coverImage ? (
          <Image src={campaign.coverImage} alt={campaign.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground bg-primary/10">No Image</div>
        )}
      </div>
      <CardHeader>
        <CardTitle className="line-clamp-2">{campaign.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow space-y-4">
        <p className="text-muted-foreground line-clamp-2 text-sm">{campaign.description}</p>
        
        <div className="space-y-1">
          <div className="flex justify-between text-sm font-medium">
            <span>₹{campaign.raisedAmount.toLocaleString('en-IN')} raised</span>
            <span className="text-muted-foreground">of ₹{campaign.goalAmount.toLocaleString('en-IN')}</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild variant="default" className="w-full">
          <Link href={`/donate/${campaign.slug || campaign.id}`}>Donate Now</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
