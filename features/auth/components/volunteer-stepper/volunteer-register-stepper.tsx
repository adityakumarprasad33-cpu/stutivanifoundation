'use client';

import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChevronRight, ChevronLeft, Loader2, CheckCircle2 } from 'lucide-react';
import { authService } from '@/features/auth/services/auth.service';
import { registerVolunteer } from '@/features/auth/actions/auth.actions';
import { useRouter } from 'next/navigation';

const volunteerWizardSchema = z.object({
  // Step 1
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Valid email is required'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  phone: z.string().min(10, 'Valid phone required'),

  // Step 2
  personal: z.object({
    dateOfBirth: z.string().min(1, 'Date of birth is required'),
    gender: z.string().min(1, 'Gender is required'),
    bloodGroup: z.string().min(1, 'Blood group is required'),
  }),
  address: z.object({
    city: z.string().min(1, 'City is required'),
    state: z.string().min(1, 'State is required'),
  }),

  // Step 3
  education: z.object({
    highestQualification: z.string().min(1, 'Qualification required'),
    university: z.string().optional(),
  }),

  // Step 4
  professional: z.object({
    currentStatus: z.string().min(1, 'Current status is required'),
    occupation: z.string().optional(),
    company: z.string().optional(),
  }),

  // Step 5
  preferences: z.object({
    interests: z.array(z.string()).default([]),
    availability: z.array(z.string()).default([]),
  }),
});

type FormValues = z.infer<typeof volunteerWizardSchema>;

const STEPS = [
  { id: 1, title: 'Authentication' },
  { id: 2, title: 'Personal Details' },
  { id: 3, title: 'Education' },
  { id: 4, title: 'Professional' },
  { id: 5, title: 'Interests & Skills' },
  { id: 6, title: 'Review & Submit' },
];

export function VolunteerRegisterStepper() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const methods = useForm<FormValues>({
    resolver: zodResolver(volunteerWizardSchema),
    mode: 'onChange',
    defaultValues: {
      preferences: { interests: [], availability: [] }
    }
  });

  const { handleSubmit, trigger, getValues, watch, register, setValue } = methods;

  const handleNext = async () => {
    let isValid = false;
    
    // Step validation mapping
    if (currentStep === 1) {
      isValid = await trigger(['firstName', 'lastName', 'email', 'password', 'phone']);
    } else if (currentStep === 2) {
      isValid = await trigger(['personal.dateOfBirth', 'personal.gender', 'personal.bloodGroup', 'address.city', 'address.state']);
    } else if (currentStep === 3) {
      isValid = await trigger(['education.highestQualification']);
    } else if (currentStep === 4) {
      isValid = await trigger(['professional.currentStatus']);
    } else if (currentStep === 5) {
      isValid = await trigger(['preferences.interests']);
    }

    if (isValid) {
      setCurrentStep(s => Math.min(s + 1, 6));
    }
  };

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    setError(null);
    try {
      // 1. Firebase Auth Create User
      await authService.register({
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
      });

      // 2. Server Action
      const result = await registerVolunteer({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        volunteerData: {
          personal: {
            dateOfBirth: new Date(data.personal.dateOfBirth),
            gender: data.personal.gender,
            bloodGroup: data.personal.bloodGroup,
          },
          address: data.address,
          education: data.education,
          professional: data.professional,
          preferences: data.preferences,
        }
      });

      if (!result.success) {
        throw new Error(result.error || 'Failed to submit application');
      }

      router.push('/signup/pending');
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'An error occurred during registration.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          {STEPS.map((step) => (
            <div key={step.id} className="flex flex-col items-center flex-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold mb-2 transition-colors duration-300 ${currentStep >= step.id ? 'bg-primary text-primary-foreground shadow-md' : 'bg-muted text-muted-foreground'}`}>
                {currentStep > step.id ? <CheckCircle2 className="h-5 w-5" /> : step.id}
              </div>
            </div>
          ))}
        </div>
        <div className="h-2 w-full bg-muted rounded-full overflow-hidden relative">
          <motion.div 
            className="absolute top-0 left-0 h-full bg-primary"
            initial={{ width: 0 }}
            animate={{ width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <div className="text-center mt-4">
          <h2 className="text-2xl font-bold">{STEPS[currentStep - 1].title}</h2>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-destructive/10 text-destructive rounded-lg mb-6 text-sm font-medium">
          {error}
        </div>
      )}

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <AnimatePresence mode="wait">
            
            {/* Step 1 */}
            {currentStep === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">First Name</label>
                    <Input {...register('firstName')} placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Last Name</label>
                    <Input {...register('lastName')} placeholder="Doe" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <Input {...register('email')} type="email" placeholder="john@example.com" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Password</label>
                  <Input {...register('password')} type="password" placeholder="••••••••" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Phone Number</label>
                  <Input {...register('phone')} placeholder="+91 9876543210" />
                </div>
              </motion.div>
            )}

            {/* Step 2 */}
            {currentStep === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Date of Birth</label>
                  <Input {...register('personal.dateOfBirth')} type="date" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Gender</label>
                    <Select onValueChange={(val) => setValue('personal.gender', val)}>
                      <SelectTrigger><SelectValue placeholder="Select Gender" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="MALE">Male</SelectItem>
                        <SelectItem value="FEMALE">Female</SelectItem>
                        <SelectItem value="OTHER">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Blood Group</label>
                    <Select onValueChange={(val) => setValue('personal.bloodGroup', val)}>
                      <SelectTrigger><SelectValue placeholder="Select Blood Group" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="A+">A+</SelectItem>
                        <SelectItem value="B+">B+</SelectItem>
                        <SelectItem value="O+">O+</SelectItem>
                        <SelectItem value="AB+">AB+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">City</label>
                    <Input {...register('address.city')} placeholder="Mumbai" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">State</label>
                    <Input {...register('address.state')} placeholder="Maharashtra" />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3 */}
            {currentStep === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Highest Qualification</label>
                  <Select onValueChange={(val) => setValue('education.highestQualification', val)}>
                    <SelectTrigger><SelectValue placeholder="Select Qualification" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="High School">High School</SelectItem>
                      <SelectItem value="Bachelors">Bachelors Degree</SelectItem>
                      <SelectItem value="Masters">Masters Degree</SelectItem>
                      <SelectItem value="Doctorate">Doctorate</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">University / Institute</label>
                  <Input {...register('education.university')} placeholder="University Name" />
                </div>
              </motion.div>
            )}

            {/* Step 4 */}
            {currentStep === 4 && (
              <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Current Status</label>
                  <Select onValueChange={(val) => setValue('professional.currentStatus', val)}>
                    <SelectTrigger><SelectValue placeholder="Select Status" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Student">Student</SelectItem>
                      <SelectItem value="Working Professional">Working Professional</SelectItem>
                      <SelectItem value="Self Employed">Self Employed</SelectItem>
                      <SelectItem value="Retired">Retired</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Occupation / Job Title</label>
                  <Input {...register('professional.occupation')} placeholder="e.g. Software Engineer" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Company / Organization</label>
                  <Input {...register('professional.company')} placeholder="Company Name" />
                </div>
              </motion.div>
            )}

            {/* Step 5 */}
            {currentStep === 5 && (
              <motion.div key="step5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Volunteer Interests (comma separated)</label>
                  <Input 
                    onChange={(e) => setValue('preferences.interests', e.target.value.split(',').map(s=>s.trim()))} 
                    placeholder="Teaching, Event Management, Healthcare" 
                  />
                </div>
              </motion.div>
            )}

            {/* Step 6 */}
            {currentStep === 6 && (
              <motion.div key="step6" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                <div className="bg-muted/50 p-6 rounded-xl border border-border/50">
                  <h3 className="text-lg font-semibold mb-4">Review Your Application</h3>
                  <div className="space-y-3 text-sm">
                    <p><strong>Name:</strong> {watch('firstName')} {watch('lastName')}</p>
                    <p><strong>Email:</strong> {watch('email')}</p>
                    <p><strong>Phone:</strong> {watch('phone')}</p>
                    <p><strong>City:</strong> {watch('address.city')}</p>
                    <p><strong>Qualification:</strong> {watch('education.highestQualification')}</p>
                    <p><strong>Status:</strong> {watch('professional.currentStatus')}</p>
                  </div>
                  <p className="text-xs text-muted-foreground mt-6">By submitting this application, you agree to the Stuti-Vani Foundation volunteer terms and conditions. Your profile will be reviewed by our team.</p>
                </div>
              </motion.div>
            )}

          </AnimatePresence>

          <div className="flex justify-between mt-8 pt-4 border-t">
            {currentStep > 1 && (
              <Button type="button" variant="outline" onClick={() => setCurrentStep(s => s - 1)}>
                <ChevronLeft className="h-4 w-4 mr-2" /> Back
              </Button>
            )}
            <div className="flex-1" />
            {currentStep < 6 ? (
              <Button type="button" onClick={handleNext}>
                Next <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button type="submit" disabled={isLoading} className="min-w-[140px]">
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Submit Application'}
              </Button>
            )}
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
