import * as React from "react"
import { cn } from "@/lib/utils"

const PageContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "w-full pt-8 md:pt-12", // Standard top padding separating header from content
      className
    )}
    {...props}
  />
))
PageContent.displayName = "PageContent"

export { PageContent }
