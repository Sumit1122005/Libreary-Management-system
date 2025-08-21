"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, DollarSign } from "lucide-react"
import type { IssuedBook } from "@/lib/issued-books"
import { getDaysUntilDue } from "@/lib/issued-books"

interface IssuedBookCardProps {
  book: IssuedBook
  onRenew?: (bookId: string) => void
  onReturn?: (bookId: string) => void
}

export function IssuedBookCard({ book, onRenew, onReturn }: IssuedBookCardProps) {
  const daysUntilDue = getDaysUntilDue(book.dueDate)
  const isOverdue = book.status === "overdue"
  const isDueSoon = daysUntilDue <= 3 && daysUntilDue > 0

  const getStatusBadge = () => {
    if (isOverdue) {
      return <Badge variant="destructive">Overdue</Badge>
    }
    if (isDueSoon) {
      return (
        <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
          Due Soon
        </Badge>
      )
    }
    return <Badge variant="default">Active</Badge>
  }

  const getDueDateText = () => {
    if (isOverdue) {
      return `${Math.abs(daysUntilDue)} days overdue`
    }
    if (daysUntilDue === 0) {
      return "Due today"
    }
    if (daysUntilDue === 1) {
      return "Due tomorrow"
    }
    return `Due in ${daysUntilDue} days`
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex gap-4">
          <div className="flex-shrink-0">
            <img
              src={book.bookCoverUrl || "/placeholder.svg"}
              alt={`${book.bookTitle} cover`}
              className="w-16 h-20 object-cover rounded border"
            />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="font-semibold line-clamp-1">{book.bookTitle}</h3>
                <p className="text-sm text-gray-600">by {book.bookAuthor}</p>
              </div>
              {getStatusBadge()}
            </div>

            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Calendar className="h-3 w-3" />
                <span>Issued: {new Date(book.issuedDate).toLocaleDateString()}</span>
              </div>

              <div className="flex items-center gap-2">
                <Clock className={`h-3 w-3 ${isOverdue ? "text-red-500" : isDueSoon ? "text-yellow-500" : ""}`} />
                <span
                  className={isOverdue ? "text-red-600 font-medium" : isDueSoon ? "text-yellow-600 font-medium" : ""}
                >
                  {getDueDateText()}
                </span>
              </div>

              {book.fineAmount > 0 && (
                <div className="flex items-center gap-2">
                  <DollarSign className="h-3 w-3 text-red-500" />
                  <span className="text-red-600 font-medium">Fine: ${book.fineAmount}</span>
                </div>
              )}
            </div>

            <div className="flex gap-2 mt-3">
              {onRenew && (
                <Button variant="outline" size="sm" onClick={() => onRenew(book.id)}>
                  Renew
                </Button>
              )}
              {onReturn && (
                <Button variant="outline" size="sm" onClick={() => onReturn(book.id)}>
                  Return
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
