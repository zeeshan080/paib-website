"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Users } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface Course {
  id: string
  slug: string
  title: string
  excerpt: string | null
  level: string
  durationMinutes: number | null
  price: number | null
  tags: string[]
  thumbnailUrl: string | null
  instructors: string[]
  publishedAt: Date | null
}

interface CoursesGridProps {
  courses: Course[]
}

export function CoursesGrid({ courses }: CoursesGridProps) {
  if (courses.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-2xl font-semibold mb-4">No courses found</h3>
        <p className="text-muted-foreground mb-6">
          Try adjusting your filters or search terms to find what you're looking for.
        </p>
        <Button asChild>
          <Link href="/courses">View All Courses</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course, index) => (
        <motion.div
          key={course.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
        >
          <Card className="h-full hover:shadow-xl transition-all duration-300 border-border/40 bg-card/50 backdrop-blur-sm group">
            {course.thumbnailUrl && (
              <div className="relative h-48 overflow-hidden rounded-t-lg">
                <Image
                  src={course.thumbnailUrl || "/placeholder.svg"}
                  alt={course.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
            )}
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <Badge variant="outline">{course.level}</Badge>
                {course.price ? (
                  <span className="text-lg font-bold text-primary">${(course.price / 100).toFixed(2)}</span>
                ) : (
                  <Badge className="bg-green-500/10 text-green-500 border-green-500/40">Free</Badge>
                )}
              </div>
              <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">{course.title}</CardTitle>
              <CardDescription className="line-clamp-3">{course.excerpt}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Tags */}
              <div className="flex flex-wrap gap-1">
                {course.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
                {course.tags.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{course.tags.length - 3}
                  </Badge>
                )}
              </div>

              {/* Course Info */}
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                {course.durationMinutes && (
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>
                      {Math.floor(course.durationMinutes / 60)}h {course.durationMinutes % 60}m
                    </span>
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  <span>
                    {course.instructors.length} instructor{course.instructors.length !== 1 ? "s" : ""}
                  </span>
                </div>
              </div>

              {/* Instructors */}
              {course.instructors.length > 0 && (
                <div className="text-sm text-muted-foreground">
                  <span>By {course.instructors.slice(0, 2).join(", ")}</span>
                  {course.instructors.length > 2 && <span> +{course.instructors.length - 2} more</span>}
                </div>
              )}

              {/* Action */}
              <Button className="w-full" asChild>
                <Link href={`/courses/${course.slug}`}>{course.price ? "Enroll Now" : "Start Learning"}</Link>
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
