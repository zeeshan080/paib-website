import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth/config"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Plus, Search, Edit, Eye } from "lucide-react"
import Link from "next/link"
import { getProjectsForAdmin } from "@/lib/actions/admin"
import { DeleteProjectButton } from "@/components/admin/delete-project-button"

export default async function AdminProjectsPage({
  searchParams = { search: undefined },
}: {
  searchParams?: { search?: string }
}) {
  // Use getServerSession with authOptions
  const session = await getServerSession(authOptions)

  if (!session?.user || session.user.role !== "ADMIN") {
    redirect("/unauthorized")
  }

  // Use optional chaining to safely access searchParams.search
  const projects = await getProjectsForAdmin(searchParams?.search)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-teal-400 bg-clip-text text-transparent mb-2">
              Manage Projects
            </h1>
            <p className="text-slate-300">Create and manage project showcases</p>
          </div>
          <Button
            asChild
            className="bg-gradient-to-r from-purple-600 to-teal-600 hover:from-purple-700 hover:to-teal-700"
          >
            <Link href="/admin/projects/new">
              <Plus className="w-4 h-4 mr-2" />
              Add Project
            </Link>
          </Button>
        </div>

        {/* Search */}
        <Card className="bg-slate-800/50 border-slate-700 mb-6">
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input
                placeholder="Search projects..."
                className="pl-10 bg-slate-700 border-slate-600 text-white"
                defaultValue={searchParams?.search || ""}
              />
            </div>
          </CardContent>
        </Card>

        {/* Projects Table */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Projects ({projects.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="text-left py-3 px-4 text-slate-300 font-medium">Title</th>
                    <th className="text-left py-3 px-4 text-slate-300 font-medium">Status</th>
                    <th className="text-left py-3 px-4 text-slate-300 font-medium">Author</th>
                    <th className="text-left py-3 px-4 text-slate-300 font-medium">Created</th>
                    <th className="text-right py-3 px-4 text-slate-300 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((project) => (
                    <tr key={project.id} className="border-b border-slate-700/50 hover:bg-slate-700/30">
                      <td className="py-3 px-4">
                        <div>
                          <p className="text-white font-medium">{project.title}</p>
                          <p className="text-slate-400 text-sm line-clamp-1">{project.description}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <Badge
                          variant={project.status === "PUBLISHED" ? "default" : "secondary"}
                          className={project.status === "PUBLISHED" ? "bg-purple-500/20 text-purple-300" : ""}
                        >
                          {project.status === "PUBLISHED" ? "Published" : "Draft"}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-slate-300">{project.author?.name || "Unknown"}</td>
                      <td className="py-3 px-4 text-slate-400">{new Date(project.createdAt).toLocaleDateString()}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center justify-end gap-2">
                          <Button asChild size="sm" variant="ghost" className="text-slate-400 hover:text-white">
                            <Link href={`/projects/${project.slug}`}>
                              <Eye className="w-4 h-4" />
                            </Link>
                          </Button>
                          <Button asChild size="sm" variant="ghost" className="text-slate-400 hover:text-white">
                            <Link href={`/admin/projects/${project.id}/edit`}>
                              <Edit className="w-4 h-4" />
                            </Link>
                          </Button>
                          <DeleteProjectButton projectId={project.id} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {projects.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-slate-400">No projects found</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
