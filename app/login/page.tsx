import { LoginForm } from "@/components/auth/login-form"
import { GoogleLogin } from "@/components/auth/google-login"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-amber-50 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-orange-900 mb-2">📚 Library System</h1>
          <p className="text-orange-700">Modern Library Management for Students</p>
        </div>

        <div className="mb-6">
          <GoogleLogin />
        </div>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-orange-200" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-orange-50 px-2 text-orange-600">Or continue with demo accounts</span>
          </div>
        </div>

        <LoginForm />
      </div>
    </div>
  )
}
