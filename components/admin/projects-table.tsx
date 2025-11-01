"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { DeleteProjectButton } from "./delete-project-button"

interface Project {
  id: string
  title: string
  description: string | null
  slug: string
  status: string
  createdAt: Date
  author?: { name: string | null }
}

export function ProjectsTable({ projects }: { projects: Project[] }) {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const totalPages = Math.ceil(projects.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedProjects = projects.slice(startIndex, endIndex)

  useEffect(() => {
    setCurrentPage(1)
  }, [projects.length])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <>
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
            {paginatedProjects.map((project) => (
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
                        View
                      </Link>
                    </Button>
                    <Button asChild size="sm" variant="ghost" className="text-slate-400 hover:text-white">
                      <Link href={`/admin/projects/${project.id}/edit`}>
                        Edit
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

      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-6">
          <div className="text-sm text-slate-400">
            Showing {startIndex + 1} to {Math.min(endIndex, projects.length)} of {projects.length} items
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="bg-slate-800 border-slate-700 text-white hover:bg-slate-700"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </Button>
            <span className="text-sm text-slate-300">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="bg-slate-800 border-slate-700 text-white hover:bg-slate-700"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </>
  )
}

