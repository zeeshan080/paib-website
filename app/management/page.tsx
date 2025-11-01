import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export const metadata = {
  title: "Management Team - PAIB",
  description: "Meet the leadership team driving Pakistan's AI revolution at PAIB.",
}

// Management team data with images and information
const managementTeamData = [
  {
    image: "/gallery/gallery1.jpeg",
    name: "Ch Tariq Mehmood Proya",
    position: "Chairman/Executive Director"
  },
  {
    image: "/gallery/gallery2.jpeg",
    name: "Mian Muhammad Asif Langrah",
    position: "Managing Director/Director Trainings & Program"
  },
  {
    image: "/gallery/gallery3.jpeg",
    name: "Rimsha Tariq",
    position: "Director PR & Coordiation"
  },
  {
    image: "/gallery/gallery4.jpeg",
    name: "Squadron Leader(R) Mohammad Iqbal Khan",
    position: "Director Admin & HR"
  },
  {
    image: "/gallery/gallery5.jpeg",
    name: "Bashir Ahmed Azad",
    position: "Director Public & Social Affairs"
  }
]

export default async function ManagementPage() {
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

        {/* Management Team Cards */}
        <section className="py-16">
          <div className="container">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {managementTeamData.map((member, idx) => (
                <Card
                  key={idx}
                  className="group hover:shadow-xl transition-all duration-300 border-border/40 bg-card/50 backdrop-blur-sm flex flex-col overflow-hidden"
                >
                  <div className="relative aspect-[4/3] w-full">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover transition-transform hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      priority={idx === 0}
                    />
                  </div>
                  <CardContent className="p-4 flex-1 flex flex-col justify-center">
                    <h3 className="font-semibold text-lg mb-2 text-center">{member.name}</h3>
                    <p className="text-sm text-muted-foreground text-center">{member.position}</p>
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
