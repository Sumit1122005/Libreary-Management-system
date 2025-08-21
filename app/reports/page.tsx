"use client"

import { useEffect, useState } from "react"
import { AuthGuard } from "@/components/auth/auth-guard"
import { StatsOverview } from "@/components/reports/stats-overview"
import { CirculationChart } from "@/components/reports/circulation-chart"
import { PopularBooksTable } from "@/components/reports/popular-books-table"
import { StudentActivityTable } from "@/components/reports/student-activity-table"
import { FinancialChart } from "@/components/reports/financial-chart"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, BarChart3, TrendingUp, Users, DollarSign } from "lucide-react"
import {
  getBookStats,
  getCirculationData,
  getPopularBooks,
  getStudentActivity,
  getFinancialData,
  type BookStats,
  type CirculationData,
  type PopularBook,
  type StudentActivity,
  type FinancialData,
} from "@/lib/reports"

export default function ReportsPage() {
  const [bookStats, setBookStats] = useState<BookStats | null>(null)
  const [circulationData, setCirculationData] = useState<CirculationData[]>([])
  const [popularBooks, setPopularBooks] = useState<PopularBook[]>([])
  const [studentActivity, setStudentActivity] = useState<StudentActivity[]>([])
  const [financialData, setFinancialData] = useState<FinancialData[]>([])

  useEffect(() => {
    // Load all report data
    setBookStats(getBookStats())
    setCirculationData(getCirculationData())
    setPopularBooks(getPopularBooks())
    setStudentActivity(getStudentActivity())
    setFinancialData(getFinancialData())
  }, [])

  const handleExportReport = (reportType: string) => {
    // TODO: Implement report export functionality
    console.log("Export report:", reportType)
  }

  if (!bookStats) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading reports...</p>
        </div>
      </div>
    )
  }

  return (
    <AuthGuard requiredRole="admin">
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-6 sm:py-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 sm:mb-8">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Library Reports & Analytics</h1>
              <p className="text-gray-600 mt-1 sm:mt-2 text-sm sm:text-base">
                Comprehensive insights into library operations
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <Button variant="outline" onClick={() => handleExportReport("summary")} className="w-full sm:w-auto">
                <Download className="h-4 w-4 mr-2" />
                Export Summary
              </Button>
              <Button onClick={() => handleExportReport("detailed")} className="w-full sm:w-auto">
                <Download className="h-4 w-4 mr-2" />
                Export Detailed
              </Button>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="mb-6 sm:mb-8">
            <StatsOverview stats={bookStats} />
          </div>

          <Tabs defaultValue="circulation" className="space-y-4 sm:space-y-6">
            <div className="overflow-x-auto">
              <TabsList className="grid w-full grid-cols-4 min-w-max sm:min-w-0 sm:max-w-2xl">
                <TabsTrigger
                  value="circulation"
                  className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm px-2 sm:px-4"
                >
                  <BarChart3 className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="hidden sm:inline">Circulation</span>
                  <span className="sm:hidden">Circ</span>
                </TabsTrigger>
                <TabsTrigger
                  value="popular"
                  className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm px-2 sm:px-4"
                >
                  <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="hidden sm:inline">Popular Books</span>
                  <span className="sm:hidden">Popular</span>
                </TabsTrigger>
                <TabsTrigger
                  value="students"
                  className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm px-2 sm:px-4"
                >
                  <Users className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="hidden sm:inline">Students</span>
                  <span className="sm:hidden">Users</span>
                </TabsTrigger>
                <TabsTrigger
                  value="financial"
                  className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm px-2 sm:px-4"
                >
                  <DollarSign className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="hidden sm:inline">Financial</span>
                  <span className="sm:hidden">Money</span>
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="circulation" className="space-y-4 sm:space-y-6">
              <CirculationChart data={circulationData} />

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Key Insights</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 sm:space-y-4">
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <span className="text-sm font-medium">Peak Month</span>
                      <span className="text-green-700 font-bold text-sm sm:text-base">June (356 issues)</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <span className="text-sm font-medium">Average Monthly Issues</span>
                      <span className="text-blue-700 font-bold text-sm sm:text-base">306 books</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                      <span className="text-sm font-medium">Return Rate</span>
                      <span className="text-orange-700 font-bold text-sm sm:text-base">94.2%</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Recommendations</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="p-3 bg-yellow-50 rounded-lg">
                      <p className="text-sm font-medium text-yellow-800">Overdue Management</p>
                      <p className="text-xs text-yellow-700">Consider automated reminders to reduce overdue rates</p>
                    </div>
                    <div className="p-3 bg-purple-50 rounded-lg">
                      <p className="text-sm font-medium text-purple-800">Peak Season Planning</p>
                      <p className="text-xs text-purple-700">Prepare for increased demand during exam periods</p>
                    </div>
                    <div className="p-3 bg-indigo-50 rounded-lg">
                      <p className="text-sm font-medium text-indigo-800">Collection Development</p>
                      <p className="text-xs text-indigo-700">Focus on high-demand categories for new acquisitions</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="popular">
              <PopularBooksTable books={popularBooks} />
            </TabsContent>

            <TabsContent value="students">
              <StudentActivityTable students={studentActivity} />
            </TabsContent>

            <TabsContent value="financial">
              <div className="space-y-4 sm:space-y-6">
                <FinancialChart data={financialData} />

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base sm:text-lg">Total Revenue</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl sm:text-3xl font-bold text-green-600">
                        ${financialData.reduce((sum, item) => sum + item.revenue, 0)}
                      </div>
                      <p className="text-xs sm:text-sm text-gray-600">Last 6 months</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base sm:text-lg">Fines Collected</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl sm:text-3xl font-bold text-orange-600">
                        ${financialData.reduce((sum, item) => sum + item.finesCollected, 0)}
                      </div>
                      <p className="text-xs sm:text-sm text-gray-600">Last 6 months</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base sm:text-lg">New Members</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl sm:text-3xl font-bold text-blue-600">
                        {financialData.reduce((sum, item) => sum + item.newMemberships, 0)}
                      </div>
                      <p className="text-xs sm:text-sm text-gray-600">Last 6 months</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </AuthGuard>
  )
}
