import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Linkedin, Twitter, Mail, ExternalLink } from "lucide-react"
import Link from "next/link"
import { db } from "@/lib/db"
import { management } from "@/lib/db/schema"
import { eq } from "drizzle-orm"

export const metadata = {
  title: "Management Team - PAIB",
  description: "Meet the leadership team driving Pakistan's AI revolution at PAIB.",
}

async function getManagementTeam() {
  return await db.select().from(management).where(eq(management.isActive, true)).orderBy(management.order)
}

export default async function ManagementPage() {
  const team = await getManagementTeam()

  return (
    <MainLayout>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative py-24 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-indigo-900/20">
          <div className="absolute inset-0 grid-pattern opacity-20" />
          <div className="container relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold font-mono mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Leadership Team
              </h1>
              <p className="text-xl text-muted-foreground mb-8 text-pretty">
                Meet the visionary leaders driving Pakistan's artificial intelligence revolution and shaping the future
                of technology in the region.
              </p>
            </div>
          </div>
        </section>

        {/* Team Grid */}
        <section className="py-16">
          <div className="container">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {team.map((member) => (
                <Card
                  key={member.id}
                  className="group hover:shadow-xl transition-all duration-300 border-border/40 bg-card/50 backdrop-blur-sm"
                >
                  <CardHeader className="text-center">
                    <div className="mx-auto mb-6">
                      <Avatar className="h-32 w-32 ring-4 ring-primary/20 group-hover:ring-primary/40 transition-all">
                        <AvatarImage src={member.imageUrl || ""} alt={member.name} />
                        <AvatarFallback className="text-2xl bg-primary/10">
                          {member.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <CardTitle className="text-2xl mb-2">{member.name}</CardTitle>
                    <Badge variant="outline" className="mb-4 text-primary border-primary/40">
                      {member.roleTitle}
                    </Badge>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-muted-foreground mb-6 leading-relaxed">{member.bio}</p>

                    {/* Social Links */}
                    <div className="flex justify-center space-x-2 mb-6">
                      {member.linkedinUrl && (
                        <Button variant="ghost" size="icon" asChild>
                          <Link href={member.linkedinUrl} target="_blank" rel="noopener noreferrer">
                            <Linkedin className="h-4 w-4" />
                            <span className="sr-only">LinkedIn</span>
                          </Link>
                        </Button>
                      )}
                      {member.twitterUrl && (
                        <Button variant="ghost" size="icon" asChild>
                          <Link href={member.twitterUrl} target="_blank" rel="noopener noreferrer">
                            <Twitter className="h-4 w-4" />
                            <span className="sr-only">Twitter</span>
                          </Link>
                        </Button>
                      )}
                      <Button variant="ghost" size="icon" asChild>
                        <Link href="/contact">
                          <Mail className="h-4 w-4" />
                          <span className="sr-only">Contact</span>
                        </Link>
                      </Button>
                    </div>

                    <Button variant="outline" size="sm" asChild className="w-full bg-transparent">
                      <Link href={`/management/${member.slug}`}>
                        View Full Profile
                        <ExternalLink className="ml-2 h-3 w-3" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-card/30">
          <div className="container text-center">
            <h2 className="text-3xl md:text-4xl font-bold font-mono mb-4">Want to Join Our Team?</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              We're always looking for talented individuals who share our passion for artificial intelligence and
              innovation. Join us in shaping the future of AI in Pakistan.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/contact">Get in Touch</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/developers">View Our Developers</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  )
}
