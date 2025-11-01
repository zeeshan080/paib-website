"use server"

import { db } from "@/lib/db"
import { developerProfiles, users, projects } from "@/lib/db/schema"
import { eq, ilike, and, or } from "drizzle-orm"

export async function getDeveloperProfiles({
  search,
  specialization,
  experience,
}: {
  search?: string
  specialization?: string
  experience?: string
} = {}) {
  try {
    const conditions = []

    if (search) {
      conditions.push(
        or(
          ilike(users.name, `%${search}%`),
          ilike(developerProfiles.headline, `%${search}%`),
          ilike(developerProfiles.bio, `%${search}%`),
        ),
      )
    }

    // Build the query conditionally
    let query

    if (conditions.length > 0) {
      query = db
        .select({
          id: developerProfiles.userId,
          name: users.name,
          title: developerProfiles.headline,
          bio: developerProfiles.bio,
          avatar: developerProfiles.avatarUrl,
          skills: developerProfiles.skills,
          github: developerProfiles.githubUrl,
          linkedin: developerProfiles.linkedinUrl,
          twitter: developerProfiles.xUrl,
          website: developerProfiles.websiteUrl,
          slug: users.handle,
        })
        .from(developerProfiles)
        .leftJoin(users, eq(developerProfiles.userId, users.id))
        .where(and(...conditions))
    } else {
      query = db
        .select({
          id: developerProfiles.userId,
          name: users.name,
          title: developerProfiles.headline,
          bio: developerProfiles.bio,
          avatar: developerProfiles.avatarUrl,
          skills: developerProfiles.skills,
          github: developerProfiles.githubUrl,
          linkedin: developerProfiles.linkedinUrl,
          twitter: developerProfiles.xUrl,
          website: developerProfiles.websiteUrl,
          slug: users.handle,
        })
        .from(developerProfiles)
        .leftJoin(users, eq(developerProfiles.userId, users.id))
    }

    const result = await query.orderBy(users.name)

    return result.map((dev) => ({
      ...dev,
      skills: Array.isArray(dev.skills) ? dev.skills : JSON.parse(dev.skills || "[]"),
    }))
  } catch (error) {
    console.error("Error fetching developer profiles:", error)
    return []
  }
}

export async function getDeveloperBySlug(slug: string) {
  try {
    const result = await db
      .select({
        id: developerProfiles.userId,
        name: users.name,
        title: developerProfiles.headline,
        bio: developerProfiles.bio,
        avatar: developerProfiles.avatarUrl,
        skills: developerProfiles.skills,
        github: developerProfiles.githubUrl,
        linkedin: developerProfiles.linkedinUrl,
        twitter: developerProfiles.xUrl,
        website: developerProfiles.websiteUrl,
        slug: users.handle,
      })
      .from(developerProfiles)
      .leftJoin(users, eq(developerProfiles.userId, users.id))
      .where(eq(users.handle, slug))
      .limit(1)

    if (result.length === 0) {
      return null
    }

    const developer = result[0]

    // Get developer's projects
    const developerProjects = await db
      .select({
        id: projects.id,
        title: projects.title,
        description: projects.summary,
        technologies: projects.tech,
      })
      .from(projects)
      .where(eq(projects.authorId, developer.id))
      .limit(5)

    return {
      ...developer,
      skills: Array.isArray(developer.skills) ? developer.skills : JSON.parse(developer.skills || "[]"),
      projects: developerProjects.map((project) => ({
        ...project,
        technologies: Array.isArray(project.technologies) ? project.technologies : JSON.parse(project.technologies || "[]"),
      })),
    }
  } catch (error) {
    console.error("Error fetching developer by slug:", error)
    return null
  }
}

export async function updateDeveloperProfile(
  userId: string,
  data: {
    headline?: string
    bio?: string
    skills?: string[]
    websiteUrl?: string
    githubUrl?: string
    linkedinUrl?: string
    xUrl?: string
    avatarUrl?: string
  },
) {
  try {
    const result = await db
      .update(developerProfiles)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(eq(developerProfiles.userId, userId))
      .returning()

    return { success: true, data: result[0] }
  } catch (error) {
    console.error("Error updating developer profile:", error)
    return { success: false, error: "Failed to update profile" }
  }
}
