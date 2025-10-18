
import type React from "react"
import { Header } from "./header"
import { Footer } from "./footer"
import { getCurrentUser } from "@/lib/auth/utils"

interface MainLayoutProps {
  children: React.ReactNode
  heroSlider?: React.ReactNode
}

export async function MainLayout({ children, heroSlider }: MainLayoutProps) {
  const user = await getCurrentUser()

  // Ensure handle is always a string
  const headerUser = user
    ? { ...user, handle: user.handle ?? "" }
    : null

  return (
    <div className="min-h-screen flex flex-col">
      <Header user={headerUser} />
      {/* Hero slider is rendered outside the container for full width */}
      {heroSlider}
      <main className="flex-1 w-full mx-auto container px-4 sm:px-6 lg:px-8">
        {children}
      </main>
      <div className="w-full mx-auto">
        <Footer />
      </div>
    </div>
  )
}
