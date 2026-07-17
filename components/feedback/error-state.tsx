import * as React from "react"
import { AlertTriangle } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface ErrorStateProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

const ErrorState = React.forwardRef<HTMLDivElement, ErrorStateProps>(
  ({ className, title = "Something went wrong", message = "An error occurred while fetching data.", onRetry, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col items-center justify-center rounded-md border border-error/20 bg-error/5 p-8 text-center",
          className
        )}
        {...props}
      >
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-error/10 mb-4">
          <AlertTriangle className="h-6 w-6 text-error" />
        </div>
        <h3 className="mb-2 text-lg font-semibold text-error">{title}</h3>
        <p className="mb-6 max-w-sm text-sm text-muted-foreground">
          {message}
        </p>
        {onRetry && (
          <Button onClick={onRetry} variant="outline" className="border-error/20 text-error hover:bg-error/10">
            Try Again
          </Button>
        )}
      </div>
    )
  }
)
ErrorState.displayName = "ErrorState"

export { ErrorState }
