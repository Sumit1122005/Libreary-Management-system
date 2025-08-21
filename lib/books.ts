// Book management utilities and mock data
export interface Book {
  id: string
  title: string
  author: string
  isbn: string
  category: string
  publisher: string
  publishedYear: number
  totalCopies: number
  availableCopies: number
  description: string
  coverUrl?: string
}

// Mock books data for demo
export const MOCK_BOOKS: Book[] = [
  {
    id: "1",
    title: "Introduction to Computer Science",
    author: "John Smith",
    isbn: "978-0123456789",
    category: "Computer Science",
    publisher: "Tech Publications",
    publishedYear: 2023,
    totalCopies: 5,
    availableCopies: 3,
    description: "A comprehensive introduction to computer science fundamentals.",
    coverUrl: "/computer-science-textbook.png",
  },
  {
    id: "2",
    title: "Advanced Mathematics",
    author: "Dr. Sarah Johnson",
    isbn: "978-0987654321",
    category: "Mathematics",
    publisher: "Academic Press",
    publishedYear: 2022,
    totalCopies: 3,
    availableCopies: 1,
    description: "Advanced mathematical concepts for engineering students.",
    coverUrl: "/mathematics-textbook.png",
  },
  {
    id: "3",
    title: "Physics Principles",
    author: "Prof. Michael Brown",
    isbn: "978-0456789123",
    category: "Physics",
    publisher: "Science Books",
    publishedYear: 2023,
    totalCopies: 4,
    availableCopies: 4,
    description: "Fundamental principles of physics with practical applications.",
    coverUrl: "/physics-textbook.png",
  },
  {
    id: "4",
    title: "Data Structures and Algorithms",
    author: "Alice Wilson",
    isbn: "978-0789123456",
    category: "Computer Science",
    publisher: "Code Publishers",
    publishedYear: 2023,
    totalCopies: 6,
    availableCopies: 0,
    description: "Essential data structures and algorithms for programming.",
    coverUrl: "/programming-algorithms-book.png",
  },
  {
    id: "5",
    title: "English Literature Classics",
    author: "Various Authors",
    isbn: "978-0321654987",
    category: "Literature",
    publisher: "Classic Books",
    publishedYear: 2021,
    totalCopies: 8,
    availableCopies: 6,
    description: "A collection of timeless English literature classics.",
    coverUrl: "/placeholder-esgud.png",
  },
]

export function searchBooks(query: string, category?: string): Book[] {
  let filtered = MOCK_BOOKS

  if (category && category !== "all") {
    filtered = filtered.filter((book) => book.category.toLowerCase() === category.toLowerCase())
  }

  if (query.trim()) {
    const searchTerm = query.toLowerCase()
    filtered = filtered.filter(
      (book) =>
        book.title.toLowerCase().includes(searchTerm) ||
        book.author.toLowerCase().includes(searchTerm) ||
        book.isbn.includes(searchTerm) ||
        book.category.toLowerCase().includes(searchTerm),
    )
  }

  return filtered
}

export function getBookById(id: string): Book | undefined {
  return MOCK_BOOKS.find((book) => book.id === id)
}

export function getCategories(): string[] {
  const categories = Array.from(new Set(MOCK_BOOKS.map((book) => book.category)))
  return categories.sort()
}
