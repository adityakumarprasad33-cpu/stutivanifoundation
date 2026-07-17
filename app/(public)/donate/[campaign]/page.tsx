import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { redirect } from 'next/navigation';

export default async function CampaignDonationPage({ params }: { params: Promise<{ campaign: string }> }) {
  const { campaign } = await params;
  // In a real app, we would fetch campaign details here.
  const campaignName = campaign === 'campaign_1' ? 'Education for All' : 'Healthcare Camp 2026';

  return (
    <div className="container mx-auto py-12 px-4 md:px-6 max-w-3xl">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-3xl">Donate to {campaignName}</CardTitle>
          <CardDescription>Fill out the form below to proceed with your secure payment.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-8" action="/api/checkout" method="POST">
            {/* Amount Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">1. Select Amount</h3>
              <RadioGroup defaultValue="1000" className="grid grid-cols-2 md:grid-cols-4 gap-4" name="amount">
                {[500, 1000, 2500, 5000].map(amt => (
                  <div key={amt}>
                    <RadioGroupItem value={amt.toString()} id={`amt-${amt}`} className="peer sr-only" />
                    <Label
                      htmlFor={`amt-${amt}`}
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer text-center"
                    >
                      <span className="text-xl font-semibold">₹{amt}</span>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
              <div className="grid gap-2">
                <Label htmlFor="custom-amount">Custom Amount (₹)</Label>
                <Input type="number" id="custom-amount" name="customAmount" placeholder="Enter custom amount" />
              </div>
            </div>

            {/* Donor Type & Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">2. Donor Details</h3>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" name="firstName" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" name="lastName" required />
                </div>
              </div>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" name="email" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" name="phone" required />
                </div>
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <Checkbox id="anonymous" name="anonymous" />
                <Label htmlFor="anonymous" className="font-normal">Make my donation anonymous</Label>
              </div>
            </div>

            {/* Tax Compliance */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">3. Tax Compliance (Optional)</h3>
              <p className="text-sm text-muted-foreground mb-4">Provide your PAN for 80G Tax Exemption Certificate.</p>
              
              <div className="grid gap-2 max-w-sm">
                <Label htmlFor="pan">PAN Number</Label>
                <Input id="pan" name="pan" placeholder="ABCDE1234F" className="uppercase" />
              </div>
            </div>

            <Button type="submit" size="lg" className="w-full text-lg h-14">
              Proceed to Payment
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
