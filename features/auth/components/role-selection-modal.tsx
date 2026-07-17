'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Loader2, Shield, Heart, User, Briefcase, ChevronRight } from 'lucide-react';
import { ROLES } from '@/constants';
import { cn } from '@/lib/utils';

interface RoleSelectionModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  roles: string[];
  lastSelectedRole?: string;
  status?: string;
}

const ROLE_METADATA: Record<string, { title: string; description: string; icon: React.ElementType; color: string; route: string }> = {
  [ROLES.SUPER_ADMIN]: { title: 'Super Admin', description: 'Full system access and configuration', icon: Shield, color: 'bg-red-500/10 text-red-600 dark:text-red-400', route: '/dashboard' },
  [ROLES.ADMIN]: { title: 'Admin', description: 'Platform management and moderation', icon: Briefcase, color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400', route: '/dashboard' },
  [ROLES.STAFF]: { title: 'Staff', description: 'Operations and daily tasks', icon: User, color: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400', route: '/dashboard' },
  [ROLES.VOLUNTEER]: { title: 'Volunteer', description: 'Manage your volunteer assignments', icon: Heart, color: 'bg-green-500/10 text-green-600 dark:text-green-400', route: '/portal' },
  [ROLES.DONOR]: { title: 'Donor', description: 'View receipts and donation history', icon: Heart, color: 'bg-rose-500/10 text-rose-600 dark:text-rose-400', route: '/donor' },
  [ROLES.PUBLIC]: { title: 'Public User', description: 'General access', icon: User, color: 'bg-gray-500/10 text-gray-600 dark:text-gray-400', route: '/' },
};

export const RoleSelectionModal = ({ isOpen, onOpenChange, roles, lastSelectedRole, status }: RoleSelectionModalProps) => {
  const router = useRouter();
  const [isSwitching, setIsSwitching] = useState<string | null>(null);

  const handleRoleSelect = async (role: string) => {
    try {
      setIsSwitching(role);
      const res = await fetch('/api/auth/role', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role }),
      });

      if (!res.ok) {
        throw new Error('Failed to switch role');
      }

      const meta = ROLE_METADATA[role] || ROLE_METADATA[ROLES.PUBLIC];
      if (role === 'volunteer' && status === 'PENDING') {
        router.push('/signup/pending');
      } else {
        router.push(meta.route);
      }
      router.refresh();
      onOpenChange(false);
    } catch (error) {
      console.error('Role switch error:', error);
    } finally {
      setIsSwitching(null);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-background/95 backdrop-blur-xl border-border/50 shadow-2xl">
        <DialogHeader className="text-left pb-4 border-b border-border/50">
          <DialogTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
            Select Account Role
          </DialogTitle>
          <DialogDescription className="text-base text-muted-foreground">
            You have access to multiple portals. Where would you like to go today?
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-3 py-4 max-h-[60vh] overflow-y-auto">
          <AnimatePresence>
            {roles.map((role, idx) => {
              const meta = ROLE_METADATA[role];
              if (!meta) return null;
              const Icon = meta.icon;
              const isSelected = isSwitching === role;
              const isLastSelected = lastSelectedRole === role;

              return (
                <motion.div
                  key={role}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full h-auto p-4 flex items-center justify-between group transition-all duration-300",
                      "hover:border-primary/50 hover:bg-primary/5 hover:shadow-md",
                      isSelected && "border-primary bg-primary/10 shadow-md",
                      isLastSelected && !isSelected && "border-primary/30"
                    )}
                    onClick={() => handleRoleSelect(role)}
                    disabled={isSwitching !== null}
                  >
                    <div className="flex items-center gap-4 text-left">
                      <div className={cn("p-3 rounded-xl transition-colors", meta.color, isSelected && "bg-primary text-primary-foreground")}>
                        {isSelected ? <Loader2 className="w-6 h-6 animate-spin" /> : <Icon className="w-6 h-6" />}
                      </div>
                      <div>
                        <div className="font-semibold text-lg flex items-center gap-2">
                          {meta.title}
                          {isLastSelected && (
                            <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full bg-primary/20 text-primary">
                              Last Used
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-muted-foreground font-normal">
                          {meta.description}
                        </div>
                      </div>
                    </div>
                    <ChevronRight className={cn(
                      "w-5 h-5 text-muted-foreground transition-transform duration-300",
                      "group-hover:translate-x-1 group-hover:text-primary",
                      isSelected && "text-primary"
                    )} />
                  </Button>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
};
