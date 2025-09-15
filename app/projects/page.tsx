import { MainLayout } from "@/components/layout/main-layout"
import { ProjectsGrid } from "@/components/projects/projects-grid"
import { ProjectsFilters } from "@/components/projects/projects-filters"
import { db } from "@/lib/db"
import { projects, users } from "@/lib/db/schema"
import { eq, desc, ilike, or, sql } from "drizzle-orm"

export const metadata = {
  title: "AI Projects - PAIB",
  description: "Explore our portfolio of innovative AI projects and solutions.",
}

interface ProjectsPageProps {
  searchParams: {
    search?: string
    tag?: string
    tech?: string
    author?: string
  }
}

async function getProjects(filters: {
  search?: string
  tag?: string
  tech?: string
  author?: string
}) {
  // Build the query conditionally
  let query

  if (filters.search) {
    query = db
      .select({
        id: projects.id,
        slug: projects.slug,
        title: projects.title,
        summary: projects.summary,
        coverUrl: projects.coverUrl,
        repoUrl: projects.repoUrl,
        demoUrl: projects.demoUrl,
        tags: projects.tags,
        tech: projects.tech,
        createdAt: projects.createdAt,
        authorName: users.name,
        authorHandle: users.handle,
      })
      .from(projects)
      .leftJoin(users, eq(projects.authorId, users.id))
      .where(
        sql`(${projects.status} = 'PUBLISHED') AND (${projects.title} ILIKE ${`%${filters.search}%`} OR ${projects.summary} ILIKE ${`%${filters.search}%`})`
      )
  } else {
    query = db
      .select({
        id: projects.id,
        slug: projects.slug,
        title: projects.title,
        summary: projects.summary,
        coverUrl: projects.coverUrl,
        repoUrl: projects.repoUrl,
        demoUrl: projects.demoUrl,
        tags: projects.tags,
        tech: projects.tech,
        createdAt: projects.createdAt,
        authorName: users.name,
        authorHandle: users.handle,
      })
      .from(projects)
      .leftJoin(users, eq(projects.authorId, users.id))
      .where(eq(projects.status, "PUBLISHED"))
  }

  const rawProjects = await query.orderBy(desc(projects.createdAt))

  // Transform the data to match the Project interface
  return rawProjects.map(project => ({
    ...project,
    tags: project.tags || [],
    tech: project.tech || [],
  }))
}

async function getFilterOptions() {
  const allProjects = await db
    .select({
      tags: projects.tags,
      tech: projects.tech,
      authorName: users.name,
      authorHandle: users.handle,
    })
    .from(projects)
    .leftJoin(users, eq(projects.authorId, users.id))
    .where(eq(projects.status, "PUBLISHED"))

  const tags = new Set<string>()
  const tech = new Set<string>()
  const authors = new Set<{ name: string; handle: string }>()

  allProjects.forEach((project) => {
    project.tags?.forEach((tag) => tags.add(tag))
    project.tech?.forEach((t) => tech.add(t))
    if (project.authorName && project.authorHandle) {
      authors.add({ name: project.authorName, handle: project.authorHandle })
    }
  })

  return {
    tags: Array.from(tags).sort(),
    tech: Array.from(tech).sort(),
    authors: Array.from(authors),
  }
}

export default async function ProjectsPage({ searchParams }: ProjectsPageProps) {
  const params = await searchParams
  const [projectsData, filterOptions] = await Promise.all([getProjects(params), getFilterOptions()])

  return (
    <MainLayout>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative py-24 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-indigo-900/20">
          <div className="absolute inset-0 grid-pattern opacity-20" />
          <div className="container relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold font-mono mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                AI Projects
              </h1>
              <p className="text-xl text-muted-foreground mb-8 text-pretty">
                Discover our portfolio of innovative artificial intelligence projects that are transforming industries
                and solving real-world challenges.
              </p>
            </div>
          </div>
        </section>

        {/* Filters and Projects */}
        <section className="py-16">
          <div className="container">
            <ProjectsFilters
              filterOptions={filterOptions}
              currentFilters={params}
              totalProjects={projectsData.length}
            />
            <ProjectsGrid projects={projectsData} />
          </div>
        </section>
      </div>
    </MainLayout>
  )
}
