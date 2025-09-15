"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github, Calendar, User } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface Project {
  id: string
  slug: string
  title: string
  summary: string | null
  coverUrl: string | null
  repoUrl: string | null
  demoUrl: string | null
  tags: string[]
  tech: string[]
  createdAt: Date
  authorName: string | null
  authorHandle: string | null
}

interface ProjectsGridProps {
  projects: Project[]
}

export function ProjectsGrid({ projects }: ProjectsGridProps) {
  if (projects.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-2xl font-semibold mb-4">No projects found</h3>
        <p className="text-muted-foreground mb-6">
          Try adjusting your filters or search terms to find what you're looking for.
        </p>
        <Button asChild>
          <Link href="/projects">View All Projects</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project, index) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
        >
          <Card className="h-full hover:shadow-xl transition-all duration-300 border-border/40 bg-card/50 backdrop-blur-sm group">
            {project.coverUrl && (
              <div className="relative h-48 overflow-hidden rounded-t-lg">
                <Image
                  src={project.coverUrl || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
            )}
            <CardHeader>
              <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">{project.title}</CardTitle>
              <CardDescription className="line-clamp-3">{project.summary}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Tags */}
              <div className="flex flex-wrap gap-1">
                {project.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
                {project.tags.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{project.tags.length - 3}
                  </Badge>
                )}
              </div>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-1">
                {project.tech.slice(0, 3).map((technology) => (
                  <Badge key={technology} variant="outline" className="text-xs">
                    {technology}
                  </Badge>
                ))}
                {project.tech.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{project.tech.length - 3}
                  </Badge>
                )}
              </div>

              {/* Meta Info */}
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <User className="h-3 w-3" />
                  <span>{project.authorName}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  <span>{new Date(project.createdAt).toLocaleDateString()}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-2">
                <div className="flex gap-2">
                  {project.repoUrl && (
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="h-3 w-3" />
                      </Link>
                    </Button>
                  )}
                  {project.demoUrl && (
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-3 w-3" />
                      </Link>
                    </Button>
                  )}
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <Link href={`/projects/${project.slug}`}>View Details</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
