"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Search, Scan, User, Calendar, CheckCircle } from "lucide-react"
import { searchBooks, getBookById, type Book } from "@/lib/books"

interface Student {
  id: string
  name: string
  email: string
  studentId: string
  currentBooks: number
  maxBooks: number
  fines: number
}

// Mock student data
const MOCK_STUDENTS: Student[] = [
  {
    id: "1",
    name: "Jane Student",
    email: "student@library.edu",
    studentId: "STU001",
    currentBooks: 2,
    maxBooks: 5,
    fines: 15,
  },
  {
    id: "2",
    name: "John Doe",
    email: "john.doe@library.edu",
    studentId: "STU002",
    currentBooks: 1,
    maxBooks: 5,
    fines: 0,
  },
]

export function IssueBookForm() {
  const [studentQuery, setStudentQuery] = useState("")
  const [bookQuery, setBookQuery] = useState("")
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [selectedBook, setSelectedBook] = useState<Book | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  const searchStudent = () => {
    const student = MOCK_STUDENTS.find(
      (s) =>
        s.studentId.toLowerCase().includes(studentQuery.toLowerCase()) ||
        s.name.toLowerCase().includes(studentQuery.toLowerCase()) ||
        s.email.toLowerCase().includes(studentQuery.toLowerCase()),
    )
    setSelectedStudent(student || null)
    if (!student) {
      setError("Student not found")
    } else {
      setError("")
    }
  }

  const searchBook = () => {
    const books = searchBooks(bookQuery)
    const book = books[0] || getBookById(bookQuery)
    setSelectedBook(book || null)
    if (!book) {
      setError("Book not found")
    } else if (book.availableCopies === 0) {
      setError("Book is not available")
    } else {
      setError("")
    }
  }

  const handleIssueBook = async () => {
    if (!selectedStudent || !selectedBook) {
      setError("Please select both student and book")
      return
    }

    if (selectedStudent.currentBooks >= selectedStudent.maxBooks) {
      setError("Student has reached maximum book limit")
      return
    }

    if (selectedStudent.fines > 0) {
      setError("Student has outstanding fines. Please clear dues before issuing new books.")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setSuccess(true)
      setSelectedStudent(null)
      setSelectedBook(null)
      setStudentQuery("")
      setBookQuery("")

      setTimeout(() => setSuccess(false), 3000)
    } catch (err) {
      setError("Failed to issue book. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const canIssueBook =
    selectedStudent &&
    selectedBook &&
    selectedStudent.currentBooks < selectedStudent.maxBooks &&
    selectedStudent.fines === 0 &&
    selectedBook.availableCopies > 0

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Issue Book
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {success && (
          <Alert className="border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              Book issued successfully! Due date: {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}
            </AlertDescription>
          </Alert>
        )}

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Student Search */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="student-search">Search Student</Label>
              <div className="flex gap-2 mt-1">
                <div className="relative flex-1">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="student-search"
                    placeholder="Student ID, name, or email..."
                    value={studentQuery}
                    onChange={(e) => setStudentQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button variant="outline" onClick={searchStudent}>
                  <Search className="h-4 w-4" />
                </Button>
                <Button variant="outline">
                  <Scan className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {selectedStudent && (
              <Card className="border-green-200 bg-green-50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">{selectedStudent.name}</h3>
                    <Badge variant="secondary">{selectedStudent.studentId}</Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{selectedStudent.email}</p>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Current Books:</span>
                      <span className="ml-2 font-medium">
                        {selectedStudent.currentBooks}/{selectedStudent.maxBooks}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">Fines:</span>
                      <span
                        className={`ml-2 font-medium ${selectedStudent.fines > 0 ? "text-red-600" : "text-green-600"}`}
                      >
                        ${selectedStudent.fines}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Book Search */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="book-search">Search Book</Label>
              <div className="flex gap-2 mt-1">
                <div className="relative flex-1">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="book-search"
                    placeholder="Title, author, or ISBN..."
                    value={bookQuery}
                    onChange={(e) => setBookQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button variant="outline" onClick={searchBook}>
                  <Search className="h-4 w-4" />
                </Button>
                <Button variant="outline">
                  <Scan className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {selectedBook && (
              <Card
                className={`${selectedBook.availableCopies > 0 ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}`}
              >
                <CardContent className="p-4">
                  <div className="flex gap-3">
                    <img
                      src={selectedBook.coverUrl || "/placeholder.svg"}
                      alt={selectedBook.title}
                      className="w-12 h-16 object-cover rounded border"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold line-clamp-1">{selectedBook.title}</h3>
                      <p className="text-sm text-gray-600">{selectedBook.author}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant={selectedBook.availableCopies > 0 ? "default" : "destructive"}>
                          {selectedBook.availableCopies > 0 ? "Available" : "Not Available"}
                        </Badge>
                        <span className="text-sm text-gray-600">
                          {selectedBook.availableCopies}/{selectedBook.totalCopies} copies
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {selectedStudent && selectedBook && (
          <>
            <Separator />
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Issue Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Issue Date:</span>
                  <p className="font-medium">{new Date().toLocaleDateString()}</p>
                </div>
                <div>
                  <span className="text-gray-600">Due Date:</span>
                  <p className="font-medium">{new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}</p>
                </div>
                <div>
                  <span className="text-gray-600">Loan Period:</span>
                  <p className="font-medium">30 days</p>
                </div>
              </div>
            </div>
          </>
        )}

        <div className="flex justify-end">
          <Button onClick={handleIssueBook} disabled={!canIssueBook || isLoading} className="min-w-32">
            {isLoading ? "Issuing..." : "Issue Book"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
