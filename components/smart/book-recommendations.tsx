"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookCard } from "@/components/books/book-card"
import { Badge } from "@/components/ui/badge"
import { Sparkles, TrendingUp, Heart, Clock } from "lucide-react"
import { MOCK_BOOKS, type Book } from "@/lib/books"
import { getCurrentUser } from "@/lib/auth"

interface RecommendationSection {
  title: string
  description: string
  icon: React.ReactNode
  books: Book[]
  reason: string
}

export function BookRecommendations() {
  const [recommendations, setRecommendations] = useState<RecommendationSection[]>([])
  const [currentUser] = useState(getCurrentUser())

  useEffect(() => {
    // Generate smart recommendations based on user behavior
    const generateRecommendations = () => {
      const sections: RecommendationSection[] = [
        {
          title: "Recommended for You",
          description: "Based on your reading history",
          icon: <Sparkles className="h-4 w-4" />,
          books: MOCK_BOOKS.filter((book) => book.category === "Computer Science").slice(0, 2),
          reason: "You frequently read Computer Science books",
        },
        {
          title: "Trending Now",
          description: "Popular among students this week",
          icon: <TrendingUp className="h-4 w-4" />,
          books: MOCK_BOOKS.filter((book) => book.availableCopies > 0).slice(0, 2),
          reason: "High circulation rate",
        },
        {
          title: "Similar to Your Favorites",
          description: "Books like ones you've enjoyed",
          icon: <Heart className="h-4 w-4" />,
          books: MOCK_BOOKS.filter((book) => book.category === "Mathematics").slice(0, 2),
          reason: "Similar to 'Advanced Mathematics' you rated highly",
        },
        {
          title: "Quick Reads",
          description: "Perfect for busy schedules",
          icon: <Clock className="h-4 w-4" />,
          books: MOCK_BOOKS.filter((book) => book.category === "Literature").slice(0, 2),
          reason: "Estimated reading time: 2-3 hours",
        },
      ]

      setRecommendations(sections)
    }

    generateRecommendations()
  }, [currentUser])

  const handleViewDetails = (bookId: string) => {
    console.log("View book details:", bookId)
  }

  const handleIssueBook = (bookId: string) => {
    console.log("Issue book:", bookId)
  }

  return (
    <div className="space-y-8">
      {recommendations.map((section, index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {section.icon}
              {section.title}
            </CardTitle>
            <div className="flex items-center gap-2">
              <p className="text-sm text-gray-600">{section.description}</p>
              <Badge variant="secondary" className="text-xs">
                {section.reason}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {section.books.map((book) => (
                <BookCard
                  key={book.id}
                  book={book}
                  onViewDetails={handleViewDetails}
                  onIssueBook={handleIssueBook}
                  showIssueButton={currentUser?.role === "student"}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
