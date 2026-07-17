import * as React from "react"
import { FileQuestion } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
  icon?: React.ReactNode;
  actionLabel?: string;
  onAction?: () => void;
}

const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ className, title, description, icon, actionLabel, onAction, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col items-center justify-center rounded-2xl border border-dashed border-border/60 bg-muted/20 p-12 text-center animate-in fade-in-50 duration-500",
          className
        )}
        {...props}
      >
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-muted shadow-sm mb-4">
          {icon || <FileQuestion className="h-8 w-8 text-muted-foreground" />}
        </div>
        <h3 className="mb-2 text-xl font-semibold tracking-tight text-foreground">{title}</h3>
        <p className="mb-6 max-w-sm text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
        {actionLabel && onAction && (
          <Button onClick={onAction} variant="outline" className="animate-pulse-soft">
            {actionLabel}
          </Button>
        )}
      </div>
    )
  }
)
EmptyState.displayName = "EmptyState"

export { EmptyState }
