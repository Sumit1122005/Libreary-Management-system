import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, Users, Calendar, TrendingUp, Sparkles, BarChart3 } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold text-foreground">LibraryMS</h1>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" asChild>
                <Link href="/login">Login</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-orange-50 to-amber-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-foreground mb-6">Modern Library Management System</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Streamline your library operations with our comprehensive system designed for students, librarians, and
            administrators. Experience smart features, analytics, and seamless book management.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/login">Get Started</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/books">Browse Books</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12">Comprehensive Features</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <BookOpen className="h-12 w-12 text-orange-600 mb-4" />
                <CardTitle>Smart Book Management</CardTitle>
                <CardDescription>
                  Advanced search with AI-powered recommendations, real-time availability, and detailed book information
                  with cover images.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Users className="h-12 w-12 text-orange-600 mb-4" />
                <CardTitle>Student Dashboard</CardTitle>
                <CardDescription>
                  Personalized dashboards with issued books, due date tracking, fine management, and reading analytics.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Calendar className="h-12 w-12 text-orange-600 mb-4" />
                <CardTitle>Issue & Return System</CardTitle>
                <CardDescription>
                  Streamlined transaction processing with barcode scanning, automated fine calculation, and renewal
                  options.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <BarChart3 className="h-12 w-12 text-orange-600 mb-4" />
                <CardTitle>Admin Reports</CardTitle>
                <CardDescription>
                  Comprehensive analytics with circulation trends, popular books, student activity, and financial
                  insights.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Sparkles className="h-12 w-12 text-orange-600 mb-4" />
                <CardTitle>Smart Features</CardTitle>
                <CardDescription>
                  AI-powered book recommendations, intelligent notifications, reading goals, and advanced search
                  capabilities.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <TrendingUp className="h-12 w-12 text-orange-600 mb-4" />
                <CardTitle>Role-Based Access</CardTitle>
                <CardDescription>
                  Secure authentication with different access levels for students, librarians, and administrators.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Demo Accounts Section */}
      <section className="py-16 bg-orange-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl font-bold mb-8">Try the Demo</h3>
            <p className="text-lg text-muted-foreground mb-8">
              Experience the full functionality with our demo accounts. Each role has different features and
              permissions.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <Card className="border-2 border-orange-200">
                <CardHeader>
                  <CardTitle className="text-orange-700">Student Account</CardTitle>
                  <CardDescription className="space-y-2">
                    <div>
                      <strong>Email:</strong> student@library.edu
                    </div>
                    <div>
                      <strong>Password:</strong> demo123
                    </div>
                    <div className="text-sm mt-2">Access: Dashboard, Books, Smart Features</div>
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-2 border-blue-200">
                <CardHeader>
                  <CardTitle className="text-blue-700">Librarian Account</CardTitle>
                  <CardDescription className="space-y-2">
                    <div>
                      <strong>Email:</strong> librarian@library.edu
                    </div>
                    <div>
                      <strong>Password:</strong> demo123
                    </div>
                    <div className="text-sm mt-2">Access: All student features + Transactions</div>
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-2 border-green-200">
                <CardHeader>
                  <CardTitle className="text-green-700">Admin Account</CardTitle>
                  <CardDescription className="space-y-2">
                    <div>
                      <strong>Email:</strong> admin@library.edu
                    </div>
                    <div>
                      <strong>Password:</strong> demo123
                    </div>
                    <div className="text-sm mt-2">Access: Full system + Reports & Analytics</div>
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>

            <Button size="lg" asChild>
              <Link href="/login">Login to Demo</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-orange-600 mb-2">1,250+</div>
              <div className="text-muted-foreground">Books Available</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-600 mb-2">500+</div>
              <div className="text-muted-foreground">Active Students</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-600 mb-2">12</div>
              <div className="text-muted-foreground">Book Categories</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-600 mb-2">98%</div>
              <div className="text-muted-foreground">User Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 bg-card">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>
            &copy; 2024 LibraryMS. Built for modern educational institutions with smart features and comprehensive
            analytics.
          </p>
        </div>
      </footer>
    </div>
  )
}
