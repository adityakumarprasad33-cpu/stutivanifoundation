'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { forgotPasswordSchema, type ForgotPasswordFormData } from '../validation/auth.schemas';
import { authService } from '../services/auth.service';
import Link from 'next/link';
import { ROUTES } from '@/constants';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';

export const ForgotPasswordForm = () => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      setStatus('submitting');
      setErrorMessage(null);
      await authService.resetPassword(data.email);
      setStatus('success');
    } catch (err: unknown) {
      setErrorMessage(err instanceof Error ? err.message : 'Failed to send reset email');
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="grid gap-6 text-center">
        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-2">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div>
          <h2 className="text-2xl font-bold tracking-tight mb-2">Check your email</h2>
          <p className="text-muted-foreground text-sm">
            We have sent a password reset link to <span className="font-medium text-foreground">{form.getValues().email}</span>.
          </p>
        </div>
        <Button asChild className="w-full mt-4">
          <Link href={ROUTES.AUTH.LOGIN}>Return to Login</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-5">
          {status === 'error' && (
            <div className="p-3 bg-destructive/15 text-destructive rounded-md text-sm border border-destructive/20">
              {errorMessage}
            </div>
          )}

          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={status === 'submitting'}
              {...form.register('email')}
            />
            {form.formState.errors.email && (
              <p className="text-sm text-destructive">{form.formState.errors.email.message}</p>
            )}
          </div>

          <Button className="w-full mt-2" type="submit" disabled={status === 'submitting'}>
            {status === 'submitting' && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Send Reset Link
          </Button>

          <div className="text-center mt-2">
            <Link href={ROUTES.AUTH.LOGIN} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Back to login
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};
