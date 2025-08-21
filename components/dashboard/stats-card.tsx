import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"

interface StatsCardProps {
  title: string
  value: string | number
  description?: string
  icon: LucideIcon
  variant?: "default" | "warning" | "danger"
}

export function StatsCard({ title, value, description, icon: Icon, variant = "default" }: StatsCardProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case "warning":
        return "border-yellow-200 bg-yellow-50"
      case "danger":
        return "border-red-200 bg-red-50"
      default:
        return "border-gray-200 bg-white"
    }
  }

  const getIconStyles = () => {
    switch (variant) {
      case "warning":
        return "text-yellow-600"
      case "danger":
        return "text-red-600"
      default:
        return "text-orange-600"
    }
  }

  return (
    <Card className={getVariantStyles()}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className={`h-4 w-4 ${getIconStyles()}`} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && <p className="text-xs text-muted-foreground">{description}</p>}
      </CardContent>
    </Card>
  )
}
