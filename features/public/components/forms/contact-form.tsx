'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';
import { logger } from '@/lib/logger';
// import { submitContactForm } from '@/features/public/actions/contact.actions'; // Future Server Action

export const contactFormSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(5, 'Subject is required'),
  message: z.string().min(20, 'Message must be at least 20 characters'),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

export function ContactForm() {
  const [isPending, setIsPending] = React.useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsPending(true);
    // TODO: Wire up actual Server Action
    // await submitContactForm(data);
    logger.info('[ContactForm] Form submitted');
    setTimeout(() => {
      alert('Contact form architecture prepared. Email dispatch pending.');
      form.reset();
      setIsPending(false);
    }, 1000);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }: { field: any }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your Full Name" className="h-12 rounded-xl bg-muted/50 border-transparent hover:bg-muted focus:bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }: { field: any }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="john@example.com" className="h-12 rounded-xl bg-muted/50 border-transparent hover:bg-muted focus:bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="subject"
          render={({ field }: { field: any }) => (
            <FormItem>
              <FormLabel>Subject</FormLabel>
              <FormControl>
                <Input placeholder="How can we help?" className="h-12 rounded-xl bg-muted/50 border-transparent hover:bg-muted focus:bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="message"
          render={({ field }: { field: any }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea placeholder="Tell us more about your inquiry..." className="min-h-[150px] rounded-xl bg-muted/50 border-transparent hover:bg-muted focus:bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 resize-none p-4" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button type="submit" disabled={isPending} className="w-full h-12 rounded-xl text-base font-medium shadow-[0_4px_14px_0_rgb(0,0,0,0.1)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] transition-all md:w-auto px-8">
          {isPending ? 'Sending...' : 'Send Message'}
          {!isPending && <Send className="ml-2 h-4 w-4" />}
        </Button>
      </form>
    </Form>
  );
}
