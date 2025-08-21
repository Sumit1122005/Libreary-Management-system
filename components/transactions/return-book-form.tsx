"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Search, Scan, Book, Calendar, CheckCircle, DollarSign } from "lucide-react"
import { MOCK_ISSUED_BOOKS, getDaysUntilDue, type IssuedBook } from "@/lib/issued-books"

export function ReturnBookForm() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedIssue, setSelectedIssue] = useState<IssuedBook | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  const searchIssuedBook = () => {
    const issuedBook = MOCK_ISSUED_BOOKS.find(
      (book) =>
        book.status !== "returned" &&
        (book.bookTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
          book.bookAuthor.toLowerCase().includes(searchQuery.toLowerCase()) ||
          book.studentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
          book.id === searchQuery),
    )

    setSelectedIssue(issuedBook || null)
    if (!issuedBook) {
      setError("No issued book found with this search")
    } else {
      setError("")
    }
  }

  const handleReturnBook = async () => {
    if (!selectedIssue) {
      setError("Please select a book to return")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setSuccess(true)
      setSelectedIssue(null)
      setSearchQuery("")

      setTimeout(() => setSuccess(false), 3000)
    } catch (err) {
      setError("Failed to return book. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const calculateFine = (dueDate: string): number => {
    const daysOverdue = Math.abs(getDaysUntilDue(dueDate))
    return daysOverdue > 0 && getDaysUntilDue(dueDate) < 0 ? daysOverdue * 1 : 0 // $1 per day
  }

  const isOverdue = selectedIssue ? getDaysUntilDue(selectedIssue.dueDate) < 0 : false
  const lateFine = selectedIssue ? calculateFine(selectedIssue.dueDate) : 0
  const totalFine = selectedIssue ? selectedIssue.fineAmount + lateFine : 0

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Book className="h-5 w-5" />
          Return Book
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {success && (
          <Alert className="border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              Book returned successfully! {totalFine > 0 && `Fine collected: $${totalFine}`}
            </AlertDescription>
          </Alert>
        )}

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Search Section */}
        <div className="space-y-4">
          <div>
            <Label htmlFor="return-search">Search Issued Book</Label>
            <div className="flex gap-2 mt-1">
              <div className="relative flex-1">
                <Book className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  id="return-search"
                  placeholder="Book title, student ID, or transaction ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline" onClick={searchIssuedBook}>
                <Search className="h-4 w-4" />
              </Button>
              <Button variant="outline">
                <Scan className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Selected Book Details */}
        {selectedIssue && (
          <Card className={`${isOverdue ? "border-red-200 bg-red-50" : "border-green-200 bg-green-50"}`}>
            <CardContent className="p-6">
              <div className="flex gap-4">
                <img
                  src={selectedIssue.bookCoverUrl || "/placeholder.svg"}
                  alt={selectedIssue.bookTitle}
                  className="w-16 h-20 object-cover rounded border"
                />

                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-lg">{selectedIssue.bookTitle}</h3>
                      <p className="text-gray-600">by {selectedIssue.bookAuthor}</p>
                    </div>
                    <Badge variant={isOverdue ? "destructive" : "default"}>{isOverdue ? "Overdue" : "On Time"}</Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Student ID:</span>
                      <span className="ml-2 font-medium">{selectedIssue.studentId}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Issue Date:</span>
                      <span className="ml-2 font-medium">
                        {new Date(selectedIssue.issuedDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">Due Date:</span>
                      <span className={`ml-2 font-medium ${isOverdue ? "text-red-600" : ""}`}>
                        {new Date(selectedIssue.dueDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">Days:</span>
                      <span className={`ml-2 font-medium ${isOverdue ? "text-red-600" : "text-green-600"}`}>
                        {isOverdue
                          ? `${Math.abs(getDaysUntilDue(selectedIssue.dueDate))} days overdue`
                          : getDaysUntilDue(selectedIssue.dueDate) === 0
                            ? "Due today"
                            : `${getDaysUntilDue(selectedIssue.dueDate)} days remaining`}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Fine Calculation */}
              {(selectedIssue.fineAmount > 0 || lateFine > 0) && (
                <>
                  <Separator className="my-4" />
                  <div className="bg-white p-4 rounded-lg border">
                    <h4 className="font-semibold mb-3 flex items-center gap-2 text-red-700">
                      <DollarSign className="h-4 w-4" />
                      Fine Calculation
                    </h4>
                    <div className="space-y-2 text-sm">
                      {selectedIssue.fineAmount > 0 && (
                        <div className="flex justify-between">
                          <span>Previous fines:</span>
                          <span className="font-medium">${selectedIssue.fineAmount}</span>
                        </div>
                      )}
                      {lateFine > 0 && (
                        <div className="flex justify-between">
                          <span>Late return fine ({Math.abs(getDaysUntilDue(selectedIssue.dueDate))} days × $1):</span>
                          <span className="font-medium">${lateFine}</span>
                        </div>
                      )}
                      <Separator />
                      <div className="flex justify-between font-semibold text-red-700">
                        <span>Total Fine:</span>
                        <span>${totalFine}</span>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Return Confirmation */}
              <div className="mt-4 p-4 bg-white rounded-lg border">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Return Details
                </h4>
                <div className="text-sm">
                  <div className="flex justify-between">
                    <span>Return Date:</span>
                    <span className="font-medium">{new Date().toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="flex justify-end gap-3">
          {selectedIssue && totalFine > 0 && (
            <Button variant="outline">
              <DollarSign className="h-4 w-4 mr-2" />
              Collect Fine (${totalFine})
            </Button>
          )}
          <Button onClick={handleReturnBook} disabled={!selectedIssue || isLoading} className="min-w-32">
            {isLoading ? "Processing..." : "Return Book"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
