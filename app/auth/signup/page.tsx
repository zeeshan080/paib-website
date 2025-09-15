import { SignUpForm } from "@/components/auth/signup-form"
import { getCurrentUser } from "@/lib/auth/utils"
import { redirect } from "next/navigation"

export default async function SignUpPage() {
  const user = await getCurrentUser()

  if (user) {
    redirect("/admin")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">PAIB</h1>
          <p className="text-purple-200">Pakistan Artificial Intelligence Bureau</p>
        </div>
        <SignUpForm />
      </div>
    </div>
  )
}
