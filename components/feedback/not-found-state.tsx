import * as React from "react"
import { SearchX } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface NotFoundStateProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  actionHref?: string;
  actionLabel?: string;
}

const NotFoundState = React.forwardRef<HTMLDivElement, NotFoundStateProps>(
  ({ className, title = "Page Not Found", description = "The resource you are looking for doesn't exist.", actionHref = "/", actionLabel = "Go Home", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col items-center justify-center p-12 text-center animate-fade-up",
          className
        )}
        {...props}
      >
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-muted shadow-sm mb-6">
          <SearchX className="h-10 w-10 text-muted-foreground" />
        </div>
        <h2 className="mb-3 text-3xl font-bold">{title}</h2>
        <p className="mb-8 max-w-md text-muted-foreground">
          {description}
        </p>
        <Button asChild>
          <Link href={actionHref}>{actionLabel}</Link>
        </Button>
      </div>
    )
  }
)
NotFoundState.displayName = "NotFoundState"

export { NotFoundState }
