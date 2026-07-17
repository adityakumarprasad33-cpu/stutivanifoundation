import React from 'react';
import { PageHeader } from '@/components/layout/page-header';
import { Section } from '@/components/layout/section';
import { Container } from '@/components/layout/container';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Heart, UserPlus, LogIn, ArrowRight } from 'lucide-react';
import { BRANDING } from '@/constants/branding';
import { PublicDonationForm } from '@/features/donations/components/public-donation-form';
import { CampaignRepository } from '@/features/donations/services/campaign.repository';
import { verifySession } from '@/lib/auth/session.server';

export const metadata = {
  title: 'Make a Donation | Stuti-Vani Foundation',
  description: 'Support our mission by donating to our active campaigns.',
};

export default async function DonatePage() {
  const campaignRepo = new CampaignRepository();
  const { data: campaigns } = await campaignRepo.query({
    filters: [{ field: 'status', operator: '==', value: 'ACTIVE' }]
  });

  const session = await verifySession();
  const user = session ? {
    uid: session.uid,
    name: session.name || session.email?.split('@')[0] || 'Donor',
    email: session.email || ''
  } : null;

  return (
    <>
      <PageHeader 
        title="Transform Lives Today"
        description="Your contribution helps us create a lasting impact. Choose how you would like to proceed with your donation."
        breadcrumbs={[{ label: 'Donate' }]}
        className="bg-primary/5 border-b border-primary/10"
      />
      
      <Section className="bg-background py-16">
        <Container>
          <div className="max-w-4xl mx-auto space-y-12">
            
            {/* Authentication Gateway */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-primary/20 shadow-sm hover:shadow-md transition-all">
                <CardHeader className="text-center pb-4">
                  <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <LogIn className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-xl">Already a Donor?</CardTitle>
                  <CardDescription>Log in to track this donation.</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button asChild className="w-full" variant="outline">
                    <Link href="/login">Log in to Account</Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card className="border-primary/20 shadow-sm hover:shadow-md transition-all">
                <CardHeader className="text-center pb-4">
                  <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <UserPlus className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-xl">New Donor?</CardTitle>
                  <CardDescription>Create an account for faster checkout.</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button asChild className="w-full" variant="outline">
                    <Link href="/register?role=donor">Create Account</Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card className="border-primary border-2 shadow-md relative overflow-hidden group">
                <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-[10px] font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wider">
                  Fastest
                </div>
                <CardHeader className="text-center pb-4">
                  <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Heart className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-xl">Continue as Guest</CardTitle>
                  <CardDescription>No account required to donate.</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button className="w-full group">
                    Donate Now <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardFooter>
              </Card>
            </div>

            {/* Interactive Donation Form */}
            <div className="mt-16">
              <PublicDonationForm initialCampaigns={campaigns} user={user} />
            </div>

          </div>
        </Container>
      </Section>
    </>
  );
}
