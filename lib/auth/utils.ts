import { getServerSession } from "next-auth"
import { authOptions } from "./config"
import { redirect } from "next/navigation"
import type { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      role: string
      handle: string
    } & DefaultSession["user"]
  }
}

type User = {
  id: string
  email: string
  name: string | null
  role: "ADMIN" | "DEVELOPER" | "VIEWER"
  handle: string | null
  image: string | null
}

export async function getCurrentUser(): Promise<User | null> {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) return null
    
    return {
      id: session.user.id,
      email: session.user.email || "",
      name: session.user.name || null,
      role: session.user.role as "ADMIN" | "DEVELOPER" | "VIEWER",
      handle: session.user.handle || null,
      image: session.user.image || null,
    }
  } catch (error) {
    console.warn("Auth error:", error)
    return null
  }
}

export async function requireAuth(): Promise<User> {
  const user = await getCurrentUser()
  if (!user) {
    redirect("/auth/signin")
  }
  return user
}

export async function requireRole(role: "ADMIN" | "DEVELOPER" | "VIEWER"): Promise<User> {
  const user = await requireAuth()
  if (!user || (user.role !== role && user.role !== "ADMIN")) {
    redirect("/unauthorized")
  }
  return user
}

export async function requireAdminOrOwner(resourceUserId?: string): Promise<User> {
  const user = await requireAuth()
  if (!user || (user.role !== "ADMIN" && user.id !== resourceUserId)) {
    redirect("/unauthorized")
  }
  return user
}
