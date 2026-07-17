import * as React from "react"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LucideIcon } from "lucide-react"

interface StatisticCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
}

const StatisticCard = React.forwardRef<HTMLDivElement, StatisticCardProps>(
  ({ className, title, value, icon: Icon, description, trend, trendValue, ...props }, ref) => {
    
    return (
      <Card ref={ref} className={cn("overflow-hidden group", className)} {...props}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <Icon className="h-5 w-5 text-primary" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{value}</div>
          
          {(description || trendValue) && (
            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
              {trendValue && (
                <span className={cn(
                  "font-medium",
                  trend === "up" ? "text-success" : trend === "down" ? "text-error" : "text-muted-foreground"
                )}>
                  {trend === "up" ? "↑" : trend === "down" ? "↓" : ""} {trendValue}
                </span>
              )}
              {description && <span>{description}</span>}
            </p>
          )}
        </CardContent>
      </Card>
    )
  }
)
StatisticCard.displayName = "StatisticCard"

export { StatisticCard }
