"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { ChevronLeft, ChevronRight, UserX } from "lucide-react"
import { toggleUserActiveStatus } from "@/lib/actions/admin"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

interface User {
  id: string
  name: string | null
  email: string
  role: string
  handle: string | null
  isActive: boolean
  createdAt: Date
}

interface UsersTableProps {
  allUsers: User[]
  onDelete: (userId: string) => Promise<void>
}

export function UsersTable({ allUsers, onDelete }: UsersTableProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [updatingUsers, setUpdatingUsers] = useState<Set<string>>(new Set())
  const itemsPerPage = 10
  const { toast } = useToast()
  const router = useRouter()

  const totalPages = Math.ceil(allUsers.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedUsers = allUsers.slice(startIndex, endIndex)

  useEffect(() => {
    setCurrentPage(1)
  }, [allUsers.length])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleToggleActive = async (userId: string, currentStatus: boolean) => {
    setUpdatingUsers((prev) => new Set(prev).add(userId))
    try {
      await toggleUserActiveStatus(userId, !currentStatus)
      toast({
        title: "Success",
        description: `User account ${!currentStatus ? "activated" : "deactivated"} successfully`,
      })
      router.refresh()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update user status",
        variant: "destructive",
      })
    } finally {
      setUpdatingUsers((prev) => {
        const next = new Set(prev)
        next.delete(userId)
        return next
      })
    }
  }

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-700">
              <th className="text-left py-3 px-4 text-slate-300 font-medium">Name</th>
              <th className="text-left py-3 px-4 text-slate-300 font-medium">Email</th>
              <th className="text-left py-3 px-4 text-slate-300 font-medium">Role</th>
              <th className="text-left py-3 px-4 text-slate-300 font-medium">Handle</th>
              <th className="text-left py-3 px-4 text-slate-300 font-medium">Status</th>
              <th className="text-left py-3 px-4 text-slate-300 font-medium">Created</th>
              <th className="text-right py-3 px-4 text-slate-300 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.map((user) => (
              <tr key={user.id} className="border-b border-slate-700/50 hover:bg-slate-700/30">
                <td className="py-3 px-4">
                  <p className="text-white font-medium">{user.name || "No name"}</p>
                </td>
                <td className="py-3 px-4 text-slate-300">{user.email}</td>
                <td className="py-3 px-4">
                  <Badge
                    className={
                      user.role === "ADMIN"
                        ? "bg-purple-500/20 text-purple-300"
                        : user.role === "DEVELOPER"
                          ? "bg-teal-500/20 text-teal-300"
                          : "bg-slate-500/20 text-slate-300"
                    }
                  >
                    {user.role}
                  </Badge>
                </td>
                <td className="py-3 px-4 text-slate-300">{user.handle || "-"}</td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={user.isActive}
                      onCheckedChange={() => handleToggleActive(user.id, user.isActive)}
                      disabled={updatingUsers.has(user.id) || user.role === "ADMIN"}
                    />
                    <Badge
                      className={
                        user.isActive
                          ? "bg-green-500/20 text-green-300"
                          : "bg-red-500/20 text-red-300"
                      }
                    >
                      {user.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                </td>
                <td className="py-3 px-4 text-slate-400">{new Date(user.createdAt).toLocaleDateString()}</td>
                <td className="py-3 px-4">
                  <div className="flex items-center justify-end gap-2">
                    {user.role !== "ADMIN" && (
                      <form action={onDelete.bind(null, user.id)}>
                        <Button type="submit" size="sm" variant="ghost" className="text-red-400 hover:text-red-300">
                          <UserX className="w-4 h-4" />
                        </Button>
                      </form>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {allUsers.length === 0 && (
          <div className="text-center py-8">
            <p className="text-slate-400">No users found</p>
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-6">
          <div className="text-sm text-slate-400">
            Showing {startIndex + 1} to {Math.min(endIndex, allUsers.length)} of {allUsers.length} items
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

