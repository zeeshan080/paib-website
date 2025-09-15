import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, Github, ExternalLink, Calendar } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { db } from "@/lib/db"
import { projects, users, projectImages } from "@/lib/db/schema"
import { eq, and } from "drizzle-orm"

interface ProjectPageProps {
  params: {
    slug: string
  }
}

async function getProject(slug: string) {
  const [project] = await db
    .select({
      id: projects.id,
      slug: projects.slug,
      title: projects.title,
      summary: projects.summary,
      content: projects.content,
      coverUrl: projects.coverUrl,
      repoUrl: projects.repoUrl,
      demoUrl: projects.demoUrl,
      tags: projects.tags,
      tech: projects.tech,
      createdAt: projects.createdAt,
      authorId: projects.authorId,
      authorName: users.name,
      authorHandle: users.handle,
      authorImage: users.image,
    })
    .from(projects)
    .leftJoin(users, eq(projects.authorId, users.id))
    .where(and(eq(projects.slug, slug), eq(projects.status, "PUBLISHED")))
    .limit(1)

  if (!project) return null

  const images = await db
    .select()
    .from(projectImages)
    .where(eq(projectImages.projectId, project.id))
    .orderBy(projectImages.order)

  return { ...project, images }
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const project = await getProject(params.slug)

  if (!project) {
    return {
      title: "Project Not Found - PAIB",
    }
  }

  return {
    title: `${project.title} - PAIB Projects`,
    description: project.summary || `Learn more about ${project.title}, an AI project by PAIB.`,
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const project = await getProject(params.slug)

  if (!project) {
    notFound()
  }

  return (
    <MainLayout>
      <div className="min-h-screen py-16">
        <div className="container">
          {/* Back Button */}
          <div className="mb-8">
            <Button variant="ghost" asChild>
              <Link href="/projects">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Projects
              </Link>
            </Button>
          </div>

          {/* Project Header */}
          <div className="max-w-4xl mx-auto">
            <Card className="border-border/40 bg-card/50 backdrop-blur-sm mb-8">
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    {new Date(project.createdAt).toLocaleDateString()}
                  </div>
                  <div className="flex gap-2">
                    {project.repoUrl && (
                      <Button variant="outline" size="sm" asChild>
                        <Link href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                          <Github className="mr-2 h-4 w-4" />
                          Code
                        </Link>
                      </Button>
                    )}
                    {project.demoUrl && (
                      <Button size="sm" asChild>
                        <Link href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Live Demo
                        </Link>
                      </Button>
                    )}
                  </div>
                </div>
                <CardTitle className="text-4xl mb-4">{project.title}</CardTitle>
                <p className="text-xl text-muted-foreground mb-6">{project.summary}</p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={project.authorImage || ""} alt={project.authorName || ""} />
                    <AvatarFallback className="bg-primary/10">{project.authorName?.charAt(0) || "A"}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{project.authorName}</div>
                    <div className="text-sm text-muted-foreground">@{project.authorHandle}</div>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Cover Image */}
            {project.coverUrl && (
              <Card className="border-border/40 bg-card/50 backdrop-blur-sm mb-8">
                <div className="relative h-96 overflow-hidden rounded-lg">
                  <Image
                    src={project.coverUrl || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </Card>
            )}

            {/* Tags and Tech */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Categories</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Technologies</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((technology) => (
                      <Badge key={technology} variant="outline">
                        {technology}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Project Content */}
            <Card className="border-border/40 bg-card/50 backdrop-blur-sm mb-8">
              <CardHeader>
                <CardTitle className="text-2xl">Project Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-invert max-w-none">
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                    {project.content || "Detailed project description coming soon..."}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Project Images */}
            {project.images.length > 0 && (
              <Card className="border-border/40 bg-card/50 backdrop-blur-sm mb-8">
                <CardHeader>
                  <CardTitle className="text-2xl">Gallery</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {project.images.map((image) => (
                      <div key={image.id} className="relative h-64 overflow-hidden rounded-lg">
                        <Image
                          src={image.url || "/placeholder.svg"}
                          alt={image.alt || "Project image"}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* CTA */}
            <Card className="border-border/40 bg-gradient-to-br from-primary/10 via-accent/10 to-primary/10 text-center">
              <CardHeader>
                <CardTitle className="text-3xl mb-4">Interested in Similar Solutions?</CardTitle>
                <p className="text-muted-foreground text-lg">
                  Let's discuss how we can create custom AI solutions for your business needs.
                </p>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" asChild>
                    <Link href="/contact">Start Your Project</Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="/services">View Our Services</Link>
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
