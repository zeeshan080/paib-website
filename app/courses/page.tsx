import { MainLayout } from "@/components/layout/main-layout"
import { CoursesGrid } from "@/components/courses/courses-grid"
import { CoursesFilters } from "@/components/courses/courses-filters"
import { db } from "@/lib/db"
import { courses } from "@/lib/db/schema"
import { eq, desc, ilike, or, and } from "drizzle-orm"

export const metadata = {
  title: "AI Courses - PAIB",
  description: "Master artificial intelligence with our comprehensive courses and training programs.",
}

interface CoursesPageProps {
  searchParams: {
    search?: string
    level?: string
    price?: string
    tag?: string
  }
}

async function getCourses(filters: {
  search?: string
  level?: string
  price?: string
  tag?: string
}) {
  const conditions = [eq(courses.status, "PUBLISHED")]

  // Add search filter
  if (filters.search) {
    const searchCondition = or(
      ilike(courses.title, `%${filters.search}%`),
      ilike(courses.excerpt, `%${filters.search}%`)
    )
    if (searchCondition) {
      conditions.push(searchCondition)
    }
  }

  // Add level filter
  if (filters.level && filters.level !== "all") {
    conditions.push(eq(courses.level, filters.level as any))
  }

  const rawCourses = await db
    .select()
    .from(courses)
    .where(and(...conditions))
    .orderBy(desc(courses.publishedAt))

  // Transform the data to ensure arrays are never null
  return rawCourses.map(course => ({
    ...course,
    tags: course.tags || [],
    instructors: course.instructors || []
  }))
}

async function getFilterOptions() {
  const allCourses = await db.select().from(courses).where(eq(courses.status, "PUBLISHED"))

  const levels = new Set<string>()
  const tags = new Set<string>()
  const prices = new Set<string>()

  allCourses.forEach((course) => {
    if (course.level) {
      levels.add(course.level)
    }
    if (course.tags) {
      course.tags.forEach((tag) => tags.add(tag))
    }
    if (course.price !== null) {
      prices.add(course.price.toString())
    }
  })

  return {
    levels: Array.from(levels).sort(),
    tags: Array.from(tags).sort(),
    priceOptions: Array.from(prices).sort()
  }
}

export default async function CoursesPage({ searchParams }: CoursesPageProps) {
  const [coursesData, filterOptions] = await Promise.all([getCourses(searchParams), getFilterOptions()])

  return (
    <MainLayout>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative py-24 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-indigo-900/20">
          <div className="absolute inset-0 grid-pattern opacity-20" />
          <div className="container relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold font-mono mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                AI Courses
              </h1>
              <p className="text-xl text-muted-foreground mb-8 text-pretty">
                Master artificial intelligence with our comprehensive courses designed by industry experts. From
                beginners to advanced practitioners, we have something for everyone.
              </p>
            </div>
          </div>
        </section>

        {/* Filters and Courses */}
        <section className="py-16">
          <div className="container">
            <CoursesFilters
              filterOptions={filterOptions}
              currentFilters={searchParams}
              totalCourses={coursesData.length}
            />
            <CoursesGrid courses={coursesData} />
          </div>
        </section>
      </div>
    </MainLayout>
  )
}
