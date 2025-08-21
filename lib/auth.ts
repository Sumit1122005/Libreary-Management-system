// Simple authentication utilities for demo purposes
export interface User {
  id: string
  email: string
  name: string
  role: "student" | "librarian" | "admin"
  studentId?: string
}

// Mock users for demo
const MOCK_USERS: User[] = [
  {
    id: "1",
    email: "admin@library.edu",
    name: "Library Admin",
    role: "admin",
  },
  {
    id: "2",
    email: "librarian@library.edu",
    name: "John Librarian",
    role: "librarian",
  },
  {
    id: "3",
    email: "student@library.edu",
    name: "Jane Student",
    role: "student",
    studentId: "STU001",
  },
]

export function authenticateUser(email: string, password: string): User | null {
  // Simple demo authentication - in real app, this would hash passwords
  const user = MOCK_USERS.find((u) => u.email === email)
  if (user && password === "demo123") {
    return user
  }
  return null
}

export function getCurrentUser(): User | null {
  if (typeof window === "undefined") return null

  const userStr = localStorage.getItem("library_user")
  if (!userStr) return null

  try {
    return JSON.parse(userStr)
  } catch {
    return null
  }
}

export function setCurrentUser(user: User): void {
  if (typeof window === "undefined") return
  localStorage.setItem("library_user", JSON.stringify(user))
}

export function logout(): void {
  if (typeof window === "undefined") return
  localStorage.removeItem("library_user")
}
