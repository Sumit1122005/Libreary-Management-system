"use client"

import { useEffect, useState } from "react"
import { AuthGuard } from "@/components/auth/auth-guard"
import { StatsCard } from "@/components/dashboard/stats-card"
import { IssuedBookCard } from "@/components/dashboard/issued-book-card"
import { QuickSearch } from "@/components/dashboard/quick-search"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Book, Clock, DollarSign, AlertTriangle, BookOpen, Search } from "lucide-react"
import { getCurrentUser } from "@/lib/auth"
import { getCurrentIssuedBooks, getOverdueBooks, getTotalFines, type IssuedBook } from "@/lib/issued-books"
import { useRouter } from "next/navigation"

export default function DashboardPage() {
  const [currentUser, setCurrentUser] = useState(getCurrentUser())
  const [issuedBooks, setIssuedBooks] = useState<IssuedBook[]>([])
  const [overdueBooks, setOverdueBooks] = useState<IssuedBook[]>([])
  const [totalFines, setTotalFines] = useState(0)
  const router = useRouter()

  useEffect(() => {
    if (currentUser?.studentId) {
      const issued = getCurrentIssuedBooks(currentUser.studentId)
      const overdue = getOverdueBooks(currentUser.studentId)
      const fines = getTotalFines(currentUser.studentId)

      setIssuedBooks(issued)
      setOverdueBooks(overdue)
      setTotalFines(fines)
    }
  }, [currentUser])

  const handleRenewBook = (bookId: string) => {
    // TODO: Implement book renewal logic
    console.log("Renew book:", bookId)
  }

  const handleReturnBook = (bookId: string) => {
    // TODO: Implement book return logic
    console.log("Return book:", bookId)
  }

  if (!currentUser) {
    return null
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Welcome back, {currentUser.name}!</h1>
            <p className="text-gray-600 mt-2">Here's your library activity overview</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
            <StatsCard title="Books Issued" value={issuedBooks.length} description="Currently borrowed" icon={Book} />
            <StatsCard
              title="Overdue Books"
              value={overdueBooks.length}
              description="Need immediate attention"
              icon={AlertTriangle}
              variant={overdueBooks.length > 0 ? "danger" : "default"}
            />
            <StatsCard
              title="Due This Week"
              value={
                issuedBooks.filter((book) => {
                  const dueDate = new Date(book.dueDate)
                  const weekFromNow = new Date()
                  weekFromNow.setDate(weekFromNow.getDate() + 7)
                  return dueDate <= weekFromNow && book.status === "issued"
                }).length
              }
              description="Books to return soon"
              icon={Clock}
              variant="warning"
            />
            <StatsCard
              title="Total Fines"
              value={`$${totalFines}`}
              description="Outstanding amount"
              icon={DollarSign}
              variant={totalFines > 0 ? "danger" : "default"}
            />
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 sm:gap-8">
            {/* Main Content */}
            <div className="xl:col-span-2 space-y-6 sm:space-y-8">
              {/* Quick Search */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Search className="h-5 w-5" />
                    Quick Book Search
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <QuickSearch />
                </CardContent>
              </Card>

              {/* Current Books */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Your Current Books ({issuedBooks.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {issuedBooks.length > 0 ? (
                    <div className="space-y-4">
                      {issuedBooks.map((book) => (
                        <IssuedBookCard
                          key={book.id}
                          book={book}
                          onRenew={handleRenewBook}
                          onReturn={handleReturnBook}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <BookOpen className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No books currently issued</h3>
                      <p className="text-gray-600 mb-4">Start exploring our catalog to find your next read!</p>
                      <Button onClick={() => router.push("/books")}>Browse Books</Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Account Info */}
              <Card>
                <CardHeader>
                  <CardTitle>Account Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600">Student ID</p>
                    <p className="font-medium">{currentUser.studentId}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-medium">{currentUser.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Member Since</p>
                    <p className="font-medium">January 2024</p>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-transparent"
                    onClick={() => router.push("/books")}
                  >
                    <Search className="h-4 w-4 mr-2" />
                    Browse Catalog
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Clock className="h-4 w-4 mr-2" />
                    Renewal History
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <DollarSign className="h-4 w-4 mr-2" />
                    Payment History
                  </Button>
                </CardContent>
              </Card>

              {/* Notifications */}
              {(overdueBooks.length > 0 || totalFines > 0) && (
                <Card className="border-red-200 bg-red-50">
                  <CardHeader>
                    <CardTitle className="text-red-800 flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5" />
                      Attention Required
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {overdueBooks.length > 0 && (
                      <div className="text-sm">
                        <p className="font-medium text-red-800">
                          {overdueBooks.length} overdue book{overdueBooks.length > 1 ? "s" : ""}
                        </p>
                        <p className="text-red-600">Please return immediately to avoid additional fines.</p>
                      </div>
                    )}
                    {totalFines > 0 && (
                      <div className="text-sm">
                        <p className="font-medium text-red-800">Outstanding fines: ${totalFines}</p>
                        <p className="text-red-600">Please settle your dues at the library counter.</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  )
}
