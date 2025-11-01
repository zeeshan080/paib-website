"use server"

import { db } from "@/lib/db"
import { users, projects, courses, contactMessages, services } from "@/lib/db/schema"
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

export async function getUsersForAdmin(search?: string) {
  try {
    const query = db
      .select({
        id: users.id,
        name: users.name,
        email: users.email,
        role: users.role,
        handle: users.handle,
        createdAt: users.createdAt,
      })
      .from(users)
      .orderBy(desc(users.createdAt))

    const result = await query

    if (search) {
      return result.filter(
        (user) =>
          user.name?.toLowerCase().includes(search.toLowerCase()) ||
          user.email.toLowerCase().includes(search.toLowerCase()) ||
          (user.handle && user.handle.toLowerCase().includes(search.toLowerCase())),
      )
    }

    return result
  } catch (error) {
    console.error("Error fetching users for admin:", error)
    return []
  }
}

export async function getCoursesForAdmin(search?: string) {
  try {
    const query = db
      .select({
        id: courses.id,
        title: courses.title,
        description: courses.excerpt,
        slug: courses.slug,
        status: courses.status,
        level: courses.level,
        createdAt: courses.createdAt,
      })
      .from(courses)
      .orderBy(desc(courses.createdAt))

    const result = await query

    if (search) {
      return result.filter(
        (course) =>
          course.title.toLowerCase().includes(search.toLowerCase()) ||
          (course.description && course.description.toLowerCase().includes(search.toLowerCase())),
      )
    }

    return result
  } catch (error) {
    console.error("Error fetching courses for admin:", error)
    return []
  }
}

export async function deleteCourse(courseId: string) {
  try {
    await db.delete(courses).where(eq(courses.id, courseId))
    return { success: true }
  } catch (error) {
    console.error("Error deleting course:", error)
    throw new Error("Failed to delete course")
  }
}

export async function getServicesForAdmin(search?: string) {
  try {
    const query = db
      .select({
        id: services.id,
        title: services.title,
        description: services.excerpt,
        slug: services.slug,
        priceRange: services.priceRange,
        isFeatured: services.isFeatured,
        createdAt: services.createdAt,
      })
      .from(services)
      .orderBy(desc(services.createdAt))

    const result = await query

    if (search) {
      return result.filter(
        (service) =>
          service.title.toLowerCase().includes(search.toLowerCase()) ||
          (service.description && service.description.toLowerCase().includes(search.toLowerCase())),
      )
    }

    return result
  } catch (error) {
    console.error("Error fetching services for admin:", error)
    return []
  }
}

export async function getContactMessagesForAdmin(search?: string) {
  try {
    const query = db
      .select({
        id: contactMessages.id,
        name: contactMessages.name,
        email: contactMessages.email,
        subject: contactMessages.subject,
        body: contactMessages.body,
        status: contactMessages.status,
        createdAt: contactMessages.createdAt,
      })
      .from(contactMessages)
      .orderBy(desc(contactMessages.createdAt))

    const result = await query

    if (search) {
      return result.filter(
        (message) =>
          message.name.toLowerCase().includes(search.toLowerCase()) ||
          message.email.toLowerCase().includes(search.toLowerCase()) ||
          message.subject.toLowerCase().includes(search.toLowerCase()) ||
          message.body.toLowerCase().includes(search.toLowerCase()),
      )
    }

    return result
  } catch (error) {
    console.error("Error fetching contact messages for admin:", error)
    return []
  }
}

export async function updateContactMessageStatus(messageId: string, status: string) {
  try {
    await db
      .update(contactMessages)
      .set({ status: status as any, updatedAt: new Date() })
      .where(eq(contactMessages.id, messageId))
    return { success: true }
  } catch (error) {
    console.error("Error updating message status:", error)
    throw new Error("Failed to update message status")
  }
}

export async function deleteService(serviceId: string) {
  try {
    await db.delete(services).where(eq(services.id, serviceId))
    return { success: true }
  } catch (error) {
    console.error("Error deleting service:", error)
    throw new Error("Failed to delete service")
  }
}
