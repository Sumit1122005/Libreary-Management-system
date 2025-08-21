"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getCurrentUser, type User } from "@/lib/auth"
import { useSession } from "next-auth/react"

interface AuthGuardProps {
  children: React.ReactNode
  requiredRole?: "student" | "librarian" | "admin"
}

export function AuthGuard({ children, requiredRole }: AuthGuardProps) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const { data: session, status } = useSession()

  useEffect(() => {
    if (status === "loading") {
      return // Still loading NextAuth session
    }

    let currentUser: User | null = null

    // Check NextAuth session first
    if (session?.user) {
      currentUser = {
        id: session.user.id,
        name: session.user.name || "",
        email: session.user.email || "",
        role: session.user.role as "student" | "librarian" | "admin",
      }
    } else {
      // Fallback to local auth
      currentUser = getCurrentUser()
    }

    if (!currentUser) {
      router.push("/login")
      return
    }

    if (requiredRole && currentUser.role !== requiredRole && currentUser.role !== "admin") {
      router.push("/dashboard")
      return
    }

    setUser(currentUser)
    setIsLoading(false)
  }, [router, requiredRole, session, status])

  if (isLoading || status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return <>{children}</>
}
