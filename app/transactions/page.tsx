"use client"
import { AuthGuard } from "@/components/auth/auth-guard"
import { IssueBookForm } from "@/components/transactions/issue-book-form"
import { ReturnBookForm } from "@/components/transactions/return-book-form"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, RotateCcw, BarChart3, Clock } from "lucide-react"

export default function TransactionsPage() {
  return (
    <AuthGuard requiredRole="librarian">
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Book Transactions</h1>
            <p className="text-gray-600 mt-2">Manage book issues, returns, and renewals</p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Today's Issues</p>
                    <p className="text-2xl font-bold">12</p>
                  </div>
                  <BookOpen className="h-8 w-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Today's Returns</p>
                    <p className="text-2xl font-bold">8</p>
                  </div>
                  <RotateCcw className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Overdue Books</p>
                    <p className="text-2xl font-bold text-red-600">23</p>
                  </div>
                  <Clock className="h-8 w-8 text-red-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Fines Collected</p>
                    <p className="text-2xl font-bold">$145</p>
                  </div>
                  <BarChart3 className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Transaction Forms */}
          <Tabs defaultValue="issue" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 max-w-md">
              <TabsTrigger value="issue" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Issue Book
              </TabsTrigger>
              <TabsTrigger value="return" className="flex items-center gap-2">
                <RotateCcw className="h-4 w-4" />
                Return Book
              </TabsTrigger>
            </TabsList>

            <TabsContent value="issue">
              <IssueBookForm />
            </TabsContent>

            <TabsContent value="return">
              <ReturnBookForm />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </AuthGuard>
  )
}
