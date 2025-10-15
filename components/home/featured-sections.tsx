"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowRight, ExternalLink, Clock } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

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
  management: Array<{
    id: string
    slug: string
    name: string
    roleTitle: string
    bio: string | null
    imageUrl: string | null
  }>
  developers: Array<{
    id: string
    name: string | null
    handle: string | null
    image: string | null
    headline: string | null
    skills: string[]
  }>
}

export function FeaturedSections({ projects, services, courses, management, developers }: FeaturedSectionsProps) {
  return (
    <div className="py-16 space-y-16">
      {/* About Teaser */}
      <section className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-mono mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            About PAIB
          </h2>
          <p className="text-lg text-muted-foreground mb-8 text-pretty">
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
      <section className="container">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold font-mono">Featured Projects</h2>
          <Button variant="outline" asChild>
            <Link href="/projects">
              View All Projects
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
      <section className="container">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold font-mono">Our Services</h2>
          <Button variant="outline" asChild>
            <Link href="/services">
              View All Services
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
      <section className="container">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold font-mono">Latest Courses</h2>
          <Button variant="outline" asChild>
            <Link href="/courses">
              View All Courses
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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

      {/* Management Team */}
      <section className="container">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold font-mono">Leadership Team</h2>
          <Button variant="outline" asChild>
            <Link href="/management">
              Meet the Team
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {management.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Card className="text-center hover:shadow-lg transition-shadow border-border/40 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <div className="mx-auto mb-4">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={member.imageUrl || ""} alt={member.name} />
                      <AvatarFallback className="text-lg bg-primary/10">
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <CardTitle>{member.name}</CardTitle>
                  <CardDescription className="text-primary font-medium">{member.roleTitle}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{member.bio}</p>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/management/${member.slug}`}>
                      View Profile
                      <ArrowRight className="ml-1 h-3 w-3" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Developers */}
      <section className="container">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold font-mono">Our Developers</h2>
          <Button variant="outline" asChild>
            <Link href="/developers">
              View All Developers
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {developers.map((developer, index) => (
            <motion.div
              key={developer.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Card className="text-center hover:shadow-lg transition-shadow border-border/40 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <div className="mx-auto mb-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={developer.image || ""} alt={developer.name || ""} />
                      <AvatarFallback className="bg-primary/10">{developer.name?.charAt(0) || "D"}</AvatarFallback>
                    </Avatar>
                  </div>
                  <CardTitle>{developer.name}</CardTitle>
                  <CardDescription>{developer.headline}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-1 justify-center mb-4">
                    {developer.skills.slice(0, 3).map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/developers/${developer.handle}`}>
                      View Profile
                      <ArrowRight className="ml-1 h-3 w-3" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}
