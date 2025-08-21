"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Clock, TrendingUp, Filter } from "lucide-react"
import { searchBooks, getCategories, type Book } from "@/lib/books"

interface SearchSuggestion {
  type: "book" | "author" | "category" | "recent"
  text: string
  count?: number
}

interface SmartSearchProps {
  onSearch: (query: string, category?: string) => void
  onBookSelect?: (book: Book) => void
}

export function SmartSearch({ onSearch, onBookSelect }: SmartSearchProps) {
  const [query, setQuery] = useState("")
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [recentSearches] = useState<string[]>(["Computer Science", "Mathematics", "Physics"])
  const [trendingSearches] = useState<string[]>(["Data Structures", "Algorithms", "Machine Learning"])

  useEffect(() => {
    if (query.length > 1) {
      generateSuggestions(query)
      setShowSuggestions(true)
    } else {
      setShowSuggestions(false)
    }
  }, [query])

  const generateSuggestions = (searchQuery: string) => {
    const books = searchBooks(searchQuery)
    const categories = getCategories()

    const suggestions: SearchSuggestion[] = []

    // Add book suggestions
    books.slice(0, 3).forEach((book) => {
      suggestions.push({
        type: "book",
        text: book.title,
      })
    })

    // Add author suggestions
    const authors = Array.from(new Set(books.map((book) => book.author)))
    authors.slice(0, 2).forEach((author) => {
      suggestions.push({
        type: "author",
        text: author,
      })
    })

    // Add category suggestions
    categories
      .filter((cat) => cat.toLowerCase().includes(searchQuery.toLowerCase()))
      .slice(0, 2)
      .forEach((category) => {
        const count = books.filter((book) => book.category === category).length
        suggestions.push({
          type: "category",
          text: category,
          count,
        })
      })

    setSuggestions(suggestions)
  }

  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    setQuery(suggestion.text)
    setShowSuggestions(false)
    onSearch(suggestion.text)
  }

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query)
      setShowSuggestions(false)
      // Add to recent searches (in real app, save to localStorage)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Search books, authors, categories... (AI-powered)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          className="pl-10 pr-20 h-12 text-lg"
        />
        <Button onClick={handleSearch} className="absolute right-1 top-1 h-10">
          Search
        </Button>
      </div>

      {/* Search Suggestions */}
      {showSuggestions && suggestions.length > 0 && (
        <Card className="absolute top-full left-0 right-0 mt-2 z-50 shadow-lg">
          <CardContent className="p-0">
            <div className="max-h-80 overflow-y-auto">
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 hover:bg-gray-50 cursor-pointer border-b last:border-b-0"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  <div className="flex-shrink-0">
                    {suggestion.type === "book" && <Search className="h-4 w-4 text-blue-500" />}
                    {suggestion.type === "author" && <Search className="h-4 w-4 text-green-500" />}
                    {suggestion.type === "category" && <Filter className="h-4 w-4 text-purple-500" />}
                  </div>
                  <div className="flex-1">
                    <span className="text-sm font-medium">{suggestion.text}</span>
                    {suggestion.count && <span className="text-xs text-gray-500 ml-2">({suggestion.count} books)</span>}
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {suggestion.type}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Suggestions */}
      {!showSuggestions && query.length === 0 && (
        <div className="mt-4 space-y-3">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Clock className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Recent Searches</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {recentSearches.map((search, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="cursor-pointer hover:bg-gray-200"
                  onClick={() => {
                    setQuery(search)
                    onSearch(search)
                  }}
                >
                  {search}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Trending Searches</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {trendingSearches.map((search, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="cursor-pointer hover:bg-orange-50"
                  onClick={() => {
                    setQuery(search)
                    onSearch(search)
                  }}
                >
                  {search}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
