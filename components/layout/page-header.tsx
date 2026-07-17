import * as React from "react"
import { cn } from "@/lib/utils"

interface PageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  breadcrumbs?: { label: string; href?: string }[];
}

const PageHeader = React.forwardRef<HTMLDivElement, PageHeaderProps>(
  ({ className, title, description, actions, breadcrumbs, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col md:flex-row md:items-start justify-between gap-6",
          className
        )}
        {...props}
      >
        <div className="space-y-6">
          {breadcrumbs && breadcrumbs.length > 0 && (
             <div className="flex items-center space-x-2 text-sm text-muted-foreground font-medium mb-2">
               {breadcrumbs.map((bc, idx) => (
                 <React.Fragment key={idx}>
                   {idx > 0 && <span>/</span>}
                   {bc.href ? <a href={bc.href} className="hover:text-foreground transition-colors">{bc.label}</a> : <span className="text-foreground">{bc.label}</span>}
                 </React.Fragment>
               ))}
             </div>
          )}
          <h1>{title}</h1>
          {description && (
            <p>{description}</p>
          )}
        </div>
        {actions && (
          <div className="flex items-center gap-2">
            {actions}
          </div>
        )}
      </div>
    )
  }
)
PageHeader.displayName = "PageHeader"

export { PageHeader }
