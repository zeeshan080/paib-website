import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { db } from "@/lib/db"
import { users } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import bcrypt from "bcryptjs"
import { z } from "zod"

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials) return null
          
          const { email, password } = loginSchema.parse(credentials)

          const [user] = await db.select().from(users).where(eq(users.email, email)).limit(1)

          if (!user || !user.passwordHash) {
            return null
          }

          const isValidPassword = await bcrypt.compare(password, user.passwordHash)
          if (!isValidPassword) {
            return null
          }

          // Make sure to include ALL needed user data in the session
          console.log("User role from DB:", user.role)
          
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            handle: user.handle || "",
            image: user.image,
          }
        } catch (error) {
          console.error("Auth error:", error)
          return null
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.role = user.role
        token.handle = user.handle
        // For debugging
        console.log("JWT callback - User role:", user.role)
        console.log("JWT callback - Token after:", token)
      }
      return token
    },
    async session({ session, token }: any) {
      if (token && session.user) {
        session.user.id = token.sub!
        session.user.role = token.role as string
        session.user.handle = (token.handle as string) || ""
        // For debugging
        console.log("Session callback - Token role:", token.role)
        console.log("Session callback - Session after:", session)
      }
      return session
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
  session: {
    strategy: "jwt" as const,
  },
  secret: process.env.NEXTAUTH_SECRET || "fallback-secret-for-development",
  debug: false,
}

export default NextAuth(authOptions)
