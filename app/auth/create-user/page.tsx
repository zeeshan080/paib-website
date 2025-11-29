import { SignUpForm } from "@/components/auth/signup-form"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth/config"
import { redirect } from "next/navigation"

export default async function SignUpPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user || session.user.role !== "ADMIN") {
    redirect("/unauthorized")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">PAIB</h1>
          <p className="text-purple-200">Pakistan Artificial Intelligence Builders</p>
        </div>
        <SignUpForm isAdmin={true} />
      </div>
    </div>
  )
}
