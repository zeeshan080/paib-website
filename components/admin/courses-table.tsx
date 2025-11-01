"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Edit, Eye, Trash2 } from "lucide-react"
import Link from "next/link"

interface Course {
  id: string
  title: string
  description: string | null
  slug: string
  status: string
  level: string
  createdAt: Date
}

interface CoursesTableProps {
  courses: Course[]
  onDelete: (courseId: string) => Promise<void>
}

export function CoursesTable({ courses, onDelete }: CoursesTableProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const totalPages = Math.ceil(courses.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedCourses = courses.slice(startIndex, endIndex)

  useEffect(() => {
    setCurrentPage(1)
  }, [courses.length])

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
              <th className="text-left py-3 px-4 text-slate-300 font-medium">Level</th>
              <th className="text-left py-3 px-4 text-slate-300 font-medium">Status</th>
              <th className="text-left py-3 px-4 text-slate-300 font-medium">Created</th>
              <th className="text-right py-3 px-4 text-slate-300 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedCourses.map((course) => (
              <tr key={course.id} className="border-b border-slate-700/50 hover:bg-slate-700/30">
                <td className="py-3 px-4">
                  <div>
                    <p className="text-white font-medium">{course.title}</p>
                    <p className="text-slate-400 text-sm line-clamp-1">{course.description}</p>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <Badge
                    className={
                      course.level === "Beginner"
                        ? "bg-green-500/20 text-green-300"
                        : course.level === "Intermediate"
                          ? "bg-yellow-500/20 text-yellow-300"
                          : "bg-red-500/20 text-red-300"
                    }
                  >
                    {course.level}
                  </Badge>
                </td>
                <td className="py-3 px-4">
                  <Badge
                    variant={course.status === "PUBLISHED" ? "default" : "secondary"}
                    className={course.status === "PUBLISHED" ? "bg-purple-500/20 text-purple-300" : ""}
                  >
                    {course.status === "PUBLISHED" ? "Published" : "Draft"}
                  </Badge>
                </td>
                <td className="py-3 px-4 text-slate-400">{new Date(course.createdAt).toLocaleDateString()}</td>
                <td className="py-3 px-4">
                  <div className="flex items-center justify-end gap-2">
                    <Button asChild size="sm" variant="ghost" className="text-slate-400 hover:text-white">
                      <Link href={`/courses/${course.slug}`}>
                        <Eye className="w-4 h-4" />
                      </Link>
                    </Button>
                    <Button asChild size="sm" variant="ghost" className="text-slate-400 hover:text-white">
                      <Link href={`/admin/courses/${course.id}/edit`}>
                        <Edit className="w-4 h-4" />
                      </Link>
                    </Button>
                    <form action={onDelete.bind(null, course.id)}>
                      <Button type="submit" size="sm" variant="ghost" className="text-red-400 hover:text-red-300">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {courses.length === 0 && (
          <div className="text-center py-8">
            <p className="text-slate-400">No courses found</p>
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-6">
          <div className="text-sm text-slate-400">
            Showing {startIndex + 1} to {Math.min(endIndex, courses.length)} of {courses.length} items
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

