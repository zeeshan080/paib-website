"use server"

import { db } from "@/lib/db"
import { users, projects, courses, contactMessages } from "@/lib/db/schema"
import { eq, count, desc } from "drizzle-orm"

export async function getAdminStats() {
  try {
    const [totalUsersResult, totalProjectsResult, totalCoursesResult, totalMessagesResult] = await Promise.all([
      db.select({ count: count() }).from(users),
      db.select({ count: count() }).from(projects),
      db.select({ count: count() }).from(courses),
      db.select({ count: count() }).from(contactMessages),
    ])

    return {
      totalUsers: totalUsersResult[0]?.count || 0,
      totalProjects: totalProjectsResult[0]?.count || 0,
      totalCourses: totalCoursesResult[0]?.count || 0,
      totalMessages: totalMessagesResult[0]?.count || 0,
    }
  } catch (error) {
    console.error("Error fetching admin stats:", error)
    return {
      totalUsers: 0,
      totalProjects: 0,
      totalCourses: 0,
      totalMessages: 0,
    }
  }
}

export async function getProjectsForAdmin(search?: string) {
  try {
    const query = db
      .select({
        id: projects.id,
        title: projects.title,
        description: projects.summary,
        slug: projects.slug,
        status: projects.status,
        createdAt: projects.createdAt,
        author: {
          name: users.name,
        },
      })
      .from(projects)
      .leftJoin(users, eq(projects.authorId, users.id))
      .orderBy(desc(projects.createdAt))

    const result = await query

    if (search) {
      return result.filter(
        (project) =>
          project.title.toLowerCase().includes(search.toLowerCase()) ||
          (project.description && project.description.toLowerCase().includes(search.toLowerCase())),
      )
    }

    return result
  } catch (error) {
    console.error("Error fetching projects for admin:", error)
    return []
  }
}

export async function deleteProject(projectId: string) {
  try {
    await db.delete(projects).where(eq(projects.id, projectId))
    return { success: true }
  } catch (error) {
    console.error("Error deleting project:", error)
    throw new Error("Failed to delete project")
  }
}
