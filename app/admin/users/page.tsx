import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth/config"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users } from "lucide-react"
import Link from "next/link"
import { getUsersForAdmin } from "@/lib/actions/admin"
import { MainLayout } from "@/components/layout/main-layout"
import { UsersTable } from "@/components/admin/users-table"
import { SearchForm } from "@/components/admin/search-form"
import { db } from "@/lib/db"
import { users } from "@/lib/db/schema"
import { eq } from "drizzle-orm"

async function handleDeleteUser(userId: string) {
  "use server"
  try {
    await db.delete(users).where(eq(users.id, userId))
  } catch (error) {
    console.error("Error deleting user:", error)
    throw new Error("Failed to delete user")
  }
}

export default async function AdminUsersPage({
  searchParams = { search: undefined },
}: {
  searchParams?: { search?: string }
}) {
  const session = await getServerSession(authOptions)

  if (!session?.user || session.user.role !== "ADMIN") {
    redirect("/unauthorized")
  }

  const allUsers = await getUsersForAdmin(searchParams?.search)

  return (
    <MainLayout>
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-teal-400 bg-clip-text text-transparent mb-2">
              Manage Users
            </h1>
            <p className="text-slate-300">View and manage user accounts, roles, and permissions</p>
          </div>
          <Button
            asChild
            className="bg-gradient-to-r from-purple-600 to-teal-600 hover:from-purple-700 hover:to-teal-700"
          >
            <Link href="/auth/create-user">
              <Users className="w-4 h-4 mr-2" />
              Add User
            </Link>
          </Button>
        </div>

        {/* Search */}
        <SearchForm placeholder="Search users..." />

          {/* Users Table */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Users ({allUsers.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <UsersTable allUsers={allUsers} onDelete={handleDeleteUser} />
          </CardContent>
        </Card>
      </div>
    </div>
    </MainLayout>
  )
}

