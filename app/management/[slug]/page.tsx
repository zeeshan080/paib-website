import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Linkedin, Twitter, Mail, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { db } from "@/lib/db"
import { management } from "@/lib/db/schema"
import { eq, and } from "drizzle-orm"

interface ManagementProfilePageProps {
  params: {
    slug: string
  }
}

async function getManagementMember(slug: string) {
  const [member] = await db
    .select()
    .from(management)
    .where(and(eq(management.slug, slug), eq(management.isActive, true)))
    .limit(1)

  return member
}

export async function generateMetadata({ params }: ManagementProfilePageProps) {
  const member = await getManagementMember(params.slug)

  if (!member) {
    return {
      title: "Profile Not Found - PAIB",
    }
  }

  return {
    title: `${member.name} - ${member.roleTitle} | PAIB`,
    description: member.bio || `Learn more about ${member.name}, ${member.roleTitle} at PAIB.`,
  }
}

export default async function ManagementProfilePage({ params }: ManagementProfilePageProps) {
  const member = await getManagementMember(params.slug)

  if (!member) {
    notFound()
  }

  return (
    <MainLayout>
      <div className="min-h-screen py-16">
        <div className="container">
          {/* Back Button */}
          <div className="mb-8">
            <Button variant="ghost" asChild>
              <Link href="/management">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Team
              </Link>
            </Button>
          </div>

          {/* Profile Header */}
          <div className="max-w-4xl mx-auto">
            <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
              <CardHeader className="text-center pb-8">
                <div className="mx-auto mb-6">
                  <Avatar className="h-40 w-40 ring-4 ring-primary/20">
                    <AvatarImage src={member.imageUrl || ""} alt={member.name} />
                    <AvatarFallback className="text-3xl bg-primary/10">
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <CardTitle className="text-4xl mb-4">{member.name}</CardTitle>
                <Badge variant="outline" className="text-lg px-4 py-2 text-primary border-primary/40">
                  {member.roleTitle}
                </Badge>
              </CardHeader>
              <CardContent className="text-center">
                {/* Bio */}
                <div className="mb-8">
                  <h2 className="text-2xl font-semibold mb-4">About</h2>
                  <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto text-lg">{member.bio}</p>
                </div>

                {/* Social Links */}
                <div className="flex justify-center space-x-4 mb-8">
                  {member.linkedinUrl && (
                    <Button variant="outline" asChild>
                      <Link href={member.linkedinUrl} target="_blank" rel="noopener noreferrer">
                        <Linkedin className="mr-2 h-4 w-4" />
                        LinkedIn
                      </Link>
                    </Button>
                  )}
                  {member.twitterUrl && (
                    <Button variant="outline" asChild>
                      <Link href={member.twitterUrl} target="_blank" rel="noopener noreferrer">
                        <Twitter className="mr-2 h-4 w-4" />
                        Twitter
                      </Link>
                    </Button>
                  )}
                  <Button variant="outline" asChild>
                    <Link href="/contact">
                      <Mail className="mr-2 h-4 w-4" />
                      Contact
                    </Link>
                  </Button>
                </div>

                {/* CTA */}
                <div className="pt-8 border-t border-border/40">
                  <h3 className="text-xl font-semibold mb-4">Get in Touch</h3>
                  <p className="text-muted-foreground mb-6">
                    Interested in learning more about our work or discussing potential collaborations?
                  </p>
                  <Button size="lg" asChild>
                    <Link href="/contact">Contact Our Team</Link>
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
