import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth/config"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MainLayout } from "@/components/layout/main-layout"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

async function createCourse(formData: FormData) {
  "use server"
  // TODO: Implement course creation
  redirect("/admin/courses")
}

export default async function NewCoursePage() {
  const session = await getServerSession(authOptions)

  if (!session?.user || session.user.role !== "ADMIN") {
    redirect("/unauthorized")
  }

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-6">
            <Button asChild variant="ghost" className="mb-4">
              <Link href="/admin/courses">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Courses
              </Link>
            </Button>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-teal-400 bg-clip-text text-transparent mb-2">
              Create New Course
            </h1>
            <p className="text-slate-300">Add a new educational course to your platform</p>
          </div>

          <Card className="bg-slate-800/50 border-slate-700 max-w-3xl">
            <CardHeader>
              <CardTitle className="text-white">Course Details</CardTitle>
            </CardHeader>
            <CardContent>
              <form action={createCourse} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-white">
                      Title *
                    </Label>
                    <Input
                      id="title"
                      name="title"
                      required
                      className="bg-slate-700 border-slate-600 text-white"
                      placeholder="e.g., Introduction to AI"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="slug" className="text-white">
                      Slug *
                    </Label>
                    <Input
                      id="slug"
                      name="slug"
                      required
                      className="bg-slate-700 border-slate-600 text-white"
                      placeholder="e.g., introduction-to-ai"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="excerpt" className="text-white">
                    Short Description
                  </Label>
                  <Textarea
                    id="excerpt"
                    name="excerpt"
                    className="bg-slate-700 border-slate-600 text-white"
                    placeholder="A brief description of the course"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="level" className="text-white">
                      Level *
                    </Label>
                    <Select name="level" required>
                      <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Beginner">Beginner</SelectItem>
                        <SelectItem value="Intermediate">Intermediate</SelectItem>
                        <SelectItem value="Advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="duration" className="text-white">
                      Duration (minutes)
                    </Label>
                    <Input
                      id="duration"
                      name="durationMinutes"
                      type="number"
                      className="bg-slate-700 border-slate-600 text-white"
                      placeholder="e.g., 120"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price" className="text-white">
                      Price (cents)
                    </Label>
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      className="bg-slate-700 border-slate-600 text-white"
                      placeholder="e.g., 9900 ($99.00)"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status" className="text-white">
                    Status *
                  </Label>
                  <Select name="status" defaultValue="DRAFT">
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="DRAFT">Draft</SelectItem>
                      <SelectItem value="PUBLISHED">Published</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex gap-4">
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-purple-600 to-teal-600 hover:from-purple-700 hover:to-teal-700"
                  >
                    Create Course
                  </Button>
                  <Button asChild type="button" variant="outline" className="border-slate-600">
                    <Link href="/admin/courses">Cancel</Link>
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  )
}

