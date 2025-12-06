"use client"

import { useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

interface SignInPageWrapperProps {
  children: React.ReactNode
}

export function SignInPageWrapper({ children }: SignInPageWrapperProps) {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    // Only redirect if session is loaded and user is authenticated
    if (status === "authenticated" && session?.user) {
      router.push("/admin")
    }
  }, [session, status, router])

  // Show loading state while checking session, or show content if not authenticated
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">PAIB</h1>
            <p className="text-purple-200">Pakistan Artificial Intelligence Builders</p>
          </div>
          <div className="text-center text-white">Loading...</div>
        </div>
      </div>
    )
  }

  // If authenticated, don't render content (redirect will happen)
  if (status === "authenticated") {
    return null
  }

  // Show sign-in form for unauthenticated users
  return <>{children}</>
}

