import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import type { NextAuthOptions } from "next-auth"

const authOptions: NextAuthOptions = {
  providers: [
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
      ? [
          GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          }),
        ]
      : []),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      // Allow all Google sign-ins
      return true
    },
    async jwt({ token, user, account }) {
      if (user && user.email) {
        // Assign roles based on email patterns
        let role = "student"
        if (user.email.includes("admin")) {
          role = "admin"
        } else if (user.email.includes("librarian")) {
          role = "librarian"
        }
        token.role = role
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = (token.role as string) || "student"
        session.user.id = token.sub || ""
      }
      return session
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET || "development-secret-key",
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
