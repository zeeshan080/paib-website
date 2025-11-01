import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth/config"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, FolderOpen, BookOpen, Briefcase, MessageSquare, Settings, UserPlus } from "lucide-react"
import Link from "next/link"
import { getAdminStats } from "@/lib/actions/admin"
import { MainLayout } from "@/components/layout/main-layout"

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions)

  if (!session?.user || session.user.role !== "ADMIN") {
    redirect("/unauthorized")
  }

  const stats = await getAdminStats()

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-teal-400 bg-clip-text text-transparent mb-2">
            Admin Dashboard
          </h1>
          <p className="text-slate-300">Manage your PAIB website content and users</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Total Users</p>
                  <p className="text-2xl font-bold text-white">{stats.totalUsers}</p>
                </div>
                <Users className="w-8 h-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Projects</p>
                  <p className="text-2xl font-bold text-white">{stats.totalProjects}</p>
                </div>
                <FolderOpen className="w-8 h-8 text-teal-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Courses</p>
                  <p className="text-2xl font-bold text-white">{stats.totalCourses}</p>
                </div>
                <BookOpen className="w-8 h-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Messages</p>
                  <p className="text-2xl font-bold text-white">{stats.totalMessages}</p>
                </div>
                <MessageSquare className="w-8 h-8 text-orange-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link href="/auth/create-user">
            <Card className="bg-slate-800/50 border-slate-700 hover:border-purple-500/50 transition-all duration-300 cursor-pointer group">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-white group-hover:text-purple-400 transition-colors">
                  <UserPlus className="w-6 h-6" />
                  Create User Account
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-400">Create new user accounts for developers and team members</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/admin/users">
            <Card className="bg-slate-800/50 border-slate-700 hover:border-purple-500/50 transition-all duration-300 cursor-pointer group">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-white group-hover:text-purple-400 transition-colors">
                  <Users className="w-6 h-6" />
                  Manage Users
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-400">View and manage user accounts, roles, and permissions</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/admin/projects">
            <Card className="bg-slate-800/50 border-slate-700 hover:border-teal-500/50 transition-all duration-300 cursor-pointer group">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-white group-hover:text-teal-400 transition-colors">
                  <FolderOpen className="w-6 h-6" />
                  Manage Projects
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-400">Create, edit, and organize project showcases</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/admin/courses">
            <Card className="bg-slate-800/50 border-slate-700 hover:border-blue-500/50 transition-all duration-300 cursor-pointer group">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-white group-hover:text-blue-400 transition-colors">
                  <BookOpen className="w-6 h-6" />
                  Manage Courses
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-400">Create and manage educational content and courses</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/admin/services">
            <Card className="bg-slate-800/50 border-slate-700 hover:border-green-500/50 transition-all duration-300 cursor-pointer group">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-white group-hover:text-green-400 transition-colors">
                  <Briefcase className="w-6 h-6" />
                  Manage Services
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-400">Update service offerings and pricing</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/admin/messages">
            <Card className="bg-slate-800/50 border-slate-700 hover:border-orange-500/50 transition-all duration-300 cursor-pointer group">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-white group-hover:text-orange-400 transition-colors">
                  <MessageSquare className="w-6 h-6" />
                  Contact Messages
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-400">View and respond to contact form submissions</p>
              </CardContent>
            </Card>
          </Link>

        </div>
      </div>
    </div>
    </MainLayout>
  )
}
