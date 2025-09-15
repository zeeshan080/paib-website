
import type React from "react"
import { Header } from "./header"
import { Footer } from "./footer"
import { getCurrentUser } from "@/lib/auth/utils"

interface MainLayoutProps {
  children: React.ReactNode
}

export async function MainLayout({ children }: MainLayoutProps) {
  const user = await getCurrentUser()

  // Ensure handle is always a string
  const headerUser = user
    ? { ...user, handle: user.handle ?? "" }
    : null

  return (
    <div className="min-h-screen flex flex-col">
      <Header user={headerUser} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
