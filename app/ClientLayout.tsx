"use client"

import type React from "react"

import { Inter, Poppins } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { Button } from "@/components/ui/button"
import { useRouter, usePathname } from "next/navigation"
import { getCurrentUser, logout } from "@/lib/auth"
import { useState, useEffect } from "react"
import { Home, Book, BarChart3, Users, Sparkles, LogOut, Menu, X } from "lucide-react"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-poppins",
})

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [currentUser, setCurrentUser] = useState(getCurrentUser())
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    setCurrentUser(getCurrentUser())
  }, [pathname])

  const handleLogout = () => {
    logout()
    setCurrentUser(null)
    router.push("/login")
  }

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: Home, roles: ["student", "librarian", "admin"] },
    { name: "Books", href: "/books", icon: Book, roles: ["student", "librarian", "admin"] },
    { name: "Transactions", href: "/transactions", icon: Users, roles: ["librarian", "admin"] },
    { name: "Reports", href: "/reports", icon: BarChart3, roles: ["admin"] },
    { name: "Smart Features", href: "/smart", icon: Sparkles, roles: ["student", "librarian", "admin"] },
  ]

  const filteredNavigation = navigation.filter((item) => !currentUser || item.roles.includes(currentUser.role))

  const isLoginPage = pathname === "/login"

  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable} antialiased`}>
      <body className="font-sans">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {!isLoginPage && currentUser && (
            <div className="min-h-screen bg-gray-50">
              {/* Navigation */}
              <nav className="bg-white shadow-sm border-b">
                <div className="container mx-auto px-4">
                  <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex items-center gap-2">
                      <Book className="h-8 w-8 text-orange-600" />
                      <span className="text-xl font-bold text-gray-900">LibraryMS</span>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                      {filteredNavigation.map((item) => {
                        const isActive = pathname === item.href
                        return (
                          <button
                            key={item.name}
                            onClick={() => router.push(item.href)}
                            className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                              isActive
                                ? "bg-orange-100 text-orange-700"
                                : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                            }`}
                          >
                            <item.icon className="h-4 w-4" />
                            {item.name}
                          </button>
                        )
                      })}
                    </div>

                    {/* User Menu */}
                    <div className="flex items-center gap-4">
                      <div className="hidden md:block text-right">
                        <p className="text-sm font-medium text-gray-900">{currentUser.name}</p>
                        <p className="text-xs text-gray-600 capitalize">{currentUser.role}</p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleLogout}
                        className="hidden md:flex items-center gap-2 bg-transparent"
                      >
                        <LogOut className="h-4 w-4" />
                        Logout
                      </Button>

                      {/* Mobile menu button */}
                      <Button
                        variant="outline"
                        size="sm"
                        className="md:hidden bg-transparent"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                      >
                        {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  {/* Mobile Navigation */}
                  {isMobileMenuOpen && (
                    <div className="md:hidden border-t bg-white">
                      <div className="px-2 pt-2 pb-3 space-y-1">
                        {filteredNavigation.map((item) => {
                          const isActive = pathname === item.href
                          return (
                            <button
                              key={item.name}
                              onClick={() => {
                                router.push(item.href)
                                setIsMobileMenuOpen(false)
                              }}
                              className={`flex items-center gap-2 w-full px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                isActive
                                  ? "bg-orange-100 text-orange-700"
                                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                              }`}
                            >
                              <item.icon className="h-4 w-4" />
                              {item.name}
                            </button>
                          )
                        })}
                        <div className="border-t pt-2 mt-2">
                          <div className="px-3 py-2">
                            <p className="text-sm font-medium text-gray-900">{currentUser.name}</p>
                            <p className="text-xs text-gray-600 capitalize">{currentUser.role}</p>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={handleLogout}
                            className="w-full justify-start gap-2 mx-3 bg-transparent"
                          >
                            <LogOut className="h-4 w-4" />
                            Logout
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </nav>

              {/* Main Content */}
              <main>{children}</main>
            </div>
          )}

          {(isLoginPage || !currentUser) && children}

          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
