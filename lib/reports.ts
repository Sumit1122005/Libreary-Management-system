// Reports and analytics utilities
export interface BookStats {
  totalBooks: number
  availableBooks: number
  issuedBooks: number
  overdueBooks: number
  categoriesCount: number
}

export interface CirculationData {
  month: string
  issued: number
  returned: number
  overdue: number
}

export interface PopularBook {
  id: string
  title: string
  author: string
  category: string
  timesIssued: number
  currentlyIssued: number
}

export interface StudentActivity {
  studentId: string
  name: string
  totalBooksIssued: number
  currentBooks: number
  overdueBooks: number
  totalFines: number
  lastActivity: string
}

export interface FinancialData {
  month: string
  finesCollected: number
  newMemberships: number
  revenue: number
}

// Mock data for reports
export const MOCK_BOOK_STATS: BookStats = {
  totalBooks: 1250,
  availableBooks: 892,
  issuedBooks: 358,
  overdueBooks: 23,
  categoriesCount: 12,
}

export const MOCK_CIRCULATION_DATA: CirculationData[] = [
  { month: "Jan", issued: 245, returned: 230, overdue: 15 },
  { month: "Feb", issued: 289, returned: 275, overdue: 18 },
  { month: "Mar", issued: 312, returned: 298, overdue: 22 },
  { month: "Apr", issued: 298, returned: 285, overdue: 19 },
  { month: "May", issued: 334, returned: 320, overdue: 25 },
  { month: "Jun", issued: 356, returned: 340, overdue: 28 },
]

export const MOCK_POPULAR_BOOKS: PopularBook[] = [
  {
    id: "1",
    title: "Introduction to Computer Science",
    author: "John Smith",
    category: "Computer Science",
    timesIssued: 45,
    currentlyIssued: 3,
  },
  {
    id: "4",
    title: "Data Structures and Algorithms",
    author: "Alice Wilson",
    category: "Computer Science",
    timesIssued: 38,
    currentlyIssued: 6,
  },
  {
    id: "2",
    title: "Advanced Mathematics",
    author: "Dr. Sarah Johnson",
    category: "Mathematics",
    timesIssued: 32,
    currentlyIssued: 2,
  },
  {
    id: "3",
    title: "Physics Principles",
    author: "Prof. Michael Brown",
    category: "Physics",
    timesIssued: 28,
    currentlyIssued: 4,
  },
  {
    id: "5",
    title: "English Literature Classics",
    author: "Various Authors",
    category: "Literature",
    timesIssued: 25,
    currentlyIssued: 1,
  },
]

export const MOCK_STUDENT_ACTIVITY: StudentActivity[] = [
  {
    studentId: "STU001",
    name: "Jane Student",
    totalBooksIssued: 12,
    currentBooks: 2,
    overdueBooks: 1,
    totalFines: 15,
    lastActivity: "2024-01-20",
  },
  {
    studentId: "STU002",
    name: "John Doe",
    totalBooksIssued: 8,
    currentBooks: 1,
    overdueBooks: 0,
    totalFines: 0,
    lastActivity: "2024-01-18",
  },
  {
    studentId: "STU003",
    name: "Alice Johnson",
    totalBooksIssued: 15,
    currentBooks: 3,
    overdueBooks: 0,
    totalFines: 0,
    lastActivity: "2024-01-19",
  },
]

export const MOCK_FINANCIAL_DATA: FinancialData[] = [
  { month: "Jan", finesCollected: 245, newMemberships: 12, revenue: 365 },
  { month: "Feb", finesCollected: 189, newMemberships: 8, revenue: 269 },
  { month: "Mar", finesCollected: 312, newMemberships: 15, revenue: 462 },
  { month: "Apr", finesCollected: 278, newMemberships: 10, revenue: 378 },
  { month: "May", finesCollected: 334, newMemberships: 18, revenue: 514 },
  { month: "Jun", finesCollected: 298, newMemberships: 14, revenue: 438 },
]

export function getBookStats(): BookStats {
  return MOCK_BOOK_STATS
}

export function getCirculationData(): CirculationData[] {
  return MOCK_CIRCULATION_DATA
}

export function getPopularBooks(): PopularBook[] {
  return MOCK_POPULAR_BOOKS
}

export function getStudentActivity(): StudentActivity[] {
  return MOCK_STUDENT_ACTIVITY
}

export function getFinancialData(): FinancialData[] {
  return MOCK_FINANCIAL_DATA
}
