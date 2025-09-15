import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, CheckCircle, Star } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { db } from "@/lib/db"
import { services } from "@/lib/db/schema"
import { eq } from "drizzle-orm"

interface ServicePageProps {
  params: {
    slug: string
  }
}

async function getService(slug: string) {
  const [service] = await db.select().from(services).where(eq(services.slug, slug)).limit(1)
  return service
}

export async function generateMetadata({ params }: ServicePageProps) {
  const service = await getService(params.slug)

  if (!service) {
    return {
      title: "Service Not Found - PAIB",
    }
  }

  return {
    title: `${service.title} - PAIB Services`,
    description: service.excerpt || `Learn more about our ${service.title} service at PAIB.`,
  }
}

export default async function ServicePage({ params }: ServicePageProps) {
  const service = await getService(params.slug)

  if (!service) {
    notFound()
  }

  // Mock benefits and features for demonstration
  const benefits = [
    "Increased operational efficiency",
    "Reduced costs and improved ROI",
    "Data-driven decision making",
    "Competitive advantage through AI",
    "Scalable and future-proof solutions",
  ]

  const features = [
    "Custom AI model development",
    "Integration with existing systems",
    "Comprehensive training and support",
    "Ongoing maintenance and updates",
    "Performance monitoring and optimization",
  ]

  return (
    <MainLayout>
      <div className="min-h-screen py-16">
        <div className="container">
          {/* Back Button */}
          <div className="mb-8">
            <Button variant="ghost" asChild>
              <Link href="/services">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Services
              </Link>
            </Button>
          </div>

          {/* Service Header */}
          <div className="max-w-4xl mx-auto">
            <Card className="border-border/40 bg-card/50 backdrop-blur-sm mb-8">
              <CardHeader className="text-center pb-8">
                <div className="flex items-center justify-center gap-4 mb-6">
                  {service.icon && (
                    <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center">
                      <span className="text-3xl">{service.icon}</span>
                    </div>
                  )}
                  {service.isFeatured && (
                    <Badge className="bg-primary/10 text-primary border-primary/40">
                      <Star className="mr-1 h-3 w-3" />
                      Featured
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-4xl mb-4">{service.title}</CardTitle>
                <p className="text-xl text-muted-foreground mb-6">{service.excerpt}</p>
                {service.priceRange && <div className="text-2xl font-bold text-primary">{service.priceRange}</div>}
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 justify-center">
                  {service.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Service Details */}
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {/* Description */}
              <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-2xl">Service Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{service.content || service.excerpt}</p>
                </CardContent>
              </Card>

              {/* Benefits */}
              <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-2xl">Key Benefits</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Features */}
            <Card className="border-border/40 bg-card/50 backdrop-blur-sm mb-8">
              <CardHeader>
                <CardTitle className="text-2xl">What's Included</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* CTA */}
            <Card className="border-border/40 bg-gradient-to-br from-primary/10 via-accent/10 to-primary/10 text-center">
              <CardHeader>
                <CardTitle className="text-3xl mb-4">Ready to Get Started?</CardTitle>
                <p className="text-muted-foreground text-lg">
                  Let's discuss how this service can transform your business. Our experts are ready to help.
                </p>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" asChild>
                    <Link href="/contact">Contact Us Today</Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="/projects">View Our Work</Link>
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
