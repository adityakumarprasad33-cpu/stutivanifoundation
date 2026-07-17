import * as React from "react"
import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface LoadingSpinnerProps extends React.SVGProps<SVGSVGElement> {
  size?: "sm" | "default" | "lg" | "xl"
}

const LoadingSpinner = React.forwardRef<SVGSVGElement, LoadingSpinnerProps>(
  ({ className, size = "default", ...props }, ref) => {
    const sizeClasses = {
      sm: "h-4 w-4",
      default: "h-8 w-8",
      lg: "h-12 w-12",
      xl: "h-16 w-16"
    }
    
    return (
      <Loader2
        ref={ref}
        className={cn("animate-spin text-primary", sizeClasses[size], className)}
        {...props}
      />
    )
  }
)
LoadingSpinner.displayName = "LoadingSpinner"

export { LoadingSpinner }
