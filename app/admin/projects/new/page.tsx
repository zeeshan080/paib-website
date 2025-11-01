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

async function createProject(formData: FormData) {
  "use server"
  // TODO: Implement project creation
  redirect("/admin/projects")
}

export default async function NewProjectPage() {
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
              <Link href="/admin/projects">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Projects
              </Link>
            </Button>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-teal-400 bg-clip-text text-transparent mb-2">
              Create New Project
            </h1>
            <p className="text-slate-300">Add a new project to showcase your work</p>
          </div>

          <Card className="bg-slate-800/50 border-slate-700 max-w-3xl">
            <CardHeader>
              <CardTitle className="text-white">Project Details</CardTitle>
            </CardHeader>
            <CardContent>
              <form action={createProject} className="space-y-6">
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
                      placeholder="e.g., AI Chatbot Platform"
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
                      placeholder="e.g., ai-chatbot-platform"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="summary" className="text-white">
                    Summary *
                  </Label>
                  <Textarea
                    id="summary"
                    name="summary"
                    required
                    className="bg-slate-700 border-slate-600 text-white"
                    placeholder="A brief summary of the project"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content" className="text-white">
                    Full Description
                  </Label>
                  <Textarea
                    id="content"
                    name="content"
                    className="bg-slate-700 border-slate-600 text-white"
                    placeholder="Detailed description of the project"
                    rows={8}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                  <div className="space-y-2">
                    <Label htmlFor="coverUrl" className="text-white">
                      Cover Image URL
                    </Label>
                    <Input
                      id="coverUrl"
                      name="coverUrl"
                      className="bg-slate-700 border-slate-600 text-white"
                      placeholder="/uploads/image.jpg"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="repoUrl" className="text-white">
                      Repository URL
                    </Label>
                    <Input
                      id="repoUrl"
                      name="repoUrl"
                      type="url"
                      className="bg-slate-700 border-slate-600 text-white"
                      placeholder="https://github.com/..."
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="demoUrl" className="text-white">
                    Demo URL
                  </Label>
                  <Input
                    id="demoUrl"
                    name="demoUrl"
                    type="url"
                    className="bg-slate-700 border-slate-600 text-white"
                    placeholder="https://example.com"
                  />
                </div>

                <div className="flex gap-4">
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-purple-600 to-teal-600 hover:from-purple-700 hover:to-teal-700"
                  >
                    Create Project
                  </Button>
                  <Button asChild type="button" variant="outline" className="border-slate-600">
                    <Link href="/admin/projects">Cancel</Link>
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

