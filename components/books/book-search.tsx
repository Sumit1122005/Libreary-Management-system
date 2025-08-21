"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"

interface BookSearchProps {
  onSearch: (query: string, category: string) => void
  categories: string[]
}

export function BookSearch({ onSearch, categories }: BookSearchProps) {
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState("all")

  const handleSearch = () => {
    onSearch(query, category)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:gap-4 p-4 sm:p-6 bg-white rounded-lg shadow-sm border">
      <div className="flex-1 min-w-0">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search by title, author, ISBN..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            className="pl-10 h-10 sm:h-11 text-base"
          />
        </div>
      </div>

      <Select value={category} onValueChange={setCategory}>
        <SelectTrigger className="w-full sm:w-48 h-10 sm:h-11">
          <SelectValue placeholder="Select category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          {categories.map((cat) => (
            <SelectItem key={cat} value={cat.toLowerCase()}>
              {cat}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button onClick={handleSearch} className="w-full sm:w-auto h-10 sm:h-11 text-base">
        Search
      </Button>
    </div>
  )
}
