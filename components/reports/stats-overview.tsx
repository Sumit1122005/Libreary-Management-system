"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Book, Users, TrendingUp, AlertTriangle } from "lucide-react"
import type { BookStats } from "@/lib/reports"

interface StatsOverviewProps {
  stats: BookStats
}

export function StatsOverview({ stats }: StatsOverviewProps) {
  const utilizationRate = Math.round((stats.issuedBooks / stats.totalBooks) * 100)
  const overdueRate = Math.round((stats.overdueBooks / stats.issuedBooks) * 100)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Books</CardTitle>
          <Book className="h-4 w-4 text-orange-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalBooks.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">{stats.categoriesCount} categories</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Available</CardTitle>
          <Users className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.availableBooks.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">Ready for issue</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Issued</CardTitle>
          <TrendingUp className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.issuedBooks.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">{utilizationRate}% utilization</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Overdue</CardTitle>
          <AlertTriangle className="h-4 w-4 text-red-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-600">{stats.overdueBooks}</div>
          <p className="text-xs text-muted-foreground">{overdueRate}% of issued</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Utilization</CardTitle>
          <TrendingUp className="h-4 w-4 text-orange-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{utilizationRate}%</div>
          <p className="text-xs text-muted-foreground">Collection usage</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Categories</CardTitle>
          <Book className="h-4 w-4 text-purple-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.categoriesCount}</div>
          <p className="text-xs text-muted-foreground">Subject areas</p>
        </CardContent>
      </Card>
    </div>
  )
}
