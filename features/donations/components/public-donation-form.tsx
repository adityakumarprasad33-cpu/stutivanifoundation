'use client';

import React, { useState } from 'react';
import type { Campaign } from '@/features/donations/types/donation.types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Heart, CreditCard, CalendarDays, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

import { EmptyState } from '@/components/dashboard/ui/empty-state';
import { AlertCircle } from 'lucide-react';
import { processGuestDonation } from '@/features/public/actions/guest-donate.action';
import { toast } from 'sonner';

const PRESET_AMOUNTS = [500, 1000, 2500, 5000];

interface PublicDonationFormProps {
  initialCampaigns: Campaign[];
  user: { uid: string; name: string; email: string } | null;
}

export function PublicDonationForm({ initialCampaigns, user }: PublicDonationFormProps) {
  const [step, setStep] = useState(1);
  const [selectedCampaign, setSelectedCampaign] = useState(initialCampaigns.length > 0 ? initialCampaigns[0].id : '');
  const [amount, setAmount] = useState<number | ''>(1000);
  const [donationType, setDonationType] = useState<'one-time' | 'monthly'>('one-time');
  const [guestInfo, setGuestInfo] = useState({ name: user?.name || '', email: user?.email || '', pan: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNext = () => setStep(s => s + 1);
  const handleBack = () => setStep(s => s - 1);

  const handleCheckout = async () => {
    setIsSubmitting(true);
    try {
      const result = await processGuestDonation({
        campaignId: selectedCampaign,
        amount: Number(amount),
        donorType: donationType,
        name: guestInfo.name,
        email: guestInfo.email,
        pan: guestInfo.pan,
        currency: 'INR'
      });

      if (result.success && result.url) {
        window.location.href = result.url;
      } else {
        throw new Error(result.error);
      }
    } catch (err: any) {
      toast.error(err.message || 'Payment processing failed');
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto border-primary/20 shadow-lg overflow-hidden">
      {/* Progress Bar */}
      <div className="w-full bg-muted h-2">
        <div 
          className="bg-primary h-full transition-all duration-500 ease-in-out" 
          style={{ width: `${(step / 4) * 100}%` }}
        />
      </div>

      <div className="relative overflow-hidden min-h-[400px]">
        <AnimatePresence mode="wait" initial={false}>
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="absolute inset-0 p-6 md:p-8 flex flex-col"
            >
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Choose your cause</h3>
                <p className="text-muted-foreground">Select the initiative you would like to support.</p>
              </div>
              
              <div className="space-y-3 flex-grow overflow-y-auto pr-2">
                {initialCampaigns.length === 0 ? (
                  <EmptyState 
                    icon={AlertCircle}
                    title="No active campaigns"
                    description="There are currently no active campaigns accepting donations. Please check back later."
                  />
                ) : (
                  initialCampaigns.map(campaign => (
                    <button
                      key={campaign.id}
                      onClick={() => setSelectedCampaign(campaign.id!)}
                      className={cn(
                      "w-full text-left p-4 rounded-xl border-2 transition-all flex items-start gap-4",
                      selectedCampaign === campaign.id 
                        ? "border-primary bg-primary/5 shadow-sm" 
                        : "border-muted bg-card hover:border-primary/30 hover:bg-muted/30"
                    )}
                  >
                    <div className={cn(
                      "w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors",
                      selectedCampaign === campaign.id ? "border-primary" : "border-muted-foreground/30"
                    )}>
                      {selectedCampaign === campaign.id && <div className="w-3 h-3 bg-primary rounded-full" />}
                    </div>
                    <div className="text-left">
                        <h4 className="font-semibold text-gray-900 dark:text-white">{campaign.title}</h4>
                        <p className="text-sm text-muted-foreground mt-1">{campaign.description}</p>
                      </div>
                  </button>
                )))}
              </div>
              
              <div className="mt-6 flex justify-end">
                <Button onClick={handleNext} disabled={!selectedCampaign} className="px-8">
                  Continue <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="absolute inset-0 p-6 md:p-8 flex flex-col"
            >
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Select an amount</h3>
                <p className="text-muted-foreground">Every contribution helps us move our mission forward.</p>
              </div>
              
              <div className="space-y-6 flex-grow">
                {/* Donation Type Toggle */}
                <div className="flex p-1 bg-muted rounded-xl">
                  <button
                    onClick={() => setDonationType('one-time')}
                    className={cn(
                      "flex-1 py-2.5 text-sm font-medium rounded-lg transition-all flex items-center justify-center gap-2",
                      donationType === 'one-time' ? "bg-white dark:bg-gray-900 shadow-sm text-primary" : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <Heart className="w-4 h-4" /> Give Once
                  </button>
                  <button
                    onClick={() => setDonationType('monthly')}
                    className={cn(
                      "flex-1 py-2.5 text-sm font-medium rounded-lg transition-all flex items-center justify-center gap-2",
                      donationType === 'monthly' ? "bg-white dark:bg-gray-900 shadow-sm text-primary" : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <CalendarDays className="w-4 h-4" /> Monthly
                  </button>
                </div>

                {/* Preset Amounts */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {PRESET_AMOUNTS.map(preset => (
                    <button
                      key={preset}
                      onClick={() => setAmount(preset)}
                      className={cn(
                        "py-4 text-lg font-bold rounded-xl border-2 transition-all",
                        amount === preset 
                          ? "border-primary bg-primary/5 text-primary" 
                          : "border-muted bg-card hover:border-primary/30 text-foreground"
                      )}
                    >
                      ₹{preset.toLocaleString()}
                    </button>
                  ))}
                </div>

                {/* Custom Amount */}
                <div>
                  <Label htmlFor="custom-amount" className="text-muted-foreground mb-2 block">Custom Amount</Label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl font-medium text-muted-foreground">₹</span>
                    <Input
                      id="custom-amount"
                      type="number"
                      min="100"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value ? Number(e.target.value) : '')}
                      className="pl-8 py-6 text-xl font-medium border-2"
                      placeholder="Other amount"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-between">
                <Button onClick={handleBack} variant="ghost" size="lg">Back</Button>
                <Button onClick={handleNext} size="lg" className="px-8" disabled={!amount || amount < 100}>
                  Continue <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="absolute inset-0 p-6 md:p-8 flex flex-col"
            >
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Donor Details</h3>
                <p className="text-muted-foreground">{user ? 'Confirm your details' : 'Please provide your details for the 80G Tax Receipt.'}</p>
              </div>
              
              <div className="flex-grow space-y-4">
                <div>
                  <Label htmlFor="guest-name">Full Name</Label>
                  <Input id="guest-name" value={guestInfo.name} onChange={e => setGuestInfo({...guestInfo, name: e.target.value})} disabled={!!user} />
                </div>
                <div>
                  <Label htmlFor="guest-email">Email Address</Label>
                  <Input id="guest-email" type="email" value={guestInfo.email} onChange={e => setGuestInfo({...guestInfo, email: e.target.value})} disabled={!!user} />
                </div>
                <div>
                  <Label htmlFor="guest-pan">PAN Number (Optional, for 80G)</Label>
                  <Input id="guest-pan" value={guestInfo.pan} onChange={e => setGuestInfo({...guestInfo, pan: e.target.value.toUpperCase()})} maxLength={10} />
                </div>
              </div>

              <div className="mt-8 flex justify-between">
                <Button onClick={handleBack} variant="ghost" size="lg">Back</Button>
                <Button onClick={handleNext} size="lg" className="px-8" disabled={!guestInfo.name || !guestInfo.email}>
                  Continue <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="absolute inset-0 p-6 md:p-8 flex flex-col"
            >
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Review & Donate</h3>
                <p className="text-muted-foreground">You are making a difference today.</p>
              </div>
              
              <div className="flex-grow flex flex-col items-center justify-center space-y-6">
                <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-2">
                  <Heart className="w-12 h-12 fill-primary/20" />
                </div>
                <div className="text-center space-y-2">
                  <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                    {donationType === 'monthly' ? 'Monthly Donation' : 'One-time Donation'}
                  </p>
                  <h2 className="text-5xl font-bold text-primary">
                    ₹{amount.toLocaleString()}
                  </h2>
                  <p className="text-lg text-foreground font-medium">
                    To {initialCampaigns.find((c: Campaign) => c.id === selectedCampaign)?.title}
                  </p>
                </div>
              </div>

              <div className="mt-8 flex flex-col md:flex-row justify-between gap-4">
                <Button onClick={handleBack} variant="outline" size="lg" className="w-full md:w-auto">Back</Button>
                <Button size="lg" disabled={isSubmitting} onClick={handleCheckout} className="w-full md:flex-1 bg-gradient-to-r from-primary to-primary/80 hover:opacity-90 shadow-lg shadow-primary/20">
                  <CreditCard className="w-5 h-5 mr-2" />
                  {isSubmitting ? 'Processing...' : 'Proceed to Payment'}
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Card>
  );
}
