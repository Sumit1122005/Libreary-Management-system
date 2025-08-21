"use client"

import { useState, useEffect } from "react"
import { AuthGuard } from "@/components/auth/auth-guard"
import { BookSearch } from "@/components/books/book-search"
import { BookCard } from "@/components/books/book-card"
import { BookDetailsModal } from "@/components/books/book-details-modal"
import { searchBooks, getBookById, getCategories, type Book } from "@/lib/books"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { getCurrentUser } from "@/lib/auth"

export default function BooksPage() {
  const [books, setBooks] = useState<Book[]>([])
  const [selectedBook, setSelectedBook] = useState<Book | null>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState(getCurrentUser())

  useEffect(() => {
    // Load all books initially
    setBooks(searchBooks(""))
  }, [])

  const handleSearch = (query: string, category: string) => {
    const results = searchBooks(query, category)
    setBooks(results)
  }

  const handleViewDetails = (bookId: string) => {
    const book = getBookById(bookId)
    if (book) {
      setSelectedBook(book)
      setIsDetailsOpen(true)
    }
  }

  const handleIssueBook = (bookId: string) => {
    // TODO: Implement book issuing logic
    console.log("Issue book:", bookId)
  }

  const canManageBooks = currentUser?.role === "librarian" || currentUser?.role === "admin"

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-6 sm:py-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 sm:mb-8">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Book Catalog</h1>
              <p className="text-gray-600 mt-1 sm:mt-2 text-sm sm:text-base">
                Search and discover books in our library
              </p>
            </div>

            {canManageBooks && (
              <Button className="w-full sm:w-auto">
                <Plus className="h-4 w-4 mr-2" />
                Add New Book
              </Button>
            )}
          </div>

          <div className="mb-6 sm:mb-8">
            <BookSearch onSearch={handleSearch} categories={getCategories()} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {books.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                onViewDetails={handleViewDetails}
                onIssueBook={handleIssueBook}
                showIssueButton={currentUser?.role === "student"}
              />
            ))}
          </div>

          {books.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No books found</h3>
              <p className="text-gray-600">Try adjusting your search criteria</p>
            </div>
          )}
        </div>

        <BookDetailsModal
          book={selectedBook}
          isOpen={isDetailsOpen}
          onClose={() => setIsDetailsOpen(false)}
          onIssueBook={handleIssueBook}
          showIssueButton={currentUser?.role === "student"}
        />
      </div>
    </AuthGuard>
  )
}
