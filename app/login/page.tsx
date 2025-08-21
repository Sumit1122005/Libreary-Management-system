import { LoginForm } from "@/components/auth/login-form"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-amber-50 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-orange-900 mb-2">📚 Library System</h1>
          <p className="text-orange-700">Modern Library Management for Students</p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}
