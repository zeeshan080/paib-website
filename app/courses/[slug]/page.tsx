import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Clock, Users, Calendar, CheckCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { db } from "@/lib/db"
import { courses } from "@/lib/db/schema"
import { eq, and } from "drizzle-orm"

interface CoursePageProps {
  params: {
    slug: string
  }
}

async function getCourse(slug: string) {
  const [course] = await db
    .select()
    .from(courses)
    .where(and(eq(courses.slug, slug), eq(courses.status, "PUBLISHED")))
    .limit(1)

  return course
}

export async function generateMetadata({ params }: CoursePageProps) {
  const course = await getCourse(params.slug)

  if (!course) {
    return {
      title: "Course Not Found - PAIB",
    }
  }

  return {
    title: `${course.title} - PAIB Courses`,
    description: course.excerpt || `Learn ${course.title} with PAIB's comprehensive AI course.`,
  }
}

export default async function CoursePage({ params }: CoursePageProps) {
  const course = await getCourse(params.slug)

  if (!course) {
    notFound()
  }

  // Mock course outline for demonstration
  const courseOutline = [
    "Introduction to AI Concepts",
    "Setting up Development Environment",
    "Data Preprocessing Techniques",
    "Machine Learning Algorithms",
    "Model Training and Evaluation",
    "Deployment and Production",
    "Best Practices and Ethics",
    "Final Project and Assessment",
  ]

  const prerequisites = [
    "Basic programming knowledge",
    "Understanding of mathematics",
    "Familiarity with Python (recommended)",
  ]

  return (
    <MainLayout>
      <div className="min-h-screen py-16">
        <div className="container">
          {/* Back Button */}
          <div className="mb-8">
            <Button variant="ghost" asChild>
              <Link href="/courses">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Courses
              </Link>
            </Button>
          </div>

          {/* Course Header */}
          <div className="max-w-4xl mx-auto">
            <Card className="border-border/40 bg-card/50 backdrop-blur-sm mb-8">
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="outline" className="text-primary border-primary/40">
                    {course.level}
                  </Badge>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    {course.durationMinutes && (
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {Math.floor(course.durationMinutes / 60)}h {course.durationMinutes % 60}m
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {course.instructors.length} instructor{course.instructors.length !== 1 ? "s" : ""}
                    </div>
                    {course.publishedAt && (
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(course.publishedAt).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                </div>
                <CardTitle className="text-4xl mb-4">{course.title}</CardTitle>
                <p className="text-xl text-muted-foreground mb-6">{course.excerpt}</p>

                {/* Price and CTA */}
                <div className="flex items-center justify-between">
                  <div className="text-3xl font-bold">
                    {course.price ? (
                      <span className="text-primary">${(course.price / 100).toFixed(2)}</span>
                    ) : (
                      <Badge className="bg-green-500/10 text-green-500 border-green-500/40 text-lg px-4 py-2">
                        Free
                      </Badge>
                    )}
                  </div>
                  <Button size="lg">{course.price ? "Enroll Now" : "Start Learning"}</Button>
                </div>
              </CardHeader>
            </Card>

            {/* Course Image */}
            {course.thumbnailUrl && (
              <Card className="border-border/40 bg-card/50 backdrop-blur-sm mb-8">
                <div className="relative h-96 overflow-hidden rounded-lg">
                  <Image
                    src={course.thumbnailUrl || "/placeholder.svg"}
                    alt={course.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </Card>
            )}

            {/* Course Details */}
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              {/* Main Content */}
              <div className="md:col-span-2 space-y-6">
                {/* Description */}
                <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-2xl">Course Description</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                      {course.content || course.excerpt}
                    </p>
                  </CardContent>
                </Card>

                {/* Course Outline */}
                <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-2xl">Course Outline</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {courseOutline.map((item, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium text-primary">
                            {index + 1}
                          </div>
                          <span className="text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Course Info */}
                <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-lg">Course Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="font-medium mb-1">Level</div>
                      <Badge variant="outline">{course.level}</Badge>
                    </div>
                    {course.durationMinutes && (
                      <div>
                        <div className="font-medium mb-1">Duration</div>
                        <div className="text-muted-foreground">
                          {Math.floor(course.durationMinutes / 60)} hours {course.durationMinutes % 60} minutes
                        </div>
                      </div>
                    )}
                    <div>
                      <div className="font-medium mb-1">Instructors</div>
                      <div className="text-muted-foreground">{course.instructors.join(", ")}</div>
                    </div>
                  </CardContent>
                </Card>

                {/* Tags */}
                <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-lg">Topics Covered</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {course.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Prerequisites */}
                <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-lg">Prerequisites</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {prerequisites.map((prereq, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground text-sm">{prereq}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* CTA */}
            <Card className="border-border/40 bg-gradient-to-br from-primary/10 via-accent/10 to-primary/10 text-center">
              <CardHeader>
                <CardTitle className="text-3xl mb-4">Ready to Start Learning?</CardTitle>
                <p className="text-muted-foreground text-lg">
                  Join thousands of students who have transformed their careers with our AI courses.
                </p>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg">{course.price ? "Enroll Now" : "Start Learning"}</Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="/contact">Have Questions?</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
