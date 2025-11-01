"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, ExternalLink, Clock } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { GalleryCarousel } from "./gallery-carousel"

interface FeaturedSectionsProps {
  projects: Array<{
    id: string
    slug: string
    title: string
    summary: string | null
    coverUrl: string | null
    tags: string[]
    tech: string[]
    authorName: string | null
  }>
  services: Array<{
    id: string
    slug: string
    title: string
    excerpt: string | null
    icon: string | null
    priceRange: string | null
    tags: string[]
  }>
  courses: Array<{
    id: string
    slug: string
    title: string
    excerpt: string | null
    level: string
    durationMinutes: number | null
    price: number | null
    thumbnailUrl: string | null
  }>
}

export function FeaturedSections({ projects, services, courses }: FeaturedSectionsProps) {
  return (
    <div className="py-12 sm:py-16 space-y-12 sm:space-y-16">
      {/* About Teaser */}
      <section className="container px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto px-2 sm:px-0"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-mono mb-4 sm:mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            About PAIB
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8 text-pretty">
            Pakistan Artificial Intelligence Builders is at the forefront of AI innovation, developing cutting-edge
            solutions that transform businesses and empower the next generation of AI professionals.
          </p>
          <Button asChild size="lg">
            <Link href="/about">
              Learn More About Us
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </section>

      {/* Featured Projects */}
      <section className="container px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 gap-4">
          <h2 className="text-2xl sm:text-3xl font-bold font-mono">Featured Projects</h2>
          <Button variant="outline" asChild>
            <Link href="/projects">
              View All Projects
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow border-border/40 bg-card/50 backdrop-blur-sm">
                {project.coverUrl && (
                  <div className="relative h-48 overflow-hidden rounded-t-lg">
                    <Image
                      src={project.coverUrl || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform hover:scale-105"
                    />
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="line-clamp-2">{project.title}</CardTitle>
                  <CardDescription className="line-clamp-3">{project.summary}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">By {project.authorName}</span>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/projects/${project.slug}`}>
                        View Project
                        <ExternalLink className="ml-1 h-3 w-3" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Services */}
      <section className="container px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 gap-4">
          <h2 className="text-2xl sm:text-3xl font-bold font-mono">Our Services</h2>
          <Button variant="outline" asChild>
            <Link href="/services">
              View All Services
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow border-border/40 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {service.icon && <span className="text-2xl">{service.icon}</span>}
                    {service.title}
                  </CardTitle>
                  <CardDescription>{service.excerpt}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {service.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    {service.priceRange && (
                      <span className="text-sm font-medium text-primary">{service.priceRange}</span>
                    )}
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/services/${service.slug}`}>
                        Learn More
                        <ArrowRight className="ml-1 h-3 w-3" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Latest Courses */}
      <section className="container px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 gap-4">
          <h2 className="text-2xl sm:text-3xl font-bold font-mono">Latest Courses</h2>
          <Button variant="outline" asChild>
            <Link href="/courses">
              View All Courses
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {courses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow border-border/40 bg-card/50 backdrop-blur-sm">
                {course.thumbnailUrl && (
                  <div className="relative h-48 overflow-hidden rounded-t-lg">
                    <Image
                      src={course.thumbnailUrl || "/placeholder.svg"}
                      alt={course.title}
                      fill
                      className="object-cover transition-transform hover:scale-105"
                    />
                  </div>
                )}
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">{course.level}</Badge>
                    {course.price ? (
                      <span className="text-lg font-bold text-primary">${(course.price / 100).toFixed(2)}</span>
                    ) : (
                      <Badge className="bg-green-500/10 text-green-500">Free</Badge>
                    )}
                  </div>
                  <CardTitle className="line-clamp-2">{course.title}</CardTitle>
                  <CardDescription className="line-clamp-3">{course.excerpt}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    {course.durationMinutes && (
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="mr-1 h-3 w-3" />
                        {Math.floor(course.durationMinutes / 60)}h {course.durationMinutes % 60}m
                      </div>
                    )}
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/courses/${course.slug}`}>
                        View Course
                        <ArrowRight className="ml-1 h-3 w-3" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Gallery Carousel */}
      <GalleryCarousel />
    </div>
  )
}
