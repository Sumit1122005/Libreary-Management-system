"use client"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Book, BookOpen, Users } from "lucide-react"
import type { Book as BookType } from "@/lib/books"

interface BookCardProps {
  book: BookType
  onViewDetails: (bookId: string) => void
  onIssueBook?: (bookId: string) => void
  showIssueButton?: boolean
}

export function BookCard({ book, onViewDetails, onIssueBook, showIssueButton = true }: BookCardProps) {
  const isAvailable = book.availableCopies > 0

  return (
    <Card className="h-full flex flex-col hover:shadow-md transition-shadow">
      <CardContent className="p-4 flex-1">
        <div className="flex gap-4">
          <div className="flex-shrink-0">
            <img
              src={book.coverUrl || "/placeholder.svg"}
              alt={`${book.title} cover`}
              className="w-16 h-20 object-cover rounded border"
            />
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg line-clamp-2 mb-1">{book.title}</h3>
            <p className="text-gray-600 text-sm mb-2">by {book.author}</p>

            <div className="flex flex-wrap gap-2 mb-3">
              <Badge variant="secondary" className="text-xs">
                {book.category}
              </Badge>
              <Badge variant={isAvailable ? "default" : "destructive"} className="text-xs">
                {isAvailable ? "Available" : "Not Available"}
              </Badge>
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Users className="h-3 w-3" />
                <span>
                  {book.availableCopies}/{book.totalCopies}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <BookOpen className="h-3 w-3" />
                <span>{book.publishedYear}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex gap-2">
        <Button variant="outline" size="sm" onClick={() => onViewDetails(book.id)} className="flex-1">
          <Book className="h-4 w-4 mr-1" />
          Details
        </Button>

        {showIssueButton && onIssueBook && (
          <Button size="sm" onClick={() => onIssueBook(book.id)} disabled={!isAvailable} className="flex-1">
            {isAvailable ? "Issue Book" : "Unavailable"}
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
