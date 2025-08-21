"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { TrendingUp } from "lucide-react"
import type { PopularBook } from "@/lib/reports"

interface PopularBooksTableProps {
  books: PopularBook[]
}

export function PopularBooksTable({ books }: PopularBooksTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Most Popular Books
        </CardTitle>
        <CardDescription>Books with highest circulation this semester</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Rank</TableHead>
              <TableHead>Book Details</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-center">Times Issued</TableHead>
              <TableHead className="text-center">Currently Out</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {books.map((book, index) => (
              <TableRow key={book.id}>
                <TableCell className="font-medium">#{index + 1}</TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium">{book.title}</p>
                    <p className="text-sm text-gray-600">by {book.author}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">{book.category}</Badge>
                </TableCell>
                <TableCell className="text-center font-medium">{book.timesIssued}</TableCell>
                <TableCell className="text-center">
                  <Badge variant={book.currentlyIssued > 0 ? "default" : "secondary"}>{book.currentlyIssued}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
