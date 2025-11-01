import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth/config"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
import { getCoursesForAdmin, deleteCourse } from "@/lib/actions/admin"
import { MainLayout } from "@/components/layout/main-layout"
import { CoursesTable } from "@/components/admin/courses-table"
import { SearchForm } from "@/components/admin/search-form"

async function handleDeleteCourse(courseId: string) {
  "use server"
  await deleteCourse(courseId)
}

export default async function AdminCoursesPage({
  searchParams = { search: undefined },
}: {
  searchParams?: { search?: string }
}) {
  const session = await getServerSession(authOptions)

  if (!session?.user || session.user.role !== "ADMIN") {
    redirect("/unauthorized")
  }

  const courses = await getCoursesForAdmin(searchParams?.search)

  return (
    <MainLayout>
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-teal-400 bg-clip-text text-transparent mb-2">
              Manage Courses
            </h1>
            <p className="text-slate-300">Create and manage educational content and courses</p>
          </div>
          <Button
            asChild
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
          >
            <Link href="/admin/courses/new">
              <Plus className="w-4 h-4 mr-2" />
              Add Course
            </Link>
          </Button>
        </div>

        {/* Search */}
        <SearchForm placeholder="Search courses..." />

          {/* Courses Table */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Courses ({courses.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <CoursesTable courses={courses} onDelete={handleDeleteCourse} />
          </CardContent>
        </Card>
      </div>
    </div>
    </MainLayout>
  )
}

