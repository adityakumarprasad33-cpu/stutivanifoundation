import React from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  value: string | number;
  icon?: LucideIcon;
  description?: string;
  trend?: {
    value: number; // Percentage
    label: string;
    isPositive?: boolean;
  };
}

export const StatCard = React.forwardRef<HTMLDivElement, StatCardProps>(
  ({ title, value, icon: Icon, description, trend, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-800 transition-all hover:shadow-md hover:border-blue-200 dark:hover:border-blue-900 group',
          className
        )}
        {...props}
      >
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
              {title}
            </p>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl font-bold text-gray-900 dark:text-white font-geist tracking-tight">
                {value}
              </span>
            </div>
          </div>
          
          {Icon && (
            <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg group-hover:bg-blue-50 dark:group-hover:bg-blue-900/30 transition-colors shrink-0">
              <Icon size={20} className="text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
            </div>
          )}
        </div>

        {(trend || description) && (
          <div className="mt-4 flex items-center text-sm">
            {trend && (
              <span 
                className={cn(
                  'font-medium flex items-center',
                  trend.isPositive !== false ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                )}
              >
                {trend.isPositive !== false ? '↑' : '↓'}
                {Math.abs(trend.value)}%
              </span>
            )}
            
            <span className={cn('text-gray-500 dark:text-gray-400 truncate', trend && 'ml-2')}>
              {trend ? trend.label : description}
            </span>
          </div>
        )}
      </div>
    );
  }
);

StatCard.displayName = 'StatCard';
