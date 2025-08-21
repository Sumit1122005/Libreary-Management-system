"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Book, Calendar, Hash, Building, Users } from "lucide-react"
import type { Book as BookType } from "@/lib/books"

interface BookDetailsModalProps {
  book: BookType | null
  isOpen: boolean
  onClose: () => void
  onIssueBook?: (bookId: string) => void
  showIssueButton?: boolean
}

export function BookDetailsModal({
  book,
  isOpen,
  onClose,
  onIssueBook,
  showIssueButton = true,
}: BookDetailsModalProps) {
  if (!book) return null

  const isAvailable = book.availableCopies > 0

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">Book Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex gap-6">
            <div className="flex-shrink-0">
              <img
                src={book.coverUrl || "/placeholder.svg"}
                alt={`${book.title} cover`}
                className="w-32 h-40 object-cover rounded-lg border shadow-sm"
              />
            </div>

            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-2">{book.title}</h2>
              <p className="text-lg text-gray-600 mb-4">by {book.author}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="secondary">{book.category}</Badge>
                <Badge variant={isAvailable ? "default" : "destructive"}>
                  {isAvailable ? "Available" : "Not Available"}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Hash className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-600">ISBN:</span>
                  <span className="font-mono">{book.isbn}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-600">Year:</span>
                  <span>{book.publishedYear}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-600">Publisher:</span>
                  <span>{book.publisher}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-600">Copies:</span>
                  <span>
                    {book.availableCopies}/{book.totalCopies}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="font-semibold mb-2">Description</h3>
            <p className="text-gray-700 leading-relaxed">{book.description}</p>
          </div>

          {showIssueButton && onIssueBook && (
            <>
              <Separator />
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={onClose}>
                  Close
                </Button>
                <Button
                  onClick={() => {
                    onIssueBook(book.id)
                    onClose()
                  }}
                  disabled={!isAvailable}
                >
                  <Book className="h-4 w-4 mr-2" />
                  {isAvailable ? "Issue This Book" : "Not Available"}
                </Button>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
