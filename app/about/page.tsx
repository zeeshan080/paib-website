import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Brain, Target, Eye, Users, Globe, Award } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "About Us - PAIB",
  description: "Learn about Pakistan Artificial Intelligence Builders's mission, vision, and journey in AI innovation.",
}

const milestones = [
  {
    year: "2020",
    title: "Foundation",
    description: "PAIB was established with a vision to lead Pakistan's AI transformation.",
  },
  {
    year: "2021",
    title: "First AI Solutions",
    description: "Launched our first commercial AI products for local businesses.",
  },
  {
    year: "2022",
    title: "Education Initiative",
    description: "Started comprehensive AI training programs and courses.",
  },
  {
    year: "2023",
    title: "International Recognition",
    description: "Received awards for innovation in AI development and education.",
  },
  {
    year: "2024",
    title: "Expansion",
    description: "Expanded operations and launched advanced AI research initiatives.",
  },
]

const values = [
  {
    icon: Brain,
    title: "Innovation",
    description: "We push the boundaries of what's possible with artificial intelligence.",
  },
  {
    icon: Users,
    title: "Collaboration",
    description: "We believe in the power of teamwork and knowledge sharing.",
  },
  {
    icon: Globe,
    title: "Impact",
    description: "We create solutions that make a meaningful difference in society.",
  },
  {
    icon: Award,
    title: "Excellence",
    description: "We maintain the highest standards in everything we do.",
  },
]

export default function AboutPage() {
  return (
    <MainLayout>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative py-24 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-indigo-900/20">
          <div className="absolute inset-0 grid-pattern opacity-20" />
          <div className="container relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold font-mono mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                About PAIB
              </h1>
              <p className="text-xl text-muted-foreground mb-8 text-pretty">
                Pakistan Artificial Intelligence Builders is pioneering the future of AI in Pakistan, creating innovative
                solutions that transform businesses and empower the next generation of AI professionals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link href="/contact">Get in Touch</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/management">Meet Our Team</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-12">
              <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Target className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-2xl">Our Mission</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    To democratize artificial intelligence in Pakistan by developing cutting-edge AI solutions,
                    providing world-class education, and fostering innovation that drives economic growth and social
                    progress. We are committed to making AI accessible, ethical, and beneficial for all.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-accent/10">
                      <Eye className="h-6 w-6 text-accent" />
                    </div>
                    <CardTitle className="text-2xl">Our Vision</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    To position Pakistan as a global leader in artificial intelligence by 2030, creating a thriving
                    ecosystem of AI innovation, research, and development that attracts international investment and
                    talent while solving local and global challenges.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 bg-card/30">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-mono mb-4">Our Values</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                These core values guide everything we do and shape our approach to AI development and education.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <Card key={value.title} className="text-center border-border/40 bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <div className="mx-auto mb-4 p-3 rounded-full bg-primary/10 w-fit">
                      <value.icon className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-16">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-mono mb-4">Our Journey</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                From humble beginnings to becoming Pakistan's leading AI organization.
              </p>
            </div>
            <div className="max-w-4xl mx-auto">
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border transform md:-translate-x-0.5" />

                {milestones.map((milestone, index) => (
                  <div key={milestone.year} className="relative flex items-center mb-8 last:mb-0">
                    {/* Timeline dot */}
                    <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-primary rounded-full transform -translate-x-1/2 z-10" />

                    {/* Content */}
                    <div className={`ml-12 md:ml-0 md:w-1/2 ${index % 2 === 0 ? "md:pr-8" : "md:pl-8 md:ml-auto"}`}>
                      <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
                        <CardHeader>
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline" className="font-mono">
                              {milestone.year}
                            </Badge>
                          </div>
                          <CardTitle className="text-lg">{milestone.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted-foreground text-sm">{milestone.description}</p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-primary/10 via-accent/10 to-primary/10">
          <div className="container text-center">
            <h2 className="text-3xl md:text-4xl font-bold font-mono mb-4">Ready to Join Our Mission?</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Whether you're looking to transform your business with AI or advance your career in artificial
              intelligence, we're here to help you succeed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/services">Explore Our Services</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/courses">Browse Courses</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  )
}
