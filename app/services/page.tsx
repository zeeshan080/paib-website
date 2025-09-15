import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Star } from "lucide-react"
import Link from "next/link"
import { db } from "@/lib/db"
import { services } from "@/lib/db/schema"

export const metadata = {
  title: "AI Services - PAIB",
  description: "Explore our comprehensive AI services including consulting, development, deployment, and training.",
}

async function getServices() {
  return await db.select().from(services).orderBy(services.order)
}

export default async function ServicesPage() {
  const allServices = await getServices()
  const featuredServices = allServices.filter((service) => service.isFeatured)
  const otherServices = allServices.filter((service) => !service.isFeatured)

  return (
    <MainLayout>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative py-24 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-indigo-900/20">
          <div className="absolute inset-0 grid-pattern opacity-20" />
          <div className="container relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold font-mono mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                AI Services
              </h1>
              <p className="text-xl text-muted-foreground mb-8 text-pretty">
                Transform your business with our comprehensive artificial intelligence solutions. From strategy to
                implementation, we provide end-to-end AI services tailored to your needs.
              </p>
              <Button size="lg" asChild>
                <Link href="/contact">Get Started Today</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Featured Services */}
        {featuredServices.length > 0 && (
          <section className="py-16">
            <div className="container">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold font-mono mb-4">Featured Services</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Our most popular AI solutions that have helped businesses transform and grow.
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredServices.map((service) => (
                  <Card
                    key={service.id}
                    className="group hover:shadow-xl transition-all duration-300 border-border/40 bg-card/50 backdrop-blur-sm relative"
                  >
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-primary/10 text-primary border-primary/40">
                        <Star className="mr-1 h-3 w-3" />
                        Featured
                      </Badge>
                    </div>
                    <CardHeader>
                      {service.icon && (
                        <div className="mb-4">
                          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                            <span className="text-2xl">{service.icon}</span>
                          </div>
                        </div>
                      )}
                      <CardTitle className="text-xl mb-2">{service.title}</CardTitle>
                      <CardDescription className="text-base">{service.excerpt}</CardDescription>
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
                          <span className="text-lg font-semibold text-primary">{service.priceRange}</span>
                        )}
                        <Button variant="ghost" size="sm" asChild className="ml-auto">
                          <Link href={`/services/${service.slug}`}>
                            Learn More
                            <ArrowRight className="ml-1 h-3 w-3" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* All Services */}
        {otherServices.length > 0 && (
          <section className="py-16 bg-card/30">
            <div className="container">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold font-mono mb-4">All Services</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Comprehensive AI solutions to meet every business need.
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {otherServices.map((service) => (
                  <Card
                    key={service.id}
                    className="group hover:shadow-lg transition-all duration-300 border-border/40 bg-card/50 backdrop-blur-sm"
                  >
                    <CardHeader>
                      {service.icon && (
                        <div className="mb-4">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <span className="text-xl">{service.icon}</span>
                          </div>
                        </div>
                      )}
                      <CardTitle className="text-lg mb-2">{service.title}</CardTitle>
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
                        {service.priceRange && <span className="font-medium text-primary">{service.priceRange}</span>}
                        <Button variant="ghost" size="sm" asChild className="ml-auto">
                          <Link href={`/services/${service.slug}`}>
                            Learn More
                            <ArrowRight className="ml-1 h-3 w-3" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-primary/10 via-accent/10 to-primary/10">
          <div className="container text-center">
            <h2 className="text-3xl md:text-4xl font-bold font-mono mb-4">Ready to Transform Your Business?</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let's discuss how our AI services can help you achieve your goals. Our experts are ready to create a
              custom solution for your unique needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/contact">Start Your AI Journey</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/projects">View Our Work</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  )
}
