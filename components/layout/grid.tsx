import * as React from "react"
import { cn } from "@/lib/utils"

interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  cols?: 1 | 2 | 3 | 4 | 6 | 12;
  gap?: 4 | 6 | 8 | 12 | 16;
}

const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  ({ className, cols = 1, gap = 8, ...props }, ref) => {
    
    // Map cols to tailwind classes
    const colClasses = {
      1: "grid-cols-1",
      2: "grid-cols-1 md:grid-cols-2",
      3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
      4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
      6: "grid-cols-2 md:grid-cols-3 lg:grid-cols-6",
      12: "grid-cols-4 md:grid-cols-8 lg:grid-cols-12",
    };

    const gapClasses = {
      4: "gap-4",
      6: "gap-6",
      8: "gap-8",
      12: "gap-12",
      16: "gap-16",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "grid",
          colClasses[cols],
          gapClasses[gap],
          className
        )}
        {...props}
      />
    )
  }
)
Grid.displayName = "Grid"

export { Grid }
