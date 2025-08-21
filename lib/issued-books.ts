// Issued books management utilities and mock data
export interface IssuedBook {
  id: string
  bookId: string
  bookTitle: string
  bookAuthor: string
  bookCoverUrl?: string
  studentId: string
  issuedDate: string
  dueDate: string
  returnedDate?: string
  fineAmount: number
  status: "issued" | "overdue" | "returned"
}

// Mock issued books data
export const MOCK_ISSUED_BOOKS: IssuedBook[] = [
  {
    id: "1",
    bookId: "1",
    bookTitle: "Introduction to Computer Science",
    bookAuthor: "John Smith",
    bookCoverUrl: "/computer-science-textbook.png",
    studentId: "STU001",
    issuedDate: "2024-01-15",
    dueDate: "2024-02-15",
    fineAmount: 0,
    status: "issued",
  },
  {
    id: "2",
    bookId: "2",
    bookTitle: "Advanced Mathematics",
    bookAuthor: "Dr. Sarah Johnson",
    bookCoverUrl: "/mathematics-textbook.png",
    studentId: "STU001",
    issuedDate: "2024-01-10",
    dueDate: "2024-01-25",
    fineAmount: 15,
    status: "overdue",
  },
  {
    id: "3",
    bookId: "5",
    bookTitle: "English Literature Classics",
    bookAuthor: "Various Authors",
    bookCoverUrl: "/placeholder-esgud.png",
    studentId: "STU001",
    issuedDate: "2023-12-20",
    dueDate: "2024-01-20",
    returnedDate: "2024-01-18",
    fineAmount: 0,
    status: "returned",
  },
]

export function getIssuedBooksByStudent(studentId: string): IssuedBook[] {
  return MOCK_ISSUED_BOOKS.filter((book) => book.studentId === studentId)
}

export function getCurrentIssuedBooks(studentId: string): IssuedBook[] {
  return MOCK_ISSUED_BOOKS.filter((book) => book.studentId === studentId && book.status !== "returned")
}

export function getOverdueBooks(studentId: string): IssuedBook[] {
  return MOCK_ISSUED_BOOKS.filter((book) => book.studentId === studentId && book.status === "overdue")
}

export function getTotalFines(studentId: string): number {
  return MOCK_ISSUED_BOOKS.filter((book) => book.studentId === studentId && book.status !== "returned").reduce(
    (total, book) => total + book.fineAmount,
    0,
  )
}

export function getDaysUntilDue(dueDate: string): number {
  const due = new Date(dueDate)
  const today = new Date()
  const diffTime = due.getTime() - today.getTime()
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}
