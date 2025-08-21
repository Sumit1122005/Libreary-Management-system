"use client"

import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Chrome } from "lucide-react"

export function GoogleLogin() {
  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl: "/dashboard" })
  }

  return (
    <Button
      onClick={handleGoogleSignIn}
      variant="outline"
      className="w-full h-12 text-base font-medium border-2 hover:bg-gray-50 transition-colors bg-transparent"
    >
      <Chrome className="w-5 h-5 mr-3" />
      Continue with Google
    </Button>
  )
}
