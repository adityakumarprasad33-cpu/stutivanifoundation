import * as React from "react"
import { cn } from "@/lib/utils"

const Section = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement> & { spacing?: "normal" | "tight" | "loose" | "none" }
>(({ className, spacing = "normal", ...props }, ref) => (
  <section
    ref={ref}
    className={cn(
      "w-full",
      spacing === "normal" && "py-16 md:py-24",
      spacing === "tight" && "py-8 md:py-12",
      spacing === "loose" && "py-24 md:py-32",
      spacing === "none" && "py-0",
      className
    )}
    {...props}
  />
))
Section.displayName = "Section"

export { Section }
