"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis } from "recharts"
import { BookOpen, Target, TrendingUp, Award } from "lucide-react"

const readingData = [
  { category: "Computer Science", books: 8, color: "#f97316" },
  { category: "Mathematics", books: 5, color: "#3b82f6" },
  { category: "Physics", books: 3, color: "#10b981" },
  { category: "Literature", books: 2, color: "#8b5cf6" },
]

const monthlyData = [
  { month: "Jan", books: 3 },
  { month: "Feb", books: 4 },
  { month: "Mar", books: 6 },
  { month: "Apr", books: 5 },
  { month: "May", books: 7 },
  { month: "Jun", books: 8 },
]

const chartConfig = {
  books: {
    label: "Books Read",
    color: "hsl(var(--chart-1))",
  },
}

export function ReadingAnalytics() {
  const totalBooks = readingData.reduce((sum, item) => sum + item.books, 0)
  const monthlyGoal = 5
  const currentMonthBooks = 8
  const goalProgress = Math.min((currentMonthBooks / monthlyGoal) * 100, 100)

  return (
    <div className="space-y-6">
      {/* Reading Goals */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Goal</CardTitle>
            <Target className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {currentMonthBooks}/{monthlyGoal}
            </div>
            <Progress value={goalProgress} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">
              {goalProgress >= 100 ? "Goal achieved!" : `${monthlyGoal - currentMonthBooks} books to go`}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Books Read</CardTitle>
            <BookOpen className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalBooks}</div>
            <p className="text-xs text-muted-foreground">This semester</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reading Streak</CardTitle>
            <Award className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12 days</div>
            <p className="text-xs text-muted-foreground">Keep it up!</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Reading by Category */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Reading by Category
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={readingData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="books"
                  >
                    {readingData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>

            <div className="mt-4 space-y-2">
              {readingData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-sm">{item.category}</span>
                  </div>
                  <Badge variant="secondary">{item.books} books</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Monthly Progress */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Reading Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={monthlyData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="books" fill="var(--color-books)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>

            <div className="mt-4 p-3 bg-orange-50 rounded-lg">
              <p className="text-sm font-medium text-orange-800">Insight</p>
              <p className="text-xs text-orange-700">
                Your reading has increased by 60% compared to last semester. Great progress!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
