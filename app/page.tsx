import { MainLayout } from "@/components/layout/main-layout"
import { HeroSlider } from "@/components/home/hero-slider"
import { StatsSection } from "@/components/home/stats-section"
import { FeaturedSections } from "@/components/home/featured-sections"
import { db } from "@/lib/db"
import { heroSlides, projects, services, courses, management, users, developerProfiles } from "@/lib/db/schema"
import { eq, desc } from "drizzle-orm"

async function getHomePageData() {
  // Get hero slides
  const slides = await db.select().from(heroSlides).where(eq(heroSlides.isActive, true)).orderBy(heroSlides.order)

  // Get featured projects
  const featuredProjects = await db
    .select({
      id: projects.id,
      slug: projects.slug,
      title: projects.title,
      summary: projects.summary,
      coverUrl: projects.coverUrl,
      tags: projects.tags,
      tech: projects.tech,
      authorName: users.name,
    })
    .from(projects)
    .leftJoin(users, eq(projects.authorId, users.id))
    .where(eq(projects.status, "PUBLISHED"))
    .orderBy(desc(projects.createdAt))
    .limit(3)

  // Get featured services
  const featuredServices = await db
    .select()
    .from(services)
    .where(eq(services.isFeatured, true))
    .orderBy(services.order)
    .limit(3)

  // Get latest courses
  const latestCourses = await db
    .select()
    .from(courses)
    .where(eq(courses.status, "PUBLISHED"))
    .orderBy(desc(courses.publishedAt))
    .limit(3)

  // Get management team
  const managementTeam = await db
    .select()
    .from(management)
    .where(eq(management.isActive, true))
    .orderBy(management.order)
    .limit(3)

  // Get developers
  const developers = await db
    .select({
      id: users.id,
      name: users.name,
      handle: users.handle,
      image: users.image,
      headline: developerProfiles.headline,
      skills: developerProfiles.skills,
    })
    .from(users)
    .leftJoin(developerProfiles, eq(users.id, developerProfiles.userId))
    .where(eq(users.role, "DEVELOPER"))
    .limit(3)

  // Get stats
  const stats = {
    projects: await db.select().from(projects).where(eq(projects.status, "PUBLISHED")),
    developers: await db.select().from(users).where(eq(users.role, "DEVELOPER")),
    courses: await db.select().from(courses).where(eq(courses.status, "PUBLISHED")),
  }

  return {
    slides,
    featuredProjects,
    featuredServices,
    latestCourses,
    managementTeam,
    developers,
    stats: {
      projects: stats.projects.length,
      developers: stats.developers.length,
      courses: stats.courses.length,
      clients: 50, // Static for now
    },
  }
}

export default async function HomePage() {
  const data = await getHomePageData()

  return (
    <MainLayout>
      <div className="min-h-screen">
        <HeroSlider slides={data.slides} />
        <StatsSection stats={data.stats} />
        <FeaturedSections
          projects={data.featuredProjects}
          services={data.featuredServices}
          courses={data.latestCourses}
          management={data.managementTeam}
          developers={data.developers}
        />
      </div>
    </MainLayout>
  )
}
