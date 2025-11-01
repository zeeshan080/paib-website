"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

// Management team data with images and information
const managementTeam = [
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

interface GalleryCarouselProps {
  imagesPerView?: number
}

export function GalleryCarousel({ 
  imagesPerView = 3
}: GalleryCarouselProps = {}) {
  // Display all team members, but limit the grid based on imagesPerView prop
  const displayItems = managementTeam.slice(0, imagesPerView === 4 ? 4 : managementTeam.length)

  return (
    <section className="container px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 gap-4">
        <h2 className="text-2xl sm:text-3xl font-bold font-mono">Management Team</h2>
      </div>
      <div className={`grid grid-cols-1 sm:grid-cols-2 ${imagesPerView === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-4'} gap-4 sm:gap-6`}>
        {managementTeam.map((member, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="relative"
          >
            <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow border-border/40 bg-card/50 backdrop-blur-sm flex flex-col">
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
          </motion.div>
        ))}
      </div>
    </section>
  )
}

