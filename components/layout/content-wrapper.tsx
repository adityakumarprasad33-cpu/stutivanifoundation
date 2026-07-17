import * as React from "react"
import { cn } from "@/lib/utils"

const ContentWrapper = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "mx-auto w-full max-w-3xl px-4 sm:px-6",
      className
    )}
    {...props}
  />
))
ContentWrapper.displayName = "ContentWrapper"

export { ContentWrapper }
